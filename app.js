import dinosaurs from "./dinosaurs.json" assert { type: "json" };
console.log(dinosaurs)

const dinoContainer = document.getElementById('all-dinos-container');

const getSingleDino = async (dinoId) => {
    try {
        const response = await fetch(`${dinosaurId}/${dinoId}`)
        console.log(response)
        const dino = await response.json();
        console.log(dino)
        return dino
    } catch {
        console.error(`Oh no, trouble getting dinosaur #${dinoId}!`);
    }
};

const displayAllDinos = (dinoList) => {
    try {
        dinoContainer.innerHTML = ""
        dinoList.forEach((dino) => {
            const dinoElement = document.createElement('div')
            dinoElement.classList.add('dino');
            dinoElement.innerHTML = `
                <h2>${dino.name}</h2>
                <img height="200" src = "${dino.imageSrc}" alt ="error"></img>
                <br>
                <button class = "details-button" data-id = "${dino.id}"> See Details </button>
                <br> <br>
                `
dinoContainer.appendChild(dinoElement)

            const detailsButton = dinoElement.querySelector('.details-button')
            detailsButton.addEventListener('click', async (event) => {
                event.preventDefault()
                const dinoDetails = document.createElement('div2')
                const fetchDetails = getSingleDino(`${dino.id}`)
                dinoDetails.innerHTML = `
                    <p>Name: ${dino.name}</p>
                    <p>Species: ${dino.typeSpecies}</p>
                    <p>Type: ${dino.typeOfDinosaur}</p>
                    <p>Found In: ${dino.foundIn}</>
                    <p>Taxonnomy: ${dino.taxonomy}</p>
                    <p>Diet: ${dino.diet}</p>
                    <p>Length: ${dino.length}ft.</p>
                    <p>Named By: ${dino.namedBy}</p>
                    <p>Description: ${dino.description}</p>
                    <button style="font-size: 17px"; class = "close-button" data-id = "${dino.id}"> Close </button>
                    <br> <br>
                    `
                console.log(fetchDetails)
        
dinoElement.appendChild(dinoDetails)

                const closeButton = dinoDetails.querySelector('.close-button')
                closeButton.addEventListener('click', async (event) => {
                    event.preventDefault()
                    playerDetails.remove()
                })

            })
        })
    } catch {
        console.error('trouble rendering dinosaurs!');
    }
};

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

const init = async () => {
    displayAllDinos(dinosaurs);
}

init()