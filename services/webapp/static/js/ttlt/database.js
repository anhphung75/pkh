//import * as JsStore from "./jsstore.min.js";

var tblKhachhang = {
  name: 'Khachhang',
  columns: {
    // Here "Id" is name of column 
    autoid: { primaryKey: true, autoIncrement: true },
    makhachhang: { notNull: true, dataType: "string", default: "2020KH" },
    hoten: { notNull: true, dataType: "string" },
    diachi: { notNull: true, dataType: "string" },
    lienhe: { notNull: false, dataType: "string" },
    map: { notNull: false, dataType: "string" },
    maqp: { notNull: false, dataType: "string" },
    lastupdate: { notNull: true, dataType: "date_time", default: new Date() }
  }
};

var tblHoso = {
  name: 'Hoso',
  columns: {
    // Here "Id" is name of column 
    autoid: { primaryKey: true, autoIncrement: true },
    mahoso: { notNull: true, dataType: "string" },
    makhachhang: { notNull: true, dataType: "string" },
    itemName: { notNull: true, dataType: "string" },
    price: { notNull: true, dataType: "number" },
    quantity: { notNull: true, dataType: "number" }
  }
};


var connection = new JsStore.Connection(new Worker('static/js/ttlt/jsstore.worker.min.js'));
var dbName = 'Pkh';

const taoDB = async () => {
  var db = {
    name: dbName,
    tables: [tblKhachhang, tblHoso]
  };
  return await connection.initDb(db);
};

window.onload = function () {
  taoDB();
};

export default connection;

