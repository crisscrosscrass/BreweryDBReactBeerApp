const express = require('express');
const axios = require("axios");
const brewerydbkey = 'key=4fe001d4993592b9b9e1890a651e8fb7';
var cors = require('cors')
const app = express();
app.use(cors())
app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Mary', lastName: 'Angel'},
    {id: 3, firstName: 'Chris', lastName: 'Cross'},
  ];
  res.json(customers);
});
app.get('/api/beers/:pagenumber', function(req, res, next) {
  var pagenumber = req.params.pagenumber;
  axios.get('http://api.brewerydb.com/v2/beers?'+brewerydbkey+'&p='+pagenumber)
  .then( (response) => {
    //console.log(response.data);
    //console.log(response.data.numberOfPages)
    let postsArray = [];
    response.data.data.map( (posts) => {
      postsArray.push(posts);
    })
    res.json(postsArray);
  })
  .catch( (err) => {
    console.log(err);
  });
});
app.get('/api/beeritem/:detailid', function(req, res, next) {
  var detailid = req.params.detailid;
  axios.get('http://api.brewerydb.com/v2/beers?'+brewerydbkey+'&ids='+detailid)
  .then( (response) => {
    let postsArray = [];
    response.data.data.map( (posts) => {
      postsArray.push(posts);
    })
    res.json(postsArray);
  })
  .catch( (err) => {
    console.log(err);
  });
});
const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));