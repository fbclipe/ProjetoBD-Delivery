import React, { useEffect, useState } from "react";
import { listarRestaurantes, criarRestaurante, deletarRestaurante } from "../services/restauranteService";

export default function RestaurantesPage() {
    const [restaurantes, setRestaurantes] = useState([]);
    const [nome, setNome] = useState("");

    useEffect(() => {
        carregarRestaurantes();
    }, []);

    const carregarRestaurantes = async () => {
        const res = await listarRestaurantes();
        setRestaurantes(res.data);
    };

    const handleCriar = async () => {
        await criarRestaurante({ nome });
        setNome("");
        carregarRestaurantes();
    };

    const handleDeletar = async (id) => {
        await deletarRestaurante(id);
        carregarRestaurantes();
    };

    return (
        <div>
            <h1>Restaurantes</h1>
            <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome do restaurante" />
            <button onClick={handleCriar}>Criar Restaurante</button>

            <ul>
                {restaurantes.map(r => (
                    <li key={r.idRestaurante}>
                        {r.nome} - {r.cidade}
                        <button onClick={() => handleDeletar(r.idRestaurante)}>Deletar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
