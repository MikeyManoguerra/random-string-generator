const form = document.getElementById('form');
form.onsubmit = onSubmit

function onSubmit(event) {
  event.preventDefault();
  const params = {};

  for (const [key, value] of new FormData(event.target).entries()) {
    params[key] = value;
  }

  document.getElementById('result').textContent = result(params);
}

function result(params) {
  const {
    length,
    delimeter,
    useDelimeter
  } = params;

  if (parseInt(useDelimeter)) {
    return insertDelimeter(randomString(length, validCharCodes(params)), delimeter);
  }

  return randomString(length, validCharCodes(params));
}

function randomString(stringLength, validCharCodes) {
  let randomCharCodes = new Uint8Array(0);

  while (randomCharCodes.length < stringLength) {
    const values = window.crypto.getRandomValues(new Uint8Array(stringLength));
    randomCharCodes = new Uint8Array([...randomCharCodes, ...values.filter(int => validCharCodes.includes(int))]);
  }

  return String.fromCharCode(...randomCharCodes.slice(0, stringLength));
}

function insertDelimeter(string, delimeterCode) {
  const delimeter = String.fromCharCode(delimeterCode);

  let previousDelimeterIndex = 0;
  let endReached = false
  while (!endReached) {
    const interval = intervalFromRange();
    const front = string.slice(0, previousDelimeterIndex += interval);
    const back = string.slice(previousDelimeterIndex += 1); //account for width of delimeter in string

    if (!back.length) {
      endReached = true;
      continue;
    }

    string = front + delimeter + back;
  }

  return string;
}

function intervalFromRange() {
  const [small, large] = [5, 9]
  const interval = window.crypto.getRandomValues(new Uint8Array(255)).find(int => (int >= small) && (int <= large));

  return interval ? interval : intervalFromRange();
}

const numberCodes = range(48, 57);
const uppercaseCodes = range(65, 90);
const lowercaseCodes = range(97, 122);

function validCharCodes(params) {
  params.hasOwnProperty('numbers');
  params.hasOwnProperty('uppercase');
  params.hasOwnProperty('lowercase');

  return [
    ...(params.hasOwnProperty('numbers') ? numberCodes : []),
    ...(params.hasOwnProperty('uppercase') ? uppercaseCodes : []),
    ...(params.hasOwnProperty('lowercase') ? lowercaseCodes : []),
    ...keyCodes(params, 'symbol')
  ];
}

function keyCodes(params, type) {
  return (Object.keys(params).filter(key => key.includes(type)).map(key => parseInt(key.split('-')[1])));
}

function range(start, stop) {
  const numbers = [start];
  let next = start;
  while (next < stop) {
    numbers.push(next += 1);
  }

  return numbers;
}
