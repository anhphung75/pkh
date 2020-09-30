var isObjEmpty = (obj) => {
  for (let k in obj) {
    return false;
  }
  return true;
};

var any2obj = (sdata) => {
  if (typeof sdata === 'string') {
    let data = sdata.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
    sdata = data.replace(/'/g, '"');
    return JSON.parse(sdata);
  }
  return sdata;
};

function lamtronso(solamtron, sole) {
  try {
    let so = parseInt(solamtron * 10 ** (sole + 1));
    let lech = so % 10;
    if (lech >= 5) {
      so += 5;
    }
    so = so / 10 ** (sole + 1);
    return so.toFixed(sole);
  } catch (error) {
    return 0;
  }
}

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

var suaStr = (ss = '') => {
  try {
    //loai bo 2 space, tabs, newlines
    ss = ss.replace(/\s\s+/g, ' ');
    //loai bo 2 space
    ss = ss.replace(/  +/g, ' ');
    //thay NumpadSubtract = Minus
    ss = ss.replace(/-+/g, '-');
    //loai bo 2 Minus --
    ss = ss.replace(/--+/g, '-');
    ss = ss.replace(/, ,/g, ',');
    ss = ss.replace(/,,+/g, ',');
  } catch (err) { };
  return ss;
};

export { isObjEmpty, ld2dd, suaStr, any2obj, lamtronso };