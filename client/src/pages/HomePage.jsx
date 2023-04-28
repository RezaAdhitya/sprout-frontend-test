import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { doFetchData } from '../redux/mainReducer'
import { MdOutlineCatchingPokemon } from 'react-icons/md'
import { SiPokemon } from 'react-icons/si'

function HomePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data, isLoading } = useSelector(state => state)
  const colorMap = {
    grass: '#62db62',
    fire: '#ef9e9e',
    water: '#77c6ea',
    normal: '#df9df2',
    other: '#c2cfd6'
  }
  


  useEffect(() => {
    dispatch(doFetchData())
  }, [])

  if(isLoading) {
    return (
      <h1>LOADING DATA...</h1>
    )
  }

  return (
    <div className='home-page'>
      <div className="title">Simple Pokedex</div>
      <div className="sub-title">By Reza Adhitya</div>

      <div className="card-content">
        { data && data?.map((el, i) => {
          return (
            <div
              onClick={() => navigate(`/details/${el.id}`)}
              className="pokemon-card"
              key={i}
              style={{backgroundColor: colorMap[el.types[0].type.name] !== undefined ? colorMap[el.types[0].type.name] : colorMap.other}}
            >
              <div className="info">
                <p>
                {el.name.charAt(0).toUpperCase() + el.name.slice(1)}
                </p>
                <div className="types">
                  
                  {el.types.map(type => {
                    return (
                      <p>
                        {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                      </p>
                    )
                  })}
                </div>
              </div>
              <div className="sprite">
                <img src={el.image} />
              </div>
              <MdOutlineCatchingPokemon className='bg-img' />
              <SiPokemon className='bg-img2' />
            </div>
          )
        }) }

      </div>
    </div>
  )
}

export default HomePage