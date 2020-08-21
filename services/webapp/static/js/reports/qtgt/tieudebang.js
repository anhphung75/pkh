export default {
  data() {
    return {
      css: {
        grid: "auto-flow minmax(1rem, max-content) / 151fr 30fr 45fr 60fr 40fr 40fr 63fr 63fr 63fr",
      },
    }
  },
  template: `
    <div class="grid" :style="css">
      <div class="c fb btl" style="grid-area:1/1/3/2;margin-top:'8pt';">Mô tả công tác</div>
      <div class="c fb btl" style="grid-area:1/2/3/3;margin-top:'8pt';">ĐVT</div>
      <div class="c fb btl" style="grid-area:1/3/3/4;margin-top:'8pt';">Số lượng</div>
      <div class="c fb btl" style="grid-area:1/4/2/7;">Đơn giá</div>
      <div class="c fb btrl" style="grid-area:1/7/2/10;">Thành tiền</div>
      <div class="c fb btl" style="grid-area:2/4/3/5;">VL</div>
      <div class="c fb btl" style="grid-area:2/5/3/6;">NC</div>
      <div class="c fb btl" style="grid-area:2/6/3/7;">MTC</div>
      <div class="c fb btl" style="grid-area:2/7/3/8;">VL</div>
      <div class="c fb btl" style="grid-area:2/8/3/9;">NC</div>
      <div class="c fb btrl" style="grid-area:2/9/3/10;">MTC</div>
    </div>
  `,
};