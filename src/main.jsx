import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // ✅ make sure this is here
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './components/About.jsx';
import Events from './components/Events.jsx';
import Donation from './components/Donation';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/donate" element={<Donation />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
