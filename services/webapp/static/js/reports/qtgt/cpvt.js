export default {
  props: {
    chiphi: {
      //old={mota:"",dvt:"",sl:"",giavl:0,gianc:0,giamtc:0,tienvl:0,tiennc:0,tienmtc:0}
      type: Object,
      required: false
    },
  },
  data() {
    return {
      css: {
        grid: "auto-flow minmax(1rem, max-content) / 151fr 30fr 45fr 60fr 40fr 40fr 63fr 63fr 63fr",
      },
    }
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
    <div class="bt bl l">{{mota}}</div>
    <div class="bt bl c">{{dvt}}</div>
    <div class="bt bl r">{{sl}}</div>
    <div class="bt bl r">{{giavl}}</div>
    <div class="bt bl r">{{gianc}}</div>
    <div class="bt bl r">{{giamtc}}</div>
    <div class="bt bl r">{{tienvl}}</div>
    <div class="bt bl r">{{tiennc}}</div>
    <div class="bt bl r">{{tienmtc}}</div>
  `
};