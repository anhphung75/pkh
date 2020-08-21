export default {
  data() {
    return {
      css: {
        grid: "auto-flow minmax(1rem, max-content)/max-content 1fr max-content minmax(max-content,20pt)",
      },
    }
  },
  template: `
    <div class="grid" :style="css">
      <div class="c u fb f5" style="grid-area:1/1/2/5;">
        <slot name="tieude">BẢNG QUYẾT TOÁN GẮN MỚI ĐỒNG HỒ NƯỚC</slot>
      </div>
      <div class="l">Khách hàng: </div>
      <div class="l u fb f2"><slot name="khachhang">Phạm Thị Lan</slot></div>
      <div class="l">Sô hồ sơ: </div>
      <div class="l u fb f2"><slot name="sohoso">GM05937/19</slot></div>
      <div class="l">Địa chỉ: </div>
      <div class="l u fb f2"><slot name="diachigandhn">Phạm Thị Lan</slot></div>
      <div class="l">Sô đợt: </div>
      <div class="l u fb f2"><slot name="sodot">302/2020MP</slot></div>
    </div>
  `,
};