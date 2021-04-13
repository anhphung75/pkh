import { lamtronso, a2s, a2sl, a2i } from "./../../utils.js"

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
    let kq;
    try {
      kq = parseInt(dl);
    } catch (err) { kq = -1; }
    return kq
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
      sgoc = a2s(sgoc);
      stim = a2s(stim);
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

const qtgt = {
  cv: 0, zcv: 1,
  ztg: 222,
  idma: 123,
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
  //info: 'ok',
  tjan: Date.now(),
  mabaogia: function () {
    let plgia = fn.a2sl(this.ttdl.plgia || this.tttt.plgia),
      baogia = fn.a2sl(this.ttdl.baogia || this.tttt.baogia),
      k2 = [plgia, baogia].join('.');
    return k2;
  },
  nap: function (cg3 = 0) {
    let cv, r, i, k, isok, plgia, baogia, cpql,
      z8 = this,
      r8 = z8.tttt,
      d8 = z8.ttdl;
    try {
      cg3 = fn.a2i(cg3);
      if (cg3 > 3) { return; };
      z8.idma = fn.a2i(z8.idma);
      if (z8.idma < 1) { return; }
      z8.cv = 0;
      z8.zcv = 1;
      plgia = d8.plgia || 'dutoan';
      baogia = d8.baogia;
      cpql = r8.cpql;
      d8 = {};
      r8 = {};
      r8.baogia = baogia;
      r8.plgia = plgia;
      r8.cpql = cpql;
      idb.nap.qtgt({ prog: 'qtgt', idma: z8.idma });
    } catch (err) {
      cg3 += 1;
      setTimeout(() => { z8.nap(cg3); }, z8.ztg);
      return;
    }
    console.log("end ct qtgt.nap=", JSON.stringify(z8, null, 2));
  },
};

const chiphi = {
  ztg: 222,
  cv: 0, zcv: 1,
  tagid: 'oc_cpxd_r1_c1',
  plcp: 'cpxd',
  stim: '',
  lua: '123',
  z1: { idma: 123, mota: '', dvt: '' },
  ttdl: {},
  d8: {
    '1': { plcp: 'cpvt', mota: 'chiphi 1', dvt: 'dvt 1', qrcode: '', barcode: '1', tjan: 0 },
    '2': { plcp: 'cpvt', mota: 'chiphi 2', dvt: 'dvt 2', qrcode: '', barcode: '1', tjan: 0 },
  },
  l8: [
    { idma: "Mã chi phí", mota: "Mô tả chi phí", dvt: "Đvt" },
  ],
  loc: function (cg3 = 0) {
    let k, r, s, ss, mota, plcp,
      z8 = this,
      d8 = z8.d8,
      l8 = [{ idma: "Mã chi phí", mota: "Mô tả chi phí", dvt: "Đvt" },];
    try {
      cg3 = fn.a2i(cg3);
      if (cg3 > 3) { return; };
      plcp = fn.a2sl(z8.plcp);
      s = fn.a2sl(z8.stim);
      for (k in d8) {
        r = { ...d8[k] };
        ss = fn.a2sl(r);
        if (r.plcp === plcp && ss.includes(s)) {
          r.idma = k;
          mota = r.mota.qtgt || r.mota;
          r.mota = fn.stomau(mota, s);
          r.dvt = fn.stomau(r.dvt, s);
          l8.push(r);
        }
      }
      l8 = l8.sort((a, b) => b.idma - a.idma);
      z8.l8 = l8;
    } catch (err) {
      cg3 += 1;
      setTimeout(() => { z8.loc(cg3); }, z8.ztg);
      return;
    }
    z8.xem();
  },
  xem: function (cg3 = 0) {
    let tagid, zone, row, rec,
      z8 = this,
      l8 = z8.l8;
    //try {
      cg3 = fn.a2i(cg3);
      if (cg3 > 3) { return; };
      if (l8.length < 1) { return; }
      tagid = fn.a2sl(z8.tagid);
      if (tagid.charAt(0) !== '#') { tagid = '#' + tagid; }
      d3.selectAll("#xem").remove();
      zone = d3.select(tagid).append("ol")
        .attr("id", "xem")
        .style("list-style", "none")
        .style("margin", 0)
        .style("padding", 0)
        .style("max-height", "10.25rem")
        .style("overflow-y", "auto")
        .style("border", "1px solid #d4d4d4");
      //input
      zone.append("li").append('input')
      //ltim

      //lua
      rec = zone.selectAll("li").data(l8);
      row = rec.exit().remove();
      row = rec.enter()
        .append("li")
        .attr("id", (d, i) => ['chiphi', i, 0].join('__'))
        .attr("class", (d, i) => i == 0 ? 'nen0' : 'l')
        .style("display", "grid")
        .style("grid", "auto-flow minmax(1rem, max-content)/3fr 8fr 1fr")
        .on("click", (ev, d) => {
          if (ev.target.id != 'chiphi__0__0') {
            z8.lua = d.idma;
            zone.remove();
          }
        });
      //cells
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
        .html(d => d.idma);
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
        .html(d => d.mota);
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
    //} catch (err) {
    //  cg3 += 1;
    //  setTimeout(() => { z8.xem(cg3); }, z8.ztg);
    //  return;
    //}
  },
  gom: function (cg3 = 0) {
    let z8 = this;
    try {
      cg3 = fn.a2i(cg3);
      if (cg3 > 3) { return; };
      idb.gom.chiphi({ prog: 'chiphi', }, z8, 0);
    } catch (err) {
      cg3 += 1;
      setTimeout(() => { z8.gom(cg3); }, z8.ztg);
      return;
    }
  },
};

