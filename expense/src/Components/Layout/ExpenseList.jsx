import React from 'react'
import classes from './ExpenseList.module.css'

const ExpenseList = (props) => {
  return (
    <div className={classes.expense}>
        <h3>{props.amount}</h3>
        <h3>{props.description}</h3>
        <h3>{props.category}</h3>
    </div>
  )
}

export default ExpenseList