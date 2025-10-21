import React from 'react'

export const TituloComponent = ({texto, color, fontSize = 20, mt = 0, mb=0, alingText='left'}) => {
  return (
    <p style={{
        color: `${color}`,
        fontWeight: 'bold',
        fontSize: fontSize,
        marginTop: mt,
        marginBottom: mb,
        textAlign: `${alingText}`,
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
      }}>{texto}</p>
  )
}
