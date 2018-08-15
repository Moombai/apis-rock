
const axios = require('axios');


function getPurchases() {
  axios.get('https://driftrock-dev-test.herokuapp.com/purchases')
    .then(response => {
      let salesTally = {};
      let purchases = response.data.data;

      /** 
       * add each product to the salesTally and count how many times
       * it has been purchased
      **/
      purchases.forEach(purchase => {
        let item = purchase.item;

        if (salesTally[item]) {
          salesTally[item] += 1;
        } else {
          salesTally[item] = 1;
        }
      })

      // find the largest number in the salesTally and it's associated product(s)
      let valuesArray = Object.values(salesTally);
      let max = Math.max(...valuesArray);

      for (let product in salesTally) {
        if (salesTally[product] === max) {
          console.log(product);
        }
      }
    })
    .catch(error => {
      console.log(error);
    });
}

getPurchases();