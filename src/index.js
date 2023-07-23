let displayResult = document.querySelector(".display-container");

let stateObject = {
  currentSelectedFilter: "",
  centerData: null,
};

function fetchData() {
  fetch("https://isro.vercel.app/api/centres")
    .then((response) => response.json())
    .then((data) => {
      // Processing the data here
      console.log(data);
      //stores array with centers data
      stateObject.centerData = data.centres;

      displayDefaultResults(stateObject);
    })
    .catch((error) => {
      console.error(error);
      displayResult.innerHTML = "<p>An error occurred while fetching data.</p>";
    });
}

// Call the fetchData function whenever you need to retrieve data from the API
fetchData();

function onFilterSelect(filterQuery) {
  const filterButtons = document.querySelectorAll(".button");

  for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].classList.remove("selected");

    if (filterQuery === "Place" && filterButtons[i].innerText === "CITY") {
      filterButtons[i].classList.add("selected");
    } else if (
      filterQuery === "State" &&
      filterButtons[i].innerText === "STATE"
    ) {
      filterButtons[i].classList.add("selected");
    } else if (
      filterQuery === "name" &&
      filterButtons[i].innerText === "CENTER"
    ) {
      filterButtons[i].classList.add("selected");
    }
  }

  stateObject.currentSelectedFilter = filterQuery;
}

function displayResults() {
  doFilter(stateObject);
}

function doFilter(stateObject) {
  const searchInput = document.querySelector(".form-input").value.toLowerCase();
  let newArray = stateObject.centerData.filter(function (arrayElement) {
    if (stateObject.currentSelectedFilter === "name") {
      return arrayElement.name.toLowerCase().includes(searchInput);
    }
    if (stateObject.currentSelectedFilter === "State") {
      return arrayElement.State.toLowerCase().includes(searchInput);
    }
    if (stateObject.currentSelectedFilter === "Place") {
      return arrayElement.Place.toLowerCase().includes(searchInput);
    }
  });

  // function doFilter(stateObject) {
  //   const searchInput = document.querySelector(".form-input").value.toLowerCase();
  //   let newArray = stateObject.centerData.filter(function (arrayElement) {
  //     if (stateObject.currentSelectedFilter === "name") {
  //       return arrayElement.name.toLowerCase().includes(searchInput);
  //     }
  //     if (stateObject.currentSelectedFilter === "State") {
  //       return arrayElement.State.toLowerCase().includes(searchInput);
  //     }
  //     if (stateObject.currentSelectedFilter === "Place") {
  //       return arrayElement.Place.toLowerCase().includes(searchInput);
  //     }
  //   });

  // }

  console.log(newArray);

  //clearing the container
  displayResult.innerHTML = "";

  //Rendering the new array
  console.log(newArray.length);
  for (let i = 0; i < newArray.length; i++) {
    // access the current object using the index i
    const currentObject = newArray[i];
    console.log(currentObject);
    createTheBox(currentObject);
  }
}

function displayDefaultResults(stateObject) {
  //use a for loop to iterate through the array
  for (let i = 0; i < stateObject.centerData.length; i++) {
    // access the current object using the index i
    const currentObject = stateObject.centerData[i];

    createTheBox(currentObject);
  }
}

function createTheBox(currentObject) {
  // Create the HTML elements using template literals
  const newdiv = document.createElement("div");
  newdiv.classList.add("display-box");

  newdiv.innerHTML = `
      <table>
        <thead>
          <tr>
            <th class="center">CENTER</th>
            <th class="city">CITY</th>
            <th class="state">STATE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="center ${
              currentObject.name.length > 35 ? "small" : ""
            }">${currentObject.name}</td>
            <td class="city ${
              currentObject.Place.length > 10 ? "small" : ""
            }" >${currentObject.Place}</td>
            <td class="state ${
              currentObject.State.length > 9 ? "small" : ""
            }">${currentObject.State}</td>
          </tr>
        </tbody>
      </table>
    `;

  // Add the HTML element to the page
  displayResult.appendChild(newdiv);
}
