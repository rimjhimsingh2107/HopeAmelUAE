import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './components/About.jsx';
import Events from './components/Events.jsx';
import Donation from './components/Donation';
import DonateSuccess from './components/donation/DonateSuccess.jsx';
import DonateCancel from './components/donation/DonateCancel.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/donate" element={<Donation />} />
        <Route path="/donate-success" element={<DonateSuccess />} />
        <Route path="/donate-cancel" element={<DonateCancel />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
