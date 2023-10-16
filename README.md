

# Brew Trek

Brew Trek is an application to allow users to discover breweries by city, zip code, or all.  Breweries will be displayed and give users the ability to build a brewery trek that makes sense to them or within walking distance of eachother.  From the list you build users can save that list of breweries for future use or other users to follow.  These will allow for ratings and the ability to find them again.

## Installation

Use the Json Server to be able to save and retrieve treks from the local db.  
First install the server globally.  
Then start the server and let it run.
```bash
npm install -g json-server
json-server --watch db.json
```

## Usage

Brew Trek reaches out to open brewery DB to build the cards returned to the user.  The user can query by a name, state, city, or zip code.  
The user can also query a local DB for searching treks previously saved.  The DB is seeded with a few existing treks such as "Colorado Brews".  The save only keeps the brewery unique IDs and then requeries the data from open brewery when retrieving the trek to get any updated details from the DB if there are any.


## Future Improvements
- build a mapping capability to show the route to walk from one location to the next
- provide a time calculation to alot for each location based on total time desired input 
- add a rating to the treks after saved or retrieved


## Authors & Acknowledgement

**Jeffrey Manhart**

se-flex-phase-1-project

## Sources
- Brewery Data from https://www.openbrewerydb.org
- Background image provided by wallpaperaccess.com
