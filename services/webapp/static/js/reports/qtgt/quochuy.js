export default {
  data() {
    return {
      css:{
        grid: "auto-flow minmax(1rem, max-content)/max-content 1fr max-content",
      },
    }
  },
  template: `
    <div class="grid" :style="css">
      <div>
        <div class="c u b"><slot name="tencongty">CÔNG TY CỔ PHẦN CẤP NƯỚC THỦ ĐỨC</slot></div>
        <div class="c b"><slot name="tendvtc">ĐỘI QLML CẤP NƯỚC QUẬN THỦ ĐỨC</slot></div>
        <div class="c f-2">---------oOo---------</div>
        <div class="c">Số tài khoản: 102010000183907</div>
        <div class="c">Tại: Ngân hàng Công Thương Việt Nam - Cn Đông Sài Gòn</div>
      </div>
      <div>
        <div class="c u b">CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
        <div class="c b">Độc lập - Tự do - Hạnh phúc</div>
        <div class="c f-2">---------oOo---------</div>
        <div class="c"><slot name="ngaylap">Thủ Đức, ngày tháng năm 2020</slot></div>
      </div>
    </div>
  `,
};