import arrow
import json

from ttdl.mssql import Server, Rest


engine = Server("pkh", "Ph0ngK3H0@ch",
                "192.168.24.4:1433", "PKHData")
db = engine.orm()


class TaoJson():
    def __init__(self, schema='web'):
        self.schema = schema
        # self.chiphiquanly()
        self.donvithicong()

    def khuvuc(self):
        pass

    def donvithicong(self):
        pass

    def chiphiquanly(self):
        dl = {"idutc": int(arrow.get("2017-06-27 22:33:43").to('utc').float_timestamp * 1000),
              "refs": {"macpql": 1},
              "data": {"vl": 1, "nc": 2.289, "mtc": 1.26, "tructiepkhac": 0.015, "chung": 0.045, "giantiepkhac": 0, "thutinhtruoc": 0.055,
                       "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053, "cv_cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
                       "cv_cpql": "Nghị định 32/2015/NĐ-CP ngày 25/03/2015; Quyết định 3384/QĐ-UBND 02/07/2016"},
              "status": "Fin"}
        Rest("web").moi("chiphiquanly", dl)

        dl = {"idutc": int(arrow.get("2017-06-27 22:33:44").to('utc').float_timestamp * 1000),
              "refs": {"macpql": 2},
              "data": {"vl": 1, "nc": 2.8, "mtc": 1.34, "tructiepkhac": 0.02, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055,
                       "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053, "cv_cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
                       "cv_cpql": "Nghị định 32/2015/NĐ-CP ngày 25/03/2015; Quyết định 3384/QĐ-UBND 02/07/2016"},
              "status": "Fin"}
        Rest("web").moi("chiphiquanly", dl)

        dl = {"idutc": int(arrow.get("2017-06-27 22:33:45").to('utc').float_timestamp * 1000),
              "refs": {"macpql": 3},
              "data": {"vl": 1, "nc": 2.289, "mtc": 1.26, "tructiepkhac": 0.02, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055,
                       "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053, "cv_cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
                       "cv_cpql": "Nghị định 32/2015/NĐ-CP ngày 25/03/2015; Quyết định 3384/QĐ-UBND 02/07/2016"},
              "status": "Fin"}
        Rest("web").moi("chiphiquanly", dl)

        dl = {"idutc": int(arrow.get("2017-06-27 22:33:46").to('utc').float_timestamp * 1000),
              "refs": {"macpql": 4},
              "data": {"vl": 1, "nc": 3.857, "mtc": 1.504, "tructiepkhac": 0.02, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055,
                       "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053, "cv_cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
                       "cv_cpql": "Nghị định 32/2015/NĐ-CP ngày 25/03/2015; Quyết định 3384/QĐ-UBND 02/07/2016"},
              "status": "Fin"}
        Rest("web").moi("chiphiquanly", dl)

        dl = {"idutc": int(arrow.get("2017-06-27 22:33:47").to('utc').float_timestamp * 1000),
              "refs": {"macpql": 5},
              "data": {"vl": 1, "nc": 5.714, "mtc": 1.82, "tructiepkhac": 0.02, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055,
                       "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053, "cv_cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
                       "cv_cpql": "Nghị định 32/2015/NĐ-CP ngày 25/03/2015; Quyết định 3384/QĐ-UBND 02/07/2016"},
              "status": "Fin"}
        Rest("web").moi("chiphiquanly", dl)

        dl = {"idutc": int(arrow.get("2017-06-27 22:33:48").to('utc').float_timestamp * 1000),
              "refs": {"macpql": 6},
              "data": {"vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055,
                       "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053, "cv_cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
                       "cv_cpql": "Nghị định 32/2015/NĐ-CP ngày 25/03/2015; Quyết định 3384/QĐ-UBND 02/07/2016"},
              "status": "Fin"}
        Rest("web").moi("chiphiquanly", dl)

        dl = {"idutc": int(arrow.get("2017-06-27 22:33:49").to('utc').float_timestamp * 1000),
              "refs": {"macpql": 7},
              "data": {"vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055,
                       "khaosat": 0.0236, "thietke": 1.2, "giamsat": 0.02566, "cv_cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
                       "cv_cpql": "Nghị định 32/2015/NĐ-CP ngày 25/03/2015; Quyết định 3384/QĐ-UBND 02/07/2016"},
              "status": "Fin"}
        Rest("web").moi("chiphiquanly", dl)

        dl = {"idutc": int(arrow.get("2019-09-18 12:33:43").to('utc').float_timestamp * 1000),
              "refs": {"macpql": 20190725},
              "data": {"vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055,
                       "khaosat": 0.0236, "thietke": 1.2, "giamsat": 0.02566, "cv_cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
                       "cv_cpql": "Nghị định 32/2015/NĐ-CP ngày 25/03/2015; Quyết định 3384/QĐ-UBND 02/07/2016"},
              "status": "Fin"}
        Rest("web").moi("chiphiquanly", dl)

        dl = {"idutc": int(arrow.get("2020-07-21 12:33:43").to('utc').float_timestamp * 1000),
              "refs": {"macpql": 20200721},
              "data": {"vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.055, "giantiepkhac": 0.02, "thutinhtruoc": 0.055,
                       "khaosat": 0.0207, "thietke": 1.2, "giamsat": 0.02566, "cv_cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
                       "cv_cpql": "Nghị định 68/2019/NĐ-CP ngày 14/08/2019; Quyết định 2207/QĐ-UBND ngày 18/06/2020"},
              "status": "Fin"}
        Rest("web").moi("chiphiquanly", dl)

        dl = {"idutc": int(arrow.get("2020-08-27 11:33:43").to('utc').float_timestamp * 1000),
              "refs": {"macpql": 20200827},
              "data": {"vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.055, "giantiepkhac": 0.02, "thutinhtruoc": 0.055,
                       "khaosat": 0.0207, "thietke": 1.2, "giamsat": 0.02566, "cv_cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
                       "cv_cpql": "Nghị định 68/2019/NĐ-CP ngày 14/08/2019; Quyết định 2207/QĐ-UBND ngày 18/06/2020"},
              "status": "Fin"}
        Rest("web").moi("chiphiquanly", dl)


