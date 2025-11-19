import axios from "axios";

// Configuração da URL base da API
// VERIFIQUE ESTA LINHA! Se o seu backend estiver em "http://localhost:8080/api",
// você DEVE trocar o valor abaixo para essa string.
const API = "http://localhost:8080";

/**
 * Função auxiliar para extrair o array de dados da resposta do Axios,
 * lidando com múltiplos formatos de API (array puro, content, _embedded, etc.).
 * @param {object} response O objeto de resposta retornado pelo Axios.
 * @returns {Array} O array de dados, ou um array vazio se não for encontrado.
 */
function extractDataArray(response) {
    const data = response?.data;

    // 1. Caso ideal: A API retorna um array JSON puro (response.data é o array)
    if (Array.isArray(data)) {
        return data;
    }

    // 2. Caso comum no Spring Data REST (com ou sem paginação): O array está na chave 'content'
    if (data && Array.isArray(data.content)) {
        return data.content;
    }

    // 3. Caso HATEOAS/HAL: Procura no objeto '_embedded'
    if (data?._embedded) {
        // Tenta encontrar a primeira chave que contenha um array dentro de _embedded
        for (const key in data._embedded) {
            if (Array.isArray(data._embedded[key])) {
                console.warn(`[extractDataArray] Usando a chave _embedded.${key} para extração. Ajuste o service se necessário.`);
                return data._embedded[key];
            }
        }
    }

    // 4. Caso aninhado: Tenta pegar o primeiro array encontrado no objeto raiz (se houver)
    if (data && typeof data === 'object') {
        for (const key in data) {
            if (Array.isArray(data[key])) {
                console.warn(`[extractDataArray] Usando a chave '${key}' para extração. Verifique a URL.`);
                return data[key];
            }
        }
    }

    // 5. Caso fallback: Retorna um array vazio e loga o que veio
    console.error("[extractDataArray] FALHA CRÍTICA: Não foi possível encontrar o array de dados no objeto de resposta. Resposta recebida:", data);
    return [];
}

/**
 * Função genérica para chamar a API e aplicar o tratamento de erros.
 * @param {string} url O endpoint da API (ex: '/clientes').
 * @param {boolean} shouldExtract Se deve usar a função extractDataArray (para listas).
 * @returns {any} Os dados processados ou o array vazio em caso de falha.
 */
async function fetchData(url, shouldExtract = true) {
    const fullUrl = `${API}${url}`;
    try {
        const response = await axios.get(fullUrl);

        // Loga o sucesso (para você ver que a requisição chegou)
        console.log(`[SUCESSO ${url}] Resposta recebida:`, response.data);

        if (shouldExtract) {
            return extractDataArray(response);
        }
        return response.data;

    } catch (error) {
        // Loga o erro de rede (404, 500, CORS)
        if (error.response) {
            // A API respondeu com um código de erro (4xx ou 5xx)
            console.error(`[ERRO ${url}] Código: ${error.response.status}. Mensagem da API:`, error.response.data);
        } else if (error.request) {
            // A requisição foi feita, mas não houve resposta (CORS ou API offline)
            console.error(`[ERRO ${url}] Sem resposta. Verifique se o servidor (${fullUrl}) está ligado e se o CORS está configurado.`, error.message);
        } else {
            // Algo aconteceu ao configurar a requisição
            console.error(`[ERRO ${url}] Erro desconhecido na requisição:`, error.message);
        }
        return [];
    }
}


// ============================
// CONSULTAS DO PROJETO (usando a nova função fetchData)
// ============================

export async function getComidasMaisVendidas() { return fetchData('/consultas/comidas-mais-vendidas'); }
export async function getDesempenhoEntregas() { return fetchData('/consultas/desempenho-entregas'); }
export async function getClientesSemPedidos() { return fetchData('/consultas/clientes-sem-pedidos'); }
export async function getRestaurantesAvaliacoes() { return fetchData('/consultas/restaurantes-avaliacoes'); }
export async function getRestaurantesAcimaMedia() { return fetchData('/consultas/restaurantes-acima-media'); }
export async function getEntregadoresDesempenho() { return fetchData('/consultas/entregadores-desempenho'); }
export async function getIndices() { return fetchData('/consultas/indices', false); } // Retorna objeto direto

// ============================
// DADOS PARA DASHBOARD (usando a nova função fetchData)
// ============================

// Total de Clientes
export async function getTotalClientes() {
    const clientes = await fetchData('/clientes');
    return clientes.length; // Calcula o total do array extraído
}

// Total de Restaurantes
export async function getTotalRestaurantes() {
    const restaurantes = await fetchData('/restaurantes');
    return restaurantes.length; // Calcula o total do array extraído
}

// Total de Produtos
export async function getTotalProdutos() {
    const produtos = await fetchData('/produtos');
    return produtos.length; // Calcula o total do array extraído
}

// Total de Pedidos
export async function getTotalPedidos() {
    const pedidos = await fetchData('/pedidos');
    return pedidos.length; // Calcula o total do array extraído
}


// ============================
// GRÁFICOS E ESTATÍSTICAS
// ============================

// Pedidos agrupados por mês
export async function getPedidosPorMes() {
    const pedidos = await fetchData('/pedidos'); // Pega o array limpo

    // Se a extração falhar, 'pedidos' será um array vazio e o forEach não rodará, o que é seguro.
    if (pedidos.length === 0) return [];

    const agrupado = {};

    pedidos.forEach(p => {
        // ... sua lógica de agrupamento
        // Certifique-se de que 'dataHora' está correto e é um campo de data no JSON
        if (!p.dataHora) {
            console.error("Campo 'dataHora' faltando ou nulo no pedido:", p);
            return; // Pula este item para evitar erro
        }
        const mes = new Date(p.dataHora).getMonth() + 1;
        if (!agrupado[mes]) agrupado[mes] = 0;
        agrupado[mes]++;
    });

    return Object.entries(agrupado).map(([mes, total]) => ({ mes, total }));
}


// Produtos mais vendidos (contando quantidades)
export async function getProdutosMaisVendidos() {

    const detalhes = await fetchData('/detalhepedido'); // Pega o array limpo

    if (detalhes.length === 0) return [];

    const contagem = {};

    detalhes.forEach(d => {
        // Certifique-se de que 'idProduto' e 'quantidade' estão corretos
        if (!d.idProduto || !d.quantidade) {
            console.error("Campos 'idProduto' ou 'quantidade' faltando/nulos no detalhe:", d);
            return; // Pula este item para evitar erro
        }
        if (!contagem[d.idProduto]) contagem[d.idProduto] = 0;
        contagem[d.idProduto] += d.quantidade;
    });

    return Object.entries(contagem).map(([idProduto, total]) => ({
        produtoId: Number(idProduto), // Converte a chave (que é string) para número se necessário
        total
    }));

}