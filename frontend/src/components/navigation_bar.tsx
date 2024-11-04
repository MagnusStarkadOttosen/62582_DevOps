import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../styles/navigation_bar.css';

const NavigationBar: React.FC = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <nav className="navbar">
      <button onClick={() => navigate('/')} className="nav-button">Frontpage</button>
      <button onClick={() => navigate('/basket')} className="nav-button">Basket</button>
    </nav>
  );
};

export default NavigationBar;
