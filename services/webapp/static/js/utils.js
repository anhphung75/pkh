function tao_uuid() {
  var temp_url = URL.createObjectURL(new Blob());
  var uuid = temp_url.toString();
  URL.revokeObjectURL(temp_url);
  return uuid.substr(uuid.lastIndexOf('/') + 1);
  // remove prefix (e.g. blob:null/, blob:www.test.com/, ...)
  // vd tao_uuid()= f6ca05c0-fad5-46fc-a237-a8e930e7cb49
}

function d2l(dict) {
  if (dict.constructor !== Object) { return null; }
  let k, r, kq = [];
  for (k in dict) {
    r = dict[k];
    kq.push(r);
  }
  return kq;
};

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

function viewso(sothapphan = 0, phanle = 3) {
  try {
    sothapphan = parseFloat(sothapphan);
    phanle = parseInt(phanle);
    if (sothapphan) {
      return new Intl.NumberFormat('vi-VI', { maximumSignificantDigits: phanle }).format(sothapphan);
    } else {
      return "- ";
    }
  } catch (error) {
    return sothapphan;
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

export { tao_uuid, lamtronso, viewso, d2l };
export { Tien };