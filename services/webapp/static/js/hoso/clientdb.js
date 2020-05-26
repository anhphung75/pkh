//import * as JsStore from "/static/js/refs/jsstore.min.js";

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


var connection = new JsStore.Connection(new Worker('/static/js/refs/jsstore.worker.min.js'));


export const loadDb = async (dbName = 'Pkh') => {
  var csdl = {
    name: dbName,
    tables: [tblKhachhang, tblHoso]
  };
  return await connection.initDb(csdl);
}


export const restHoso = {
  gom: (nam = 2020) => {
    return connection.select({
      from: tblHoso,
      where: {
        namhoso: nam
      }
    })
  },
  doc: async (mahoso = '') => {
    return await connection.select({
      from: tblHoso,
      where: {
        mahoso: mahoso
      }
    })
  },
  xoa: async (mahoso = '') => {
    return await connection.remove({
      from: tblHoso,
      where: {
        mahoso: mahoso
      }
    })
  },
  sua: async (mahoso = '', oHosomoi = {}) => {
    return await connection.select({
      in: tblHoso,
      where: {
        mahoso: mahoso
      },
      set: oHosomoi
    })
  },
  moi: async (oHosomoi = {}) => {
    return await connection.insert({
      into: tblHoso,
      values: [oHosomoi]
    })
  },
}