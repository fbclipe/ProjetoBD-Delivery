import React, { useEffect, useState } from "react";
import pedidoService from "../services/pedidoService";
import PedidoForm from "./PedidoForm";

const PedidoList = () => {
    const [pedidos, setPedidos] = useState([]);
    const [editing, setEditing] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregar();
    }, []);

    function carregar() {
        setLoading(true);
        pedidoService.listar()
            .then(data => setPedidos(data || []))
            .finally(() => setLoading(false));
    }

    function salvar(pedido) {
        if (pedido.idPedido) {
            pedidoService.atualizar(pedido.idPedido, pedido).then(() => {
                carregar();
                setEditing(null);
            });
        } else {
            pedidoService.criar(pedido).then(() => {
                carregar();
                setEditing(null);
            });
        }
    }

    function editar(p) {
        setEditing(p);
    }

    function remover(id) {
        if (!window.confirm("Confirma exclusão do pedido?")) return;
        pedidoService.deletar(id).then(() => carregar());
    }

    return (
        <div>
            <h2>Pedidos</h2>

            <div style={{ marginBottom: 16 }}>
                <button onClick={() => setEditing({})}>Novo Pedido</button>
            </div>

            {editing && (
                <PedidoForm
                    pedidoParaEditar={editing.idPedido ? editing : null}
                    onSave={salvar}
                    onCancel={() => setEditing(null)}
                />
            )}

            {loading ? (
                <div>Carregando...</div>
            ) : (
                <table border="1" cellPadding="6" cellSpacing="0">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Preço Total</th>
                        <th>Data/Hora</th>
                        <th>ID Cliente</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pedidos.map(p => (
                        <tr key={p.idPedido}>
                            <td>{p.idPedido}</td>
                            <td>{p.status}</td>
                            <td>{p.precoTotal}</td>
                            <td>{p.dataHora ? new Date(p.dataHora).toLocaleString() : ""}</td>
                            <td>{p.idCliente}</td>
                            <td>
                                <button onClick={() => editar(p)}>Editar</button>
                                <button onClick={() => remover(p.idPedido)} style={{ marginLeft: 8 }}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                    {pedidos.length === 0 && (
                        <tr><td colSpan="6">Nenhum pedido encontrado</td></tr>
                    )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PedidoList;