const bgvl = {
  ten: "bgvl",
  cv: 0, zcv: 1,
  ztg: 111,
  tjan: Date.now(),
  idma: 123,
  d8: {
    '20190725': {
      '1': { dutoan: 123, ketoan: 456, tjan: 0 },
      '2': { dutoan: 123, ketoan: 456, tjan: 0 },
    },
    '20190821': {
      '1': { dutoan: 1234, ketoan: 4567, tjan: 0 },
      '2': { dutoan: 1234, ketoan: 4567, tjan: 0 },
    },
  },
  nap: function (cg3 = 0) {
    let i, r,
      z8 = this,
      d8 = z8.d8 || {};
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
    { chiphi: 100, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
    { chiphi: 200, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
    { chiphi: 300, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }
  ],
  l8_: [
    { chiphi: 0, soluong: 0, mota: '', dvt: '', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 0, tienmtc: 0 }
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
    console.log("end ct ", z8.ten, ".xem=", JSON.stringify(z8, null, 2));
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
        //web.box.chiphi(el, d, stim);
      })
      .on("click", function (ev, d) {
        if (d3.select("#xem").node()) {
          d3.selectAll("#xem").remove();
          d3.select(ev.target).classed("fito", true);
        } else {
          let el = ev.target.parentNode,
            stim = ev.target.value;
          d3.select(ev.target).classed("fito", false);
          //web.box.chiphi(el, d, stim);
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
      tag = fn.a2sl(this.ten),
      z8 = this,
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

const sw = {
  url: null,
  nv: {},
  moi: function (w = 1) {
    let z8 = this;
    if (window.Worker) {
      if (!z8.url) { z8.url = d3.select("#qtgt").attr("data-nv"); }
    }
    z8.nv[w] = new Worker(z8.url);
    return z8.nv[w];
  },
  xoa: function (w = 1) {
    let z8 = this;
    if (z8.nv[w]) { z8.nv[w].terminate(); }
    z8.nv[w] = null;
  },
};

const idb = {
  csdl: { ten: 'CnTĐ', cap: 1 },
  ztg: 333,
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
  gom: {
    cpx: (dk = { baogia: app.baogia, plgia: app.plgia }, zd8 = app.cpx, cg3 = 0) => {
      try {
        if (Object.keys(dk).length === 0) { return; }
        if (Object.keys(zd8.d8).length === 0 || zd8.cv === 100) { return; }
        cg3 = fn.a2i(cg3);
        if (cg3 > 3) { return; };
      } catch (err) { return; }
      const maxrec = 2000;
      let tin, gui, i, k, k3, v, r, phui, plcp, idma, plgia, baogia, chiphi, d1, d8, l8, nook,
        cv = 0, zcv,
        w = {},
        zdl = zd8.d8;
      l8 = [];
      for (k in zdl) {
        r = zdl[k];
        r.chiphi = k;
        l8.push(r);
      }
      l8 = l8.sort((a, b) => b.idma - a.idma);
      for (i in l8) {
        d1 = l8[i];
        if (i + 1 > maxrec && 'giavl' in d1 && 'gianc' in d1 && 'giamtc' in d1 && 'giatl' in d1) {
          k = d1.chiphi;
          if (k in zdl) { delete zdl[k]; }
        }
      }
      zcv = l8.length;
      if (zcv < 1) { return; };
      //check new cp
      baogia = fn.a2i(dk.baogia);
      plgia = fn.a2sl(dk.plgia);
      if (baogia !== zd8.baogia || plgia !== zd8.plgia) {
        zd8.plgia = plgia;
        zd8.baogia = baogia;
        for (k in zdl) {
          d1 = zdl[k];
          d1.baogia = baogia;
          d1.chiphi = k;
          d1.plgia = plgia;
          d1.idma = [baogia, k, plgia].join('.');
          if ('giavl' in d1) { delete d1.giavl }
          if ('gianc' in d1) { delete d1.gianc }
          if ('giamtc' in d1) { delete d1.giamtc }
          if ('giatl' in d1) { delete d1.giatl }
        }
      }
      zd8.cv = 0;
      for (k in zdl) {
        d1 = zdl[k];
        if (!('mota' in d1) || !('dvt' in d1)) {
          nook = true;
          idb.nap.chiphi({ idma: d1.chiphi }, d1, 0);
        };
        if (!('giavl' in d1)) {
          nook = true;
          idb.nap.baogia({ baogia: baogia, plgia: plgia, plbg: 'bgvl', chiphi: d1.chiphi }, d1, 0);
        };
        if (!('gianc' in d1)) {
          nook = true;
          idb.nap.bgvl();
        };
        if (!('giamtc' in d1)) {
          nook = true;
          idb.nap.bgvl();
        };
        if (!('giall' in d1)) {
          nook = true;
          idb.nap.bgvl();
        };
      }
      setTimeout(() => { idb.gom.zcpx(); }, 100);
    },
    chiphi: (dk = { prog: 'chiphi', tjan: 0 }, zdl = chiphi, cg3 = 0) => {
      let w, hoi, dap, d1r, d1s, k, r;
      try {
        cg3 = fn.a2i(cg3);
        if (cg3 > 3) { return; };
        if (Object.keys(dk).length < 1) { return; }
        dk.prog = fn.a2sl(dk.prog);
        dk.tjan = cg3 === 0 ? 0 : fn.a2i(dk.tjan);
        //main
        w = sw.moi('chiphi');
        hoi = {
          csdl: idb.csdl,
          gom: dk,
        };
        console.log("idb.gom.chiphi hoi=", JSON.stringify(hoi, null, 2));
        w.postMessage(hoi);
        w.onmessage = (e) => {
          dap = e.data;
          if (dap.cv >= 0 && dap.cv <= 100) {
            d1r = 'chiphi' in dap ? dap.chiphi : {};
            k = d1r.idma || d1r.maid;
            if ('ttdl' in d1r || 'data' in d1r) {
              r = d1r.ttdl || d1r.data;
              zdl.d8[k] = { ...r };
              zdl.d8[k].mota = r.mota.qtgt || r.mota;
              zdl.tjan = Date.now();
            };
            web.tiendo(dk.prog, dap.cv);
          } else if (dap.cv < 0 || dap.cv > 100) {
            sw.xoa('chiphi');
            console.log("nv fin=", JSON.stringify(dap, null, 2));
          } else if ("err" in dap) {
            console.log("nv err=", JSON.stringify(dap.err, null, 2));
          } else if ("info" in dap) {
            console.log("nv info=", JSON.stringify(dap.info, null, 2));
          } else {
            console.log("nv dap=", JSON.stringify(dap, null, 2));
          }
          console.log("idb.gom.chiphi=", JSON.stringify(chiphi, null, 2));
        }
      } catch (err) {
        cg3 += 1;
        setTimeout(() => { idb.gom.chiphi(cg3); }, idb.ztg);
      }
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
    cpx: (dk = { prog: 'chiphi', idma: null }, cg3 = 0) => {
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

const web = {
  tagid: '',
  hov: { mau1: "yellow", mau2: "#9999ff" },

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
        maxR = oc_cpxd.l8.length + oc_cpxd.l8_.length;
        maxC = 9;
        if (row > maxR) {
          zone = 'oc_cpvt';
          row = 0;
        };
        if (row < 0) {
          zone = 'oc_cpvl';
          row = oc_cpvl.l8.length + oc_cpvl.l8_.length;
        };
        break;
      case 'oc_cpvt':
        maxR = oc_cpvt.l8.length + oc_cpvt.l8_.length;
        maxC = 9;
        if (row > maxR) {
          zone = 'oc_cpvl';
          row = 1;
          col = 0;
        };
        if (row < 0) {
          zone = 'oc_cpxd';
          row = oc_cpxd.l8.length + oc_cpxd.l8_.length;
          col = 0;
        };
        break;
      case 'oc_cpvl':
        maxR = oc_cpvl.l8.length + oc_cpvl.l8_.length;
        maxC = 9;
        if (row > maxR) {
          zone = 'oc_cpxd';
          row = 1;
          col = 0;
        };
        if (row < 0) {
          zone = 'oc_cpvt';
          row = oc_cpvt.l8.length + oc_cpvt.l8_.length;
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

function ud() {
  //idb.taodb();
  oc_cpxd.xem(0);
  oc_cpvt.xem(0);
}

ud();
