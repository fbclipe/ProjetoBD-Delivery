import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    produtosComRestaurante, 
    produtosPorFaixaPreco, 
    restaurantesComContagemProdutos, 
    mediaPrecosPorCidade 
} from "../services/produtoService";

export default function ConsultasPage() {
    const navigate = useNavigate(); // ← CORRETO: useNavigate para navegação
    const location = useLocation(); // ← CORRETO: useLocation para saber a página atual
    const [resultados, setResultados] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [precoMin, setPrecoMin] = useState('10');
    const [precoMax, setPrecoMax] = useState('50');

    const executarConsulta = async (consultaFn, parametros = []) => {
        setCarregando(true);
        try {
            const res = await consultaFn(...parametros);
            setResultados(res.data);
        } catch (error) {
            console.error("Erro na consulta:", error);
            setResultados(["Erro ao executar consulta: " + error.message]);
        }
        setCarregando(false);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', minHeight: '100vh' }}>
            {/* MENU DE NAVEGAÇÃO */}
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

            <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '10px' }}>
                🔍 Consultas
            </h1>
            
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
                
            </p>

            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '20px', 
                marginBottom: '40px',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                
                <div style={{ 
                    padding: '20px', 
                    border: '2px solid #28a745', 
                    borderRadius: '8px', 
                    backgroundColor: '#f8fff9',
                    textAlign: 'center'
                }}>
                    <h3 style={{ color: '#28a745', marginBottom: '15px' }}>🔄 PRODUTO X RESTAURANTE</h3>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
                        Produtos com informações do restaurante
                    </p>
                    <button 
                        onClick={() => executarConsulta(produtosComRestaurante)}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Consultar
                    </button>
                </div>

                
                <div style={{ 
                    padding: '20px', 
                    border: '2px solid #007bff', 
                    borderRadius: '8px', 
                    backgroundColor: '#f0f8ff',
                    textAlign: 'center'
                }}>
                    <h3 style={{ color: '#007bff', marginBottom: '15px' }}>💰 FILTRO POR PREÇO</h3>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                        Produtos por faixa de preço
                    </p>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', justifyContent: 'center' }}>
                        <input 
                            value={precoMin} 
                            onChange={(e) => setPrecoMin(e.target.value)}
                            placeholder="Mín"
                            style={{ width: '60px', padding: '5px', textAlign: 'center' }}
                            type="number"
                        />
                        <span>a</span>
                        <input 
                            value={precoMax} 
                            onChange={(e) => setPrecoMax(e.target.value)}
                            placeholder="Máx"
                            style={{ width: '60px', padding: '5px', textAlign: 'center' }}
                            type="number"
                        />
                    </div>
                    <button 
                        onClick={() => executarConsulta(produtosPorFaixaPreco, [parseFloat(precoMin), parseFloat(precoMax)])}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Buscar por Preço
                    </button>
                </div>

               
                <div style={{ 
                    padding: '20px', 
                    border: '2px solid #6f42c1', 
                    borderRadius: '8px', 
                    backgroundColor: '#f8f9ff',
                    textAlign: 'center'
                }}>
                    <h3 style={{ color: '#6f42c1', marginBottom: '15px' }}>📊 RESTAURANTE X CONTAGEM</h3>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
                        Restaurantes com quantidade de produtos
                    </p>
                    <button 
                        onClick={() => executarConsulta(restaurantesComContagemProdutos)}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#6f42c1',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Ver Estatísticas
                    </button>
                </div>

                
                <div style={{ 
                    padding: '20px', 
                    border: '2px solid #fd7e14', 
                    borderRadius: '8px', 
                    backgroundColor: '#fff4e6',
                    textAlign: 'center'
                }}>
                    <h3 style={{ color: '#fd7e14', marginBottom: '15px' }}>📈 MÉDIA</h3>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
                        Média de preços por cidade 
                    </p>
                    <button 
                        onClick={() => executarConsulta(mediaPrecosPorCidade)}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#fd7e14',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Calcular Médias
                    </button>
                </div>
            </div>

            {/* Resultados */}
            <div style={{ 
                border: '1px solid #ddd', 
                borderRadius: '8px', 
                padding: '25px', 
                backgroundColor: '#fff',
                maxWidth: '1000px',
                margin: '0 auto'
            }}>
                <h3 style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}>
                    📋 Resultados das Consultas
                    {resultados.length > 0 && <span style={{ fontSize: '14px', color: '#666', marginLeft: '10px' }}>({resultados.length} itens)</span>}
                </h3>
                
                {carregando ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏳</div>
                        <p>Executando consulta...</p>
                    </div>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {resultados.map((item, index) => (
                            <li key={index} style={{ 
                                padding: '12px', 
                                margin: '8px 0', 
                                backgroundColor: '#f8f9fa',
                                border: '1px solid #e9ecef',
                                borderRadius: '6px',
                                fontSize: '14px'
                            }}>
                                {typeof item === 'object' ? (
                                    <div>
                                        <strong>{item.nome}</strong> - R$ {item.preco?.toFixed(2)}
                                        {item.nomeRestaurante && <span> - 🍽️ {item.nomeRestaurante}</span>}
                                        {item.idRestaurante && <span style={{ float: 'right', color: '#666' }}>ID: {item.idRestaurante}</span>}
                                    </div>
                                ) : (
                                    <div>📊 {item}</div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}