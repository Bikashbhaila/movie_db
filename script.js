document.getElementById("my_form").addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    const searchInput = e.target.query.value;
    console.log(searchInput);

    e.target.query.value = "";
    getMovies(searchInput);
}

function getMovies(userInput) {
    const apiKey = "f192a57a";  // http://www.omdbapi.com/?apikey=f192a57a&s=Titanic&limit=12
    const URL = `http://www.omdbapi.com/?apikey=${apiKey}&s=${userInput}`;
    console.log(URL);

    // https://api.giphy.com/v1/gifs/search?api_key=HnjTa3OFMAQ4fU1Ee82yCcyU4I6NsKwl&q=Kanye&limit=12

    fetch(URL)
        .then((response) => response.json())
        .then((res) => {
            const movies = res.Search;
            console.log(movies);
            document.getElementById("container").innerHTML = ""; // setting the container to blank so it will load the content in slow networks
            displayMovies(movies);  // delegating below to show gifs in container
        })
        .catch((err) => console.log(err));
}

function displayMovies(films) {
    for (const film of films) {
        const title = film.Title;
        const year = film.Year;
        const posterUrl = film.Poster;

        const card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "18rem";

        card.innerHTML = `
            <img src = ${posterUrl} class = "card-img-top" alt=${title}>
            <div class="card-body">
            <p class="card-text">
            Title: ${title} <br>
            Year: ${year} </p>
            </div>
            `;
        document.getElementById("container").appendChild(card);

    }
}