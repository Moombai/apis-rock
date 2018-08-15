
const axios = require('axios');


function getPurchases() {
  axios.get('https://driftrock-dev-test.herokuapp.com/purchases')
    .then(response => {
      // empty data store
      let salesTally = {};
      let purchases = response.data.data;

      purchases.forEach(purchase => {
        // check if the product is in the tally
        if (salesTally[purchase.item]) {
          salesTally[purchase.item] += Number(purchase.spend);
        } else {
          salesTally[purchase.item] = Number(purchase.spend);
        }
      })

      console.log(Object.values(salesTally));
      // let arr = Object.values(salesTally);
      // console.log(arr);
      // let min = Math.min(...arr);
      // let max = Math.max(...arr);
    })
    .catch(error => {
      console.log(error);
    });
}

getPurchases();



// calculate most_sold:
// get all the products sold from the api
// build a new object in our data store with the following signature soldProudcts[product] = price
// write a script to find the max value in the soldProducts (refer to PEX Software project)
// display that product and the associated item