import React, { useEffect, useState } from "react";
import clienteService from "../services/clienteService";
import ClienteForm from "./ClienteForm";

const ClienteList = () => {
    const [clientes, setClientes] = useState([]);
    const [editing, setEditing] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregar();
    }, []);

    function carregar() {
        setLoading(true);
        clienteService.listar()
            .then(data => setClientes(data || []))
            .finally(() => setLoading(false));
    }

    function salvar(cliente) {
        if (cliente.idCliente) {
            clienteService.atualizar(cliente.idCliente, cliente)
                .then(() => {
                    carregar();
                    setEditing(null);
                });
        } else {
            clienteService.criar(cliente)
                .then(() => {
                    carregar();
                    setEditing(null);
                });
        }
    }

    function editar(cliente) {
        setEditing(cliente);
    }

    function remover(id) {
        if (!window.confirm("Confirma exclusão do cliente?")) return;
        clienteService.deletar(id).then(() => carregar());
    }

    return (
        <div>
            <h2>Clientes</h2>

            <div style={{ marginBottom: 16 }}>
                <button onClick={() => setEditing({})}>Novo Cliente</button>
            </div>

            {editing && (
                <ClienteForm
                    clienteParaEditar={editing.idCliente ? editing : null}
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
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>CEP</th>
                        <th>Rua</th>
                        <th>Bairro</th>
                        <th>Cidade</th>
                        <th>Número</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clientes.map(c => (
                        <tr key={c.idCliente}>
                            <td>{c.idCliente}</td>
                            <td>{c.nome}</td>
                            <td>{c.telefone}</td>
                            <td>{c.cep}</td>
                            <td>{c.rua}</td>
                            <td>{c.bairro}</td>
                            <td>{c.cidade}</td>
                            <td>{c.numero}</td>
                            <td>
                                <button onClick={() => editar(c)}>Editar</button>
                                <button onClick={() => remover(c.idCliente)} style={{ marginLeft: 8 }}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                    {clientes.length === 0 && (
                        <tr><td colSpan="9">Nenhum cliente encontrado</td></tr>
                    )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ClienteList;
