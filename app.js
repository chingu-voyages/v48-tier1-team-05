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
function countDiet(arrayOfDinosaurs) {
  const dietCount = {}

  dinosaurs.forEach(dinosaur => {
    if (Object.keys(dietCount).includes(dinosaur.diet)) {
      dietCount[dinosaur.diet] += 1
    } else {
      dietCount[dinosaur.diet] = 1
    }
  })
  console.log(dietCount)
  return dietCount
}

countDiet()
