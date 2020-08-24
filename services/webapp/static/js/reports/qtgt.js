var None=null;
function quochuy(tendvtc=None) {
  let tpl = `
  <div class="grid" :style="css">
    <div>
      <div class="c u b">CÔNG TY CỔ PHẦN CẤP NƯỚC THỦ ĐỨC</div>
      <div class="c b">` + tendvtc + `</div>
      <div class="c f-2">---------oOo---------</div>
      <div class="c">Số tài khoản: 102010000183907</div>
      <div class="c">Tại: Ngân hàng Công Thương Việt Nam - Cn Đông Sài Gòn</div>
    </div>
    <div>
      <div class="c u b">CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
      <div class="c b">Độc lập - Tự do - Hạnh phúc</div>
      <div class="c f-2">---------oOo---------</div>
      <div class="c">` + ngaylap +` <slot name="ngaylap">Thủ Đức, ngày tháng năm 2020</slot></div>
    </div>
  </div>
`,
  return tpl;
};
function tieude() {
  let tpl = `
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
`
  return tpl;
};

function kyduyet() {


};


function qtgt(maqt = null) {
  //trang dau
  let zone = `
    <div class="A4doc">
      <div class="trangin ba" id="trang1:` + maqt + `">

      </div>
    </div>
    `
};