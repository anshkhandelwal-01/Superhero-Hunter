// Get the ID of the super hero whose details has to be shown

let item_id = localStorage.getItem("searchkey");

// Calling the function to show the details.

abouthero(item_id);

// Function to fetch the character whose details has to be displayed

function abouthero(item_id) {
        fetch(`http://gateway.marvel.com/v1/public/characters/${item_id}?ts=1&apikey=363d61f78e3d30b66fd174058922c390&hash=764574c500b818f5dce961daec5651c8`)
            .then((response) => response.json())
            .then((res) => {
                renderSuperHeros(res);
            });
    }
  
// Function to display the details of the super hero.

  function renderSuperHeros(data) {
    for (let i = 0; i < data.data.results.length; i++) {
        const element = data.data.results[i];
        const parentNode = document.getElementById("mySuperhero");
        const childNode = document.createElement("div");
        childNode.setAttribute("id", "flexbox");
        childNode.innerHTML = `<div><img src="${element.thumbnail.path}/detail.${element.thumbnail.extension}"></div>
        <ul>
        <li>Name: ${element.name}</li>
        <li>Description: ${element.description}</li>
        <li>Number of Comics: ${element.comics.available}</li>
        <li>Number of Events: ${element.events.available}</li>
        <li>Number of Series: ${element.series.available}</li>
        <li>Number of Stories: ${element.stories.available}</li>
        </ul>`;
        parentNode.appendChild(childNode);
    }
  }