import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber]=useState('')
  const [newSearch, setNewSearch]=useState('')
  const [showAll, setShowAll]=useState(true)
  const [notificationMessage, setNotificationMessage]=useState(null)

  useEffect(()=>{
    personService
    .getAll()
    .then(initialPersons=>{
        setPersons(initialPersons)
    })
  },[])

  const deletePerson=({id,name})=>{
    
    
    if (window.confirm(`Delete ${name} from phonebook?`)) {
      setNotificationMessage(
        `${name} is now deleted from phonebook`
      )
      setTimeout(()=>{
        setNotificationMessage(null)
      },5000)
      personService
        .deletingPerson(id)
        .then=()=>{
          setPersons(persons.filter(n=>n.id!==id))
          setNewName('')
          setNewNumber('')
        }
    }
  }

  const Notification = ({ message })=>{
    const notificationStyle ={
      color:'green',
      fontStyle:'italic',
      fontSize:20,
      borderStyle:'solid',
      padding:10,
      background:'lightgrey'
    }
    if (message===null){
        return null
    }
    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

  const handleNumberChange=(event)=>{
    setNewNumber(event.target.value)
  }

  const handleNameChange =(event)=>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addInfo= (event)=>{
    event.preventDefault()
    const nameObject={
      name: newName,
      number:newNumber
    }

    const nimet =persons.map(person=>person.name)
    const numerot=persons.map(person=>person.number)
    console.log(nimet)
    console.log(numerot)

    if (nimet.includes(newName)){
      
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const index= nimet.indexOf(newName)
        console.log(index)
        const id= persons[index].id
        console.log("Id on" + id)

        setNotificationMessage(
          `${newName} is now updated`
        )
        setTimeout(()=>{
          setNotificationMessage(null)
        },5000)

        personService
          .update(id, nameObject)
          .then(returnedPerson=>{
            setPersons(persons.filter(n=>n.id!==id))
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          }
        )
      }
    }
    
    else if (numerot.includes(newNumber)){
      alert(`Phone number ${newNumber} is already in use`)
    }

    else {

      setNotificationMessage(
        `${newName} is now added to phonebook`
      )
      setTimeout(()=>{
        setNotificationMessage(null)
      },5000)

      personService
        .create(nameObject)
        .then(returnedPerson=>{
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
    })
    }

  }

  const handleSearchChange = (event)=>{
    if(newSearch.length===0){
      setShowAll(true)
    }if(newSearch.length>0){
      setShowAll(false)
    }
    setNewSearch(event.target.value)
  }

  const namesToShow = showAll
    ? persons
    : persons.filter(person=>person.name.toUpperCase().includes(newSearch.toUpperCase()))



  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMessage}/>
        
      <Filter 
      newSearch={newSearch}
      handleSearchChange={handleSearchChange}
      />

      <h3>add a new</h3>
      <PersonForm
      addInfo={addInfo}
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      
      />
      

      <h3>Numbers</h3>
      <Persons 
      namesToShow={namesToShow}
      persons={persons}
      deletePerson={deletePerson}
      
      />
      
    </div>
  )

}

const Persons=({namesToShow,deletePerson})=>{
  return(
    <div>
  {namesToShow.map(person=>
  <Person 
    key={person.id}
    person={person}
    deletePerson={()=>deletePerson(person)}
      />
  )}
  
  </div>
  )
}


const Person=({person, deletePerson})=>{
  console.log("person komponentissa tulostuuko id: "+person.id +" ja nimi: " + person.name)
  
  return(
    <li>
      {person.name} {person.number}
      <button onClick={deletePerson} id={person.id} name={person.name}>delete</button>
      </li>
  )
}

const PersonForm=({addInfo, newName, handleNameChange,newNumber,handleNumberChange})=>{
  return(
    <form onSubmit={addInfo}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange} />
        </div>
        <div>
          number: <input
          value={newNumber}
          onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

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