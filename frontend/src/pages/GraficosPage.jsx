import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function GraficosPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const pdfsGraficos = [
        {
            id: 1,
            src: "/images/graficos estatistica.pdf",
            
        },
        {
            id: 2,
            src: "/images/graficos estatistica2.pdf",
        },
        {
            id: 3,
            src: "/images/graficos estatistica3.pdf",
        },
        {
            id: 4,
            src: "/images/graficos estatistica4.pdf",
        },
        {
            id: 5,
            src: "/images/graficos estatistica5.pdf",
        },
        {
            id: 6,
            src: "/images/graficos estatistica6.pdf",
        },
        {
            id: 7,
            src: "/images/graficos estatistica7.pdf",
        },
        {
            id: 8,
            src: "/images/graficos estatistica8.pdf",
        },
        {
            id: 9,
            src: "/images/graficos estatistica9.pdf",
        },
        {
            id: 10,
            src: "/images/Gráfico 10 estatistica.pdf",
        },
        {
            id: 11,
            src: "/images/Gráfico 11 estatistica.pdf",
        },
        {
            id: 12,
            src: "/images/Gráfico 12 estatistica.pdf",
        },
        {
            id: 13,
            src: "/images/Gráfico 13 estatistica.pdf",
        },
        {
            id: 14,
            src: "/images/Gráfico 14 estatistica.pdf",
        }
    ];

    const abrirPDF = (pdfUrl) => {
        window.open(pdfUrl, '_blank');
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

            <h1 style={{ 
                textAlign: 'center', 
                color: '#333', 
                marginBottom: '10px',
                fontSize: '2.5rem',
                fontWeight: 'bold'
            }}>
                📊 Ver Gráficos
            </h1>

            <p style={{
                textAlign: 'center',
                color: '#666',
                marginBottom: '40px',
                fontSize: '1.1rem',
                maxWidth: '600px',
                margin: '0 auto 40px'
            }}>
                Clique em qualquer relatório para visualizar o PDF completo
            </p>
            
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '25px',
                maxWidth: '1400px',
                margin: '0 auto'
            }}>
                {pdfsGraficos.map(pdf => (
                    <div key={pdf.id} style={{
                        border: '1px solid #ddd',
                        borderRadius: '12px',
                        padding: '20px',
                        backgroundColor: '#fff',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                    }}
                    onClick={() => abrirPDF(pdf.src)}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.2)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                    }}
                    >
                        <h3 style={{ 
                            margin: '0 0 15px 0', 
                            color: '#2c5aa0',
                            fontSize: '1.3rem',
                            fontWeight: '600',
                            textAlign: 'center'
                        }}>
                            {pdf.titulo}
                        </h3>
                        
                        <div style={{
                            width: '100%',
                            height: '200px',
                            backgroundColor: '#f8f9fa',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '15px',
                            border: '1px solid #e9ecef',
                            borderRadius: '8px',
                            overflow: 'hidden'
                        }}>
                            <div style={{ 
                                textAlign: 'center', 
                                color: '#6c757d',
                                padding: '20px'
                            }}>
                                <div style={{ 
                                    fontSize: '48px', 
                                    marginBottom: '10px',
                                    opacity: 0.7
                                }}>
                                    {pdf.id % 5 === 1 ? '📊' : 
                                     pdf.id % 5 === 2 ? '📈' : 
                                     pdf.id % 5 === 3 ? '📉' : 
                                     pdf.id % 5 === 4 ? '📄' : '📋'}
                                </div>
                                <div style={{ fontWeight: '500', marginBottom: '5px' }}>Relatório PDF</div>
                                <small style={{ fontSize: '12px', opacity: 0.8 }}>
                                    Clique para abrir
                                </small>
                            </div>
                        </div>
                        
                        <p style={{ 
                            margin: 0, 
                            color: '#495057',
                            fontSize: '14px',
                            textAlign: 'center',
                            lineHeight: '1.4'
                        }}>
                            {pdf.descricao}
                        </p>
                        
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '15px',
                            paddingTop: '15px',
                            borderTop: '1px solid #e9ecef'
                        }}>
                            <span style={{
                                fontSize: '12px',
                                color: '#6c757d',
                                backgroundColor: '#e9ecef',
                                padding: '4px 8px',
                                borderRadius: '4px'
                            }}>
                                PDF {pdf.id.toString().padStart(2, '0')}
                            </span>
                            <button 
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                            >
                                📥 Abrir PDF
                            </button>
                        </div>
                    </div>
                ))}
            </div> 
        </div>
    );
}