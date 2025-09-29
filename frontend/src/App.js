import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GerenciamentoPage from './pages/GerenciamentoPage';
import GraficosPage from './pages/GraficosPage';
import ConsultasPage from './pages/ConsultasPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<GerenciamentoPage />} />
          <Route path="/consultas" element={<ConsultasPage />} />
          <Route path="/graficos" element={<GraficosPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;