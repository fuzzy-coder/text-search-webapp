# text-search-webapp

A simple webapp using express that searches name from list of names using [javascript-text-search](https://github.com/fuzzy-coder/javascript-text-search)

# installation

1. `npm install` to install the required dependencies.
2. `data.csv` add seed data in csv format in the root directory with following headers.
  `givenName`,`middleName`,`surname`
3. `npm run start`

# usage

+ Open browser and visit `http://localhost:3000/` and type search term (should be greater than 3 characters) and hit enter to see result
