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

const dinoContainer = document.getElementById('flip-card');

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
            dinoElement.classList.add('flip-card-inner')

dinoContainer.appendChild(dinoElement)

            const dinoFront = document.createElement('div')
            dinoFront.classList.add('flip-card-front')
            dinoFront.innerHTML = `
                <h2>${dino.name}</h2>
                <img height="350" src = "${dino.imageSrc}" alt ="error"></img>
                `
dinoElement.appendChild(dinoFront)

            const dinoDetails = document.createElement('div')
            dinoDetails.classList.add('flip-card-back')
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
                    `
                // console.log(fetchDetails)
        
dinoElement.appendChild(dinoDetails)

    })
    } catch {
        console.error('trouble rendering dinosaurs!');
    }
};

const init = async () => {
    // const dinos = await fetchData()
    displayAllDinos(dinosaurs);
}

init()