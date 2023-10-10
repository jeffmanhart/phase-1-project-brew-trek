
const breweryURL = 'https://api.openbrewerydb.org/v1/breweries?'

document.addEventListener('DOMContentLoaded', ()=>{
    const searchForm = document.querySelector('.search-field-and-button')
    //submit button event listener
    //suppress default behavior
    searchForm.addEventListener('submit',(e)=>{
        e.preventDefault();

        const radioBtns = document.getElementsByName('searchOption')
        const searchTerm = document.getElementById('search-bar')
        let searchBy
        //iterate through array of elements to get the id selected which is also what the search query uses for openbrewery API when fetching
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




//add tour button event listener
//duplicates brewry to other column 
//adds a save name input and button in the top column if first addition
// add btn changes to remove button


//remove button takes brewery off tour list


//sort by brewery-type maybe not want to do this one


//Post tour information to DB.json


//Get saved tour data and display in correct column