import { getCookie } from "./../utils/web.js";
import { any2obj } from "./../utils/dulieu.js";

class Dulieu {
  constructor(csdl) {
    this.csdl = csdl;
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
}

class Chung {
  constructor(csdl) {
    this.csdl = csdl;
  }

  quochuy(dvtc, ngaylap) {
    //markup data
    ngaylap = ngaylap.toString();
    ngaylap = "Thủ Đức, ngày " + ngaylap.slice(-2) + " tháng " + ngaylap.slice(-4, -2) + " năm " + ngaylap.slice(0, -4)
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
}

class Rieng {
  constructor(madot) {
    this.madot = madot;
    this.rptid = 'qtvt_' + madot;
  }

  quochuy(dvtc, ngaylap) {
    //markup data
    ngaylap = ngaylap.toString();
    ngaylap = "Thủ Đức, ngày " + ngaylap.slice(-2) + " tháng " + ngaylap.slice(-4, -2) + " năm " + ngaylap.slice(0, -4)
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
}


function report(data) {
  try {
    postMessage(data);
  } catch (err) {
    console.log(err);
  }
}


//main

var odl = {};


onmessage = (e) => {
  //dprog = {
  //  csdl: {ten:"", sohieu:1}
  //  bang: {ten:'hoso',gom:2020,xoa=uuid, sua={ mahoso: '', ngaylendot: '' } ,
  //         suanhom: [{ mahoso: '', ngaylendot: '' }],
  //  }
  //};
  const dulieu = any2obj(e.data);
  let i, j, k, s;
  //thuc hien cac dieu kien
  switch (expr) {
    case 'Oranges':
      console.log('Oranges are $0.59 a pound.');
      break;
    case 'Mangoes':
    case 'Papayas':
      console.log('Mangoes and papayas are $2.79 a pound.');
      // expected output: "Mangoes and papayas are $2.79 a pound."
      break;
    default:
      console.log(`Sorry, we are out of ${expr}.`);
  }
};