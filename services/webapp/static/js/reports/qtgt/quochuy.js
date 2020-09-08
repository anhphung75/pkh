export default {
  methods: {
    suangaylap(ev) {
      let noidung = ev.innerHTML;
      console.log('noidung vua nhap=', noidung)
    },
  },
  template: `
  <div class="grid quochuy">
  <div>
    <div class="c u b" style="word-spacing: 3pt"><slot name="tencongty">CÔNG TY CỔ PHẦN CẤP NƯỚC THỦ ĐỨC</slot></div>
    <div class="c b" style="word-spacing: 3pt">
    <slot name="dvtc">ĐỘI QLML CẤP NƯỚC QUẬN THỦ ĐỨC</slot>
    </div>
    <div class="c f-2">---------oOo---------</div>
    <div class="c">Số tài khoản: 102010000183907</div>
    <div class="c">Tại: Nh Công Thương Việt Nam - Cn Đông Sài Gòn</div>
  </div>
  <div></div>
  <div>
    <div class="c u b">CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
    <div class="c b">Độc lập - Tự do - Hạnh phúc</div>
    <div class="c f-2">---------oOo---------</div>
    <div class="c ngaylap" contenteditable="true" @onblur="suangaylap">
    <slot name="ngaylap">Thủ Đức, ngày tháng năm 2020</slot>
    </div>
  </div>
</div>
  `,
};