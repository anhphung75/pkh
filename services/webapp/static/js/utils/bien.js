var defaInt = (v, defa = 0) => {
  try {
    return parseInt(v);
  } catch (err) {
    return defa;
  }
};

var defaStr = (v, defa = '') => {
  if (v != null) {
    var s = v.toString();
    if (s === '[object Object]') {
      s = JSON.stringify(v);
      s = s.replace(/"/g, '');
      s = s.replace(/ +/g, ' ');
    }
    return s;
  } else {
    return defa;
  }
};

var defaFloat = (v, defa = 0.0) => {
  try {
    return parseFloat(v);
  } catch (err) {
    return defa;
  }
};

var defaObj = (v, defa = {}) => {
  try {
    var s = JSON.stringify(v);
    var d = s.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
    s = d.replace(/'/g, '"');
    return JSON.parse(s);
  } catch (err) {
    return defa;
  }
};

var isObjEmpty = (obj) => {
  for (let k in obj) {
    return false;
  }
  return true;
};


var ld2dd = (recs) => {
  let orecs = {};
  if (Array.isArray(recs)) {
    try {
      let dai = recs.length || 0;
      for (let i = 0; i < dai; i++) {
        orecs[i] = recs[i];
      };
      return orecs;
    } catch (err) {
      console.log('Error ld2dd ', err.message);
    };
  };
  if (typeof recs === 'object') {
    return recs;
  } else {
    return orecs;
  };
};

export { defaInt, defaStr, defaObj, defaFloat };
export { ld2dd };