import { cpvt } from "./cpvt.js"
var phuivattu = {
  component: {
    cpvt: cpvt,
  },
  props: {
    odl: {
      //old={
      //     phui:{0:{mota:"",dvt:"",sl:"",giavl:0,gianc:0,giamtc:0}},
      //     vattu:{0:{mota:"",dvt:"",sl:"",giavl:0,gianc:0,giamtc:0}},
      //}
      type: Object,
      required: true
    },
    autospan: {
      type: Boolean,
      required: false
    },
  },
  data: {
    return: {
      Zvl: 0,
      Znc: 0,
      Zmtc: 0,
      ogird: {
        display: "grid",
        grid: "auto-flow minmax(1rem, max-content) / 151fr 30fr 45fr 60fr 40fr 40fr 63fr 63fr 63fr",
      },
    },
  },
  computed: {
    autobung() {
      if (this.autospan == true) {
        return true
      } else {
        return false
      }
    },
    phui() {
      let dl = {}
      this.Zvl = 0
      this.Znc = 0
      this.Zmtc = 0
      try {
        for (let k in this.odl.phui) {
          let cp = this.odl.phui[k]
          dl[k] = { ...cp }
          dl[k].tienvl = (cp.sl * cp.giavl).toFixed(0) || 0
          dl[k].tiennc = (cp.sl * cp.gianc).toFixed(0) || 0
          dl[k].tienmtc = (cp.sl * cp.giamtc).toFixed(0) || 0
          this.Zvl += dl[k].tienvl
          this.Znc += dl[k].tiennc
          this.Zmtc += dl[k].tienmtc
        }
      } catch (error) { }
      return dl;
    },
    vattu() {
      let dl = {}
      try {
        for (let k in this.odl.vattu) {
          let cp = this.odl.vattu[k]
          dl[k] = { ...cp }
          dl[k].tienvl = (cp.sl * cp.giavl).toFixed(0) || 0
          dl[k].tiennc = (cp.sl * cp.gianc).toFixed(0) || 0
          dl[k].tienmtc = (cp.sl * cp.giamtc).toFixed(0) || 0
          this.Zvl += dl[k].tienvl
          this.Znc += dl[k].tiennc
          this.Zmtc += dl[k].tienmtc
        }
      } catch (error) { }
      return dl;
    },
  },
  template: `
  <w class='phui-vattu-ongcai' :style="ogird">
    <w class="b c bt bl" style="grid-area:1/1/3/2; padding-top:6pt;">Mô tả công tác</w>
    <w class="b c bt bl" style="grid-area:1/2/3/3;">ĐVT</w>
    <w class="b c bt bl" style="grid-area:1/3/3/4;">SL</w>
    <w class="b c bt bl" style="grid-area:1/4/2/7;">Đơn giá</w>
    <w class="b c bt bl br" style="grid-area:1/7/2/10;">Thành tiền</w>
    <w class="b c bt bl" style="grid-area:2/4/3/5;">VL</w>
    <w class="b c bt bl" style="grid-area:2/5/3/6;">NC</w>
    <w class="b c bt bl br" style="grid-area:2/6/3/7;">MTC</w>
    <w class="b c bt bl" style="grid-area:2/7/3/8;">VL</w>
    <w class="b c bt bl" style="grid-area:2/8/3/9;">NC</w>
    <w class="b c bt bl br" style="grid-area:2/9/3/10;">MTC</w>
    <!-- tieu de phui   -->
    <w class="b l u bt bl"><slot name="tieudephui">LẮP ĐẶT ĐỒNG HỒ NƯỚC:</slot></w>
    <w class="bt bl"></w>
    <w class="bt bl"></w>
    <w class="bt bl"></w>
    <w class="bt bl"></w>
    <w class="bt bl"></w>
    <w class="bt bl"></w>
    <w class="bt bl"></w>
    <w class="bt bl"></w>
    <!-- phui   -->
    <cpvt v-for=="(v, k) in phui :key="k" chiphi="v"></cpvt>
    <!-- tieu de vat tu   -->
    <w class="b l u br bl"><slot name="tieudevattu">Vật tư cấp mới (Cty CP CN đầu tư):</slot></w>
    <w class="br bl"></w>
    <w class="br bl"></w>
    <w class="br bl"></w>
    <w class="br bl"></w>
    <w class="br bl"></w>
    <w class="br bl"></w>
    <w class="br bl"></w>
    <w class="br bl"></w>
    <!-- vat tu -->
    <cpvt v-for=="(v, k) in vattu :key="k" chiphi="v"></cpvt>
    <cpvt v-if="autobung" chiphi="null"></cpvt>
    <!-- tong ket Zvl Znc Zmtc   -->
    <w class="br bl"></w>
    <w class="br bl"></w>
    <w class="br bl"></w>
    <w class="br bl"></w>
    <w class="br bl"></w>
    <w class="br bl"></w>
    <w class="bt bl b r">{{Zvl}}</w>
    <w class="bt bl b r">{{Znc}}</w>
    <w class="bt bl br b r">{{Zmtc}}</w>
    <!-- dong cuoi   -->
    <w class="br bl bb"></w>
    <w class="br bl bb"></w>
    <w class="br bl bb"></w>
    <w class="br bl bb"></w>
    <w class="br bl bb"></w>
    <w class="br bl bb"></w>
    <w class="br bl bb c">vl</w>
    <w class="br bl bb c">nc</w>
    <w class="br bl bb c">mtc</w>
  </w>
  `
}

export { phuivattu }