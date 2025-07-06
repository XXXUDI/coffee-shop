
import Header from '../Components/Header/Header';
import {routes} from '../routes/routes.jsx';
import { Routes, Route } from 'react-router-dom';
import { useCafe } from '../hooks/useCafe.js';

const AppContent = () => {
    const { selectedCafe, setSelectedCafe, isLoadingCafes } = useCafe();

    const handleCafeChange = (cafe) => {
        console.log('AppContent - handleCafeChange called with:', cafe);
        setSelectedCafe(cafe);
    };

    return (
        <>
            <Header 
                address={selectedCafe?.address || 'Carregando...'} 
                onAddressChange={handleCafeChange}
            />
            <Routes>
                {
                    routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                route.path === '/' ? 
                                    <route.element selectedCafe={selectedCafe} isLoadingCafes={isLoadingCafes} /> :
                                    <route.element />
                            }
                        />
                    ))
                }
            </Routes>
        </>
    );
}

export default AppContent;