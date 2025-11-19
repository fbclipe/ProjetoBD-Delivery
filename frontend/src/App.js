import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import GerenciamentoPage from './pages/GerenciamentoPage';
import GraficosPage from './pages/GraficosPage';
import ConsultasPage from './pages/ConsultasPage';

// IMPORTS dos CRUDs
import ClienteList from "./components/ClienteList";
import PedidoList from "./components/PedidoList";

// IMPORTS das novas páginas
import FuncoesPage from "./pages/FuncoesPage";
import ProceduresPage from "./pages/ProceduresPage";
import TriggersPage from "./pages/TriggersPage";
import ConsultasAvancadasPage from "./pages/ConsultasAvancadasPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
    return (
        <Router>
            <div style={{ display: "flex" }}>

                {/* MENU LATERAL */}
                <nav
                    style={{
                        width: "220px",
                        padding: "20px",
                        background: "#f1f1f1",
                        height: "100vh",
                        borderRight: "1px solid #ccc"
                    }}
                >
                    <h3>Menu</h3>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        <li><Link to="/">Gerenciamento</Link></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/clientes">Clientes</Link></li>
                        <li><Link to="/pedidos">Pedidos</Link></li>

                        <hr />

                        <li><Link to="/funcoes">Funções SQL</Link></li>
                        <li><Link to="/procedures">Procedures SQL</Link></li>
                        <li><Link to="/triggers">Triggers</Link></li>

                        <hr />

                        <li><Link to="/consultas">Consultas</Link></li>
                        <li><Link to="/consultas-avancadas">Consultas Avançadas</Link></li>
                        <li><Link to="/graficos">Gráficos</Link></li>
                    </ul>
                </nav>

                {/* ÁREA PRINCIPAL */}
                <main style={{ flex: 1, padding: "20px" }}>
                    <Routes>

                        {/* Páginas principais */}
                        <Route path="/" element={<GerenciamentoPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />

                        {/* CRUDs */}
                        <Route path="/clientes" element={<ClienteList />} />
                        <Route path="/pedidos" element={<PedidoList />} />

                        {/* Funções, Procedures, Triggers */}
                        <Route path="/funcoes" element={<FuncoesPage />} />
                        <Route path="/procedures" element={<ProceduresPage />} />
                        <Route path="/triggers" element={<TriggersPage />} />

                        {/* Consultas */}
                        <Route path="/consultas" element={<ConsultasPage />} />
                        <Route path="/consultas-avancadas" element={<ConsultasAvancadasPage />} />

                        {/* Gráficos */}
                        <Route path="/graficos" element={<GraficosPage />} />
                    </Routes>
                </main>

            </div>
        </Router>
    );
}

export default App;
