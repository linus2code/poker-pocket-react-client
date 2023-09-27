const imgFolder = './assets/images/';

export const parserCardStyle = (val) => {
  var styleStr = '';
  if (val != null) {
    styleStr = val === 'true' ? '_black' : '';
  }

  return styleStr;
};

export const getCardResource = (cardStr, styleStr) => {
  if (cardStr === '') {
    return imgFolder + 'card_top_red.png';
  }

  var suit = getSuit(cardStr);
  var value = getValue(cardStr);
  if (suit === undefined || suit === '' || value === undefined || value === '') {
    return '';
  } else {
    return imgFolder + `card_${suit}_${value}${styleStr}.png`;
  }
};

function getSuit(cardStr) {
  if (cardStr !== void 0) {
    if (cardStr.indexOf('♠') !== -1) {
      // Spades
      return 'spades';
    } else if (cardStr.indexOf('♥') !== -1) {
      // Hearts
      return 'hearts';
    } else if (cardStr.indexOf('♣') !== -1) {
      // Clubs
      return 'clubs';
    } else if (cardStr.indexOf('♦') !== -1) {
      // Diamonds
      return 'diamonds';
    } else {
      return '';
    }
  } else {
    return '';
  }
}

function getValue(cardStr) {
  if (cardStr !== void 0) {
    if (cardStr.indexOf('2') !== -1) {
      return 'two';
    } else if (cardStr.indexOf('3') !== -1) {
      return 'three';
    } else if (cardStr.indexOf('4') !== -1) {
      return 'four';
    } else if (cardStr.indexOf('5') !== -1) {
      return 'five';
    } else if (cardStr.indexOf('6') !== -1) {
      return 'six';
    } else if (cardStr.indexOf('7') !== -1) {
      return 'seven';
    } else if (cardStr.indexOf('8') !== -1) {
      return 'eight';
    } else if (cardStr.indexOf('9') !== -1) {
      return 'nine';
    } else if (cardStr.indexOf('10') !== -1) {
      return 'ten';
    } else if (cardStr.indexOf('J') !== -1) {
      return 'eleven';
    } else if (cardStr.indexOf('Q') !== -1) {
      return 'twelve';
    } else if (cardStr.indexOf('K') !== -1) {
      return 'thirteen';
    } else if (cardStr.indexOf('A') !== -1) {
      return 'fourteen';
    } else {
      return '';
    }
  } else {
    return '';
  }
}
