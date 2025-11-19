import React, { useEffect, useState } from "react";
import {
    getTotalClientes,
    getTotalRestaurantes,
    getTotalProdutos,
    getTotalPedidos,
    getPedidosPorMes,
    getProdutosMaisVendidos
} from "../services/consultasService";

export default function DashboardPage() {

    const [totais, setTotais] = useState({
        clientes: 0,
        restaurantes: 0,
        produtos: 0,
        pedidos: 0
    });

    const [pedidosMes, setPedidosMes] = useState([]);
    const [maisVendidos, setMaisVendidos] = useState([]);
    const [loading, setLoading] = useState(true);

    async function carregarDados() {
        try {
            const [
                clientes,
                restaurantes,
                produtos,
                pedidos,
                pedidosPorMes,
                produtosVendidos
            ] = await Promise.all([
                getTotalClientes(),
                getTotalRestaurantes(),
                getTotalProdutos(),
                getTotalPedidos(),
                getPedidosPorMes(),
                getProdutosMaisVendidos()
            ]);

            setTotais({
                clientes,
                restaurantes,
                produtos,
                pedidos
            });

            setPedidosMes(pedidosPorMes);
            setMaisVendidos(produtosVendidos);

        } catch (err) {
            console.error("ERRO AO CARREGAR DASHBOARD:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        carregarDados();
    }, []);

    if (loading) return <h2>Carregando...</h2>;

    return (
        <div style={{ padding: 20 }}>
            <h1>Dashboard Estatístico</h1>

            {/* ============================= */}
            {/* CARDS RESUMIDOS */}
            {/* ============================= */}
            <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
                <div style={card}>
                    <h3>Total de Clientes</h3>
                    <strong>{totais.clientes}</strong>
                </div>

                <div style={card}>
                    <h3>Total de Restaurantes</h3>
                    <strong>{totais.restaurantes}</strong>
                </div>

                <div style={card}>
                    <h3>Total de Produtos</h3>
                    <strong>{totais.produtos}</strong>
                </div>

                <div style={card}>
                    <h3>Total de Pedidos</h3>
                    <strong>{totais.pedidos}</strong>
                </div>
            </div>

            {/* ============================= */}
            {/* TABELA PEDIDOS POR MÊS */}
            {/* ============================= */}
            <h2 style={{ marginTop: 40 }}>Pedidos por mês</h2>
            <table border="1" cellPadding="10">
                <thead>
                <tr>
                    <th>Mês</th>
                    <th>Total de Pedidos</th>
                </tr>
                </thead>
                <tbody>
                {pedidosMes.map(m => (
                    <tr key={m.mes}>
                        <td>{m.mes}</td>
                        <td>{m.total}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* ============================= */}
            {/* TABELA PRODUTOS MAIS VENDIDOS */}
            {/* ============================= */}
            <h2 style={{ marginTop: 40 }}>Produtos Mais Vendidos</h2>

            {maisVendidos.length === 0 ? (
                <p>Nenhum produto encontrado nos pedidos.</p>
            ) : (
                <table border="1" cellPadding="10">
                    <thead>
                    <tr>
                        <th>ID Produto</th>
                        <th>Quantidade Vendida</th>
                    </tr>
                    </thead>
                    <tbody>
                    {maisVendidos.map(p => (
                        <tr key={p.produtoId}>
                            <td>{p.produtoId}</td>
                            <td>{p.total}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

        </div>
    );
}

const card = {
    border: "1px solid #ccc",
    padding: 20,
    width: 200,
    textAlign: "center",
    background: "#f7f7f7"
};
