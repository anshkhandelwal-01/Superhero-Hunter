// Establish link with Marvel.com through MD5 of Timestamp, Public and Private Key and fetching some characters for home page.

fetch('https://gateway.marvel.com/v1/public/characters?ts=1&apikey=363d61f78e3d30b66fd174058922c390&hash=764574c500b818f5dce961daec5651c8')
    .then((response) => response.json())
    .then((res) => {
        console.log(res);
        renderHomelist(res);
    });

// Render the list to display the characters on home page.

function renderHomelist(data) {
    for (let i = 0; i < data.data.results.length; i++) {
        const element = data.data.results[i];
        const parentNode = document.getElementById("main-body");
        const childNode = document.createElement("li");
        childNode.innerHTML = `<a href = "/superHero.html" target = "_blank"><img src="${element.thumbnail.path}/portrait_fantastic.${element.thumbnail.extension}" id="id_${element.id}"></a>
                                <p>${element.name}</p>`;
        parentNode.appendChild(childNode);
    }
}

// Search the super heros that matches the result of search bar

function searchHero(e) {
    e.preventDefault();
    document.getElementById("heros").innerHTML = "";
    const val = document.getElementById("searchSuperHero").value;
    if (val != null) {
        fetch(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${val}&ts=1&apikey=363d61f78e3d30b66fd174058922c390&hash=764574c500b818f5dce961daec5651c8`)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                rendersearchlist(res);
            });
    }
}

// Render the list of characters based on search result.

function rendersearchlist(data) {
    for (let i = 0; i < data.data.results.length; i++) {
        const element = data.data.results[i];
        const parentNode = document.getElementById("heros");
        const childNode = document.createElement("li");
        childNode.innerHTML = `<img src="${element.thumbnail.path}/standard_small.${element.thumbnail.extension}"><a href="/superHero.html" target="_blank" id="id_${element.id}">${element.name}</a>
        <button type="submit" id="${element.id}">Add to favourites</button>`;
        parentNode.appendChild(childNode);
    }
}

// Array to record the IDs of added favourite super heros

var favouriteSuperhero = []; 

// Add the IDs of favourite super heros on local storage

function createFavourites(e) {
    const getID = e.target.id;
    const item = document.getElementById(getID);
    if (item.innerHTML == "Add to favourites") {
        item.innerHTML = "Added to favourites";
        favouriteSuperhero.push(getID);
        localStorage.clear();
        for(let i=0;i<favouriteSuperhero.length;i++){
            localStorage.setItem(i, favouriteSuperhero[i]);
        }
    }
}

// Add the ID of the super hero to local storage to know more about the super hero.

function about(e){
    const getID = e.target.id;
    let ID = getID.slice(3,10);
    console.log(ID);
    localStorage.setItem("searchkey", ID);
}

// Event Listeners 

document.getElementById("searchbtn").addEventListener("click", searchHero);
document.addEventListener("click", createFavourites);
document.addEventListener("click", about);
