
const breweryURL = 'https://api.openbrewerydb.org/v1/breweries?'

document.addEventListener('DOMContentLoaded', ()=>{
    const searchForm = document.querySelector('.search-field-and-button')
    searchForm.addEventListener('submit',(e)=>{
        e.preventDefault();

        const radioBtns = document.getElementsByName('searchOption')
        const searchTerm = document.getElementById('search-bar')
        let searchBy

        radioBtns.forEach(element => {
            if(element.checked){
                if(element.id === 'savedTour'){
                    console.log('This is where we will do the tour search')
                }else{
                    searchBy = element.id
                }
            }
        });
    getBreweriesBy(searchBy, searchTerm.value)
    })
})

//display list of breweries
function renderBreweries(results){
    console.log('brewobj', results)
}
//fetching the brewery list from https://www.openbrewerydb.org
function getBreweriesBy(option ='', keyword){
    fetch(breweryURL+`${option}=${keyword}`)
    .then(res=>res.json())
    .then(brews=>{
        renderBreweries(brews)
    })
}

//submit button event listener
//suppress default behavior


//add tour button event listener
//moves brewry to other column 
//adds a save button in the top column
//changes to remove button


//remove button takes brewery off tour list and adds back to brew list


//sort by brewery-type


//Post tour information to DB.json


//Get saved tour data and display in correct column