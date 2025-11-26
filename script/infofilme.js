const ACCESS_TOKEN = "INSIRA SUA CHAVE DA API AQUI";
const BASE_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&primary_release_year=2025';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        // Usa o token longo que começa com 'Bearer eyJ...'
        Authorization: `Bearer ${ACCESS_TOKEN}` 
    }
};

const mainContainer = document.querySelector("main");

//1. Lê o id da url
function getMovieIdFromUrl() {
    // cria um objeto URLSearchParams a partir da query string
    const params = new URLSearchParams(window.location.search);

    // retorna o valor do parâmetro 'id'
    return params.get("id");
}

//2. Faz o fetch do filme escolhido
async function fetchMovieDetails(movieId) {
    if (!movieId) {
        mainContainer.innerHTML = "<p>Filme não encontrado.</p>";
        return;
    }

    // Endpoint para pegar detalhes do filme
    const DETAILS_URL = `https://api.themoviedb.org/3/movie/${movieId}`;
    try {
        const response = await fetch(DETAILS_URL, options);
        const movie = await response.json();
        
        //3. Chama a função para exibir os detalhes
        displayMovieDetails(movie);

    } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
        mainContainer.innerHTML = "<p>Erro ao carregar detalhes do filme.</p>";
    }
}

// 4. Monta o layout da página
function displayMovieDetails(movie) {
    mainContainer.innerHTML = `
        <section class="movie-details-card">
            
            <div class="poster-container">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster"/>
            </div>

            <div class="info-block">
                <h1>${movie.title}</h1>
                <p><strong>Sinopse:</strong> ${movie.overview}</p>
                <p><strong>Lançamento:</strong> ${movie.release_date}</p>
                <p><strong>Nota Média:</strong> ${movie.vote_average.toFixed(1)}</p>
            </div>
            
        </section>`;
}

// Executa ao carregar a página
const movieId = getMovieIdFromUrl();
fetchMovieDetails(movieId);
