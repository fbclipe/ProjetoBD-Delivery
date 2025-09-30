import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    produtosComRestaurante, 
    produtosPorFaixaPreco, 
    restaurantesComContagemProdutos, 
    mediaPrecosPorCidade,
    restaurantesComProduto  // NOVA IMPORT
} from "../services/produtoService";
import { 
    restaurantesPorCidade,
    restaurantesPorTipoCulinaria, 
    restaurantesComEnderecoCompleto,
    restaurantesOrdenadosPorNome
} from "../services/restauranteService";

export default function ConsultasPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [resultados, setResultados] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [precoMin, setPrecoMin] = useState('10');
    const [precoMax, setPrecoMax] = useState('50');
    const [cidadeFiltro, setCidadeFiltro] = useState('');
    const [culinariaFiltro, setCulinariaFiltro] = useState('');
    const [produtoFiltro, setProdutoFiltro] = useState(''); // NOVO ESTADO

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
                Consultas avançadas de produtos e restaurantes
            </p>

            {/* NOVA SEÇÃO - CONSULTA INTELIGENTE */}
            <h2 style={{ color: '#333', marginBottom: '20px', borderBottom: '2px solid #ff6b6b', paddingBottom: '10px', textAlign: 'center' }}>
                🎯 BUSCA INTELIGENTE
            </h2>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '20px', 
                marginBottom: '40px'
            }}>
                {/* NOVA CONSULTA: Restaurantes que vendem determinado produto */}
                <div style={{ 
                    padding: '25px', 
                    border: '2px solid #ff6b6b', 
                    borderRadius: '12px', 
                    backgroundColor: '#fff0f0',
                    textAlign: 'center',
                    boxShadow: '0 4px 6px rgba(255, 107, 107, 0.1)'
                }}>
                    <h3 style={{ color: '#ff6b6b', marginBottom: '15px', fontSize: '18px' }}>🔍 ENCONTRE RESTAURANTES</h3>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
                        Busque restaurantes que vendem um produto específico
                    </p>
                    <input 
                        value={produtoFiltro} 
                        onChange={(e) => setProdutoFiltro(e.target.value)}
                        placeholder="Ex: Pizza, Hambúrguer, Sushi..."
                        style={{ 
                            width: '100%', 
                            padding: '12px', 
                            marginBottom: '15px', 
                            textAlign: 'center',
                            border: '1px solid #ff6b6b',
                            borderRadius: '6px',
                            fontSize: '16px'
                        }}
                    />
                    <button 
                        onClick={() => executarConsulta(restaurantesComProduto, [produtoFiltro])}
                        disabled={!produtoFiltro.trim()}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: produtoFiltro.trim() ? '#ff6b6b' : '#ccc',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: produtoFiltro.trim() ? 'pointer' : 'not-allowed',
                            fontWeight: 'bold',
                            width: '100%',
                            fontSize: '16px',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                            if (produtoFiltro.trim()) {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 4px 8px rgba(255, 107, 107, 0.3)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (produtoFiltro.trim()) {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }
                        }}
                    >
                        🍽️ Buscar Restaurantes
                    </button>
                    <p style={{ fontSize: '12px', color: '#888', marginTop: '10px' }}>
                        Ex: "Pizza", "Hambúrguer", "Sushi", "Salada"
                    </p>
                </div>
            </div>

            {/* SEÇÃO ORIGINAL - CONSULTAS DE RESTAURANTES (PERMANECE IGUAL) */}
            <h2 style={{ color: '#333', marginBottom: '20px', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
                🍽️ Consultas de Restaurantes
            </h2>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '20px', 
                marginBottom: '40px'
            }}>
                {/* CONSULTA 1: Restaurantes por Cidade */}
                <div style={{ 
                    padding: '20px', 
                    border: '2px solid #17a2b8', 
                    borderRadius: '8px', 
                    backgroundColor: '#e3f2fd',
                    textAlign: 'center'
                }}>
                    <h3 style={{ color: '#17a2b8', marginBottom: '15px' }}>🏙️ POR CIDADE</h3>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                        Filtre restaurantes por cidade
                    </p>
                    <input 
                        value={cidadeFiltro} 
                        onChange={(e) => setCidadeFiltro(e.target.value)}
                        placeholder="Digite a cidade"
                        style={{ width: '100%', padding: '8px', marginBottom: '10px', textAlign: 'center' }}
                    />
                    <button 
                        onClick={() => executarConsulta(restaurantesPorCidade, [cidadeFiltro])}
                        disabled={!cidadeFiltro.trim()}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: cidadeFiltro.trim() ? '#17a2b8' : '#ccc',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: cidadeFiltro.trim() ? 'pointer' : 'not-allowed',
                            fontWeight: 'bold',
                            width: '100%'
                        }}
                    >
                        Buscar por Cidade
                    </button>
                </div>

                {/* CONSULTA 2: Restaurantes por Tipo de Culinária */}
                <div style={{ 
                    padding: '20px', 
                    border: '2px solid #e83e8c', 
                    borderRadius: '8px', 
                    backgroundColor: '#fce4ec',
                    textAlign: 'center'
                }}>
                    <h3 style={{ color: '#e83e8c', marginBottom: '15px' }}>🍳 POR CULINÁRIA</h3>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                        Filtre por tipo de culinária
                    </p>
                    <input 
                        value={culinariaFiltro} 
                        onChange={(e) => setCulinariaFiltro(e.target.value)}
                        placeholder="Ex: Brasileira, Italiana..."
                        style={{ width: '100%', padding: '8px', marginBottom: '10px', textAlign: 'center' }}
                    />
                    <button 
                        onClick={() => executarConsulta(restaurantesPorTipoCulinaria, [culinariaFiltro])}
                        disabled={!culinariaFiltro.trim()}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: culinariaFiltro.trim() ? '#e83e8c' : '#ccc',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: culinariaFiltro.trim() ? 'pointer' : 'not-allowed',
                            fontWeight: 'bold',
                            width: '100%'
                        }}
                    >
                        Buscar por Culinária
                    </button>
                </div>

                {/* CONSULTA 3: Restaurantes com Endereço Completo */}
                <div style={{ 
                    padding: '20px', 
                    border: '2px solid #20c997', 
                    borderRadius: '8px', 
                    backgroundColor: '#e8f5e8',
                    textAlign: 'center'
                }}>
                    <h3 style={{ color: '#20c997', marginBottom: '15px' }}>📋 LISTA COMPLETA</h3>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
                        Todos os restaurantes com endereço completo
                    </p>
                    <button 
                        onClick={() => executarConsulta(restaurantesComEnderecoCompleto)}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#20c997',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            width: '100%'
                        }}
                    >
                        Ver Todos
                    </button>
                </div>

                {/* CONSULTA 4: Restaurantes Ordenados por Nome */}
                <div style={{ 
                    padding: '20px', 
                    border: '2px solid #ff6b6b', 
                    borderRadius: '8px', 
                    backgroundColor: '#ffeaea',
                    textAlign: 'center'
                }}>
                    <h3 style={{ color: '#ff6b6b', marginBottom: '15px' }}>🔤 ORDEM ALFABÉTICA</h3>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
                        Restaurantes em ordem alfabética
                    </p>
                    <button 
                        onClick={() => executarConsulta(restaurantesOrdenadosPorNome)}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#ff6b6b',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            width: '100%'
                        }}
                    >
                        Ordenar A-Z
                    </button>
                </div>
            </div>

            {/* SEÇÃO ORIGINAL - CONSULTAS DE PRODUTOS (PERMANECE IGUAL) */}
            <h2 style={{ color: '#333', marginBottom: '20px', borderBottom: '2px solid #28a745', paddingBottom: '10px' }}>
                📦 Consultas de Produtos
            </h2>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '20px', 
                marginBottom: '40px'
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

            {/* Resultados - ATUALIZADO para mostrar melhor a nova consulta */}
            <div style={{ 
                border: '1px solid #ddd', 
                borderRadius: '8px', 
                padding: '25px', 
                backgroundColor: '#fff'
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
                                padding: '15px', 
                                margin: '10px 0', 
                                backgroundColor: '#f8f9fa',
                                border: '1px solid #e9ecef',
                                borderRadius: '8px',
                                fontSize: '14px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}>
                                {typeof item === 'object' ? (
                                    <div>
                                        <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#333', marginBottom: '5px' }}>
                                            🏢 {item.nome}
                                        </div>
                                        <div style={{ color: '#666' }}>
                                            {item.tipoCulinaria && <span>🍽️ {item.tipoCulinaria}</span>}
                                            {item.cidade && <span> • 🏙️ {item.cidade}</span>}
                                            {item.produtoEncontrado && (
                                                <span style={{ color: '#28a745', fontWeight: 'bold' }}> • ✅ Tem: {item.produtoEncontrado}</span>
                                            )}
                                            {item.preco && <span> • 💰 R$ {item.preco?.toFixed(2)}</span>}
                                        </div>
                                        {item.enderecoCompleto && (
                                            <div style={{ fontSize: '12px', color: '#888', marginTop: '5px' }}>
                                                📍 {item.enderecoCompleto}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div style={{ fontWeight: 'bold' }}>📊 {item}</div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}