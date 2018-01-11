import SunCalc from 'suncalc';

const wholeNumbers = (numbers) => {
  return numbers < 10 ? '0' : '';
};

export default (latitude, longitude) => {
  const date = new Date();
  const hour = wholeNumbers(date.getHours()) + date.getHours();
  const minutes = wholeNumbers(date.getMinutes()) + date.getMinutes();
  const sunCalc = SunCalc.getTimes(new Date(), latitude, longitude);
  const time = `${ hour }:${ minutes }`;
  const sunsetStart = `${ sunCalc.sunset.getHours() }:${ sunCalc.sunset.getMinutes() }`;
  const sunriseStart = `${ wholeNumbers(sunCalc.sunrise.getHours()) + sunCalc.sunrise.getHours() }:${ wholeNumbers(sunCalc.sunrise.getMinutes()) + sunCalc.sunrise.getMinutes() }`;

  if(time >= sunsetStart) {
    return true;
  }

  if(time <= sunriseStart) {
    return true;
  }

  return false;
};