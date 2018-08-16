
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

function most_loyal() {
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
    let purchases = response.purchases;
    let allUsers = response.users;
    let purchaseTally = {};
    let mostPurchasesId;
    
    // tally the purchases by Id
    purchases.forEach(purchase => {
      let userId = purchase.user_id;
      let userSpend = purchase.spend;

      if (purchaseTally[userId]) {
        purchaseTally[userId] +=  1;
      } else {
        purchaseTally[userId] = 1;
      }
    });

    // find the largest spend and it's associated id
    let spendArray = Object.values(purchaseTally);
    let mostPurchases = Math.max(...spendArray);
    
    // find the id with the largest spend
    for (let purchases in purchaseTally) {
      if (purchaseTally[purchases] === mostPurchases) {
        mostPurchasesId = purchases;
      }
    }

    // find the respective id amoungst all users
    allUsers.find(user => {
      if (user.id === mostPurchasesId) {
        console.log(`The largest number of purchases was made by: ${user.email}`);
      }
    });
  })
  .catch(error => {
    console.log(error);
  });
}

most_loyal();

// totalSpend("terry_henry@doyle.io");
// getPurchases();

// TODO:
// implement the script commands
  // the CLI user should be able to call the functions based arguments given in the command line
