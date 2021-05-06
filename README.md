<h1 align="center">
    <img alt="spacetraveling" title="spacetraveling" src="/assets/spacetraveling-logo.svg" width="400px" />
</h1>

<!-- TABLE OF CONTENTS -->

<h5 align="center"> 
<a href="#sobre">Sobre</a>
   •   <a href="#tecnologias">Tecnologias</a> 
   •   <a href="#roadmap">Roadmap</a> 
   •   <a href="#instalação">Instalação</a> 
   •   <a href="#visão-do-projeto">Visão do projeto</a>
   •   <a href="#agradecimento">Agradecimento</a> 
   •   <a href="#licença">Licença</a>     
   •   <a href="#autor">Autor</a> 
</h5>

## Sobre

<h4>SpaceTraveling é um blog desenvolvido com Next.js e Prismic CMS</h4>

Este projeto é uma versão atualizada da aplicação SpaceTraveling que pode ser encontrada [aqui](https://github.com/die-goncalves/ignite-reactjs-modulo03-desafio01-spacetraveling). O desafio proposto era adicionar novas funcionalidades para a aplicação, incluí área para comentários, navegação entre posts, informação se o post foi atualizado após sua criação e um sistema de preview dos posts onde o criador de conteúdo pode verificar como ficará o post na página da aplicação antes de publicá-lo.  O layout da aplicação sofreu modificações com as novas funcionalidades, para criar a nova interface utilizei como base o layout complementar disponibilizado [aqui](https://www.figma.com/file/0Y26j0tf1K2WB5c1ja5hov/Desafios-Módulo-3-ReactJS).

## Tecnologias

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [Prismic](https://prismic.io/)
- [Figma](https://www.figma.com/)
- [Sass](https://sass-lang.com/)
- [date-fns](https://date-fns.org/docs/Getting-Started)
- [Fetch_API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch)
- [react-icons](https://react-icons.github.io/react-icons/)
- [Utterances](https://utteranc.es/)

## Roadmap

- [x] Comentários com Utteranc;
- [x] Preview do documento Prismic;
- [x] Navegação entre post anterior e próximo;
- [x] Informação de edição do post.

## Instalação

- ### **Pré-requisitos**
  - É **necessário** possuir o **[Git](https://git-scm.com/)** instalado e configurado no computador.
  - É **necessário** ter um gerenciador de pacotes seja o **[NPM](https://www.npmjs.com/)** ou **[Yarn](https://yarnpkg.com/)**.
  - É **necessário** ter o Prismic configurado. Faça o seguinte:
    - Crie uma conta no Prismic.
    - Crie um repositório.
    - Selecione o botão Custom Type na barra lateral, clique em Repeatable Type e digite o nome 'posts'.
    - O type 'posts' deve ter um formato. Siga o arquivo json - [posts.json](/assets/posts.json), ou a imagem a seguir:
      <div>
        <img alt="posts" title="posts" src="/assets/posts.jpg" width="75%"/>
      </div>
    - Agora com o 'posts' estruturado clique no botão Documents e crie alguns exemplos para testar a aplicação.

- ### **Próximo passo**
1. Faça um clone deste repositório:
   ```sh
   $ git clone https://github.com/die-goncalves/ignite-reactjs-modulo03-desafio02-spacetraveling-new-features
   ```

2. Instale as depêndencias:
   ```sh
   # Entre no diretório do repositório clonado
   $ cd ignite-reactjs-modulo03-desafio02-spacetraveling-new-features
   # Instale as dependências do projeto.
   $ yarn #ou $ npm install
   ```

3. Crie na raiz do projeto o arquivo **.env.local**.<br/>
   Siga a numeração na imagem para pegar o endpoint que se encontra no número 3 e coloque na variável PRISMIC_API_ENDPOINT.
   <img alt="endpoint" title="endpoint" src="/assets/endpoint.jpg"/>

   Crie um token de acesso nas configurações do Prismic, siga as imagens:
   <img alt="createacesstoken" title="createacesstoken" src="/assets/createacesstoken.jpg"/>
   <img alt="permanentacesstoken" title="permanentacesstoken" src="/assets/permanentacesstoken.jpg"/>
   Copie o token de 'Permanent access tokens' e coloque na variável PRISMIC_ACCESS_TOKEN.
   ```sh
   # PRISMIC
   PRISMIC_API_ENDPOINT=
   PRISMIC_ACCESS_TOKEN=
   ```

4. Execute a aplicação
   ```sh
   $ yarn dev #ou $ npm run dev
   # A aplicação inciará na porta:3000 - acesse <http://localhost:3000>
   ```

## Visão do projeto

<img src="/assets/spacetravelinggif.gif" alt="spacetraveling" width="100%" height="80%">

## Agradecimento

<table width="100%" align="center">
    <tr>
        <th>
            <a href="https://rocketseat.com.br/">
                <img width="150" height="150" src="https://avatars.githubusercontent.com/u/28929274?s=200&v=4">
                <br /><sub><b>Rocketseat</b></sub>
            </a>
        </th>
        <th>
            <img width="150" height="150" src="/assets/ignite-logo.svg">
            <br /><sub><b>Ignite</b></sub>
        </th>
        <th>
            <a href="https://github.com/diego3g">
                <img width="150" height="150" src="https://avatars.githubusercontent.com/u/2254731?s=400&u=4fcc8ca9672eeb41ea800271831b7c687bc17054&v=4">
                <br /><sub><b>diego3g (Diego Fernandes)</b></sub>
            </a>
        </th>
    </tr>
</table>

## Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Autor

Feito por Diego Gonçalves, contato:

[![Badge](https://img.shields.io/static/v1?label=Linkedin&message=Diego%20Gonçalves&color=208BEE&style=flat-square&logo=linkedin&link=https://www.linkedin.com/in/diego-goncalves1990)](https://www.linkedin.com/in/diego-goncalves1990)
[![Badge](https://img.shields.io/static/v1?label=Gmail&message=die.goncalves1990@gmail.com&color=EA5134&style=flat-square&logo=gmail&link=mailto:die.goncalves1990@gmail.com)](mailto:die.goncalves1990@gmail.com)