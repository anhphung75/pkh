import { lamtronso, viewso } from "./../utils.js"

var ga = {
  gom: null,
  tientrinh: 100,
  plgia: 'dutoan',
  mabaogia: 20210101,
  macpql: 20200827,
  namlamviec: new Date().getFullYear().toString(),
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
  tao: () => {
    //web.namlamviec();
    web.oc.cpxd();
    web.oc.cpvt();
    web.oc.cpvl();
    web.oc.bth();
    //web.on.cpxd();
    //web.on_cpvt();
    //web.on_cpvl();
    //web.ongnganh();
    web.tlmd.cptl();
    web.tlmd.bth();
  },

  namlamviec: () => {
    d3.select("#namlamviec").on("change", function () {
      let namchu = this.value.toString();
      if (ga["namlamviec"] == namchu) {
        return;
      }
      if (/^\d+$/.test(namchu)) {
        ga["namlamviec"] = namchu;
      } else {
        switch (namchu) {
          case "":
          case "all":
          case "tat":
            ga["namlamviec"] = "";
            break;
          default:
            ga["namlamviec"] = new Date().getFullYear().toString();
        }
      }
      ga.lay_api();
    });
  },
  dieuhuong: (bang, row = 0, col = 3, keyCode = 0) => {
    console.log("dieuhuong truoc ", bang, " row=", row, " col=", col, " keyCode=", keyCode);
    try {
      bang = bang.toString().toLowerCase();
      if (bang.length < 1) {
        return;
      } else {
        if (!['chiphi', 'oc_cpxd', 'oc_cpvt', 'oc_cpvl',
          'on_cpxd', 'on_cpvt', 'on_cpvl', 'cptl'
        ].includes(bang)) {
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
    let s, e, het;
    switch (bang) {
      case 'oc_cpxd':
        het = ga.oc.cpxd.length || 0;
        break;
      case 'oc_cpvt':
        het = ga.oc.cpvt.length || 0;
        break;
      case 'oc_cpvl':
        het = ga.oc.cpvl.length || 0;
        break;
      case 'on_cpxd':
        het = ga.on.cpxd.length || 0;
        break;
      case 'on_cpvt':
        het = ga.on.cpvt.length || 0;
        break;
      case 'on_cpvl':
        het = ga.on.cpvl.length || 0;
        break;
      default:
        het = ga[bang].length || 0;
    }
    if ([13, 40].includes(keyCode)) {
      try {
        s = ['.', bang, '.row', row + 1, '.col', col].join('');
        console.log("dieuhuong 13,40 ", bang, " row=", row, " col=", col, " keyCode=", keyCode);
        e = d3.select(s).node();
        e.focus();
        e.select();
      } catch (err) {
        switch (bang) {
          case 'cptl':
            break;
          case 'oc_cpxd':
            bang = 'oc_cpvt';
            break;
          case 'oc_cpvt':
            bang = 'oc_cpvl';
            break;
          case 'oc_cpvl':
            bang = 'oc_cpxd';
            break;
          case 'on_cpxd':
            bang = 'on_cpvt';
            break;
          case 'on_cpvt':
            bang = 'on_cpvl';
            break;
          case 'on_cpvl':
            bang = 'on_cpxd';
            break;
          default:
            bang = 'chiphi';
        }
        s = ['.', bang, '.row', 0, '.col', col].join('');
        e = d3.select(s).node();
        e.focus();
        e.select();
      }
    }
    if ([38].includes(keyCode)) {
      try {
        s = ['.', bang, '.row', row - 1, '.col', col].join('');
        e = d3.select(s).node();
        e.focus();
        e.select();
      } catch (err) {
        switch (bang) {
          case 'cptl':
            break;
          case 'oc_cpxd':
            bang = 'oc_cpvl';
            break;
          case 'oc_cpvl':
            bang = 'oc_cpvt';
            break;
          case 'oc_cpvt':
            bang = 'oc_cpxd';
            break;
          case 'on_cpxd':
            bang = 'on_cpvl';
            break;
          case 'on_cpvl':
            bang = 'on_cpvt';
            break;
          case 'on_cpvt':
            bang = 'on_cpxd';
            break;
          default:
            bang = 'chiphi';
        }
        s = ['.', bang, '.row', het - 1, '.col', col].join('');
        e = d3.select(s).node();
        e.focus();
        e.select();
      }
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
          web.dieuhuong('oc_cpxd', stt, 1, 13);
          //} catch (err) {
          //console.log("err=", JSON.stringify(err));
          //web.oc.cpxd();
          //}
        })
        .on("keydown", function (ev) {
          if ([13, 40, 38].includes(ev.keyCode)) {
            web.dieuhuong('oc_cpxd', ev.target.dataset.stt, 1, ev.keyCode);
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
            web.dieuhuong('oc_cpxd', stt, 3, 13);
          } catch (err) {
            web.oc.cpxd();
          }
        })
        .on("keydown", function (ev) {
          if ([13, 40, 38].includes(ev.keyCode)) {
            web.dieuhuong('oc_cpxd', ev.target.dataset.stt, 3, ev.keyCode);
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
          web.dieuhuong('oc_cpvt', stt, 1, 13);
          //} catch (err) {
          //console.log("err=", JSON.stringify(err));
          //web.oc.cpvt();
          //}
        })
        .on("keydown", function (ev) {
          if ([13, 40, 38].includes(ev.keyCode)) {
            web.dieuhuong('oc_cpvt', ev.target.dataset.stt, 1, ev.keyCode);
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
            web.dieuhuong('oc_cpvt', stt, 3, 13);
          } catch (err) {
            web.oc.cpvt();
          }
        })
        .on("keydown", function (ev) {
          if ([13, 40, 38].includes(ev.keyCode)) {
            web.dieuhuong('oc_cpvt', ev.target.dataset.stt, 3, ev.keyCode);
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
          web.dieuhuong('oc_cpvl', stt, 1, 13);
          //} catch (err) {
          //console.log("err=", JSON.stringify(err));
          //web.oc.cpvl();
          //}
        })
        .on("keydown", function (ev) {
          if ([13, 40, 38].includes(ev.keyCode)) {
            web.dieuhuong('oc_cpvl', ev.target.dataset.stt, 1, ev.keyCode);
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
            web.dieuhuong('oc_cpvl', stt, 3, 13);
          } catch (err) {
            web.oc.cpvl();
          }
        })
        .on("keydown", function (ev) {
          if ([13, 40, 38].includes(ev.keyCode)) {
            web.dieuhuong('oc_cpvl', ev.target.dataset.stt, 3, ev.keyCode);
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
          //hien combobox de lua chi phi
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
          web.dieuhuong('cptl', 1, stt, 13);
        })
        .on("keydown", function (ev) {
          if ([13].includes(ev.keyCode)) {
            web.dieuhuong('cptl', ev.target.dataset.stt, 1, ev.keyCode);
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
              console.log("dieuhuong chiphi")
              web.box.dieuhuong('chiphi', row, 1, ev.keyCode);
            } else {
              console.log("dieuhuong cptl")
              web.dieuhuong('cptl', ev.target.dataset.stt, 1, ev.keyCode);
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
          web.dieuhuong('cptl', stt, 3, 13);
        })
        .on("keydown", function (ev) {
          if ([13, 40, 38].includes(ev.keyCode)) {
            web.dieuhuong('cptl', ev.target.dataset.stt, 3, ev.keyCode);
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
          web.dieuhuong('cptl', stt, 3, 13);
        })
        .on("keydown", function (ev) {
          if ([13, 40, 38].includes(ev.keyCode)) {
            web.dieuhuong('cptl', ev.target.dataset.stt, 4, ev.keyCode);
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
    if (ga.tientrinh === 100) {
      zone.selectAll("*").remove();
      clearTimeout(hg);
    } else {
      zone.selectAll("*").remove();
      zone.append("label").text("Tiến trình ");
      zone.append("progress")
        .attr("max", 100)
        .attr("value", ga.tientrinh)
        .text([ga.tientrinh, "%"].join(''));
      hg = setTimeout(web.tientrinh(), 300);
    }
  },
  box: {
    dieuhuong: (bang, row = 0, col = 3, keyCode = 0) => {
      console.log("box dieuhuong ", bang, " row=", row, " col=", col, " keyCode=", keyCode);
      console.log("box dieuhuong comb=", JSON.stringify(d3.select("#comb-chiphi")));
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
          console.log("box dieuhuong toi ", s);
          d3.select(s).classed("mau", true);
        }
      }
      if ([38].includes(keyCode)) {
        try {
          s = ['.', bang, '.row', row - 1, '.col', col].join('');
          d3.select(s).classed("mau", true);
          console.log("box dieuhuong toi ", s);
        } catch (err) {
          s = ['.', bang, '.row', het - 1, '.col', col].join('');
          d3.select(s).classed("mau", true);
          console.log("box dieuhuong toi ", s);
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
  datalist: {
    nam: () => {
      let dl = [{ k: 0, v: "All" }],
        nam = new Date().getFullYear();
      for (i in [0, 1, 2, 3, 4, 5]) {
        let k = (nam - i).toString(),
          v = nam - i;
        dl.push({ k: k, v: v });
      }
      let zone = d3.select("webapp").append("datalist")
        .attr("id", "dl_nam");
      zone.selectAll("option").data(dl)
        .enter()
        .append("option")
        .attr("value", (d) => d.k)
        .text((d) => d.v);
    },
    cpql: () => {
      idb.gom("cpql", 0);
      if (ga.tientrinh !== 100) { return null; }
      let zone, k, dl = new Set();
      for (k in Object.keys(ga.gom).sort((a, b) => b - a)) {
        dl.add({ k: k, v: ga.gom[k].macpql })
      }
      zone = d3.select("webapp").append("datalist")
        .attr("id", "dl_cpql");
      zone.selectAll("option").data(dl)
        .enter()
        .append("option")
        .attr("value", (d) => d.k)
        .text((d) => d.v);
    },
  },
};



var api = {
  nap: {

  },
  luu: {

  },
};

var idb = {
  csdl: { ten: 'cntd', cap: 1 },
  taodb: () => {
    let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    if (!indexedDB) {
      return null;
    };
    try {
      let yc = indexedDB.open(idb.csdl.ten, idb.csdl.cap);
      yc.onupgradeneeded = e => {
        let db = e.target.result;
        if (e.oldVersion < idb.csdl.cap) {
          let idx = db.createObjectStore('tttt', { keyPath: 'tttt' });
          idx = db.createObjectStore('hoso', { keyPath: 'idutc' });
          idx = db.createObjectStore('khachhang', { keyPath: 'idutc' });
          idx = db.createObjectStore('dot', { keyPath: 'idutc' });
          idx = db.createObjectStore('donvithicong', { keyPath: 'idutc' });
          idx = db.createObjectStore('hoancong', { keyPath: 'idutc' });
          idx = db.createObjectStore('chiphi', { keyPath: 'idutc' });
          idx = db.createObjectStore('cpxd', { keyPath: 'idutc' });
          idx = db.createObjectStore('cpvl', { keyPath: 'idutc' });
          idx = db.createObjectStore('cpvt', { keyPath: 'idutc' });
          idx = db.createObjectStore('chiphiquanly', { keyPath: 'idutc' });
          idx = db.createObjectStore('khuvuc', { keyPath: 'idutc' });
          idx = db.createObjectStore('baogia', { keyPath: 'idutc' });
          idx = db.createObjectStore('bgvl', { keyPath: 'idutc' });
          idx = db.createObjectStore('bgnc', { keyPath: 'idutc' });
          idx = db.createObjectStore('bgmtc', { keyPath: 'idutc' });
          idx = db.createObjectStore('bgtl', { keyPath: 'idutc' });

          idx = db.createObjectStore('nhanvien', { keyPath: 'idutc' });

          idx = db.createObjectStore('scan', { keyPath: 'idutc' });
        }
      };
    } catch (err) { };
  },

  luu: (bang, dl) => {
    try {
      bang = bang.toString().toLowerCase();
      if (bang.length < 1) { return; }
    } catch (err) { return; }
    try {
      if (!Array.isArray(dl)) {
        dl = [dl];
      }
    } catch (err) { return; }
    let k, v, gui, tin,
      ii = 0,
      w = {},
      wu = {},
      l = dl.length;
    while (ii < l) {
      try {
        tin = {
          csdl:idb.csdl,
          bang: bang,
          luu: dl[ii],
        };
        console.log("idb.luu gui dl[", ii, "] tin=", JSON.stringify(tin, null, 2));
        wu[ii] = sw.idb.luu1();
        console.log("idb.luu gui wu[", ii, "]=", JSON.stringify(wu[ii], null, 2));
        w[ii] = new Worker(wu);
        console.log("idb.luu gui w[", ii, "]=", JSON.stringify(w[ii], null, 2));
        w[ii].postMessage(tin);
        w[ii].onmessage = (e) => {
          tin = e.data;
          console.log("idb.luu nhan tin=", JSON.stringify(tin, null, 2));
          if (("cv" in tin) && (tin.cv < 0)) {
            try {
              w[ii].terminate();
              w[ii] = null;
            } catch (err) { }
            try {
              (window.URL || window.webkitURL).revokeObjectURL(wu[ii]);
              wu[ii] = null;
            } catch (err) { }
          }
          if ("err" in tin) {
            console.log("err=", tin.err);
            //lam lai sau 2 giay
            setTimeout(() => { w[ii].postMessage(gui); }, 2000);
          }
          if (("cv" in tin) && (tin.cv > 0) && ("kq" in tin)) {
            console.log("idb.luu nhan tin.kq=", tin.kq);
          }
        }
      } catch (err) { console.log("idb.luu  err=", err); }
      ii++;
    }
  },
  gom: (bang, nam = 0) => {
    try {
      bang = bang.toString().toLowerCase();
      if (bang.length < 1) { return; }
    } catch (err) { return; }
    try {
      nam = parseInt(nam);
    } catch (err) { nam = 0; }
    ga.gom = {};
    let k, v, w, wu, gui, tin;
    try {
      gui = { bang: bang, gom: { nam: nam }, };
      console.log("idb.gom gui tin=", JSON.stringify(gui, null, 2));
      wu = sw.idb.gom();
      w = new Worker(wu);
      w.postMessage(gui);
      w.onmessage = (e) => {
        tin = e.data;
        console.log("idb.gom nhan tin=", JSON.stringify(tin, null, 2));
        if (("cv" in tin) && (tin.cv < 0)) {
          try {
            w.terminate();
            w = null;
          } catch (err) { }
          try {
            (window.URL || window.webkitURL).revokeObjectURL(wu);
            wu = null;
          } catch (err) { }
        }
        if ("err" in tin) {
          console.log("err=", tin.err);
          //lam lai sau 2 giay
          setTimeout(() => { w.postMessage(gui); }, 2000);
        }
        if (("cv" in tin) && (tin.cv > 0) && ("kq" in tin)) {
          console.log("idb.gom nhan tin.kq=", tin.kq);
          v = tin.kq;
          k = v.idutc;
          ga.gom[k] = v;
        }
      }
    } catch (err) { }
  },
  nap: (bang, nap = { uid: 0 }) => {
    try {
      bang = bang.toString().toLowerCase();
      if (bang.length < 1) { return; }
    } catch (err) { return; }
    if (!(bang in ga)) { ga[bang] = {}; }
    let k, w, wu, gui, tin;

    try {
      gui = { bang: bang, nap: nap, };
      console.log("idb.nap gui tin=", JSON.stringify(gui, null, 2));
      wu = sw.idb.nap1.baogia();
      w = new Worker(wu);
      w.postMessage(gui);
      w.onmessage = (e) => {
        tin = e.data;
        console.log("idb.nap1 nhan tin=", JSON.stringify(tin, null, 2));
        if (("cv" in tin) && (tin.cv < 0)) {
          try {
            w.terminate();
            w = null;
          } catch (err) { }
          try {
            (window.URL || window.webkitURL).revokeObjectURL(wu);
            wu = null;
          } catch (err) { }
        }
        if ("err" in tin) {
          console.log("err=", tin.err);
          //lam lai sau 2 giay
          setTimeout(() => { w.postMessage(gui); }, 2000);
        }
        if (("cv" in tin) && (tin.cv > 0) && ("kq" in tin)) {
          console.log("idb.nap1 nhan tin.kq=", tin.kq);
          ga[bang][k] = tin.kq;
        }
      }
    } catch (err) { }
  },
  nap1: {
    idutc: (bang, uid = null) => {
      try {
        bang = bang.toString().toLowerCase();
        if (bang.length < 1) { return; }
      } catch (err) { return; }
      try {
        uid = uid === '0' ? 0 : parseInt(uid) || -1;
        if (uid < 0) { return; }
      } catch (err) { return; }
      //main prog
      let w, wu, gui, tin;
      if (!(bang in ga)) { ga[bang] = { uid: {} }; }
      if (!(uid in ga[bang])) { ga[bang][uid] = {}; }
      try {
        gui = {
          bang: bang,
          nap: { idutc: uid },
        };
        console.log("idb.nap1 gui tin=", JSON.stringify(gui, null, 2));
        wu = sw.idb.nap1.idutc();
        w = new Worker(wu);
        w.postMessage(gui);
        w.onmessage = (e) => {
          tin = e.data;
          console.log("idb.nap1 nhan tin=", JSON.stringify(tin, null, 2));
          if (("cv" in tin) && (tin.cv < 0)) {
            try {
              w.terminate();
              w = null;
            } catch (err) { }
            try {
              (window.URL || window.webkitURL).revokeObjectURL(wu);
              wu = null;
            } catch (err) { }
          }
          if ("err" in tin) {
            console.log("err=", tin.err);
            //lam lai sau 2 giay
            setTimeout(() => { w.postMessage(gui); }, 2000);
          }
          //load to ga
          if (("cv" in tin) && (tin.cv > 0) && ("kq" in tin)) {
            console.log("idb.nap1 nhan tin.kq=", tin.kq);
            ga[bang][uid] = tin.kq;
          }
        }
      } catch (err) { }
    },
    makhoa: (bang, sma = null, vma = null) => {
      try {
        bang = bang.toString().toLowerCase();
        if (bang.length < 1) { return; }
      } catch (err) { return; }
      try {
        sma = sma.toString().toLowerCase();
        if (sma.length < 1) { return; }
      } catch (err) { return; }
      try {
        vma = vma.toString().toLowerCase();
        if (vma.length < 1) { return; }
      } catch (err) { return; }
      //main prog
      let w, wu, gui, tin;
      if (!(bang in ga)) { ga[bang] = { vma: {} }; }
      if (!(vma in ga[bang])) { ga[bang][vma] = {}; }
      try {
        gui = {
          bang: bang,
          nap: { sma: sma, vma: vma },
        };
        console.log("idb.nap1 gui tin=", JSON.stringify(gui, null, 2));
        wu = sw.idb.nap1.makhoa();
        w = new Worker(wu);
        w.postMessage(gui);
        w.onmessage = (e) => {
          tin = e.data;
          console.log("idb.nap1 nhan tin=", JSON.stringify(tin, null, 2));
          if (("cv" in tin) && (tin.cv < 0)) {
            try {
              w.terminate();
              w = null;
            } catch (err) { }
            try {
              (window.URL || window.webkitURL).revokeObjectURL(wu);
              wu = null;
            } catch (err) { }
          }
          if ("err" in tin) {
            console.log("err=", tin.err);
            //lam lai sau 2 giay
            setTimeout(() => { w.postMessage(gui); }, 2000);
          }
          //load to ga
          if (("cv" in tin) && (tin.cv > 0) && ("kq" in tin)) {
            console.log("idb.nap1 nhan tin.kq=", tin.kq);
            ga[bang][vma] = tin.kq;
          }
        }
      } catch (err) { }
    },
    baogia: (bang, chiphi, baogia, plgia = 'dutoan') => {
      try {
        bang = bang.toString().toLowerCase();
        if (bang.length < 1) { return; }
        if (!(['bgvl', 'bgnc', 'bgmtc', 'bgtl'].includes(bang))) { bang = 'bgvl'; }
      } catch (err) { return; }
      let w, wu, gui, tin,
        uid = [plgia, '.', mabaogia, '.', chiphi].join('');
      if (!(bang in ga)) { ga[bang] = { uid: 0 }; }
      if (!(uid in ga[bang])) { ga[bang][uid] = 0; }
      try {
        gui = {
          bang: bang,
          nap: { chiphi: chiphi, baogia: baogia, plgia: plgia },
        };
        console.log("idb.nap1 gui tin=", JSON.stringify(gui, null, 2));
        wu = sw.idb.nap1.baogia();
        w = new Worker(wu);
        w.postMessage(gui);
        w.onmessage = (e) => {
          tin = e.data;
          console.log("idb.nap1 nhan tin=", JSON.stringify(tin, null, 2));
          if (("cv" in tin) && (tin.cv < 0)) {
            try {
              w.terminate();
              w = null;
            } catch (err) { }
            try {
              (window.URL || window.webkitURL).revokeObjectURL(wu);
              wu = null;
            } catch (err) { }
          }
          if ("err" in tin) {
            console.log("err=", tin.err);
            //lam lai sau 2 giay
            setTimeout(() => { w.postMessage(gui); }, 2000);
          }
          if (("cv" in tin) && (tin.cv > 0) && ("kq" in tin)) {
            console.log("idb.nap1 nhan tin.kq=", tin.kq);
            ga[bang][uid] = tin.kq;
          }
        }
      } catch (err) { }
    },
    chiphi: (uid = null) => {
      idb.nap1.idutc("chiphi", uid);
    },
    cpql: (macpql = 20200827) => {
      idb.nap1.makhoa("cpql", "macpql", ga.macpql || macpql);
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
  //web.ongcai();
}
luanhoi();
//let mabaogia = 20200827,
//  chiphi = '001',
//  plgia = 'dutoan';
//idb.nap1.baogia('bgvl', chiphi, mabaogia, plgia);
//console.log("ga.bgvl=", JSON.stringify(ga.bgvl));

function test_dulieu() {
  let dl = [
    {
      "idutc": 2001,
      "refs": { "hesoid": 20190725 },
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
      "idutc": 2002,
      "refs": { "hesoid": 20200721 },
      "data": {
        "macpql": 20200721, "vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.055, "giantiepkhac": 0.02, "thutinhtruoc": 0.055,
        "khaosat": 0.0207, "thietke": 1.2, "giamsat": 0.02566,
        "phaply": {
          "cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
          "cpql": "Nghị định 68/2019/NĐ-CP ngày 14/08/2019; Quyết định 2207/QĐ-UBND ngày 18/06/2020"
        },
      },
      "status": "Fin",
      "lastupdate": Date.now()
    },
    {
      "idutc": 2003,
      "refs": { "hesoid": 20200827, "ghichu": "quy ước làm tròn sl=3, tiền=0" },
      "data": {
        "macpql": 20200827, "vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.055, "giantiepkhac": 0.02, "thutinhtruoc": 0.055,
        "khaosat": 0.0207, "thietke": 1.2, "giamsat": 0.02566,
        "phaply": {
          "cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
          "cpql": "Nghị định 68/2019/NĐ-CP ngày 14/08/2019; Quyết định 2207/QĐ-UBND ngày 18/06/2020"
        },
      },
      "status": "Fin",
      "lastupdate": Date.now()
    },
  ]
  idb.luu("chiphiquanly", dl)
}
test_dulieu();