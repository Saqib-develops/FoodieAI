import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CustomerChat from './pages/CustomerChat';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<CustomerChat />} />

    </Routes>
  );
}

