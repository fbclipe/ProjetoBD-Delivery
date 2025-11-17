import React, { useState, useEffect } from "react";

const ClienteForm = ({ onSave, clienteParaEditar, onCancel }) => {
    const [cliente, setCliente] = useState({
        idCliente: null,
        nome: "",
        telefone: "",
        cep: "",
        rua: "",
        bairro: "",
        cidade: "",
        numero: "",
    });

    useEffect(() => {
        if (clienteParaEditar) {
            setCliente(clienteParaEditar);
        } else {
            setCliente({
                idCliente: null,
                nome: "",
                telefone: "",
                cep: "",
                rua: "",
                bairro: "",
                cidade: "",
                numero: "",
            });
        }
    }, [clienteParaEditar]);

    function handleChange(e) {
        const { name, value } = e.target;
        setCliente(prev => ({ ...prev, [name]: value }));
    }

    function submit(e) {
        e.preventDefault();
        onSave(cliente);
    }

    return (
        <form onSubmit={submit} style={{ marginBottom: 16 }}>
            <div>
                <label>Nome</label><br/>
                <input name="nome" value={cliente.nome} onChange={handleChange} required />
            </div>
            <div>
                <label>Telefone</label><br/>
                <input name="telefone" value={cliente.telefone} onChange={handleChange} />
            </div>
            <div>
                <label>CEP</label><br/>
                <input name="cep" value={cliente.cep} onChange={handleChange} />
            </div>
            <div>
                <label>Rua</label><br/>
                <input name="rua" value={cliente.rua} onChange={handleChange} />
            </div>
            <div>
                <label>Bairro</label><br/>
                <input name="bairro" value={cliente.bairro} onChange={handleChange} />
            </div>
            <div>
                <label>Cidade</label><br/>
                <input name="cidade" value={cliente.cidade} onChange={handleChange} />
            </div>
            <div>
                <label>Número</label><br/>
                <input name="numero" value={cliente.numero} onChange={handleChange} />
            </div>

            <div style={{ marginTop: 8 }}>
                <button type="submit">Salvar</button>
                {onCancel && <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Cancelar</button>}
            </div>
        </form>
    );
};

export default ClienteForm;