class DoiJson():
    def __init__(self, schema='web'):
        self.schema = schema

    def nap1_khachhang(self, uid):
        sql = (
            f"Select top 1 khachhang, diachikhachhang as diachi, lienhe, hoso.hosoid,"
            f" dot.ngaylendot, dot.madot, dot.dotid, qt.maqt, qt.qtid"
            f" From (dbo.hoso hoso RIGHT JOIN dbo.qt qt ON hoso.hosoid=qt.hosoid)"
            f" LEFT JOIN dbo.dot dot ON dot.madot=qt.madot"
            f" Where hoso.hosoid={uid} and datalength(dot.ngaylendot)>0"
            f" Order By hoso.hosoid,dot.ngaylendot"
        )
        r = engine.runsql(sql)
        if ((r is None) or (not r)):
            return None
        print(f"dulieu r={r}")
        r = r[0]
        for k in r:
            if r[k] is None:
                r[k] = ''
        # chuyen dulieu
        dl = {}
        dl["idutc"] = r["ngaylendot"]
        dl["refs"] = {
            "dot": {"id": r['dotid'], "ma": r['madot']},
            "qtgt": {"id": r['qtid'], "ma": r['maqt']},
            "hoso": {"id": r['hosoid']}, }
        dl["data"] = {}
        if r["khachhang"]:
            dl["data"]["khachhang"] = (
                ' '.join(r["khachhang"].split())).upper()
        if r["diachi"]:
            dc = r["diachi"].replace("- ", ", ")
            dc = ' '.join(dc.split())
            dl["data"]["diachi"] = dc
        if r["lienhe"]:
            dl["data"]["lienhe"] = ' '.join(r["lienhe"].split())
        dl["status"] = "chuyen json"
        # xoa rong
        for k in dl['refs'].copy():
            if (not dl['refs'][k]) and (dl['refs'][k] != 0):
                del dl['refs'][k]
        for k in dl['data'].copy():
            if (not dl['data'][k]) and (dl['data'][k] != 0):
                del dl['data'][k]
        print(f"dulieu json={dl}")
        return dl

    def nap1_dot(self, uid):
        # load
        sql = (
            f"Select top 1 * From dbo.dot "
            f"Where madot='{uid}' "
            f"Order By madot")
        r = engine.runsql(sql)
        if ((r is None) or (not r)):
            return None
        #print(f"dulieu r={r}")
        r = r[0]
        for k in r:
            if r[k] is None:
                r[k] = ''
        # chuyen dulieu
        dl = {}
        dl["idutc"] = r["ngaylendot"]
        dl["refs"] = {
            "dotid": r['dotid'],
            "madot": r['madot'],
            "namlv": r['nam'],
            "kho": r['hop'],
            "plqt": r['plqt'],
            "nhathauid": r['nhathauid'],
        }
        dl["data"] = {
            "sodot": r['sodot'],
            "ngaylendot": r['ngaylendot'],
            "khuvuc": r['khuvuc'],
            "ngayhoancong": r['ngaydshc'],
            "ngaythicong": r['ngaythicong'],
            "tonghoso": r['tonghs'],
            "qtgt_tong": r['qt_tong'],
            "qtgt_ok": r['qt_ok'],
            "qtgt_tn": r['qt_tn'],
            "qtgt_thieu": r['qt_thieu'],
            "ngaylap": r['ngaylap'],
            "nguoilap": r['nguoilap']}
        dl["status"] = r['tinhtrang']
        # xoa rong
        for k in dl['refs'].copy():
            if (not dl['refs'][k]) and (dl['refs'][k] != 0):
                del dl['refs'][k]
        for k in dl['data'].copy():
            if (not dl['data'][k]) and (dl['data'][k] != 0):
                del dl['data'][k]
        #print(f"dulieu json={dl}")
        return dl

    def nap1_hoso(self, uid):
        sql = (
            f"Select top 1 khachhang, diachikhachhang as diachi, lienhe, hoso.hosoid,"
            f" dot.ngaylendot, dot.madot, dot.dotid, qt.maqt, qt.qtid"
            f" From (dbo.hoso hoso RIGHT JOIN dbo.qt qt ON hoso.hosoid=qt.hosoid)"
            f" LEFT JOIN dbo.dot dot ON dot.madot=qt.madot"
            f" Where hoso.hosoid={uid} and datalength(dot.ngaylendot)>0"
            f" Order By hoso.hosoid,dot.ngaylendot"
        )
        r = engine.runsql(sql)
        if ((r is None) or (not r)):
            return None
        print(f"dulieu r={r}")
        r = r[0]
        for k in r:
            if r[k] is None:
                r[k] = ''
        # chuyen dulieu
        dl = {}
        dl["idutc"] = r["ngaylendot"]
        dl["refs"] = {
            "dot": {"id": r['dotid'], "ma": r['madot']},
            "qtgt": {"id": r['qtid'], "ma": r['maqt']},
            "hoso": {"id": r['hosoid']}, }
        dl["data"] = {}
        if r["khachhang"]:
            dl["data"]["khachhang"] = (
                ' '.join(r["khachhang"].split())).upper()
        if r["diachi"]:
            dc = r["diachi"].replace("- ", ", ")
            dc = ' '.join(dc.split())
            dl["data"]["diachi"] = dc
        if r["lienhe"]:
            dl["data"]["lienhe"] = ' '.join(r["lienhe"].split())
        dl["status"] = "chuyen json"
        # xoa rong
        for k in dl['refs'].copy():
            if (not dl['refs'][k]) and (dl['refs'][k] != 0):
                del dl['refs'][k]
        for k in dl['data'].copy():
            if (not dl['data'][k]) and (dl['data'][k] != 0):
                del dl['data'][k]
        print(f"dulieu json={dl}")
        return dl

    def khachhang(self):
        uid = 124455
        maxloop = 124540
        try:
            while True and uid < maxloop:
                print(f"Chuyen hoso id={uid:06d} *****")
                dl = self.nap1_khachhang(uid)
                if dl != None:
                    Rest("web").moi("khachhang", dl)
                uid += 1
        except:
            return None

    def dot(self, nam):
        sql = (
            f"Select madot From dbo.dot "
            f"Where madot like '{nam}%' "
            f"Order By madot")
        r = engine.runsql(sql)
        if ((r is None) or (not r)):
            return None
        #print(f"dulieu dot={r}")
        for rec in r:
            dl = self.nap1_dot(rec['madot'])
            if dl is not None:
                Rest("web").moi("dot", dl)

    def hoso(self):
        uid = 124455
        maxloop = 124540
        try:
            while True and uid < maxloop:
                print(f"Chuyen hoso id={uid:06d} *****")
                dl = self.nap1_hoso(uid)
                if dl != None:
                    Rest("web").moi("hoso", dl)
                uid += 1
        except:
            return None


def drop_tables(schema='web'):
    tbls = ['hoso', 'khuvuc', 'dot', 'donvithicong',
            'chiphiquanly', 'bgvl', 'bgnc', 'bgmtc', 'bgtl']
    for i in tbls:
        sql = f"Drop table {schema}.{i}"
        print(f"sql={sql}")
        try:
            engine.runsql(sql)
        except:
            pass


# drop_tables()
DoiJson("web").dot(2010)
