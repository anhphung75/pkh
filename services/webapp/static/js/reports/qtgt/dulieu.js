import { lamtronso } from "../../utils.js";

export default class DulieuQtgt {
  constructor(maqt) {
    this.maqt = maqt;
    this.rptid = 'qtgt_' + maqt;
  }

  quochuy(dvtc, ngaylap) {
    //markup data

    let tpl = `
    <div class="grid quochuy">
      <div>
        <div class="c u b" style="word-spacing: 3pt">CÔNG TY CỔ PHẦN CẤP NƯỚC THỦ ĐỨC</div>
        <div class="c b" style="word-spacing: 3pt">` + dvtc + `</div>
        <div class="c f-2">---------oOo---------</div>
        <div class="c">Số tài khoản: 102010000183907</div>
        <div class="c">Tại: Nh Công Thương Việt Nam - Cn Đông Sài Gòn</div>
      </div>
      <div></div>
      <div>
        <div class="c u b">CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
        <div class="c b">Độc lập - Tự do - Hạnh phúc</div>
        <div class="c f-2">---------oOo---------</div>
        <div class="c ngaylap hov1" contenteditable="true" onblur="suangaylap(this.innerHTML)">` + ngaylap + `</div>
      </div>
    </div>
    `
    return tpl;
  }

  tieude(tieude, sodot, sohoso, khachhang, diachigandhn) {
    //markup data

    let tpl = `
    <div class="grid tieude hov1">
      <div class="c u fb f5 b0 tieudeqtgt" style="grid-area:1/1/2/5" contenteditable="true"
        onblur="suatieude(this.innerHTML)">
        `+ tieude + `
      </div>
    </div>
    <div class="grid tieude hov">
      <div class="l">Khách hàng: </div>
      <div class="l u fb f2">`+ khachhang + `</div>
      <div class="l">Sô hồ sơ: </div>
      <div class="l u fb f2">`+ sohoso + `</div>
    </div>
    <div class="grid tieude hov">
      <div class="l">Địa chỉ: </div>
      <div class="l fb f2">`+ diachigandhn + `</div>
      <div class="l">Sô đợt: </div>
      <div class="l u fb f2">`+ sodot`+</div>
    </div>
    `
    return tpl;
  }

  bang_tieude() {
    let tpl = `
    <div class="grid bang" style="margin-top:6pt">
      <div class="c fb btbl" style="grid-area:1/1/3/2;padding-top:6pt;">Mô tả công tác</div>
      <div class="c fb btbl" style="grid-area:1/2/3/3;padding-top:6pt;">Đvt</div>
      <div class="c fb btbl" style="grid-area:1/3/3/4;padding-top:6pt;">Số lượng</div>
      <div class="c fb btl" style="grid-area:1/4/2/7;">Đơn giá</div>
      <div class="c fb btrl" style="grid-area:1/7/2/10;">Thành tiền</div>
      <div class="c fb btbl" style="grid-area:2/4/3/5;">Vl</div>
      <div class="c fb btbl" style="grid-area:2/5/3/6;">Nc</div>
      <div class="c fb btbl" style="grid-area:2/6/3/7;">Mtc</div>
      <div class="c fb btbl" style="grid-area:2/7/3/8;">Vl</div>
      <div class="c fb btbl" style="grid-area:2/8/3/9;">Nc</div>
      <div class="c fb ba" style="grid-area:2/9/3/10;">Mtc</div>
    </div>
    `
    return tpl;
  }

  bang_tong(zvl = 0, znc = 0, zmtc = 0) {
    //markup data
    zvl = lamtronso(zvl, 0);
    znc = lamtronso(znc, 0);
    zmtc = lamtronso(zmtc, 0);
    let tpl = `
    <div class="grid bang">
      <div class="bl"></div>
      <div class="bl"></div>
      <div class="bl"></div>
      <div class="bl"></div>
      <div class="bl"></div>
      <div class="bl"></div>
      <div class="r fb btl vl hov wb">`+ zvl + `</div>
      <div class="r fb btl nc hov wb">`+ znc + `</div>
      <div class="r fb btrl mtc hov wb">`+ zmtc + `</div>
      {# ket thuc bang chi phi #}
      <div class="bbl"></div>
      <div class="bbl"></div>
      <div class="bbl"></div>
      <div class="bbl"></div>
      <div class="bbl"></div>
      <div class="bbl"></div>
      <div class="c fb bbl vl">(Vl)</div>
      <div class="c fb bbl nc">(Nc)</div>
      <div class="c fb brbl mtc">(Mtc)</div>
    </div>
    `
    return tpl;
  }

  mau() {
    //markup data
    let tpl = `

    `
    return tpl;
  }
}

//use qtgt=new RptQtgt('maqt');
// render_quochuy= qtgt.quochuy(ngaylap,dvtc)