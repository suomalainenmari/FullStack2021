import React, { useState,useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries] = useState([]) 

  const [newSearch, setNewSearch]=useState('')
  const [showAll, setShowAll]=useState(true)

  useEffect(()=>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response=>{
        console.log('haettu palvelimelta')
        setCountries(response.data)
      })
  },[])


  const handleSearchChange = (event)=>{
    if(newSearch.length===0){
      setShowAll(true)
    }if(newSearch.length>0){
      setShowAll(false)
    }
    setNewSearch(event.target.value)
  }

  const whichCountry =({name})=>{
    console.log(name)
    setNewSearch(name)
  }

  const namesToShow = showAll
    ? countries
    : countries.filter(country=>country.name.toUpperCase().includes(newSearch.toUpperCase()))

  return (
    <div>   
      <Filter 
      newSearch={newSearch}
      handleSearchChange={handleSearchChange}
      />
      <Countries 
      namesToShow={namesToShow}
      countries={countries}
      whichCountry={whichCountry}
      />

      
    </div>
  )

}

const Countries=({namesToShow,whichCountry})=>{
  

  if (namesToShow.length===1){
    return(
      <div>
        {namesToShow.map(country=>
        <OneCountry 
        key={country.name} 
        country={country}
        />
      )}
      </div>
    )
  }

  
  if (namesToShow.length>10){
    return(
      <div>
        Too many matches, specify another filter
      </div>
    )
  }else{
    return(
      <div>
        {namesToShow.map(country=>
        <Country key={country.name}
        country={country}
        whichCountry={()=>whichCountry(country)}
        />
      )}
      </div>
  )}
}

const OneCountry=({country})=>{
  
  const address=country.flag
  
  return(
    <div>
      <h2>{country.name}</h2>
      Capital {country.capital}<br></br>
      Population {country.population}
      

      <h2>Languages</h2>
      <ul>
        {country.languages.map(language=>
          <li key={language.name}>{language.name}</li>)}
      </ul>
      <img 
      src={address}
      alt="new"
      width="300"
      height="200"
      />
      
    </div>

  )
}

const Country=({country, whichCountry})=>{
  console.log("country komponentti löytyykö maa" + country.name)
  
  return(
    <li>{country.name}
      <button onClick={whichCountry} name={country.name}>
        show 
      </button>
    </li>
  )
}

const Filter=({newSearch, handleSearchChange})=>{
  return(
    <div>
          filer shown with <input
          value={newSearch}
          onChange={handleSearchChange}/>
        </div>
  )
}



ReactDOM.render(
  <App/>,
  document.getElementById('root')
)

export default App