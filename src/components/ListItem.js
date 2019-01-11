import React from 'react'
import "./ListItem.css";

const ListItem = (props) => {
  return (
    <div className="list-item">
      <p className="kurs">Rp. {props.kurs}</p>
      <p className="times">&times;</p>
      <p className="amount">{props.amount}</p>
    </div>
  )
}

export default ListItem;