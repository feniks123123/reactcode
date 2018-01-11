export default programs => {
  if(!programs) {
    return;
  }

  const programsKeys = Object.keys(programs);

  let maxPeriod = null;
  let minPeriod = null;
  let maxSum = null;
  let minSum = null;
  let minPayment = null;
  let maxPayment = null;
  let maxAge = null;
  let minAge = null;

  programsKeys.forEach((key) => {
    const { max_period, min_period, max_sum, min_sum, first_payment, max_firstpayment, min_age, max_age } = programs[ key ];
      if (maxPeriod === null) {
        maxPeriod = max_period;
      } else {
        if (max_period > maxPeriod) {
          maxPeriod = max_period;
        }
      }

      if (minPeriod === null) {
        minPeriod = min_period / 12;
      } else {
        if (min_period > minPeriod) {
          minPeriod = min_period / 12;
        }
      }

      if (maxSum === null) {
        maxSum = max_sum;
      } else {
        if (max_sum> maxSum) {
          maxSum = max_sum;
        }
      }

      if (minSum === null) {
        minSum = min_sum;
      } else {
        if (min_sum < minSum) {
          minSum = min_sum;
        }
      }

      if (maxAge === null) {
        maxAge = max_age;
      } else {
        if (max_age < max_age) {
          maxAge = max_age;
        }
      }

      if (minAge === null) {
        minAge = min_age;
      } else {
        if (min_age < minAge) {
          console.log(min_age);
          minAge = min_age;
        }
      }

      if (maxPayment === null) {
        maxPayment = max_firstpayment;
      } else {
        if (max_firstpayment > maxPayment) {
          maxPayment = max_firstpayment;
        }
      }

      if (minPayment === null) {
        minPayment = first_payment;
      } else {
        if (first_payment < minPayment) {
          minPayment = first_payment;
        }
      }
  });

  return ({
    maxPeriod,
    minPeriod,
    maxSum,
    minSum: 0,
    maxAge,
    minAge,
    maxPayment,
    minPayment
  });
};