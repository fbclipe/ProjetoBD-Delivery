import React, { useEffect, useState } from "react";
import { listarProdutos, criarProduto, deletarProduto } from "../services/produtoService";

export default function ProdutosPage() {
    const [produtos, setProdutos] = useState([]);
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [idRestaurante, setIdRestaurante] = useState("");

    useEffect(() => {
        carregarProdutos();
    }, []);

    const carregarProdutos = async () => {
        const res = await listarProdutos();
        setProdutos(res.data);
    };

    const handleCriar = async () => {
        await criarProduto({ nome, preco: parseFloat(preco), idRestaurante: parseInt(idRestaurante) });
        setNome(""); setPreco(""); setIdRestaurante("");
        carregarProdutos();
    };

    const handleDeletar = async (id) => {
        await deletarProduto(id);
        carregarProdutos();
    };

    return (
        <div>
            <h1>Produtos</h1>
            <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
            <input value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="Preço" type="number" />
            <input value={idRestaurante} onChange={(e) => setIdRestaurante(e.target.value)} placeholder="ID Restaurante" type="number" />
            <button onClick={handleCriar}>Criar Produto</button>

            <ul>
                {produtos.map(p => (
                    <li key={p.idProduto}>
                        {p.nome} - R${p.preco} - Restaurante {p.idRestaurante}
                        <button onClick={() => handleDeletar(p.idProduto)}>Deletar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
