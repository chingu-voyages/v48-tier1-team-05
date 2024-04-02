import dinosaurs from "./dinosaurs.json" assert { type: "json" };
console.log(dinosaurs)

const fetchData = async () =>{
    try{
        const res = await fetch("https://chinguapi.onrender.com/dinosaurs");
        const data = await res.json();
        console.log(data)
        return data
    }catch(err){
        console.log("Fetch Error",err);
    }
}

const dinoContainer = document.getElementById('all-dinos-container');

const getSingleDino = async (dinoId) => {
    try {
        const response = await fetch(`${dinosaurId}/${dinoId}`)
        console.log(response)
        const dino = await response.json();
        console.log(dino)
        return dino
    } catch {
        // console.error(`trouble getting dinosaur #${dinoId}!`);
    }
};

const displayAllDinos = (dinoList) => {
    try {
        dinoContainer.innerHTML = ""
        dinoList.forEach((dino) => {
            const dinoElement = document.createElement('div')
            dinoElement.classList.add('flip-card')

dinoContainer.appendChild(dinoElement)

            const flipCardInner = document.createElement('div')
            flipCardInner.classList.add('flip-card-inner')

dinoElement.appendChild(flipCardInner)

            const dinoFront = document.createElement('div')
            dinoFront.classList.add('flip-card-front')
            dinoFront.innerHTML = `
                <h2>${dino.name}</h2>
                `
flipCardInner.appendChild(dinoFront)

            const dinoDetails = document.createElement('div')
            dinoDetails.classList.add('flip-card-back')

flipCardInner.appendChild(dinoDetails)

            const dinoDetailsLeft = document.createElement('div')
            dinoDetailsLeft.classList.add('flip-card-back-left')
                const fetchDetails = getSingleDino(`${dino.id}`)
                dinoDetailsLeft.innerHTML = `
                <p>Species: ${dino.typeSpecies}</p>
                <p>Type: ${dino.typeOfDinosaur}</p>
                <p>Found In: ${dino.foundIn}</>
                <p>Taxonnomy: ${dino.taxonomy}</p>
                <p>Diet: ${dino.diet}</p>
                <p>Length: ${dino.length}ft.</p>
                <p>Named By: ${dino.namedBy}</p>
                <p class="dino-description" >Description: ${dino.description}</p>
                `
                // console.log(fetchDetails)

dinoDetails.appendChild(dinoDetailsLeft)

            const dinoDetailsRight = document.createElement('div')
            dinoDetailsRight.classList.add('flip-card-back-right')
                dinoDetailsRight.innerHTML = `
                <img height="250" src = "${dino.imageSrc}" alt ="error"></img>
                `
dinoDetails.appendChild(dinoDetailsRight)

    })
    } catch {
        console.error('trouble rendering dinosaurs');
    }
};

const init = async () => {
    const dinos = await fetchData()
    displayAllDinos(dinos);
}

init()