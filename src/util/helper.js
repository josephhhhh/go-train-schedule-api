const formatLine = (str) => {
  return str[0].toUpperCase() + str.substr(1).toLowerCase();
}

// check if str is valid 24h format followed by *** or **** pattern
const check24hFormat = (str) => {
  if(/^\d{1,4}$/.test(str)){
    const s = str.match(/(.*)(\d{2})$/).slice(1);
    const hour = parseInt(s[0]);
    const minute = parseInt(s[1]);
    return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
  }
}

// check if str is valid 12h format followed by **:**am or *:**am pattern (case insentive)
const check12hFormat = (str) => {
  if(/^\d{1,2}:\d{2}[a/p]m$/i.test(str)){
    const s = str.split(':');
    const hour = parseInt(s[0]);
    const minute = parseInt(s[1]);
    return hour >= 0 && hour <= 12 && minute >= 0 && minute <= 59;
  }
}

const convertTo24h = (str) => {
  if(check12hFormat(str)){
    const s = str.split(':');
    if(s[1].toLowerCase().includes('am')){
      return parseInt(s[0]+s[1]);
    }else{
      // pm
      return parseInt(12+Number(s[0])+s[1]);
    }
  }else{
    return str;
  }
}

const validateDeparture = (str) => {
  return check12hFormat(str) || check24hFormat(str);
}


export default {
  formatLine,
  check24hFormat,
  check12hFormat,
  convertTo24h,
  validateDeparture,
}
