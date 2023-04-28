import React from 'react'
import { useOutletContext } from "react-router-dom";

function AboutData() {
  const [currentPokemon, setCurrentPokemon] = useOutletContext()

   // helper
   const capitalizeFirst = (name) => {
    return name?.charAt(0).toUpperCase() + name?.slice(1)
  }

  return (
    <div className='about-data'>
      <div className="items">
        <p className='header'>Species</p>
        <p className='information'>{capitalizeFirst(currentPokemon.species.name)}</p>
      </div>
      <div className="items">
        <p className='header'>Height</p>
        <p className='information'>{(currentPokemon.height * 0.1).toFixed(1)} meter</p>
      </div>
      <div className="items">
        <p className='header'>Weight</p>
        <p className='information'>{(currentPokemon.weight * 10).toFixed(1)} kilogram</p>
      </div>
      <div className="items">
        <p className='header'>Abilities</p>
        <p className='information'>
          {currentPokemon.abilities.map((el, i) => {
            if (i !== currentPokemon.abilities.length - 1 ) {
              return (
                capitalizeFirst(el.ability.name) + ', '
              )
            } else {
              return (
                capitalizeFirst(el.ability.name)
              )
            }
          })}
        </p>
      </div>

    </div>
  )
}

export default AboutData