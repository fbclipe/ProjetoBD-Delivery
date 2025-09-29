import React, { useEffect, useState } from "react";
import { 
    listarProdutos, 
    criarProduto, 
    deletarProduto, 
    buscarProdutoPorId, 
    atualizarProduto 
} from "../services/produtoService";
import { 
    listarRestaurantes, 
    criarRestaurante, 
    deletarRestaurante, 
    buscarRestaurantePorId, 
    atualizarRestaurante 
} from "../services/restauranteService";
import { useNavigate, useLocation } from "react-router-dom";

export default function GerenciamentoPage() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Estados para Produtos
    const [produtos, setProdutos] = useState([]);
    const [nomeProduto, setNomeProduto] = useState("");
    const [preco, setPreco] = useState("");
    const [idRestaurante, setIdRestaurante] = useState("");
    const [editandoProduto, setEditandoProduto] = useState(null);

    // Estados para Restaurantes
    const [restaurantes, setRestaurantes] = useState([]);
    const [nomeRestaurante, setNomeRestaurante] = useState("");
    const [tipoCulinaria, setTipoCulinaria] = useState("");
    const [cidade, setCidade] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [cep, setCep] = useState("");
    const [editandoRestaurante, setEditandoRestaurante] = useState(null);

    // Carregar dados ao iniciar
    useEffect(() => {
        carregarProdutos();
        carregarRestaurantes();
    }, []);

    // ========== FUNÇÕES PARA PRODUTOS ==========
    const carregarProdutos = async () => {
        try {
            const res = await listarProdutos();
            setProdutos(res.data);
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
        }
    };

    const handleCriarProduto = async () => {
        try {
            await criarProduto({ 
                nome: nomeProduto, 
                preco: parseFloat(preco), 
                idRestaurante: parseInt(idRestaurante) 
            });
            limparFormularioProduto();
            carregarProdutos();
        } catch (error) {
            console.error("Erro ao criar produto:", error);
        }
    };

    const handleEditarProduto = async (id) => {
    console.log("🔄 Editando produto ID:", id);
    
    // Busca apenas na lista local (mais confiável)
    const produto = produtos.find(p => p.idProduto === id);
    if (produto) {
        setNomeProduto(produto.nome || "");
        setPreco(produto.preco?.toString() || "");
        setIdRestaurante(produto.idRestaurante?.toString() || "");
        setEditandoProduto(id);
        console.log("✅ Produto carregado para edição:", produto);
    } else {
        console.error("❌ Produto não encontrado");
    }
};

    const handleAtualizarProduto = async () => {
        try {
            await atualizarProduto(editandoProduto, { 
                nome: nomeProduto, 
                preco: parseFloat(preco), 
                idRestaurante: parseInt(idRestaurante) 
            });
            limparFormularioProduto();
            setEditandoProduto(null);
            carregarProdutos();
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
        }
    };

    const handleDeletarProduto = async (id) => {
        try {
            await deletarProduto(id);
            carregarProdutos();
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
        }
    };

    const limparFormularioProduto = () => {
        setNomeProduto("");
        setPreco("");
        setIdRestaurante("");
    };

    const cancelarEdicaoProduto = () => {
        setEditandoProduto(null);
        limparFormularioProduto();
    };

    // ========== FUNÇÕES PARA RESTAURANTES ==========
    const carregarRestaurantes = async () => {
        try {
            const res = await listarRestaurantes();
            setRestaurantes(res.data);
        } catch (error) {
            console.error("Erro ao carregar restaurantes:", error);
        }
    };

    const handleCriarRestaurante = async () => {
        try {
            await criarRestaurante({ 
                nome: nomeRestaurante,
                tipoCulinaria: tipoCulinaria,
                cidade: cidade,
                rua: rua,
                numero: parseInt(numero),
                bairro: bairro,
                cep: cep
            });
            limparFormularioRestaurante();
            carregarRestaurantes();
        } catch (error) {
            console.error("Erro ao criar restaurante:", error);
        }
    };

    const handleEditarRestaurante = async (id) => {
    console.log("🔄 Editando restaurante ID:", id);
    
    // Busca apenas na lista local
    const restaurante = restaurantes.find(r => r.idRestaurante === id);
    if (restaurante) {
        setNomeRestaurante(restaurante.nome || "");
        setTipoCulinaria(restaurante.tipoCulinaria || "");
        setCidade(restaurante.cidade || "");
        setRua(restaurante.rua || "");
        setNumero(restaurante.numero?.toString() || "");
        setBairro(restaurante.bairro || "");
        setCep(restaurante.cep || "");
        setEditandoRestaurante(id);
        console.log("✅ Restaurante carregado para edição:", restaurante);
    } else {
        console.error("❌ Restaurante não encontrado");
    }
};

    const handleAtualizarRestaurante = async () => {
        try {
            await atualizarRestaurante(editandoRestaurante, { 
                nome: nomeRestaurante,
                tipoCulinaria: tipoCulinaria,
                cidade: cidade,
                rua: rua,
                numero: parseInt(numero),
                bairro: bairro,
                cep: cep
            });
            limparFormularioRestaurante();
            setEditandoRestaurante(null);
            carregarRestaurantes();
        } catch (error) {
            console.error("Erro ao atualizar restaurante:", error);
        }
    };

    const handleDeletarRestaurante = async (id) => {
        try {
            await deletarRestaurante(id);
            carregarRestaurantes();
        } catch (error) {
            console.error("Erro ao deletar restaurante:", error);
        }
    };

    const limparFormularioRestaurante = () => {
        setNomeRestaurante("");
        setTipoCulinaria("");
        setCidade("");
        setRua("");
        setNumero("");
        setBairro("");
        setCep("");
    };

    const cancelarEdicaoRestaurante = () => {
        setEditandoRestaurante(null);
        limparFormularioRestaurante();
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            {/* MENU DE NAVEGAÇÃO ATUALIZADO */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '15px',
                marginBottom: '30px',
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef',
                flexWrap: 'wrap'
            }}>
                <button 
                    onClick={() => navigate('/')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: location.pathname === '/' ? '#1e4a8b' : '#2c5aa0',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '14px'
                    }}
                >
                    🏠 Gerenciamento
                </button>
                <button 
                    onClick={() => navigate('/consultas')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: location.pathname === '/consultas' ? '#218838' : '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '14px'
                    }}
                >
                    🔍 Consultas
                </button>
                <button 
                    onClick={() => navigate('/graficos')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: location.pathname === '/graficos' ? '#fd7e14' : '#ffc107',
                        color: 'black',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '14px'
                    }}
                >
                    📊 Gráficos
                </button>
            </div>

            <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
                Sistema de Delivery - Gerenciamento
            </h1>
            
            {/* Seção de Restaurantes */}
            <div style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h2 style={{ color: '#2c5aa0' }}>
                    {editandoRestaurante ? '✏️ Editar Restaurante' : '🏠 Gerenciar Restaurantes'}
                </h2>
                
                <div style={{ marginBottom: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                    <input 
                        value={nomeRestaurante} 
                        onChange={(e) => setNomeRestaurante(e.target.value)} 
                        placeholder="Nome do restaurante" 
                        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    <input 
                        value={tipoCulinaria} 
                        onChange={(e) => setTipoCulinaria(e.target.value)} 
                        placeholder="Tipo de culinária" 
                        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    <input 
                        value={cidade} 
                        onChange={(e) => setCidade(e.target.value)} 
                        placeholder="Cidade" 
                        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    <input 
                        value={rua} 
                        onChange={(e) => setRua(e.target.value)} 
                        placeholder="Rua" 
                        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    <input 
                        value={numero} 
                        onChange={(e) => setNumero(e.target.value)} 
                        placeholder="Número" 
                        type="number"
                        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    <input 
                        value={bairro} 
                        onChange={(e) => setBairro(e.target.value)} 
                        placeholder="Bairro" 
                        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    <input 
                        value={cep} 
                        onChange={(e) => setCep(e.target.value)} 
                        placeholder="CEP" 
                        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                    {editandoRestaurante ? (
                        <>
                            <button 
                                onClick={handleAtualizarRestaurante}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#28a745',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                ✅ Atualizar
                            </button>
                            <button 
                                onClick={cancelarEdicaoRestaurante}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#6c757d',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                ❌ Cancelar
                            </button>
                        </>
                    ) : (
                        <button 
                            onClick={handleCriarRestaurante}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#2c5aa0',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            ➕ Criar Restaurante
                        </button>
                    )}
                </div>

                <h3 style={{ marginTop: '20px' }}>Restaurantes Cadastrados:</h3>
<ul style={{ listStyle: 'none', padding: 0 }}>
    {restaurantes.map(r => (
        <li key={r.idRestaurante} style={{
            padding: '15px',
            margin: '8px 0',
            backgroundColor: '#f9f9f9',
            border: '1px solid #eee',
            borderRadius: '6px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <span style={{
                        backgroundColor: '#2c5aa0',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        marginRight: '10px'
                    }}>
                        ID: {r.idRestaurante}
                    </span>
                    <strong style={{ fontSize: '16px', color: '#2c5aa0' }}>{r.nome}</strong>
                </div>
                <div style={{ fontSize: '14px', color: '#555' }}>
                    <span>🍽️ {r.tipoCulinaria}</span>
                    <span style={{ margin: '0 10px' }}>•</span>
                    <span>🏙️ {r.cidade}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#777', marginTop: '5px' }}>
                    📍 {r.rua}, {r.numero} - {r.bairro} 
                    <span style={{ margin: '0 10px' }}>•</span>
                    📮 CEP: {r.cep}
                </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                    onClick={() => handleEditarRestaurante(r.idRestaurante)}
                    style={{
                        padding: '6px 12px',
                        backgroundColor: '#ffc107',
                        color: 'black',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold'
                    }}
                    title="Editar restaurante"
                >
                    ✏️ Editar
                </button>
                <button 
                    onClick={() => handleDeletarRestaurante(r.idRestaurante)}
                    style={{
                        padding: '6px 12px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold'
                    }}
                    title="Deletar restaurante"
                >
                    🗑️ Deletar
                </button>
            </div>
        </li>
    ))}
</ul>
            </div>

            {/* Seção de Produtos */}
            <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h2 style={{ color: '#28a745' }}>
                    {editandoProduto ? '✏️ Editar Produto' : '📦 Gerenciar Produtos'}
                </h2>
                
                <div style={{ marginBottom: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                    <input 
                        value={nomeProduto} 
                        onChange={(e) => setNomeProduto(e.target.value)} 
                        placeholder="Nome do produto" 
                        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    <input 
                        value={preco} 
                        onChange={(e) => setPreco(e.target.value)} 
                        placeholder="Preço" 
                        type="number" 
                        step="0.01"
                        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    <input 
                        value={idRestaurante} 
                        onChange={(e) => setIdRestaurante(e.target.value)} 
                        placeholder="ID do Restaurante" 
                        type="number"
                        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                    {editandoProduto ? (
                        <>
                            <button 
                                onClick={handleAtualizarProduto}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#28a745',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                ✅ Atualizar
                            </button>
                            <button 
                                onClick={cancelarEdicaoProduto}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#6c757d',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                ❌ Cancelar
                            </button>
                        </>
                    ) : (
                        <button 
                            onClick={handleCriarProduto}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#28a745',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            ➕ Criar Produto
                        </button>
                    )}
                </div>

                <h3 style={{ marginTop: '20px' }}>Produtos Cadastrados:</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {produtos.map(p => (
                        <li key={p.idProduto} style={{
                            padding: '10px',
                            margin: '5px 0',
                            backgroundColor: '#f9f9f9',
                            border: '1px solid #eee',
                            borderRadius: '4px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <strong>{p.nome}</strong> - R$ {p.preco?.toFixed(2)} - Restaurante ID: {p.idRestaurante}
                            </div>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <button 
                                    onClick={() => handleEditarProduto(p.idProduto)}
                                    style={{
                                        padding: '5px 10px',
                                        backgroundColor: '#ffc107',
                                        color: 'black',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    ✏️ Editar
                                </button>
                                <button 
                                    onClick={() => handleDeletarProduto(p.idProduto)}
                                    style={{
                                        padding: '5px 10px',
                                        backgroundColor: '#dc3545',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    🗑️ Deletar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}