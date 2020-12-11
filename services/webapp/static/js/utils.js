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