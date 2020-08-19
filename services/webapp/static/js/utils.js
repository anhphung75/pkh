function lamtronso(solamtron, sole) {
  try {
    return solamtron.toFixed(sole);
  } catch (error) {
    return null
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