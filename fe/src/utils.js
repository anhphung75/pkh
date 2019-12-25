function getCookie(name) {
  var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
  return r ? r[1] : undefined;
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function deepCopy(obj) {
  if (typeof (obj) === 'string') {
    return JSON.parse(obj);
  } else {
    return obj;
    //return JSON.parse(JSON.stringify(obj));
  }
}

function str2ListObj(sdata) {
  try {
    let data = sdata.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
    sdata = data.replace(/'/g, '"');
    return JSON.parse(sdata);
  }
  catch (error) {
    console.log('str2ListObj error = ' + error);
    return sdata;
  }
};

function ListObj2Obj(listobj, key_uuid) {
  let l = listobj.length || 0;
  let data = {};
  for (let i = 0; i < l; i++) {
    let rec = listobj[i];
    let key = rec[key_uuid];
    data[key] = rec;
  }
  return data;
};

function filterListObj(listobj, stim) {
  let s = stim.toLowerCase() || '';
  let data = listobj.filter(v => JSON.stringify(v).toLowerCase().indexOf(s) > -1);
  return data;
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

function getdsNam(sonam) {
  sonam = sonam > 0 ? sonam : 10;
  var d = new Date(), year = d.getFullYear() + 1;
  let dsnam = [year,];
  for (let i = 0; i < sonam; i++) {
    year = year - 1;
    dsnam.push(year);
  }
  return dsnam;
};

function tachHang(t) {
  if (Number(t) == NaN) return "";
  return new Intl.NumberFormat("vi-VI", {
    useGrouping: true,
    minimumIntegerDigits: 3
  }).format(t);
};

export { getCookie, setCookie, deepCopy }
export { getDateDelta, formatDate, getdsNam, tachHang };
export { str2ListObj, filterListObj, ListObj2Obj }