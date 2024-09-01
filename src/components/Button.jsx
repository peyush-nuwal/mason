import React from 'react'

const Button = ({title ,style ,onClick}) => {
  return (
    <button style={style} className=' w-32 md:w-48 h-10 md:h-12  text-center   text-nowrap     text-primary bg-secondry text-lg md:text-xl rounded-md' onClick={onClick}>
         {title}
    </button>
  )
}

export default Button