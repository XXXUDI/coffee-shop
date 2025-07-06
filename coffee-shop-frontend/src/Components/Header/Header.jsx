import styles from "./styles.module.css";
import { useCart } from "../../cart/cartContext";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useCafe } from "../../hooks/useCafe";

const Header = ({ address, onAddressChange }) => {
  const { getCartItemsCount } = useCart();
  const { cafes } = useCafe(); // Use cafes from context instead of loading them again
  const cartItemsCount = getCartItemsCount();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(address);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSelectedAddress(address);
  }, [address]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCartClick = () => {
    console.log('Header - handleCartClick called, navigating to checkout');
    navigate("/checkout");
  };

  const handleLogoClick = () => {
    console.log('Header - handleLogoClick called, navigating to home');
    navigate("/");
  };

  const handleLocationClick = () => {
    setDropdownOpen((open) => !open);
  };

  const handleCafeSelect = (cafe) => {
    console.log('Header - handleCafeSelect called with:', cafe);
    setSelectedAddress(cafe.address);
    setDropdownOpen(false);
    setSearch("");
    if (onAddressChange) {
      console.log('Header - calling onAddressChange with:', cafe);
      onAddressChange(cafe);
    }
  };

  const filteredCafes = cafes.filter((cafe) => {
    return cafe.address.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer} onClick={handleLogoClick}>
        <img src="/Icons/Logo.svg" alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.actions}>
        <div
          className={styles.location}
          onClick={handleLocationClick}
          tabIndex={0}
        >
          <img src="/Icons/LocationIcon.svg" alt="LocationIcon" />
          <p className={styles.locationText}>{selectedAddress}</p>
        </div>
        <div className={styles.cart} onClick={handleCartClick}>
          <img
            src="/Icons/CartIcon.svg"
            alt="Cart Icon"
            className={styles.cartIcon}
          ></img>
          {cartItemsCount > 0 && (
            <span className={styles.cartBadge}>{cartItemsCount}</span>
          )}
        </div>
      </div>
      {dropdownOpen && (
        <nav className={styles.locationNav} ref={dropdownRef}>
          <input
            type="text"
            className={styles.locationSearch}
            placeholder="Digite o endereço do café..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <ul className={styles.locationList}>
            {filteredCafes.length === 0 && (
              <li className={styles.locationItemEmpty}>
                Desculpe, mas não existem cafés assim :(
              </li>
            )}
            {filteredCafes.map((cafe) => (
              <li
                key={cafe.id}
                className={
                  styles.locationItem +
                  (cafe.address === selectedAddress ? " " + styles.selected : "")
                }
                onClick={() => handleCafeSelect(cafe)}
                tabIndex={0}
              >
                <img src="/Icons/LocationIcon.svg" alt="Location" />
                <span>{cafe.address}</span>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
