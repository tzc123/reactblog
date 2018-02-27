import React from 'react'
import { Link } from 'react-router-dom';

export default (props) => {
  if (!props) return ''
  const { type, subNav, active } = props
  return (
    <ul className={`sub-nav ${active ? 'active' : ''}`}>
      {subNav.map((item, index) => {
        if (type == 'category') {
          return (
            <li key={index}>
              <Link to={{pathname: '/', search: `?category=${item.text}`}}>
                {item.text}
                <span className="count color-blue">
                  「{item.count}」
                </span>
              </Link>
            </li>
          )
        } else if (type == 'common') {
          return (
            <li key={index}>
              <a href={item.link} target="_blank">{item.text}</a>
            </li>
          )
        }
      })}
    </ul>
  ) 
}
