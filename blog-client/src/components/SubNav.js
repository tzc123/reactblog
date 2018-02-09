import React from 'react'

export default function (props) {
  if (!props) return ''
  const { type, subNav } = props
  return (
    <ul className="sub-nav">
      {subNav.map((item, index) => {
        if (type == 'category') {
          return (
            <li key={index}>
              {item.text}
              <span className="count color-blue">
                「{item.count}」
              </span>
            </li>
          )
        } else if (type == 'common') {
          return (
            <li key={index}>
              {item.text}
            </li>
          )
        }
      })}
    </ul>
  ) 
}