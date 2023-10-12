
const breweryURL = 'https://api.openbrewerydb.org/v1/breweries?'
const trekURL = 'http://localhost:3000/treks/'

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
                    getSavedTrek(searchTerm.value)
                }else{
                    clearOldSearch('brewList')
                    searchBy = element.id
                    getBreweriesBy(searchBy, searchTerm.value)
                }
            }
        });
    
    
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
    
    let breweryCards = this.map((e)=>{
        let card = document.createElement('div')
        let btn = document.createElement('button')
        btn.id = e.name + "Add"
        btn.className = "addToTrek"
        btn.textContent ='+'
        //add trek button event listener
        btn.addEventListener('click', (e)=>{
            console.log(e.target)
            moveCard(e.target)
        })
        card.className = "brewery-info"
        card.innerHTML = `<ul>
            <li style="font-weight: bold;" id="name">${e.name}</li>
            <li id ="line1">${e.street}</li>
            <li id= "line2">${e.city}, ${e.state} ${e.postal_code}</li>
        </ul>
        <div class="brewery-type">${e.brewery_type}</div>
        </div>`
        card.appendChild(btn)
        
        return card
    })
    return breweryCards

}


//fetching the brewery list from https://www.openbrewerydb.org
function getBreweriesBy(option ='', keyword){
    let breweryCards
    fetch(breweryURL+`${option}=${keyword}`)
    .then(res=>res.json())
    .then(brews=>{
        breweryCards = createBreweryCards.call(brews)
        const breweryList = document.getElementById('search-results')
        //TODO: ask why the spread operator in front of the array of html elements works but returns just the [object HTMLDivElement] when not present, 
        //not sure why but the internet showed this with no explanation
        breweryList.append(...breweryCards)
    })
    
}





//moves brewry to other column 
//adds a save name input and button in the top column if first addition
//add btn changes to remove button
function moveCard(element){
    const trekList = document.getElementById('trek-builder')
    const oldParent = element.parentNode
    trekList.appendChild(oldParent)
}

//remove button takes brewery off trek list


//Post trek information to DB.json


//Get saved trek data and display in correct column
function getSavedTrek(trekName){
    fetch(trekURL)
    .then(res=>res.json())
    .then(brews=>{
        breweryCards = createBreweryCards.call(brews)
        const trekList = document.getElementById('search-results')
        trekList.append(...breweryCards)
    })
}