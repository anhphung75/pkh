import { lamtronso, viewso } from "./../utils.js"

var ga = {
  csdl: { ten: "pkh", sohieu: 1 },
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
  cptl: [
    { chiphi: 1, mota: 'cp1', dvt: 'cai', oc_sl: 0, on_sl: 0, gia: 0, oc_tien: 0, on_tien: 10 },
    { chiphi: 2, mota: 'cp2', dvt: 'cai', oc_sl: 0, on_sl: 0, gia: 0, oc_tien: 0, on_tien: 200 },
    { chiphi: 3, mota: 'cp3', dvt: 'cai', oc_sl: 0, on_sl: 0, gia: 0, oc_tien: 0, on_tien: 5510 }],
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
    web.oc_cpxd();
    web.oc_cpvt();
    web.oc_cpvl();
    web.ongcai();
    web.on_cpxd();
    web.on_cpvt();
    web.on_cpvl();
    web.ongnganh();
    web.tlmd()
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
  ongcai: () => {
    let zone, kiem, zvl, znc, zmtc;
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
    zvl = ga.oc_cpxd.reduce(function (z, rec) { return z + rec.tienvl }, 0);
    zvl = ga.oc_cpvt.reduce(function (z, rec) { return z + rec.tienvl }, zvl);
    zvl = ga.oc_cpvl.reduce(function (z, rec) { return z + rec.tienvl }, zvl);
    znc = ga.oc_cpxd.reduce(function (z, rec) { return z + rec.tiennc }, 0);
    znc = ga.oc_cpvt.reduce(function (z, rec) { return z + rec.tiennc }, znc);
    znc = ga.oc_cpvl.reduce(function (z, rec) { return z + rec.tiennc }, znc);
    zmtc = ga.oc_cpxd.reduce(function (z, rec) { return z + rec.tienmtc }, 0);
    zmtc = ga.oc_cpvt.reduce(function (z, rec) { return z + rec.tienmtc }, zmtc);
    zmtc = ga.oc_cpvl.reduce(function (z, rec) { return z + rec.tienmtc }, zmtc);
    d3.select("div[id='oc_zvl']").data([zvl])
      .attr("class", "fb")
      .text((d) => viewso(d, 0));
    d3.select("div[id='oc_znc']").data([znc])
      .attr("class", "fb")
      .text((d) => viewso(d, 0));
    d3.select("div[id='oc_zmtc']").data([zmtc])
      .attr("class", "fb")
      .text((d) => viewso(d, 0));
  },

  oc_cpxd: () => {
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
    let row = bang.selectAll("tr").data(ga.oc_cpxd).enter().append("tr");
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
        try {
          let stt = ev.target.dataset.stt;
          let v = ev.target.value || '';
          if (v.length > 0) {
            let r = ga.oc_cpxd[stt];
            r.mota = v;
            //tinh lai gia chi phi
          }
          web.oc_cpxd();
          web.ongcai();
          web.dieuhuong('oc_cpxd', 1, stt, 13);
        } catch (err) {
          web.oc_cpxd();
        }
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
          let v = parseFloat(ev.target.value) || 0;
          if (v > 0) {
            let r = ga.oc_cpxd[stt];
            r.soluong = v;
            r.tienvl = lamtronso(r.soluong * r.giavl);
            r.tiennc = lamtronso(r.soluong * r.gianc);
            r.tienmtc = lamtronso(r.soluong * r.giamtc);
          }
          web.oc_cpxd();
          web.ongcai();
          web.dieuhuong('oc_cpxd', 3, stt, 13);
        } catch (err) {
          web.oc_cpxd();
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
  oc_cpvt: () => {
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
    let row = bang.selectAll("tr").data(ga.oc_cpvt).enter().append("tr");
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
          ga.oc_cpvt[stt].mota = v;
        }
        web.oc_cpvt();
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
          ga.oc_cpvt[stt].soluong = v;
        }
        web.oc_cpvt();
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
  oc_cpvl: () => {
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
    let row = bang.selectAll("tr").data(ga.oc_cpvl).enter().append("tr");
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
          ga.oc_cpvl[stt].mota = v;
        }
        web.oc_cpvl();
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
        web.oc_cpvl();
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

  ongnganh: () => {
    let zone, kiem, zvl, znc, zmtc;
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
    zvl = ga.on_cpxd.reduce(function (z, rec) { return z + rec.tienvl }, 0);
    zvl = ga.on_cpvt.reduce(function (z, rec) { return z + rec.tienvl }, zvl);
    zvl = ga.on_cpvl.reduce(function (z, rec) { return z + rec.tienvl }, zvl);
    znc = ga.on_cpxd.reduce(function (z, rec) { return z + rec.tiennc }, 0);
    znc = ga.on_cpvt.reduce(function (z, rec) { return z + rec.tiennc }, znc);
    znc = ga.on_cpvl.reduce(function (z, rec) { return z + rec.tiennc }, znc);
    zmtc = ga.on_cpxd.reduce(function (z, rec) { return z + rec.tienmtc }, 0);
    zmtc = ga.on_cpvt.reduce(function (z, rec) { return z + rec.tienmtc }, zmtc);
    zmtc = ga.on_cpvl.reduce(function (z, rec) { return z + rec.tienmtc }, zmtc);
    d3.select("div[id='on_zvl']").data([zvl])
      .attr("class", "fb")
      .text((d) => viewso(d, 0));
    d3.select("div[id='on_znc']").data([znc])
      .attr("class", "fb")
      .text((d) => viewso(d, 0));
    d3.select("div[id='on_zmtc']").data([zmtc])
      .attr("class", "fb")
      .text((d) => viewso(d, 0));
  },

  on_cpxd: () => {
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
    let row = bang.selectAll("tr").data(ga.on_cpxd).enter().append("tr");
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
          let r = ga.on_cpxd[stt];
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
  on_cpvt: () => {
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
  on_cpvl: () => {
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

  tlmd: () => {
    let zone, kiem, bang, rec, oc_ztl, on_ztl;
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
    web.cptl();
    oc_ztl = ga.cptl.reduce(function (z, rec) { return z + rec.oc_tien }, 0);
    on_ztl = ga.cptl.reduce(function (z, rec) { return z + rec.on_tien }, 0);
    d3.select("div[id='oc_ztl']").data([oc_ztl])
      .attr("class", "fb")
      .text((d) => viewso(d, 0));
    d3.select("div[id='on_ztl']").data([on_ztl])
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
        let stt = ev.target.dataset.stt;
        let v = ev.target.value || '';
        if (v.length > 0) {
          ga.cptl[stt].mota = v;
        }
        web.on_cpvl();
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
        web.tlmd();
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
        web.tlmd();
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
};

web.tao();
//web.ongcai();