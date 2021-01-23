function moviesSearch() {
    let data = getMoviesData()
      .then(data => generateMoviesHTML(data))
      .catch((err) => console.error(err));
};

async function getMoviesData() {
    const url = "https://gist.githubusercontent.com/jakerb/03e24f09aef4230eaeb98136e822599a/raw/a05b75ecd50d743ef1700a15cb3508d8a00541db/movies.json";        
    if (localStorage.moviesData) {
        console.log("Found data in local storage.");
        return JSON.parse(localStorage.getItem("moviesData"));
    } else {
        console.log("Fetching data...");
        const response = await fetch(url);
        const data = await response.json();
        console.log("Data fetched.")
        localStorage.setItem("moviesData", JSON.stringify(data));
        return JSON.parse(localStorage.getItem("moviesData"));
    };
};

function generateMoviesHTML(data) {
    let movies_results = [];
    let search = document.getElementById("search").value;
    
    for (let i = 0; i < data.length; i++) {
        if (data[i]["title"].toLowerCase().includes(search.toLowerCase())) {
            movies_results.push(data[i]);
        };
    };
    
    let movies_html = "";
    for (let i = 0; i < (movies_results.length < 99 ? movies_results.length : 99); i++) {
        image = movies_results[i].info.image_url;
    
        movies_html += `
            <div class="col">
                <div class="card" style="width: 18rem;">
                    <img src=${movies_results[i].info.image_url} class="card-img-top" width="100" alt="Image" onerror="this.src='https://i.imgur.com/qRGI2By.png'" />
                    <div class="card-body">
                        <h5 class="card-title">${movies_results[i].title}</h5>
                        <h6 class="card-subtitle">${movies_results[i].year}</h5>
                        <p class="card-text">${movies_results[i].info.plot}</p>
                        <button id=${i} type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target=${"#modal" + i}>More info</button>
                    </div>
                    
                    <div class="modal fade" id=${"modal" + i} tabindex="-1" aria-labelledby=${"modal" + i + "label"} aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id=${"modal" + i + "label"}>${movies_results[i].title}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <ul>
                                    <li>Released: ${movies_results[i].year}</li>
                                    <li>Rating: ${movies_results[i].info.rating}/10</li>
                                    <li>Plot: ${movies_results[i].info.plot}</li>
                                </ul>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        `
    };    
    document.getElementById("movies-list").innerHTML = movies_html;
}