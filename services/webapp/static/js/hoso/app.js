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


var oDb = {
  load: async (dbName = '') => {
    let check = dbName.length || 0;
    if (check == 0) { return };
    let csdl = {
      name: dbName,
      tables: [tblKhachhang, tblHoso]
    };
    try {
      return await this.db.initDb(csdl);
    } catch (error) {
      //console.error(error);
    };
  },
  drop: async (dbName = '') => {
    let check = dbName.length || 0;
    if (check == 0) { return };
    try {
      return await indexedDB.deleteDatabase(dbName);
    } catch (error) {
      // console.error(error);
    };
  }
};

var oHoso = {
  gom: async (nam = 2020) => {
    return await db.select({
      from: tblHoso,
      where: {
        namhoso: nam
      }
    })
  },
  doc: async (mahoso = '') => {
    return await this.db.select({
      from: tblHoso,
      where: {
        mahoso: mahoso
      }
    })
  },
  xoa: async (mahoso = '') => {
    return await this.db.remove({
      from: tblHoso,
      where: {
        mahoso: mahoso
      }
    })
  },
  sua: async (mahoso = '', oHosomoi = {}) => {
    return await this.db.select({
      in: tblHoso,
      where: {
        mahoso: mahoso
      },
      set: oHosomoi
    })
  },
  moi: (oHosomoi = {}) => {
    return this.db.insert({
      into: tblHoso,
      values: [oHosomoi]
    })
  },
}

var app = new Vue({
  el: '#trangxem',
  delimiters: ["{`", "`}"],
  data() {
    return {
      db: new JsStore.Connection(),
      userid: 'Khach',
      namlv: 2020,
      showMenu: false,
    }
  },
  methods: {
    loaddb() {
      oDb.load(this.userid);
      this.moi();
    },
    moi() {
      let oHosomoi = {
        mahoso: '2020hs001',
        makhachhang: 'kh001'
      };
      oHoso.moi(oHosomoi);
    }
  }
});