import React from 'react'

const StartFull = (props) => {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 24 24" id="star_filled" data-name="star filled" xmlns="http://www.w3.org/2000/svg">
      <rect id="Rectangle_4" data-name="Rectangle 4" width="24" height="24" fill="none" />
      <g>
        <path id="Star" fill={props.color} d="M10,15,4.122,18.09l1.123-6.545L.489,6.91l6.572-.955L10,0l2.939,5.955,6.572.955-4.755,4.635,1.123,6.545Z" transform="translate(2 3)" stroke={props.color} stroke-miterlimit="10" stroke-width="1.5" />
        <text x="50%" y="55%" text-anchor="middle" dy=".3em" font-size="10" fill="white">
          {props.number}
        </text>
      </g>
    </svg>
  )
}

export default StartFull