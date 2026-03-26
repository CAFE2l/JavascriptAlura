import chalk from "chalk";

function extraiLinks(arrLinks) {
  if (!Array.isArray(arrLinks) || arrLinks.length === 0) {
    return [];
  }
  return arrLinks.map((objetoLink) => {
    if (objetoLink.link) return objetoLink.link;
    if (objetoLink[Object.keys(objetoLink)[0]]) {
      return objetoLink[Object.keys(objetoLink)[0]];
    }
    return Object.values(objetoLink)[0];
  });
}

async function checaStatus(listaURLs) {
  if (!listaURLs || listaURLs.length === 0) return [];

  console.log(chalk.blue(`\n🔍 Validando ${listaURLs.length} link(s)...`));

  const arrStatus = await Promise.all(
    listaURLs.map(async (url, index) => {
      try {
        console.log(chalk.gray(`  ${index + 1}. Testando: ${url.substring(0, 60)}...`));

        // Timeout usando AbortController
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        // Usar GET em vez de HEAD para garantir resposta
        const response = await fetch(url, {
          method: 'GET',
          signal: controller.signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; LinkChecker/1.0)'
          }
        });

        clearTimeout(timeoutId);

        // IMPORTANTE: aqui capturamos o status real
        return {
          status: response.status,
          statusTexto: getStatusText(response.status)
        };

      } catch (erro) {
        clearTimeout(timeoutId);
        return manejaErros(erro, url);
      }
    })
  );

  return arrStatus;
}

function manejaErros(erro, url) {
  console.log(chalk.red(`  ⚠️ Erro ao acessar ${url}: ${erro.message}`));

  // Tratamento detalhado dos erros
  if (erro.name === 'AbortError') {
    return {
      status: 408,
      statusTexto: '⏱️ Timeout - Servidor demorou para responder'
    };
  }
  
  if (erro.cause?.code === 'ENOTFOUND' || erro.message?.includes('ENOTFOUND')) {
    return {
      status: 404,
      statusTexto: '🔗 Link quebrado - Domínio não encontrado'
    };
  }
  
  if (erro.cause?.code === 'ECONNREFUSED') {
    return {
      status: 503,
      statusTexto: '🔌 Serviço indisponível - Conexão recusada'
    };
  }
  
  if (erro.message?.includes('CERT_HAS_EXPIRED')) {
    return {
      status: 495,
      statusTexto: '🔒 Certificado SSL expirado'
    };
  }
  
  if (erro.message?.includes('getaddrinfo')) {
    return {
      status: 404,
      statusTexto: '🔗 Link quebrado - DNS não resolveu'
    };
  }
  
  return {
    status: 0,
    statusTexto: `⚠️ Erro: ${erro.message.substring(0, 60)}`
  };
}

function getStatusText(status) {
  // Status 2xx - Sucesso
  if (status === 200) return '✅ OK';
  if (status === 201) return '✅ Criado';
  if (status === 204) return '✅ Sem conteúdo';
  
  // Status 3xx - Redirecionamento
  if (status === 301) return '↪️ Movido permanentemente';
  if (status === 302) return '↪️ Encontrado';
  if (status === 304) return '↪️ Não modificado';
  
  // Status 4xx - Erro do cliente
  if (status === 400) return '❌ Requisição inválida';
  if (status === 401) return '❌ Não autorizado';
  if (status === 403) return '❌ Acesso proibido';
  if (status === 404) return '🔗 Link não encontrado';
  if (status === 408) return '⏱️ Timeout';
  if (status === 429) return '⏰ Muitas requisições';
  
  // Status 5xx - Erro do servidor
  if (status === 500) return '🔥 Erro interno do servidor';
  if (status === 502) return '🔥 Gateway inválido';
  if (status === 503) return '🔥 Serviço indisponível';
  if (status === 504) return '🔥 Gateway timeout';
  
  return `❓ Status ${status}`;
}

export default async function listaValidada(listaDeLinks) {
  if (!listaDeLinks || listaDeLinks.length === 0) {
    console.log(chalk.yellow('⚠️ Nenhum link para validar'));
    return [];
  }

  const links = extraiLinks(listaDeLinks);

  if (links.length === 0) {
    console.log(chalk.yellow('⚠️ Nenhum link válido encontrado'));
    return [];
  }

  const statusResults = await checaStatus(links);

  const resultado = listaDeLinks.map((objeto, indice) => ({
    texto: objeto.texto || Object.keys(objeto)[0] || 'Sem texto',
    link: objeto.link || Object.values(objeto)[0] || links[indice],
    status: statusResults[indice]?.status || 0,
    statusTexto: statusResults[indice]?.statusTexto || '⚠️ Não foi possível validar'
  }));

  return resultado;
}
