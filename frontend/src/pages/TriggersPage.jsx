import React, { useState } from "react";
import triggersService from "../services/triggersService";

export default function TriggersPage() {
    const [logs, setLogs] = useState([]);
    const [pedidos, setPedidos] = useState([]);

    // === TRIGGER 1 ===
    const executarPagamento = async () => {
        try {
            await triggersService.simularPagamento();
            const dados = await triggersService.listarLogs();
            console.log("Dados recebidos (logs):", dados);

            if (Array.isArray(dados)) {
                setLogs(dados);
            } else if (dados && Array.isArray(dados.data)) {
                setLogs(dados.data);
            } else {
                setLogs([]);
                console.warn("Dados inválidos recebidos para logs");
            }

            alert("Pagamento criado! Trigger executado.");
        } catch (error) {
            console.error("Erro ao executar pagamento:", error);
            alert("Erro ao executar pagamento. Veja o console para detalhes.");
        }
    };

    // === TRIGGER 2 ===
    const executarItemPedido = async () => {
        try {
            await triggersService.simularItemPedido();
            const lista = await triggersService.listarPedidosAtualizados();
            console.log("Pedidos atualizados recebidos:", lista);

            if (Array.isArray(lista)) {
                setPedidos(lista);
            } else if (lista && Array.isArray(lista.data)) {
                setPedidos(lista.data);
            } else {
                setPedidos([]);
                console.warn("Dados inválidos recebidos para pedidos");
            }

            alert("Item inserido! Trigger atualizou o total de pedido.");
        } catch (error) {
            console.error("Erro ao executar item pedido:", error);
            alert("Erro ao executar item pedido. Veja o console para detalhes.");
        }
    };

    return (
        <div>
            <h1>⚙️ Teste de Triggers</h1>

            {/* TRIGGER 1 */}
            <section style={{ marginBottom: "40px" }}>
                <h2>Trigger 1 — Log de Pagamento</h2>
                <button onClick={executarPagamento}>Executar Trigger (Criar Pagamento)</button>

                <h3>Logs de Pagamentos</h3>
                <table border="1" cellPadding="5">
                    <thead>
                    <tr>
                        <th>ID Log</th>
                        <th>ID Pagamento</th>
                        <th>ID Pedido</th>
                        <th>Valor</th>
                        <th>Ação</th>
                        <th>Data</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(logs) && logs.length > 0 ? (
                        logs.map((l) => (
                            <tr key={l.idLog}>
                                <td>{l.idLog}</td>
                                <td>{l.idPagamento}</td>
                                <td>{l.idPedido}</td>
                                <td>{l.Valor}</td>
                                <td>{l.Acao}</td>
                                <td>{l.DataLog}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>
                                Nenhum log disponível
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </section>

            {/* TRIGGER 2 */}
            <section>
                <h2>Trigger 2 — Atualização de Total do Pedido</h2>

                <button onClick={executarItemPedido}>Executar Trigger (Adicionar Item ao Pedido)</button>

                <h3>Pedidos Atualizados</h3>
                <table border="1" cellPadding="5">
                    <thead>
                    <tr>
                        <th>ID Pedido</th>
                        <th>Status</th>
                        <th>Preço Total</th>
                        <th>ID Cliente</th>
                        <th>Data</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(pedidos) && pedidos.length > 0 ? (
                        pedidos.map((p) => (
                            <tr key={p.idPedido}>
                                <td>{p.idPedido}</td>
                                <td>{p.status}</td>
                                <td>{p.precoTotal}</td>
                                <td>{p.idCliente}</td>
                                <td>{p.dataHora}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>
                                Nenhum pedido disponível
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
