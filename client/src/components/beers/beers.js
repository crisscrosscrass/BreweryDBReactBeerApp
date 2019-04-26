import React, { Component } from 'react';
import './beers.css'
import Beerdetailview from './beerdetailview'
import Beerlistview from './beerslistview'
/*
           Data can used this Details: 
           id: '6AcqY6',
[0]        name: 'Agave Wheat',
[0]        nameDisplay: 'Agave Wheat',
[0]        description:
[0]         'This true American-style unfiltered wheat has something a little special – the nectar of the great Salmiana Agave. Agave complements the refreshingly light quality of our wheat and adds a subtle note of flavor that expands this beer’s uplifting taste profile. It is familiar, yet creative.\r\n\r\nYeast: American Wheat\r\nMalts: Pale, White Wheat, Torrified Wheat, Carapils, Caramel, Munich\r\nHops: Fuggle, Cascade, Willamette',
[0]        abv: '5.9',
[0]        ibu: '19',
[0]        glasswareId: 9,
[0]        availableId: 1,
[0]        styleId: 112,
[0]        isOrganic: 'N',
[0]        isRetired: 'N',
[0]        labels: [Object],
[0]        status: 'verified',
[0]        statusDisplay: 'Verified',
[0]        createDate: '2012-01-03 02:42:39',
[0]        updateDate: '2018-11-02 02:15:14',
[0]        glass: [Object],
[0]        available: [Object],
[0]        style: [Object] },
           */

class Beers extends Component {
  constructor() {
    super();
    this.state = {
        beers: [],
        beerDetails: [],
        beerViewDetailsName: "",
        beerViewDetailsABV: "",
        beerViewDetailsGlasswareId: "",
        beerViewDetailsStyleId: "",
        beerViewDetailsIsOrganic: "",
        beerViewDetailsIsRetired: "",
        pageNumber : 0,
        isLoaded: false,
        showingDetail: false
    };
    this.callAPIBeersNext = this.callAPIBeersNext.bind(this);
    this.callAPIBeersPrevious = this.callAPIBeersPrevious.bind(this);
    this.callAPIDetail = this.callAPIDetail.bind(this);
    this.adjustBeerDetailView = this.adjustBeerDetailView.bind(this);
    this.handleClick = this.handleClick.bind(this)
    this.closeDetailView = this.closeDetailView.bind(this)
  }
  componentDidMount(){
      this.callAPIBeersNext();
  }
  callAPIBeersPrevious(){
    this.setState(prevState => {
        return{
            pageNumber: prevState.pageNumber-1
        }
    },() => {
        this.callAPIBeersPageNumber(this.state.pageNumber);
    });
  }
  callAPIBeersNext(){
    this.setState(prevState => {
        return{
            pageNumber: prevState.pageNumber+1
        }
    },() => {
        this.callAPIBeersPageNumber(this.state.pageNumber);
    });
  }
  callAPIBeersPageNumber(pageNumber){
    this.setState({isLoaded:false})
    fetch("/api/beers/"+pageNumber+"")
    .then( res => res.json() )
    .then( beers => this.setState({beers}, this.setState({isLoaded:true})));
  }
  adjustBeerDetailView(){
    this.setState({
      beerViewDetailsName: this.state.beerDetails[0].name,
      beerViewDetailsABV : this.state.beerDetails[0].abv
    })
  }
  callAPIDetail(detailId){
    fetch("/api/beeritem/"+detailId+"")
    .then( res => res.json() )
    .then( beerDetails => this.setState({beerDetails},() => {
      this.adjustBeerDetailView();})
    );
  }
  handleClick(id){
    this.callAPIDetail(id);
  }
  closeDetailView(){
    this.setState({beerViewDetailsName:""})
  }
  render(){
    const {isLoaded} = this.state;
    if(isLoaded){
      return (
        <div>
          <div className="row no-gutters">
            <div className="col md-6 no-gutters">
            <h2>select one Item for Details</h2>
            <button onClick={this.callAPIBeersPrevious} >Previous</button><button>{this.state.pageNumber}</button><button onClick={this.callAPIBeersNext} >Next </button>
              <div className="leftside">
                <Beerlistview state={this.state} handleClick={this.handleClick}/>
                <button onClick={this.callAPIBeersPrevious} >Previous</button><button>{this.state.pageNumber}</button><button onClick={this.callAPIBeersNext} >Next </button>
              </div>
            </div>
            {this.state.beerViewDetailsName === "" ? "" :
             <div className="col md-6 no-gutters">
             <div className="rightside">
               <Beerdetailview state={this.state} name={this.state.beerViewDetailsName} closeDetailView={this.closeDetailView}/>
             </div>
           </div>
             }
          </div>
        </div>
      );
    }else{
      return (        
        <div>
          <div className="row no-gutters">
            <div className="col md-6 no-gutters">
            <h2>loading beers list</h2>
            <div className="leftside">
            <img src="https://www.cantemerle-hotel-vence.com/wp-content/uploads/revslider/accueil_fr1/giphy.gif" alt="" />
            </div>
            </div>
            {this.state.beerViewDetailsName === "" ? "" :
             <div className="col md-6 no-gutters">
             <div className="rightside">
               <Beerdetailview name={this.state.beerViewDetailsName} closeDetailView={this.closeDetailView}/>
             </div>
           </div>
             }
          </div>
        </div>
      );
    }
  }
}

export default Beers;
