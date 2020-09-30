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