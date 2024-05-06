import { fazerPergunta } from "./service/pergunta.js";
import { perguntar } from "./service/perguntaLivre.js";
import { consultar } from "./service/consultaDestino.js";
import { processaImagem } from "./service/processaImagem.js";
import { processaArquivoTexto } from "./service/categorizador.js";

async function principal() {
  const escolha = await fazerPergunta(`Escolha uma das opções abaixo: \n
  1. Fazer uma pergunta livre sobre um destino;
  2. Comparação de destinos por categorias;
  3. Ver informações com base em uma imagem;
  4. Fazer a análise de sentimentos baseado em arquivo texto
  \nOpção desejada: `);

  if (escolha === "1") {
    await perguntar();
  } else if (escolha === "2") {
    await consultar();
  } else if (escolha === "3") {
    const imagem = await fazerPergunta("\nMe informe o caminho completo e nome da imagem: ");
    await processaImagem(imagem);
  } else if (escolha === "4") {
    await processaArquivoTexto();
  } else {
    console.log("Escolha inválida.");
  }
}

principal();
