var isObjEmpty = (obj) => {
  for (let k in obj) {
    return false;
  }
  return true;
};

var any2obj = (sdata) => {
  let data = { kq: sdata };
  try {
    let d = JSON.stringify(sdata);
    d = d.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
    d = d.replace(/'/g, '"');
    data['kq'] = JSON.parse(d);
    return data
  } catch (err) {
    data['err'] = err;
    return data;
  }
}

var lamtronso = (solamtron, sole) => {
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

function tao_uuid() {
  var temp_url = URL.createObjectURL(new Blob());
  var uuid = temp_url.toString();
  URL.revokeObjectURL(temp_url);
  return uuid.substr(uuid.lastIndexOf('/') + 1);
  // remove prefix (e.g. blob:null/, blob:www.test.com/, ...)
  // vd tao_uuid()= f6ca05c0-fad5-46fc-a237-a8e930e7cb49
}

function arrayBufferToBlob(buffer, type) {
  return new Blob([buffer], { type: type });
}

function blobToArrayBuffer(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', (e) => {
      resolve(reader.result);
    });
    reader.addEventListener('error', reject);
    reader.readAsArrayBuffer(blob);
  });
}

export {
  isObjEmpty, ld2dd, suaStr, any2obj, lamtronso,
  tao_uuid, arrayBufferToBlob, blobToArrayBuffer
};