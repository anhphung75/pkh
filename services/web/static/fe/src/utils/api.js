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
  if (typeof sdata === 'string') {
    let data = sdata.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
    sdata = data.replace(/'/g, '"');
    return JSON.parse(sdata);
  }
  return sdata;
};

function listObj2Obj(listobj, key_uuid) {
  if (!Array.isArray(listobj)) { return listobj; };
  let data, i, rec, key, l = listobj.length || 0;
  if (l === 0) { return {}; };
  if (!listobj[0].hasOwnProperty(key_uuid)) { return listobj; };
  data = {};
  for (i = 0; i < l; i++) {
    rec = listobj[i];
    key = rec[key_uuid];
    data[key] = rec;
  }
  return data;
};

function filterListObj(listobj, stim) {
  let s = stim.toLowerCase() || '';
  let data = listobj.filter(v => JSON.stringify(v).toLowerCase().indexOf(s) > -1);
  return data;
};

export { getCookie, setCookie, deepCopy }
export { str2ListObj, filterListObj, listObj2Obj }