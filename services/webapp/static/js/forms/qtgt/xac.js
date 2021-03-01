import { d2l, lamtronso, viewso } from "./../../utils.js"

var app = {
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

};

var ga = {
  tieude: {
    cpxd: ['Tt', 'Mô tả công tác', 'Đvt', 'Số lượng', 'Giá vật liệu', 'Giá nhân công', 'Giá mtc', 'Tiền vật liệu', 'Tiền nhân công', 'Tiền mtc'],
    cpvt: ['Tt', 'Mô tả vật tư', 'Đvt', 'Số lượng', 'Giá vật liệu', 'Giá nhân công', 'Giá mtc', 'Tiền vật liệu', 'Tiền nhân công', 'Tiền mtc'],
    cpvl: ['Tt', 'Mô tả vật liệu', 'Đvt', 'Số lượng', 'Giá vật liệu', 'Giá nhân công', 'Giá mtc', 'Tiền vật liệu', 'Tiền nhân công', 'Tiền mtc'],
    cptl: ['Tt', 'Kết cấu tái lập', 'Đvt', 'Số lượng oc', 'Số lượng on', 'Giá', 'Tiền ống cái', 'Tiền ống nhánh'],
    chiphi: {
      xd: ['Mo ta', 'Đvt', 'idutc'],
      vt: ['Mo ta', 'Đvt', 'idutc'],
      vl: ['Mo ta', 'Đvt', 'idutc'],
      tl: ['Mo ta', 'Đvt', 'idutc']
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
    '1': { idutc: 1, plcp: 'cpxd', mota: { qtgt: 'cp1', qtvt: 'cp01' }, dvt: 'cai' },
    '2': { idutc: 2, plcp: 'cpxd', mota: { qtgt: 'cp2', qtvt: 'cp01' }, dvt: 'cai' },
    '3': { idutc: 3, plcp: 'cpxd', mota: { qtgt: 'cp3', qtvt: 'cp01' }, dvt: 'cai' },
    '4': { idutc: 4, plcp: 'cpxd', mota: { qtgt: 'cp4', qtvt: 'cp01' }, dvt: 'cai' },
    '5': { idutc: 5, plcp: 'cpxd', mota: { qtgt: 'cp5', qtvt: 'cp01' }, dvt: 'cai' },
    '6': { idutc: 6, plcp: 'cpxd', mota: { qtgt: 'cp6', qtvt: 'cp01' }, dvt: 'cai' },
    '7': { idutc: 7, plcp: 'cpvt', mota: { qtgt: 'cp1', qtvt: 'cp01' }, dvt: 'cai' },
    '8': { idutc: 8, plcp: 'cpvt', mota: { qtgt: 'cp2', qtvt: 'cp01' }, dvt: 'cai' },
    '9': { idutc: 9, plcp: 'cpvt', mota: { qtgt: 'cp3', qtvt: 'cp01' }, dvt: 'cai' },
    '10': { idutc: 10, plcp: 'cptl', mota: { qtgt: 'cp4', qtvt: 'cp01' }, dvt: 'cai' },
    '11': { idutc: 11, plcp: 'cptl', mota: { qtgt: 'cp5', qtvt: 'cp01' }, dvt: 'cai' },
    '12': { idutc: 12, plcp: 'cptl', mota: { qtgt: 'cp6', qtvt: 'cp01' }, dvt: 'cai' },
  },
  oc: {
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
      { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 10, tienmtc: 20 },
      { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 200, tienmtc: 220 },
      { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 300, tienmtc: 330 }
    ],
    cpvl: [
      { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 10, tienmtc: 20 },
      { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 200, tienmtc: 220 },
      { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 300, tienmtc: 330 }
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
      { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 10, tienmtc: 20 },
      { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 200, tienmtc: 220 },
      { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 300, tienmtc: 330 }
    ],
    cpvl: [
      { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 10, tienmtc: 20 },
      { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 200, tienmtc: 220 },
      { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 300, tienmtc: 330 }
    ],
  },
  cptl: [
    { chiphi: 1, mota: 'cp1', dvt: 'cai', oc_sl: 0, on_sl: 0, gia: 0, oc_tien: 0, on_tien: 10 },
    { chiphi: 2, mota: 'cp2', dvt: 'cai', oc_sl: 0, on_sl: 0, gia: 0, oc_tien: 0, on_tien: 200 },
    { chiphi: 3, mota: 'cp3', dvt: 'cai', oc_sl: 0, on_sl: 0, gia: 0, oc_tien: 0, on_tien: 5510 }
  ],
  cpql: { ma: 20200827 },
  bgvl: {
    '001.001': { 'dutoan': 1123, 'ketoan': 1245 },
    '001.002': { 'dutoan': 1123, 'ketoan': 1245 },
    '001.003': { 'dutoan': 1123, 'ketoan': 1245 }
  },
  bgnc: {
    '001.001': { 'dutoan': 1123, 'ketoan': 1245 },
    '001.002': { 'dutoan': 1123, 'ketoan': 1245 },
    '001.003': { 'dutoan': 1123, 'ketoan': 1245 }
  },
  bgmtc: {
    '001.001': { 'dutoan': 1123, 'ketoan': 1245 },
    '001.002': { 'dutoan': 1123, 'ketoan': 1245 },
    '001.003': { 'dutoan': 1123, 'ketoan': 1245 }
  },
  bgtl: {
    '001.001': { 'dutoan': 1123, 'ketoan': 1245 },
    '001.002': { 'dutoan': 1123, 'ketoan': 1245 },
    '001.003': { 'dutoan': 1123, 'ketoan': 1245 }
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
  hov: { mau1: "yellow", mau2: "#9999ff" },
  tao: () => {
    web.sw_url();
    web.otim.nam();
    web.otim.plqt();
    web.otim.dvtc();
    web.otim.dot();
    web.otim.hoso();
    //web.oc.cpxd();
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
    ga.url["api"] = [
      ["https://", window.location.host, "/", idb.csdl.ten, "/api/hoso/", ga.namlamviec].join(''),
      ["https://", window.location.host, "/", idb.csdl.ten, "/api/dshc/", ga.namlamviec].join(''),
    ];
    ga.url["wss"] = ["wss://", window.location.host, "/", idb.csdl.ten, "/wss/hoso"].join('');
    ga.url["swidb"] = d3.select("#qtgt").attr("data-swidb");
    ga.url["swapi"] = d3.select("#qtgt").attr("data-swapi");
  },
  otim: {
    nam_old: () => {
      let zone, box, box1, box2, inp, i, k, v,
        dl = [{ k: 0, v: "All" }],
        curnam = new Date().getFullYear();
      if (!('qtgt' in ga)) {
        ga.qtgt = {};
        ga.qtgt.nam = curnam;
      }
      for (i in [0, 1, 2, 3, 4, 5]) {
        k = (curnam - i).toString(),
          v = curnam - i;
        dl.push({ k: k, v: v });
      }
      if (!('maxrbox' in ga)) {
        ga.maxrbox = {};
        ga.maxrbox.nam = 6;
      }
      if (!('maxcbox' in ga)) {
        ga.maxcbox = {};
        ga.maxcbox.nam = 0;
      }


      zone = d3.select("#qtgt").select(".grid.otim")
        .append("div")
        .attr("class", "l flex");

      box1 = zone.append("input")
        .attr("value", "Năm");

      box2 = zone.append("div")
        .attr("class", "l")
        .style("width", "100%")
        .style("position", "relative");

      inp = box2.append("input")
        .attr("id", "in_nam")
        .attr("data-tagid", "nam__-1__0")
        .attr("class", "l")
        .attr("value", curnam)
        .on("focus", () => {
          show_chon(dl);
        })
        .on("keydown", function (ev) {
          let tagid = ev.target.dataset.tagid;
          switch (ev.keyCode) {
            case 27: //Esc
              ev.target.value = null;
              break;
            case 40: //downArrow
            case 39: //arrowRight
              inp_sua(web.move2id(tagid, 1, 0));
              break;
            case 38: //arrowUp
            case 37: //arrowLeft
              inp_sua(web.move2id(tagid, -1, 0));
              break;
            case 13: //Enter
              inp_sua(web.move2id(tagid, 0, 0));
              if (box) { box.remove(); }
              break;
            default:
          }
        });
      function show_chon(dl) {
        //if (dl.constructor !== Object) { return; }
        d3.selectAll("#show_chon").remove();
        box = box2.append("ol")
          .attr("id", "show_chon")
          .style("background-color", "white")
          .style("position", "absolute")
          .style("top", "2rem")
          .style("left", 0)
          .style("z-index", 99)
          .style("border-style", "solid")
          .style("border-color", "#d4d4d4")
          .style("border-width", "0 1px 0 1px")
          .style("list-style-type", "decimal")
          .style("list-style-position", "inside")
          .style("margin", 0)
          .style("padding-left", "1rem")
          .style("width", "12cm")
          .style("display", "grid")
          .style("grid", "auto-flow minmax(1rem, max-content) / 1fr 1fr 1fr");

        box.selectAll("li").data(dl)
          .enter()
          .append("li")
          .attr("id", (d, i) => ['nam', i, 0].join('__'))
          .attr("class", 'l nam')
          .attr("data-id", (d) => d.k)
          .attr("data-val", (d) => d.k)
          .attr("data-show", (d) => d.v)
          .text((d) => d.v)
          .on("mouseover", (ev) => {
            ev.target.style.backgroundColor = web.hov.mau2;
          })
          .on("mouseout", (ev) => {
            ev.target.style.backgroundColor = "white";
          })
          .on("click", (ev, d) => {
            ga.qtgt.nam = d.k;
            inp.node().value = d.v;
            console.log("option click d=", JSON.stringify(d));
            console.log("option click ga.qtgt=", JSON.stringify(ga.qtgt));
            box.remove();
          });
      };
      function inp_sua(dl) {
        if (dl.constructor !== Object) { return; }
        try {
          inp.attr("data-tagid", dl.tagid);
          inp.attr("data-id", dl.id);
          inp.attr("data-val", dl.val);
          inp.attr("data-show", dl.show);
          ga.qtgt.nam = dl.id;
          inp.node().value = dl.show;
        } catch (err) { }
      }
    },
    nam: () => {
      let inp = d3.select("#app_nam")
        .classed('l w100', true)
        .attr("type", "search")
        .attr("data-id", app.nam)
        .attr("value", ga.nam[app.nam].show)
        .style("height", "1rem")
        .style("padding-left", "3px")
        .on("click", (ev) => {
          show_chon(ev.target.parentNode);
        });

      function show_chon(el) {
        let zdl = ga.nam;
        if (zdl.constructor !== Object) { return; }
        let k, r, box, rec,
          dulieu = [zdl.tieude];
        for (k in zdl) {
          if (k !== 'tieude') {
            r = zdl[k];
            r.id = k;
            dulieu.push(r);
          }
        }
        d3.selectAll("#chon").remove();
        box = d3.select(el).append("ol")
          .attr("id", "chon")
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
              inp.node().value = d.show;
              if (box) { box.remove(); }
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
      let inp = d3.select("#app_plqt")
        .classed('l w100', true)
        .attr("type", "search")
        .attr("data-id", app.plqt)
        .attr("value", ga.plqt[app.plqt].show)
        .style("height", "1rem")
        .style("padding-left", "3px")
        .on("click", (ev) => {
          show_chon(ev.target.parentNode);
        });

      function show_chon(el) {
        let zdl = ga.plqt;
        if (zdl.constructor !== Object) { return; }
        let k, r, box, rec,
          dulieu = [zdl.tieude];
        for (k in zdl) {
          if (k !== 'tieude') {
            r = zdl[k];
            r.id = k;
            dulieu.push(r);
          }
        }
        d3.selectAll("#chon").remove();
        box = d3.select(el).append("ol")
          .attr("id", "chon")
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
              inp.node().value = d.show;
              if (box) { box.remove(); }
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
      let inp = d3.select("#app_dvtc")
        .classed('l w100', true)
        .attr("type", "search")
        .attr("data-id", app.dvtc)
        .attr("value", ga.dvtc[app.dvtc].show)
        .style("height", "1rem")
        .style("padding-left", "3px")
        .on("click", (ev) => {
          show_chon(ev.target.parentNode);
        });

      function show_chon(el) {
        let zdl = ga.dvtc;
        if (zdl.constructor !== Object) { return; }
        let k, r, box, rec,
          dulieu = [zdl.tieude];
        for (k in zdl) {
          if (k !== 'tieude') {
            r = zdl[k];
            r.id = k;
            dulieu.push(r);
          }
        }
        d3.selectAll("#chon").remove();
        box = d3.select(el).append("ol")
          .attr("id", "chon")
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
              inp.node().value = d.show;
              if (box) { box.remove(); }
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
      let inp = d3.select("#app_dot")
        .classed('l w100', true)
        .attr("type", "search")
        .attr("data-id", app.dot)
        .attr("value", ga.dot[app.dot].show)
        .style("height", "1rem")
        .style("padding-left", "3px")
        .on("click", (ev) => {
          show_chon(ev.target.parentNode);
        });

      function show_chon(el) {
        let zdl = ga.dot;
        if (zdl.constructor !== Object) { return; }
        let k, r, box, rec,
          dulieu = [zdl.tieude];
        for (k in zdl) {
          if (k !== 'tieude') {
            r = zdl[k];
            r.id = k;
            dulieu.push(r);
          }
        }
        d3.selectAll("#chon").remove();
        box = d3.select(el).append("ol")
          .attr("id", "chon")
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
              inp.node().value = d.show;
              if (box) { box.remove(); }
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
      let inp = d3.select("#app_hoso")
        .classed('l w100', true)
        .attr("type", "search")
        .attr("data-id", app.hoso)
        .attr("value", ga.hoso[app.hoso].show)
        .style("height", "1rem")
        .style("padding-left", "3px")
        .on("click", (ev) => {
          show_chon(ev.target.parentNode);
        });

      function show_chon(el) {
        let zdl = ga.hoso;
        if (zdl.constructor !== Object) { return; }
        let k, r, box, rec,
          dulieu = [zdl.tieude];
        for (k in zdl) {
          if (k !== 'tieude') {
            r = zdl[k];
            r.id = k;
            dulieu.push(r);
          }
        }
        d3.selectAll("#chon").remove();
        box = d3.select(el).append("ol")
          .attr("id", "chon")
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
              inp.node().value = d.show;
              if (box) { box.remove(); }
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

  move2id: (tagid, row = 0, col = 0) => {
    console.log("start move2id=", tagid, " row=", row, " col=", col);
    if (!tagid) { return null; }
    let box, tag, kq = {};
    try {
      tagid = tagid.toString().split('__');
      box = tagid[0];
      row = parseInt(tagid[1]) + parseInt(row);
      col = parseInt(tagid[2]) + parseInt(col);
    } catch (err) { return null; }
    console.log("start parse move2id=", tagid, " row=", row, " col=", col);
    if (col > ga.maxcbox[box]) {
      col = 0;
    };
    if (col < 0) {
      col = ga.maxcbox[box];
    };
    switch (box) {
      case 'oc_cpxd':
        if (row > ga.maxrbox[box]) {
          row = row % (ga.maxrbox[box] + 1);
          box = 'oc_cpvt';
        };
        if (row < 0) {
          row = ga.maxrbox[box] + 1 + (row % (ga.maxrbox[box] + 1));
          box = 'oc_cpvl';
        };
        break;
      case 'oc_cpvt':
        if (row > ga.maxrbox[box]) {
          row = row % (ga.maxrbox[box] + 1);
          box = 'oc_cpvl';
        };
        if (row < 0) {
          row = ga.maxrbox[box] + 1 + (row % (ga.maxrbox[box] + 1));
          box = 'oc_cpxd';
        };
        break;
      case 'oc_cpvl':
        if (row > ga.maxrbox[box]) {
          row = row % (ga.maxrbox[box] + 1);
          box = 'oc_cpxd';
        };
        if (row < 0) {
          row = ga.maxrbox[box] + 1 + (row % (ga.maxrbox[box] + 1));
          box = 'oc_cpvt';
        };
        break;
      case 'on_cpxd':
        if (row > ga.maxrbox[box]) {
          row = row % (ga.maxrbox[box] + 1);
          box = 'on_cpvt';
        };
        if (row < 0) {
          row = ga.maxrbox[box] + 1 + (row % (ga.maxrbox[box] + 1));
          box = 'on_cpvl';
        };
        break;
      case 'on_cpvt':
        if (row > ga.maxrbox[box]) {
          row = row % (ga.maxrbox[box] + 1);
          box = 'on_cpvl';
        };
        if (row < 0) {
          row = ga.maxrbox[box] + 1 + (row % (ga.maxrbox[box] + 1));
          box = 'on_cpxd';
        };
        break;
      case 'on_cpvl':
        if (row > ga.maxrbox[box]) {
          row = row % (ga.maxrbox[box] + 1);
          box = 'on_cpxd';
        };
        if (row < 0) {
          row = ga.maxrbox[box] + 1 + (row % (ga.maxrbox[box] + 1));
          box = 'on_cpvt';
        };
        break;
      default:
        if (row > ga.maxrbox[box]) {
          row = row % (ga.maxrbox[box] + 1);
        };
        if (row < 0) {
          row = ga.maxrbox[box] + 1 + (row % (ga.maxrbox[box] + 1));
        };
    }
    tag = ['.', box].join('');
    d3.selectAll(tag).classed('mau', false);
    tag = [box, row, col].join('__');
    tagid = ['#', tag].join('');
    box = d3.select(tagid);
    box.classed('mau', true);
    console.log("end move2id=", tagid);
    if (box.node() && ['INPUT'].includes(box.node().tagName)) {
      box.node().focus();
      box.node().select();
    } else {
      kq.tagid = tag;
      kq.id = box.attr("data-id") || -1;
      kq.val = box.attr("data-val") || '';
      kq.show = box.attr("data-show") || '';
      return kq;
    }
  },
  oc: {
    bth: () => {
      let zone, kiem, self;
      zone = d3.select("section[id='ongcai']");
      kiem = zone.select(".ongcai")
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
      if (!('oc' in ga)) { ga.oc = { zvl: 0, znc: 0, zmtc: 0 }; }
      self = ga.oc;
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
      d3.select("div[id='oc_zvl']").data([self.zvl])
        .attr("class", "fb")
        .text((d) => viewso(d, 0));
      d3.select("div[id='oc_znc']").data([self.znc])
        .attr("class", "fb")
        .text((d) => viewso(d, 0));
      d3.select("div[id='oc_zmtc']").data([self.zmtc])
        .attr("class", "fb")
        .text((d) => viewso(d, 0));
    },
    cpxd: () => {
      let bang = d3.select("table[id='oc_cpxd']")
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
      let row = bang.selectAll("tr").data(ga.oc.cpxd).enter().append("tr");
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
        .attr("class", (d, i) => "l oc_cpxd col1 row" + i)
        .attr("data-stt", (d, i) => i)
        .attr("value", (d) => d.mota)
        .on("change", (ev) => {
          //try {
          let stt = ev.target.dataset.stt;
          let v = ev.target.value || '';
          console.log('mota change=', v, ' stt=', stt, ' ev=', ev.target);
          if (v.length > 0) {
            let r = ga.oc.cpxd[stt];
            r.mota = v;
            //tinh lai gia chi phi
            idb.tinh.oc.cpxd(stt);
          }
          web.oc.cpxd();
          web.oc.bth();
          web.move2id('oc_cpxd', stt, 1, 13);
          //} catch (err) {
          //console.log("err=", JSON.stringify(err));
          //web.oc.cpxd();
          //}
        })
        .on("keydown", function (ev) {
          if ([13, 40, 38].includes(ev.keyCode)) {
            web.move2id('oc_cpxd', ev.target.dataset.stt, 1, ev.keyCode);
          }
        });
      row.append('td')
        .attr("class", "c bb")
        .text((d) => d.dvt);
      row.append('td')
        .attr("class", "bb")
        .append('input')
        .attr("class", (d, i) => "r oc_cpxd col3 row" + i)
        .attr("data-stt", (d, i) => i)
        .attr("value", (d) => viewso(d.soluong, 0))
        .on("change", (ev) => {
          try {
            let stt = ev.target.dataset.stt;
            let v = Math.abs(parseFloat(ev.target.value)) || 0;
            if (v > 0) {
              let r = ga.oc.cpxd[stt];
              r.soluong = v;
              r.tienvl = lamtronso(r.soluong * r.giavl, 0);
              r.tiennc = lamtronso(r.soluong * r.gianc, 0);
              r.tienmtc = lamtronso(r.soluong * r.giamtc, 0);
            }
            web.oc.cpxd();
            web.oc.bth();
            web.move2id('oc_cpxd', stt, 3, 13);
          } catch (err) {
            web.oc.cpxd();
          }
        })
        .on("keydown", function (ev) {
          if ([13, 40, 38].includes(ev.keyCode)) {
            web.move2id('oc_cpxd', ev.target.dataset.stt, 3, ev.keyCode);
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
            idutc = ev.target.dataset.chiphi || 0;
          if (idutc > 0) {
            ga.cptl[stt].idutc = idutc;
            ga.cptl[stt].chiphi = idutc;
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
  tientrinh: () => {
    let hg, zone = d3.select("#tientrinh")
    if (app.prog === 100) {
      zone.selectAll("*").remove();
      if (hg) { clearTimeout(hg); }
    } else {
      zone.selectAll("*").remove();
      zone.append("label").text("Tiến trình ");
      zone.append("progress")
        .attr("max", 100)
        .attr("value", app.prog)
        .text([app.prog, "%"].join(''));
      hg = setTimeout(web.tientrinh(), 300);
    }
  },
  box: {
    hov: { mau1: "#9999ff" },
    nam: (zone, inp) => {

    },
    move2id: (bang, row = 0, col = 3, keyCode = 0) => {
      console.log("box move2id ", bang, " row=", row, " col=", col, " keyCode=", keyCode);
      console.log("box move2id comb=", JSON.stringify(d3.select("#comb-chiphi")));
      try {
        bang = bang.toString().toLowerCase();
        if (bang.length < 1) {
          return;
        } else {
          if (!['chiphi'].includes(bang)) {
            return;
          }
        }
        row = row === '0' ? 0 : parseInt(row) || -1;
        if (row < 0) { return; }
        col = col === '0' ? 0 : parseInt(col) || -1;
        if (col < 0) { return; }
        keyCode = keyCode === '0' ? 0 : parseInt(keyCode) || -1;
        if (keyCode < 0) { return; }
      } catch (err) { return; }
      let e,
        het = ga[bang].length || 0,
        s = ['.', bang].join('');
      d3.selectAll(s).classed("mau", false);
      if ([13, 40].includes(keyCode)) {
        try {
          s = ['.', bang, '.row', row + 1, '.col', col].join('');
          d3.select(s).classed("mau", true);
        } catch (err) {
          s = ['.', bang, '.row', 0, '.col', col].join('');
          console.log("box move2id toi ", s);
          d3.select(s).classed("mau", true);
        }
      }
      if ([38].includes(keyCode)) {
        try {
          s = ['.', bang, '.row', row - 1, '.col', col].join('');
          d3.select(s).classed("mau", true);
          console.log("box move2id toi ", s);
        } catch (err) {
          s = ['.', bang, '.row', het - 1, '.col', col].join('');
          d3.select(s).classed("mau", true);
          console.log("box move2id toi ", s);
        }
      }
    },
    chiphi: (el, plcp, stim) => {
      console.log("box chiphi el=", el, " plcp=", plcp, " stim=", stim);

      function kq2el(uid = null, show = null) {
        try {
          let zone = d3.select(el);
          zone.attr("data-chiphi", uid);
          zone.attr("value", show);
        } catch (err) { }
      };

      function tomau(chuoi, stim, sac = 'red') {
        try { chuoi = chuoi.toString().toLowerCase(); } catch (err) { return null; }
        try {
          stim = stim.toString().toLowerCase();
          if (stim.length < 1) { return chuoi; }
        } catch (err) { return chuoi; }
        let mau = web.sregexp(stim);
        mau = new RegExp(mau, "gi");
        chuoi = chuoi.replace(mau, (m) => {
          if (m === undefined || m === null || m === "") { return; }
          return ["<b style='color:", sac, "'>", m, "</b>"].join('');
        });
        return chuoi;
      };
      try { stim = stim.toString().toLowerCase(); } catch (err) { stim = ''; }
      let vt, vl, zone, bang, rec, dulieu, tieude, k, r;
      try {
        zone = d3.select(el);
        vl = zone.style("left");
        vt = zone.style("top") + zone.style("height");
        d3.select("#comb-chiphi").remove();
      } catch (err) { return; }
      dulieu = [];
      rec = Object.keys(ga.chiphi).sort();
      switch (plcp) {
        case 'cpvt':
          tieude = ga.tieude.chiphi.vt;
          for (k in rec) {
            r = ga.chiphi[rec[k]];
            if (r && r.plcp.includes('vt') && JSON.stringify(r).includes(stim)) {
              dulieu.push(r);
            }
          }
          break;
        case 'cpvl':
          tieude = ga.tieude.chiphi.vl;
          for (k in rec) {
            r = ga.chiphi[rec[k]];
            if (r && r.plcp.includes('vl') && JSON.stringify(r).includes(stim)) {
              dulieu.push(r);
            }
          }
          break;
        case 'tl':
        case 'tlmd':
          tieude = ga.tieude.chiphi.tl;
          for (k in rec) {
            r = ga.chiphi[rec[k]];
            if (r && r.plcp.includes('tl') && JSON.stringify(r).includes(stim)) {
              dulieu.push(r);
            }
          }
          break;
        default:
          tieude = ga.tieude.chiphi.xd;
          for (k in rec) {
            r = ga.chiphi[rec[k]];
            if (r && r.plcp.includes('xd') && JSON.stringify(r).includes(stim)) {
              dulieu.push(r);
            }
          }
      }
      zone = d3.select(el.parentNode).append("div")
        .attr("id", "comb-chiphi")
        .style("display", "block")
        .style("background-color", "white")
        .style("overflow", "auto")
        .style("position", "absolute")
        .style("top", vt)
        .style("left", vl)
        .style("margin", "0")
        .style("width", "20cm")
        .style("max-height", "1.6cm")
        .style("border", "1px solid black");
      /*.on("scroll", (ev, d) => {
        let y = ev.target.scrollTop;
        console.log("scroll y=", y)
        if (y < 20) {
          d3.select(ev.target).selectAll("th")
            .style("position", "relative")
            .style("top", "0");
        } else {
          d3.select(ev.target).selectAll("th")
            .style("position", "sticky")
            .style("top", "0");
        }
      });*/

      //bang
      bang = zone.append("table")
        .style("border-collapse", "collapse")
        .style("border-spacing", "1px 1px")
        .style("width", "100%");
      //tieude
      bang.selectAll("th").data(tieude)
        .enter()
        .append("th")
        .attr("class", "c")
        .style("width", (d, i) => {
          switch (i) {
            case 0:
              return "70%";
            case 1:
              return "10%";
            case 2:
              return "20%";
            default:
              return "auto";
          }
        })
        .text((col) => col);
      //noidung
      bang.selectAll("tr").remove();
      rec = bang.selectAll("tr").data(dulieu).enter().append("tr");
      rec.attr("class", "l")
        .style("width", "100%")
        .on("mouseover", (ev, d) => {
          try {
            kq2el(d.idutc, d.mota.qtgt);
          } catch (err) { }
        })
        .on("click", (ev, d) => {
          console.log("row click d=", d);
          try {
            kq2el(d.idutc, d.mota.qtgt);
          } catch (err) { }
        });
      //cells
      rec.append('td')
        .attr("data-stt", (d, i) => i)
        .attr("class", (d, i) => "l chiphi col1 row" + i)
        .html((d, i) => tomau(d.mota.qtgt, stim));
      rec.append('td')
        .attr("class", "c")
        .text((d) => d.dvt);
      rec.append('td')
        .attr("class", "c")
        .text((d) => d.idutc || d.id);
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
          idx = db.createObjectStore('hoso', { keyPath: 'idutc' });
          idx = db.createObjectStore('khachhang', { keyPath: 'idutc' });
          idx = db.createObjectStore('khuvuc', { keyPath: 'idutc' });
          idx = db.createObjectStore('dot', { keyPath: 'idutc' });
          idx = db.createObjectStore('donvithicong', { keyPath: 'idutc' });
          idx = db.createObjectStore('hoancong', { keyPath: 'idutc' });
          idx = db.createObjectStore('trongai', { keyPath: 'idutc' });
          //chiphi
          idx = db.createObjectStore('chiphi', { keyPath: 'idutc' });
          idx = db.createObjectStore('chiphiquanly', { keyPath: 'idutc' });
          //baogia
          idx = db.createObjectStore('bgvl', { keyPath: 'idutc' });
          idx = db.createObjectStore('bgnc', { keyPath: 'idutc' });
          idx = db.createObjectStore('bgmtc', { keyPath: 'idutc' });
          idx = db.createObjectStore('bgtl', { keyPath: 'idutc' });
          //qtvt
          idx = db.createObjectStore('qtvt', { keyPath: 'idutc' });
          idx = db.createObjectStore('qtvt_cpvt', { keyPath: 'idutc' });
          //qtgt
          idx = db.createObjectStore('qtgt', { keyPath: 'idutc' });
          idx = db.createObjectStore('qtgt_cpxd', { keyPath: 'idutc' });
          idx = db.createObjectStore('qtgt_cpvl', { keyPath: 'idutc' });
          idx = db.createObjectStore('qtgt_cpvt', { keyPath: 'idutc' });
          idx = db.createObjectStore('qtgt_cptl', { keyPath: 'idutc' });
          //scan
          idx = db.createObjectStore('scan', { keyPath: 'idutc' });
          //web
          idx = db.createObjectStore('nhanvien', { keyPath: 'idutc' });
        }
      };
    } catch (err) { };
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
      w[t] = new Worker(ga.url['swidb']);
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
        uid = [plgia, '.', mabaogia, '.', chiphi].join('');
      if (!(bang in ga)) {
        ga[bang] = {};
        ga[bang][uid] = 0;
      }
      if (!(uid in ga[bang])) { ga[bang][uid] = 0; }
      //main
      w = new Worker(ga.url['swidb']);
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
      w = new Worker(ga.url['swidb']);
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
      w = new Worker(ga.url['swidb']);
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
      w = new Worker(ga.url['swidb']);
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



function luanhoi() {
  web.tao();
  idb.taodb();
  //web.ongcai();
}
luanhoi();

function test_dulieu() {
  let dl = [
    {
      "idutc": Date.now() + 1,
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
      "idutc": Date.now() + 2,
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
      "idutc": Date.now() + 3,
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
      "idutc": Date.now(),
      "refs": { "chiphiid": 100 },
      "data": {
        "mabaogia": 20190825, "chiphi": 100,
        "dutoan": 1525.4, "ketoan": 1525,
      },
      "status": "chyenjson",
      "lastupdate": Date.now()
    },
    {
      "idutc": Date.now() + 1,
      "refs": { "chiphiid": 100 },
      "data": {
        "mabaogia": 20190725, "chiphi": 100,
        "dutoan": 4432.68, "ketoan": 4432,
      },
      "status": "chyenjson",
      "lastupdate": Date.now()
    },
    {
      "idutc": Date.now() + 2,
      "refs": { "chiphiid": 100 },
      "data": {
        "mabaogia": 20190721, "chiphi": 100,
        "dutoan": 5247.35, "ketoan": 5247,
      },
      "status": "chyenjson",
      "lastupdate": Date.now()
    },
    {
      "idutc": Date.now() + 3,
      "refs": { "chiphiid": 200 },
      "data": {
        "mabaogia": 20190825, "chiphi": 200,
        "dutoan": 1250.4, "ketoan": 1250,
      },
      "status": "chyenjson",
      "lastupdate": Date.now()
    },
    {
      "idutc": Date.now() + 4,
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
}
//test_dulieu();
//let mabaogia = 20200827,
//  chiphi = '001',
//  plgia = 'dutoan';
idb.gom.val('chiphiquanly', "327/bgtlmđ");
//console.log("ga.bgvl=", JSON.stringify(ga.bgvl));