import dinosaurs from './dinosaurs.json' assert { type: 'json' }
console.log('all dinosaurs from dinosaur.json', dinosaurs)

import { countryCodes, allMaps } from "./map_data.js"


/*** Tab Navigation ***/
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


/*** Dinosaur Profiles ***/
const dinoContainer = document.getElementById('all-dinos-container');

const fetchData = async () =>{
  try{
      const res = await fetch("https://chinguapi.onrender.com/dinosaurs");
      const data = await res.json();
      return data;
  }catch(err){
      console.log("Fetch Error",err);
  }
}

async function allDinosaurs() {
  const apiData = await fetchData();
  const allDinosaurs = dinosaurs.concat(apiData);
  return allDinosaurs;
}

async function onSearch() {
    const allDinos = await allDinosaurs();
    const search = document.getElementById("dinoSearch").value.toLowerCase();
    const results = document.getElementById("search-result");
    
    const filtered = allDinos.filter((dinosaur) => {
        if (!search) {
            dinosaur.doesMatch = true;
            return true;
        } else {
            const name = dinosaur.name.toLowerCase();
            const nameMatch = name.includes(search);
            dinosaur.doesMatch = nameMatch;
            return nameMatch;
        }
    });
    console.log(filtered);
}

document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("dinoSearch");
    searchInput.addEventListener("input", function() {
        onSearch();
    });
});

//loader 
const loader = document.getElementById("loader");
window.addEventListener("load", function() {
  setTimeout(function() {
    loader.style.display = "none";
  }, 1800); 
});


/*** Dinosaur Maps ***/
/* large data variables at end of file */

// global variables needed
let dinosaurArray = []
let dinosaursPerCountry = {}

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

// fetch dinosaurs from api
fetch("https://chinguapi.onrender.com/dinosaurs")
  .then(response => response.json())
  .then(data => {
    dinosaurArray = data
    // find number of dinosaurs per country
    dinosaursPerCountry = countDinosaursPerCountry(dinosaurArray)
    })
  .catch(error => console.log(error))

// show country information on hover
function showCountryInfo(event){
  if (countryCodes[event.target.id]) {
    // update number of dinosaurs and country name in list-container
    number.innerHTML = dinosaursPerCountry[countryCodes[event.target.id]]
    country.innerHTML = countryCodes[event.target.id]

    // filter for just the dinosaurs in that country
    let dinosaursInCountry = dinosaurArray.filter(dinosaur => dinosaur.foundIn.includes(countryCodes[event.target.id]))

    // update dinosaur-list in list-container
    dinosaurList.replaceChildren()
    dinosaursInCountry.forEach(dinosaur => {
      let newDinosaur = document.createElement('li')
      newDinosaur.innerHTML = dinosaur.name
      dinosaurList.appendChild(newDinosaur)
    })
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

/*** Dinosaurs Diets ***/
const tableData = createTableData(dinosaurs)
console.log('tableData = ', tableData)
createChart()

function createChart() {
  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Herbivorous', 'Carnivorous', 'Omnivorous'],
      datasets: [{
        data: [41, 28, 6],
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


function createTableData(arrayOfAllDinosaurs) {
  // declare the return array
  let allTableData = []

  // call the filterByTimePeriod function to create four time period arrays of dinosaurs
  const dinosuarsByTimePeriod = filterByTimePeriod(arrayOfAllDinosaurs)

  // for each of the four arrays create a data object with the diet data
  dinosuarsByTimePeriod.forEach(timePeriod => {
    for (const time in timePeriod) {
      let key = time
      let value = countDiet(timePeriod[key])
      let dataObject = {[key]: value}
      // push the data object to the return array
      allTableData.push(dataObject)
    }
  })

  return allTableData
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