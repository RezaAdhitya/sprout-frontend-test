import React from 'react'
import { useOutletContext } from "react-router-dom";
import { CgPokemon } from 'react-icons/cg'

function BaseStat() {
  const [currentPokemon, setCurrentPokemon] = useOutletContext()

   // helper
  const capitalizeFirst = (name) => {
    return name?.charAt(0).toUpperCase() + name?.slice(1)
  }

  const createArray = (amount) => {
    let output = []
    for(let i = 0; i < amount; i++) {
      output.push(<CgPokemon />)
    }
    return output
  }

  return (
    <div className='base-stat'>
      {currentPokemon.stats.map(el => {
        return (
          <div className="items-stat">
            <p className='header-stat'>{capitalizeFirst(el.stat.name)}</p>
            <p className='information-stat'>{el.base_stat}</p>
            <div className="symbols">
              {createArray((Math.floor(Number(el.base_stat) / 10)))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BaseStat