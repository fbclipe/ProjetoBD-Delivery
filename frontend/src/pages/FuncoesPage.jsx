import React, { useState } from "react";
import { getMediaRestaurante, getNivelCliente } from "../services/funcoesService";

export default function FuncoesPage() {

    const [media, setMedia] = useState(null);
    const [nivel, setNivel] = useState(null);

    const buscarMedia = async (id) => {
        const result = await getMediaRestaurante(id);
        setMedia(result);
    };

    const buscarNivel = async (id) => {
        const result = await getNivelCliente(id);
        setNivel(result);
    };

    return (
        <div>
            <h2>Funções SQL</h2>

            <div>
                <h3>Média Avaliação do Restaurante</h3>
                <button onClick={() => buscarMedia(1)}>Buscar Média (restaurante 1)</button>
                {media !== null && <p>Média: {media}</p>}
            </div>

            <div>
                <h3>Nível do Cliente</h3>
                <button onClick={() => buscarNivel(1)}>Buscar Nível (cliente 1)</button>
                {nivel !== null && <p>Nível: {nivel}</p>}
            </div>
        </div>
    );
}
