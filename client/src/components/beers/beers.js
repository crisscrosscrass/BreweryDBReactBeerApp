import React, { Component } from 'react';
import './beers.css'
import Beerdetailview from './beerdetailview'
import Beerlistview from './beerslistview'

class Beers extends Component {
  constructor() {
    super();
    this.state = {
        beers: [],
        beerDetails: [],
        beerViewDetailsName: "",
        beerViewDetailsId: "",
        beerViewDetailsImage: "",
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
    this.closeDetailView();
    this.setState(prevState => {
      if(prevState.pageNumber === 1){
        return{
          pageNumber: prevState.pageNumber
        }
      }else{
        return{
          pageNumber: prevState.pageNumber-1
        }
      }
    },() => {
        this.callAPIBeersPageNumber(this.state.pageNumber);
    });
  }
  callAPIBeersNext(){
    this.closeDetailView();
    this.setState(prevState => {
      if(prevState.pageNumber === 23){
        return{
          pageNumber: prevState.pageNumber
        }
      }else{
        return{
          pageNumber: prevState.pageNumber+1
        }
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
      beerViewDetailsId : this.state.beerDetails[0].id,
      beerViewDetailsImage: this.state.beerDetails[0].icon
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
            <h2>select one Beer for Details</h2>
            <p>{this.state.pageNumber} of 24</p>
            <button onClick={this.callAPIBeersPrevious} >Previous</button><button>{this.state.pageNumber}</button><button onClick={this.callAPIBeersNext} >Next </button>
              <div className="leftside">
                <Beerlistview state={this.state} handleClick={this.handleClick}/>
                <button onClick={this.callAPIBeersPrevious} >Previous</button><button>{this.state.pageNumber}</button><button onClick={this.callAPIBeersNext} >Next </button>
              </div>
            </div>
            {this.state.beerViewDetailsName === "" ? "" :
             <div className="col md-6 no-gutters">
             <div className="rightside">
               <Beerdetailview state={this.state} detailId={this.state.beerViewDetailsId} name={this.state.beerViewDetailsName} image={this.state.beerViewDetailsImage} closeDetailView={this.closeDetailView}/>
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
               <Beerdetailview detailid={this.state.beerViewDetailsId} name={this.state.beerViewDetailsName} closeDetailView={this.closeDetailView}/>
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
