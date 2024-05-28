import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from '../Layout/Layout';
import HomePage from '../HomePage/HomePage';
// import AboutPage from '../About/AboutPage'; // Assuming you have these components
// import ContactPage from '../Contact/ContactPage';

function App() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      {/* <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} /> */}
      // Add more routes as needed
    </Routes>
  );
}

export default App;
