import dinosaurs from './dinosaurs.json' assert { type: 'json' }

const root = document.querySelector("#root")

console.log(dinosaurs)

let imagesContainer = document.createElement("div")
imagesContainer.classList.add("images-container")

dinosaurs.forEach(dinosaur => {
  let newDinosaurImage = document.createElement("img")
  newDinosaurImage.classList.add("dinosaur-image")
  newDinosaurImage.id = dinosaur.id
  newDinosaurImage.src = dinosaur.imageSrc
  newDinosaurImage.alt = ""
  imagesContainer.appendChild(newDinosaurImage)
})

root.appendChild(imagesContainer)