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

export { getDateDelta, formatDate, getdsNam };