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
        self.hoso = {}
        self.cpvl = {}
        self.cpong = {}
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
        self.tinh_cpvl_nd32()
        self.cpvl = self.dict2list(self.cpvl)
        self.tinh_cpong()

    def dict2list(self, dldict={}):
        tam = []
        for k in dldict:
            tam.append(dldict[k])
        return tam

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
        self.ngaylap = dl["ngaylap"]
        self.dvtcid = dl["dvtcid"]

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
        for r in dl:
            self.hoso[r["hosoid"]] = {
                "sohoso": r["sohoso"], "khachhang": r["khachhang"], "diachigandhn": r["diachikhachhang"]}
        self.ngaygandau = dl[0]["ngaygan"]
        self.ngaygancuoi = dl[-1]["ngaygan"]

    def tinh_cpvl(self):
        tam = {}
        sql = (
            f"SELECT t.chiphiid, t.giavl, t.hosoid, t.soluong, t.tt"
            f" FROM (Select r.chiphiid, isnull(r.giavl,0) as giavl, qt.hosoid, r.soluong, qt.tt"
            f" From {self.schema}.qt32 r LEFT JOIN {self.schema}.qt qt ON qt.maqt=r.maqt"
            f" Where qt.madot='{self.madot}' And r.soluong>0 And qt.hesoid>=20200827"
            f" And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%')"
            f" And r.chiphiid In (Select chiphiid From dbo.chiphi Where mapl1 Like 'VL%')"

            f" UNION ALL Select r.chiphiid, isnull(r.giavl,0) as giavl, qt.hosoid, r.soluong, qt.tt"
            f" From {self.schema}.qt34 r LEFT JOIN {self.schema}.qt qt ON qt.maqt=r.maqt"
            f" Where qt.madot='{self.madot}' And r.soluong>0 And qt.hesoid>=20200827"
            f" And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%')"
            f" And r.chiphiid In (Select chiphiid From dbo.chiphi Where mapl1 Like 'VL%')"

            f" UNION ALL Select r.chiphiid, isnull(r.giavl,0) as giavl, qt.hosoid, r.soluong, qt.tt"
            f" From {self.schema}.qt31 r LEFT JOIN {self.schema}.qt qt ON qt.maqt=r.maqt"
            f" Where qt.madot='{self.madot}' And r.soluong>0 And qt.hesoid>=20200827"
            f" And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%')"
            f" And r.chiphiid In (Select chiphiid From dbo.chiphi Where mapl1 Like 'VL%')"

            f" UNION ALL Select r.chiphiid, isnull(r.giavl,0) as giavl, qt.hosoid, r.soluong, qt.tt"
            f" From {self.schema}.qt33 r LEFT JOIN {self.schema}.qt qt ON qt.maqt=r.maqt"
            f" Where qt.madot='{self.madot}' And r.soluong>0 And qt.hesoid>=20200827"
            f" And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%')"
            f" And r.chiphiid In (Select chiphiid From dbo.chiphi Where mapl1 Like 'VL%')) as t"
            f" ORDER BY t.chiphiid,t.giavl,t.tt,t.hosoid"
        )
        dl = runsql(sql)
        if ((dl != None) and (len(dl) > 0)):
            for r in dl:
                k = (r["chiphiid"], r["giavl"], r["hosoid"])
                if k in tam:
                    tam[k] += r['soluong']
                else:
                    tam[k] = r['soluong']
        print(f"tinh cpvl tam={tam}")
        dl = []
        for k in tam:
            (chiphiid, giavl, hosoid) = k
            sid = str(chiphiid)
            if sid not in dl:
                dl.append(sid)
        if len(dl) == 1:
            dl = f"('{dl[0]}')"
        else:
            dl = tuple(dl)
        sql = (
            f"Select chiphiid, diengiai as mota, dvt"
            f" From dbo.chiphi"
            f" Where chiphiid In {dl}"
        )
        dl = runsql(sql)
        if ((dl != None) and (len(dl) > 0)):
            chiphi = {}
            for r in dl:
                chiphi[r["chiphiid"]] = {"mota": r["mota"], "dvt": r["dvt"]}
        try:
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
            self.cpvl = dl
        except:
            pass

    def tinh_cpvl_nd32(self):
        tam = {}
        sql = (
            f"SELECT t.chiphiid, t.giavl, t.hosoid, t.soluong"
            f" FROM (Select r.chiphiid, isnull(r.giavl,0) as giavl, qt.hosoid, r.soluong,qt.tt"
            f" From {self.schema}.qt32 r LEFT JOIN {self.schema}.qt qt ON qt.maqt=r.maqt"
            f" Where qt.madot='{self.madot}' And r.soluong>0 And qt.hesoid<20200827"
            f" And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%')"
            f" And r.chiphiid In (Select chiphiid From dbo.plchiphi Where phanloai='Cat' And tinhtrang='Moi')"

            f" UNION ALL Select r.chiphiid, isnull(r.giavl,0) as giavl, qt.hosoid, r.soluong,qt.tt"
            f" From {self.schema}.qt34 r LEFT JOIN {self.schema}.qt qt ON qt.maqt=r.maqt"
            f" Where qt.madot='{self.madot}' And r.soluong>0 And qt.hesoid<20200827"
            f" And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%')"
            f" And r.chiphiid In (Select chiphiid From dbo.plchiphi Where phanloai='Cat' And tinhtrang='Moi')"

            f" UNION ALL Select r.chiphiid, isnull(r.giavl,0) as giavl, qt.hosoid, r.soluong,qt.tt"
            f" From {self.schema}.qt31 r LEFT JOIN {self.schema}.qt qt ON qt.maqt=r.maqt"
            f" Where qt.madot='{self.madot}' And r.soluong>0 And qt.hesoid<20200827"
            f" And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%')"
            f" And r.chiphiid In (Select chiphiid From dbo.plchiphi Where phanloai='Cat' And tinhtrang='Moi')"

            f" UNION ALL Select r.chiphiid, isnull(r.giavl,0) as giavl, qt.hosoid, r.soluong,qt.tt"
            f" From {self.schema}.qt33 r LEFT JOIN {self.schema}.qt qt ON qt.maqt=r.maqt"
            f" Where qt.madot='{self.madot}' And r.soluong>0 And qt.hesoid<20200827"
            f" And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%')"
            f" And r.chiphiid In (Select chiphiid From dbo.plchiphi Where phanloai='Cat' And tinhtrang='Moi')) AS t"
            f" ORDER BY t.chiphiid,t.giavl,t.tt,t.hosoid"
        )
        dl = runsql(sql)
        if ((dl != None) and (len(dl) > 0)):
            for r in dl:
                k = (r["chiphiid"], r["giavl"], r["hosoid"])
                if k in tam:
                    tam[k] += r['soluong']
                else:
                    tam[k] = r['soluong']
        dl = []
        for k in tam:
            (chiphiid, giavl, hosoid) = k
            sid = str(chiphiid)
            if sid not in dl:
                dl.append(sid)
        if len(dl) == 1:
            dl = f"('{dl[0]}')"
        else:
            dl = tuple(dl)
        sql = (
            f"Select chiphiid, diengiai as mota, dvt"
            f" From dbo.chiphi"
            f" Where chiphiid In {dl}"
        )
        dl = runsql(sql)
        if ((dl != None) and (len(dl) > 0)):
            chiphi = {}
            for r in dl:
                chiphi[r["chiphiid"]] = {"mota": r["mota"], "dvt": r["dvt"]}
        try:
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
            self.cpvl = {**self.cpvl, **dl}
        except:
            pass

    def tinh_cpong(self):
        tam = {}
        sql = (
            f"SELECT t.chiphiid, t.giavl, t.hosoid, t.soluong"
            f" FROM (Select r.chiphiid, isnull(r.giavl,0) as giavl, qt.hosoid, r.soluong, qt.tt"
            f" From {self.schema}.qt32 r LEFT JOIN {self.schema}.qt qt ON qt.maqt=r.maqt"
            f" Where qt.madot='{self.madot}' And r.soluong>0"
            f" And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%')"
            f" And r.chiphiid In (Select chiphiid From dbo.plchiphi Where phanloai='Ong' And tinhtrang='Moi')"

            f" UNION ALL Select r.chiphiid, isnull(r.giavl,0) as giavl, qt.hosoid, r.soluong,qt.tt"
            f" From {self.schema}.qt34 r LEFT JOIN {self.schema}.qt qt ON qt.maqt=r.maqt"
            f" Where qt.madot='{self.madot}' And r.soluong>0"
            f" And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%')"
            f" And r.chiphiid In (Select chiphiid From dbo.plchiphi Where phanloai='Ong' And tinhtrang='Moi')"

            f" UNION ALL Select r.chiphiid, isnull(r.giavl,0) as giavl, qt.hosoid, r.soluong,qt.tt"
            f" From {self.schema}.qt31 r LEFT JOIN {self.schema}.qt qt ON qt.maqt=r.maqt"
            f" Where qt.madot='{self.madot}' And r.soluong>0"
            f" And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%')"
            f" And r.chiphiid In (Select chiphiid From dbo.plchiphi Where phanloai='Ong' And tinhtrang='Moi')"

            f" UNION ALL Select r.chiphiid, isnull(r.giavl,0) as giavl, qt.hosoid, r.soluong,qt.tt"
            f" From {self.schema}.qt33 r LEFT JOIN {self.schema}.qt qt ON qt.maqt=r.maqt"
            f" Where qt.madot='{self.madot}' And r.soluong>0"
            f" And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%')"
            f" And r.chiphiid In (Select chiphiid From dbo.plchiphi Where phanloai='Ong' And tinhtrang='Moi')) AS t"
            f" ORDER BY t.chiphiid,t.giavl,t.tt,t.hosoid"
        )
        dl = runsql(sql)
        if ((dl != None) and (len(dl) > 0)):
            for r in dl:
                k = (r["chiphiid"], r["giavl"], r["hosoid"])
                if k in tam:
                    tam[k] += r['soluong']
                else:
                    tam[k] = r['soluong']
        print(f"tinh cpong tam={tam}")
        dl = []
        for k in tam:
            (chiphiid, giavl, hosoid) = k
            sid = str(chiphiid)
            if sid not in dl:
                dl.append(sid)
        if len(dl) == 1:
            dl = f"('{dl[0]}')"
        else:
            dl = tuple(dl)
        sql = (
            f"Select chiphiid, diengiai as mota, dvt"
            f" From dbo.chiphi"
            f" Where chiphiid In {dl}"
        )
        dl = runsql(sql)
        if ((dl != None) and (len(dl) > 0)):
            chiphi = {}
            for r in dl:
                chiphi[r["chiphiid"]] = {"mota": r["mota"], "dvt": r["dvt"]}
        try:
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
        except:
            pass


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
        return data
    except:
        return data
