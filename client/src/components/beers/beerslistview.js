import React from 'react'

function Beerlistview(props){
    const beersList = props.state.beers.map( beer => {
        let beerImage = "https://via.placeholder.com/64.png/dddddd/ffffff?text=N/A";
        if(typeof beer.labels !== 'undefined'){
          beerImage = beer.labels.icon;
        }  
        return <li key={beer.id} className={"" + beer.id} onClick={() => props.handleClick(beer.id)} >
        <img src={beerImage} alt="" />
        <span href="" >{typeof beer.name === "undefined" ? "Name: N/A " : beer.name+" "}</span> 
        <span href="" >{typeof beer.abv === "undefined" ? "ABV: N/A " : "ABV: "+beer.abv+" "}</span>
        <span href="" >{typeof beer.ibu === "undefined" ? "IBU: N/A " : "IBU: "+beer.ibu+" "}</span> 
        </li>
      });
      return(
        <div className="">
            <ul>{beersList}</ul>
        </div>
      )
}

export default Beerlistview