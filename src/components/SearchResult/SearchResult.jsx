import React from 'react'

function SearchResult({img, alt, name}) {
  return (
    <div className='flex hover:bg-lightBg hover:dark:bg-darkBg'>
        <img src={img} alt={alt} className='h-[25px] w-[35px] rounded-[4px] mr-3' />
        <span className=''>{name}</span>
    </div>
  )
}

export default SearchResult