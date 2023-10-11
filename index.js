
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
                if(element.id === 'savedTrek'){
                    clearOldSearch('trek')
                    console.log('This is where we will do the Trek search')
                }else{
                    clearOldSearch('brewList')
                    searchBy = element.id
                }
            }
        });
    
    getBreweriesBy(searchBy, searchTerm.value)
    })
})

function clearOldSearch(list){
    let cardsToRemove
    if(list === 'brewList'){
        cardsToRemove = document.querySelectorAll("#search-results .brewery-info")
    }else if(list === 'trek'){
        cardsToRemove = document.querySelectorAll("#trek-builder .brewery-info")
    }
    cardsToRemove.forEach((e)=>(e.remove()))
}

//display list of breweries
function createBreweryCards(){
    const breweryList = document.getElementById('search-results')
    const trekList = document.getElementById('trek-builder')
    
    let breweryCards = this.map((e)=>{
        console.log(e)
        let card = document.createElement('div')
        card.className = "brewery-info"
        card.innerHTML = `<ul>
            <li style="font-weight: bold;">${e.name}</li>
            <li>${e.street}</li>
            <li>${e.city}, ${e.state} ${e.postal_code}</li>
        </ul>
        <div class="brewery-type">${e.brewery_type}</div>
        <button class="addToTrek">+</button>
        </div>`
        console.log(card)
        return card
    })
    console.log(breweryCards)
    breweryList.append(...breweryCards)


}

//fetching the brewery list from https://www.openbrewerydb.org
function getBreweriesBy(option ='', keyword){
    fetch(breweryURL+`${option}=${keyword}`)
    .then(res=>res.json())
    .then(brews=>{
        createBreweryCards.call(brews)
    })
}




//add trek button event listener
//duplicates brewry to other column 
//adds a save name input and button in the top column if first addition
// add btn changes to remove button


//remove button takes brewery off trek list


//sort by brewery-type maybe not want to do this one


//Post trek information to DB.json


//Get saved trek data and display in correct column