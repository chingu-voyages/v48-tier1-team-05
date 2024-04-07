import { countryCodes, allMaps } from "./map_data.js"

/********************************* Create Dinosaur Data *********************************/
// global variables needed
let allDinosaurs = []
let dinosaursPerCountry = {}
let dietData = []

createData()

async function createData() {
  try {
    // fetch dinosaurs from api
    const res = await fetch("https://chinguapi.onrender.com/dinosaurs");
    const data = await res.json();

    // put all dinosaurs in allDinosaurs array
    allDinosaurs = data
    console.log("all dinosaurs", allDinosaurs)

    // find number of dinosaurs per country for Map Tool
    dinosaursPerCountry = countDinosaursPerCountry(allDinosaurs)
    console.log("map data", dinosaursPerCountry)

    // create diet data for Diet Tool
    dietData = createDietData(allDinosaurs)
    console.log("diet data", dietData)
    return data

  } catch(err) {
      console.log("Fetch Error", err);
  }
}

/********************************* Tab Navigation *********************************/
const allSections = document.querySelectorAll('section')
const allTabs = document.querySelectorAll('.tab')
const tabsContainer = document.querySelector('.tabs')
tabsContainer.addEventListener("click", handleClick)

function handleClick(event) {
  // manage tab color
  allTabs.forEach(tab => tab.classList.remove('black-tab'))
  let thisTab = document.querySelector(`button[name=${event.target.name}]`)
  thisTab.classList.add('black-tab')
  //manage sections
  allSections.forEach(section => {
    section.classList.add("hidden")
  })
  let thisSection = document.querySelector(`.${event.target.name}`)
  thisSection.classList.remove("hidden")
}


/********************************* Dinosaur Profiles *********************************/
const dinoContainer = document.getElementById('all-dinos-container');

function onSearch(data) {
    const search = document.getElementById("dinoSearch").value.toLowerCase();
    const resultContainer = document.getElementById("search-result");
    
    const filtered = data.filter((dinosaur) => {
        if (!search) {
            dinosaur.doesMatch = true;
            return false;
        } else {
            const name = dinosaur.name.toLowerCase();
            const nameMatch = name.includes(search);
            dinosaur.doesMatch = nameMatch;
            return nameMatch;
        }
    });

    resultContainer.innerHTML = '';

    filtered.forEach((dinosaur) => {
  
      const cardContainer = document.createElement('div');
      cardContainer.classList.add('card-container');
      cardContainer.style.width = "100%";
      cardContainer.style.marginBottom = "30px";
      const dlElement = document.createElement('dl');
  
      const labels = [
        { label: 'Type Species', data: dinosaur.typeSpecies },
        { label: 'Length', data: dinosaur.length },
        { label: 'Diet', data: dinosaur.diet },
        { label: 'When Lived', data: dinosaur.whenLived },
        { label: 'Species', data: dinosaur.typeSpecies },
        { label: 'Description', data: dinosaur.description }
      ];
  
      labels.forEach(item => {
        const dtElement = document.createElement('dt');
        const spanElement = document.createElement('span');
        const ddElement = document.createElement('dd');
        spanElement.textContent = item.label + ':';
        ddElement.textContent = item.data;
        dtElement.appendChild(spanElement);
        dlElement.appendChild(dtElement);
        dlElement.appendChild(ddElement);
      });
  
      // Append dl to card container
      cardContainer.appendChild(dlElement);
  
      // Create img element for each dinosaur
      const imgElement = document.createElement('img');
      imgElement.src = dinosaur.imageSrc;
      imgElement.width = 330;
      imgElement.height = 250;

    // Append img element to card container
    cardContainer.appendChild(imgElement);

    // Append card container to result container
    resultContainer.appendChild(cardContainer);
  });

};
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("dinoSearch");
    searchInput.addEventListener("input", function() {
        onSearch(allDinosaurs);
    });
});


//loader 
/*
const loader = document.getElementById("loader");
window.addEventListener("load", function () {
  setTimeout(function () {
    loader.style.display = "none";
  }, 1800);
}); 
*/


/********************************* Dinosaur Maps *********************************/

// DOM elements needed
const buttonContainer = document.querySelector('.button-container')
const allButtons = document.querySelectorAll('.continent-button')
const mapContainer = document.querySelector('.map-container')
const number = document.querySelector('#number')
const country = document.querySelector('#country')
const dinosaurList = document.querySelector('#dinsosaur-list')

// add eventListeners
buttonContainer.addEventListener("click", showContinentMap)
mapContainer.addEventListener("mouseover", showCountryInfo)

// show correct continent map when a button is clicked
function showContinentMap(event) {
  // remove black from all buttons
  allButtons.forEach(button => button.classList.remove('black-button'))
  let thisButton = document.querySelector(`#${event.target.id}`)
  thisButton.classList.add('black-button')

  // show correct continent map
  let newMap = document.createElement('div')
  newMap.innerHTML = allMaps[event.target.id]
  mapContainer.replaceChildren()
  mapContainer.appendChild(newMap)
}

