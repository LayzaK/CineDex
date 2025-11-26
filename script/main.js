// variáveis para a barra de pesquisa inicio.html
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const ACCESS_TOKEN = "INSIRA A CHAVE AQUI";
const BASE_URL = 'https://api.themoviedb.org/3/movie/popular';
const movieListContainer = document.querySelector(".movie-list");

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}` 
    }
};

// -- Função de persistência do Local Storage --

//1. Obtem a lista de IDs salvos 
function getFavoriteMovies() {
    // JSON.parse converte a string de volta para array. Se nada, array vazio.
    return JSON.parse(localStorage.getItem('favoriteMovies')) || [];
}

//2. Verifica se o filme já está favoritado
function isMovieFavorited(movieId) {
    const favorites = getFavoriteMovies();
    // Checa se o Array inclui o ID (convertido para string)
    return favorites.includes(String(movieId));
}

//3. Adiciona ou remove um filme da lista e salva no Local Storage
function toggleFavoriteMovie(movieId) {
    let favorites = getFavoriteMovies();
    const idString = String(movieId);

    // Procura o ID na lista. Se não encontrar, o 'index' será -1
    const index = favorites.indexOf(idString); // 🐛 CORREÇÃO 1: indexOf deve ser chamado no array 'favorites'

    if (index === -1) { 
        // Se não estiver na lista, adiciona
        favorites.push(idString);
    } else {
        // Se já estiver, remove
        favorites.splice(index, 1);
    }

    // Salva a lista atualizada no Local Storage
    // JSON.stringify converte o array para string
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
}


// -- Função principal de busca --
function fetchAndRenderMovies(url) {
    movieListContainer.innerHTML = '';

    fetch(url, options)
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        const movies = data.results;

        if (movies.length === 0) {
            movieListContainer.innerHTML = '<p>Nenhum filme encontrado.</p>';
            return;
        }

        movies.forEach(movie => {
            const movieCard = document.createElement("div");
            createMovieCard(movie, movieCard);
            movieListContainer.appendChild(movieCard);
        });

        console.log(`Pronto! Todos os ${movies.length} filmes foram carregados.`);
    })
    .catch(err => console.error('Erro na Busca pelo Filme:', err));
}

// URL de fallback
const DEFAULT_URL = BASE_URL;
fetchAndRenderMovies(DEFAULT_URL);

// Event Listener para o botão de busca
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();

    if (query) {
        const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`;
        fetchAndRenderMovies(searchUrl);
    } else {
        fetchAndRenderMovies(DEFAULT_URL);
    }
});

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        // e .preventDefault(); previne o comportamento padrão do Enter
        e.preventDefault();
        searchButton.click(); // Dispara o clique no botão de busca
    }
});


// Função para criar o card do filme
function createMovieCard(movie, containerElement) {
    containerElement.classList.add("movie-card");
    containerElement.dataset.movieId = movie.id;

    const image = document.createElement("img");
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
    if (movie.poster_path) {
        image.src = `${imageBaseUrl}${movie.poster_path}`;
        image.alt = movie.title || "Movie Poster";
    } else {
        image.src = "https://via.placeholder.com/500x750?text=No+Image";
        image.alt = "Nenhum poster disponível";
    }
    containerElement.appendChild(image);

    const title = document.createElement("h3");
    title.textContent = movie.title;
    containerElement.appendChild(title);  

    // criando o botão de favoritar
    const favoriteBtn = document.createElement("button");
    favoriteBtn.classList.add("favorite-btn");
    favoriteBtn.dataset.movieId = movie.id;
    favoriteBtn.type = "button";

    // criando o ícone do bookmark
    const bookmarkIcon = document.createElement("span");
    bookmarkIcon.classList.add("bookmark-icon");

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("viewBox", "0 0 50 50");
    svg.setAttribute("aria-hidden", "true");

    // path do bookmark
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", "M37,43l-13,-6l-13,6v-34c0,-2.2 1.8,-4 4,-4h18c2.2,0 4,1.8 4,4z");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "1");
    path.classList.add("bookmark-path");

    svg.appendChild(path);
    bookmarkIcon.appendChild(svg);
    favoriteBtn.appendChild(bookmarkIcon);

    // Verifica estado inicial do favorito
    if (isMovieFavorited(movie.id)) {
        favoriteBtn.classList.add("favorited");
        path.setAttribute("fill", "#8e0000ce");
        path.setAttribute("stroke", "#8e0000");
    }

    // acessibilidade
    favoriteBtn.setAttribute("aria-label", `Favoritar ${movie.title}`);

    containerElement.appendChild(favoriteBtn);

    // alternando entre bookmark vazio e preenchido
    favoriteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleFavoriteMovie(movie.id); // 🎉 CONEXÃO COMPLETA: Dispara o salvamento/remoção no localStorage
        const isNowFavorited = favoriteBtn.classList.toggle("favorited");
        if (isNowFavorited) {
            path.setAttribute("fill", "#8e0000ce");
            path.setAttribute("stroke", "#8e0000");
        } else {
            path.setAttribute("fill", "none");
            path.setAttribute("stroke", "#ffffff");
        }
    });
}

// Evento de clique nos cards de filme (fora da Promise)
movieListContainer.addEventListener("click", (e) => {
    const clickedCard = e.target.closest(".movie-card");
    if (clickedCard) {
        const movieId = clickedCard.dataset.movieId;
        window.location.href = `infofilme.html?id=${movieId}`;
    }
});
