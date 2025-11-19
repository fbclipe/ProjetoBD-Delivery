import React, { useState } from "react";
import * as consultasService from "../services/consultasService";

export default function ConsultasAvancadasPage() {

    const [resultado, setResultado] = useState(null);
    const [titulo, setTitulo] = useState("");

    const executar = async (func, nome) => {
        try {
            const res = await func();
            setResultado(res.data); // axios retorna { data: ... }
            setTitulo(nome);
        } catch (e) {
            console.error(e);
            alert("Erro executando consulta!");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>📊 Consultas & Views Avançadas</h2>

            <h3>Views</h3>

            <button
                onClick={() =>
                    executar(
                        consultasService.getComidasMaisVendidas,
                        "📌 Comidas Mais Vendidas"
                    )
                }
            >
                Ver Comidas Mais Vendidas
            </button>

            <button
                onClick={() =>
                    executar(
                        consultasService.getDesempenhoEntregas,
                        "📌 Desempenho das Entregas"
                    )
                }
            >
                Ver Desempenho dos Entregadores
            </button>

            <h3 style={{ marginTop: 30 }}>Consultas</h3>

            <button
                onClick={() =>
                    executar(
                        consultasService.getClientesSemPedidos,
                        "🧑‍🤝‍🧑 Clientes Sem Pedidos"
                    )
                }
            >
                Clientes sem pedidos
            </button>

            <button
                onClick={() =>
                    executar(
                        consultasService.getRestaurantesAvaliacoes,
                        "⭐ Restaurantes & Avaliações"
                    )
                }
            >
                Restaurantes com avaliações
            </button>

            <button
                onClick={() =>
                    executar(
                        consultasService.getRestaurantesAcimaMedia,
                        "🔥 Restaurantes com mais vendas que a média"
                    )
                }
            >
                Restaurantes acima da média
            </button>

            <button
                onClick={() =>
                    executar(
                        consultasService.getEntregadoresDesempenho,
                        "🚚 Entregadores – Desempenho"
                    )
                }
            >
                Desempenho dos entregadores
            </button>

            {/* Botão extra para testar índices */}
            <button
                onClick={() =>
                    executar(
                        consultasService.getIndices,
                        "📚 Índices do Banco"
                    )
                }
                style={{ marginTop: 20 }}
            >
                Ver Índices do Banco
            </button>

            {resultado && (
                <div style={{ marginTop: 30 }}>
                    <h3>{titulo}</h3>
                    <pre
                        style={{
                            background: "#eee",
                            padding: 15,
                            borderRadius: 8,
                            overflow: "auto",
                        }}
                    >
                    {JSON.stringify(resultado, null, 2)}
                </pre>
                </div>
            )}
        </div>
    );


}
