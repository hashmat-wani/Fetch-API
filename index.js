var search;
var x;
var moviesList;
var rating;
var error = false;

function seearch(t) {
  if (error != true) {
    console.log(moviesList);
    if (t != undefined) {
      moviesList.Search = [];
      moviesList.Search.push(t);
    }
    document.getElementById("noResult").style.display = "none";
    document.getElementById("container").innerHTML = "";
    moviesList.Search.map(function (el, index) {
      if (el.Poster != "N/A") {
        console.log(index);
        div = document.createElement("div");
        div.setAttribute("class", "poster");
        div.setAttribute("style", "background-image: url(" + el.Poster + ")");
        div.onmouseover = function () {
          display(index);
        };
        div.onmouseout = function () {
          hide(index);
        };
        recommended = document.createElement("div");
        recommended.setAttribute("class", "recmnd");
        recText = document.createElement("p");
        recText.textContent = "Blockbuster";
        recommended.append(recText);
        if (el.rating > 8.5) recommended.style.display = "block";
        detailDiv = document.createElement("div");
        detailDiv.setAttribute("class", "detailDiv");
        title = document.createElement("h5");
        title.textContent = el.Title;
        type = document.createElement("p");
        type.textContent = el.Type;
        year = document.createElement("p");
        year.textContent = el.Year;
        detailDiv.append(title, type, year);
        div.append(recommended, detailDiv);
        document.getElementById("container").append(div);
      }
    });
  } else {
    document.getElementById("container").innerHTML = "";
    document.getElementById("noResult").style.display = "block";
  }
}

async function searchBar() {
  try {
    search = document.querySelector(".nfTextField").value;
    console.log(search);
    x = await fetch("https://www.omdbapi.com/?apikey=bd77af0d&s=" + search);
    moviesList = await x.json();
    document.getElementById("searchList").innerHTML = "";
    error = false;
    moviesList.Search.map(function (el, index) {
      if (el.Poster != "N/A") {
        rating = (Math.random() * 10).toFixed(1);
        // console.log(rating);
        el["rating"] = rating;
        div = document.createElement("div");
        imgDiv = document.createElement("div");
        imgDiv.setAttribute("class", "searchImg");
        img = document.createElement("img");
        img.src = el.Poster;
        imgDiv.append(img);
        detailDiv = document.createElement("div");
        detailDiv.setAttribute("class", "searchDetails");
        title = document.createElement("h4");
        title.textContent = el.Title;
        type = document.createElement("span");
        type.textContent = `${el.Type} | `;
        year = document.createElement("span");
        year.textContent = el.Year;
        detailDiv.append(title, type, year);
        Bb = document.createElement("div");
        Bb.setAttribute("class", "searchBb");
        bbtext = document.createElement("p");
        bbtext.innerHTML = "Block<br>buster";
        Bb.append(bbtext);
        if (el.rating > 8.5) Bb.style.display = "block";
        div.append(imgDiv, detailDiv, Bb);
        document.getElementById("searchList").append(div);
        div.onclick = function () {
          seearch(el);
        };
      }
    });
  } catch (err) {
    error = true;
    document.getElementById("searchList").innerHTML = "";
    div = document.createElement("div");
    div.setAttribute("class", "noSearch");
    p = document.createElement("p");
    p.textContent = "No results found";
    div.append(p);
    document.getElementById("searchList").append(div);
  }
}

function display(index) {
  console.log(index);
  let a = document.querySelectorAll(".detailDiv");
  a[index].style.display = "block";
}
function hide(index) {
  console.log(index);

  let b = document.querySelectorAll(".detailDiv");
  b[index].style.display = "none";
}
