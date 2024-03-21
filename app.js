import dinosaurs from './dinosaurs.json' assert { type: 'json' }
console.log('all dinosaurs from dinosaur.json', dinosaurs)

const tableData = createTableData(dinosaurs)
console.log('tableData = ', tableData)

const dinoContainer = document.getElementById('all-dinos-container');

function onSearch(names) {
    const search = document.getElementById("dinoSearch").value.toLowerCase();
    const results = document.getElementById("search-result");
    
    const filtered = names.filter((name) => {
        if (!search) {
            name.doesMatch = true;
            return name;
        } else {
            const dinosaurs = name.name.toLowerCase();
            const nameMatch = dinosaurs.includes(search);
            name.doesMatch = nameMatch;
            return nameMatch;
        }
    });
    
    console.log(filtered); 
}

document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("dinoSearch");
    searchInput.addEventListener("input", function() {
        onSearch(dinosaurs);
    });

    onSearch(dinosaurs);
});

/* Function createTableData(arrayOfAllDinosaurs)
 * Takes the array of all dinosaurs as a parameter
 * and returns an array of javascript data objects that contains the data needed
 * for each graph with the following structure:
 *   [
 *     { mesozoic: {herbivorous: 41, carnivorous: 28, omnivorous: 6} }
 *     { cretaceous: {carnivorous: 17, herbivorous: 22, omnivorous: 5} }
 *     { jurassic: {herbivorous: 19, carnivorous: 8} }
 *     { triassic: {carnivorous: 3, omnivorous: 1} }
 *   ]
 * So, an array of time period objects, that each contain a diet object                 
 * This function calls the filterByTimePeriod function and the countDiet function. */

function createTableData(arrayOfAllDinosaurs) {
  // declare the return array
  let allTableData = []

  // call the filterByTimePeriod function to create four time period arrays of dinosaurs
  const dinosuarsByTimePeriod = filterByTimePeriod(arrayOfAllDinosaurs)
  console.log('array of dinosaurs filtered by time period', dinosuarsByTimePeriod)

  // for each of the four arrays create a data object with the diet data
  dinosuarsByTimePeriod.forEach(timePeriod => {
    for (const time in timePeriod) {
      let key = time
      let value = countDiet(timePeriod[key])
      console.log(`${time} diet object`, value)
      let dataObject = {[key]: value}
      console.log(`${time} data object`, dataObject)
      // push the data object to the return array
      allTableData.push(dataObject)
    }
  })

  console.log('array of data objects', allTableData)
  return allTableData
}

/* Function filterByTimePeriod(arrayOfDinosaurs)
 * Called by creteTableData function
 * Takes an array of dinosaurs as a parameter
 * and returns an array of javascript objects where each object key is the 
 * name of a time period and the value of each is the filtered array of just 
 * the dinosaurs from that time period.
 *   [
 *     {mesozoic: [array of mesozoic dinosaurs] }
 *     {cretaceous: [array of cretaceous dinosaurs] }
 *     {jurassic: [array of jurassic dinosaurs] }
 *     {triassic: [array of triassic dinosaurs] }
 *   ]                                                                           */

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

/* Function countDiet(arrayOfDinosaurs)
 * Called by creteTableData function
 * Takes an array of dinosaurs as a parameter
 * and returns a javascript diet object whose keys are the different diets of
 * the dinosaurs in the array and whose values are the number of dinosaurs
 * in the array that have that particular diet.
 * For example {herbivorous: 41, carnivorous: 28, omnivorous: 6}            */

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

//loader 
const loader = document.getElementById("loader");
window.addEventListener("load", function() {
  setTimeout(function() {
    loader.style.display = "none";
  }, 1800); 
});
