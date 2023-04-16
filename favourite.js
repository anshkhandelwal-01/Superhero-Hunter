// Array to store the IDs extratcted from local storage.

let favouritesuperhero =[]; 

// For loop to push the IDs to the above created array.

for(let i=0;i<100;i++){
  if(localStorage.getItem(i)!=null){
  favouritesuperhero.push(localStorage.getItem(i));
  }
}

// Fetch the favourite super hero(fsh)

function getheros(fsh) {
  for (let i = 0; i < fsh.length; i++) {
      fetch(`https://gateway.marvel.com/v1/public/characters/${fsh[i]}?ts=1&apikey=363d61f78e3d30b66fd174058922c390&hash=764574c500b818f5dce961daec5651c8`)
          .then((response) => response.json())
          .then((res) => {
              renderFavouriteHeros(res);
          });
  }
}

// Render the list of favourite super heros

function renderFavouriteHeros(data) {
  for (let i = 0; i < data.data.results.length; i++) {
      const element = data.data.results[i];
      const parentNode = document.getElementById("myFavourites");
      const childNode = document.createElement("li");
      childNode.innerHTML = `<a href = "./superHero.html" target = "_blank"><img src="${element.thumbnail.path}/portrait_fantastic.${element.thumbnail.extension}" id="id_${element.id}"></a>
                              <p>${element.name}</p>
                              <button type="submit" id="${element.id}">Remove from favourites</button>`;
      parentNode.appendChild(childNode);
  }
}

// Remove a super hero from the list of favourite super hero.

function removeFavourites(e) {
  const getID = e.target.id;
  const item = document.getElementById(getID);
  if (item.innerHTML == "Remove from favourites") {
    let i=-1;
    while (i++ < 100) {
        let value = localStorage.getItem(i);
        if (value == getID) {
        localStorage.removeItem(i);
        location.reload();
        return;
        }
    }
  }else{
  localStorage.setItem('item_id',getID);
  }
}

// function generateID(e){
//   const getID = e.target.id;
//   console.log(getID)
// }

getheros(favouritesuperhero);

document.addEventListener("click", removeFavourites);

const sph = document.getElementsByTagName('a');
console.log(sph);

function about(e){
  const getID = e.target.id;
  let ID = getID.slice(3,10);
  console.log(ID);
  localStorage.setItem("searchkey", ID);
}

document.addEventListener("click", about);