//adjust the length of the contents
// function adjustDinosaurListPresentation() {
//   const items = dinosaurList.querySelectorAll('li');
//   const columnCount = items.length > 8 ? Math.ceil(items.length / 8) : 1;
//   dinosaurList.style.columnCount = columnCount;
//   if(items.length> 8 ){
//     dinosaurList.style.fontSize = "1px";
//   }else{
//     dinosaurList.style.fontSize = "";
//   }

// }

// show country information on hover
function showCountryInfo(event) {
  if (countryCodes[event.target.id]) {
    // update number of dinosaurs and country name in list-container
    number.innerHTML = dinosaursPerCountry[countryCodes[event.target.id]]
    country.innerHTML = countryCodes[event.target.id]

    // filter for just the dinosaurs in that country
    let dinosaursInCountry = allDinosaurs.filter(dinosaur => dinosaur.foundIn.includes(countryCodes[event.target.id]))

    // update dinosaur-list in list-container
    dinosaurList.replaceChildren()
    dinosaursInCountry.forEach(dinosaur => {
      let newDinosaur = document.createElement('li')
      newDinosaur.innerHTML = dinosaur.name
      dinosaurList.appendChild(newDinosaur)
    })
    // adjustDinosaurListPresentation()
  }
}

// helper function
function countDinosaursPerCountry(dinosaurs) {
  const countryObject = {}

  dinosaurs.forEach(dinosaur => {
    // if a dinosaur is found in more than one country
    // make an array of all the countries it is found in
    let locationsArray = []
    if (dinosaur.foundIn.includes(',')) {
      locationsArray = dinosaur.foundIn.split(', ')
    } else {
      locationsArray.push(dinosaur.foundIn)
    }

    // for each dinosaur's locations, increase count
    locationsArray.forEach(location => {
      if (Object.keys(countryObject).includes(location)) {
        countryObject[location] += 1
      } else {
        countryObject[location] = 1
      }
    })
  })
  return countryObject
}

/********************************* Dinosaurs Diets *********************************/
// global variables needed
let allEras = document.querySelectorAll('.item-era2');
let numCarnivorous;
let numOmnivorous;
let numHerbivorous;
let myChart = null;

// click function on era-container
allEras.forEach(era => {
  era.addEventListener("click", eraClick);
});

function eraClick(event){
  // remove all of the black-era classies
  allEras.forEach(era=>{
    era.classList.remove("black-era");
  })
  // add the black-era class on the clicked era
  event.target.classList.add("black-era");
  let eraClicked = event.target.innerHTML.toLowerCase();
  let dietEra = dietData.find(data => data.hasOwnProperty(eraClicked));
  numCarnivorous =  dietEra[eraClicked].carnivorous
  numOmnivorous =  dietEra[eraClicked].omnivorous
  numHerbivorous =  dietEra[eraClicked].herbivorous
  createChart()
};

createChart();

function createChart() {
  const ctx = document.getElementById('myChart');
  
  // if the "canvas" has already used, it will be destroyed
  if(myChart){
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Herbivorous', 'Carnivorous', 'Omnivorous'],
      datasets: [{
        data: [numHerbivorous, numCarnivorous, numOmnivorous],
        // data: [30, 20, 10],
        borderWidth: 1,
        hoverOffset: 4
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


function createDietData(arrayOfAllDinosaurs) {
  // declare the return array
  let allDietData = []

  // call the filterByTimePeriod function to create four time period arrays of dinosaurs
  const dinosuarsByTimePeriod = filterByTimePeriod(arrayOfAllDinosaurs)

  // for each of the four arrays create a data object with the diet data
  dinosuarsByTimePeriod.forEach(timePeriod => {
    for (const time in timePeriod) {
      let key = time
      let value = countDiet(timePeriod[key])
      let dataObject = { [key]: value }
      // push the data object to the return array
      allDietData.push(dataObject)
    }
  })

  return allDietData
}

// helper functions
function filterByTimePeriod(arrayOfDinosaurs) {
  let mesozoicDinosaurs = arrayOfDinosaurs
  let cretaceousDinosaurs = arrayOfDinosaurs.filter(dinosaur => dinosaur.whenLived.includes('Cretaceous'))
  let jurassicDinosaurs = arrayOfDinosaurs.filter(dinosaur => dinosaur.whenLived.includes('Jurassic'))
  let triassicDinosaurs = arrayOfDinosaurs.filter(dinosaur => dinosaur.whenLived.includes('Triassic'))
  let dinosuarsByTimePeriod = [
    { mesozoic: mesozoicDinosaurs },
    { cretaceous: cretaceousDinosaurs },
    { jurrasic: jurassicDinosaurs },
    { triassic: triassicDinosaurs },
  ]
  return dinosuarsByTimePeriod
}

function countDiet(arrayOfDinosaurs) {
  const dietObject = {}

  arrayOfDinosaurs.forEach(dinosaur => {
    if (Object.keys(dietObject).includes(dinosaur.diet)) {
      dietObject[dinosaur.diet] += 1
    } else {
      dietObject[dinosaur.diet] = 1
    }
  })
  return dietObject
}





