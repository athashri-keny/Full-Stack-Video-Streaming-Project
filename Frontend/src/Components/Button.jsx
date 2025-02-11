import React from 'react'

function Button({
    children,
    type = 'Button',
    bgcolor = '',
    textcolor = 'text-white',
    classname = '',
    ...props
})  {
  return (
    <button className= {`px-4 py-2 rounded-lg ${bgcolor} ${textcolor} ${classname}`} {...props}> {children} </button>
  )
}

export default Button