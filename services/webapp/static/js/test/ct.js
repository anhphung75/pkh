import { lamtronso } from "./../utils.js"

d3.formatDefaultLocale({
  decimal: ",",
  thousands: ".",
  grouping: [3],
  currency: ["", "VNĐ"]
});

const fn = {
  a2s: (dl) => {
    try {
      if (dl === undefined || dl === null) {
        return '';
      } else if (dl.constructor === String) {
        return dl.toString();
      }
      else {
        return JSON.stringify(dl);
      }
    } catch (err) { return ''; }
  },
  a2sl: (dl) => {
    return fn.a2s(dl).toLowerCase();
  },
  a2su: (dl) => {
    return fn.a2s(dl).toUpperCase();
  },
  a2i: (dl) => {
    try {
      return dl ? parseInt(dl) : -1;
    } catch (err) { return -1; }
  },
  sregexp: (stim) => {
    stim = fn.a2s(stim);
    if (stim.length < 1) { return stim; }
    let k,
      ltim = [...stim],
      mau = "";
    for (k in ltim) {
      if (
        ["$", "(", ")", "[", ".", "+", "*", "^", "?", "\\"].includes(ltim[k])
      ) {
        mau += "\\" + ltim[k];
      } else {
        mau += ltim[k];
      }
    }
    return mau;
  },
  stomau: (sgoc, stim, mausac = 'red') => {
    try {
      sgoc = fn.a2s(sgoc);
      stim = fn.a2s(stim);
      if (stim.length < 1) { return sgoc; }
    } catch (err) { return sgoc; }
    let mau = fn.sregexp(stim);
    mau = new RegExp(mau, "gi");
    sgoc = sgoc.replace(mau, (m) => {
      if (m === undefined || m === null || m === "") { return; }
      return ["<b style='color:", mausac, "'>", m, "</b>"].join('');
    });
    return sgoc;
  },
};

const sw = {
  url: null,
  nv: {},
  moi: (w = 1) => {
    if (window.Worker) {
      if (!sw.url) { sw.url = d3.select("#qtgt").attr("data-nv"); }
    }
    sw.nv[w] = new Worker(sw.url);
    return sw.nv[w];
  },
  xoa: (w = 1) => {
    if (sw.nv[w]) { sw.nv[w].terminate(); }
    sw.nv[w] = null;
  },
};

