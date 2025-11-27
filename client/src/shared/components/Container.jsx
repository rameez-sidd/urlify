import React from 'react'

const Container = ({children, className}) => {
  return (
    <div className={`mx-auto w-5xl max-w-[95%] ${className}`}>
        {children}
    </div>
  )
}

export default Container