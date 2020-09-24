function lamtronso(solamtron, sole) {
  try {
    let so1 = solamtron.toFixed(sole+1);
    let so = solamtron.toFixed(sole);
    let lech = (so1-so)*(10**sole);
    if (lech>=0.5){
      so1 = so + 1/(10**phanle)
      so =so1.toFixed(sole);
    }
    return so;
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
      return "";
    }
  }
  chu() {
    return "";
  }
}