function viewso(sothapphan = 0, phanle = 3) {
  try {
    sothapphan = parseFloat(sothapphan);
    phanle = parseInt(phanle);
    if (sothapphan) {
      return new Intl.NumberFormat('vi-VI', { maximumSignificantDigits: phanle }).format(sothapphan);
    } else {
      return "- ";
    }
  } catch (error) {
    return sothapphan;
  }

}
var ga = {
  csdl: { ten: "pkh", sohieu: 1 },
  namlamviec: new Date().getFullYear().toString(),
  tieude: {
    cpxd: ['Tt', 'Mô tả', 'Đvt', 'Giá vật liệu', 'Giá nhân công', 'Giá mtc', 'Tiền vật liệu', 'Tiền nhân công', 'Tiền mtc'],
    tlmd: ['Tt', 'Mô tả', 'Đvt', 'Số lượng oc', 'Số lượng on', 'Giá', 'Tiền ống cái', 'Tiền ống nhánh']
  },
  oc_cpxd: [
    { chiphi: 1, soluong: 0.1, mota: 'cp1', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 10, tienmtc: 0 },
    { chiphi: 2, soluong: 0.2, mota: 'cp2', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 200, tienmtc: 0 },
    { chiphi: 3, soluong: 0.3, mota: 'cp3', dvt: 'cai', giavl: 0, gianc: 0, giamtc: 0, tienvl: 0, tiennc: 300, tienmtc: 0 }],
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
    web.ongcai();
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

  ongcai: () => {
    let zone = d3.select("section[id='ongcai']");
    let kiem = zone.select(".ongcai")
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
  },

  oc_cpxd: () => {
    let bang, row, cell, cols;
    bang = d3.select("table[id='oc_cpxd']")
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
    //ap gia lai, tinh tien

    bang.selectAll("tr").remove();
    row = bang.selectAll("tr").data(ga.oc_cpxd).enter().append("tr");

    //col
    cols = ['mota', 'dvt', 'soluong', 'giavl', 'gianc', 'giamtc', 'tienvl', 'tiennc', 'tienmtc']
    cell = row.selectAll("td").data((d, i) => {
      let s = [i + 1, ...d3.permute(d, cols)];
      return s;
    })
      .enter().append("td");

    cell
      .attr("class", (d, i) => {
        let s = "r bb";
        if (i in [0, 2]) { s = "c bb" }
        if (i in [1]) { s = "l bb" }
        return s;
      })
      .html((d, i) => {
        let s;
        console.log('cell i=', i, ' d=', d);
        if ([0, 2].includes(i)) { s = d.toString(); };
        if ([1].includes(i)) { s = '<input type="text" class="l b0" value=' + d + '></input>'; };
        if ([3].includes(i)) { s = '<input type="text" class="r b0" value=' + viewso(d, 3) + '></input>'; }
        if ([4, 5, 6].includes(i)) { s = viewso(d, 3); };
        if ([7, 8, 9].includes(i)) { s = viewso(d, 0); };
        return s;
      });
  },

  ongnganh: () => {
    let zone = d3.select("section[id='ongnganh']");
    let kiem = zone.select(".ongnganh")
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
  },
  tlmd: () => {
    let zone = d3.select("section[id='tlmd']");
    let kiem = zone.select(".tlmd")
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
  },
};

web.tao();
web.oc_cpxd();