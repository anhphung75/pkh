function lamtronso(solamtron, sole = 0) {
  try {
    let le = Math.pow(10, sole);
    let kq = Math.trunc(solamtron * le) / le;
    le = Math.pow(10, sole + 1);
    let kt = Math.trunc(solamtron * le) / le;
    let lech = Math.round((kt - kq) * le);
    let them = 0;
    if (lech > 4) {
      them = 1 / Math.pow(10, sole);
    }
    return parseFloat(kq + them);
  } catch (error) {
    return 0;
  }
}

var Tien = {
  so: (tien) => {
    try {
      tien = parseInt(tien);
      if (tien) {
        return new Intl.NumberFormat('vi-VI', { maximumSignificantDigits: 0 }).format(tien);
      }
    } catch (error) {

    }
    return "- ";
  },
  chu: (tien) => {
    return "";
  }
}

export { lamtronso, Tien };