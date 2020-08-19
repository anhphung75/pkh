var cpvt = {
  props: {
    chiphi: {
      //old={mota:"",dvt:"",sl:"",giavl:0,gianc:0,giamtc:0,tienvl:0,tiennc:0,tienmtc:0}
      type: Object,
      required: false
    },
  },
  method: {
    tienso(tien, sole = 0) {
      try {
        if (tien <= 0) {
          return "- ";
        }
        if (tien > 0) {
          tien = parseInt(tien)
          return new Intl.NumberFormat('vi-VI', { maximumSignificantDigits: sole }).format(tien);
        }
      } catch (error) {
        return "- ";
      }
    },
  },
  computed: {
    mota() {
      return this.chiphi.mota || "";
    },
    dvt() {
      return this.chiphi.dvt || "";
    },
    sl() {
      return tienso(this.chiphi.sl, 3);
    },
    giavl() {
      return tienso(this.chiphi.giavl);
    },
    gianc() {
      return tienso(this.chiphi.gianc);
    },
    giamtc() {
      return tienso(this.chiphi.giamtc);
    },
    tienvl() {
      return tienso(this.chiphi.tienvl);
    },
    tiennc() {
      return tienso(this.chiphi.tiennc);
    },
    tienmtc() {
      return tienso(this.chiphi.tienmtc);
    },
  },
  template: `
    <w class="bt bl l">{{mota}}</w>
    <w class="bt bl c">{{dvt}}</w>
    <w class="bt bl r">{{sl}}</w>
    <w class="bt bl r">{{giavl}}</w>
    <w class="bt bl r">{{gianc}}</w>
    <w class="bt bl r">{{giamtc}}</w>
    <w class="bt bl r">{{tienvl}}</w>
    <w class="bt bl r">{{tiennc}}</w>
    <w class="bt bl r">{{tienmtc}}</w>
  `
}

export { cpvt }