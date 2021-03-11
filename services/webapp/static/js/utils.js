function tao_uuid() {
  var temp_url = URL.createObjectURL(new Blob());
  var uuid = temp_url.toString();
  URL.revokeObjectURL(temp_url);
  return uuid.substr(uuid.lastIndexOf('/') + 1);
  // remove prefix (e.g. blob:null/, blob:www.test.com/, ...)
  // vd tao_uuid()= f6ca05c0-fad5-46fc-a237-a8e930e7cb49
}

function a2s(dl) {
  if (dl === undefined || dl === null) {
    return '';
  } else if (dl.constructor === String) {
    return dl.toString();
  }
  else {
    return JSON.stringify(dl);
  }
}
function a2sl(dl) {
  return a2s(dl).toLowerCase();
}
function a2su(dl) {
  return a2s(dl).toUpperCase();
}

function a2i(dl) {
  if (dl === undefined || dl === null) {
    return 0;
  } else if (dl.constructor === Number) {
    return parseInt(dl);
  }
  else {
    return 0;
  }
}

function lamtronso(solamtron, sole = 0) {
  try {
    let le = Math.pow(10, sole);
    let kq = Math.trunc(solamtron * le) / le;
    le = Math.pow(10, sole + 1);
    let kt = Math.trunc(solamtron * le) / le;
    let them = 0;
    let lech = Math.round((kt - kq) * le);
    if (lech > 4) {
      them = 1 / Math.pow(10, sole);
    }
    return parseFloat(kq + them);
  } catch (error) {
    return 0;
  }
}

class Tien {
  constructor(sotien) {
    try {
      this.tien = parseInt(sotien)
    } catch (error) {
      this.tien = null
    }
  }
  so() {
    if (this.tien) {
      return new Intl.NumberFormat('vi-VI', { maximumSignificantDigits: 0 }).format(this.tien);
    } else {
      return "- ";
    }
  }
  chu() {
    return "";
  }
}

export { tao_uuid, lamtronso, a2s, a2su, a2sl, a2i };
export { Tien };