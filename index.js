
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
                    const savedTrek = getSavedTrek(searchTerm.value)
                    const trekList = document.getElementById('trek-builder')
                    trekList.append(savedTrek)
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
function getBreweriesBy(option ='', keyword){
    let breweryCards
    fetch(breweryURL+`${option}=${keyword}`)
    .then(res=>res.json())
    .then(brews=>{
        breweryCards = createBreweryCards.call(brews)
        const breweryList = document.getElementById('search-results')
        breweryList.append(...breweryCards)
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
        saveTrek.addEventListener('click',()=>{ 
            postTrek()})
        trekList.appendChild(saveTrekName)
        trekList.appendChild(saveTrek)
    }
    
    const oldParent = element.parentNode
    trekList.appendChild(oldParent)
    
}



//Post trek information to DB.json
function postTrek(){
    const saveName = document.getElementById('saveInput')
    let trekExists = getSavedTrek(saveName.value)
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
//TODO: I am unfortunately stumped on how I can best get this check in place to return before I do the post!
//async / await?
//still not working for the check but the POST works when removing the check!
    
    console.log(trekExists)
    if(trekExists.length > 0){
        alert("That Trek name has already been taken.  Please try a different Trek name")
    } else{
        fetch(trekURL, message)
        .then(res=>res.json())
        .then(b=>{
            alert(`successfully saved ${saveName.value}Trek`)
        })
    }
}

//Get saved trek data
function getSavedTrek(trekName){
    let savedTrek 
    
    fetch(trekURL+'?name='+trekName)
    .then(res=>res.json())
    .then(brews=>{
        savedTrek = brews
        console.log('infirst then' + savedTrek)
    })
    .then(()=>{
        console.log('innext then' + savedTrek)
        return savedTrek
    })
    
}