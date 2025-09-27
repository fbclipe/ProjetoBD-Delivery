import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RestaurantesPage from "./pages/RestaurantesPage";
import ProdutosPage from "./pages/ProdutosPage";

export default function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Restaurantes</Link> | <Link to="/produtos">Produtos</Link>
            </nav>
            <Routes>
                <Route path="/" element={<RestaurantesPage />} />
                <Route path="/produtos" element={<ProdutosPage />} />
            </Routes>
        </Router>
    );
}