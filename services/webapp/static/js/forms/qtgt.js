import { lamtronso, viewso } from "./../utils.js"

var ga = {
  plgia: 'dutoan',
  mabaogia: 20210101,
  namlamviec: new Date().getFullYear().toString(),
  tieude: {
    cpxd: ['Tt', 'Mô tả công tác', 'Đvt', 'Số lượng', 'Giá vật liệu', 'Giá nhân công', 'Giá mtc', 'Tiền vật liệu', 'Tiền nhân công', 'Tiền mtc'],
    cpvt: ['Tt', 'Mô tả vật tư', 'Đvt', 'Số lượng', 'Giá vật liệu', 'Giá nhân công', 'Giá mtc', 'Tiền vật liệu', 'Tiền nhân công', 'Tiền mtc'],
    cpvl: ['Tt', 'Mô tả vật liệu', 'Đvt', 'Số lượng', 'Giá vật liệu', 'Giá nhân công', 'Giá mtc', 'Tiền vật liệu', 'Tiền nhân công', 'Tiền mtc'],
    cptl: ['Tt', 'Kết cấu tái lập', 'Đvt', 'Số lượng oc', 'Số lượng on', 'Giá', 'Tiền ống cái', 'Tiền ống nhánh']
  },
  oc_cpxd: [
    { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
    { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
    { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }],
  oc_cpvt: [
    { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 10, tienmtc: 20 },
    { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 200, tienmtc: 220 },
    { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 300, tienmtc: 330 }],
  oc_cpvl: [
    { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 10, tienmtc: 20 },
    { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 200, tienmtc: 220 },
    { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 300, tienmtc: 330 }],
  on_cpxd: [
    { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
    { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
    { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }],
  on_cpvt: [
    { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 10, tienmtc: 20 },
    { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 200, tienmtc: 220 },
    { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 300, tienmtc: 330 }],
  on_cpvl: [
    { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 10, tienmtc: 20 },
    { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 200, tienmtc: 220 },
    { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 300, tienmtc: 330 }],
  oc: {
    zvl: 0, znc: 0, zmtc: 0, ztl: 0,
    cpxd: [
      { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
      { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
      { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }],
    cpvt: [
      { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 10, tienmtc: 20 },
      { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 200, tienmtc: 220 },
      { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 300, tienmtc: 330 }],
    cpvl: [
      { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 10, tienmtc: 20 },
      { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 200, tienmtc: 220 },
      { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 300, tienmtc: 330 }],
  },
  on: {
    zvl: 0, znc: 0, zmtc: 0, ztl: 0,
    cpxd: [
      { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 100, gianc: 20, giamtc: 5000, tienvl: 0, tiennc: 10, tienmtc: 20 },
      { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 102, gianc: 60, giamtc: 80, tienvl: 0, tiennc: 200, tienmtc: 220 },
      { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 500, gianc: 10, giamtc: 100, tienvl: 0, tiennc: 300, tienmtc: 330 }],
    cpvt: [
      { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 10, tienmtc: 20 },
      { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 200, tienmtc: 220 },
      { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 300, tienmtc: 330 }],
    cpvl: [
      { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 10, tienmtc: 20 },
      { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 200, tienmtc: 220 },
      { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 300, tienmtc: 330 }],
  },
  cptl: [
    { chiphi: 1, mota: 'cp1', dvt: 'cai', oc_sl: 0, on_sl: 0, gia: 0, oc_tien: 0, on_tien: 10 },
    { chiphi: 2, mota: 'cp2', dvt: 'cai', oc_sl: 0, on_sl: 0, gia: 0, oc_tien: 0, on_tien: 200 },
    { chiphi: 3, mota: 'cp3', dvt: 'cai', oc_sl: 0, on_sl: 0, gia: 0, oc_tien: 0, on_tien: 5510 }],
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
  dieuhuong: (bang, col = 3, row = 0, keyCode = 0) => {
    if (!['oc_cpxd', 'oc_cpvt', 'oc_cpvl',
      'on_cpxd', 'on_cpvt', 'on_cpvl', 'cptl'].includes(bang)) {
      return;
    }
    if (!['1', '3', '4', 1, 3, 4].includes(col)) {
      return
    }
    row = parseInt(row) || 0;
    keyCode = parseInt(keyCode) || 0;
    let s, e, het = ga[bang].length || 0;
    if ([13, 40].includes(keyCode)) {
      try {
        s = ['.', bang, '.col', col, '.row', row + 1].join('');
        e = d3.select(s).node();
        e.focus();
        e.select();
      } catch (error) {
        s = ['.', bang, '.col', col, '.row', 0].join('');
        e = d3.select(s).node();
        e.focus();
        e.select();
      }
    }
    if ([38].includes(keyCode)) {
      try {
        s = ['.', bang, '.col', col, '.row', row - 1].join('');
        e = d3.select(s).node();
        e.focus();
        e.select();
      } catch (error) {
        s = ['.', bang, '.col', col, '.row', het - 1].join('');
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
          web.dieuhuong('oc_cpxd', 1, stt, 13);
          //} catch (err) {
          //console.log("err=", JSON.stringify(err));
          //web.oc.cpxd();
          //}
        })
        .on("keydown", function (ev) {
          if ([13, 40, 38].includes(ev.keyCode)) {
            web.dieuhuong('oc_cpxd', 1, ev.target.dataset.stt, ev.keyCode);
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
            let v = Match.abs(parseFloat(ev.target.value)) || 0;
            if (v > 0) {
              let r = ga.oc.cpxd[stt];
              r.soluong = v;
              r.tienvl = lamtronso(r.soluong * r.giavl, 0);
              r.tiennc = lamtronso(r.soluong * r.gianc, 0);
              r.tienmtc = lamtronso(r.soluong * r.giamtc, 0);
            }
            web.oc.cpxd();
            web.oc.bth();
            web.dieuhuong('oc_cpxd', 3, stt, 13);
          } catch (err) {
            web.oc.cpxd();
          }
        })
        .on("keydown", function (ev) {
          if ([13, 40, 38].includes(ev.keyCode)) {
            web.dieuhuong('oc_cpxd', 3, ev.target.dataset.stt, ev.keyCode);
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
        .attr("class", "l b0")
        .attr("data-stt", (d, i) => i)
        .attr("value", (d) => d.mota)
        .on("change", (ev) => {
          let stt = ev.target.dataset.stt;
          let v = ev.target.value || '';
          if (v.length > 0) {
            ga.oc.cpvt[stt].mota = v;
          }
          web.oc.cpvt();
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
            ga.oc.cpvt[stt].soluong = v;
          }
          web.oc.cpvt();
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
        .attr("class", "l b0")
        .attr("data-stt", (d, i) => i)
        .attr("value", (d) => d.mota)
        .on("change", (ev) => {
          let stt = ev.target.dataset.stt;
          let v = ev.target.value || '';
          if (v.length > 0) {
            ga.oc.cpvl[stt].mota = v;
          }
          web.oc.cpvl();
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
            ga.oc_cpvl[stt].soluong = v;
          }
          web.oc.cpvl();
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
      let bang, rec;
      bang = d3.select("table[id='cptl']")
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
      rec = bang.selectAll("tr").data(ga.cptl).enter().append("tr");
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
        .attr("class", "l b0")
        .attr("data-stt", (d, i) => i)
        .attr("value", (d) => d.mota)
        .on("change", (ev) => {
          try {
            let stt = ev.target.dataset.stt;
            let v = ev.target.value || '';
            if (v.length > 0) {
              ga.cptl[stt].mota = v;
              //tinh lai gia chi phi
              idb.tinh.cptl(stt);
            }
            web.tlmd.cptl();
            web.tlmd.bth();
            web.dieuhuong('cptl', 1, stt, 13);
          } catch (err) {
            web.tlmd.cptl();
          }
        });
      rec.append('td')
        .attr("class", "c bb")
        .text((d) => d.dvt);
      rec.append('td')
        .attr("class", "bb")
        .append('input')
        .attr("class", "r")
        .attr("data-stt", (d, i) => i)
        .attr("value", (d) => viewso(d.oc_sl, 0))
        .on("change", (ev, d) => {
          let stt = ev.target.dataset.stt;
          let v = parseFloat(ev.target.value) || 0;
          if (v > 0) {
            ga.cptl[stt].oc_sl = v;
          }
          web.tlmd.cptl();
        });
      rec.append('td')
        .attr("class", "bb")
        .append('input')
        .attr("class", "r")
        .attr("data-stt", (d, i) => i)
        .attr("value", (d) => viewso(d.on_sl, 0))
        .on("change", (ev, d) => {
          let stt = ev.target.dataset.stt;
          let v = parseFloat(ev.target.value) || 0;
          if (v > 0) {
            ga.cptl[stt].on_sl = v;
          }
          web.tlmd.cptl();
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

};

var sw = {
  idb: {
    nap1: {
      baogia: () => {
        if (kq) { self.postMessage({ cv: cv, kq: kq }); }
        let sw = `
        self.onmessage = (ev) => {
          let tin = ev.data;
          if (!("bang" in tin) || !("nap" in tin) || !tin.nap || (tin.nap<0)) {
            self.postMessage({ cv: -1, kq: "nothing to nap" });
          }
          try {
            let db, cs, ce, r, kq;
            let cv = 1, baogia = tin.nap.baogia, chiphi = tin.nap.baogia, plgia = tin.nap.baogia;
            ce = new Date(tin.nap.baogia).getTime();
            cs = parseInt(ce - 3600000*24*60);
            ce = parseInt(ce + 3600000*24);
            indexedDB.open("`+ idb.csdl.ten + `",` + idb.csdl.cap + `).onsuccess = (e) => {
              db = e.target.result;
              db.transaction(tin.bang, 'readonly')
                .objectStore(tin.bang)
                .openCursor(IDBKeyRange.bound(cs, ce))
                .onsuccess = (e) => {
                  cs = e.target.result;
                  ce = 0;
                  if (cs) {
                    r = cs.value;
                    if (r.data.mabaogia > ce && r.data.mabaogia <= baogia && r.data.chiphi.id === chiphi && r.data.plgia === plgia) {
                      ce = r.data.mabaogia;
                      kq = Math.abs(r.data[plgia]) || 0;
                    }
                    cs.continue();
                  } else {
                    if (kq) { self.postMessage({ cv: cv, kq: kq }); }
                    self.postMessage({ cv: -1, kq: null });
                  }
                }
            }
          } catch (err) {
            self.postMessage({ cv: cv, err: err });
          };
        }`;
        let blob = new Blob([sw], { type: "text/javascript" });
        let url = (window.URL || window.webkitURL).createObjectURL(blob);
        return url;
      },
    },
  },
  api: {

  },
};

var api = {

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
    let ii = 0, w = {}, l, tin;
    if (!Array.isArray(dl)) {
      dl = [dl];
    }
    l = dl.length;
    while (ii < l) {
      try {
        tin = {
          bang: bang,
          luu: dl[ii],
        };
        console.log("idb.luu gui dl[", ii, "] tin=", JSON.stringify(tin, null, 2));
        w[ii] = new Worker(sw_idb.luu1());
        w[ii].postMessage(tin);
        w[ii].onmessage = (e) => {
          tin = e.data;
          console.log("idb.luu tra tin=", JSON.stringify(tin, null, 2));
          if (("cv" in tin) && (tin.cv < 0)) {
            try {
              w[ii].terminate();
              delete w[ii];
            } catch (error) { }
          }
          if ("err" in tin) {
            console.log("err=", tin.err);
            //lam lai sau 2 giay
            setTimeout(() => { idb.luu(bang, dl[ii]); }, 2000);
          }
          if (("cv" in tin) && (tin.cv > 0) && ("kq" in tin)) {
            console.log("idb.luu tra tin.kq=", tin.kq);
          }
        }
      } catch (err) {
        break;
      }
      ii++;
    }
  },
  nap: (bang, uid) => {

  },
  nap1: {
    baogia: (bang, baogia, chiphi, plgia = 'dutoan') => {
      let k, w, wu, gui, tin;
      if (!bang || !(['bgvl', 'bgnc', 'bgmtc', 'bgtl']).includes(bang)) {
        bang = 'bgvl';
      }
      k = [plgia, '.', chiphi, '.', baogia].join('');
      if (!(bang in ga)) {
        ga[bang] = {};
      }
      if (k in ga[bang]) {
        return;
      }
      ga[bang][k] = 0;
      try {
        gui = {
          bang: bang,
          nap: { plgia: plgia, chiphi: chiphi, baogia: baogia },
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
            ga[bang][k] = tin.kq;
          }
        }
      } catch (err) { }
    },
    cpql: (macpql = 20200827) => {

    },
  },

  tinh: {
    oc: {
      cpxd: (stt = null) => {
        let r, k,
          ii = 0,
          m = ga.oc.cpxd.length || 0;
        if (m < 1) { return; }
        while (ii < m) {
          try {
            r = ga.oc.cpxd[ii];
            k = [ga.plgia, '.', ga.mabaogia, '.', r.chiphi].join('');
            idb.nap1.baogia('bgvl', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1.baogia('bgnc', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1.baogia('bgmtc', ga.mabaogia, r.chiphi, ga.plgia);
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
            r.soluong = lamtronso(Math.abs(r.soluong), 3);
            r.giavl = lamtronso(ga.bgvl[k], 0);
            r.gianc = lamtronso(ga.bgnc[k], 0);
            r.giamtc = lamtronso(ga.bgmtc[k], 0);
            r.tienvl = lamtronso(r.giavl * r.soluong, 0);
            r.tiennc = lamtronso(r.gianc * r.soluong, 0);
            r.tienmtc = lamtronso(r.giamtc * r.soluong, 0);
          } catch (err) { }
          ii++;
        }
      },
      cpvt: (stt = null) => {
        let r, k,
          ii = 0,
          m = ga.oc.cpvt.length || 0;
        if (m < 1) { return; }
        while (ii < m) {
          try {
            r = ga.oc.cpvt[ii];
            k = [ga.plgia, '.', ga.mabaogia, '.', r.chiphi].join('');
            idb.nap1.baogia('bgvl', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1.baogia('bgnc', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1.baogia('bgmtc', ga.mabaogia, r.chiphi, ga.plgia);
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
            r.soluong = lamtronso(Math.abs(r.soluong), 3);
            r.giavl = lamtronso(ga.bgvl[k], 0);
            r.gianc = lamtronso(ga.bgnc[k], 0);
            r.giamtc = lamtronso(ga.bgmtc[k], 0);
            r.tienvl = lamtronso(r.giavl * r.soluong, 0);
            r.tiennc = lamtronso(r.gianc * r.soluong, 0);
            r.tienmtc = lamtronso(r.giamtc * r.soluong, 0);
          } catch (err) { }
          ii++;
        }
      },
      cpvl: (stt = null) => {
        let r, k,
          ii = 0,
          m = ga.oc.cpvl.length || 0;
        if (m < 1) { return; }
        while (ii < m) {
          try {
            r = ga.oc.cpvl[ii];
            k = [ga.plgia, '.', ga.mabaogia, '.', r.chiphi].join('');
            idb.nap1.baogia('bgvl', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1.baogia('bgnc', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1.baogia('bgmtc', ga.mabaogia, r.chiphi, ga.plgia);
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
            r.soluong = lamtronso(Math.abs(r.soluong), 3);
            r.giavl = lamtronso(ga.bgvl[k], 0);
            r.gianc = lamtronso(ga.bgnc[k], 0);
            r.giamtc = lamtronso(ga.bgmtc[k], 0);
            r.tienvl = lamtronso(r.giavl * r.soluong, 0);
            r.tiennc = lamtronso(r.gianc * r.soluong, 0);
            r.tienmtc = lamtronso(r.giamtc * r.soluong, 0);
          } catch (err) { }
          ii++;
        }
      },
    },
    on: {
      cpxd: (stt = null) => {
        let r, k,
          ii = 0,
          m = ga.on.cpxd.length || 0;
        if (l < 1) { return; }
        ii = 0;
        while (ii < m) {
          try {
            r = ga.on.cpxd[ii];
            k = [ga.plgia, '.', r.chiphi, '.', ga.mabaogia].join('');
            idb.nap1_baogia('bgvl', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1_baogia('bgnc', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1_baogia('bgmtc', ga.mabaogia, r.chiphi, ga.plgia);
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
            k = [ga.plgia, '.', r.chiphi, '.', ga.mabaogia].join('');
            r.giavl = ga.bgvl[k] || 0;
            r.gianc = ga.bgnc[k] || 0;
            r.giamtc = ga.bgmtc[k] || 0;
            r.tienvl = lamtronso(r.giavl * r.soluong, 0);
            r.tiennc = lamtronso(r.gianc * r.soluong, 0);
            r.tienmtc = lamtronso(r.giamtc * r.soluong, 0);
            r.giavl = lamtronso(ga.bgvl[k], 0);
            r.gianc = lamtronso(ga.bgnc[k], 0);
            r.giamtc = lamtronso(ga.bgmtc[k], 0);
            r.soluong = lamtronso(r.soluong, 3);
          } catch (err) { }
          ii++;
        }
      },
      cpvt: () => {
        let r, k,
          ii = 0,
          m = ga.on.cpvt.length || 0;
        if (l < 1) { return; }
        while (ii < m) {
          try {
            r = ga.on.cpvt[ii];
            k = [ga.plgia, '.', r.chiphi, '.', ga.mabaogia].join('');
            idb.nap1_baogia('bgvl', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1_baogia('bgnc', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1_baogia('bgmtc', ga.mabaogia, r.chiphi, ga.plgia);
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
            k = [ga.plgia, '.', r.chiphi, '.', ga.mabaogia].join('');
            r.giavl = ga.bgvl[k] || 0;
            r.gianc = ga.bgnc[k] || 0;
            r.giamtc = ga.bgmtc[k] || 0;
            r.tienvl = lamtronso(r.giavl * r.soluong, 0);
            r.tiennc = lamtronso(r.gianc * r.soluong, 0);
            r.tienmtc = lamtronso(r.giamtc * r.soluong, 0);
            r.giavl = lamtronso(ga.bgvl[k], 0);
            r.gianc = lamtronso(ga.bgnc[k], 0);
            r.giamtc = lamtronso(ga.bgmtc[k], 0);
            r.soluong = lamtronso(r.soluong, 3);
          } catch (err) { }
          ii++;
        }
      },
      cpvl: () => {
        let r, k,
          ii = 0,
          m = ga.on.cpvl.length || 0;
        if (l < 1) { return; }
        while (ii < m) {
          try {
            r = ga.on.cpvl[ii];
            k = [ga.plgia, '.', r.chiphi, '.', ga.mabaogia].join('');
            idb.nap1_baogia('bgvl', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1_baogia('bgnc', ga.mabaogia, r.chiphi, ga.plgia);
            idb.nap1_baogia('bgmtc', ga.mabaogia, r.chiphi, ga.plgia);
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
            k = [ga.plgia, '.', r.chiphi, '.', ga.mabaogia].join('');
            r.giavl = ga.bgvl[k] || 0;
            r.gianc = ga.bgnc[k] || 0;
            r.giamtc = ga.bgmtc[k] || 0;
            r.tienvl = lamtronso(r.giavl * r.soluong, 0);
            r.tiennc = lamtronso(r.gianc * r.soluong, 0);
            r.tienmtc = lamtronso(r.giamtc * r.soluong, 0);
            r.giavl = lamtronso(ga.bgvl[k], 0);
            r.gianc = lamtronso(ga.bgnc[k], 0);
            r.giamtc = lamtronso(ga.bgmtc[k], 0);
            r.soluong = lamtronso(r.soluong, 3);
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
          idb.nap1_baogia('bgtl', ga.mabaogia, r.chiphi, ga.plgia);
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
          r.oc_sl = lamtronso(Math.abs(r.oc_sl), 3);
          r.on_sl = lamtronso(Math.abs(r.on_sl), 3);
          r.gia = lamtronso(ga.bgtl[k], 0);
          if ((ga.cpql.ma || ga.cpql.id) >= 20200827) {
            r.oc_tien = lamtronso(r.gia * r.oc_sl, 0);
            r.on_tien = lamtronso(r.gia * r.on_sl, 0);
          } else {
            r.oc_tien = lamtronso(r.gia * r.oc_sl / 1000, 0) * 1000;
            r.on_tien = lamtronso(r.gia * r.on_sl / 1000, 0) * 1000;
          }
        } catch (err) { }
        ii++;
      }
    },
    cpql: () => {
      if (!('cpql' in ga)) { ga.cpql = {} };
      let self = ga.cpql;
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
