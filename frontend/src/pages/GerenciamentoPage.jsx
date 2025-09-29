import React, { useEffect, useState } from "react";
import { listarProdutos, criarProduto, deletarProduto } from "../services/produtoService";
import { listarRestaurantes, criarRestaurante, deletarRestaurante } from "../services/restauranteService";
import { useNavigate, useLocation } from "react-router-dom";

export default function GerenciamentoPage() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Estados para Produtos
    const [produtos, setProdutos] = useState([]);
    const [nomeProduto, setNomeProduto] = useState("");
    const [preco, setPreco] = useState("");
    const [idRestaurante, setIdRestaurante] = useState("");

    // Estados para Restaurantes
    const [restaurantes, setRestaurantes] = useState([]);
    const [nomeRestaurante, setNomeRestaurante] = useState("");
    const [tipoCulinaria, setTipoCulinaria] = useState("");
    const [cidade, setCidade] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [cep, setCep] = useState("");

    // Carregar dados ao iniciar
    useEffect(() => {
        carregarProdutos();
        carregarRestaurantes();
    }, []);

    // Funções para Produtos
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
            setNomeProduto(""); 
            setPreco(""); 
            setIdRestaurante("");
            carregarProdutos();
        } catch (error) {
            console.error("Erro ao criar produto:", error);
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

    // Funções para Restaurantes
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
            setNomeRestaurante("");
            setTipoCulinaria("");
            setCidade("");
            setRua("");
            setNumero("");
            setBairro("");
            setCep("");
            carregarRestaurantes();
        } catch (error) {
            console.error("Erro ao criar restaurante:", error);
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

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            {/* MENU DE NAVEGAÇÃO */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                marginBottom: '30px',
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
            }}>
                <button 
                    onClick={() => navigate('/')}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: location.pathname === '/' ? '#1e4a8b' : '#2c5aa0',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '16px'
                    }}
                >
                    🏠 Gerenciamento
                </button>
                <button 
                    onClick={() => navigate('/graficos')}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: location.pathname === '/graficos' ? '#218838' : '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '16px'
                    }}
                >
                    📊 Ver Gráficos
                </button>
            </div>

            <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
                Sistema de Delivery - Gerenciamento
            </h1>
            
            {/* Seção de Restaurantes */}
            <div style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h2 style={{ color: '#2c5aa0' }}>Gerenciar Restaurantes</h2>
                
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
                    Criar Restaurante
                </button>

                <h3 style={{ marginTop: '20px' }}>Restaurantes Cadastrados:</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {restaurantes.map(r => (
                        <li key={r.idRestaurante} style={{
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
                                <strong>{r.nome}</strong> - {r.tipoCulinaria} - {r.cidade}
                                <br />
                                <small>{r.rua}, {r.numero} - {r.bairro} - CEP: {r.cep}</small>
                            </div>
                            <button 
                                onClick={() => handleDeletarRestaurante(r.idRestaurante)}
                                style={{
                                    padding: '5px 10px',
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Deletar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Seção de Produtos */}
            <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h2 style={{ color: '#28a745' }}>Gerenciar Produtos</h2>
                
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
                    Criar Produto
                </button>

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
                                Deletar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}