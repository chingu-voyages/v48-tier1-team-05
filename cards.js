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
                <li class="flip-card-back-li">
                    <p class="flip-card-back-category"> Species </p>
                    <p class="card-info"> ${dino.typeSpecies} </p></li>
                <li class="flip-card-back-li">
                    <p class="flip-card-back-category"> Type </p>
                    <p class="card-info"> ${dino.typeOfDinosaur} </p></li>
                <li class="flip-card-back-li">
                    <p class="flip-card-back-category"> Found In </p>
                    <p class="card-info"> ${dino.foundIn} </p></li>
                <li class="flip-card-back-li">
                    <p class="flip-card-back-category"> Taxonnomy </p>
                    <p class="card-info"> ${dino.taxonomy} </p></li>
                <li class="flip-card-back-li">
                    <p class="flip-card-back-category"> Diet </p>
                    <p class="card-info"> ${dino.diet} </p></li>
                <li class="flip-card-back-li">
                    <p class="flip-card-back-category"> Length </p>
                    <p class="card-info"> ${dino.length}m </p></li>
                <li class="flip-card-back-li">
                    <p class="flip-card-back-category"> Named By </p>
                    <p class="card-info"> ${dino.namedBy} </p></li>
                </ul>
                `

                /* <p class="dino-description">
                    <p class="flip-card-back-category"> About: </p>
                    <p> ${dino.description} </p></p> */

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