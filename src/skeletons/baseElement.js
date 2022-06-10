import React from 'react'
import './skeleton.css'

export const SkeltonElement = (props) => {

    let {type} = props //specifying th type of skeleton you want send from the prop

    const classes = `skeleton ${type}`;

    return(
        <>
        
        <div className={classes}></div>
        
        
        </>
    )
}