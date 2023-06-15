import { Toaster } from 'react-hot-toast';
import './App.css';
import RandomPassword from './Components/RandomPassword';

function App() {
  return (
    <>
      <RandomPassword />
      <Toaster />
    </>
  );
}

export default App;
