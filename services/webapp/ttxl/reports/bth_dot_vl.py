from ttdl.mssql import runsql
from utils import Tien, tachhangso, lamtronso


class Dulieu:
    def __init__(self, schema='qlmltd', madot=''):
        self.schema = schema
        self.madot = madot
        self.tieude = "BẢNG TỔNG HỢP VẬT LIỆU"
        self.sodot = ""
        self.ngaylap = 99990101
        self.dvtcid = 0
        self.dvtc = "PHÒNG KẾ HOẠCH-VẬT TƯ-TỔNG HỢP"
        self.ngaygandau = 99990101
        self.ngaygancuoi = 99990101
        self.hoso = None
        self.cpvl = None
        self.cpong = []
        self.duyet = {'pbd': 'KT.GIÁM ĐÓC', 'chucvu': 'PHÓ GIÁM ĐỐC',
                      'nhanvien': 'Nguyễn Công Minh'}
        self.kiemtra = {'pbd': 'KẾ HOẠCH-VẬT TƯ-TỔNG HỢP',
                        'chucvu': 'TRƯỞNG PHÒNG', 'nhanvien': 'Phạm Phi Hải'}
        self.lapbang = {'pbd': 'ĐỘI QLMLCN QUẬN THỦ ĐỨC',
                        'chucvu': 'ĐỘI TRƯỞNG', 'nhanvien': 'Nguyễn Văn Tùng'}
        self.get_qtvl()

    def get_qtvl(self):
        self.tbl_dot()
        self.tbl_donvithicong()
        self.tinh_hoso()
        self.tinh_cpvl()
        # self.tinh_cpong()
        self.nhansu()

    def tbl_dot(self):
        sql = (
            f"Select top 1 sodot, ngaylap, isnull(nhathauid,0) as dvtcid"
            f" From {self.schema}.dot"
            f" Where (madot='{self.madot}')"
        )
        dl = runsql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return
        dl = dl[0]
        self.sodot = dl["sodot"]
        self.dvtcid = dl["dvtcid"]
        self.ngaylap = dl["ngaylap"]

    def tbl_donvithicong(self):
        sql = (
            f"Select top 1 ten as dvtc From dbo.nhathau"
            f" Where (nhathauid='{self.dvtcid}')"
        )
        dl = runsql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return
        dl = dl[0]
        self.dvtc = dl['dvtc']
        if self.dvtcid == 2:
            self.lapbang = {'pbd': 'ĐỘI QLMLCN QUẬN 2',
                            'chucvu': 'ĐỘI TRƯỞNG', 'nhanvien': 'Nguyễn Ngọc Quý'}
        elif self.dvtcid == 3:
            self.lapbang = {'pbd': 'ĐỘI QLMLCN QUẬN 9',
                            'chucvu': 'ĐỘI TRƯỞNG', 'nhanvien': 'Bùi Quang Thiên Chương'}
        elif self.dvtcid == 4:
            self.lapbang = {'pbd': 'ĐỘI QLMLCN QUẬN THỦ ĐỨC',
                            'chucvu': 'ĐỘI TRƯỞNG', 'nhanvien': 'Nguyễn Văn Tùng'}
        else:
            self.lapbang = {'pbd': 'PHÒNG KẾ HOẠCH-VẬT TƯ-TỔNG HỢP',
                            'chucvu': 'TRƯỞNG PHÒNG', 'nhanvien': 'Phạm Phi Hải'}
            self.kiemtra = {}

    def tinh_hoso(self):
        sql = (
            f"Select r.ngaygan,r.hosoid,h.sohoso,h.khachhang,h.diachikhachhang"
            f" From {self.schema}.qt r RIGHT JOIN dbo.hoso h ON r.hosoid=h.hosoid"
            f" Where (madot='{self.madot}' And datalength(ngaygan)>0"
            f" And (tinhtrang like 'ok%' or tinhtrang like 'fin%'))"
            f" Order By ngaygan"
        )
        dl = runsql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return
        self.hoso = {}
        for r in dl:
            self.hoso[r["hosoid"]] = {
                "sohoso": r["sohoso"], "khachhang": r["khachhang"], "diachigandhn": r["diachikhachhang"]}
        self.ngaygandau = dl[0]["ngaygan"]
        self.ngaygancuoi = dl[-1]["ngaygan"]

    def tinh_cpvl(self):
        sql = (
            f"SELECT t.chiphiid, t.giavl, t.hosoid, t.soluong, t.tt FROM ("
            f"Select r.chiphiid, isnull(r.giavl,0) as giavl, qt.hosoid, r.soluong, qt.tt "
            f"From ({self.schema}.qt32 r LEFT JOIN {self.schema}.qt qt ON qt.maqt=r.maqt) "
            f"LEFT JOIN dbo.chiphi cp ON cp.chiphiid=r.chiphiid "
            f"Where qt.madot='{self.madot}' And r.soluong>0 "
            f"And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%') "
            f"And qt.hesoid>=20200827 And cp.mapl1 Like 'VL%' "

            f"UNION ALL Select r.chiphiid, isnull(r.giavl,0) as giavl, qt.hosoid, r.soluong, qt.tt "
            f"From ({self.schema}.qt34 r LEFT JOIN {self.schema}.qt qt ON qt.maqt=r.maqt) "
            f"LEFT JOIN dbo.chiphi cp ON cp.chiphiid=r.chiphiid "
            f"Where qt.madot='{self.madot}' And r.soluong>0 "
            f"And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%') "
            f"And qt.hesoid>=20200827 And cp.mapl1 Like 'VL%' "

            f"UNION ALL Select r.chiphiid, isnull(r.giavl,0) as giavl, qt.hosoid, r.soluong, qt.tt "
            f"From ({self.schema}.qt31 r LEFT JOIN {self.schema}.qt qt ON qt.maqt=r.maqt) "
            f"LEFT JOIN dbo.chiphi cp ON cp.chiphiid=r.chiphiid "
            f"Where qt.madot='{self.madot}' And r.soluong>0 "
            f"And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%') "
            f"And qt.hesoid>=20200827 And cp.mapl1 Like 'VL%' "

            f"UNION ALL Select r.chiphiid, isnull(r.giavl,0) as giavl, qt.hosoid, r.soluong, qt.tt "
            f"From ({self.schema}.qt33 r LEFT JOIN {self.schema}.qt qt ON qt.maqt=r.maqt) "
            f"LEFT JOIN dbo.chiphi cp ON cp.chiphiid=r.chiphiid "
            f"Where qt.madot='{self.madot}' And r.soluong>0 "
            f"And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%') "
            f"And qt.hesoid>=20200827 And cp.mapl1 Like 'VL%' "
            # cpvl nd32
            f"UNION ALL Select r.chiphiid,isnull(r.giavl,0) as giavl,qt.hosoid,r.soluong,qt.tt "
            f"From ({self.schema}.qt32 r LEFT JOIN {self.schema}.qt qt ON qt.maqt=r.maqt) "
            f"LEFT JOIN dbo.plchiphi cp ON cp.chiphiid=r.chiphiid "
            f"Where qt.madot='{self.madot}' And r.soluong>0 "
            f"And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%') "
            f"And qt.hesoid<20200827 And cp.phanloai='Cat' And cp.tinhtrang='Moi' "

            f"UNION ALL Select r.chiphiid,isnull(r.giavl,0) as giavl,qt.hosoid,r.soluong,qt.tt "
            f"From ({self.schema}.qt34 r LEFT JOIN {self.schema}.qt qt ON qt.maqt=r.maqt) "
            f"LEFT JOIN dbo.plchiphi cp ON cp.chiphiid=r.chiphiid "
            f"Where qt.madot='{self.madot}' And r.soluong>0 "
            f"And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%') "
            f"And qt.hesoid<20200827 And cp.phanloai='Cat' And cp.tinhtrang='Moi' "

            f"UNION ALL Select r.chiphiid,isnull(r.giavl,0) as giavl,qt.hosoid,r.soluong,qt.tt "
            f"From ({self.schema}.qt31 r LEFT JOIN {self.schema}.qt qt ON qt.maqt=r.maqt) "
            f"LEFT JOIN dbo.plchiphi cp ON cp.chiphiid=r.chiphiid "
            f"Where qt.madot='{self.madot}' And r.soluong>0 "
            f"And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%') "
            f"And qt.hesoid<20200827 And cp.phanloai='Cat' And cp.tinhtrang='Moi' "

            f"UNION ALL Select r.chiphiid,isnull(r.giavl,0) as giavl,qt.hosoid,r.soluong,qt.tt "
            f"From ({self.schema}.qt33 r LEFT JOIN {self.schema}.qt qt ON qt.maqt=r.maqt) "
            f"LEFT JOIN dbo.plchiphi cp ON cp.chiphiid=r.chiphiid "
            f"Where qt.madot='{self.madot}' And r.soluong>0 "
            f"And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%') "
            f"And qt.hesoid<20200827 And cp.phanloai='Cat' And cp.tinhtrang='Moi'"
            f") AS t ORDER BY t.chiphiid,t.giavl,t.tt,t.hosoid")
        dl = runsql(sql)
        if ((dl == None) or (len(dl) < 1) or ("chiphiid" not in dl[0])):
            self.cpvl = []
            return
        tam = {}
        for r in dl:
            k = (r["chiphiid"], r["giavl"], r["hosoid"])
            if k in tam:
                tam[k] += r['soluong']
            else:
                tam[k] = r['soluong']
        dl = {}
        for k in tam:
            (chiphiid, giavl, hosoid) = k
            dl[f"{chiphiid}"] = 1
        sql = (
            f"Select chiphiid, diengiai as mota, dvt "
            f"From dbo.chiphi "
            f"Where chiphiid In ({','.join(dl.keys())})"
        )
        dl = runsql(sql)
        chiphi = {}
        for r in dl:
            chiphi[r["chiphiid"]] = {"mota": r["mota"], "dvt": r["dvt"]}
        dl = {}
        for k in tam:
            soluong = tam[k]
            (chiphiid, giavl, hosoid) = k
            k = (chiphiid, giavl)
            if k in dl:
                dl[k]["zsoluong"] += soluong
                dl[k]["hoso"].append({
                    "sohoso": self.hoso[hosoid]["sohoso"],
                    "khachhang": self.hoso[hosoid]["khachhang"],
                    "diachigandhn": self.hoso[hosoid]["diachigandhn"],
                    "soluong": soluong,
                    "gia": giavl,
                    "tien": lamtronso(soluong*giavl, 0)})
            else:
                dl[k] = {}
                dl[k]["mota"] = chiphi[chiphiid]["mota"]
                dl[k]["dvt"] = chiphi[chiphiid]["dvt"]
                dl[k]["zsoluong"] = soluong
                dl[k]["gia"] = giavl
                dl[k]["ztien"] = 0
                dl[k]["hoso"] = [{
                    "sohoso": self.hoso[hosoid]["sohoso"],
                    "khachhang":self.hoso[hosoid]["khachhang"],
                    "diachigandhn":self.hoso[hosoid]["diachigandhn"],
                    "soluong":soluong,
                    "gia":giavl,
                    "tien": lamtronso(soluong*giavl, 0)
                }]
        for k in dl:
            for r in dl[k]["hoso"]:
                dl[k]["ztien"] += r["tien"]
        tam = []
        for k in dl:
            tam.append(dl[k])
        self.cpvl = tam

    def tinh_cpong(self):
        sql = (
            f"SELECT t.chiphiid, t.giavl, t.hosoid, t.soluong FROM ("
            f"Select r.chiphiid,isnull(r.giavl,0) as giavl,qt.hosoid,r.soluong,qt.tt "
            f"From ({self.schema}.qt32 r LEFT JOIN {self.schema}.qt qt ON qt.maqt=r.maqt) "
            f"LEFT JOIN dbo.plchiphi cp ON cp.chiphiid=r.chiphiid "
            f"Where qt.madot='{self.madot}' And r.soluong>0 "
            f"And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%') "
            f"And cp.phanloai='Ong' And cp.tinhtrang='Moi' "

            f"UNION ALL Select r.chiphiid,isnull(r.giavl,0) as giavl,qt.hosoid,r.soluong,qt.tt "
            f"From ({self.schema}.qt34 r LEFT JOIN {self.schema}.qt qt ON qt.maqt=r.maqt) "
            f"LEFT JOIN dbo.plchiphi cp ON cp.chiphiid=r.chiphiid "
            f"Where qt.madot='{self.madot}' And r.soluong>0 "
            f"And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%') "
            f"And cp.phanloai='Ong' And cp.tinhtrang='Moi' "

            f"UNION ALL Select r.chiphiid,isnull(r.giavl,0) as giavl,qt.hosoid,r.soluong,qt.tt "
            f"From ({self.schema}.qt31 r LEFT JOIN {self.schema}.qt qt ON qt.maqt=r.maqt) "
            f"LEFT JOIN dbo.plchiphi cp ON cp.chiphiid=r.chiphiid "
            f"Where qt.madot='{self.madot}' And r.soluong>0 "
            f"And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%') "
            f"And cp.phanloai='Ong' And cp.tinhtrang='Moi' "

            f"UNION ALL Select r.chiphiid,isnull(r.giavl,0) as giavl,qt.hosoid,r.soluong,qt.tt "
            f"From ({self.schema}.qt33 r LEFT JOIN {self.schema}.qt qt ON qt.maqt=r.maqt) "
            f"LEFT JOIN dbo.plchiphi cp ON cp.chiphiid=r.chiphiid "
            f"Where qt.madot='{self.madot}' And r.soluong>0 "
            f"And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%') "
            f"And cp.phanloai='Ong' And cp.tinhtrang='Moi' "
            f") AS t ORDER BY t.chiphiid,t.giavl,t.tt,t.hosoid"
        )
        dl = runsql(sql)
        if ((dl == None) or (len(dl) < 1) or ("chiphiid" not in dl[0])):
            self.cpong = []
            return
        tam = {}
        for r in dl:
            k = (r["chiphiid"], r["giavl"], r["hosoid"])
            if k in tam:
                tam[k] += r['soluong']
            else:
                tam[k] = r['soluong']
        dl = {}
        for k in tam:
            (chiphiid, giavl, hosoid) = k
            dl[f"{chiphiid}"] = 1
        sql = (
            f"Select chiphiid, diengiai as mota, dvt "
            f"From dbo.chiphi "
            f"Where chiphiid In ({','.join(dl.keys())})"
        )
        dl = runsql(sql)
        chiphi = {}
        for r in dl:
            chiphi[r["chiphiid"]] = {"mota": r["mota"], "dvt": r["dvt"]}
        dl = {}
        for k in tam:
            soluong = tam[k]
            (chiphiid, giavl, hosoid) = k
            k = (chiphiid, giavl)
            if k in dl:
                dl[k]["zsoluong"] += soluong
                dl[k]["hoso"].append({
                    "sohoso": self.hoso[hosoid]["sohoso"],
                    "khachhang": self.hoso[hosoid]["khachhang"],
                    "diachigandhn": self.hoso[hosoid]["diachigandhn"],
                    "soluong": soluong,
                    "gia": giavl,
                    "tien": lamtronso(soluong*giavl, 0)})
            else:
                dl[k] = {}
                dl[k]["mota"] = chiphi[chiphiid]["mota"]
                dl[k]["dvt"] = chiphi[chiphiid]["dvt"]
                dl[k]["zsoluong"] = soluong
                dl[k]["gia"] = giavl
                dl[k]["ztien"] = 0
                dl[k]["hoso"] = [{
                    "sohoso": self.hoso[hosoid]["sohoso"],
                    "khachhang":self.hoso[hosoid]["khachhang"],
                    "diachigandhn":self.hoso[hosoid]["diachigandhn"],
                    "soluong":soluong,
                    "gia":giavl,
                    "tien": lamtronso(soluong*giavl, 0)
                }]
        for k in dl:
            for r in dl[k]["hoso"]:
                dl[k]["ztien"] += r["tien"]
        tam = []
        for k in dl:
            tam.append(dl[k])
        self.cpong = tam

    def nhansu(self):
        if self.ngaylap > 20210422:
            self.duyet['nhanvien'] = 'Nguyễn Tuấn Ngọc'


def dulieuin(schema):
    data = {"schema": schema, "dulieuin": [], "bth_dot_vl": {}}
    sql = (
        f"Select top 100 madot From {schema}.dot"
        f" Where (inok<>0 And datalength(madot)>0"
        f" And (tinhtrang like 'ok%' or tinhtrang like 'fin%'))"
        f" Order By madot,lastupdate"
    )
    try:
        dl = runsql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return data
        dulieu = []
        for r in dl:
            dulieu.append(r['madot'])
        data["dulieuin"] = dulieu
        dl = {}
        for madot in dulieu:
            try:
                dl[madot] = Dulieu(schema, madot)
            except:
                pass
        data["bth_dot_vl"] = dl
    except:
        pass
    return data
