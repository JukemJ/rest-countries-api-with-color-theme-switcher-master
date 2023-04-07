const countries = []

document.getElementById('search').addEventListener('click', function(){getCountries()})




async function getCountries(str = 'all') {
    console.log(str)
    try{
        const url = 'https://restcountries.com/v3.1/' + str
        const response = await fetch(url)
        const data = await response.json()
        for(let x in data) countries.push(x)
        console.log(countries)
    }
    catch(err){
        console.log(err)
    }
  }