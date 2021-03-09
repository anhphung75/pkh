import { d2l, lamtronso, viewso } from "./../../utils.js"

d3.formatDefaultLocale({
  decimal: ",",
  thousands: ".",
  grouping: [3],
  currency: ["", "VNĐ"]
});

var app = {
  url: null,
  prog: 100,
  nam: new Date().getFullYear().toString(),
  plqt: "GMMP",
  dvtc: '1',
  dot: '1',
  hoso: '1',
  qtgt: '1',
  plgia: 'dutoan',
  mabaogia: 20210101,
  macpql: 20200827,
  chiphi: -1,
  idcptl: 1615263347491,
  oc: {
    zvl: 0,
    znc: 0,
    zmtc: 0,
    ztl: 0,
    idcpxd: 1615263347491,
    idcpvt: 1615263347491,
    idcpvl: 1615263347491,
    cpxd: [
      { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
      { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
      { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }
    ],
    cpvt: [
      { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
      { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
      { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }
    ],
    cpvl: [
      { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
      { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
      { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }
    ],
  },
  on: {
    zvl: 0,
    znc: 0,
    zmtc: 0,
    ztl: 0,
    cpxd: [
      { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
      { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
      { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }
    ],
    cpvt: [
      { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
      { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
      { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }
    ],
    cpvl: [
      { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
      { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
      { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }
    ],
  },
  cptl: {
    '1': { chiphi: 1, mota: 'cp1', dvt: 'cai', oc_sl: 0, on_sl: 0, gia: 0, oc_tien: 0, on_tien: 10 },
    '2': { chiphi: 2, mota: 'cp2', dvt: 'cai', oc_sl: 0, on_sl: 0, gia: 0, oc_tien: 0, on_tien: 200 },
    '3': { chiphi: 3, mota: 'cp3', dvt: 'cai', oc_sl: 0, on_sl: 0, gia: 0, oc_tien: 0, on_tien: 5510 }
  },
};

var ga = {
  tieude: {
    cpxd: ['Tt', 'Mô tả công tác', 'Đvt', 'Số lượng', 'Giá vật liệu', 'Giá nhân công', 'Giá mtc', 'Tiền vật liệu', 'Tiền nhân công', 'Tiền mtc'],
    cpvt: ['Tt', 'Mô tả vật tư', 'Đvt', 'Số lượng', 'Giá vật liệu', 'Giá nhân công', 'Giá mtc', 'Tiền vật liệu', 'Tiền nhân công', 'Tiền mtc'],
    cpvl: ['Tt', 'Mô tả vật liệu', 'Đvt', 'Số lượng', 'Giá vật liệu', 'Giá nhân công', 'Giá mtc', 'Tiền vật liệu', 'Tiền nhân công', 'Tiền mtc'],
    cptl: ['Tt', 'Kết cấu tái lập', 'Đvt', 'Số lượng oc', 'Số lượng on', 'Giá', 'Tiền ống cái', 'Tiền ống nhánh'],
    chiphi: {
      xd: ['Mo ta', 'Đvt', 'idma'],
      vt: ['Mo ta', 'Đvt', 'idma'],
      vl: ['Mo ta', 'Đvt', 'idma'],
      tl: ['Mo ta', 'Đvt', 'idma']
    },
  },
  nam: {
    'tieude': { show: 'Năm', mota: 'Mô tả' },
    '0': { show: '...', mota: '(không chọn)' },
    '2021': { show: '2021', mota: '2021' },
    '2020': { show: '2020', mota: '2020' },
    '2019': { show: '2019', mota: '2019' },
  },
  plqt: {
    'tieude': { show: 'Plqt', mota: 'Mô tả' },
    '0': { show: '...', mota: '(không chọn)' },
    'GMMP': { show: 'GMMP', mota: 'Gắn mới miễn phí' },
    'GMDT': { show: 'GMDT', mota: 'Gắn mới đóng tiền' },
    'TLMP': { show: 'TLMP', mota: 'Tái lập danh bộ miễn phí' },
    'TLDT': { show: 'TLDT', mota: 'Tái lập danh bộ đống tiền' },
  },
  dvtc: {
    'tieude': { show: 'Đvtc', mota: 'Mô tả' },
    '0': { show: '...', mota: '(không chọn)' },
    '1': { show: 'PKH', mota: 'Phòng kế hoạch' },
    '2': { show: 'QLMLQ2', mota: 'Quản lý mạng lưới quận 2' },
    '3': { show: 'QLMLQ9', mota: 'Quản lý mạng lưới quận 9' },
    '4': { show: 'QLMLTD', mota: 'Quản lý mạng lưới quận Thủ Đức' },
  },
  dot: {
    'tieude': { show: 'Mã đợt', mota: 'Số đợt' },
    '0': { show: '...', mota: '(không chọn)' },
    '1': { show: 'GMMP001', mota: '001/21MP' },
    '2': { show: 'GMMP002', mota: '002/21MP' },
    '3': { show: 'GMMP003', mota: '003/21MP' },
    '4': { show: 'GMMP004', mota: '004/21MP' },
    '5': { show: 'GMMP005', mota: '005/21MP' },
    '6': { show: 'GMMP006', mota: '006/21MP' },
    '7': { show: 'GMMP007', mota: '007/21MP' },
    '8': { show: 'GMMP008', mota: '008/21MP' },
    '9': { show: 'GMMP009', mota: '009/21MP' },
  },
  hoso: {
    'tieude': { show: 'Mã hồ sơ', mota: 'Số hồ sơ' },
    '0': { show: '...', mota: '(không chọn)' },
    '1': { show: 'GMMP001', mota: '001/21MP' },
    '2': { show: 'GMMP002', mota: '002/21MP' },
    '3': { show: 'GMMP003', mota: '003/21MP' },
    '4': { show: 'GMMP004', mota: '004/21MP' },
    '5': { show: 'GMMP005', mota: '005/21MP' },
    '6': { show: 'GMMP006', mota: '006/21MP' },
    '7': { show: 'GMMP007', mota: '007/21MP' },
    '8': { show: 'GMMP008', mota: '008/21MP' },
    '9': { show: 'GMMP009', mota: '009/21MP' },
  },
  chiphi: {
    '1': { idma: 1, plcp: 'cpxd', mota: { qtgt: 'cp1', qtvt: 'cp01' }, dvt: 'cai' },
    '2': { idma: 2, plcp: 'cpxd', mota: { qtgt: 'cp2', qtvt: 'cp01' }, dvt: 'cai' },
    '3': { idma: 3, plcp: 'cpxd', mota: { qtgt: 'cp3', qtvt: 'cp01' }, dvt: 'cai' },
    '4': { idma: 4, plcp: 'cpxd', mota: { qtgt: 'cp4', qtvt: 'cp01' }, dvt: 'cai' },
    '5': { idma: 5, plcp: 'cpxd', mota: { qtgt: 'cp5', qtvt: 'cp01' }, dvt: 'cai' },
    '6': { idma: 6, plcp: 'cpxd', mota: { qtgt: 'cp6', qtvt: 'cp01' }, dvt: 'cai' },
    '7': { idma: 7, plcp: 'cpvt', mota: { qtgt: 'cp1', qtvt: 'cp01' }, dvt: 'cai' },
    '8': { idma: 8, plcp: 'cpvt', mota: { qtgt: 'cp2', qtvt: 'cp01' }, dvt: 'cai' },
    '9': { idma: 9, plcp: 'cpvt', mota: { qtgt: 'cp3', qtvt: 'cp01' }, dvt: 'cai' },
    '10': { idma: 10, plcp: 'cptl', mota: { qtgt: 'cp4', qtvt: 'cp01' }, dvt: 'cai' },
    '11': { idma: 11, plcp: 'cptl', mota: { qtgt: 'cp5', qtvt: 'cp01' }, dvt: 'cai' },
    '12': { idma: 12, plcp: 'cptl', mota: { qtgt: 'cp6', qtvt: 'cp01' }, dvt: 'cai' },
  },
  cpql: { ma: 20200827 },
  bgvl: {
    'dutoan.20210101.1': 1123,
    'ketoan.20210101.1': 1245,
    'dutoan.20210101.2': 1123,
    'ketoan.20210101.2': 1245,
    'dutoan.20210101.3': 1123,
    'ketoan.20210101.3': 1245,
  },
  bgnc: {
    'dutoan.20210101.1': 23456,
    'ketoan.20210101.1': 1245,
    'dutoan.20210101.2': 1123,
    'ketoan.20210101.2': 1245,
    'dutoan.20210101.3': 1123,
    'ketoan.20210101.3': 1245,
  },
  bgmtc: {
    'dutoan.20210101.1': 789500,
    'ketoan.20210101.1': 1245,
    'dutoan.20210101.2': 1123,
    'ketoan.20210101.2': 1245,
    'dutoan.20210101.3': 1123,
    'ketoan.20210101.3': 1245,
  },
  bgtl: {
    'dutoan.20210101.1': 189478,
    'ketoan.20210101.1': 1245,
    'dutoan.20210101.2': 1123,
    'ketoan.20210101.2': 1245,
    'dutoan.20210101.3': 1123,
    'ketoan.20210101.3': 1245,
  },


  tttt: "",
  ltttt: [],
  mascan: '',
  otim: null,
  dulieu: {},

  noidung: [],
  colsBE: [],
  url: {},
};

var web = {
  tagid: '',
  hov: { mau1: "yellow", mau2: "#9999ff" },
  tao: () => {
    web.sw_url();
    web.otim.nam();
    web.otim.plqt();
    web.otim.dvtc();
    web.otim.dot();
    web.otim.hoso();
    web.oc.tieude();
    web.oc.cpxd();
    web.oc.bth();
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
  sw_url: () => {
    if (!app.url) { app.url = {}; }
    app.url["api"] = [
      ["https://", window.location.host, "/", idb.csdl.ten, "/api/hoso/", ga.namlamviec].join(''),
      ["https://", window.location.host, "/", idb.csdl.ten, "/api/dshc/", ga.namlamviec].join(''),
    ];
    app.url["wss"] = ["wss://", window.location.host, "/", idb.csdl.ten, "/wss/hoso"].join('');
    app.url["swidb"] = d3.select("#qtgt").attr("data-swidb");
    app.url["swapi"] = d3.select("#qtgt").attr("data-swapi");
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
    cpxd: (idma = null) => {
      if (!idma) {
        return;
      } else {
        if (!app.oc.idcpxd || idma !== app.oc.idcpxd) {
          app.oc.idcpxd = idma;
          //cpxd=[{"chiphi":123,"soluong":12.5},]
          idb.nap.oc.cpxd(idma);

        }
      }
      let zone, i, r, row, o, dl,
        dulieu = [],
        zdl = app.oc.cpxd;
      if (zdl.constructor !== Array) { return; }
      for (i in zdl) {
        r = zdl[i];
        //tra lai chiphi
        dl = ga.chiphi[r.chiphi];
        r.mota = dl.mota.qtgt;
        r.dvt = dl.dvt;
        //tra lai gia
        o = [app.plgia, app.mabaogia, r.chiphi].join('.');
        r.giavl = ga.bgvl[o] || 0;
        r.gianc = ga.bgnc[o] || 0;
        r.giamtc = ga.bgmtc[o] || 0;
        //tinh lai tien
        r.tienvl = lamtronso(r.soluong * r.giavl, 0);
        r.tiennc = lamtronso(r.soluong * r.gianc, 0);
        r.tienmtc = lamtronso(r.soluong * r.giamtc, 0);
        r.tt = i;
        r.plcp = 'cpxd';
        r.plqt = 'oc';
        dulieu.push(r);
      }
      //main
      zone = d3.select("#oc_cpxd")
        .style("list-style", "none")
        .style("margin", 0)
        .style("padding", 0)
        .style("max-height", "10.25rem")
        .style("overflow-y", "auto")
        .style("border", "1px solid #d4d4d4");
      zone.selectAll('li').remove();
      row = zone.selectAll("li").data(dulieu).enter().append("li")
        .style("display", "grid")
        //.style("align-items", "center")
        .style("grid", "auto-flow minmax(1rem, max-content) / 30fr 185fr 30fr 40fr 50fr 40fr 40fr 50fr 45fr 45fr");

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
            let r = app.oc.cpxd[d.tt];
            console.log("origine app.oc.cpxd[", d.tt, "]=", JSON.stringify(r));
            console.log("soluong moi=", v);
            r.soluong = v;
            r.tienvl = lamtronso(r.soluong * r.giavl, 0);
            r.tiennc = lamtronso(r.soluong * r.gianc, 0);
            r.tienmtc = lamtronso(r.soluong * r.giamtc, 0);
            ev.target.style.height = 'auto';
            ev.target.style.height = [ev.target.scrollHeight, 'px'].join('');
            console.log("update app.oc.cpxd[", d.tt, "]=", JSON.stringify(r));
          }
          web.oc.cpxd();
          web.oc.bth();
        })
        .on("keydown", function (ev, d) {
          if ([13].includes(ev.keyCode)) {
            ev.preventDefault();
            let v = Math.abs(parseFloat(ev.target.value)) || 0;
            if (v > 0) {
              let r = app.oc.cpxd[d.tt];
              console.log("origine app.oc.cpxd[", d.tt, "]=", JSON.stringify(r));
              console.log("soluong moi=", v);
              r.soluong = v;
              r.tienvl = lamtronso(r.soluong * r.giavl, 0);
              r.tiennc = lamtronso(r.soluong * r.gianc, 0);
              r.tienmtc = lamtronso(r.soluong * r.giamtc, 0);
              ev.target.style.height = 'auto';
              ev.target.style.height = [ev.target.scrollHeight, 'px'].join('');
              console.log("update app.oc.cpxd[", d.tt, "]=", JSON.stringify(r));
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
    cpvt: () => {
      let bang = d3.select("table[id='oc_cpvt']")
        .attr("class", "w100")
        .style("table-layout", "auto")
        .style("border-collapse", "separate")
        .style("border-spacing", "1px 1px")
        .style("overflow", "auto")
        .style("margin", "0");

      //tieude
      bang.selectAll("th").data(ga.tieude.cpvt)
        .enter()
        .append("th")
        .attr("class", "c")
        .text((col) => col);

      //rows
      bang.selectAll("tr").remove();
      let row = bang.selectAll("tr").data(ga.oc.cpvt).enter().append("tr");
      row.append('td')
        .attr("class", "c bb")
        .text((d, i) => {
          let v = i + 1;
          switch (v) {
            case v >= 0 && v < 10:
              return '00'.concat(i);
            case v >= 10 && v < 100:
              return '0'.concat(i);
            default:
              return v;
          }
        });
      row.append('td')
        .attr("class", "bb")
        .append('input')
        .attr("class", (d, i) => "l oc_cpvt col1 row" + i)
        .attr("data-stt", (d, i) => i)
        .attr("value", (d) => d.mota)
        .on("change", (ev) => {
          //try {
          let stt = ev.target.dataset.stt;
          let v = ev.target.value || '';
          console.log('mota change=', v, ' stt=', stt, ' ev=', ev.target);
          if (v.length > 0) {
            let r = ga.oc.cpvt[stt];
            r.mota = v;
            //tinh lai gia chi phi
            idb.tinh.oc.cpvt(stt);
          }
          web.oc.cpvt();
          web.oc.bth();
          web.move2id('oc_cpvt', stt, 1, 13);
          //} catch (err) {
          //console.log("err=", JSON.stringify(err));
          //web.oc.cpvt();
          //}
        })
        .on("keydown", function (ev) {
          if ([13, 40, 38].includes(ev.keyCode)) {
            web.move2id('oc_cpvt', ev.target.dataset.stt, 1, ev.keyCode);
          }
        });
      row.append('td')
        .attr("class", "c bb")
        .text((d) => d.dvt);
      row.append('td')
        .attr("class", "bb")
        .append('input')
        .attr("class", (d, i) => "r oc_cpvt col3 row" + i)
        .attr("data-stt", (d, i) => i)
        .attr("value", (d) => viewso(d.soluong, 0))
        .on("change", (ev) => {
          try {
            let stt = ev.target.dataset.stt;
            let v = Math.abs(parseFloat(ev.target.value)) || 0;
            if (v > 0) {
              let r = ga.oc.cpvt[stt];
              r.soluong = v;
              r.tienvl = lamtronso(r.soluong * r.giavl, 0);
              r.tiennc = lamtronso(r.soluong * r.gianc, 0);
              r.tienmtc = lamtronso(r.soluong * r.giamtc, 0);
            }
            web.oc.cpvt();
            web.oc.bth();
            web.move2id('oc_cpvt', stt, 3, 13);
          } catch (err) {
            web.oc.cpvt();
          }
        })
        .on("keydown", function (ev) {
          if ([13, 40, 38].includes(ev.keyCode)) {
            web.move2id('oc_cpvt', ev.target.dataset.stt, 3, ev.keyCode);
          }
        });
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.giavl, 0));
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.gianc, 0));
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.giamtc, 0));
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.tienvl, 0));
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.tiennc, 0));
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.tienmtc, 0));
    },
    cpvl: () => {
      let bang = d3.select("table[id='oc_cpvl']")
        .attr("class", "w100")
        .style("table-layout", "auto")
        .style("border-collapse", "separate")
        .style("border-spacing", "1px 1px")
        .style("overflow", "auto")
        .style("margin", "0");

      //tieude
      bang.selectAll("th").data(ga.tieude.cpvl)
        .enter()
        .append("th")
        .attr("class", "c")
        .text((col) => col);

      //rows
      bang.selectAll("tr").remove();
      let row = bang.selectAll("tr").data(ga.oc.cpvl).enter().append("tr");
      row.append('td')
        .attr("class", "c bb")
        .text((d, i) => {
          let v = i + 1;
          switch (v) {
            case v >= 0 && v < 10:
              return '00'.concat(i);
            case v >= 10 && v < 100:
              return '0'.concat(i);
            default:
              return v;
          }
        });
      row.append('td')
        .attr("class", "bb")
        .append('input')
        .attr("class", (d, i) => "l oc_cpvl col1 row" + i)
        .attr("data-stt", (d, i) => i)
        .attr("value", (d) => d.mota)
        .on("change", (ev) => {
          //try {
          let stt = ev.target.dataset.stt;
          let v = ev.target.value || '';
          console.log('mota change=', v, ' stt=', stt, ' ev=', ev.target);
          if (v.length > 0) {
            let r = ga.oc.cpvl[stt];
            r.mota = v;
            //tinh lai gia chi phi
            idb.tinh.oc.cpvl(stt);
          }
          web.oc.cpvl();
          web.oc.bth();
          web.move2id('oc_cpvl', stt, 1, 13);
          //} catch (err) {
          //console.log("err=", JSON.stringify(err));
          //web.oc.cpvl();
          //}
        })
        .on("keydown", function (ev) {
          if ([13, 40, 38].includes(ev.keyCode)) {
            web.move2id('oc_cpvl', ev.target.dataset.stt, 1, ev.keyCode);
          }
        });
      row.append('td')
        .attr("class", "c bb")
        .text((d) => d.dvt);
      row.append('td')
        .attr("class", "bb")
        .append('input')
        .attr("class", (d, i) => "r oc_cpvl col3 row" + i)
        .attr("data-stt", (d, i) => i)
        .attr("value", (d) => viewso(d.soluong, 0))
        .on("change", (ev) => {
          try {
            let stt = ev.target.dataset.stt;
            let v = Math.abs(parseFloat(ev.target.value)) || 0;
            if (v > 0) {
              let r = ga.oc.cpvl[stt];
              r.soluong = v;
              r.tienvl = lamtronso(r.soluong * r.giavl, 0);
              r.tiennc = lamtronso(r.soluong * r.gianc, 0);
              r.tienmtc = lamtronso(r.soluong * r.giamtc, 0);
            }
            web.oc.cpvl();
            web.oc.bth();
            web.move2id('oc_cpvl', stt, 3, 13);
          } catch (err) {
            web.oc.cpvl();
          }
        })
        .on("keydown", function (ev) {
          if ([13, 40, 38].includes(ev.keyCode)) {
            web.move2id('oc_cpvl', ev.target.dataset.stt, 3, ev.keyCode);
          }
        });
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.giavl, 0));
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.gianc, 0));
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.giamtc, 0));
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.tienvl, 0));
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.tiennc, 0));
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.tienmtc, 0));
    },
    bth: () => {
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
        .text((d) => viewso(d, 0));
      d3.select("#oc_znc").data([self.znc])
        .attr("class", "fb")
        .text((d) => viewso(d, 0));
      d3.select("#oc_zmtc").data([self.zmtc])
        .attr("class", "fb")
        .text((d) => viewso(d, 0));
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

  on: {
    bth: () => {
      let zone, kiem, self;
      zone = d3.select("section[id='ongnganh']");
      kiem = zone.select(".ongnganh")
        .attr("data-show", "true")
        .on("click", (ev) => {
          if (kiem.attr("data-show") === "true") {
            zone.selectAll("table").classed("hide", false);
            kiem.attr("data-show", "false");
          } else {
            zone.selectAll("table").classed("hide", true);
            kiem.attr("data-show", "true");
          }
        });
      if (!('on' in ga)) { ga.on = { zvl: 0, znc: 0, zmtc: 0 }; }
      self = ga.on;
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
      d3.select("div[id='on_zvl']").data([self.zvl])
        .attr("class", "fb")
        .text((d) => viewso(d, 0));
      d3.select("div[id='on_znc']").data([self.znc])
        .attr("class", "fb")
        .text((d) => viewso(d, 0));
      d3.select("div[id='on_zmtc']").data([self.zmtc])
        .attr("class", "fb")
        .text((d) => viewso(d, 0));
    },
    cpxd: () => {
      let bang = d3.select("table[id='on_cpxd']")
        .attr("class", "w100")
        .style("table-layout", "auto")
        .style("border-collapse", "separate")
        .style("border-spacing", "1px 1px")
        .style("overflow", "auto")
        .style("margin", "0");

      //tieude
      bang.selectAll("th").data(ga.tieude.cpxd)
        .enter()
        .append("th")
        .attr("class", "c")
        .text((col) => col);

      //rows
      bang.selectAll("tr").remove();
      let row = bang.selectAll("tr").data(ga.on.cpxd).enter().append("tr");
      row.append('td')
        .attr("class", "c bb")
        .text((d, i) => {
          let v = i + 1;
          switch (v) {
            case v >= 0 && v < 10:
              return '00'.concat(i);
            case v >= 10 && v < 100:
              return '0'.concat(i);
            default:
              return v;
          }
        });
      row.append('td')
        .attr("class", "bb")
        .append('input')
        .attr("class", "l b0")
        .attr("data-stt", (d, i) => i)
        .attr("value", (d) => d.mota)
        .on("change", (ev, d) => {
          console.log('ev=', ev.target);
          let stt = ev.target.dataset.stt;
          let v = ev.target.value || '';
          if (v.length > 0) {
            let r = ga.on.cpxd[stt];
            r.mota = v;
            r.soluong = v;
            r.tienvl = lamtronso(r.soluong * r.giavl);
            r.tiennc = lamtronso(r.soluong * r.gianc);
            r.tienmtc = lamtronso(r.soluong * r.giamtc);
          }
          web.on_cpxd();
          web.ongnganh();
        });

      row.append('td')
        .attr("class", "c bb")
        .text((d) => d.dvt);
      row.append('td')
        .attr("class", "bb")
        .append('input')
        .attr("class", "r")
        .attr("data-stt", (d, i) => i)
        .attr("value", (d) => viewso(d.soluong, 0))
        .on("change", (ev, d) => {
          let stt = ev.target.dataset.stt;
          let v = parseFloat(ev.target.value) || 0;
          if (v > 0) {
            let r = ga.on_cpxd[stt];
            r.soluong = v;
            r.tienvl = lamtronso(v * r.giavl);
            r.tiennc = lamtronso(v * r.gianc);
            r.tienmtc = lamtronso(v * r.giamtc);
          }
          web.on_cpxd();
        });
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.giavl, 0));
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.gianc, 0));
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.giamtc, 0));
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.tienvl, 0));
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.tiennc, 0));
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.tienmtc, 0));
    },
    cpvt: () => {
      let bang = d3.select("table[id='on_cpvt']")
        .attr("class", "w100")
        .style("table-layout", "auto")
        .style("border-collapse", "separate")
        .style("border-spacing", "1px 1px")
        .style("overflow", "auto")
        .style("margin", "0");

      //tieude
      bang.selectAll("th").data(ga.tieude.cpvt)
        .enter()
        .append("th")
        .attr("class", "c")
        .text((col) => col);

      //rows
      bang.selectAll("tr").remove();
      let row = bang.selectAll("tr").data(ga.on_cpvt).enter().append("tr");
      row.append('td')
        .attr("class", "c bb")
        .text((d, i) => {
          let v = i + 1;
          switch (v) {
            case v >= 0 && v < 10:
              return '00'.concat(i);
            case v >= 10 && v < 100:
              return '0'.concat(i);
            default:
              return v;
          }
        });
      row.append('td')
        .attr("class", "bb")
        .append('input')
        .attr("class", "l b0")
        .attr("data-stt", (d, i) => i)
        .attr("value", (d) => d.mota)
        .on("change", (ev) => {
          let stt = ev.target.dataset.stt;
          let v = ev.target.value || '';
          if (v.length > 0) {
            ga.on_cpvt[stt].mota = v;
          }
          web.on_cpvt();
        });
      row.append('td')
        .attr("class", "c bb")
        .text((d) => d.dvt);
      row.append('td')
        .attr("class", "bb")
        .append('input')
        .attr("class", "r")
        .attr("data-stt", (d, i) => i)
        .attr("value", (d) => viewso(d.soluong, 0))
        .on("change", (ev, d) => {
          let stt = ev.target.dataset.stt;
          let v = parseFloat(ev.target.value) || 0;
          if (v > 0) {
            ga.on_cpvt[stt].soluong = v;
          }
          web.on_cpvt();
        });
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.giavl, 0));
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.gianc, 0));
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.giamtc, 0));
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.tienvl, 0));
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.tiennc, 0));
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.tienmtc, 0));
    },
    cpvl: () => {
      let bang = d3.select("table[id='on_cpvl']")
        .attr("class", "w100")
        .style("table-layout", "auto")
        .style("border-collapse", "separate")
        .style("border-spacing", "1px 1px")
        .style("overflow", "auto")
        .style("margin", "0");

      //tieude
      bang.selectAll("th").data(ga.tieude.cpvl)
        .enter()
        .append("th")
        .attr("class", "c")
        .text((col) => col);

      //rows
      bang.selectAll("tr").remove();
      let row = bang.selectAll("tr").data(ga.on_cpvl).enter().append("tr");
      row.append('td')
        .attr("class", "c bb")
        .text((d, i) => {
          let v = i + 1;
          switch (v) {
            case v >= 0 && v < 10:
              return '00'.concat(i);
            case v >= 10 && v < 100:
              return '0'.concat(i);
            default:
              return v;
          }
        });
      row.append('td')
        .attr("class", "bb")
        .append('input')
        .attr("class", "l b0")
        .attr("data-stt", (d, i) => i)
        .attr("value", (d) => d.mota)
        .on("change", (ev) => {
          let stt = ev.target.dataset.stt;
          let v = ev.target.value || '';
          if (v.length > 0) {
            ga.on_cpvl[stt].mota = v;
          }
          web.on_cpvl();
        });
      row.append('td')
        .attr("class", "c bb")
        .text((d) => d.dvt);
      row.append('td')
        .attr("class", "bb")
        .append('input')
        .attr("class", "r")
        .attr("data-stt", (d, i) => i)
        .attr("value", (d) => viewso(d.soluong, 0))
        .on("change", (ev, d) => {
          let stt = ev.target.dataset.stt;
          let v = parseFloat(ev.target.value) || 0;
          if (v > 0) {
            ga.on_cpvl[stt].soluong = v;
          }
          web.on_cpvl();
        });
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.giavl, 0));
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.gianc, 0));
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.giamtc, 0));
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.tienvl, 0));
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.tiennc, 0));
      row.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.tienmtc, 0));
    },
  },

  tlmd: {
    bth: () => {
      let zone, kiem, bang, rec, self;
      zone = d3.select("section[id='tlmd']");
      kiem = zone.select(".tlmd")
        .attr("data-show", "true")
        .on("click", (ev) => {
          if (kiem.attr("data-show") === "true") {
            zone.selectAll("table").classed("hide", false);
            kiem.attr("data-show", "false");
          } else {
            zone.selectAll("table").classed("hide", true);
            kiem.attr("data-show", "true");
          }
        });
      web.tlmd.cptl();
      ga.oc.ztl = ga.cptl.reduce(function (z, rec) { return z + rec.oc_tien }, 0);
      ga.on.ztl = ga.cptl.reduce(function (z, rec) { return z + rec.on_tien }, 0);
      d3.select("div[id='oc_ztl']").data([ga.oc.ztl])
        .attr("class", "fb")
        .text((d) => viewso(d, 0));
      d3.select("div[id='on_ztl']").data([ga.on.ztl])
        .attr("class", "fb")
        .text((d) => viewso(d, 0));
    },
    cptl: () => {
      let bang = d3.select("table[id='cptl']")
        .attr("class", "w100")
        .style("table-layout", "auto")
        .style("border-collapse", "separate")
        .style("border-spacing", "1px 1px")
        .style("overflow", "auto")
        .style("margin", "0");
      //tieude
      bang.selectAll("th").data(ga.tieude.cptl)
        .enter()
        .append("th")
        .attr("class", "c")
        .text((col) => col);
      //rows
      bang.selectAll("tr").remove();
      let rec = bang.selectAll("tr").data(ga.cptl).enter().append("tr");
      //cells
      rec.append('td')
        .attr("class", "c bb")
        .text((d, i) => {
          let v = i + 1;
          switch (v) {
            case v >= 0 && v < 10:
              return '0'.concat(i);
            default:
              return v;
          }
        });
      rec.append('td')
        .attr("class", "bb")
        .append('input')
        .attr("class", (d, i) => "l cptl col1 row" + i)
        .attr("data-stt", (d, i) => i)
        .attr("value", (d) => d.mota)
        .on("input", function (ev) {
          //hien show_chon de lua chi phi
          d3.select(ev.target).attr("data-isopen", "ok");
          web.box.chiphi(ev.target, "tlmd", ev.target.value);
        })
        .on("change", (ev) => {
          let stt = ev.target.dataset.stt,
            idma = ev.target.dataset.chiphi || 0;
          if (idma > 0) {
            ga.cptl[stt].idma = idma;
            ga.cptl[stt].chiphi = idma;
            d3.select(ev.target).attr("data-isopen", "no");
            try {
              d3.select("#comb-chiphi").remove();
            } catch (err) { }
            idb.tinh.cptl(stt);
            web.tlmd.cptl();
            web.tlmd.bth();
          }
          web.move2id('cptl', 1, stt, 13);
        })
        .on("keydown", function (ev) {
          if ([13].includes(ev.keyCode)) {
            web.move2id('cptl', ev.target.dataset.stt, 1, ev.keyCode);
          }
          if ([40, 38].includes(ev.keyCode)) {
            if (ev.target.dataset.isopen === 'ok') {
              let row;
              if ('rowchiphi' in ev.target.dataset) {
                row = ev.target.dataset.rowchiphi;
                row = row === '0' ? 0 : parseInt(row);
                d3.select(ev.target).attr("data-rowchiphi", row + 1);
              } else {
                row = 0;
                d3.select(ev.target).attr("data-rowchiphi", row + 1);
              }
              console.log("move2id chiphi")
              web.box.move2id('chiphi', row, 1, ev.keyCode);
            } else {
              console.log("move2id cptl")
              web.move2id('cptl', ev.target.dataset.stt, 1, ev.keyCode);
            }
          }
        });
      rec.append('td')
        .attr("class", "c bb")
        .text((d) => d.dvt);
      rec.append('td')
        .attr("class", "bb")
        .append('input')
        .attr("class", (d, i) => "r cptl col3 row" + i)
        .attr("data-stt", (d, i) => i)
        .attr("value", (d) => viewso(d.oc_sl, 0))
        .on("change", (ev, d) => {
          let stt = ev.target.dataset.stt,
            r = ga.cptl[stt];
          try {
            r.oc_sl = lamtronso(Math.abs(parseFloat(ev.target.value)), 3);
          } catch (err) { r.oc_sl = 0; };
          try {
            k = [ga.plgia, '.', ga.mabaogia, '.', r.chiphi].join('');
            r.gia = lamtronso(ga.bgtl[k], 0);
          } catch (err) { r.gia = 0; }
          if ((ga.macpql || ga.cpql.hesoid) >= 20200827) {
            r.oc_tien = lamtronso(r.gia * r.oc_sl, 0);
          } else {
            r.oc_tien = lamtronso(r.gia * r.oc_sl / 1000, 0) * 1000;
          }
          web.tlmd.cptl();
          web.tlmd.bth();
          web.move2id('cptl', stt, 3, 13);
        })
        .on("keydown", function (ev) {
          if ([13, 40, 38].includes(ev.keyCode)) {
            web.move2id('cptl', ev.target.dataset.stt, 3, ev.keyCode);
          }
        });
      rec.append('td')
        .attr("class", "bb")
        .append('input')
        .attr("class", (d, i) => "r cptl col4 row" + i)
        .attr("data-stt", (d, i) => i)
        .attr("value", (d) => viewso(d.on_sl, 0))
        .on("change", (ev, d) => {
          let stt = ev.target.dataset.stt,
            r = ga.cptl[stt];
          try {
            r.on_sl = lamtronso(Math.abs(parseFloat(ev.target.value)), 3);
          } catch (err) { r.on_sl = 0; };
          try {
            k = [ga.plgia, '.', ga.mabaogia, '.', r.chiphi].join('');
            r.gia = lamtronso(ga.bgtl[k], 0);
          } catch (err) { r.gia = 0; }
          if ((ga.macpql || ga.cpql.hesoid) >= 20200827) {
            r.on_tien = lamtronso(r.gia * r.on_sl, 0);
          } else {
            r.on_tien = lamtronso(r.gia * r.on_sl / 1000, 0) * 1000;
          }
          web.tlmd.cptl();
          web.tlmd.bth();
          web.move2id('cptl', stt, 3, 13);
        })
        .on("keydown", function (ev) {
          if ([13, 40, 38].includes(ev.keyCode)) {
            web.move2id('cptl', ev.target.dataset.stt, 4, ev.keyCode);
          }
        });
      rec.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.gia, 0));
      rec.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.oc_tien, 0));
      rec.append('td')
        .attr("class", "r bb")
        .text((d) => viewso(d.on_tien, 0));
    },
  },
  cpql: () => {
    let zone, kiem, bang, rec, self;
    zone = d3.select("section[id='cpql']");
  },
  tiendo: () => {
    let hg, zone = d3.select("#tiendo")
    if (app.prog === 100) {
      zone.selectAll("*").remove();
      if (hg) { clearTimeout(hg); }
    } else {
      zone.selectAll("*").remove();
      zone.append("label").text("Tiến độ ");
      zone.append("progress")
        .attr("max", 100)
        .attr("value", app.prog)
        .text([app.prog, "%"].join(''));
      hg = setTimeout(web.tiendo(), 300);
    }
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
    if (zone.charAt(0) == '#') { zone = zone.substr(1); }
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

var idb = {
  csdl: { ten: 'cntd', cap: 1 },
  taodb: () => {
    let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    if (!indexedDB) { return null; };
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
  nap: {
    phui: (dk = { phui: 'on', plcp: 'cpxd', idma: null }) => {
      if (dk.constructor !== Object) { return; }
      let phui, plcp, idma, tin, gui, i, zdl,
        w = new Worker(app.url['swidb']);
      try {
        phui = dk.phui.constructor !== String ? 'on' : dk.phui.toLowerCase();
        plcp = dk.plcp.constructor !== String ? 'cpxd' : dk.plcp.toLowerCase();
        idma = dk.idma.constructor !== Number ? -1 : parseInt(dk.idma);
        if (idma < 0) { return; }
        phui.includes('oc') ? phui = 'oc' : phui = 'on';
      } catch (err) { return; }
      app[phui]['id' + plcp] = idma;
      if (!(phui in app)) { app[phui] = {}; }
      if (!([plcp] in app[phui])) { app[phui][plcp] = []; }
      gui = {
        csdl: idb.csdl,
        bang: plcp,
        idma: idma,
        gang: 0,
      };
      console.log("idb.nap.", phui, ".", plcp, " gui=", JSON.stringify(gui, null, 2));
      w.postMessage(gui);
      w.onmessage = (e) => {
        tin = e.data;
        if ("err" in tin) {
          console.log("swidb err=", JSON.stringify(tin.err, null, 2));
          gui.gang += 1;
          //lam lai sau 2 giay
          setTimeout(() => { w.postMessage(gui); }, 2000);
        } else if (tin.cv >= 0 && tin.cv <= 100) {
          if ('idma' in tin) {
            //ok action
            zdl = tin.idma.data;
            if (zdl.constructor === Array) {
              for (i in zdl) {
                zdl[i].mota = '';
                zdl[i].dvt = '';
                zdl[i].giavl = 0;
                zdl[i].gianc = 0;
                zdl[i].giamtc = 0;
                zdl[i].tienvl = 0;
                zdl[i].tiennc = 0;
                zdl[i].tienmtc = 0;
                zdl[i].cv = 0;
              }
              app[phui][plcp] = zdl;
              //idb.tinh.oc.cpxd();
            }
            console.log("idb.nap.cpphui app[", phui, ".", plcp, "]=", JSON.stringify(app[phui], null, 2));
          }
        } else if (tin.cv < 0 || tin.cv > 100) {
          if (w) { w.terminate(); }
          w = null;
          console.log("swidb fin=", JSON.stringify(tin, null, 2));
        } else {
          console.log("swidb info=", JSON.stringify(tin, null, 2));
        }
      }
    },
    phuidao: (dk = { phui: 'on', idma: null }) => {
      if (dk.constructor !== Object) { return; }
    },
    chiphi: (dk = { phui: 'on', plcp: 'cpxd', idma: null }) => {
      if (dk.constructor !== Object) { return; }
    },
    baogia: (dk, dl) => {
      if (dk.constructor !== Object || dl.constructor !== Object) { return; }

      if (!idma) { return; }
      try {
        phui.includes('oc') ? phui = 'oc' : phui = 'on';
        app[phui]['id' + plcp] = idma;
      } catch (err) { return; }
      if (!(phui in app)) { app[phui] = {}; }
      if (!([plcp] in app[phui])) { app[phui][plcp] = []; }
      let tin, zdl, i,
        w = new Worker(app.url['swidb']),
        gui = {
          csdl: idb.csdl,
          bang: plcp,
          idma: idma,
          gang: 0,
        };
      console.log("idb.nap.", phui, ".", plcp, " gui=", JSON.stringify(gui, null, 2));
      w.postMessage(gui);
      w.onmessage = (e) => {
        tin = e.data;
        if ("err" in tin) {
          console.log("swidb err=", JSON.stringify(tin.err, null, 2));
          gui.gang += 1;
          //lam lai sau 2 giay
          setTimeout(() => { w.postMessage(gui); }, 2000);
        } else if (tin.cv >= 0 && tin.cv <= 100) {
          if ('idma' in tin) {
            //ok action
            zdl = tin.idma.data;
            if (zdl.constructor === Array) {
              for (i in zdl) {
                zdl[i].mota = '';
                zdl[i].dvt = '';
                zdl[i].giavl = 0;
                zdl[i].gianc = 0;
                zdl[i].giamtc = 0;
                zdl[i].tienvl = 0;
                zdl[i].tiennc = 0;
                zdl[i].tienmtc = 0;
                zdl[i].cv = 0;
              }
              app[phui][plcp] = zdl;
              //idb.tinh.oc.cpxd();
            }
            console.log("idb.nap.cpphui app[", phui, ".", plcp, "]=", JSON.stringify(app[phui], null, 2));
          }
        } else if (tin.cv < 0 || tin.cv > 100) {
          if (w) { w.terminate(); }
          w = null;
          console.log("swidb fin=", JSON.stringify(tin, null, 2));
        } else {
          console.log("swidb info=", JSON.stringify(tin, null, 2));
        }
      }
    },



  },
  luu: (bang, dl) => {
    if (bang) {
      bang = bang.toString().toLowerCase();
    } else { return; }
    //main
    if (dl.constructor !== Array) {
      dl = [dl];
    }
    let gui, tin, v,
      t = 0,
      w = {},
      d = dl.length;
    while (t < d) {
      console.log("ga.url=", JSON.stringify(ga.url));
      w[t] = new Worker(app.url['swidb']);
      gui = {
        csdl: idb.csdl,
        bang: bang,
        luu1: dl[t],
        gang: 0,
      };
      console.log("idb.luu gui tin=", JSON.stringify(gui, null, 2));
      w[t].postMessage(gui);
      w[t].onmessage = (e) => {
        tin = e.data;
        if (tin.cv < 0) {
          if (w[t]) { w[t].terminate(); }
          w[t] = null;
          console.log("idb fin=", JSON.stringify(tin, null, 2));
        } else if (tin.cv > 0) {
          if ('luu1' in tin && tin.luu1 > 0) {
            //ok action
            console.log("idb tin=", JSON.stringify(tin, null, 2));
          }
        } else if ("err" in tin) {
          console.log("err=", tin.err);
          gui.gang += 1;
          //lam lai sau 2 giay
          setTimeout(() => { w[t].postMessage(gui); }, 2000);
        } else {
          //info
          console.log("idb info=", JSON.stringify(tin, null, 2));
        }
      }
      t++;
    }
  },
  nap1: {
    baogia: (bang, chiphi, baogia, plgia = 'dutoan') => {
      if (bang) {
        bang = bang.toString().toLowerCase();
        if (!(['bgvl', 'bgnc', 'bgmtc', 'bgtl'].includes(bang))) { bang = 'bgvl'; }
      } else { return; }
      let w, gui, tin,
        uid = [plgia, mabaogia, chiphi].join('.');
      if (!(bang in ga)) {
        ga[bang] = {};
        ga[bang][uid] = 0;
      }
      if (!(uid in ga[bang])) { ga[bang][uid] = 0; }
      //main
      w = new Worker(app.url['swidb']);
      gui = {
        csdl: idb.csdl,
        bang: bang,
        baogia: { chiphi: chiphi, baogia: baogia, plgia: plgia },
        gang: 0,
      };
      console.log("idb.nap1 gui tin=", JSON.stringify(gui, null, 2));
      w.postMessage(gui);
      w.onmessage = (e) => {
        tin = e.data;
        if (tin.cv < 0) {
          if (w) { w.terminate(); }
          w = null;
          console.log("swidb fin=", JSON.stringify(tin, null, 2));
        } else if (tin.cv > 0) {
          if ('baogia' in tin) {
            //ok action
            console.log("swidb tin=", JSON.stringify(tin, null, 2));
            ga[bang][uid] = tin.baogia || 0;
          }
        } else if ("err" in tin) {
          console.log("err=", tin.err);
          gui.gang += 1;
          //lam lai sau 2 giay
          setTimeout(() => { w.postMessage(gui); }, 2000);
        } else {
          //info
          console.log("swidb info=", JSON.stringify(tin, null, 2));
        }
      }
    },
  },
  gom: {
    key: (bang, makhoa) => {
      if (bang) {
        bang = bang.toString().toLowerCase();
      } else { return; }
      let w, gui, tin;
      //main
      w = new Worker(app.url['swidb']);
      gui = {
        csdl: idb.csdl,
        bang: bang,
        gomkey: makhoa,
        gang: 0,
      };
      console.log("idb.gom.key gui tin=", JSON.stringify(gui, null, 2));
      w.postMessage(gui);
      w.onmessage = (e) => {
        tin = e.data;
        if (tin.cv < 0) {
          if (w) { w.terminate(); }
          w = null;
          console.log("swidb fin=", JSON.stringify(tin, null, 2));
        } else if (tin.cv > 0) {
          if ('gomkey' in tin) {
            //ok action
            console.log("swidb tin=", JSON.stringify(tin, null, 2));
          }
        } else if ("err" in tin) {
          console.log("err=", tin.err);
          gui.gang += 1;
          //lam lai sau 2 giay
          setTimeout(() => { w.postMessage(gui); }, 2000);
        } else {
          //info
          console.log("swidb info=", JSON.stringify(tin, null, 2));
        }
      }
    },
    val: (bang, makhoa) => {
      if (bang) {
        bang = bang.toString().toLowerCase();
      } else { return; }
      let w, gui, tin;
      //main
      w = new Worker(app.url['swidb']);
      gui = {
        csdl: idb.csdl,
        bang: bang,
        gomval: makhoa,
        gang: 0,
      };
      console.log("idb.gom.key gui tin=", JSON.stringify(gui, null, 2));
      w.postMessage(gui);
      w.onmessage = (e) => {
        tin = e.data;
        if (tin.cv < 0) {
          if (w) { w.terminate(); }
          w = null;
          console.log("swidb fin=", JSON.stringify(tin, null, 2));
        } else if (tin.cv > 0) {
          if ('gomval' in tin) {
            //ok action
            console.log("swidb tin=", JSON.stringify(tin, null, 2));
          }
        } else if ("err" in tin) {
          console.log("err=", tin.err);
          gui.gang += 1;
          //lam lai sau 2 giay
          setTimeout(() => { w.postMessage(gui); }, 2000);
        } else {
          //info
          console.log("swidb info=", JSON.stringify(tin, null, 2));
        }
      }
    },
    nam: (bang = 'hoso', makhoa = 'nam') => {
      if (bang) {
        bang = bang.toString().toLowerCase();
      } else { return; }
      let w, gui, tin;
      //main
      w = new Worker(app.url['swidb']);
      gui = {
        csdl: idb.csdl,
        bang: bang,
        gomkey: makhoa,
        gang: 0,
      };
      console.log("idb.gom.key gui tin=", JSON.stringify(gui, null, 2));
      w.postMessage(gui);
      w.onmessage = (e) => {
        tin = e.data;
        if (tin.cv < 0) {
          if (w) { w.terminate(); }
          w = null;
          console.log("swidb fin=", JSON.stringify(tin, null, 2));
        } else if (tin.cv > 0) {
          app.prog = tin.cv;
          web.tientrinh();
          if ('gomkey' in tin) {
            //ok action
            console.log("swidb tin=", JSON.stringify(tin, null, 2));
          }
        } else if ("err" in tin) {
          console.log("err=", tin.err);
          gui.gang += 1;
          //lam lai sau 2 giay
          setTimeout(() => { w.postMessage(gui); }, 2000);
        } else {
          //info
          console.log("swidb info=", JSON.stringify(tin, null, 2));
        }
      }
    },
  },
  tinh: {
    oc: {
      vl: (chiphi, gia = 0) => {
        let i, r, tiendo,
          zdl = ga.oc.cpxd;
        if (zdl.constructor === Array) {
          for (i in zdl) {
            r = { ...zdl[i] };
            tiendo = r.cv || 0;
            if (tiendo < 100) {
              try { r.soluong = lamtronso(Math.abs(r.soluong), 3); } catch (err) { r.soluong = 0; }
              try {
                if (r.chiphi === chiphi) { r.giavl = lamtronso(gia, 0); }
              } catch (err) { r.giavl = 0; }
              r.tienvl = lamtronso(r.giavl * r.soluong, 0);
              r.cv = 100;
              zdl[i] = r;
            }
          }
        }
        zdl = ga.oc.cpvt;
        if (zdl.constructor === Array) {
          for (i in zdl) {
            r = { ...zdl[i] };
            tiendo = r.cv || 0;
            if (tiendo < 100) {
              try { r.soluong = lamtronso(Math.abs(r.soluong), 3); } catch (err) { r.soluong = 0; }
              try {
                if (r.chiphi === chiphi) { r.giavl = lamtronso(gia, 0); }
              } catch (err) { r.giavl = 0; }
              r.tienvl = lamtronso(r.giavl * r.soluong, 0);
              r.cv = 100;
              zdl[i] = r;
            }
          }
        }
        zdl = ga.oc.cpvl;
        if (zdl.constructor === Array) {
          for (i in zdl) {
            r = { ...zdl[i] };
            tiendo = r.cv || 0;
            if (tiendo < 100) {
              try { r.soluong = lamtronso(Math.abs(r.soluong), 3); } catch (err) { r.soluong = 0; }
              try {
                if (r.chiphi === chiphi) { r.giavl = lamtronso(gia, 0); }
              } catch (err) { r.giavl = 0; }
              r.tienvl = lamtronso(r.giavl * r.soluong, 0);
              r.cv = 100;
              zdl[i] = r;
            }
          }
        }
      },
      nc: (chiphi, gia = 0) => {
        let i, r, tiendo,
          zdl = ga.oc.cpxd;
        if (zdl.constructor === Array) {
          for (i in zdl) {
            r = { ...zdl[i] };
            tiendo = r.cv || 0;
            if (tiendo < 100) {
              try { r.soluong = lamtronso(Math.abs(r.soluong), 3); } catch (err) { r.soluong = 0; }
              try {
                if (r.chiphi === chiphi) { r.gianc = lamtronso(gia, 0); }
              } catch (err) { r.gianc = 0; }
              r.tiennc = lamtronso(r.gianc * r.soluong, 0);
              r.cv = 100;
              zdl[i] = r;
            }
          }
        }
        zdl = ga.oc.cpvt;
        if (zdl.constructor === Array) {
          for (i in zdl) {
            r = { ...zdl[i] };
            tiendo = r.cv || 0;
            if (tiendo < 100) {
              try { r.soluong = lamtronso(Math.abs(r.soluong), 3); } catch (err) { r.soluong = 0; }
              try {
                if (r.chiphi === chiphi) { r.gianc = lamtronso(gia, 0); }
              } catch (err) { r.gianc = 0; }
              r.tiennc = lamtronso(r.gianc * r.soluong, 0);
              r.cv = 100;
              zdl[i] = r;
            }
          }
        }
        zdl = ga.oc.cpvl;
        if (zdl.constructor === Array) {
          for (i in zdl) {
            r = { ...zdl[i] };
            tiendo = r.cv || 0;
            if (tiendo < 100) {
              try { r.soluong = lamtronso(Math.abs(r.soluong), 3); } catch (err) { r.soluong = 0; }
              try {
                if (r.chiphi === chiphi) { r.gianc = lamtronso(gia, 0); }
              } catch (err) { r.gianc = 0; }
              r.tiennc = lamtronso(r.gianc * r.soluong, 0);
              r.cv = 100;
              zdl[i] = r;
            }
          }
        }
      },
      mtc: (chiphi, gia = 0) => {
        let i, r, tiendo,
          zdl = ga.oc.cpxd;
        if (zdl.constructor === Array) {
          for (i in zdl) {
            r = { ...zdl[i] };
            tiendo = r.cv || 0;
            if (tiendo < 100) {
              try { r.soluong = lamtronso(Math.abs(r.soluong), 3); } catch (err) { r.soluong = 0; }
              try {
                if (r.chiphi === chiphi) { r.giamtc = lamtronso(gia, 0); }
              } catch (err) { r.giamtc = 0; }
              r.tienmtc = lamtronso(r.giamtc * r.soluong, 0);
              r.cv = 100;
              zdl[i] = r;
            }
          }
        }
        zdl = ga.oc.cpvl;
        if (zdl.constructor === Array) {
          for (i in zdl) {
            r = { ...zdl[i] };
            tiendo = r.cv || 0;
            if (tiendo < 100) {
              try { r.soluong = lamtronso(Math.abs(r.soluong), 3); } catch (err) { r.soluong = 0; }
              try {
                if (r.chiphi === chiphi) { r.giamtc = lamtronso(gia, 0); }
              } catch (err) { r.giamtc = 0; }
              r.tienmtc = lamtronso(r.giamtc * r.soluong, 0);
              r.cv = 100;
              zdl[i] = r;
            }
          }
        }
        zdl = ga.oc.cpmtc;
        if (zdl.constructor === Array) {
          for (i in zdl) {
            r = { ...zdl[i] };
            tiendo = r.cv || 0;
            if (tiendo < 100) {
              try { r.soluong = lamtronso(Math.abs(r.soluong), 3); } catch (err) { r.soluong = 0; }
              try {
                if (r.chiphi === chiphi) { r.giamtc = lamtronso(gia, 0); }
              } catch (err) { r.giamtc = 0; }
              r.tienmtc = lamtronso(r.giamtc * r.soluong, 0);
              r.cv = 100;
              zdl[i] = r;
            }
          }
        }
      },
    },
    oc_old: {
      cpxd: (stt = null) => {
        let r, k, ii = 0,
          m = 0;
        try { m = ga.oc.cpxd.length; } catch (err) { return; }
        while (ii < m) {
          try {
            r = ga.oc.cpxd[ii];
            k = [ga.plgia, '.', ga.mabaogia, '.', r.chiphi].join('');
            idb.nap1.baogia('bgvl', r.chiphi, ga.mabaogia, ga.plgia);
            idb.nap1.baogia('bgnc', r.chiphi, ga.mabaogia, ga.plgia);
            idb.nap1.baogia('bgmtc', r.chiphi, ga.mabaogia, ga.plgia);
            idb.nap1.chiphi(r.chiphi);
          } catch (err) { }
          ii++;
        }
        stt = stt === '0' ? 0 : parseInt(stt) || -1;
        if (stt < 0) {
          ii = 0;
        } else {
          ii = stt;
          m = stt + 1;
        }
        while (ii < m) {
          try {
            r = ga.oc.cpxd[ii];
            k = [ga.plgia, '.', ga.mabaogia, '.', r.chiphi].join('');
            try { r.soluong = lamtronso(Math.abs(r.soluong), 3); } catch (err) { r.soluong = 0; }
            try { r.giavl = lamtronso(ga.bgvl[k], 0); } catch (err) { r.giavl = 0; }
            try { r.gianc = lamtronso(ga.bgnc[k], 0); } catch (err) { r.gianc = 0; }
            try { r.giamtc = lamtronso(ga.bgmtc[k], 0); } catch (err) { r.giamtc = 0; }
            r.tienvl = lamtronso(r.giavl * r.soluong, 0);
            r.tiennc = lamtronso(r.gianc * r.soluong, 0);
            r.tienmtc = lamtronso(r.giamtc * r.soluong, 0);
            try { r.mota = ga.chiphi[r.chiphi].mota.qtgt; } catch (err) { r.mota = null; }
            try { r.dvt = ga.chiphi[r.chiphi].dvt; } catch (err) { r.dvt = null; }
          } catch (err) { }
          ii++;
        }
      },
      cpvt: (stt = null) => {
        let r, k, ii = 0,
          m = 0;
        try { m = ga.oc.cpvt.length; } catch (err) { return; }
        while (ii < m) {
          try {
            r = ga.oc.cpvt[ii];
            k = [ga.plgia, '.', ga.mabaogia, '.', r.chiphi].join('');
            idb.nap1.baogia('bgvl', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1.baogia('bgnc', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1.baogia('bgmtc', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1.chiphi(r.chiphi);
          } catch (err) { }
          ii++;
        }
        stt = stt === '0' ? 0 : parseInt(stt) || -1;
        if (stt < 0) {
          ii = 0;
        } else {
          ii = stt;
          m = stt + 1;
        }
        while (ii < m) {
          try {
            r = ga.oc.cpvt[ii];
            k = [ga.plgia, '.', ga.mabaogia, '.', r.chiphi].join('');
            try { r.soluong = lamtronso(Math.abs(r.soluong), 3); } catch (err) { r.soluong = 0; }
            try { r.giavl = lamtronso(ga.bgvl[k], 0); } catch (err) { r.giavl = 0; }
            try { r.gianc = lamtronso(ga.bgnc[k], 0); } catch (err) { r.gianc = 0; }
            try { r.giamtc = lamtronso(ga.bgmtc[k], 0); } catch (err) { r.giamtc = 0; }
            r.tienvl = lamtronso(r.giavl * r.soluong, 0);
            r.tiennc = lamtronso(r.gianc * r.soluong, 0);
            r.tienmtc = lamtronso(r.giamtc * r.soluong, 0);
            try { r.mota = ga.chiphi[r.chiphi].mota.qtgt; } catch (err) { r.mota = null; }
            try { r.dvt = ga.chiphi[r.chiphi].dvt; } catch (err) { r.dvt = null; }
          } catch (err) { }
          ii++;
        }
      },
      cpvl: (stt = null) => {
        let r, k, ii = 0,
          m = 0;
        try { m = ga.oc.cpvl.length; } catch (err) { return; }
        while (ii < m) {
          try {
            r = ga.oc.cpvl[ii];
            k = [ga.plgia, '.', ga.mabaogia, '.', r.chiphi].join('');
            idb.nap1.baogia('bgvl', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1.baogia('bgnc', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1.baogia('bgmtc', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1.chiphi(r.chiphi);
          } catch (err) { }
          ii++;
        }
        stt = stt === '0' ? 0 : parseInt(stt) || -1;
        if (stt < 0) {
          ii = 0;
        } else {
          ii = stt;
          m = stt + 1;
        }
        while (ii < m) {
          try {
            r = ga.oc.cpvl[ii];
            k = [ga.plgia, '.', ga.mabaogia, '.', r.chiphi].join('');
            try { r.soluong = lamtronso(Math.abs(r.soluong), 3); } catch (err) { r.soluong = 0; }
            try { r.giavl = lamtronso(ga.bgvl[k], 0); } catch (err) { r.giavl = 0; }
            try { r.gianc = lamtronso(ga.bgnc[k], 0); } catch (err) { r.gianc = 0; }
            try { r.giamtc = lamtronso(ga.bgmtc[k], 0); } catch (err) { r.giamtc = 0; }
            r.tienvl = lamtronso(r.giavl * r.soluong, 0);
            r.tiennc = lamtronso(r.gianc * r.soluong, 0);
            r.tienmtc = lamtronso(r.giamtc * r.soluong, 0);
            try { r.mota = ga.chiphi[r.chiphi].mota.qtgt; } catch (err) { r.mota = null; }
            try { r.dvt = ga.chiphi[r.chiphi].dvt; } catch (err) { r.dvt = null; }
          } catch (err) { }
          ii++;
        }
      },
    },
    on: {
      cpxd: (stt = null) => {
        let r, k, ii = 0,
          m = 0;
        try { m = ga.on.cpxd.length; } catch (err) { return; }
        while (ii < m) {
          try {
            r = ga.on.cpxd[ii];
            k = [ga.plgia, '.', ga.mabaogia, '.', r.chiphi].join('');
            idb.nap1.baogia('bgvl', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1.baogia('bgnc', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1.baogia('bgmtc', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1.chiphi(r.chiphi);
          } catch (err) { }
          ii++;
        }
        stt = stt === '0' ? 0 : parseInt(stt) || -1;
        if (stt < 0) {
          ii = 0;
        } else {
          ii = stt;
          m = stt + 1;
        }
        while (ii < m) {
          try {
            r = ga.on.cpxd[ii];
            k = [ga.plgia, '.', ga.mabaogia, '.', r.chiphi].join('');
            try { r.soluong = lamtronso(Math.abs(r.soluong), 3); } catch (err) { r.soluong = 0; }
            try { r.giavl = lamtronso(ga.bgvl[k], 0); } catch (err) { r.giavl = 0; }
            try { r.gianc = lamtronso(ga.bgnc[k], 0); } catch (err) { r.gianc = 0; }
            try { r.giamtc = lamtronso(ga.bgmtc[k], 0); } catch (err) { r.giamtc = 0; }
            r.tienvl = lamtronso(r.giavl * r.soluong, 0);
            r.tiennc = lamtronso(r.gianc * r.soluong, 0);
            r.tienmtc = lamtronso(r.giamtc * r.soluong, 0);
            try { r.mota = ga.chiphi[r.chiphi].mota.qtgt; } catch (err) { r.mota = null; }
            try { r.dvt = ga.chiphi[r.chiphi].dvt; } catch (err) { r.dvt = null; }
          } catch (err) { }
          ii++;
        }
      },
      cpvt: (stt = null) => {
        let r, k, ii = 0,
          m = 0;
        try { m = ga.on.cpvt.length; } catch (err) { return; }
        while (ii < m) {
          try {
            r = ga.on.cpvt[ii];
            k = [ga.plgia, '.', ga.mabaogia, '.', r.chiphi].join('');
            idb.nap1.baogia('bgvl', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1.baogia('bgnc', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1.baogia('bgmtc', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1.chiphi(r.chiphi);
          } catch (err) { }
          ii++;
        }
        stt = stt === '0' ? 0 : parseInt(stt) || -1;
        if (stt < 0) {
          ii = 0;
        } else {
          ii = stt;
          m = stt + 1;
        }
        while (ii < m) {
          try {
            r = ga.on.cpvt[ii];
            k = [ga.plgia, '.', ga.mabaogia, '.', r.chiphi].join('');
            try { r.soluong = lamtronso(Math.abs(r.soluong), 3); } catch (err) { r.soluong = 0; }
            try { r.giavl = lamtronso(ga.bgvl[k], 0); } catch (err) { r.giavl = 0; }
            try { r.gianc = lamtronso(ga.bgnc[k], 0); } catch (err) { r.gianc = 0; }
            try { r.giamtc = lamtronso(ga.bgmtc[k], 0); } catch (err) { r.giamtc = 0; }
            r.tienvl = lamtronso(r.giavl * r.soluong, 0);
            r.tiennc = lamtronso(r.gianc * r.soluong, 0);
            r.tienmtc = lamtronso(r.giamtc * r.soluong, 0);
            try { r.mota = ga.chiphi[r.chiphi].mota.qtgt; } catch (err) { r.mota = null; }
            try { r.dvt = ga.chiphi[r.chiphi].dvt; } catch (err) { r.dvt = null; }
          } catch (err) { }
          ii++;
        }
      },
      cpvl: (stt = null) => {
        let r, k, ii = 0,
          m = 0;
        try { m = ga.on.cpvl.length; } catch (err) { return; }
        while (ii < m) {
          try {
            r = ga.on.cpvl[ii];
            k = [ga.plgia, '.', ga.mabaogia, '.', r.chiphi].join('');
            idb.nap1.baogia('bgvl', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1.baogia('bgnc', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1.baogia('bgmtc', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1.chiphi(r.chiphi);
          } catch (err) { }
          ii++;
        }
        stt = stt === '0' ? 0 : parseInt(stt) || -1;
        if (stt < 0) {
          ii = 0;
        } else {
          ii = stt;
          m = stt + 1;
        }
        while (ii < m) {
          try {
            r = ga.on.cpvl[ii];
            k = [ga.plgia, '.', ga.mabaogia, '.', r.chiphi].join('');
            try { r.soluong = lamtronso(Math.abs(r.soluong), 3); } catch (err) { r.soluong = 0; }
            try { r.giavl = lamtronso(ga.bgvl[k], 0); } catch (err) { r.giavl = 0; }
            try { r.gianc = lamtronso(ga.bgnc[k], 0); } catch (err) { r.gianc = 0; }
            try { r.giamtc = lamtronso(ga.bgmtc[k], 0); } catch (err) { r.giamtc = 0; }
            r.tienvl = lamtronso(r.giavl * r.soluong, 0);
            r.tiennc = lamtronso(r.gianc * r.soluong, 0);
            r.tienmtc = lamtronso(r.giamtc * r.soluong, 0);
            try { r.mota = ga.chiphi[r.chiphi].mota.qtgt; } catch (err) { r.mota = null; }
            try { r.dvt = ga.chiphi[r.chiphi].dvt; } catch (err) { r.dvt = null; }
          } catch (err) { }
          ii++;
        }
      },
    },
    cptl: (stt = null) => {
      let r, k,
        ii = 0,
        m = ga.cptl.length || 0;
      if (m < 1) { return; }
      while (ii < m) {
        try {
          r = ga.cptl[ii];
          k = [ga.plgia, '.', ga.mabaogia, '.', r.chiphi].join('');
          idb.nap1.baogia('bgtl', r.chiphi, ga.mabaogia, ga.plgia);
          idb.nap1.chiphi(r.chiphi);
        } catch (err) { }
        ii++;
      }
      stt = stt === '0' ? 0 : parseInt(stt) || -1;
      if (stt < 0) {
        ii = 0;
      } else {
        ii = stt;
        m = stt + 1;
      }
      while (ii < m) {
        try {
          r = ga.cptl[ii];
          k = [ga.plgia, '.', ga.mabaogia, '.', r.chiphi].join('');
          try { r.oc_sl = lamtronso(Math.abs(r.oc_sl), 3); } catch (err) { r.oc_sl = 0; }
          try { r.on_sl = lamtronso(Math.abs(r.oc_sl), 3); } catch (err) { r.on_sl = 0; }
          try { r.gia = lamtronso(ga.bgtl[k], 0); } catch (err) { r.gia = 0; }
          if ((ga.macpql || ga.cpql.hesoid) >= 20200827) {
            r.oc_tien = lamtronso(r.gia * r.oc_sl, 0);
            r.on_tien = lamtronso(r.gia * r.on_sl, 0);
          } else {
            r.oc_tien = lamtronso(r.gia * r.oc_sl / 1000, 0) * 1000;
            r.on_tien = lamtronso(r.gia * r.on_sl / 1000, 0) * 1000;
          }
          try { r.mota = ga.chiphi[r.chiphi].mota.qtgt; } catch (err) { r.mota = null; }
          try { r.dvt = ga.chiphi[r.chiphi].dvt; } catch (err) { r.dvt = null; }
        } catch (err) { }
        ii++;
      }
    },
    cpql: () => {
      if (!('cpql' in ga)) { ga.cpql = { macpql: 20200827 } };
      if (!('macpql' in ga)) { ga.macpql = 20200827 };
      idb.nap1.cpql(ga.macpql);
      let self = ga.cpql[ga.macpql];
      try {
        if (!('oc' in self)) { self.oc = {} };
        self.oc.vl = lamtronso(ga.oc.zvl * self.vl, 0);
        self.oc.nc = lamtronso(ga.oc.znc * self.nc, 0);
        self.oc.mtc = lamtronso(ga.oc.zmtc * self.mtc, 0);
        self.oc.zvlncmtc = self.oc.vl + self.oc.nc + self.oc.mtc;
        self.oc.tructiepkhac = lamtronso(self.oc.zvlncmtc * self.tructiepkhac, 0);
        self.oc.tructiep = self.oc.zvlncmtc + self.oc.tructiepkhac;
        self.oc.chung = lamtronso(self.oc.tructiep * self.chung, 0);
        self.oc.giantiepkhac = lamtronso(self.oc.tructiep * self.giantiepkhac, 0);
        self.oc.giantiep = self.oc.chung + self.oc.giantiepkhac;
        self.oc.giaxaydung = self.oc.tructiep + self.oc.giantiep;
        self.oc.thutinhtruoc = lamtronso(self.oc.giaxaydung * self.thutinhtruoc, 0);
        self.oc.xaydungtruocthue = self.oc.giaxaydung + self.oc.thutinhtruoc;
        self.oc.khaosatthietke = lamtronso(self.oc.xaydungtruocthue * self.khaosat * self.thietke, 0);
        self.oc.giamsat = lamtronso(self.oc.xaydungtruocthue * self.giamsat, 0);
        self.oc.tuvan = self.oc.khaosatthietke + self.oc.giamsat;
        self.oc.tongxaydungtruocthue = self.oc.xaydungtruocthue + self.oc.tuvan;
        self.oc.thuetongxaydung = lamtronso(self.oc.tongxaydungtruocthue * 10 / 100, 0);
        self.oc.tongxaydung = self.oc.tongxaydungtruocthue + self.oc.thuetongxaydung;
        self.oc.congtrinh = self.oc.tongxaydung + self.oc.ztl;
      } catch (err) { }
      try {
        if (!('on' in self)) { self.on = {} };
        self.on.vl = lamtronso(ga.on.zvl * self.vl, 0);
        self.on.nc = lamtronso(ga.on.znc * self.nc, 0);
        self.on.mtc = lamtronso(ga.on.zmtc * self.mtc, 0);
        self.on.zvlncmtc = self.on.vl + self.on.nc + self.on.mtc;
        self.on.tructiepkhac = lamtronso(self.on.zvlncmtc * self.tructiepkhac, 0);
        self.on.tructiep = self.on.zvlncmtc + self.on.tructiepkhac;
        self.on.chung = lamtronso(self.on.tructiep * self.chung, 0);
        self.on.giantiepkhac = lamtronso(self.on.tructiep * self.giantiepkhac, 0);
        self.on.giantiep = self.on.chung + self.on.giantiepkhac;
        self.on.giaxaydung = self.on.tructiep + self.on.giantiep;
        self.on.thutinhtruoc = lamtronso(self.on.giaxaydung * self.thutinhtruoc, 0);
        self.on.xaydungtruocthue = self.on.giaxaydung + self.on.thutinhtruoc;
        self.on.khaosatthietke = lamtronso(self.on.xaydungtruocthue * self.khaosat * self.thietke, 0);
        self.on.giamsat = lamtronso(self.on.xaydungtruocthue * self.giamsat, 0);
        self.on.tuvan = self.on.khaosatthietke + self.on.giamsat;
        self.on.tongxaydungtruocthue = self.on.xaydungtruocthue + self.on.tuvan;
        self.on.thuetongxaydung = lamtronso(self.on.tongxaydungtruocthue * 10 / 100, 0);
        self.on.tongxaydung = self.on.tongxaydungtruocthue + self.on.thuetongxaydung;
        self.on.congtrinh = self.on.tongxaydung + self.on.ztl;
      } catch (err) { }
      //tong
      self.xaydung = self.oc.tongxaydung + self.on.tongxaydung
      self.tailap = self.oc.ztl + self.on.ztl
      self.congtrinh = self.xaydung + self.tailap
      self.congtrinhtruocthue = lamtronso(self.congtrinh * 100 / 110, 0)
      self.thuecongtrinh = self.congtrinh - self.congtrinhtruocthue
    },
  },
};

var ham = {
  sregexp: (stim) => {
    if (!stim) {
      return stim;
    }
    let k,
      ltim = [...stim];
    let mau = "";
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
  stomau: (chuoi, stim, sac = 'red') => {
    try { chuoi = chuoi.toString().toLowerCase(); } catch (err) { return null; }
    try {
      stim = stim.toString().toLowerCase();
      if (stim.length < 1) { return chuoi; }
    } catch (err) { return chuoi; }
    let mau = ham.sregexp(stim);
    mau = new RegExp(mau, "gi");
    chuoi = chuoi.replace(mau, (m) => {
      if (m === undefined || m === null || m === "") { return; }
      return ["<b style='color:", sac, "'>", m, "</b>"].join('');
    });
    return chuoi;
  },
};

function luanhoi() {
  web.tao();
  idb.taodb();
  //web.ongcai();
}
luanhoi();

function test_dulieu() {
  let dl = [
    {
      "idma": Date.now() + 1,
      "refs": { "hesoid": 20190725, "ghichu": "quy ước làm tròn sl=3, tiền=0", "test": '', "test2": '' },
      "data": {
        "macpql": 20190725, "vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055,
        "khaosat": 0.0236, "thietke": 1.2, "giamsat": 0.02566,
        "phaply": {
          "cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
          "cpql": "Nghị định 32/2015/NĐ-CP ngày 25/03/2015; Quyết định 3384/QĐ-UBND 02/07/2016"
        },
      },
      "status": "Fin",
      "lastupdate": Date.now()
    },
    {
      "idma": Date.now() + 2,
      "refs": { "hesoid": 20200721 },
      "data": {
        "macpql": 20200721, "vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.055, "giantiepkhac": 0.02, "thutinhtruoc": 0.055,
        "khaosat": 0.0207, "thietke": 1.2, "giamsat": 0.02566,
        "phaply": {
          "cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
          "cpql": "Nghị định 68/2019/NĐ-CP ngày 14/08/2019; Quyết định 2207/QĐ-UBND ngày 18/06/2020"
        },
      },
      "status": "ok",
      "lastupdate": Date.now()
    },
    {
      "idma": Date.now() + 3,
      "refs": { "hesoid": 20200827, "ghichu": "quy ước làm tròn sl=3, tiền=0" },
      "data": {
        "macpql": 20200827, "vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.055, "giantiepkhac": 0.02, "thutinhtruoc": 0.055,
        "khaosat": 0.0207, "thietke": 1.2, "giamsat": 0.02566,
        "phaply": {
          "cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
          "cpql": "Nghị định 68/2019/NĐ-CP ngày 14/08/2019; Quyết định 2207/QĐ-UBND ngày 18/06/2020"
        },
      },
      "status": "ok",
      "lastupdate": Date.now()
    },
  ]
  idb.luu("chiphiquanly", dl);

  dl = [
    {
      "idma": Date.now(),
      "refs": { "chiphiid": 100 },
      "data": {
        "mabaogia": 20190825, "chiphi": 100,
        "dutoan": 1525.4, "ketoan": 1525,
      },
      "status": "chyenjson",
      "lastupdate": Date.now()
    },
    {
      "idma": Date.now() + 1,
      "refs": { "chiphiid": 100 },
      "data": {
        "mabaogia": 20190725, "chiphi": 100,
        "dutoan": 4432.68, "ketoan": 4432,
      },
      "status": "chyenjson",
      "lastupdate": Date.now()
    },
    {
      "idma": Date.now() + 2,
      "refs": { "chiphiid": 100 },
      "data": {
        "mabaogia": 20190721, "chiphi": 100,
        "dutoan": 5247.35, "ketoan": 5247,
      },
      "status": "chyenjson",
      "lastupdate": Date.now()
    },
    {
      "idma": Date.now() + 3,
      "refs": { "chiphiid": 200 },
      "data": {
        "mabaogia": 20190825, "chiphi": 200,
        "dutoan": 1250.4, "ketoan": 1250,
      },
      "status": "chyenjson",
      "lastupdate": Date.now()
    },
    {
      "idma": Date.now() + 4,
      "refs": { "chiphiid": 300 },
      "data": {
        "mabaogia": 20190721, "chiphi": 300,
        "dutoan": 1254.4, "ketoan": 1254,
      },
      "status": "chyenjson",
      "lastupdate": Date.now()
    },
  ]
  idb.luu("bgvl", dl);
  idb.luu("bgnc", dl);
  idb.luu("bgmtc", dl);
  idb.luu("bgtl", dl);
  dl = [
    {
      "idma": Date.now(),
      "data": [
        { "chiphi": 1, "soluong": 11 },
        { "chiphi": 2, "soluong": 22 },
        { "chiphi": 3, "soluong": 33 },
      ],
      "status": "chyenjson",
      "lastupdate": Date.now()
    },
    {
      "idma": Date.now() + 1,
      "data": [
        { "chiphi": 1, "soluong": 10 },
        { "chiphi": 2, "soluong": 20 },
        { "chiphi": 3, "soluong": 30 },
      ],
      "status": "chyenjson",
      "lastupdate": Date.now()
    },
    {
      "idma": Date.now() + 2,
      "data": [
        { "chiphi": 1, "soluong": 1 },
        { "chiphi": 2, "soluong": 2 },
      ],
      "status": "chyenjson",
      "lastupdate": Date.now()
    },
    {
      "idma": Date.now() + 3,
      "data": [
        { "chiphi": 1, "soluong": 101 },
        { "chiphi": 3, "soluong": 303 },
      ],
      "status": "chyenjson",
      "lastupdate": Date.now()
    },
    {
      "idma": Date.now() + 4,
      "data": [
        { "chiphi": 1, "soluong": 111 },
      ],
      "status": "chyenjson",
      "lastupdate": Date.now()
    },
  ]
  idb.luu("cpxd", dl);
  idb.luu("cpvt", dl);
  idb.luu("cpvl", dl);

}
//test_dulieu();
//let mabaogia = 20200827,
//  chiphi = '001',
//  plgia = 'dutoan';
idb.nap.phui({ phui: 'oc', plcp: 'cpxd', idma: 1615277173487 });
idb.nap.phui({ phui: 'oc', plcp: 'cpvt', idma: 1615277173488 });
idb.nap.phui({ phui: 'oc', plcp: 'cpvl', idma: 1615277173489 });
//console.log("ga.bgvl=", JSON.stringify(ga.bgvl));