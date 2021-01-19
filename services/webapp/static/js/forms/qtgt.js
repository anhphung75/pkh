var ga = {
  csdl: { ten: "pkh", sohieu: 1 },
  namlamviec: new Date().getFullYear().toString(),
  tttt: "",
  ltttt: [],
  mascan: '',
  otim: null,
  dulieu: {},
  tieude: [],
  noidung: [],
  colsBE: [],
  url: {},

  
};

var web = {
  tao: () => {
    web.namlamviec();
    web.stim();
    web.don_otim();
    web.otim();
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

  stim: () => {
    d3.select("#stim")
      .on("keydown", function (ev) {
        let s = this.value ? this.value.trim().toLowerCase() : "";
        let zone, h, d, c, t;
        switch (ev.keyCode) {
          case 13: //enter goto 1st hosoloc
            ga.otim = ga.otim || new Set();
            if (s !== "") {
              console.log("add stim=", s, " ga.otim=", ga.otim)
              ga.otim.add(s);
            }
            web.otim();
            //ga.loc_otim();
            web.info()
            break;
          case 45: //insert
            if (s.length > 0 && ga.otim.indexOf(s) === -1) {
              ga.otim.push(s);
            }
            web.otim();
            ga.loc_otim();
            this.value = "";
            break;
          case 38: //mui ten len
            zone = d3
              .select("table[id='danhsach']")
              .select("tbody")
              .selectAll("tr.mau");
            if (zone.empty()) {
              console.log("empty zone");
              ga.tttt = ga.ltttt[ga.ltttt.length - 1];
              d3.select("table[id='danhsach']")
                .select("tbody")
                .select("[data-tttt='" + ga.tttt + "']")
                .classed("mau", true);
            } else {
              zone.classed("mau", false);
              t = ga.ltttt.indexOf(ga.tttt);
              ga.tttt = t < 1 ? ga.ltttt[ga.ltttt.length - 1] : ga.ltttt[t - 1];
              d3.select("table[id='danhsach']")
                .select("tbody")
                .select("[data-tttt='" + ga.tttt + "']")
                .classed("mau", true);
            }
            web.hosochon(ga.tttt);
            break;
          case 40: //mui ten xuong
            zone = d3
              .select("table[id='danhsach']")
              .select("tbody")
              .selectAll("tr.mau");
            if (zone.empty()) {
              console.log("empty zone");
              ga.tttt = ga.ltttt[0];
              d3.select("table[id='danhsach']")
                .select("tbody")
                .select("tr[data-tttt='" + ga.tttt + "']")
                .classed("mau", true);
            } else {
              zone.classed("mau", false);
              t = ga.ltttt.indexOf(ga.tttt);
              ga.tttt = t > ga.ltttt.length - 2 ? ga.ltttt[0] : ga.ltttt[t + 1];
              d3.select("table[id='danhsach']")
                .select("tbody")
                .select("tr[data-tttt='" + ga.tttt + "']")
                .classed("mau", true);
            }
            web.hosochon(ga.tttt);
            break;
          default:
            console.log("btn=", ev.code, " keyCode=", ev.keyCode);
        }
      })
      .on("input", function () {
        console.log("oninput s=", this.value);
        web.danhsach(this.value);
      })
      .on("change", function () {
        console.log("onchange stim=", this.value);
      });
  },

  don_otim: () => {
    d3.select("#don-otim").on("click", function () {
      ga["otim"] = new Set([ga["namlamviec"]]);
      web.otim();
    });
  },

  otim: (dulieu = ga.otim) => {
    if (!dulieu) { return }
    d3.select("div[id='view_otim']").selectAll("*").remove();
    d3.select("#view_otim").selectAll("button").data(dulieu)
      .enter().append("button")
      .text((d) => d)
      .attr("class", "l b1px")
      .style("paddingLeft", "1em")
      .style("color", "red")
      .on("click", function (ev, d) {
        try {
          ga["otim"].delete(d);
          web.otim(ga.otim);
        } catch (error) { }
      })
      .on("mouseout", function (ev) {
        this.style.textDecoration = "none";
      })
      .on("mouseover", function (ev) {
        this.style.textDecoration = "line-through";
        console.log("btn mouseover=", ev.target);
      });
    //web.danhsach();
  },

  danhsach: (stim) => {
    let bang = d3.select("table[id='danhsach']")
      .attr("class", "w100")
      .style("table-layout", "auto")
      .style("border-collapse", "separate")
      .style("border-spacing", "1px 1px")
      .style("overflow", "auto")
      .style("margin", "0");

    //tieude
    bang.select("thead").selectAll("th").data(ga.tieude)
      .enter()
      .append("th")
      .attr("class", "c")
      .text((col) => col);

    //rows
    ga.ltttt = [];
    bang.select("tbody").selectAll("tr").remove();
    let row = bang.select("tbody").selectAll("tr").data(ga.noidung).enter().append("tr");
    row.attr("class", "l")
      .attr("data-tttt", (d) => d.tttt)
      .filter((d) => {
        stim = stim ? stim : "";
        let dk = d.stim.includes(stim);
        if (dk) {
          ga.ltttt.push(d.tttt);
        }
        return dk;
      })
      .on("mouseenter", (ev, d) => {
        bang.selectAll("tr").classed("mau test", false);
        d3.select(this).classed("mau test", true);
        console.log("row mouseenter d=", d);
        ga.tttt = d.tttt;
        web.hosochon(ga.tttt);
      })
      .on("mouseleave", function (ev, d) {
        console.log("row mouseleave ga.ltttt=", ga.ltttt);
        let t = ga.ltttt.indexOf(d.tttt);
        if (t === 0 || t + 1 === ga.ltttt.length) {
          console.log("row mouseleave return ev=", ev.target);
          return;
        }
        d3.select(this).classed("mau test", false);
        console.log("row mouseleave ev=", ev.target);
      });

    //col
    let cell = row.selectAll("td").data((d) => d3.permute(d, ga.colsBE))
      .enter().append("td");
    cell
      .attr("class", (d, i) => {
        let s = "l bb";
        if (i === 0) { s = "c bb" }
        if (i === 3) { s = "l u bb" }
        return s;
      })
      .html((d, i) => {
        if (!d || !stim) {
          return d;
        }
        console.log("col d=", d, " i=", i);
        stim = stim.toString();
        let zone = d.toString();
        let mau = bien.sregexp(stim);
        console.log("mau func sregexp=", mau);
        mau = new RegExp(mau, "gi");
        zone = zone.replace(mau, (m) => {
          if (m === undefined || m === null || m === "") {
            return;
          }
          console.log("col mau tim duoc=", m, " i=", i);
          let moi = "<b style='color:red'>" + m + "</b>";
          return moi;
        });
        return zone;
      });
  },

  hosochon: (tttt) => {
    if (!tttt) {
      tttt = d3.select("table[id='danhsach']").select("tbody").select(".mau").attr("data-tttt");
      ga.tttt = tttt;
    }
    console.log("hoso tttt=", tttt);
    let noidung = d3.permute(ga.dulieu[tttt], ga.colsBE);
    let i, rec, dulieu = [];
    for (i in ga.colsBE) {
      rec = { k: ga.tieude[i] || '', v: noidung[i] || '' };
      dulieu.push(rec);
    }

    let bang = d3.select("table[id='hosochon']")
      .attr("class", "w100")
      .style("table-layout", "auto")
      .style("border-collapse", "separate")
      .style("border-spacing", "1px 1px")
      .style("overflow", "auto")
      .style("margin", "0");

    bang.selectAll("tr").remove();

    let row = bang.selectAll("tr").data(dulieu)
      .enter().append("tr")
      .attr("class", "w100");

    row.append("td")
      .attr("class", "l")
      .style("background-color", "coral")
      .style("width", "10%")
      .text((d) => d.k);
    row.append("td")
      .attr("class", (d, i) => {
        let s = "l fb bb";
        if (i === 3) { s = "l u fb bb" }
        return s;
      })
      .attr("data-maunen", "transparent")
      .attr("data-mascan", (d, i) => {
        let ma = '';
        if ([1, 2, 3, 4, 5].includes(i)) {
          ma = ga.dulieu[ga.tttt]['hoso.idutc'] || ga.dulieu[ga.tttt]['idhoso'] || '';
        }
        return 'hoso.' + ma;
      })
      .text((d) => d.v)
      .on("mouseenter", (ev, d) => {
        let el = ev.target;
        el.style.backgroundColor = "#9999ff";
        let mascan = el.dataset.mascan;
        console.log("hosochon mouseenter ev=", ev.target, " d=", d, " mascan=", mascan);
        //web.scan(mascan);
      })
      .on("mouseleave", function (ev) {
        let maunen = ev.target.dataset.maunen || "transparent";
        ev.target.style.backgroundColor = maunen;
        console.log("hosochon mouseleave ev=", ev.target);
      });
    row.exit().remove();
  },

  scan: (mascan) => {
    if (!mascan || mascan === ga.mascan) {
      console.log("scan exit by mascan=", mascan, " ga.mascan=", ga.mascan);
      return;
    };
    ga.mascan = mascan;
    let dulieu = ga.url.scan[mascan] || [];
    console.log("scan mascan=", mascan, " dulieu=", dulieu);
    let zone = d3.select("#view_scan").attr("class", "w100");

    zone.selectAll("object").remove();

    let cells = zone.selectAll("object").data(dulieu);
    cells.enter().append("object")
      .style("background-color", "transparent")
      .attr("type", "application/pdf")
      .attr("typemustmatch", true)
      .attr("width", "500")
      .attr("height", "2000");
    cells.attr("data", (d, i) => {
      if (d) {
        return d.toString();
      } else {
        return d;
      }
    });
    cells.exit().remove();
  },
};