import dinosaurs from './dinosaurs.json' assert { type: 'json' }

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
});

/* Function countDiet(arrayOfDinosaurs)
 * Takes an array of dinosaurs as a parameter
 * and returns a javascript object whose keys are the different diets of
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

countDiet(dinosaurs)
