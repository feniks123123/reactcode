export const length = (value, option) => {
  const { min, max } = option;
  return min <= value.length && value.length <= max;
};

export const isAlphanumeric = (value) => {
  return value.match(/^[a-z0-9]+$/i) !== null;
};

export const isAlpha = (value) => {
  return value.match(/^[A-Za-zА-Яа-яЁё]+$/i) !== null;
};

export const mustContainUpperCase = (value) => {
  return value.match(/[A-Z]/) !== null;
};

export const isEmail = (value) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value);
};

export const isURL = (value) => {
  const re = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  return re.test(value);
};
