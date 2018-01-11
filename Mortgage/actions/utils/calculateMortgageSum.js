export default ({ currency, cost }, { minPayment, maxSum, minSum, }) => {
  let calculateMortgageSum = cost - currency;

  // if(calculateMortgageSum > maxSum) {
  //   calculateMortgageSum = maxSum;
  // }

  if(calculateMortgageSum < minSum) {
    currency = 0;
    calculateMortgageSum = minSum;
    cost = minSum;
  }

  return {
    mortgageSum: calculateMortgageSum,
    currency,
    cost
  };
};