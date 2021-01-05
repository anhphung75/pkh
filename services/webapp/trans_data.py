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
        # load
        sql = (
            f"Select top 1 khachhang, diachikhachhang as diachi, lienhe, hoso.hosoid,"
            f" dot.ngaylendot, dot.madot, dot.dotid, qt.maqt, qt.qtid"
            f" From (dbo.hoso hoso RIGHT JOIN dbo.qt qt ON hoso.hosoid=qt.hosoid)"
            f" LEFT JOIN dbo.dot dot ON dot.madot=qt.madot"
            f" Where hoso.hosoid={uid} and datalength(dot.ngaylendot)>0"
            f" Order By hoso.hosoid,dot.ngaylendot"
        )
        r = engine.runsql(sql)
        if ((r == None) or (len(r) < 1)):
            return None
        print(f"dulieu khachhang={r}")
        # chuyen dulieu
        dl = {}
        dl["idutc"] = r[0]["ngaylendot"]
        dl["refs"] = {
            "dot": {"id": r[0]['dotid'], "ma": r[0]['madot']},
            "qtgt": {"id": r[0]['qtid'], "ma": r[0]['maqt']},
            "hoso": {"id": r[0]['hosoid']}, }
        dl["data"] = {}
        if r[0]["khachhang"]:
            dl["data"]["khachhang"] = (
                ' '.join(r[0]["khachhang"].split())).upper()
        if r[0]["diachi"]:
            dc = r[0]["diachi"].replace("- ", ", ")
            dc = ' '.join(dc.split())
            dl["data"]["diachi"] = dc
        if r[0]["lienhe"]:
            dl["data"]["lienhe"] = ' '.join(r[0]["lienhe"].split())
        dl["status"] = "chuyen json"
        print(f"dulieu sau chuyen doi khachhang={dl}")
        return dl

    def nap1_dot(self, uid):
        # load
        sql = (
            f"Select top 1 * From dbo.dot "
            f"Where madot='{uid}' "
            f"Order By nam,madot")
        r = engine.runsql(sql)
        if ((r == None) or (len(r) < 1)):
            return None
        print(f"dulieu dot={r}")
        # chuyen dulieu
        dl = {}
        dl["idutc"] = r[0]["ngaylendot"]
        dl["refs"] = {
            "dotid": r[0]['dotid'],
            "madot": r[0]['madot'],
            "namlv": r[0]['nam'],
            "kho": r[0]['hop'],
            "plqt": r[0]['plqt'],
            "nhathauid": r[0]['nhathauid'],
        }
        dl["data"] = {
            "ngaylendot": r[0]['ngaylendot'],
        }
        dl["status"] = r[0]['tinhtrang']
        print(f"dulieu json dot={dl}")
        return dl

    def nap1_hoso(self, uid):
        # load
        sql = (
            f"Select top 1 khachhang, diachikhachhang as diachi, lienhe, hoso.hosoid,"
            f" dot.ngaylendot, dot.madot, dot.dotid, qt.maqt, qt.qtid"
            f" From (dbo.hoso hoso RIGHT JOIN dbo.qt qt ON hoso.hosoid=qt.hosoid)"
            f" LEFT JOIN dbo.dot dot ON dot.madot=qt.madot"
            f" Where hoso.hosoid={uid} and datalength(dot.ngaylendot)>0"
            f" Order By hoso.hosoid,dot.ngaylendot"
        )
        r = engine.runsql(sql)
        if ((r == None) or (len(r) < 1)):
            return None
        print(f"dulieu hoso={r}")
        # chuyen dulieu
        dl = {}
        dl["idutc"] = r[0]["ngaylendot"]
        #dl["mahoso"] = f"{r[0]['madot']}.{r[0]['hosoid']}"
        dl["status"] = "chuyen json"
        #dl["inok"] = 1
        dl["lastupdate"] = int(arrow.utcnow().float_timestamp * 1000)
        dl["refs"] = {
            "dot": {"id": r[0]['dotid'], "ma": r[0]['madot']},
            "qtgt": {"id": r[0]['qtid'], "ma": r[0]['maqt']},
            "hoso": {"id": r[0]['hosoid'], "ma": dl["makhachhang"]}, }
        dl["data"] = {}
        if r[0]["khachhang"]:
            dl["data"]["khachhang"] = (
                ' '.join(r[0]["khachhang"].split())).upper()
        if r[0]["diachi"]:
            dc = r[0]["diachi"].replace("- ", ", ")
            dc = ' '.join(dc.split())
            dl["data"]["diachi"] = dc
        if r[0]["lienhe"]:
            dl["data"]["lienhe"] = ' '.join(r[0]["lienhe"].split())
        print(f"dulieu sau chuyen doi khachhang={dl}")
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

    def dot(self):
        uid = 124455
        maxloop = 124540
        try:
            while True and uid < maxloop:
                print(f"Chuyen dot id={uid:06d} *****")
                dl = self.nap1_dot(uid)
                if dl != None:
                    Rest("web").moi("dot", dl)
                uid += 1
        except:
            return None

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
TaoJson("web")
