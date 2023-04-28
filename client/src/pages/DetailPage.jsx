import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { MdOutlineCatchingPokemon } from 'react-icons/md'

function DetailPage() {
  const navigate = useNavigate()
  const {id} = useParams()
  const [currentChild, setCurrentChild] = useState('about')
  const [currentPokemon, setCurrentPokemon] = useState()
  const children = ['about', 'base-stat', 'evolution', 'moves']
  const { data, isLoading } = useSelector(state => state)
  const colorMap = {
    grass: '#62db62',
    fire: '#ef9e9e',
    water: '#77c6ea',
    normal: '#df9df2',
    other: '#c2cfd6'
  }
  
  // helper
  const capitalizeFirst = (name) => {
    return name?.charAt(0).toUpperCase() + name?.slice(1)
  }

  const childChange = (child) => {
    setCurrentChild(child);
    navigate(child)
  }

  useEffect(() => {
    if(data.length === 0){
      navigate('/')
    }
    let thisPokemon = data.find(el => el.id == id)
    setCurrentPokemon(thisPokemon)
  },[])

  if(!currentPokemon) {
    return (
      <h1>LOADING DATA...</h1>
    )
  }

  return (
    <div className='detailPage'>
      <div 
        style={{backgroundColor: colorMap[currentPokemon?.types[0]?.type?.name] !== undefined ? colorMap[currentPokemon?.types[0]?.type?.name] : colorMap.other}}
        className="detail-content">
        <div className="container-info">
          <div className="name-id">
            <p className='name'>{capitalizeFirst(currentPokemon.name)}</p>
            <p className='id'>#{currentPokemon?.id?.toString().padStart(3,'0')}</p>
          </div>
          <div className="detail-types">
            {currentPokemon?.types?.map(el => {
              return (
                <p>{capitalizeFirst(el.type.name)}</p>
              )
            })}
          </div>
          <img src={currentPokemon.image} />
          <MdOutlineCatchingPokemon className='bg-img-detail' />
        </div>
        <div className="pokemon-stat">
          <div className="nav">

            {children.map(el => {
              return (
                <a
                  onClick={() => childChange(el)}
                  className={currentChild === el ? 'border-change' : '' }
                >
                  {el.charAt(0).toUpperCase() + el.slice(1).replace('-',' ')}</a>
              )
            })}

          </div>
        <Outlet context={[currentPokemon, setCurrentPokemon]} />
        </div>
      </div>
      <div className="backButton">
        <a onClick={() => navigate('/')}>Back</a>
      </div>
    </div>
  )
}

export default DetailPage