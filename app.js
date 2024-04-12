import { countryCodes, allMaps } from "./map_data.js"

/********************************* Create Dinosaur Data *********************************/
// global variables needed
let allDinosaurs = []
let dinosaursPerCountry = {}
let dietData = []
let numHerbivorous
let numCarnivorous
let numOmnivorous

createData()

async function createData() {
  try {
    // fetch dinosaurs from api
    const res = await fetch("https://chinguapi.onrender.com/dinosaurs");
    const data = await res.json();

    // put all dinosaurs in allDinosaurs array
    allDinosaurs = data

    // find number of dinosaurs per country for Map Tool
    dinosaursPerCountry = countDinosaursPerCountry(allDinosaurs)

    // create diet data for Diet Tool
    dietData = createDietData(allDinosaurs)
    numHerbivorous = dietData[1].cretaceous.herbivorous;
    numCarnivorous = dietData[1].cretaceous.carnivorous;
    numOmnivorous = dietData[1].cretaceous.omnivorous;

    // create initial chart
    createChart()

    // show all dinosaurs by calling onSearch function
    onSearch(allDinosaurs)
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

function onSearch(data) {
    const search = document.getElementById("dinoSearch").value.toLowerCase();
    const resultContainer = document.getElementById("search-result");
    
    const filtered = data.filter((dinosaur) => {
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

    resultContainer.innerHTML = '';

    filtered.forEach((dinosaur) => {
      // create elements needed
      const card = document.createElement('div');
      const cardBody = document.createElement('div');
      const cardFront = document.createElement('div');
      const cardFrontText = document.createElement('p');
      const cardBack = document.createElement('div');
      const cardBackText = document.createElement('div');
      const cardBackImageContainer = document.createElement('div');
      card.classList.add('card');
      cardBody.classList.add('card-body')
      cardFront.classList.add('card-front');
      cardBack.classList.add('card-back');
      cardBackText.classList.add('card-back-text');
      cardBackImageContainer.classList.add('card-back-image-container');

      // create card front
      cardFrontText.textContent = dinosaur.name;
      cardFront.appendChild(cardFrontText);

      // create card back
      // create card back text
      const labels = [
        { label: 'Type Species', data: dinosaur.typeSpecies },
        { label: 'Length', data: dinosaur.length },
        { label: 'Diet', data: dinosaur.diet },
        { label: 'When Lived', data: dinosaur.whenLived },
        { label: 'Species', data: dinosaur.typeSpecies },
        { label: 'Description', data: dinosaur.description }
      ];
      labels.forEach(item => {
        const dlElement = document.createElement('dl');
        const dtElement = document.createElement('dt');
        const ddElement = document.createElement('dd');
        const spanElement = document.createElement('span');
        spanElement.textContent = item.label + ':';
        ddElement.textContent = item.data;
        dtElement.appendChild(spanElement);
        dlElement.appendChild(dtElement);
        dlElement.appendChild(ddElement);
        cardBackText.appendChild(dlElement);
      });
      
  
      // create card back image
      const imgElement = document.createElement('img');
      imgElement.src = dinosaur.imageSrc;
      imgElement.width = 200;
      imgElement.height = 200;
      cardBackImageContainer.appendChild(imgElement);

      // create card from components
      cardBack.appendChild(cardBackText);
      cardBack.appendChild(cardBackImageContainer)
      cardBody.appendChild(cardFront)
      cardBody.appendChild(cardBack)
      card.appendChild(cardBody)

      // append to result container
      resultContainer.appendChild(card);
  });

};
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("dinoSearch");
    searchInput.addEventListener("input", function() {
        onSearch(allDinosaurs);
    });
});

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

function createChart() {
  const ctx = document.getElementById('myChart');
  
  // if the "canvas" has already been used, it will be destroyed
  if(myChart){
    myChart.destroy();
  }
  
  Chart.defaults.font.size = 24
  myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Herbivorous', 'Carnivorous', 'Omnivorous'],
      datasets: [{
        data: [numHerbivorous, numCarnivorous, numOmnivorous],
        backgroundColor: [
          '#2F683B',
          '#722E2E',
          '#9A472C'
        ],
        borderWidth: 1,
        hoverOffset: 4
      }]
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





