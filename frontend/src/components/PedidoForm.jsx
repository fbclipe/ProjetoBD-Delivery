import React, { useState, useEffect } from "react";

const PedidoForm = ({ onSave, pedidoParaEditar, onCancel }) => {
    const [pedido, setPedido] = useState({
        idPedido: null,
        status: "",
        precoTotal: "",
        dataHora: "",
        idCliente: ""
    });

    useEffect(() => {
        if (pedidoParaEditar) {
            // convert Timestamp to input datetime-local value if necessary
            const dataHora = pedidoParaEditar.dataHora
                ? new Date(pedidoParaEditar.dataHora).toISOString().slice(0,16)
                : "";
            setPedido({ ...pedidoParaEditar, dataHora });
        } else {
            setPedido({
                idPedido: null,
                status: "",
                precoTotal: "",
                dataHora: "",
                idCliente: ""
            });
        }
    }, [pedidoParaEditar]);

    function handleChange(e) {
        const { name, value } = e.target;
        setPedido(prev => ({ ...prev, [name]: value }));
    }

    function submit(e) {
        e.preventDefault();
        // convert dataHora back to full ISO timestamp when saving
        const payload = { ...pedido };
        if (payload.dataHora) {
            payload.dataHora = new Date(payload.dataHora).toISOString();
        }
        // convert precoTotal to number
        if (payload.precoTotal === "") payload.precoTotal = 0;
        payload.precoTotal = Number(payload.precoTotal);

        onSave(payload);
    }

    return (
        <form onSubmit={submit} style={{ marginBottom: 16 }}>
            <div>
                <label>Status</label><br/>
                <input name="status" value={pedido.status} onChange={handleChange} required />
            </div>

            <div>
                <label>Preço Total</label><br/>
                <input name="precoTotal" type="number" step="0.01" value={pedido.precoTotal} onChange={handleChange} />
            </div>

            <div>
                <label>Data/Hora</label><br/>
                <input name="dataHora" type="datetime-local" value={pedido.dataHora} onChange={handleChange} />
            </div>

            <div>
                <label>ID Cliente</label><br/>
                <input name="idCliente" value={pedido.idCliente} onChange={handleChange} required />
            </div>

            <div style={{ marginTop: 8 }}>
                <button type="submit">Salvar</button>
                {onCancel && <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Cancelar</button>}
            </div>
        </form>
    );
};

export default PedidoForm;
