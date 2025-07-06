import Banner from '../../Components/Banner/Banner.jsx';
import CoffeeList from '../../Components/CoffeeList/CoffeeList.jsx';
import { useEffect, useState } from 'react';
import CoffeeService from '../../api/coffeeService';

const mockCoffeeList = [
  {
    id: 1,
    name: "Expresso Tradicional",
    description: "O tradicional café feito com água quente e grãos moídos",
    image: "/Icons/coffeeImages/CoffeeImg1.png",
    price: "9,90",
    tags: ["TRADICIONAL"]
  },
  {
    id: 2,
    name: "Expresso Americano",
    description: "Expresso diluído, menos intenso que o tradicional",
    image: "/Icons/coffeeImages/CoffeeImg2.png",
    price: "15,90",
    tags: ["TRADICIONAL"]
  },
  {
    id: 3,
    name: "Expresso Cremoso",
    description: "Café expresso tradicional com espuma cremosa",
    image: "/Icons/coffeeImages/CoffeeImg1.png",
    price: "8,00",
    tags: ["TRADICIONAL"]
  },
  {
    id: 4,
    name: "Expresso Gelado",
    description: "Bebida preparada com café expresso e cubos de gelo",
    image: "/Icons/coffeeImages/CoffeeImg2.png",
    price: "9,90",
    tags: ["TRADICIONAL", "GELADO"]
  },
  {
    id: 5,
    name: "Café com Leite",
    description: "Meio a meio de expresso tradicional com leite vaporizado",
    image: "/Icons/coffeeImages/CoffeeImg1.png",
    price: "9,90",
    tags: ["TRADICIONAL", "COM LEITE"]
  },
  {
    id: 6,
    name: "Latte",
    description: "Uma dose de café expresso com o dobro de leite e espuma cremosa",
    image: "/Icons/coffeeImages/CoffeeImg2.png",
    price: "9,90",
    tags: ["TRADICIONAL", "COM LEITE"]
  },
  {
    id: 7,
    name: "Capuccino",
    description: "Bebida com canela feita de doses iguais de café, leite e espuma",
    image: "/Icons/coffeeImages/CoffeeImg1.png",
    price: "9,90",
    tags: ["TRADICIONAL", "COM LEITE"]
  },
  {
    id: 8,
    name: "Macchiato",
    description: "Café expresso misturado com um pouco de leite quente e espuma",
    image: "/Icons/coffeeImages/CoffeeImg2.png",
    price: "9,90",
    tags: ["TRADICIONAL", "COM LEITE"]
  }
];

const MainPage = ({ selectedCafe, isLoadingCafes }) => {
  const [coffeeList, setCoffeeList] = useState([]);
  const [isLoadingCoffees, setIsLoadingCoffees] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoffees = async () => {
      console.log('MainPage - fetchCoffees called with selectedCafe:', selectedCafe);
      console.log('MainPage - isLoadingCafes:', isLoadingCafes);
      
      if (!selectedCafe || isLoadingCafes) {
        return;
      }

      console.log('MainPage - Fetching coffees for cafe ID:', selectedCafe.id);
      setIsLoadingCoffees(true);
      setError(null);

      try {
        const coffeeService = new CoffeeService();
        const coffees = await coffeeService.getTransformedCoffeesByCafeId(selectedCafe.id);
        console.log('MainPage - Coffees fetched successfully:', coffees);
        setCoffeeList(coffees);
      } catch (error) {
        console.error('Error fetching coffees:', error);
        setError('Erro ao carregar os cafés. Usando dados de exemplo.');
        setCoffeeList(mockCoffeeList);
      } finally {
        setIsLoadingCoffees(false);
      }
    };

    fetchCoffees();
  }, [selectedCafe, isLoadingCafes]);

  const getTitle = () => {
    if (isLoadingCafes) return "Carregando cafés...";
    if (isLoadingCoffees) return "Carregando nossos cafés...";
    if (error) return "Nossos cafés (dados de exemplo)";
    return "Nossos cafés";
  };

  const getCoffeeList = () => {
    if (isLoadingCafes || isLoadingCoffees) return [];
    return coffeeList;
  };

  return (
    <div>
      <Banner />
      {error && (
        <div style={{ 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          padding: '12px', 
          margin: '16px',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
      <CoffeeList title={getTitle()} coffeeList={getCoffeeList()} />
    </div>
  );
}

export default MainPage;