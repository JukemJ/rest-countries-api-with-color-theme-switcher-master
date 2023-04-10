let countries = []
let countryRow = document.getElementById('country-row')
let darkModeOn = localStorage.getItem('darkModeOn')
if(darkModeOn === 'true') darkMode()

document.getElementById('region-select').addEventListener('change', function(){getCountriesByRegion(this.value)},false)
document.getElementById('searchbox').addEventListener('keypress', function(){getCountriesByName(this.value)},false)
document.getElementById('dark-mode').addEventListener('click', darkMode)


async function getCountriesByName(str) {
    const region = document.getElementById('region-select').value
    try{
        const url = 'https://restcountries.com/v3.1/name/' + str
        const response = await fetch(url)
        const data = await response.json()
        if(region == 'All') for(let x of data) countries.push(x)
        else for(let x of data) if(x.region == region) countries.push(x)
        drawCountries()
        countries = []
    }
    catch(err){
        console.log(err)
    }
  }

  async function getCountriesByRegion(region) {
    try{
        const url = 'https://restcountries.com/v3.1/region/' + region
        const response = await fetch(url)
        const data = await response.json()
        for(let x of data) countries.push(x)
        //console.log(countries)
        drawCountries()
        countries = []
    }
    catch(err){
        console.log(err)
    }
  }

  function drawCountries(){

    countryRow.innerHTML = ''  //blanking out the div
    for(let country of countries){
        
        let div = document.createElement('div')
        div.classList.add('col-xs-12', 'col-sm-5', 'col-lg-2', 'my-3', 'panel','p-0', 'mx-1','shadow-sm')
        if(darkModeOn == 'true') div.classList.add('dark-mode')
        div.innerHTML = `<img class ="img-fluid mx-0" src="${country.flags.svg}"><h3>${country.name.common}</h3><br><strong>Population: </strong><span>${country.population.toLocaleString('en-US')}</span><br><strong>Region: </strong><span>${country.region}</span><br><strong>Capital: </strong><span>${country.capital}</span>`
        countryRow.appendChild(div)
    }
  }

  function darkMode(){
    document.querySelector('header').classList.toggle('dark-mode')
    document.querySelector('input').classList.toggle('dark-mode')
    document.querySelector('body').classList.toggle('dark-mode')
    document.querySelector('select').classList.toggle('dark-mode')
    for(let x of document.querySelectorAll('.panel')) x.classList.toggle('dark-mode')
    if(darkModeOn == 'false') darkModeOn = 'true'
    else darkModeOn = 'false'
    localStorage.setItem('darkModeOn', darkModeOn)
  }