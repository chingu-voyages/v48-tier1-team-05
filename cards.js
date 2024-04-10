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
                <ul>
                <li class="flip-card-back-li">Species: ${dino.typeSpecies}</li>
                <li class="flip-card-back-li">Type: ${dino.typeOfDinosaur}</li>
                <li class="flip-card-back-li">Found In: ${dino.foundIn}</li>
                <li class="flip-card-back-li">Taxonnomy: ${dino.taxonomy}</li>
                <li class="flip-card-back-li">Diet: ${dino.diet}</li>
                <li class="flip-card-back-li">Length: ${dino.length}ft.</li>
                <li class="flip-card-back-li">Named By: ${dino.namedBy}</li>
                <li class="dino-description" >Description: ${dino.description}</li>
                </ul>
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