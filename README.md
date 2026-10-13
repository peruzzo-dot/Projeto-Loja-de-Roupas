# Vitrine Digital – Marisa Senti

Vitrine online para uma loja de roupas femininas de bairro. O cliente escolhe as peças e o tamanho, e o pedido já chega pronto no WhatsApp da loja.

Projeto desenvolvido como **extensão universitária**, em parceria com a proprietária da loja.

## O problema

A loja divulga e vende apenas pelas redes sociais e pelo WhatsApp. Isso gera:

- repetição constante das mesmas perguntas (preço, tamanho, cor e disponibilidade);
- dependência do alcance e dos algoritmos das plataformas;
- apresentação pouco organizada das peças.

## A solução

Um site vitrine, simples e rápido, com um link único que pode ficar na bio do Instagram.

### Funcionalidades

- **Looks disponíveis** com foto, preço, cor e selo de status (disponível, esgotado ou sob encomenda).
- **Contador** de looks disponíveis no momento.
- **Seleção de tamanho** em cada peça.
- **Próximas encomendas**, com data prevista de chegada e contagem de dias.
- **Tabela de medidas** em centímetros.
- **Como comprar**, com o passo a passo para a cliente.
- **Carrinho fixo** com total e remoção de itens.
- **Finalização pelo WhatsApp**, com a lista de peças, tamanhos e total já escritos na mensagem.
- **Layout responsivo**, pensado para o celular.

## Tecnologias

- HTML5
- CSS3 (variáveis, grid e flexbox)
- JavaScript puro (sem frameworks)

## Estrutura

```
loja-marisa/
├── index.html    # estrutura da página
├── style.css     # visual da vitrine
├── script.js     # dados, carrinho e lógica
└── img/          # fotos das peças
```

## Como executar

1. Baixe ou clone o repositório.
2. Abra o arquivo `index.html` no navegador (ou use a extensão Live Server do VS Code).

Não há instalação nem dependências.

## Como atualizar a vitrine

Todos os dados que mudam ficam no início do `script.js`:

- `CONFIG`: número do WhatsApp, data da próxima encomenda, tabela de medidas e texto do "Como comprar";
- `produtos`: nome, preço, tamanhos, cor, status (`disponivel`, `esgotado` ou `encomenda`) e imagem de cada peça.

Para adicionar uma peça, copie uma linha da lista `produtos`, troque os dados e salve a foto na pasta `img`.

## Status do projeto

Protótipo funcional. As imagens atuais são **ilustrativas**, usadas apenas para demonstrar a proposta, e os dados de tamanho, cor, status e medidas são exemplos a serem confirmados com a proprietária.

### Próximos passos

- Substituir as imagens e os dados de exemplo pelos reais da loja.
- Publicar o site em um endereço próprio da loja.
- Avaliar um painel simples para a proprietária atualizar peças e status sem mexer no código.
- Avaliar botão opcional de vídeo por peça (link para Reels ou Stories da loja).

## Autoria

Desenvolvido por **Seu Nome** ([@peruzzo-dot](https://github.com/peruzzo-dot)) como projeto de extensão universitária.