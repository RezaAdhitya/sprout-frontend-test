import React from 'react'
import { Outlet } from 'react-router-dom'

function DetailPage() {
  return (
    <div>
      DetailPage
      <Outlet />
    </div>
  )
}

export default DetailPage