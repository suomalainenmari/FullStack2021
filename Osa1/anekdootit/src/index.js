import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [voted, setVoted] =useState(new Uint8Array(anecdotes.length))
  const [maksimi, setMaksimi]=useState(0)

  const findMaxValue=()=>{
    var max=voted[0]
    var maxIndex=0
    for (var i=1; i<=voted.length; i++){
      if (voted[i]>max){
        maxIndex=i
        max=voted[i]
      }
    }
    console.log("Anekdootti jolla eniten ääniä on indeksissä "+maxIndex)
    return (maxIndex)
  }

  const handleRandomClick=()=>{
    var seuraava= Math.floor((Math.random()*6))
    //Excluding the current index from being chosen again from the list of anecdotes
    if (seuraava ===selected){
      if (seuraava<anecdotes.length){
        seuraava=seuraava+1
      }else {
        seuraava=seuraava-1
      }
    }
    setSelected(seuraava)
    console.log(selected)
  }

  const handleVoteClick=()=>{
    setVoted(voted.fill(voted[selected]+1,selected,selected+1))
    console.log("Äänestysnappia painettu, nyt äänestyksen taulukko on: " + voted)
    //setataan eniten ääniä saanut anekdootti aina kun äänestys tapahtuu
    setMaksimi(findMaxValue)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <Button onClick={handleVoteClick} text='Vote'/>
      <Button onClick={handleRandomClick} text='Next anecdote'/>

      <h2>Anecdote with most votes</h2>

      <p>{props.anecdotes[maksimi]}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]



ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)