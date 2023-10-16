
const breweryURL = 'https://api.openbrewerydb.org/v1/breweries?'
const trekURL = 'http://localhost:3000/treks'

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
                    getBreweriesBy(searchBy, searchTerm.value, "brewList")
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
            moveCard(e.target)
        })
        card.className = "brewery-info"
        card.id = e.id
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
function getBreweriesBy(option ='', keyword, renderList){
    let breweryCards
    console.log(breweryURL+`${option}=${keyword}`)
    fetch(breweryURL+`${option}=${keyword}`)
    .then(res=>res.json())
    .then(brews=>{
        breweryCards = createBreweryCards.call(brews)
        if(renderList === 'brewList'){
            const breweryList = document.getElementById('search-results')
            breweryList.append(...breweryCards)
        }else if(renderList === 'trek'){
            const trekList = document.getElementById('trek-builder')
            trekList.append(...breweryCards)
        }
        
    })
    
}

//Get saved trek data, returns the trek Object
function getSavedTrek(trekName){

    fetch(trekURL+'?name='+trekName)
    .then(res=>res.json())
    .then(brews=>{
        
        if(!brews || !brews.length){
            alert("Could not find the Trek you are looking for! Try building a new one!")
        } else{
            const breweries = brews[0].selectedBreweries
            getBreweriesBy('by_ids',breweries.join(','), "trek")
        }
    })
    
}

//moves brewry to other column 
//adds a save name input and button in the top column if first addition
//add btn changes to remove button
function moveCard(element){
    const trekList = document.getElementById('trek-builder')
    if(document.querySelectorAll('#trek-builder .brewery-info').length === 0){
        const saveTrekName = document.createElement('input')
        saveTrekName.id = 'saveInput'
        saveTrekName.placeholder="Name Your Trek"
        const saveTrek = document.createElement('button')
        saveTrek.id = 'saveBtn'
        saveTrek.textContent = 'Save'
        saveTrek.addEventListener('click',postTrek)
            
        trekList.appendChild(saveTrekName)
        trekList.appendChild(saveTrek)
    }
    
    const oldParent = element.parentNode
    trekList.appendChild(oldParent)
    
}



//Post trek information to DB.json
async function postTrek(){
    const saveName = document.getElementById('saveInput')
    const trekCards = document.querySelectorAll('#trek-builder .brewery-info')
    let brewCards =[]
    Array.from(trekCards,(e)=>{
        brewCards.push(e.id)
    })
    const body = {
        "name": saveName.value,
        "selectedBreweries": brewCards 
    }
    const message={
        method:'POST',
        headers:{
            'Content-type':'application/json'},
        body:JSON.stringify(body)
    }
    // I could not get a good solution to work when using callbacks or async/await or promises.  
    // For whatever reason it never waited for a response from getSavedTrek(), 
    // so I had to use this method for now to ensure I got the check working.
    if(saveName.value === ""){
        alert("Please name your Trek.")
    }else{
    fetch(trekURL+'?name='+saveName.value)
    .then(res=>res.json())
    .then(brews=>{
        if(brews.length > 0){
            alert("That Trek name has already been taken.  Please try a different Trek name")
            } else{
                fetch(trekURL, message)
                    .then(res=>res.json())
                    .then(()=>{
                        alert(`Successfully saved ${saveName.value} Trek!`)
                    })
            }
    })}
}

