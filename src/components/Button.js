import React from 'react';

export default function Button(props) {
  return (
    <button
      className={props.styles}
      name={props.name}
      onClick={props.onClick}
      aria-label={props.label}
    >
      {props.icon ?
        <span className="material-icons">{props.icon}</span> : <span>{props.label}</span>
      }
    </button>
  )
}