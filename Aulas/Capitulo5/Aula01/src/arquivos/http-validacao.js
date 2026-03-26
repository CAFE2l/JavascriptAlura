import chalk from "chalk";

function extraiLinks(arrLinks) {
  if (!Array.isArray(arrLinks) || arrLinks.length === 0) {
    return [];
  }
  
  // Suporta ambos os formatos
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
        console.log(chalk.gray(`  ${index + 1}. Testando: ${url.substring(0, 50)}...`));
        const response = await fetch(url, {
          method: 'HEAD', // Usar HEAD é mais rápido
          timeout: 5000   // Timeout de 5 segundos
        });
        return response.status;
      } catch (erro) {
        return manejaErros(erro, url);
      }
    })
  );
  return arrStatus;
}

function manejaErros(erro, url) {
  // Log para debug
  console.log(chalk.red(`  Erro ao acessar ${url}: ${erro.message}`));
  
  // Tratamento específico para diferentes erros
  if (erro.cause?.code === 'ENOTFOUND' || erro.message?.includes('ENOTFOUND')) {
    return 404; // Retorna 404 para link não encontrado
  } else if (erro.cause?.code === 'ECONNREFUSED') {
    return 503; // Serviço indisponível
  } else if (erro.message?.includes('CERT_HAS_EXPIRED')) {
    return 495; // Erro de certificado SSL
  } else if (erro.message?.includes('timeout')) {
    return 408; // Timeout
  } else {
    return 0; // Erro desconhecido
  }
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
  
  const status = await checaStatus(links);

  const resultado = listaDeLinks.map((objeto, indice) => ({
    ...objeto,
    status: status[indice],
    statusTexto: getStatusText(status[indice])
  }));
  
  return resultado;
}

function getStatusText(status) {
  if (status >= 200 && status < 300) return '✅ OK';
  if (status >= 300 && status < 400) return '↪️ Redirecionamento';
  if (status >= 400 && status < 500) return '❌ Erro do cliente';
  if (status >= 500) return '🔥 Erro do servidor';
  if (status === 404) return '🔗 Link quebrado';
  if (status === 0) return '⚠️ Não acessível';
  return '❓ Status desconhecido';
}
