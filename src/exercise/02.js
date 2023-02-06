// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(key, defaultValue = '', {
  serialize=JSON.stringify,
  deserialize=JSON.parse
}={}
){

  const [state, setState] = React.useState(() => {
    //()=> is new anonymous function
    console.log("Getting from local storage");
    
    const valueFromStorage = window.localStorage.getItem(key)
    if(valueFromStorage){
      return deserialize(valueFromStorage)
    } else {
      return defaultValue
    }
  })

  React.useEffect(() => {
    window.localStorage.setItem(key, serialize(state))   
    console.log("Use effect function ran");
  },[key, serialize, state] // array of values to monitor for change (unless it changes, effect will not execute)
  )
  
  return [state, setState];
}

function Greeting({initialName = ''}) {
  console.log("Render Greeting component");
  const [name, setName] = useLocalStorageState('name', initialName) 

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
