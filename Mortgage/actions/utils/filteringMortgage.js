export default (programs, lendingOptions) => {
  const {
    citizenship,
    currencyPercent,
    age,
    mortgagePeriod,
    mortgageSum
  } = lendingOptions;

  const programsKeys = Object.keys(programs);
  const filteredPrograms = [];
  const bankIds = [];
  programsKeys.forEach(key => {
    const {
      guid,
      bankId,
      min_age,
      max_age,
      min_period,
      max_period,
      min_percent,
      min_sum,
      max_sum,
      max_firstpayment,
      first_payment,
      is_war,
      sort,
      citizenship: programCitizenship
    } = programs[ key ];

    const minPeriod = min_period / 12;
    const correctAge = age <= (max_age - 1) && age >= min_age;
    const correctCredit = mortgageSum <= max_sum && mortgageSum >= min_sum;
    const correctPercent = currencyPercent <= max_firstpayment && currencyPercent >= first_payment;
    const correctPeriod = (mortgagePeriod <= max_period && age + mortgagePeriod <= max_age) && mortgagePeriod >= minPeriod;
    const correctCitizenship = getCitizenship(programCitizenship, citizenship);

    if (correctAge && correctCredit && correctPeriod && correctPercent && correctCitizenship && !is_war) {
      const monthPayment = Math.floor(mortgageSum * (min_percent / 1200 + min_percent / 1200 / (
        Math.pow(1 + min_percent / 1200, (mortgagePeriod * 12) - 1) - 1)));

      const indexInBanks = bankIds.indexOf(bankId);

      if(!~indexInBanks) {
        bankIds.push(bankId);
        filteredPrograms.push({ ...programs[ key ], guid: key, monthPayment });
        return;
      }

      if(sort && ~indexInBanks) {
        let programmIndex = null;

        filteredPrograms.forEach(({ bankId }, i) => {
          if(bankIds[ indexInBanks ] === bankId) {
            programmIndex = i;
          }
        });

        if(Number(sort) > (Number(filteredPrograms[ programmIndex ].sort) || 0)) {
          filteredPrograms[ programmIndex ] = { ...programs[ key ], guid: key, monthPayment };
        }
      }
    }
  });

  filteredPrograms.sort(({ monthPayment: firstPayment },
                         { monthPayment: secondPayment }) => firstPayment - secondPayment);

  return filteredPrograms;
};

function getCitizenship(programCitizenship, citizenship) {
  if(citizenship === 'РФ') {
    return true;
  }

  if(citizenship === 'Иное') {
    if(programCitizenship === 'РФ') {
      return false;
    }

    return true;
  }
}