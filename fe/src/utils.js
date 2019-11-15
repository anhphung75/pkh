function sarrayObj2objObj(sdata) {
  let data = sdata.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
  data = data.replace(/'/g, '"');
  return JSON.parse(data);
};

function filterListObj(listobj, stim) {
  let s = stim.toLowerCase() || '';
  let data = listobj.filter(v => JSON.stringify(v).toLowerCase().indexOf(s) > -1);
  return JSON.parse(JSON.stringify(data));
};

function getDateDelta(strdate1, strdate2) {
  try {
    let d1 = new Date(strdate1);
    let d2 = new Date(strdate2);
    let n1 = d1.valueOf();
    let n2 = d2.valueOf();
    return Math.floor((n1 - n2) / 86400000);
  } catch (err) {
    console.log("Something wrong on function getDate() !!!");
  }
};

function formatDate(odate) {
  var d = new Date(odate),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

function tachHang(t) {
  if (Number(t) == NaN) return "";
  return new Intl.NumberFormat("vi-VI", {
    useGrouping: true,
    minimumIntegerDigits: 3
  }).format(t);
};

export { sarrayObj2objObj, filterListObj, getDateDelta, formatDate, tachHang };