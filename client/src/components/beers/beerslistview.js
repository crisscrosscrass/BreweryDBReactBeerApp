import React from 'react';


function Beerlistview(props){
    const beersList = props.state.beers.map( beer => {
        let beerImage = "https://via.placeholder.com/64.png/dddddd/ffffff?text=N/A";
        if(typeof beer.labels !== 'undefined'){
          beerImage = beer.labels.icon;
        }  
        return <li key={beer.id} className={"" + beer.id} onClick={() => props.handleClick(beer.id)} >
        <div className="row no-gutters">
          <div className="image">
            <img src={beerImage} alt="" />
          </div>
          <div className="col md-6 no-gutters">
            <ul>
              <li href="" >{typeof beer.name === "undefined" ? "Name: N/A " : beer.name+" "}</li> 
              <li href="" >{typeof beer.abv === "undefined" ? "ABV: N/A " : "ABV: "+beer.abv+" "}</li>
              <li href="" >{typeof beer.ibu === "undefined" ? "IBU: N/A " : "IBU: "+beer.ibu+" "}</li>
            </ul>
          </div>
        </div>
        </li>
      });
      return(
        <div className="">
            <ul>{beersList}</ul>
        </div>
      )
}

export default Beerlistview