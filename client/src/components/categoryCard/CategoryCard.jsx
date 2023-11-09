import React from 'react'
import "./CategoryCard.css"

const CategoryCard = ({item}) => {
  return (
    <div className="card">

    <div className='container'>
      <img className="img" src="https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" alt="" />
      <h1 className='h1'>{item.name}</h1>

    </div>
    </div>
  )
}

export default CategoryCard
