import React, { useState } from "react";
import { atualizarStatusEntrega, aplicarDescontos } from "../services/proceduresService";

export default function ProceduresPage() {

    const [msg, setMsg] = useState("");

    const atualizar = async () => {
        const r = await atualizarStatusEntrega(1, "Entregue");
        setMsg(r);
    };

    const descontos = async () => {
        const r = await aplicarDescontos();
        setMsg(r);
    };

    return (
        <div>
            <h2>Procedures SQL</h2>

            <div>
                <h3>Atualizar Status de Entrega</h3>
                <button onClick={atualizar}>Atualizar Entrega #1</button>
            </div>

            <div>
                <h3>Aplicar Descontos Progressivos</h3>
                <button onClick={descontos}>Aplicar Descontos</button>
            </div>

            {msg && <p>{msg}</p>}
        </div>
    );
}
