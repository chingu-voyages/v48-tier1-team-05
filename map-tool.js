// DOM elements needed
const buttonContainer = document.querySelector('.button-container')
const mapContainer = document.querySelector('.map-container')
// add eventListeners
buttonContainer.addEventListener("click", showContinentMap)
mapContainer.addEventListener("mouseover", showCountryInfo)
