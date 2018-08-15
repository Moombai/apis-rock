
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
          console.log("Most sold item:", product);
        }
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function totalSpend(email) {
  // prepare requests for users and purchases
  let users = axios.get('https://driftrock-dev-test.herokuapp.com/users').then(response => response.data.data);
  let purchases = axios.get('https://driftrock-dev-test.herokuapp.com/purchases').then(response => response.data.data);
  let responseData = {};

  Promise.all([users, purchases]).then(values => {
    responseData.users = values[0];
    responseData.purchases = values[1];

    return responseData;
  })
  .then(response => {
    // find the user by email and get associated id
    let allUsers = response.users;
    let userByEmail = allUsers.find(user => user.email === email);
    let userId = userByEmail.id;
    
    let purchaseTotal = 0;

    // check each purchase against the related id
    let allPurchases = response.purchases;
    allPurchases.forEach(purchase => {
      if (purchase.user_id === userId) {
        purchaseTotal += Number(purchase.spend);
      }
    })
    console.log(`${userByEmail.email} spent: £${purchaseTotal}`);
  })
}

totalSpend("terry_henry@doyle.io");

// getPurchases();