var ga = {
  tjan: Date.now(),
  cv: 0, zcv: 1,
  tc: 1, tv: 222,
  cpx: {
    '1': { plcp: 'cpxd', barcode: '', qrcode: '', mota: 'cp1', dvt: 'cai', "dutoan.20190726": { giavl: 100, gianc: 20, giamtc: 5000, giatl: 0 }, },
    '2': { plcp: 'cpxd', barcode: '', qrcode: '', mota: 'cp2', dvt: 'cai', "dutoan.20190726": { giavl: 100, gianc: 20, giamtc: 5000, giatl: 0 }, },
    '3': { plcp: 'cpxd', barcode: '', qrcode: '', mota: 'cp3', dvt: 'cai', "dutoan.20190726": { giavl: 100, gianc: 20, giamtc: 5000, giatl: 0 }, },
  },
  qtgt: {
    idma: 123,
    baogia: 20190726,
    plgia: 'dutoan',
    cpql: 20190726,
    tttt: {
      maid: '2020.GMMP001.HC01.001',
      oc_cpxd: { idma: 123, maid: 'kh001' },
      oc_cpvt: { idma: 123, maid: 'kh001' },
      oc_cpvl: { idma: 123, maid: 'kh001' },
      oc_cptl: { idma: 123, maid: 'kh001' },
      on_cpxd: { idma: 123, maid: 'kh001' },
      on_cpvt: { idma: 123, maid: 'kh001' },
      on_cpvl: { idma: 123, maid: 'kh001' },
      on_cptl: { idma: 123, maid: 'kh001' },
      cpql: { idma: 123, maid: 'kh001' },
    },
  },
  oc_cpxd: [
    { tt: 0, chiphi: 100, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
    { tt: 1, chiphi: 200, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
    { tt: 2, chiphi: 300, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }
  ],

};

const hoso = {
  cv: 0, zcv: 0,
  idma: 123, idmau: 12345,
  tttt: {
    maid: '2021.HS000001',
    khachhang: { idma: 123, maid: '2021.KH000001' },
    dot: { idma: 123, maid: '2020.GMMP001' },
    qtgt: { idma: 123, maid: '2020.GMMP001.HC01.001' },
    khuvuc: { idma: 123, maid: '0202' },
    dvtc: { idma: 123, maid: 'dvtc001' },
  },
  ttdl: {
    khachhang: 'Nguyễn Văn A',
    diachi: "123456 Trần Văn Thời, Kp.3, P.Tăng Nhơn Phú A, Tp.Thủ Đức",
  },
  status: 'ok',
  lastupdate: Date.now()
};

var qtgt = {
  cv: 0, zcv: 1,
  ztg: 777,
  idma: 123,
  mau: { idma: 12345, maid: 12345, gxd: 0 },
  tttt: {
    maid: '2020.GMMP001.HC01.001',
    oc_cpxd: { idma: 123, maid: 'kh001' },
    oc_cpvt: { idma: 123, maid: 'kh001' },
    oc_cpvl: { idma: 123, maid: 'kh001' },
    oc_cptl: { idma: 123, maid: 'kh001' },
    on_cpxd: { idma: 123, maid: 'kh001' },
    on_cpvt: { idma: 123, maid: 'kh001' },
    on_cpvl: { idma: 123, maid: 'kh001' },
    on_cptl: { idma: 123, maid: 'kh001' },
    cpql: { idma: 123, maid: 'kh001' },
  },
  ttdl: {
    baogia: 20200827,
    plgia: 'dutoan',
    sodhn: 1,
    gxd: 0,
    tienkhach: 0,
    tiencty: 0,
    ngaylap: 20210101,
    nguoilap: '',
  },
  //status: 'ok',
  //lastupdate: Date.now()
  mabaogia: () => {
    let plgia = fn.a2sl(qtgt.ttdl.plgia || qtgt.tttt.plgia),
      baogia = fn.a2sl(qtgt.ttdl.baogia || qtgt.tttt.baogia),
      k2 = [plgia, baogia].join('.');
    return k2;
  },
  nap: (cg3 = 0) => {
    let cv, r, i, k, isok, z8, r8, d8, plgia, baogia, cpql;
    try {
      cg3 = fn.a2i(cg3);
      if (cg3 > 3) { return; };
      z8 = qtgt;
      r8 = z8.tttt;
      d8 = z8.ttdl;
      z8.idma = fn.a2i(z8.idma);
      if (qtgt.idma < 1) { return; }
      z8.cv = 0;
      z8.zcv = 1;
      plgia = r8.plgia || d8.plgia || 'dutoan';
      baogia = r8.baogia || d8.baogia;
      cpql = r8.cpql || d8.cpql;
      r8 = {};
      d8 = {};
      r8.baogia = baogia;
      r8.plgia = plgia;
      r8.cpql = cpql;
      idb.nap.qtgt({ prog: 'qtgt', idma: z8.idma });
    } catch (err) {
      cg3 += 1;
      setTimeout(() => { qtgt.nap(cg3); }, qtgt.ztg);
      return;
    }
    console.log("end ct qtgt.nap=", JSON.stringify(qtgt, null, 2));
  },
};


const oc_cpxd = {
  ten: "oc_cpxd",
  cv: 0, zcv: 1,
  ztg: 111,
  tjan: Date.now(),
  idma: 123,
  zs: {
    idma: 123,
    refs: {
      maid: '2020.GMMP001.HC01.001',
    },
    data: [
      { chiphi: 1, soluong: 1 },
      { chiphi: 2, soluong: 2 },
    ],
    info: 'oKtra',
    tjan: Date.now(),
  },
  d8: {

  },
  l8: [
    { tt: 0, chiphi: 100, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
    { tt: 1, chiphi: 200, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
    { tt: 2, chiphi: 300, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }
  ],
  l8_: [
    { tt: 3, chiphi: 0, soluong: 0, mota: '', dvt: '', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 0, tienmtc: 0 }
  ],
  nap: function (cg3 = 0) {
    let i, r,
      z8 = this,
      d8 = z8.d8 || {},
      l8 = z8.l8 || [];
    try {
      console.log('start ct ', z8.ten, '.nap this=', JSON.stringify(z8, null, 2));
      cg3 = fn.a2i(cg3);
      if (cg3 > 3) return;
      z8.idma = fn.a2i(z8.idma);
      if (z8.idma < 0) return;
      if (z8.idma in d8) {
        z8.cv = 1;
        z8.zcv = 1;
        l8 = d8[z8.idma];
      } else {
        z8.cv = 0;
        z8.zcv = 1;
        //set defa soluong=0
        for (i in l8) {
          r = l8[i];
          r.soluong = 0;
          r.tienvl = 0;
          r.tiennc = 0;
          r.tienmtc = 0;
        }
        idb.nap.idma({ prog: z8.ten, idma: z8.idma });
      }
    } catch (err) {
      cg3 += 1;
      setTimeout(() => { z8.nap(cg3); }, z8.ztg);
      return;
    }
    console.log('end ct ', ten, '.nap this=', JSON.stringify(this, null, 2));
  },
  tinh: function (cg3 = 0) {
    let i, r, k, cp, bg,
      cv = 0,
      z8 = this,
      l8 = z8.l8 || [];
    //try {
    cg3 = fn.a2i(cg3);
    if (cg3 > 3) return;
    z8.zcv = l8.length;
    bg = qtgt.mabaogia();
    z8.cv = cg3 === 0 ? 0 : fn.a2i(z8.cv);
    for (i in l8) {
      r = l8[i];
      cp = _cpx.d8[r.chiphi];
      if (!('mota' in r) || !('dvt' in r)) {
        r.barcode = cp.barcode;
        r.qrcode = cp.qrcode;
        r.mota = cp.mota;
        r.dvt = cp.dvt;
      }
      r.soluong = lamtronso(Math.abs(r.soluong), 3);
      k = 'giavl';
      if (!(k in r)) { r[k] = cp[bg][k]; }
      r.tienvl = lamtronso(r.soluong * r[k], 0);
      k = 'gianc';
      if (!(k in r)) { r[k] = cp[bg][k]; }
      r.tiennc = lamtronso(r.soluong * r[k], 0);
      k = 'giamtc';
      if (!(k in r)) { r[k] = cp[bg][k]; }
      r.tienmtc = lamtronso(r.soluong * r[k], 0);
      if ('mota' in r && 'giavl' in r && 'gianc' in r && 'giamtc' in r) { cv++; }
      if (cv > z8.cv) {
        z8.cv = cv;
        k = fn.a2i(100 * (cv / z8.zcv));
        web.tiendo(z8.ten, k);
      }
    }
    if (z8.cv !== z8.zcv) { setTimeout(() => { z8.tinh(1); }, z8.ztg); }
    //} catch (err) {
    //  cg3 += 1;
    //  setTimeout(() => { z8.tinh(cg3); }, z8.ztg);
    //  return;
    //}
    console.log("end ct ", z8.ten, ".tinh=", JSON.stringify(this, null, 2));
    z8.xem(0);
  },
  xem: function (cg3 = 0) {
    let vz, vr, i, r, k, row, tagid,
      z8 = this,
      tag = fn.a2sl(z8.ten),
      l8 = z8.l8 || [];
    //try {
    cg3 = fn.a2i(cg3);
    if (cg3 > 3) return;
    for (i in l8) {
      r = l8[i];
      r.tt = i;
    }
    //main
    tag = tag.charAt(0) == '#' ? tag.substr(1) : tag;
    tagid = '#' + tag;
    vz = d3.select(tagid)
      .style("list-style", "none")
      .style("margin", 0)
      .style("padding", 0)
      .style("max-height", "10.25rem")
      .style("overflow-y", "auto")
      .style("border", "1px solid #d4d4d4");
    vz.selectAll('li').remove();
    row = vz.selectAll("li").data(l8);
    vr = row.exit().remove();
    vr = row.enter().append("li")
      .attr("class", "grid qt3x");
    //tt crud
    vr.append('div')
      .attr("id", (d, i) => [tag, i, '0'].join('__'))
      .attr("class", (d, i) => ['c bb fito', tag, 'r' + i, 'c0'].join(' '))
      .text((d) => d3.format("03d")(parseInt(d.tt) + 1));
    //mota
    vr.append('div')
      .attr("class", "bb")
      .append('textarea')
      .attr("id", (d, i) => [tag, i, '1'].join('__'))
      .attr("class", (d, i) => ['j w100 fito', tag, 'r' + i, 'c1'].join(' '))
      .attr("rows", 1)
      .style("margin", 0)
      .style("padding", "1pt")
      .style("outline", "none")
      .text(d => d.mota)
      .on("input", function (ev, d) {
        let el = ev.target.parentNode,
          stim = ev.target.value;
        d3.select(ev.target).classed("fito", false);
        ev.target.style.height = 'auto';
        ev.target.style.height = [ev.target.scrollHeight, 'px'].join('');
        web.box.chiphi(el, d, stim);
      })
      .on("click", function (ev, d) {
        if (d3.select("#xem").node()) {
          d3.selectAll("#xem").remove();
          d3.select(ev.target).classed("fito", true);
        } else {
          let el = ev.target.parentNode,
            stim = ev.target.value;
          d3.select(ev.target).classed("fito", false);
          web.box.chiphi(el, d, stim);
          ev.target.focus();
          ev.target.select();
        }
      })
      .on("keydown", function (ev, d) {
        if ([13].includes(ev.keyCode)) {
          ev.preventDefault();
          d3.selectAll("#xem").remove();
          //chuyen dong ke tiep
          web.tagid = ev.target.id;
          web.move2id(1, 0);
        }
      });
    vr.append('div')
      .attr("id", (d, i) => [tag, i, '2'].join('__'))
      .attr("class", (d, i) => ['c bb', tag, 'r' + i, 'c2'].join(' '))
      .text((d) => d.dvt);
    vr.append('div')
      .attr("class", "bb")
      .append('textarea')
      .attr("id", (d, i) => [tag, i, '3'].join('__'))
      .attr("class", (d, i) => ['r f0 fito', tag, 'r' + i, 'c3'].join(' '))
      .attr("rows", 1)
      .style("margin", 0)
      .style("padding", "1pt")
      .style("outline", "none")
      .text((d) => d3.format(",.3r")(d.soluong))
      .on("change", (ev, d) => {
        let v = Math.abs(parseFloat(ev.target.value)) || 0;
        if (v > 0) {
          l8[d.tt].soluong = v;
          ev.target.style.height = 'auto';
          ev.target.style.height = [ev.target.scrollHeight, 'px'].join('');
          z8.tinh(1);
        }
      })
      .on("keydown", function (ev, d) {
        if ([13].includes(ev.keyCode)) {
          ev.preventDefault();
          let v = Math.abs(parseFloat(ev.target.value)) || 0;
          if (v > 0) {
            l8[d.tt].soluong = v;
            ev.target.style.height = 'auto';
            ev.target.style.height = [ev.target.scrollHeight, 'px'].join('');
            z8.tinh(1);
          }
          //chuyen dong ke tiep
          web.tagid = ev.target.id;
          web.move2id(1, 0);
        }
      });
    vr.append('div')
      .attr("id", (d, i) => [tag, i, '4'].join('__'))
      .attr("class", (d, i) => ['r bb fito', tag, 'r' + i, 'c4'].join(' '))
      .text((d) => d3.format(",.0r")(d.giavl));
    vr.append('div')
      .attr("id", (d, i) => [tag, i, '5'].join('__'))
      .attr("class", (d, i) => ['r bb fito', tag, 'r' + i, 'c5'].join(' '))
      .text((d) => d3.format(",.0r")(d.gianc));
    vr.append('div')
      .attr("id", (d, i) => [tag, i, '6'].join('__'))
      .attr("class", (d, i) => ['r bb fito', tag, 'r' + i, 'c6'].join(' '))
      .text((d) => d3.format(",.0r")(d.giamtc));
    vr.append('div')
      .attr("id", (d, i) => [tag, i, '7'].join('__'))
      .attr("class", (d, i) => ['r bb fito', tag, 'r' + i, 'c7'].join(' '))
      .text((d) => d3.format(",.0r")(d.tienvl));
    vr.append('div')
      .attr("id", (d, i) => [tag, i, '8'].join('__'))
      .attr("class", (d, i) => ['r bb fito', tag, 'r' + i, 'c8'].join(' '))
      .text((d) => d3.format(",.0r")(d.tiennc));
    vr.append('div')
      .attr("id", (d, i) => [tag, i, '9'].join('__'))
      .attr("class", (d, i) => ['r bb fito', tag, 'r' + i, 'c9'].join(' '))
      .text((d) => d3.format(",.0r")(d.tienmtc));
    //add hov
    k = '[id^=' + tag + ']';
    vr.selectAll(k)
      .on("mouseenter", (ev) => {
        console.log("ev.target=", ev.target);
        web.tagid = ev.target.id;
        web.hov_intag(web.tagid);
      })
      .on("mouseleave", (ev) => {
        web.tagid = ev.target.id;
        web.hov_outtag(web.tagid);
      });
    z8.moi();
    //} catch (err) {
    //  cg3 += 1;
    //  setTimeout(() => { self.xem(cg3); }, self.ztg);
    //  return;
    //}
  },
  moi: function (cg3 = 0) {
    let vz, vr, i, r, k, row, tagid,
      z8 = this,
      tag = fn.a2sl(z8.ten),
      l1 = [{ ...z8.l8[0] }] || [],
      stt = z8.l8.length;
    console.log("start ct ", z8.ten, ".moi=", JSON.stringify(l1, null, 2));
    //try {
    cg3 = fn.a2i(cg3);
    if (cg3 > 3) return;
    for (i in l1) {
      r = l1[i];
      for (k in r) {
        if (r[k].constructor === Number) r[k] = 0;
        if (r[k].constructor === String) r[k] = '';
      }
      r.tt = stt;
    }
    //main
    tag = tag.charAt(0) == '#' ? tag.substr(1) : tag;
    tagid = '#' + tag + '_moi';
    vz = d3.select(tagid)
      .style("list-style", "none")
      .style("margin", 0)
      .style("padding", 0)
      .style("max-height", "10.25rem")
      .style("overflow-y", "auto")
      .style("border", "0px solid #d4d4d4");
    vz.selectAll('li').remove();
    row = vz.selectAll("li").data(l1);
    vr = row.exit().remove();
    vr = row.enter().append("li")
      .attr("class", "grid qt3x");
    //tt crud
    vr.append('div')
      .attr("id", [tag, stt, '0'].join('__'))
      .attr("class", ['c bb fito', tag, 'r' + stt, 'c0'].join(' '))
      .text((d) => d3.format("03d")(parseInt(d.tt) + 1));
    //mota
    vr.append('div')
      .attr("class", "bb")
      .append('textarea')
      .attr("id", [tag, stt, '1'].join('__'))
      .attr("class", ['j w100 fito', tag, 'r' + stt, 'c1'].join(' '))
      .attr("rows", 1)
      .style("margin", 0)
      .style("padding", "1pt")
      .style("outline", "none")
      .text(d => d.mota)
      .on("input", function (ev, d) {
        let el = ev.target.parentNode,
          stim = ev.target.value;
        d3.select(ev.target).classed("fito", false);
        ev.target.style.height = 'auto';
        ev.target.style.height = [ev.target.scrollHeight, 'px'].join('');
        web.box.chiphi(el, d, stim);
      })
      .on("click", function (ev, d) {
        if (d3.select("#xem").node()) {
          d3.selectAll("#xem").remove();
          d3.select(ev.target).classed("fito", true);
        } else {
          let el = ev.target.parentNode,
            stim = ev.target.value;
          d3.select(ev.target).classed("fito", false);
          web.box.chiphi(el, d, stim);
          ev.target.focus();
          ev.target.select();
        }
      })
      .on("keydown", function (ev, d) {
        if ([13].includes(ev.keyCode)) {
          ev.preventDefault();
          d3.selectAll("#xem").remove();
          //chuyen dong ke tiep
          web.tagid = ev.target.id;
          web.move2id(1, 0);
        }
      });
    vr.append('div')
      .attr("id", [tag, stt, '2'].join('__'))
      .attr("class", ['c bb', tag, 'r' + stt, 'c2'].join(' '))
      .text((d) => d.dvt);
    vr.append('div')
      .attr("class", "bb")
      .append('textarea')
      .attr("id", [tag, stt, '3'].join('__'))
      .attr("class", ['r f0 fito', tag, 'r' + stt, 'c3'].join(' '))
      .attr("rows", 1)
      .style("margin", 0)
      .style("padding", "1pt")
      .style("outline", "none")
      .text((d) => d3.format(",.3r")(d.soluong))
      .on("change", (ev, d) => {
        let v = Math.abs(parseFloat(ev.target.value)) || 0;
        if (v > 0) {
          l8[d.tt].soluong = v;
          ev.target.style.height = 'auto';
          ev.target.style.height = [ev.target.scrollHeight, 'px'].join('');
          z8.tinh(1);
        }
      })
      .on("keydown", function (ev, d) {
        if ([13].includes(ev.keyCode)) {
          ev.preventDefault();
          let v = Math.abs(parseFloat(ev.target.value)) || 0;
          if (v > 0) {
            l8[d.tt].soluong = v;
            ev.target.style.height = 'auto';
            ev.target.style.height = [ev.target.scrollHeight, 'px'].join('');
            z8.tinh(1);
          }
          //chuyen dong ke tiep
          web.tagid = ev.target.id;
          web.move2id(1, 0);
        }
      });
    vr.append('div')
      .attr("id", [tag, stt, '4'].join('__'))
      .attr("class", ['r bb fito', tag, 'r' + stt, 'c4'].join(' '))
      .text((d) => d3.format(",.0r")(d.giavl));
    vr.append('div')
      .attr("id", [tag, stt, '5'].join('__'))
      .attr("class", ['r bb fito', tag, 'r' + stt, 'c5'].join(' '))
      .text((d) => d3.format(",.0r")(d.gianc));
    vr.append('div')
      .attr("id", [tag, stt, '6'].join('__'))
      .attr("class", ['r bb fito', tag, 'r' + stt, 'c6'].join(' '))
      .text((d) => d3.format(",.0r")(d.giamtc));
    vr.append('div')
      .attr("id", [tag, stt, '7'].join('__'))
      .attr("class", ['r bb fito', tag, 'r' + stt, 'c7'].join(' '))
      .text((d) => d3.format(",.0r")(d.tienvl));
    vr.append('div')
      .attr("id", [tag, stt, '8'].join('__'))
      .attr("class", ['r bb fito', tag, 'r' + stt, 'c8'].join(' '))
      .text((d) => d3.format(",.0r")(d.tiennc));
    vr.append('div')
      .attr("id", [tag, stt, '9'].join('__'))
      .attr("class", ['r bb fito', tag, 'r' + stt, 'c9'].join(' '))
      .text((d) => d3.format(",.0r")(d.tienmtc));
    //add hov
    k = '[id^=' + tag + ']';
    vr.selectAll(k)
      .on("mouseenter", (ev) => {
        console.log("ev.target=", ev.target);
        web.tagid = ev.target.id;
        web.hov_intag(web.tagid);
      })
      .on("mouseleave", (ev) => {
        web.tagid = ev.target.id;
        web.hov_outtag(web.tagid);
      });
    //} catch (err) {
    //  cg3 += 1;
    //  setTimeout(() => { self.xem(cg3); }, self.ztg);
    //  return;
    //}
  },
};
const oc_cpvt = { ...oc_cpxd };
oc_cpvt.ten = 'oc_cpvt';
const oc_cpvl = {
  cv: 0, zcv: 0,
  idma: 123, idmau: 12345,
  tttt: {
    maid: '2020.GMMP001.HC01.001',
  },
  ttdl: [
    { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
    { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
    { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }
  ],
};
const oc_cptl = {
  cv: 0, zcv: 0,
  idma: 123, idmau: 12345,
  tttt: {
    maid: '2020.GMMP001.HC01.001',
  },
  ttdl: [
    { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
    { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
    { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }
  ],
};
const on_cpxd = {
  cv: 0, zcv: 0,
  idma: 123, idmau: 12345,
  tttt: {
    maid: '2020.GMMP001.HC01.001',
  },
  ttdl: [
    { chiphi: 100, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
    { chiphi: 200, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
    { chiphi: 300, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }
  ],
};
const on_cpvt = {
  cv: 0, zcv: 0,
  idma: 123, idmau: 12345,
  tttt: {
    maid: '2020.GMMP001.HC01.001',
  },
  ttdl: [
    { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
    { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
    { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }
  ],
};
const on_cpvl = {
  cv: 0, zcv: 0,
  idma: 123, idmau: 12345,
  tttt: {
    maid: '2020.GMMP001.HC01.001',
  },
  ttdl: [
    { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
    { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
    { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }
  ],
};
const on_cptl = {
  cv: 0, zcv: 0,
  idma: 123, idmau: 12345,
  tttt: {
    maid: '2020.GMMP001.HC01.001',
  },
  ttdl: [
    { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
    { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
    { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }
  ],
};

const cptl = {
  cv: 0, zcv: 0,
  idma: 123, idmau: 12345,
  tttt: {
    maid: '2020.GMMP001.HC01.001',
  },
  ttdl: [
    { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
    { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
    { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }
  ],
}
//tam for app
const _cpx = {
  ztg: 222,
  cv: 0, zcv: 1,
  d8: {
    '100': {},
    '200': {},
    '300': {},
    '400': {},
    '500': {},
    '1': {},
    '4': {},
    '5': { plcp: 'cpxd', barcode: '', qrcode: '', mota: 'cp1', dvt: 'cai', "dutoan.20190726": { giavl: 100, gianc: 20, giamtc: 5000, giatl: 0 }, },
    '2': { plcp: 'cpxd', barcode: '', qrcode: '', mota: 'cp2', dvt: 'cai', "dutoan.20190726": { giavl: 100, gianc: 20, giamtc: 5000, giatl: 0 }, },
    '3': { plcp: 'cpxd', barcode: '', qrcode: '', mota: 'cp3', dvt: 'cai', "dutoan.20190726": { giavl: 100, gianc: 20, giamtc: 5000, giatl: 0 }, },
  },
  gom: (cg3 = 0) => {
    cg3 = fn.a2i(cg3);
    if (cg3 > 3) { return; };
    let r, i, k, zdl, idma, l8,
      zcv = 0,
      d8 = _cpx.d8,
      plgia = fn.a2sl(qtgt.ttdl.plgia || qtgt.tttt.plgia),
      baogia = fn.a2sl(qtgt.ttdl.baogia || qtgt.tttt.baogia),
      k2 = [plgia, baogia].join('.');
    //ong cai
    l8 = oc_cpxd.ttdl || oc_cpxd.l8 || [];
    zdl = [...l8];
    l8 = oc_cpvt.ttdl || oc_cpvt.l8 || [];
    zdl = [...zdl, ...l8];
    l8 = oc_cpvl.ttdl || oc_cpvl.l8 || [];
    zdl = [...zdl, ...l8];
    l8 = oc_cptl.ttdl || oc_cptl.l8 || [];
    zdl = [...zdl, ...l8];
    //ong nganh
    l8 = on_cpxd.ttdl || on_cpxd.l8 || [];
    zdl = [...l8];
    l8 = on_cpvt.ttdl || on_cpvt.l8 || [];
    zdl = [...zdl, ...l8];
    l8 = on_cpvl.ttdl || on_cpvl.l8 || [];
    zdl = [...zdl, ...l8];
    l8 = on_cptl.ttdl || on_cptl.l8 || [];
    zdl = [...zdl, ...l8];

    if (zdl.length > 0) {
      for (i in zdl) {
        r = zdl[i];
        idma = r.chiphi;
        if (!(idma in d8)) {
          d8[idma] = {};
          d8[idma][k2] = {};
        }
        if (!(k2 in d8[idma])) { d8[idma][k2] = {}; }
      }
    }
    zdl = _cpx;
    for (k in zdl.d8) {
      zcv++;
      if (!(k2 in zdl.d8[k])) { zdl.d8[k][k2] = {}; }
    }
    zdl.zcv = zcv;
    console.log("end ct _cpx.gom=", JSON.stringify(_cpx, null, 2));
  },
  nap: (cg3 = 0) => {
    let cv, r, i, k, isok, z8, d8, plgia, baogia, k2;
    try {
      cg3 = fn.a2i(cg3);
      if (cg3 > 3) { return; };
      _cpx.gom(0);
      if (!_cpx.zcv) { return; }
      z8 = _cpx;
      d8 = _cpx.d8;
      plgia = fn.a2sl(qtgt.ttdl.plgia || qtgt.tttt.plgia);
      baogia = fn.a2sl(qtgt.ttdl.baogia || qtgt.tttt.baogia);
      k2 = [plgia, baogia].join('.');
      z8.cv = fn.a2i(z8.cv);
    } catch (err) {
      cg3 += 1;
      setTimeout(() => { _cpx.nap(cg3); }, _cpx.ztg);
      return;
    }
    cv = 0;
    for (k in d8) {
      r = d8[k];
      isok = true;
      if (!('mota' in r) || !('dvt' in r)) {
        idb.nap.cpx({ "chiphi": k });
        isok = false;
      }
      if (!("giavl" in r[k2])) {
        idb.nap.baogia({ "prog": "bgvl", "chiphi": k, "plgia": plgia, "baogia": baogia });
        isok = false;
      }
      if (!("gianc" in r[k2])) {
        idb.nap.baogia({ "prog": "bgnc", "chiphi": k, "plgia": plgia, "baogia": baogia });
        isok = false;
      }
      if (!("giamtc" in r[k2])) {
        idb.nap.baogia({ "prog": "bgmtc", "chiphi": k, "plgia": plgia, "baogia": baogia });
        isok = false;
      }
      if (!("giatl" in r[k2])) {
        idb.nap.baogia({ "prog": "bgtl", "chiphi": k, "plgia": plgia, "baogia": baogia });
        isok = false;
      }
      if (isok) { cv++; }
      if (cv > z8.cv) {
        z8.cv = cv;
        k = fn.a2i(100 * (cv / z8.zcv));
        web.tiendo("cpx", k);
      }
    }
    if (z8.cv !== z8.zcv) { setTimeout(() => { _cpx.nap(); }, _cpx.ztg); }
    console.log("end ct _cpx.nap=", JSON.stringify(z8, null, 2));
  },
  moi: (cg3 = 0) => {
    let cv, r, i, k, isok, z8, d8, plgia, baogia, k2;
    try {
      cg3 = fn.a2i(cg3);
      if (cg3 > 3) { return; };
      _cpx.gom(0);
      if (!_cpx.zcv) { return; }
      z8 = _cpx;
      d8 = _cpx.d8;
      plgia = fn.a2sl(qtgt.ttdl.plgia || qtgt.tttt.plgia);
      baogia = fn.a2sl(qtgt.ttdl.baogia || qtgt.tttt.baogia);
      k2 = [plgia, baogia].join('.');
      z8.cv = fn.a2i(z8.cv);
    } catch (err) {
      cg3 += 1;
      setTimeout(() => { _cpx.moi(cg3); }, _cpx.ztg);
      return;
    }
    for (k in d8) {
      r = d8[k];
      r[k2] = {};
    }
    _cpx.nap(0);
  },
};

const app_old = {
  url: null,
  ztg: 777,
  cv: 100,
  nam: new Date().getFullYear().toString(),
  hoso: { id: 123, ma: '', },
  khachhang: { id: 1, ma: '', },
  qtgt: { id: 123, ma: '', },
  dvtc: { id: 123, ma: '', },
  plgia: 'dutoan',
  baogia: 20190726,

  macpql: 20200827,

  idma: {
    hoso: 123,
    qtgt: 123,
    dot: 123,
    plgia: 'dutoan',
    baogia: 20190726,
    oc: {
      cpxd: 1,
      cpvt: 1,
      cpvl: 1,
      cptl: 1,
    },
    on: {
      cpxd: 1,
      cpvt: 1,
      cpvl: 1,
      cptl: 1,
    },
    cpql: 20200827,
  },

  macpql: 20200827,
  hoso: {
    d8: {
      dot: 123,
      qtgt: 123,
      khachhang: '',
      diachi: '',
    },
    nap: (cg3 = 0) => {

    },
    luu: (cg3 = 0) => {

    },
  },
  qtgt: {
    idma: 123,
    idmau: 1234,
    d8: {
      maid: '2020.GMMP001.HC01.001',
      oc_cpxd: 1123, oc_cpvl: 123, oc_cpvt,
      on_cpxd: 1123, on_cpvl: 123, on_cpvt,
      cptl: 123, cpql: 20200827,
    },
    nap: (cg3 = 0) => {

    },
    luu: (cg3 = 0) => {

    },
  },

  oc: {
    zvl: 0,
    znc: 0,
    zmtc: 0,
    ztl: 0,
    cpxd: {
      cv: 0, zcv: 0,
      idma: 1615263347491,
      idmau: 1615263347491,
      l8: [
        { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
        { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
        { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }
      ],
      sl0: () => {
        let i, r,
          zdl = app.oc.cpxd.l8 || [];
        if (zdl.length > 0) {
          for (i in zdl) {
            r = zdl[i];
            r.soluong = 0;
            r.tienvl = 0;
            r.tiennc = 0;
            r.tienmtc = 0;
          }
        }
      },
      tinh: (cg3 = 0) => {
        let cv, r, i, k, idma, maid, isok, z8, l8, d8, plgia, baogia, k2, cpx,
          phui = 'oc',
          plcp = 'cpxd';
        //try {
        cg3 = fn.a2i(cg3);
        if (cg3 > 3) { return; };
        z8 = app.oc.cpxd;
        l8 = z8.l8;
        z8.zcv = l8.length;
        if (z8.zcv < 1) { return; }
        z8.cv = fn.a2i(z8.cv);
        d8 = app.cpx.d8;


        //} catch (err) {
        //  cg3 += 1;
        //  setTimeout(() => { app.cpx.nap(cg3); }, 777);
        //  return;
        //}
        console.log("start ct app.oc.cpxd.tinh=", JSON.stringify(l8, null, 2));
        cv = 0;
        for (i in l8) {
          r = l8[i];
          cpx = d8[r.chiphi];
          if (!('mota' in r) || !('dvt' in r)) {
            r.barcode = cpx.barcode;
            r.qrcode = cpx.qrcode;
            r.mota = cpx.mota;
            r.dvt = cpx.dvt;
          }
          r.soluong = lamtronso(Math.abs(r.soluong), 3);
          k = 'giavl';
          if (!(k in r) && k in cpx) {
            r[k] = cpx[k];
            r.tienvl = lamtronso(r.soluong * r.giavl, 0);
          }
          k = 'gianc';
          if (!(k in r) && k in cpx) {
            r[k] = cpx[k];
            r.tiennc = lamtronso(r.soluong * r.gianc, 0);
          }
          k = 'giamtc';
          if (!(k in r) && k in cpx) {
            r[k] = cpx[k];
            r.tienmtc = lamtronso(r.soluong * r.giamtc, 0);
          }
          if ('mota' in r && 'giavl' in r && 'gianc' in r && 'giamtc' in r) { cv++; }
          if (cv > z8.cv) {
            z8.cv = cv;
            k = fn.a2i(100 * (cv / z8.zcv));
            web.tiendo("oc_cpxd", k);
          }
        }
        if (z8.cv !== z8.zcv) { setTimeout(() => { app.oc.cpxd.tinh(); }, app.ztg); }
        console.log("end ct app.oc.cpxd.nap=", JSON.stringify(z8, null, 2));
      },
    },
    cpvt: {
      cv: 0,
      idma: 1615263347491,
      idmau: 1615263347491,
      dscp: [
        { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
        { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
        { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }
      ],
    },
    cpvl: {
      cv: 0,
      idma: 1615263347491,
      idmau: 1615263347491,
      dscp: [
        { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
        { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
        { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }
      ],
    },
    phui: [
      { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', dai: 0.5, rong: 0.5, sau: 1 },
      { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', dai: 0, rong: 0.3, sau: 0.6 },
      { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', dai: 0, rong: 0.3, sau: 0.6 },
    ],
    tinh: () => {
      let self = app.oc;
      self.zvl = 0;
      try {
        self.zvl = self.cpxd.reduce(function (z, rec) { return z + rec.tienvl }, 0);
        self.zvl = self.cpvt.reduce(function (z, rec) { return z + rec.tienvl }, self.zvl);
        self.zvl = self.cpvl.reduce(function (z, rec) { return z + rec.tienvl }, self.zvl);
      } catch (err) { }
      self.znc = 0;
      try {
        self.znc = self.cpxd.reduce(function (z, rec) { return z + rec.tiennc }, 0);
        self.znc = self.cpvt.reduce(function (z, rec) { return z + rec.tiennc }, self.znc);
        self.znc = self.cpvl.reduce(function (z, rec) { return z + rec.tiennc }, self.znc);
      } catch (err) { }
      self.zmtc = 0;
      try {
        self.zmtc = self.cpxd.reduce(function (z, rec) { return z + rec.tienmtc }, 0);
        self.zmtc = self.cpvt.reduce(function (z, rec) { return z + rec.tienmtc }, self.zmtc);
        self.zmtc = self.cpvl.reduce(function (z, rec) { return z + rec.tienmtc }, self.zmtc);
      } catch (err) { }
    },
  },
  on: {
    zvl: 0,
    znc: 0,
    zmtc: 0,
    ztl: 0,
    cpxd: {
      cv: 0,
      idma: 1615263347491,
      idmau: 1615263347491,
      l8: [
        { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
        { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
        { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }
      ],
      sl0: () => {
        let i, r,
          zdl = app.oc.cpxd.l8 || [];
        if (zdl.length > 0) {
          for (i in zdl) {
            r = zdl[i];
            r.soluong = 0;
            r.tienvl = 0;
            r.tiennc = 0;
            r.tienmtc = 0;
          }
        }
      },
      tinh: () => {
        let i, r, _r, k,
          plgia = fn.a2sl(app.plgia),
          baogia = fn.a2i(app.baogia),
          zdl = app.oc.cpxd.l8;
        if (zdl.length > 0) {
          for (i in zdl) {
            r = zdl[i];
            r.chiphi = fn.a2i(r.chiphi);
            r.barcode = r.barcode || r.chiphi;
            r.qrcode = r.qrcode || r.chiphi;
            r.mota = fn.a2s(r.mota);
            r.dvt = fn.a2s(r.dvt);
            r.giavl = 0;
            r.gianc = 0;
            r.giamtc = 0;
            if (r.chiphi in app.cpx) {
              _r = app.cpx[r.chiphi];
              if ('barcode' in _r) { r.barcode = _r.barcode; }
              if ('qrcode' in _r) { r.qrcode = _r.qrcode; }
              r.mota = _r.mota.qtgt || _r.mota;
              r.dvt = _r.dvt;
              k = [plgia, baogia].join('.');
              if (k in _r) {
                r.giavl = _r[k].giavl;
                r.gianc = _r[k].gianc;
                r.giamtc = _r[k].giamtc;
              }
            } else {
              idb.gom.cpx();
            }
            r.soluong = lamtronso(Math.abs(r.soluong), 3);
            r.tienvl = lamtronso(r.soluong * r.giavl, 0);
            r.tiennc = lamtronso(r.soluong * r.gianc, 0);
            r.tienmtc = lamtronso(r.soluong * r.giamtc, 0);
          }
        }
      },
    },
    cpvt: {
      cv: 0,
      idma: 1615263347491,
      idmau: 1615263347491,
      dscp: [
        { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
        { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
        { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }
      ],
    },
    cpvl: {
      cv: 0,
      idma: 1615263347491,
      idmau: 1615263347491,
      dscp: [
        { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
        { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
        { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }
      ],
    },
    phui: [
      { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', dai: 0.5, rong: 0.5, sau: 1 },
      { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', dai: 0, rong: 0.3, sau: 0.6 },
      { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', dai: 0, rong: 0.3, sau: 0.6 },
    ],
    tinh: () => {
      let self = app.oc;
      self.zvl = 0;
      try {
        self.zvl = self.cpxd.reduce(function (z, rec) { return z + rec.tienvl }, 0);
        self.zvl = self.cpvt.reduce(function (z, rec) { return z + rec.tienvl }, self.zvl);
        self.zvl = self.cpvl.reduce(function (z, rec) { return z + rec.tienvl }, self.zvl);
      } catch (err) { }
      self.znc = 0;
      try {
        self.znc = self.cpxd.reduce(function (z, rec) { return z + rec.tiennc }, 0);
        self.znc = self.cpvt.reduce(function (z, rec) { return z + rec.tiennc }, self.znc);
        self.znc = self.cpvl.reduce(function (z, rec) { return z + rec.tiennc }, self.znc);
      } catch (err) { }
      self.zmtc = 0;
      try {
        self.zmtc = self.cpxd.reduce(function (z, rec) { return z + rec.tienmtc }, 0);
        self.zmtc = self.cpvt.reduce(function (z, rec) { return z + rec.tienmtc }, self.zmtc);
        self.zmtc = self.cpvl.reduce(function (z, rec) { return z + rec.tienmtc }, self.zmtc);
      } catch (err) { }
    },
  },
  cpx: {
    cv: 0, zcv: 1,
    d8: {
      '100': {},
      '200': {},
      '300': {},
      '400': {},
      '500': {},
      '1': {},
      '4': {},
      '5': { cv: 0, plcp: 'cpxd', barcode: '', qrcode: '', mota: 'cp1', dvt: 'cai', "dutoan.20190726": { cv: 0, giavl: 100, gianc: 20, giamtc: 5000, giatl: 0 }, },
      '2': { cv: 0, plcp: 'cpxd', barcode: '', qrcode: '', mota: 'cp2', dvt: 'cai', "dutoan.20190726": { cv: 0, giavl: 100, gianc: 20, giamtc: 5000, giatl: 0 }, },
      '3': { cv: 0, plcp: 'cpxd', barcode: '', qrcode: '', mota: 'cp3', dvt: 'cai', "dutoan.20190726": { cv: 0, giavl: 100, gianc: 20, giamtc: 5000, giatl: 0 }, },
    },
    sua: (cg3 = 0) => {
      cg3 = fn.a2i(cg3);
      if (cg3 > 3) { return; };
      let r, i, k, idma,
        zcv = 0,
        d8 = app.cpx.d8,
        k2 = [app.plgia, app.baogia].join('.'),
        zdl = app.oc.cpxd.l8 || [];
      if (zdl.length > 0) {
        for (i in zdl) {
          r = zdl[i];
          idma = r.chiphi;
          if (!(idma in d8)) {
            d8[idma] = {};
            d8[idma][k2] = {};
          }
          if (!(k2 in d8[idma])) { d8[idma][k2] = {}; }
        }
      }
      zdl = app.oc.cpvt.l8 || [];
      if (zdl.length > 0) {
        for (i in zdl) {
          r = zdl[i];
          idma = r.chiphi;
          if (!(idma in d8)) {
            d8[idma] = {};
            d8[idma][k2] = {};
          }
          if (!(k2 in d8[idma])) { d8[idma][k2] = {}; }
        }
      }
      zdl = app.oc.cpvl.l8 || [];
      if (zdl.length > 0) {
        for (i in zdl) {
          r = zdl[i];
          idma = r.chiphi;
          if (!(idma in d8)) {
            d8[idma] = {};
            d8[idma][k2] = {};
          }
          if (!(k2 in d8[idma])) { d8[idma][k2] = {}; }
        }
      }
      zdl = app.on.cpxd.l8 || [];
      if (zdl.length > 0) {
        for (i in zdl) {
          r = zdl[i];
          idma = r.chiphi;
          if (!(idma in d8)) {
            d8[idma] = {};
            d8[idma][k2] = {};
          }
          if (!(k2 in d8[idma])) { d8[idma][k2] = {}; }
        }
      }
      zdl = app.on.cpvt.l8 || [];
      if (zdl.length > 0) {
        for (i in zdl) {
          r = zdl[i];
          idma = r.chiphi;
          if (!(idma in d8)) {
            d8[idma] = {};
            d8[idma][k2] = {};
          }
          if (!(k2 in d8[idma])) { d8[idma][k2] = {}; }
        }
      }
      zdl = app.on.cpvl.l8 || [];
      if (zdl.length > 0) {
        for (i in zdl) {
          r = zdl[i];
          idma = r.chiphi;
          if (!(idma in d8)) {
            d8[idma] = {};
            d8[idma][k2] = {};
          }
          if (!(k2 in d8[idma])) { d8[idma][k2] = {}; }
        }
      }
      zdl = app.cpx;
      for (k in zdl.d8) {
        zcv++;
        if (!(k2 in zdl.d8[k])) { zdl.d8[k][k2] = {}; }
      }
      zdl.zcv = zcv;
      console.log("end ct app.cpx.sua=", JSON.stringify(app.cpx.d8, null, 2));
    },
    nap: (cg3 = 0) => {
      let cv, r, i, k, idma, maid, isok, z8, d8, plgia, baogia, k2;
      //try {
      cg3 = fn.a2i(cg3);
      if (cg3 > 3) { return; };
      app.cpx.sua(0);
      z8 = app.cpx;
      d8 = app.cpx.d8;
      plgia = fn.a2sl(app.plgia);
      baogia = fn.a2i(app.baogia);
      k2 = [plgia, baogia].join('.');
      z8.cv = fn.a2i(z8.cv);
      //} catch (err) {
      //  cg3 += 1;
      //  setTimeout(() => { app.cpx.nap(cg3); }, 777);
      //  return;
      //}
      console.log("start ct app.nap.cpx=", JSON.stringify(z8, null, 2));
      cv = 0;
      for (k in d8) {
        r = d8[k];
        isok = true;
        if (!('mota' in r) || !('dvt' in r)) {
          idb.nap.cpx({ "chiphi": k });
          isok = false;
        }
        if (!("giavl" in r[k2])) {
          idb.nap.baogia({ "prog": "bgvl", "chiphi": k, "plgia": plgia, "baogia": baogia });
          isok = false;
        }
        if (!("gianc" in r[k2])) {
          idb.nap.baogia({ "prog": "bgnc", "chiphi": k, "plgia": plgia, "baogia": baogia });
          isok = false;
        }
        if (!("giamtc" in r[k2])) {
          idb.nap.baogia({ "prog": "bgmtc", "chiphi": k, "plgia": plgia, "baogia": baogia });
          isok = false;
        }
        if (!("giatl" in r[k2])) {
          idb.nap.baogia({ "prog": "bgtl", "chiphi": k, "plgia": plgia, "baogia": baogia });
          isok = false;
        }
        if (isok) { cv++; }
        if (cv > z8.cv) {
          z8.cv = cv;
          k = fn.a2i(100 * (cv / z8.zcv));
          web.tiendo("cpx", k);
        }
      }
      if (z8.cv !== z8.zcv) { setTimeout(() => { app.cpx.nap(); }, app.ztg); }
      console.log("end ct app.nap.cpx=", JSON.stringify(z8, null, 2));
    },
  },
};

const web = {
  tagid: '',
  hov: { mau1: "yellow", mau2: "#9999ff" },
  tao: () => {
    //web.otim.nam();
    //web.otim.plqt();
    //web.otim.dvtc();
    //web.otim.dot();
    //web.otim.hoso();
    web.oc.cpxd();
    //web.oc.cpvt();
    //web.oc.cpvl();
    //web.oc.bth();
    //web.on.cpxd();
    //web.on_cpvt();
    //web.on_cpvl();
    //web.ongnganh();
    //web.tlmd.cptl();
    //web.tlmd.bth();
  },

  otim: {
    nam: () => {
      let zone, inp, box,
        zdl = ga.nam,
        v0 = zdl[app.nam].show;
      if (zdl.constructor !== Object) { return; }
      zone = d3.select("#app_nam")
        .classed('l w100', true)
        .text(v0)
        .on("click", (ev) => tao_chon(ev.target));
      if (d3.select("#nap").node()) { d3.selectAll("#nap").remove(); }
      if (d3.select("#xem").node()) { d3.selectAll("#xem").remove(); }

      function tao_chon(el) {
        console.log("tao_chon");
        zone = d3.select(el)
          .classed('l w100', true)
          .text(null)
        inp = zone.append("input")
          .attr("id", "nap")
          .classed('l w100', true)
          .attr("type", "search")
          .attr("value", v0)
          .style("height", "1rem")
          .style("padding-left", "3px")
          .on("click", (ev) => {
            if (d3.select("#xem").node()) {
              web.otim.nam();
            } else {
              xem_chon(ev.target.parentNode);
              ev.target.focus();
              ev.target.select();
            }
          });
        inp.node().dispatchEvent(new MouseEvent("click"));
      }

      function xem_chon(el) {
        let k, r, rec,
          dulieu = [zdl.tieude];
        for (k in zdl) {
          if (k !== 'tieude') {
            r = zdl[k];
            r.id = k;
            dulieu.push(r);
          }
        }
        d3.selectAll("#xem").remove();
        box = d3.select(el).append("ol")
          .attr("id", "xem")
          .attr("class", "l")
          .style("background-color", "white")
          .style("z-index", 99)
          .style("max-height", "10.25rem")
          .style("overflow-x", "auto")
          .style("border", "1px solid #d4d4d4")
          .style("list-style", "none");
        //noidung
        rec = box.selectAll("li").data(dulieu)
          .enter()
          .append("li")
          .attr("id", (d, i) => ['nam', i, 0].join('__'))
          .attr("class", 'l')
          .style("display", "grid")
          .style("grid", "auto-flow minmax(1rem, max-content) / minmax(max-content,1fr) minmax(max-content,4fr)")
          .on("mouseover", (ev) => {
            ev.target.style.backgroundColor = web.hov.mau2;
            console.log("li=", ev.target);
          })
          .on("mouseout", (ev) => {
            ev.target.style.backgroundColor = "white";
          })
          .on("click", (ev, d) => {
            if (d.id !== 'tieude') {
              app.nam = d.id;
              web.otim.nam();
            }
          });
        rec.append("div")
          .attr("id", (d, i) => ['nam', i, 1].join('__'))
          .attr("class", (d, i) => {
            if (i == 0) {
              return ['c u fb nam r', i, ' c1'].join('');
            } else {
              return ['l fb nam r', i, ' c1'].join('');
            }
          })
          .text(d => d.show);
        rec.append("div")
          .attr("id", (d, i) => ['nam', i, 2].join('__'))
          .attr("class", (d, i) => {
            if (i == 0) {
              return ['c u fb nam r', i, ' c2'].join('');
            } else {
              return ['l bl nam r', i, ' c2'].join('');
            }
          })
          .text(d => d.mota);
      };
    },
    plqt: () => {
      let zone, inp, box,
        zdl = ga.plqt,
        v0 = zdl[app.plqt].show;
      if (zdl.constructor !== Object) { return; }
      zone = d3.select("#app_plqt")
        .classed('l w100', true)
        .text(v0)
        .on("click", (ev) => tao_chon(ev.target));
      if (d3.select("#nap").node()) { d3.selectAll("#nap").remove(); }
      if (d3.select("#xem").node()) { d3.selectAll("#xem").remove(); }

      function tao_chon(el) {
        console.log("tao_chon");
        zone = d3.select(el)
          .classed('l w100', true)
          .text(null)
        inp = zone.append("input")
          .attr("id", "nap")
          .classed('l w100', true)
          .attr("type", "search")
          .attr("value", v0)
          .style("height", "1rem")
          .style("padding-left", "3px")
          .on("click", (ev) => {
            if (d3.select("#xem").node()) {
              web.otim.plqt();
            } else {
              xem_chon(ev.target.parentNode);
              ev.target.focus();
              ev.target.select();
            }
          });
        inp.node().dispatchEvent(new MouseEvent("click"));
      }

      function xem_chon(el) {
        let k, r, rec,
          dulieu = [zdl.tieude];
        for (k in zdl) {
          if (k !== 'tieude') {
            r = zdl[k];
            r.id = k;
            dulieu.push(r);
          }
        }
        d3.selectAll("#xem").remove();
        box = d3.select(el).append("ol")
          .attr("id", "xem")
          .attr("class", "l")
          .style("background-color", "white")
          .style("z-index", 99)
          .style("max-height", "10.25rem")
          .style("overflow-x", "auto")
          .style("border", "1px solid #d4d4d4")
          .style("list-style", "none");
        //noidung
        rec = box.selectAll("li").data(dulieu)
          .enter()
          .append("li")
          .attr("id", (d, i) => ['plqt', i, 0].join('__'))
          .attr("class", 'l')
          .style("display", "grid")
          .style("grid", "auto-flow minmax(1rem, max-content) / minmax(max-content,1fr) minmax(max-content,4fr)")
          .on("mouseover", (ev) => {
            ev.target.style.backgroundColor = web.hov.mau2;
            console.log("li=", ev.target);
          })
          .on("mouseout", (ev) => {
            ev.target.style.backgroundColor = "white";
          })
          .on("click", (ev, d) => {
            if (d.id !== 'tieude') {
              app.plqt = d.id;
              web.otim.plqt();
            }
          });
        rec.append("div")
          .attr("id", (d, i) => ['plqt', i, 1].join('__'))
          .attr("class", (d, i) => {
            if (i == 0) {
              return ['c u fb plqt r', i, ' c1'].join('');
            } else {
              return ['l fb plqt r', i, ' c1'].join('');
            }
          })
          .text(d => d.show);
        rec.append("div")
          .attr("id", (d, i) => ['plqt', i, 2].join('__'))
          .attr("class", (d, i) => {
            if (i == 0) {
              return ['c u fb plqt r', i, ' c2'].join('');
            } else {
              return ['l bl plqt r', i, ' c2'].join('');
            }
          })
          .text(d => d.mota);
      };
    },
    dvtc: () => {
      let zone, inp, box,
        zdl = ga.dvtc,
        v0 = zdl[app.dvtc].show;
      if (zdl.constructor !== Object) { return; }
      zone = d3.select("#app_dvtc")
        .classed('l w100', true)
        .text(v0)
        .on("click", (ev) => tao_chon(ev.target));
      if (d3.select("#nap").node()) { d3.selectAll("#nap").remove(); }
      if (d3.select("#xem").node()) { d3.selectAll("#xem").remove(); }

      function tao_chon(el) {
        console.log("tao_chon");
        zone = d3.select(el)
          .classed('l w100', true)
          .text(null)
        inp = zone.append("input")
          .attr("id", "nap")
          .classed('l w100', true)
          .attr("type", "search")
          .attr("value", v0)
          .style("height", "1rem")
          .style("padding-left", "3px")
          .on("click", (ev) => {
            if (d3.select("#xem").node()) {
              web.otim.dvtc();
            } else {
              xem_chon(ev.target.parentNode);
              ev.target.focus();
              ev.target.select();
            }
          });
        inp.node().dispatchEvent(new MouseEvent("click"));
      }

      function xem_chon(el) {
        let k, r, rec,
          dulieu = [zdl.tieude];
        for (k in zdl) {
          if (k !== 'tieude') {
            r = zdl[k];
            r.id = k;
            dulieu.push(r);
          }
        }
        d3.selectAll("#xem").remove();
        box = d3.select(el).append("ol")
          .attr("id", "xem")
          .attr("class", "l")
          .style("background-color", "white")
          .style("z-index", 99)
          .style("max-height", "10.25rem")
          .style("overflow-x", "auto")
          .style("border", "1px solid #d4d4d4")
          .style("list-style", "none");
        //noidung
        rec = box.selectAll("li").data(dulieu)
          .enter()
          .append("li")
          .attr("id", (d, i) => ['dvtc', i, 0].join('__'))
          .attr("class", 'l')
          .style("display", "grid")
          .style("grid", "auto-flow minmax(1rem, max-content) / minmax(max-content,1fr) minmax(max-content,4fr)")
          .on("mouseover", (ev) => {
            ev.target.style.backgroundColor = web.hov.mau2;
            console.log("li=", ev.target);
          })
          .on("mouseout", (ev) => {
            ev.target.style.backgroundColor = "white";
          })
          .on("click", (ev, d) => {
            if (d.id !== 'tieude') {
              app.dvtc = d.id;
              web.otim.dvtc();
            }
          });
        rec.append("div")
          .attr("id", (d, i) => ['dvtc', i, 1].join('__'))
          .attr("class", (d, i) => {
            if (i == 0) {
              return ['c u fb dvtc r', i, ' c1'].join('');
            } else {
              return ['l fb dvtc r', i, ' c1'].join('');
            }
          })
          .text(d => d.show);
        rec.append("div")
          .attr("id", (d, i) => ['dvtc', i, 2].join('__'))
          .attr("class", (d, i) => {
            if (i == 0) {
              return ['c u fb dvtc r', i, ' c2'].join('');
            } else {
              return ['l bl dvtc r', i, ' c2'].join('');
            }
          })
          .text(d => d.mota);
      };
    },
    dot: () => {
      let zone, inp, box,
        zdl = ga.dot,
        v0 = zdl[app.dot].show;
      if (zdl.constructor !== Object) { return; }
      zone = d3.select("#app_dot")
        .classed('l w100', true)
        .text(v0)
        .on("click", (ev) => tao_chon(ev.target));
      if (d3.select("#nap").node()) { d3.selectAll("#nap").remove(); }
      if (d3.select("#xem").node()) { d3.selectAll("#xem").remove(); }

      function tao_chon(el) {
        console.log("tao_chon");
        zone = d3.select(el)
          .classed('l w100', true)
          .text(null)
        inp = zone.append("input")
          .attr("id", "nap")
          .classed('l w100', true)
          .attr("type", "search")
          .attr("value", v0)
          .style("height", "1rem")
          .style("padding-left", "3px")
          .on("click", (ev) => {
            if (d3.select("#xem").node()) {
              web.otim.dot();
            } else {
              xem_chon(ev.target.parentNode);
              ev.target.focus();
              ev.target.select();
            }
          });
        inp.node().dispatchEvent(new MouseEvent("click"));
      }

      function xem_chon(el) {
        let k, r, rec,
          dulieu = [zdl.tieude];
        for (k in zdl) {
          if (k !== 'tieude') {
            r = zdl[k];
            r.id = k;
            dulieu.push(r);
          }
        }
        d3.selectAll("#xem").remove();
        box = d3.select(el).append("ol")
          .attr("id", "xem")
          .attr("class", "l")
          .style("background-color", "white")
          .style("z-index", 99)
          .style("max-height", "10.25rem")
          .style("overflow-x", "auto")
          .style("border", "1px solid #d4d4d4")
          .style("list-style", "none");
        //noidung
        rec = box.selectAll("li").data(dulieu)
          .enter()
          .append("li")
          .attr("id", (d, i) => ['dot', i, 0].join('__'))
          .attr("class", 'l')
          .style("display", "grid")
          .style("grid", "auto-flow minmax(1rem, max-content) / minmax(max-content,1fr) minmax(max-content,4fr)")
          .on("mouseover", (ev) => {
            ev.target.style.backgroundColor = web.hov.mau2;
            console.log("li=", ev.target);
          })
          .on("mouseout", (ev) => {
            ev.target.style.backgroundColor = "white";
          })
          .on("click", (ev, d) => {
            if (d.id !== 'tieude') {
              app.dot = d.id;
              web.otim.dot();
            }
          });
        rec.append("div")
          .attr("id", (d, i) => ['dot', i, 1].join('__'))
          .attr("class", (d, i) => {
            if (i == 0) {
              return ['c u fb dot r', i, ' c1'].join('');
            } else {
              return ['l fb dot r', i, ' c1'].join('');
            }
          })
          .text(d => d.show);
        rec.append("div")
          .attr("id", (d, i) => ['dot', i, 2].join('__'))
          .attr("class", (d, i) => {
            if (i == 0) {
              return ['c u fb dot r', i, ' c2'].join('');
            } else {
              return ['l bl dot r', i, ' c2'].join('');
            }
          })
          .text(d => d.mota);
      };
    },
    hoso: () => {
      let zone, inp, box,
        zdl = ga.hoso,
        v0 = zdl[app.hoso].show;
      if (zdl.constructor !== Object) { return; }
      zone = d3.select("#app_hoso")
        .classed('l w100', true)
        .text(v0)
        .on("click", (ev) => tao_chon(ev.target));
      if (d3.select("#nap").node()) { d3.selectAll("#nap").remove(); }
      if (d3.select("#xem").node()) { d3.selectAll("#xem").remove(); }

      function tao_chon(el) {
        console.log("tao_chon");
        zone = d3.select(el)
          .classed('l w100', true)
          .text(null)
        inp = zone.append("input")
          .attr("id", "nap")
          .classed('l w100', true)
          .attr("type", "search")
          .attr("value", v0)
          .style("height", "1rem")
          .style("padding-left", "3px")
          .on("click", (ev) => {
            if (d3.select("#xem").node()) {
              web.otim.hoso();
            } else {
              xem_chon(ev.target.parentNode);
              ev.target.focus();
              ev.target.select();
            }
          });
        inp.node().dispatchEvent(new MouseEvent("click"));
      }

      function xem_chon(el) {
        let k, r, rec,
          dulieu = [zdl.tieude];
        for (k in zdl) {
          if (k !== 'tieude') {
            r = zdl[k];
            r.id = k;
            dulieu.push(r);
          }
        }
        d3.selectAll("#xem").remove();
        box = d3.select(el).append("ol")
          .attr("id", "xem")
          .attr("class", "l")
          .style("background-color", "white")
          .style("z-index", 99)
          .style("max-height", "10.25rem")
          .style("overflow-x", "auto")
          .style("border", "1px solid #d4d4d4")
          .style("list-style", "none");
        //noidung
        rec = box.selectAll("li").data(dulieu)
          .enter()
          .append("li")
          .attr("id", (d, i) => ['hoso', i, 0].join('__'))
          .attr("class", 'l')
          .style("display", "grid")
          .style("grid", "auto-flow minmax(1rem, max-content) / minmax(max-content,1fr) minmax(max-content,4fr)")
          .on("mouseover", (ev) => {
            ev.target.style.backgroundColor = web.hov.mau2;
            console.log("li=", ev.target);
          })
          .on("mouseout", (ev) => {
            ev.target.style.backgroundColor = "white";
          })
          .on("click", (ev, d) => {
            if (d.id !== 'tieude') {
              app.hoso = d.id;
              web.otim.hoso();
            }
          });
        rec.append("div")
          .attr("id", (d, i) => ['hoso', i, 1].join('__'))
          .attr("class", (d, i) => {
            if (i == 0) {
              return ['c u fb hoso r', i, ' c1'].join('');
            } else {
              return ['l fb hoso r', i, ' c1'].join('');
            }
          })
          .text(d => d.show);
        rec.append("div")
          .attr("id", (d, i) => ['hoso', i, 2].join('__'))
          .attr("class", (d, i) => {
            if (i == 0) {
              return ['c u fb hoso r', i, ' c2'].join('');
            } else {
              return ['l bl hoso r', i, ' c2'].join('');
            }
          })
          .text(d => d.mota);
      };
    },
  },
  oc: {
    tieude: () => {
      d3.select("#oc_cpxd_tieude")
        .style("list-style", "none")
        .style("background-color", "transparent")
        .style("margin", 0)
        .style("padding", 0)
        .style("display", "grid")
        .style("grid", "auto-flow minmax(1rem, max-content) / 30fr 185fr 30fr 40fr 50fr 40fr 40fr 50fr 45fr 45fr");
      d3.select("#oc_cpvt_tieude")
        .style("list-style", "none")
        .style("background-color", "transparent")
        .style("margin", 0)
        .style("padding", 0)
        .style("display", "grid")
        .style("grid", "auto-flow minmax(1rem, max-content) / 30fr 185fr 30fr 40fr 50fr 40fr 40fr 50fr 45fr 45fr");
      d3.select("#oc_cpvl_tieude")
        .style("list-style", "none")
        .style("background-color", "transparent")
        .style("margin", 0)
        .style("padding", 0)
        .style("display", "grid")
        .style("grid", "auto-flow minmax(1rem, max-content) / 30fr 185fr 30fr 40fr 50fr 40fr 40fr 50fr 45fr 45fr");
    },
    cpxd: (l8 = oc_cpxd.ttdl) => {
      let zone, i, r, row, o, dl,
        dulieu = [];
      if (l8 === undefined || l8 === null || l8.constructor !== Array) {
        return;
      }
      for (i in l8) {
        r = l8[i];
        r.tt = i;
      }
      console.log("web.oc.cpxd oc_cpxd=", JSON.stringify(oc_cpxd, null, 2));
      //main
      zone = d3.select("#oc_cpxd")
        .style("list-style", "none")
        .style("margin", 0)
        .style("padding", 0)
        .style("max-height", "10.25rem")
        .style("overflow-y", "auto")
        .style("border", "1px solid #d4d4d4");
      zone.selectAll('li').remove();
      row = zone.selectAll("li").data(l8).enter().append("li")
        .attr("class", "grid qt3x");

      row.append('div')
        .attr("id", (d, i) => ['oc_cpxd', i, '0'].join('__'))
        .attr("class", (d, i) => ['c bb fito oc_cpxd r', i, ' c0'].join(''))
        .text((d) => d3.format("03d")(parseInt(d.tt) + 1))
        .on("mouseenter", (ev) => {
          web.tagid = ev.target.id;
          web.hov_intag(web.tagid);
        })
        .on("mouseleave", (ev) => {
          web.tagid = ev.target.id;
          web.hov_outtag(web.tagid);
        });
      row.append('div')
        .attr("class", "bb")
        .append('textarea')
        .attr("id", (d, i) => ['oc_cpxd', i, '1'].join('__'))
        .attr("class", (d, i) => ['j w100 fito oc_cpxd r', i, ' c1'].join(''))
        .attr("rows", 1)
        .style("margin", 0)
        .style("padding", "1pt")
        .style("outline", "none")
        .text(d => d.mota)
        .on("mouseenter", (ev) => {
          web.tagid = ev.target.id;
          web.hov_intag(web.tagid);
        })
        .on("mouseleave", (ev) => {
          web.tagid = ev.target.id;
          web.hov_outtag(web.tagid);
        })
        .on("input", function (ev, d) {
          let el = ev.target.parentNode,
            stim = ev.target.value;
          d3.select(ev.target).classed("fito", false);
          ev.target.style.height = 'auto';
          ev.target.style.height = [ev.target.scrollHeight, 'px'].join('');
          web.box.chiphi(el, d, stim);
        })
        .on("click", function (ev, d) {
          if (d3.select("#xem").node()) {
            d3.selectAll("#xem").remove();
            d3.select(ev.target).classed("fito", true);
          } else {
            let el = ev.target.parentNode,
              stim = ev.target.value;
            d3.select(ev.target).classed("fito", false);
            web.box.chiphi(el, d, stim);
            ev.target.focus();
            ev.target.select();
          }
        })
        .on("keydown", function (ev, d) {
          if ([13].includes(ev.keyCode)) {
            ev.preventDefault();
            d3.selectAll("#xem").remove();
            //chuyen dong ke tiep
            web.tagid = ev.target.id;
            web.move2id(1, 0);
          }
        });
      row.append('div')
        .attr("id", (d, i) => ['oc_cpxd', i, '2'].join('__'))
        .attr("class", (d, i) => ['c bb oc_cpxd r', i, ' c2'].join(''))
        .text((d) => d.dvt)
        .on("mouseenter", (ev) => {
          web.tagid = ev.target.id;
          web.hov_intag(web.tagid);
        })
        .on("mouseleave", (ev) => {
          web.tagid = ev.target.id;
          web.hov_outtag(web.tagid);
        });
      row.append('div')
        .attr("class", "bb")
        .append('textarea')
        .attr("id", (d, i) => ['oc_cpxd', i, '3'].join('__'))
        .attr("class", (d, i) => ['r f0 fito oc_cpxd r', i, ' c3'].join(''))
        .attr("rows", 1)
        .style("margin", 0)
        .style("padding", "1pt")
        .style("outline", "none")
        .text((d) => d3.format(",.3r")(d.soluong))
        .on("mouseenter", (ev) => {
          web.tagid = ev.target.id;
          web.hov_intag(web.tagid);
        })
        .on("mouseleave", (ev) => {
          web.tagid = ev.target.id;
          web.hov_outtag(web.tagid);
        })
        .on("change", (ev, d) => {
          let v = Math.abs(parseFloat(ev.target.value)) || 0;
          if (v > 0) {
            let r = oc_cpxd.ttdl[d.tt];
            r.soluong = v;
            r.tienvl = lamtronso(r.soluong * r.giavl, 0);
            r.tiennc = lamtronso(r.soluong * r.gianc, 0);
            r.tienmtc = lamtronso(r.soluong * r.giamtc, 0);
            ev.target.style.height = 'auto';
            ev.target.style.height = [ev.target.scrollHeight, 'px'].join('');
            console.log("update oc_pxd[", d.tt, "]=", JSON.stringify(r));
          }
          web.oc.cpxd();
          web.oc.bth();
        })
        .on("keydown", function (ev, d) {
          if ([13].includes(ev.keyCode)) {
            ev.preventDefault();
            let v = Math.abs(parseFloat(ev.target.value)) || 0;
            if (v > 0) {
              let r = oc_cpxd.ttdl[d.tt];
              r.soluong = v;
              r.tienvl = lamtronso(r.soluong * r.giavl, 0);
              r.tiennc = lamtronso(r.soluong * r.gianc, 0);
              r.tienmtc = lamtronso(r.soluong * r.giamtc, 0);
              ev.target.style.height = 'auto';
              ev.target.style.height = [ev.target.scrollHeight, 'px'].join('');
              console.log("update oc_cpxd[", d.tt, "]=", JSON.stringify(r));
            }
            web.tagid = ev.target.id;
            web.oc.cpxd();
            web.oc.bth();
            //chuyen dong ke tiep
            web.move2id(1, 0);
          }
        });
      row.append('div')
        .attr("id", (d, i) => ['oc_cpxd', i, '4'].join('__'))
        .attr("class", (d, i) => ['r bb fito oc_cpxd r', i, ' c4'].join(''))
        .text((d) => d3.format(",.0r")(d.giavl))
        .on("mouseenter", (ev) => {
          web.tagid = ev.target.id;
          web.hov_intag(web.tagid);
        })
        .on("mouseleave", (ev) => {
          web.tagid = ev.target.id;
          web.hov_outtag(web.tagid);
        });
      row.append('div')
        .attr("id", (d, i) => ['oc_cpxd', i, '5'].join('__'))
        .attr("class", (d, i) => ['r bb fito oc_cpxd r', i, ' c5'].join(''))
        .text((d) => d3.format(",.0r")(d.gianc))
        .on("mouseenter", (ev) => {
          web.tagid = ev.target.id;
          web.hov_intag(web.tagid);
        })
        .on("mouseleave", (ev) => {
          web.tagid = ev.target.id;
          web.hov_outtag(web.tagid);
        });
      row.append('div')
        .attr("id", (d, i) => ['oc_cpxd', i, '6'].join('__'))
        .attr("class", (d, i) => ['r bb fito oc_cpxd r', i, ' c6'].join(''))
        .text((d) => d3.format(",.0r")(d.giamtc))
        .on("mouseenter", (ev) => {
          web.tagid = ev.target.id;
          web.hov_intag(web.tagid);
        })
        .on("mouseleave", (ev) => {
          web.tagid = ev.target.id;
          web.hov_outtag(web.tagid);
        });
      row.append('div')
        .attr("id", (d, i) => ['oc_cpxd', i, '7'].join('__'))
        .attr("class", (d, i) => ['r bb fito oc_cpxd r', i, ' c7'].join(''))
        .text((d) => d3.format(",.0r")(d.tienvl))
        .on("mouseenter", (ev) => {
          web.tagid = ev.target.id;
          web.hov_intag(web.tagid);
        })
        .on("mouseleave", (ev) => {
          web.tagid = ev.target.id;
          web.hov_outtag(web.tagid);
        });
      row.append('div')
        .attr("id", (d, i) => ['oc_cpxd', i, '8'].join('__'))
        .attr("class", (d, i) => ['r bb fito oc_cpxd r', i, ' c8'].join(''))
        .text((d) => d3.format(",.0r")(d.tiennc))
        .on("mouseenter", (ev) => {
          web.tagid = ev.target.id;
          web.hov_intag(web.tagid);
        })
        .on("mouseleave", (ev) => {
          web.tagid = ev.target.id;
          web.hov_outtag(web.tagid);
        });
      row.append('div')
        .attr("id", (d, i) => ['oc_cpxd', i, '9'].join('__'))
        .attr("class", (d, i) => ['r bb fito oc_cpxd r', i, ' c9'].join(''))
        .text((d) => d3.format(",.0r")(d.tienmtc))
        .on("mouseenter", (ev) => {
          web.tagid = ev.target.id;
          web.hov_intag(web.tagid);
        })
        .on("mouseleave", (ev) => {
          web.tagid = ev.target.id;
          web.hov_outtag(web.tagid);
        });
    },

    bth: (zdl) => {
      let zone, kiem,
        self = app.oc;
      console.log("bth app.oc=", JSON.stringify(self));
      zone = d3.select("#ongcai");
      kiem = zone.select(".grid.ongcai")
        .attr("data-show", "true")
        .on("click", (ev) => {
          if (kiem.attr("data-show") === "true") {
            zone.selectAll("#show_ongcai").classed("hide", false);
            kiem.attr("data-show", "false");
          } else {
            zone.selectAll("#show_ongcai").classed("hide", true);
            kiem.attr("data-show", "true");
          }
        });
      if (!('oc' in app)) { app.oc = { zvl: 0, znc: 0, zmtc: 0 }; }
      try {
        self.zvl = self.cpxd.reduce(function (z, rec) { return z + rec.tienvl }, 0);
        self.zvl = self.cpvt.reduce(function (z, rec) { return z + rec.tienvl }, self.zvl);
        self.zvl = self.cpvl.reduce(function (z, rec) { return z + rec.tienvl }, self.zvl);
      } catch (err) { }
      try {
        self.znc = self.cpxd.reduce(function (z, rec) { return z + rec.tiennc }, 0);
        self.znc = self.cpvt.reduce(function (z, rec) { return z + rec.tiennc }, self.znc);
        self.znc = self.cpvl.reduce(function (z, rec) { return z + rec.tiennc }, self.znc);
      } catch (err) { }
      try {
        self.zmtc = self.cpxd.reduce(function (z, rec) { return z + rec.tienmtc }, 0);
        self.zmtc = self.cpvt.reduce(function (z, rec) { return z + rec.tienmtc }, self.zmtc);
        self.zmtc = self.cpvl.reduce(function (z, rec) { return z + rec.tienmtc }, self.zmtc);
      } catch (err) { }
      d3.select("#oc_zvl").data([self.zvl])
        .attr("class", "fb")
        .text((d) => d3.format(",.0r")(d));
      d3.select("#oc_znc").data([self.znc])
        .attr("class", "fb")
        .text((d) => d3.format(",.0r")(d));
      d3.select("#oc_zmtc").data([self.zmtc])
        .attr("class", "fb")
        .text((d) => d3.format(",.0r")(d));
    },
    up_cpxd: (dl) => {
      if (dl.constructor !== Object) { return; }
      if (dl.chiphi === '...') {
        app.oc.cpxd.splice(dl.tt, 1);
      } else {
        app.oc.cpxd[dl.tt] = dl;
      }
      web.oc.cpxd();
      web.oc.bth();
      //console.log("up_cpxd dl=", JSON.stringify(dl));
    },
    up_cpvt: (dl) => {
      if (dl.constructor !== Object) { return; }
      if (dl.chiphi === '...') {
        app.oc.cpvt.splice(dl.tt, 1);
      } else {
        app.oc.cpvt[dl.tt] = dl;
      }
      web.oc.cpvt();
      web.oc.bth();
    },
    up_cpvl: (dl) => {
      if (dl.constructor !== Object) { return; }
      if (dl.chiphi === '...') {
        app.oc.cpvl.splice(dl.tt, 1);
      } else {
        app.oc.cpvl[dl.tt] = dl;
      }
      web.oc.cpvl();
      web.oc.bth();
    },
  },



  tlmd: {

  },
  cpql: (idma = null) => {
    let zone, kiem, bang, rec, self;
    zone = d3.select("section[id='cpql']");
  },
  tiendo: (sv = '', cv = 0) => {
    sv = fn.a2s(sv);
    let zone, cv0, elid, el = ['tiendo', ...sv.split(' ')].join('_'),
      rong = "18rem";
    el = el.split('.').join('_');
    elid = ['#', el].join('');
    cv = cv < 0 ? 0 : fn.a2i(cv % 101);
    zone = d3.select("#tiendo").select(elid);
    if (!zone.node()) {
      cv0 = "0";
      zone = d3.select("#tiendo").append("li")
        .attr("id", el)
        .style("width", rong);
    } else {
      cv0 = zone.attr("data-cv");
    }
    zone.attr("data-cv", cv);
    zone.selectAll("*").remove();
    zone.append("div")
      .attr("class", "c ba w100")
      .html(sv);
    zone.append("div")
      .attr("class", "c")
      .style("background-color", "green")
      .style("color", "white")
      .style("width", cv0 + "%")
      .html(cv + " %")
      .transition()
      .duration(777)
      .style("width", cv + "%");
    if (cv === 100) { zone.transition().delay(77).remove(); }
  },
  hov_intag: (tagid = null) => {
    let tag, zone, row, col,
      hov = "yellow",
      act = "#888fff";
    try {
      tagid ? web.tagid = tagid : tagid = web.tagid;
      tag = tagid.split('__');
    } catch (err) { return; }
    zone = tag[0];
    row = tag[1];
    col = tag[2];
    zone.charAt(0) == '#' ? zone = zone.substr(1) : 0;
    tag = ['.', zone, '.r', row].join('');
    d3.selectAll(tag)
      .each(function () {
        let o = d3.select(this);
        o.style("background-color", hov);
      });
    tag = ['.', zone, '.c', col].join('');
    d3.selectAll(tag)
      .each(function () {
        let o = d3.select(this);
        o.style("background-color", hov);
      });
    if (tagid.charAt(0) != '#') { tagid = ['#', tagid].join(''); }
    d3.selectAll(tagid)
      .each(function () {
        let o = d3.select(this);
        o.style("background-color", act);
      });
  },
  hov_outtag: (tagid = null) => {
    let tag, zone, row, col;
    try {
      tagid ? web.tagid = tagid : tagid = web.tagid;
      tag = tagid.split('__');
    } catch (err) { return; }
    zone = tag[0];
    row = tag[1];
    col = tag[2];
    if (zone.charAt(0) == '#') { zone = zone.substr(1); }
    tag = ['.', zone, '.r', row].join('');
    d3.selectAll(tag).style("background-color", "transparent");
    tag = ['.', zone, '.c', col].join('');
    d3.selectAll(tag).style("background-color", "transparent");
  },
  move2id: (row = 0, col = 0, maxR = 0, maxC = 1) => {
    console.log("start move2id=", web.tagid, " row=", row, " col=", col);
    if (!row && !col) { return; }
    let tagid, tag, zone, el;
    try {
      tagid = web.tagid;
      tag = tagid.split('__');
    } catch (err) { return; }
    if (tagid.charAt(0) != '#') { tagid = ['#', tagid].join(''); }
    zone = tag[0].toLowerCase();
    if (zone.charAt(0) == '#') { zone = zone.substr(1); }
    row = parseInt(tag[1]) + parseInt(row);
    col = parseInt(tag[2]) + parseInt(col);
    switch (zone) {
      case 'oc_cpxd':
        maxR = app.oc.cpxd.length + 1;
        maxC = 9;
        if (row > maxR) {
          zone = 'oc_cpvt';
          row = 1;
          col = 0;
        };
        if (row < 0) {
          zone = 'oc_cpvl';
          row = app.oc.cpvl.length + 1;
          col = 0;
        };
        break;
      case 'oc_cpvt':
        maxR = app.oc.cpvt.length + 1;
        maxC = 9;
        if (row > maxR) {
          zone = 'oc_cpvl';
          row = 1;
          col = 0;
        };
        if (row < 0) {
          zone = 'oc_cpxd';
          row = app.oc.cpxd.length + 1;
          col = 0;
        };
        break;
      case 'oc_cpvl':
        maxR = app.oc.cpvl.length + 1;
        maxC = 9;
        if (row > maxR) {
          zone = 'oc_cpxd';
          row = 1;
          col = 0;
        };
        if (row < 0) {
          zone = 'oc_cpvt';
          row = app.oc.cpvt.length + 1;
          col = 0;
        };
        break;
      case 'on_cpxd':
        maxR = app.on.cpxd.length + 1;
        maxC = 9;
        if (row > maxR) {
          zone = 'on_cpvt';
          row = 1;
          col = 0;
        };
        if (row < 0) {
          zone = 'on_cpvl';
          row = app.on.cpvl.length + 1;
          col = 0;
        };
        break;
      case 'on_cpvt':
        maxR = app.on.cpvt.length + 1;
        maxC = 9;
        if (row > maxR) {
          zone = 'on_cpvl';
          row = 1;
          col = 0;
        };
        if (row < 0) {
          zone = 'on_cpxd';
          row = app.on.cpxd.length + 1;
          col = 0;
        };
        break;
      case 'on_cpvl':
        maxR = app.on.cpvl.length + 1;
        maxC = 9;
        if (row > maxR) {
          zone = 'on_cpxd';
          row = 1;
          col = 0;
        };
        if (row < 0) {
          zone = 'on_cpvt';
          row = app.on.cpvt.length + 1;
          col = 0;
        };
        break;
      default:
        maxR = maxR;
        maxC = maxC;
    }
    col > maxC ? col = 0 : col < 0 ? col = maxC : col;
    console.log("move2id hov_outtag tagid=", JSON.stringify(tagid));
    web.hov_outtag(tagid);
    tag = [zone, row, col].join('__');
    web.olua(tag);
  },
  olua: (tagid = null) => {
    console.log("olua start tagid=", tagid, " web.tagig=", web.tagid);
    //try {
    if (tagid.charAt(0) != '#') { tagid = ['#', tagid].join(''); }
    let el = d3.select(tagid).node();
    el.focus();
    if (el && ['INPUT', 'TEXTAREA'].includes(el.tagName)) {
      el.select();
    }
    if (tagid.charAt(0) == '#') { tagid = tagid.substr(1); }
    web.tagid = tagid;
    //} catch (err) { return; }
    web.hov_intag(tagid);
    console.log("olua end tagid=", tagid, " web.tagig=", web.tagid);
  },
  box: {
    hov: { mau1: "#9999ff" },
    chiphi(el, dl, stim = null) {
      if (dl.constructor !== Object) { return; }
      let plcp;
      try {
        plcp = dl.plcp.toString().toLowerCase();
        if (!(['cpxd', 'cpvt', 'cpvl', 'cptl'].includes(plcp))) { return; }
      } catch (err) { return; }
      try {
        stim = stim.toString().toLowerCase();
      } catch (err) { stim = ''; }

      console.log("open box chiphi", JSON.stringify(app.chiphi));
      let zone, k, r, ss, row,
        zdl = ga.chiphi,
        dulieu = [
          { id: "Mã chi phí", show: "Mô tả chi phí", dvt: "Đvt" },
          { id: "...", show: "(Không chọn)", dvt: "" },
        ];
      for (k in zdl) {
        r = { ...zdl[k] };
        ss = JSON.stringify(r).toLowerCase();
        if (r.plcp === plcp && ss.includes(stim)) {
          r.id = k;
          r.show = ham.stomau(r.mota.qtgt, stim);
          r.dvt = ham.stomau(r.dvt, stim);
          dulieu.push(r);
        }
      }
      d3.selectAll("#xem").remove();
      zone = d3.select(el).append("ol")
        .attr("id", "xem")
        .style("list-style", "none")
        .style("margin", 0)
        .style("padding", 0)
        .style("max-height", "10.25rem")
        .style("overflow-y", "auto")
        .style("border", "1px solid #d4d4d4");
      //noidung chon
      row = zone.selectAll("li").data(dulieu)
        .enter()
        .append("li")
        .attr("id", (d, i) => ['chiphi', i, 0].join('__'))
        .attr("class", (d, i) => i == 0 ? 'nen0' : 'l')
        .style("display", "grid")
        .style("grid", "auto-flow minmax(1rem, max-content)/3fr 8fr 1fr")
        .on("click", (ev, d) => {
          //ev.preventDefault();
          if (ev.target.id != 'chiphi__0__0') {
            dl.chiphi = d.id;
            zone.remove();
            plcp = ['up_', plcp].join('');
            web[dl.plqt][plcp](dl);
          }
        });
      //o chi tiet
      row.append("div")
        .attr("id", (d, i) => ['chiphi', i, 1].join('__'))
        .attr("class", (d, i) => {
          ss = ['fb fito chiphi r', i, ' c1'].join('');
          if (i == 0) {
            return ['c u', ss].join(' ');
          } else {
            return ['l', ss].join(' ');
          }
        })
        .style("line-height", "100%")
        //.style("grid-area", "1/1/3/2")
        .html(d => d.id);
      row.append("div")
        .attr("id", (d, i) => ['chiphi', i, 2].join('__'))
        .attr("class", (d, i) => {
          if (i == 0) {
            return ['c u fb chiphi r', i, ' c2'].join('');
          } else {
            return ['l fb chiphi r', i, ' c2'].join('');
          }
        })
        .style("line-height", "100%")
        .html(d => d.show);
      row.append("div")
        .attr("id", (d, i) => ['chiphi', i, 3].join('__'))
        .attr("class", (d, i) => {
          if (i == 0) {
            return ['c u fb chiphi r', i, ' c3'].join('');
          } else {
            return ['l fb chiphi r', i, ' c3'].join('');
          }
        })
        .style("line-height", "100%")
        .html(d => d.dvt);
      //hov div
      row.selectAll('div')
        .on("mouseenter", (ev) => {
          web.tagid = ev.target.id;
          web.hov_intag(web.tagid);
        })
        .on("mouseleave", (ev) => {
          web.tagid = ev.target.id;
          web.hov_outtag(web.tagid);
        });
    },
    cpql: () => {
      let zond = d3.select("ga_cpql").attr("data-macpql", "20200827");
      zone.selectAll("option").data(ga.tieude.cptl)
        .enter()
        .append("option")
        .attr("class", "c")
        .text((col) => col);
    },
  },
};

const cpx = {
  tc: 222, tv: 1,
  cv: 0, zcv: 1,
  tagid: 'test',
  plcp: 'cpvt',
  stim: '',
  lua: '123',
  ltim: ['cpvt', 'chiphi', '1'],
  z1: { idma: 123, mota: '', dvt: '' },
  ttdl: {},
  d8: {
    '1': { plcp: 'cpvt', mota: 'chiphi 1', dvt: 'dvt 1', qrcode: '', barcode: '1', tjan: 0 },
    '2': { plcp: 'cpvt', mota: 'chiphi 2', dvt: 'dvt 2', qrcode: '', barcode: '2', tjan: 0 },
    '3': { plcp: 'cpvt', mota: 'chiphi 3', dvt: 'dvt 3', qrcode: '', barcode: '3', tjan: 0 },
    '4': { plcp: 'cpvt', mota: 'chiphi 4', dvt: 'dvt 4', qrcode: '', barcode: '4', tjan: 0 },
    '5': { plcp: 'cpvt', mota: 'chiphi 5', dvt: 'dvt 5', qrcode: '', barcode: '5', tjan: 0 },
  },
  l8: [
    { idma: "Mã chi phí", plcp: 'cpvt', mota: "Mô tả chi phí", dvt: "Đvt" },
    { idma: "1", plcp: 'cpvt', mota: "Mô tả chi phí 1", dvt: "Đvt 1" },
    { idma: "2", plcp: 'cpvt', mota: "Mô tả chi phí 2", dvt: "Đvt 2" },
  ],
  wxem: function (cg3 = 0) {
    let tag, el0, box,
      t = this;
    //try {
    cg3 = fn.a2i(cg3);
    if (cg3 > 3) {
      d3.selectAll("#xem").remove();
      return;
    };
    tag = fn.a2sl(t.tagid);
    if (tag.charAt(0) == '#') tag = tag.substr(1);
    el0 = '#' + tag;
    d3.selectAll("#xem").remove();
    box = d3.select(el0).append("ol")
      .attr("id", "xem")
      .style("list-style", "none")
      .style("margin", 0)
      .style("padding", 0)
      .style("max-height", "10.25rem")
      .style("overflow-y", "auto")
      .style("border", "1px solid #d4d4d4")
      .selectAll("li").data(['inp', 'otim', 'lua'])
      .enter()
      .append("li")
      .attr("id", d => d)
      .attr("class", "bb");
    t.winp();
    t.wtim();
    //} catch (err) {
    //  cg3 += 1;
    //  setTimeout(() => t.wxem(cg3), t.tv);
    //  return;
    //}

  },
  winp: function (cg3 = 0) {
    let tag, tagid, box,
      t = this;
    //try {
    box = d3.select("#inp");
    box.selectAll("*").remove();
    cg3 = fn.a2i(cg3);
    if (cg3 > 3) return;
    box.append('textarea')
      .attr("class", "j w100 fito")
      .attr("rows", 1)
      .style("margin", 0)
      .style("padding", "1pt")
      .style("outline", "none")
      .text(t.z1.mota || t.stim)
      .on("keydown", function (ev) {
        let elid, s = fn.a2sl(ev.target.value);
        if (!web.tagid.includes('chiphi__')) {
          web.tagid = 'chiphi__1__0';
          web.hov_intag(web.tagid);
        }
        switch (ev.keyCode) {
          case 13: //enter goto 1st hosoloc
            ev.preventDefault();
            elid = web.tagid.charAt(0) !== '#' ? '#' + web.tagid : web.tagid;
            t.z1.idma = d3.select(elid).attr("data-idma");
            console.log("btn=", ev.code, " keyCode=", ev.keyCode);
            console.log("btn t.z1=", JSON.stringify(t.z1, null, 2));
            d3.selectAll("#xem").remove();
          case 45: //insert
            console.log("btn=insert");
            if (s.length > 0 && t.ltim.indexOf(s) === -1) {
              t.ltim.push(s);
            }
            this.value = "";
            t.wtim(0);
            break;
          case 38: //mui ten len
            break;
          case 40: //mui ten xuong
            break;
          default:
            console.log("btn=", ev.code, " keyCode=", ev.keyCode);
        }
      })
      .on("input", function (ev, d) {
        let el = ev.target;
        d3.select(el).classed("fito", false);
        el.style.height = 'auto';
        el.style.height = [el.scrollHeight, 'px'].join('');
        t.stim = fn.a2sl(el.value);
        t.wlua(0);
        //web.box.chiphi(el, d, stim);
      });


    //} catch (err) {
    //  cg3 += 1;
    //  setTimeout(() => t.vinp(cg3), t.tv);
    //  return;
    //}

  },
  wtim: function (cg3 = 0) {
    let box, tag,
      t = this,
      dl = t.ltim;
    //try {
    box = d3.select("#otim");
    box.selectAll('*').remove();
    cg3 = fn.a2i(cg3);
    if (cg3 > 3) t.ltim = [];
    if (!box.node()) t.ltim = [];
    tag = fn.a2sl(t.tagid);
    if (tag.charAt(0) == '#') tag = tag.substr(1);
    if (dl.constructor !== Array) dl = [dl];
    if (dl.length > 0) dl = ['__Xóa__', ...dl];
    box.append("ol")
      .attr("class", 'tblx')
      .selectAll("li").data(dl)
      .enter()
      .append("li")
      .attr("id", (d, i) => [tag, 'tim', i, 0].join('__'))
      .attr("class", 'c')
      .html((d, i) => {
        let s = d + ` x`;
        if (i == 0) s = `<i class="fa fa-trash"></i>`;
        return s;
      })
      .on("click", (ev, d) => {
        t.ltim = d === '__Xóa__' ? [] : t.ltim.filter(r => r !== d);
        t.wtim(1);
      })
      .on("mouseenter", function () {
        d3.select(this)
          .classed('hov', true)
          .style('color', 'red');
      })
      .on("mouseleave", function () {
        d3.select(this)
          .classed('hov', false)
          .style('color', 'black');
      });

    //} catch (err) {
    //  cg += 1;
    //  setTimeout(() => t.xem({ tag: tag, ltim: t.l8 }, cg), t.tv);
    //}
    console.log(tag, " otim end t=", JSON.stringify(t, null, 2));
    t.wlua(0);
  },
  wlua: function (cg = 0) {
    let box, plcp, l8, r, k, v, s, ss, isok, cells, j, mota,
      t = this,
      stim = fn.a2sl(t.stim),
      ltim = [...t.ltim, stim];
    //try {
    cg = fn.a2i(cg);
    if (cg > 3) return t.l8;
    plcp = fn.a2sl(t.plcp);
    l8 = [];
    for (k in t.d8) {
      r = { ...t.d8[k] };
      ss = fn.a2sl(r);
      isok = true;
      console.log("wlua r=", JSON.stringify(r, null, 2));
      if (fn.a2sl(r.plcp) !== plcp) isok = false;
      console.log("1 isok=", JSON.stringify(isok, null, 2));
      if (isok) {
        for (v of ltim) {
          s = fn.a2sl(v);
          if (!(ss.includes(s))) {
            isok = false;
            break;
          }
        }
        console.log("2 isok=", JSON.stringify(isok, null, 2));
      }
      if (isok) {
        r.idma = k;
        mota = r.mota.qtgt || r.mota;
        l8.push(r);
      }
    }
    l8 = l8.sort((a, b) => a.idma - b.idma);
    t.l8 = l8;
    l8 = [
      { idma: "Mã chi phí", mota: "Mô tả chi phí", dvt: "Đvt" },
      { idma: "0", mota: "", dvt: "" }, ...l8];
    //show
    box = d3.select('#lua').selectAll("*").remove();
    box = d3.select('#lua').selectAll("li").data(l8)
      .enter()
      .append("li")
      .attr("id", (d, i) => ['chiphi', i, 0].join('__'))
      .attr("data-idma", d => d.idma)
      .attr("class", (d, i) => i == 0 ? 'nen0' : 'l')
      .style("display", "grid")
      .style("grid", "auto-flow minmax(1rem, max-content)/3fr 8fr 1fr")
      .on("click", (ev, d) => {
        if (ev.target.id != 'chiphi__0__0') {
          t.z1 = d;
          d3.selectAll("#xem").remove();
          console.log("chiphi .box_lua zs=", JSON.stringify(t, null, 2));
        }
      });
    //cells
    cells = ['idma', 'mota', 'dvt'];
    for (j in cells) {
      box.append("div")
        .attr("id", (d, i) => ['chiphi', i, fn.a2i(j) + 1].join('__'))
        .attr("data-idma", d => d.idma)
        .attr("class", (d, i) => {
          if (i == 0) {
            return ['c u fb fito chiphi', 'r' + i, 'c' + (fn.a2i(j) + 1)].join(' ');
          } else {
            return ['l fb fito chiphi', 'r' + i, 'c' + (fn.a2i(j) + 1)].join(' ');
          }
        })
        .style("line-height", "100%")
        //.style("grid-area", "1/1/3/2")
        .html((d, i) => {
          if (i !== 0) {
            return fn.stomau(d[cells[j]], stim);
          } else {
            return d[cells[j]];
          }
        });
    }
    //hov div
    box.selectAll('div')
      .on("mouseenter", (ev) => {
        web.tagid = ev.target.id;
        web.hov_intag(web.tagid);
      })
      .on("mouseleave", (ev) => {
        web.tagid = ev.target.id;
        web.hov_outtag(web.tagid);
      });

    //} catch (err) {
    //  cg += 1;
    //  setTimeout(() => t.xem({ tag: tag, ltim: t.l8 }, cg), t.tv);
    //}
    console.log("cpx.wlua end cpx=", JSON.stringify(t, null, 2));
  },
};

const idb = {
  csdl: { ten: 'CnTĐ', cap: 1 },
  ztg: 222,
  taodb: () => {
    let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    if (!indexedDB) {
      console.log('khong ho tro idb');
      return null;
    };
    try {
      let db, idx,
        ten = idb.csdl.ten,
        cap = idb.csdl.cap,
        yc = indexedDB.open(ten, cap);
      yc.onupgradeneeded = e => {
        db = e.target.result;
        if (e.oldVersion < cap) {
          idx = db.createObjectStore('tttt', { keyPath: 'tttt' });
          idx = db.createObjectStore('hoso', { keyPath: 'idma' });
          idx = db.createObjectStore('khachhang', { keyPath: 'idma' });
          idx = db.createObjectStore('khuvuc', { keyPath: 'idma' });
          idx = db.createObjectStore('dot', { keyPath: 'idma' });
          idx = db.createObjectStore('donvithicong', { keyPath: 'idma' });
          idx = db.createObjectStore('hoancong', { keyPath: 'idma' });
          idx = db.createObjectStore('trongai', { keyPath: 'idma' });
          //chiphi
          idx = db.createObjectStore('chiphi', { keyPath: 'idma' });
          idx = db.createObjectStore('chiphiquanly', { keyPath: 'idma' });
          //baogia
          idx = db.createObjectStore('bgvl', { keyPath: 'idma' });
          idx = db.createObjectStore('bgnc', { keyPath: 'idma' });
          idx = db.createObjectStore('bgmtc', { keyPath: 'idma' });
          idx = db.createObjectStore('bgtl', { keyPath: 'idma' });
          //qtvt
          idx = db.createObjectStore('qtvt', { keyPath: 'idma' });
          idx = db.createObjectStore('qtvt_cpvt', { keyPath: 'idma' });
          //qtgt
          idx = db.createObjectStore('qtgt', { keyPath: 'idma' });
          idx = db.createObjectStore('cpxd', { keyPath: 'idma' });
          idx = db.createObjectStore('cpvl', { keyPath: 'idma' });
          idx = db.createObjectStore('cpvt', { keyPath: 'idma' });
          idx = db.createObjectStore('cptl', { keyPath: 'idma' });
          //scan
          idx = db.createObjectStore('scan', { keyPath: 'idma' });
          //web
          idx = db.createObjectStore('nhanvien', { keyPath: 'idma' });
        }
      };
    } catch (err) { };
  },
  xem: (bien) => {
    console.log("ct-idb.xem ", bien, "=", JSON.stringify(bien, null, 2));
  },
  gom: {
    cpx: (dk = { prog: 'cpx', otim: null, gop: false }, cg3 = 0) => {
      let w, hoi, dap, d1r, d1s, k, r, prog,
        d8 = ga.cpx;
      //try {
      cg3 = fn.a2i(cg3);
      if (cg3 > 3) return;
      dk.prog = 'cpx';
      prog = [dk.prog, fn.a2s(Date.now())].join('_');
      //main
      w = sw.moi('cpx');
      hoi = {
        csdl: idb.csdl,
        gom: dk,
      };
      console.log("idb.gom.cpx hoi=", JSON.stringify(hoi, null, 2));
      w.postMessage(hoi);
      w.onmessage = (e) => {
        dap = e.data;
        if (dap.cv >= 0 && dap.cv <= 100) {
          d1r = dk.prog in dap ? dap[dk.prog] : {};
          k = d1r.idma || d1r.maid;
          if ('ttdl' in d1r || 'data' in d1r) {
            r = d1r.ttdl || d1r.data;
            d1s = { ...d8[k] };
            if (!(k in d8) || d1r.tjan > d1s.tjan) {
              d1s = {};
              d1s.idma = r.idma || Date.now();
              d1s.maid = r.maid || d1s.idma;
              d1s.plcp = r.plcp || 'cpvt';
              d1s.mota = r.mota.qtgt || r.mota || '...';
              d1s.dvt = r.dvt || '...';
              d1s.tjan = d1r.tjan || Date.now();
              d8[k] = d1s;
            }
          };
          web.tiendo(prog, dap.cv);
        } else if (dap.cv < 0 || dap.cv > 100) {
          sw.xoa('cpx');
          console.log("nv fin=", JSON.stringify(dap, null, 2));
          idb.xem(ga.cpx);
        } else if ("err" in dap) {
          console.log("nv err=", JSON.stringify(dap.err, null, 2));
        } else if ("info" in dap) {
          console.log("nv info=", JSON.stringify(dap.info, null, 2));
        } else {
          console.log("nv dap=", JSON.stringify(dap, null, 2));
        }
      }

      //} catch (err) {
      //  cg3 += 1;
      //  setTimeout(() => idb.gom.cpx(cg3), idb.ztg);
      //}
    },
  },
  nap: {
    qtgt: (dk = { prog: 'qtgt', idma: null }, cg3 = 0) => {
      let w, hoi, dap, r8r, r8s, d8r, d8s, _prog, idma;
      try {
        cg3 = fn.a2i(cg3);
        if (cg3 > 3) { return; };
        if (Object.keys(dk).length < 1) { return; }
        dk.prog = 'qtgt';
        dk.idma = fn.a2i(dk.idma);
        r8s = qtgt.tttt;
        d8s = qtgt.ttdl;
        _prog = [dk.prog, dk.idma].join('_');
        //main
        w = sw.moi();
        hoi = {
          csdl: idb.csdl,
          idma: dk,
        };
        console.log("idb.nap.qtgt hoi=", JSON.stringify(hoi, null, 2));
        w.postMessage(hoi);
        w.onmessage = (e) => {
          dap = e.data;
          if (dap.cv === 100) {
            web.tiendo(_prog, dap.cv);
            d8r = 'idma' in dap ? dap.idma.data || dap.idma.ttdl : {};
            r8r = 'idma' in dap ? dap.idma.refs || dap.idma.tttt : {};
            qtgt.cv = 1;
            r8s.oc_cpxd = fn.a2i(r8r.oc_cpxd);
            r8s.oc_cpvt = fn.a2i(r8r.oc_cpvt);
            r8s.oc_cpvl = fn.a2i(r8r.oc_cpvl);
            r8s.oc_cptl = fn.a2i(r8r.oc_cptl);
            r8s.on_cpxd = fn.a2i(r8r.on_cpxd);
            r8s.on_cpvt = fn.a2i(r8r.on_cpvt);
            r8s.on_cpvl = fn.a2i(r8r.on_cpvl);
            r8s.on_cptl = fn.a2i(r8r.on_cptl);

          } else if (dap.cv >= 0 && dap.cv < 100) {
            web.tiendo(_prog, dap.cv);
          } else if (dap.cv < 0 || dap.cv > 100) {
            sw.xoa(w);
            console.log("nv fin=", JSON.stringify(dap, null, 2));
          } else if ("err" in dap) {
            console.log("nv err=", JSON.stringify(dap.err, null, 2));
          } else if ("info" in dap) {
            console.log("nv info=", JSON.stringify(dap.info, null, 2));
          } else {
            console.log("nv dap=", JSON.stringify(dap, null, 2));
          }
          console.log("idb.nap.qtgt=", JSON.stringify(qtgt, null, 2));
        }
      } catch (err) {
        cg3 += 1;
        setTimeout(() => { idb.nap.qtgt(cg3); }, idb.ztg);
      }
    },
    cpx_old: (dk = { prog: 'chiphi', idma: null }, cg3 = 0) => {
      let w, hoi, dap, d1r, d1s, k, i, _prog;
      try {
        cg3 = fn.a2i(cg3);
        if (cg3 > 3) { return; };
        if (Object.keys(dk).length < 1) { return; }
        dk.prog = "chiphi";
        _prog = [dk.prog, dk.idma].join('_');
        dk.idma = fn.a2i(dk.chiphi);
        d1s = _cpx.d8[dk.idma];
        if (!d1s) { return; }
        //main
        w = sw.moi();
        hoi = {
          csdl: idb.csdl,
          idma: dk,
        };
        console.log("idb.nap.cpx gui=", JSON.stringify(hoi, null, 2));
        w.postMessage(hoi);
        w.onmessage = (e) => {
          dap = e.data;
          if (dap.cv === 100) {
            web.tiendo(_prog, dap.cv);
            d1r = 'idma' in dap ? dap.idma.data : {};
            if (Object.keys(d1r).length > 0) {
              d1s.chiphi = dap.idma.idma;
              d1s.barcode = d1r.barcode || d1r.idma;
              d1s.qrcode = d1s.qrcode || d1r.idma;
              d1s.mota = d1r.mota.qtgt || d1r.mota.qtgt;
              d1s.dvt = d1r.dvt;
            } else {
              d1s.chiphi = dk.idma;
              d1s.barcode = '';
              d1s.qrcode = '';
              d1s.mota = 'Chưa cập nhật ...';
              d1s.dvt = '';
            }
          } else if (dap.cv >= 0 && dap.cv < 100) {
            web.tiendo(_prog, dap.cv);
          } else if (dap.cv < 0 || dap.cv > 100) {
            sw.xoa(w);
            console.log("nv fin=", JSON.stringify(dap, null, 2));
          } else if ("err" in dap) {
            console.log("nv err=", JSON.stringify(dap.err, null, 2));
          } else if ("info" in dap) {
            console.log("nv info=", JSON.stringify(dap.info, null, 2));
          } else {
            console.log("nv dap=", JSON.stringify(dap, null, 2));
          }
          console.log("idb.nap.cpx _cpx=", JSON.stringify(_cpx, null, 2));
        }
      } catch (err) {
        cg3 += 1;
        setTimeout(() => { idb.nap.cpx(cg3); }, idb.ztg);
      }
    },
    cpx: (dk = { prog: 'cpx', idma: null }, cg3 = 0) => {
      let w, hoi, dap, d1r, d1s, k, r, prog,
        d8 = ga.cpx;
      //try {
      cg3 = fn.a2i(cg3);
      if (cg3 > 3) return;
      dk.prog = 'cpx';
      dk.idma = fn.a2i(dk.idma || dk.chiphi);
      prog = [dk.prog, dk.idma].join('_');
      //main
      w = sw.moi('cpx');
      hoi = {
        csdl: idb.csdl,
        nap: dk,
      };
      console.log("idb.gom.cpx hoi=", JSON.stringify(hoi, null, 2));
      w.postMessage(hoi);
      w.onmessage = (e) => {
        dap = e.data;
        if (dap.cv >= 0 && dap.cv <= 100) {
          d1r = dk.prog in dap ? dap[dk.prog] : {};
          k = d1r.idma || d1r.maid;
          if ('ttdl' in d1r || 'data' in d1r) {
            r = d1r.ttdl || d1r.data;
            d1s = { ...d8[k] };
            if (!(k in d8) || d1r.tjan > d1s.tjan) {
              d1s = {};
              d1s.idma = r.idma || Date.now();
              d1s.maid = r.maid || d1s.idma;
              d1s.plcp = r.plcp || 'cpvt';
              d1s.mota = r.mota.qtgt || r.mota || '...';
              d1s.dvt = r.dvt || '...';
              d1s.tjan = d1r.tjan || Date.now();
              d8[k] = d1s;
            }
          };
          web.tiendo(prog, dap.cv);
        } else if (dap.cv < 0 || dap.cv > 100) {
          sw.xoa('cpx');
          console.log("nv fin=", JSON.stringify(dap, null, 2));
          idb.xem(ga.cpx);
        } else if ("err" in dap) {
          console.log("nv err=", JSON.stringify(dap.err, null, 2));
        } else if ("info" in dap) {
          console.log("nv info=", JSON.stringify(dap.info, null, 2));
        } else {
          console.log("nv dap=", JSON.stringify(dap, null, 2));
        }
      }

      //} catch (err) {
      //  cg3 += 1;
      //  setTimeout(() => idb.gom.cpx(cg3), idb.ztg);
      //}
    },
    baogia: (dk = { prog: 'bgvl', chiphi: null, baogia: null, plgia: 'dutoan', plbg: 'bgvl' }, cg3 = 0) => {
      let w, hoi, dap, d1r, d1s, _prog, chiphi, baogia, plgia, k, i, k2;
      try {
        cg3 = fn.a2i(cg3);
        if (cg3 > 3) { return; };
        if (Object.keys(dk).length < 1) { return; }
        dk.plbg = fn.a2sl(dk.plbg);
        dk.prog = fn.a2sl(dk.prog || dk.plbg);
        dk.chiphi = fn.a2i(dk.chiphi);
        dk.plgia = fn.a2sl(qtgt.ttdl.plgia || qtgt.tttt.plgia);
        dk.baogia = fn.a2i(qtgt.ttdl.baogia);
        k2 = [dk.plgia, dk.baogia].join('.');
        d1s = _cpx.d8[dk.chiphi][k2];
        if (!d1s) { return; }
        _prog = [dk.prog, k2, dk.chiphi].join('_');
        //main
        w = sw.moi();
        hoi = {
          csdl: idb.csdl,
          baogia: dk,
        };
        console.log("idb.nap.baogia hoi=", JSON.stringify(hoi, null, 2));
        w.postMessage(hoi);
        w.onmessage = (e) => {
          dap = e.data;
          if (dap.cv === 100) {
            web.tiendo(_prog, dap.cv);
            d1r = dap || { giavl: 0, gianc: 0, giamtc: 0, giatl: 0 };
            if (dk.prog.includes('nc')) {
              d1s.gianc = d1r.gianc;
            } else if (dk.prog.includes('mtc')) {
              d1s.giamtc = d1r.giamtc;
            } else if (dk.prog.includes('tl')) {
              d1s.giatl = d1r.giatl;
            } else {
              d1s.giavl = d1r.giavl;
            }
          } else if (dap.cv >= 0 && dap.cv < 100) {
            web.tiendo(_prog, dap.cv);
          } else if (dap.cv < 0 || dap.cv > 100) {
            sw.xoa(w);
            console.log("nv fin=", JSON.stringify(dap, null, 2));
          } else if ("err" in dap) {
            console.log("nv err=", JSON.stringify(dap.err, null, 2));
          } else if ("info" in dap) {
            console.log("nv info=", JSON.stringify(dap.info, null, 2));
          } else {
            console.log("nv dap=", JSON.stringify(dap, null, 2));
          }
          console.log("idb.nap.cpx _cpx=", JSON.stringify(_cpx, null, 2));
        }
      } catch (err) {
        cg3 += 1;
        setTimeout(() => { idb.nap.cpx(cg3); }, idb.ztg);
      }
    },
    idma: (dk = { prog: 'qtgt', idma: null, tjan: 0 }, cg3 = 0) => {
      let w, hoi, dap, d1r, d1s, _prog;
      try {
        cg3 = fn.a2i(cg3);
        if (cg3 > 3) { return; };
        if (Object.keys(dk).length < 1) { return; }
        dk.prog = fn.a2sl(dk.prog);
        dk.idma = fn.a2i(dk.idma);
        d1s = window[dk.prog];
        _prog = [dk.prog, dk.idma].join('_');
        //main
        w = sw.moi();
        hoi = {
          csdl: idb.csdl,
          idma: dk,
        };
        console.log("idb.nap.idma hoi=", JSON.stringify(hoi, null, 2));
        w.postMessage(hoi);
        w.onmessage = (e) => {
          dap = e.data;
          if (dap.cv === 100) {
            web.tiendo(_prog, dap.cv);
            d1r = 'idma' in dap ? dap.idma : {};
            if ('ttdl' in d1r || 'data' in d1r) {
              d1s.ttdl = d1r.ttdl || d1r.data;
              d1s.cv = 1;
            };
            if ('tttt' in d1r || 'refs' in d1r) {
              d1s.tttt = d1r.tttt || d1r.refs;
              d1s.cv = 1;
            };
          } else if (dap.cv >= 0 && dap.cv < 100) {
            web.tiendo(_prog, dap.cv);
          } else if (dap.cv < 0 || dap.cv > 100) {
            sw.xoa(w);
            console.log("nv fin=", JSON.stringify(dap, null, 2));
          } else if ("err" in dap) {
            console.log("nv err=", JSON.stringify(dap.err, null, 2));
          } else if ("info" in dap) {
            console.log("nv info=", JSON.stringify(dap.info, null, 2));
          } else {
            console.log("nv dap=", JSON.stringify(dap, null, 2));
          }
          console.log("idb.nap.idma ", dk.prog, "=", JSON.stringify(d1s, null, 2));
        }
      } catch (err) {
        cg3 += 1;
        setTimeout(() => { idb.nap.idma(cg3); }, idb.ztg);
      }
    },

  },
  luu: {

  },
};

const app = {
  tc: 1,
  run: function (cg3 = 0) {
    try {
      cg3 = fn.a2i(cg3);
      if (cg3 > 3) return;
      idb.taodb();
      idb.gom.cpx({ "otim": 'cai100' }, 0);
      //cpx.wxem();
    } catch (err) {
      cg3 += 1;
      setTimeout(() => app.run(cg3), app.tc);
    }
  },
};

app.run();
//idb.nap.cpx({ "chiphi": "100" });
//idb.nap.baogia({ baogia: 20190726, chiphi: 100, plbg: 'bgnc', plgia: 'dutoan' }, 0)
//idb.nap.baogia({ baogia: 20190726, chiphi: 100, plbg: 'bgmtc', plgia: 'dutoan' }, 0)
//idb.nap.baogia({ baogia: 20190726, chiphi: 100, plbg: 'bgtl', plgia: 'dutoan' }, 0)