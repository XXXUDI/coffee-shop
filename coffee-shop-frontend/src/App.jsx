import { CafeProvider } from './context/CafeContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import AppContent from './routes/AppContent.jsx';

function App() {

  return (
    <BrowserRouter>
      <CafeProvider>
        <AppContent />
      </CafeProvider>
    </BrowserRouter>
  );

  
}

export default App
