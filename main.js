function movieButtonClicked(movie_id) {
    alert(movie_id);
};

const url = "https://gist.githubusercontent.com/jakerb/03e24f09aef4230eaeb98136e822599a/raw/a05b75ecd50d743ef1700a15cb3508d8a00541db/movies.json";        
async function getData() {
    const response = await fetch(url);
    const data = await response.json();         
    
    let movies_results = [];
    let search = document.getElementById("search").value;
    
    for (let i = 0; i < data.length; i++) {
        if (data[i]["title"].toLowerCase().includes(search.toLowerCase())) {
            movies_results.push(data[i]);
        }
    }
    
    let movies_html = "";
    for (let i = 0; i < movies_results.length; i++) {
        image = movies_results[i].info.image_url;

        movies_html += `
            <div class="col">
                <div class="card" style="width: 18rem;">
                    <img src=${movies_results[i].info.image_url} class="card-img-top" width="100" alt="Image" onerror="this.src='https://i.imgur.com/qRGI2By.png'" />
                    <div class="card-body">
                        <h5 class="card-title">${movies_results[i].title}</h5>
                        <h6 class="card-subtitle">${movies_results[i].year}</h5>
                        <p class="card-text">${movies_results[i].info.plot}</p>
                        <button id=${i} class="btn btn-primary" data-toggle="modal" data-target=${"modal" + i}>More info</button>
                    </div>
                    
                    <div class="modal fade" id=${"modal" + i} tabindex="-1" role="dialog" aria-labelledby=${"modal" + i + "label"} aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                Modal body goes into here example 123.
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
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
