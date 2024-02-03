import React from 'react'

function Card({img, alt, name, population, region, capital}) {
  return (
    <div className='mb-5 pb-5 mt-10 shadow-lg bg-white flex flex-col w-[300px] h-[400px] rounded-xl dark:bg-darkElem dark:text-white cursor-pointer'>
      <div className='mb-4'>
        <img src={img} alt={alt} className='rounded-t-xl min-h-[200px] h-fit' />
      </div>
      <div className='pl-5 pb-5'>
        <h4 className='text-xl font-extrabold mb-4'>{name}</h4>
        <p className='mb-1'><span className='font-semibold'>Population: </span>{population}</p>
        <p className='mb-1'><span className='font-semibold'>Region: </span>{region}</p>
        <p><span className='font-semibold'>Capital: </span> {capital}</p>
      </div>
    </div>
  )
}

export default Card