const ACCESS_TOKEN = "INSIRA SUA CHAVE AQUI";
const BASE_URL = 'https://api.themoviedb.org/3/movie';
const favoritesListContainer = document.querySelector(".lista-favoritos");
const genreFilterSelect = document.getElementById("genero-filtro");

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}` 
    }
};


// --- Funções de Persistência ---

function getFavoriteMovies() {
    return JSON.parse(localStorage.getItem('favoriteMovies')) || [];
}

function isMovieFavorited(movieId) {
    const favorites = getFavoriteMovies();
    return favorites.includes(String(movieId));
}

function toggleFavoriteMovie(movieId) {
    let favorites = getFavoriteMovies();
    const idString = String(movieId);
    const index = favorites.indexOf(idString); 

    if (index === -1) { 
        favorites.push(idString);
    } else {
        favorites.splice(index, 1);
    }

    localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
}

// --- Lógica Principal: Busca e Renderização ---

const favoriteMoviesIDs = getFavoriteMovies(); 

if (favoriteMoviesIDs.length === 0) {
    favoritesListContainer.innerHTML = '<p>Você não possui filmes favoritos ainda.</p>';
}

function fetchMovieDetails(movieId) {
    const MOVIE_URL = `${BASE_URL}/${movieId}`; 
    
    return fetch(MOVIE_URL, options)
        .then(res => {
            if (!res.ok) { return {}; } 
            return res.json();
        })
        .catch(err => {
            console.error(`Erro ao buscar o filme ID ${movieId}:`, err);
            return {};
        });
}

async function renderFavoriteMovies(favoriteIds) {
    const moviePromises = favoriteIds.map(id => fetchMovieDetails(id));
    
    // Promise.all espera todas as requisições
    const movies = await Promise.all(moviePromises);

    movies.forEach(movie => {
        if (movie.id) { 
            const movieCard = document.createElement("div");
            createMovieCard(movie, movieCard);
            favoritesListContainer.appendChild(movieCard);
        }
    });

    console.log(`Pronto! ${movies.length} filmes favoritos foram carregados.`);
}

if (favoriteMoviesIDs.length > 0) { 
    renderFavoriteMovies(favoriteMoviesIDs);
}

// --- Função de Criação de Card (Incluindo Lógica de Remoção) ---
function createMovieCard(movie, containerElement) {
    containerElement.classList.add("movie-card");
    containerElement.dataset.movieId = movie.id;
    
    if (movie.release_date) {
        containerElement.dataset.release_date = movie.release_date;
    }


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
        
        toggleFavoriteMovie(movie.id); 

        const isNowFavorited = favoriteBtn.classList.toggle("favorited");

        if (isNowFavorited) {
            path.setAttribute("fill", "#8e0000ce");
            path.setAttribute("stroke", "#8e0000");
        } else {
            path.setAttribute("fill", "none");
            path.setAttribute("stroke", "#ffffff");
            
            // Lógica para remover o card da visualização de favoritos
            containerElement.remove(); 
            
            // Checa se a lista ficou vazia
            if (getFavoriteMovies().length === 0) {
                favoritesListContainer.innerHTML = '<p>Você não possui filmes favoritos ainda.</p>';
            }
        }
    });
}

// Evento de clique nos cards de filme
favoritesListContainer.addEventListener("click", (e) => { 
    const clickedCard = e.target.closest(".movie-card");
    if (clickedCard) {
        const movieId = clickedCard.dataset.movieId;
        window.location.href = `infofilme.html?id=${movieId}`;
    }
});
