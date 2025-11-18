# CINEDEX - seu catálogo de filmes favorito
<div align="center">
  <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/html.png" alt="Icone HTML" width="40"/>
  <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/css.png" alt="Icone CSS" width="40"/>
  <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/figma.png" alt="Icone Figma" width="26"/>
  <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/javascript.png" alt="Icone JavaScript" width="30"/>
</div>
 Uma aplicação web que permite aos usuários explorar e salvar seus filmes favoritos usando a API do TMDB.

---
 `Status: Em ajuste`

## 1. 🌟 Funcionalidades (O Que Ele Faz)

- **Listagem de Filmes Favoritos:** Exibe todos os filmes salvos pelo usuário usando o `localStorage`.
- **Detalhes do Filme:** Permite clicar em um card para ver a página de informações detalhadas (`infofilme.html`).
- **Persistência de Dados:** Salva e mantém a lista de favoritos no navegador (mesmo após fechar a aba).
- **Interação de Favorito:** Permite adicionar ou remover um filme da lista de favoritos com um clique.
- **Ordenação por Lançamento:** Permite ao usuário ordenar a lista de favoritos por **Mais Recente** ou **Mais Antigo**.
- **Tratamento de Dados:** Lida com requisições assíncronas usando a API do TMDB (The Movie Database).

---

## 2. 💻 Tecnologias Utilizadas

- **Front-end:** HTML5, CSS3.
- **Linguagem Principal:** JavaScript (ES6+).
- **API:** The Movie Database (TMDB) para dados de filmes, pôsteres e informações.

---

## 3. 🚀 Desafios e Aprendizados

- **Manipulação de Assincronicidade:** O desafio de buscar vários filmes de uma só vez.
    - *O que aprendei:* Como utilizar o **`Promise.all()`** para esperar o resultado de todas as requisições antes de renderizar a página.
- **Persistência de Dados:** Como salvar informações sem um banco de dados.
    - *O que aprendi:* O uso do **`localStorage`** e a necessidade de converter dados entre JSON e objetos JavaScript (`JSON.stringify()` / `JSON.parse()`).
- **Manipulação de Elementos (DOM):** Como atualizar a página dinamicamente.
    - *O que aprendi:* **Criação de elementos** (`createElement`), **inclusão de atributos de dados** (`dataset.releaseDate`) e **delegação de eventos** (`e.target.closest`).
- **Lógica de Ordenação:**
    - *O que aprendei:* Utilização do método **`Array.prototype.sort()`** para comparar objetos de data (`new Date()`) e reordenar os elementos na tela.

---

## 4. 🛠️ Como Executar o Projeto (Instruções)

1. **Clonar o Repositório:** `git clone https://github.com/LayzaK/CineDex.git`
2. **Acessar a Pasta:** `cd CineDex`
3. **Executar:** Basta abrir o arquivo `inicio.html` , `favoritos.html` ou `infofilmes.html` diretamente no navegador.

---

## 🤝 Autoria

- ✏️ **Desenvolvedora:** Layza Kermilyn Silva Santos
- 🔗 **LinkedIn:** [Layza Santos](https://www.linkedin.com/in/layza-santos-9aab1b260)
- 🐈 **GitHub:** [LayzaK](https://github.com/LayzaK/)
