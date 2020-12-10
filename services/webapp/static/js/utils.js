function lamtronso(solamtron, sole) {
  try {
    let le = Math.pow(10, sole);
    let so0 = Math.trunc(solamtron * le) / le;
    le = Math.pow(10, sole + 1);
    let so1 = Math.trunc(solamtron * le) / le;
    let lech = Math.round((so1 - so0) * le);
    if (lech < 5) {
      return so0;
    } else {
      return parseFloat(solamtron.toFixed(sole));
    }
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