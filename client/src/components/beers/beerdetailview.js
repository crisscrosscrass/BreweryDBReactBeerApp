import React from 'react'

function beerdetailview(props){
    let beerImage = "https://via.placeholder.com/64.png/dddddd/ffffff?text=N/A";
    const beerDetails = {
        name: "",
        beerImage : beerImage,
        abv: "",
        ibu: "",
        isOrganic: "",
        Labels: "",
        Year: "",
        Status: "",
        Glass: "",
    };
    props.state.beers.forEach(beer => {
        if(props.detailId === beer.id){
            beerDetails.name = beer.name;
            beerDetails.abv = beer.abv;
            beerDetails.ibu = beer.ibu;
            beerDetails.isOrganic = beer.isOrganic;
            if(typeof beer.labels !== 'undefined'){
                beerDetails.beerImage = beer.labels;
            }
            if(typeof beer.labels !== 'undefined'){
                beerDetails.Labels = beer.labels;
            }
            beerDetails.Year = beer.year;
            beerDetails.Status = beer.status;
            if(typeof beer.glass !== 'undefined'){
                beerDetails.Glass = beer.glass.name;
            }
        }
    }); 
    return(
        <div className="beerdetailview">
            <button onClick={props.closeDetailView}>X</button>
            <h1><u>Details:</u></h1>
            <h2><img src={beerDetails.beerImage.icon} alt="" />Name: {typeof beerDetails.name === "undefined" ? "N/A" : beerDetails.name}</h2>
            <ul>
                <li>ABV: {typeof beerDetails.abv === "undefined" ? "N/A" : beerDetails.abv}</li>
                <li>IBU: {typeof beerDetails.ibu === "undefined" ? "N/A" : beerDetails.ibu}</li>
                <li>isOrganic: {beerDetails.isOrganic}</li>
                <li>Labels: {typeof beerDetails.Labels === "undefined" | beerDetails.Labels === "" ? "N/A" :
                <div> 
                    <img src={beerDetails.Labels.contentAwareIcon} alt="" /> 
                    <img src={beerDetails.Labels.large} alt="" />
                </div>
                }
                </li>
                <li>Year: {typeof beerDetails.Year === "undefined" ? "N/A" : beerDetails.Year}</li>
                <li>status: {typeof beerDetails.Status === "undefined" ? "N/A" : beerDetails.Status }</li>
                <li>Glass: {typeof beerDetails.Glass === "undefined" | beerDetails.Glass === "" ? "N/A" : beerDetails.Glass}</li>
            </ul>
        </div>
    )
}

export default beerdetailview;