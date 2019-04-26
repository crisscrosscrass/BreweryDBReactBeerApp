import React from 'react'

function beerdetailview(props){
    console.log(props)
    return(
        <div>
            <button onClick={props.closeDetailView}>X</button>
            <h1><u>Details</u></h1>
            <h2>Name: {props.name}</h2>
        </div>
    )
}

export default beerdetailview;