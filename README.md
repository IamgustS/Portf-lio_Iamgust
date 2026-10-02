# Portfólio — Gustavo Rodrigues

Este é um site estático para apresentar minha trajetória, áreas de interesse, projetos, formação e canais de contato.

## Sobre o projeto

O portfólio foi desenvolvido para funcionar como uma vitrine digital pessoal, com foco em:

- apresentação profissional clara e objetiva;
- navegação intuitiva entre seções;
- visual moderno com tema claro e escuro;
- busca por projetos e conteúdos;
- acessibilidade e boa experiência em dispositivos diferentes.

## Tecnologias

- HTML5: estrutura semântica e marcação acessível.
- CSS3: layout responsivo, tokens visuais, animações e suporte a movimento reduzido.
- JavaScript: alternância de tema, navegação ativa, busca, diálogos e interações de interface.

O projeto não utiliza framework, build tools ou dependências instaladas localmente.

## Estrutura do repositório

```text
.
├── index.html        # Estrutura, conteúdo e seções da página
├── Style.css         # Estilos, layout, responsividade e temas
├── Main.js           # Interações e comportamento da interface
├── img/
│   ├── icon.jpg      # Ícone / marca do cabeçalho
│   ├── icon4.jpg     # Imagem do projeto Estoque omnichannel
│   └── ...
├── README.md         # Documentação do projeto
├── .gitignore
└── LICENSE           # Se houver no repositório
```

## Como executar localmente

1. Baixe ou clone o repositório.
2. Abra a pasta do projeto.
3. Execute o arquivo `index.html` diretamente no navegador.

Você também pode usar a extensão Live Server no VS Code para visualizar o projeto em ambiente local.

> Não é necessário instalar pacotes nem configurar ambiente de desenvolvimento.

## Publicar no GitHub Pages

1. Envie o projeto para um repositório GitHub.
2. Acesse **Settings → Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Escolha a branch principal e a pasta `/(root)`.
5. Salve as configurações.

O GitHub Pages vai publicar o site a partir do arquivo `index.html`.

## Personalização

Para adaptar o projeto ao seu perfil, você pode ajustar:

- links de e-mail, LinkedIn, GitHub e Instagram;
- textos das seções e descrições;
- projetos exibidos no grid;
- itens de formação e certificações;
- imagens e conteúdos visuais da pasta `img/`.

## Funcionalidades da interface

- tema claro/escuro salvo no `localStorage`;
- busca por projetos e seções;
- navegação sincronizada com a seção visível;
- cards de projeto com diálogo detalhado;
- suporte a teclado e acessibilidade;
- respeito ao `prefers-reduced-motion`.

## Segurança e boas práticas

- A página utiliza uma CSP (Content Security Policy) para restringir scripts e recursos externos.
- Links externos abrem em nova aba com `noopener noreferrer`.
- O projeto não possui backend, banco de dados ou autenticação.
- Para publicação em GitHub Pages, é recomendado manter o site em HTTPS.
- Fontes, ícones e imagens externas podem ser hospedadas localmente para reduzir dependência de terceiros.

## Observação

Este projeto está pensado como um portfólio pessoal simples, leve e fácil de manter. Ele pode ser expandido com novos projetos, experiências e conteúdos conforme a sua evolução profissional.
