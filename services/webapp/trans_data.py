import arrow
import json

from ttdl.mssql import Server, Rest
from ttdl.mssql import xoarong


engine = Server("pkh", "Ph0ngK3H0@ch",
                "192.168.24.4:1433", "PKHData")
db = engine.orm()


class TaoJson():
    def __init__(self, schema='web'):
        self.schema = schema
        # self.chiphiquanly()
        # self.donvithicong()

    def khuvuc(self):
        pass

    def donvithicong(self):
        pass

    def chiphiquanly(self):
        dl = {"idutc": int(arrow.get("2017-06-27 22:33:43").to('utc').float_timestamp * 1000),
              "refs": {"hesoid": 1},
              "data": {"macpql": 1, "vl": 1, "nc": 2.289, "mtc": 1.26, "tructiepkhac": 0.015, "chung": 0.045, "giantiepkhac": 0, "thutinhtruoc": 0.055,
                       "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053,
                       "phaply": {"cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
                                  "cpql": "Nghị định 32/2015/NĐ-CP ngày 25/03/2015; Quyết định 3384/QĐ-UBND 02/07/2016"}, },
              "status": "Fin"}
        Rest("web").moi("chiphiquanly", dl)

        dl = {"idutc": int(arrow.get("2017-06-27 22:33:44").to('utc').float_timestamp * 1000),
              "refs": {"hesoid": 2},
              "data": {"macpql": 2, "vl": 1, "nc": 2.8, "mtc": 1.34, "tructiepkhac": 0.02, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055,
                       "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053,
                       "phaply": {"cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
                                  "cpql": "Nghị định 32/2015/NĐ-CP ngày 25/03/2015; Quyết định 3384/QĐ-UBND 02/07/2016"}, },
              "status": "Fin"}
        Rest("web").moi("chiphiquanly", dl)

        dl = {"idutc": int(arrow.get("2017-06-27 22:33:45").to('utc').float_timestamp * 1000),
              "refs": {"hesoid": 3},
              "data": {"macpql": 3, "vl": 1, "nc": 2.289, "mtc": 1.26, "tructiepkhac": 0.02, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055,
                       "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053,
                       "phaply": {"cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
                                  "cpql": "Nghị định 32/2015/NĐ-CP ngày 25/03/2015; Quyết định 3384/QĐ-UBND 02/07/2016"}, },
              "status": "Fin"}
        Rest("web").moi("chiphiquanly", dl)

        dl = {"idutc": int(arrow.get("2017-06-27 22:33:46").to('utc').float_timestamp * 1000),
              "refs": {"hesoid": 4},
              "data": {"macpql": 4, "vl": 1, "nc": 3.857, "mtc": 1.504, "tructiepkhac": 0.02, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055,
                       "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053,
                       "phaply": {"cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
                                  "cpql": "Nghị định 32/2015/NĐ-CP ngày 25/03/2015; Quyết định 3384/QĐ-UBND 02/07/2016"}, },
              "status": "Fin"}
        Rest("web").moi("chiphiquanly", dl)

        dl = {"idutc": int(arrow.get("2017-06-27 22:33:47").to('utc').float_timestamp * 1000),
              "refs": {"hesoid": 5},
              "data": {"macpql": 5, "vl": 1, "nc": 5.714, "mtc": 1.82, "tructiepkhac": 0.02, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055,
                       "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053,
                       "phaply": {"cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
                                  "cpql": "Nghị định 32/2015/NĐ-CP ngày 25/03/2015; Quyết định 3384/QĐ-UBND 02/07/2016"}, },
              "status": "Fin"}
        Rest("web").moi("chiphiquanly", dl)

        dl = {"idutc": int(arrow.get("2017-06-27 22:33:48").to('utc').float_timestamp * 1000),
              "refs": {"hesoid": 6},
              "data": {"macpql": 6, "vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055,
                       "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053,
                       "phaply": {"cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
                                  "cpql": "Nghị định 32/2015/NĐ-CP ngày 25/03/2015; Quyết định 3384/QĐ-UBND 02/07/2016"}, },
              "status": "Fin"}
        Rest("web").moi("chiphiquanly", dl)

        dl = {"idutc": int(arrow.get("2017-06-27 22:33:49").to('utc').float_timestamp * 1000),
              "refs": {"hesoid": 7},
              "data": {"macpql": 7, "vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055,
                       "khaosat": 0.0236, "thietke": 1.2, "giamsat": 0.02566,
                       "phaply": {"cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
                                  "cpql": "Nghị định 32/2015/NĐ-CP ngày 25/03/2015; Quyết định 3384/QĐ-UBND 02/07/2016"}, },
              "status": "Fin"}
        Rest("web").moi("chiphiquanly", dl)

        dl = {"idutc": int(arrow.get("2019-09-18 12:33:43").to('utc').float_timestamp * 1000),
              "refs": {"hesoid": 20190725},
              "data": {"macpql": 20190725, "vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055,
                       "khaosat": 0.0236, "thietke": 1.2, "giamsat": 0.02566,
                       "phaply": {"cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
                                  "cpql": "Nghị định 32/2015/NĐ-CP ngày 25/03/2015; Quyết định 3384/QĐ-UBND 02/07/2016"}, },
              "status": "Fin"}
        Rest("web").moi("chiphiquanly", dl)

        dl = {"idutc": int(arrow.get("2020-07-21 12:33:43").to('utc').float_timestamp * 1000),
              "refs": {"hesoid": 20200721},
              "data": {"macpql": 20200721, "vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.055, "giantiepkhac": 0.02, "thutinhtruoc": 0.055,
                       "khaosat": 0.0207, "thietke": 1.2, "giamsat": 0.02566,
                       "phaply": {"cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
                                  "cpql": "Nghị định 68/2019/NĐ-CP ngày 14/08/2019; Quyết định 2207/QĐ-UBND ngày 18/06/2020"}, },
              "status": "Fin"}
        Rest("web").moi("chiphiquanly", dl)

        dl = {"idutc": int(arrow.get("2020-08-27 11:33:43").to('utc').float_timestamp * 1000),
              "refs": {"hesoid": 20200827, "ghichu": "quy ước làm tròn sl=3, tiền=0"},
              "data": {"macpql": 20200827, "vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.055, "giantiepkhac": 0.02, "thutinhtruoc": 0.055,
                       "khaosat": 0.0207, "thietke": 1.2, "giamsat": 0.02566,
                       "phaply": {"cptl": "CV số 327/BGTLMĐ ngày 01/04/2014",
                                  "cpql": "Nghị định 68/2019/NĐ-CP ngày 14/08/2019; Quyết định 2207/QĐ-UBND ngày 18/06/2020"}, },
              "status": "Fin"}
        Rest("web").moi("chiphiquanly", dl)


class DoiJson():
    def __init__(self, schema='web', nam=2020):
        self.schema = schema
        self.nam = nam

    def hoso_khachhang(self):
        # loadd full
        sql = (
            f"Select top 1 khachhang, diachikhachhang as diachi, lienhe, hoso.hosoid, "
            f"dot.ngaylendot, dot.madot, dot.dotid, qt.maqt, qt.qtid, hoso.maq, hoso.maqp, "
            f"dot.nhathauid as dvtcid "
            f"From (dbo.hoso hoso RIGHT JOIN dbo.qt qt ON hoso.hosoid=qt.hosoid) "
            f"LEFT JOIN dbo.dot dot ON dot.madot=qt.madot "
            f"Where datalength(dot.ngaylendot)>0 And dot.nam={self.nam} "
            f"Order By dot.ngaylendot,hoso.hosoid"
        )
        print(f"hoso_khachhang sql={sql}")
        ld = engine.runsql(sql)
        if ((ld is None) or (not ld)):
            return None
        khach = {}
        hoso = {}
        stt = {"khach": 0, "hoso": 1}
        for r in ld:
            for k in r:
                if r[k] is None:
                    r[k] = ''
            print(f"r={json.dumps(r, ensure_ascii=False)}")
            idutc = int(arrow.get(r["ngaylendot"]).to(
                'utc').float_timestamp * 1000)
            # khach chuyen dulieu json
            dc = r["diachi"].replace("- ", ", ")
            dc = ' '.join(dc.split())
            _data = {
                "khachhang": (' '.join(r["khachhang"].split())).upper(),
                "diachi": dc}
            isnew = True
            for idkhach in khach:
                rec = khach[idkhach]["data"].copy()
                if 'makhachhang' in rec:
                    del rec['makhachhang']
                if f"{rec}" == f"{_data}":
                    isnew = False
                    break
            if isnew:
                idkhach = idutc
                while True:
                    if idkhach in khach:
                        idkhach += 1
                    else:
                        break
                stt['khach'] += 1
                _data['makhachhang'] = f"{self.nam}.khach.{stt['khach']:06}"
                khach[idkhach] = {
                    "idutc": idkhach,
                    "refs": {
                        "refscu": {
                            "dot": {"id": {}, "ma": {}},
                            "qtgt": {"id": {}, "ma": {}},
                            "hoso": {"id": {}},
                            "maq": r['maq'], "maqp": r['maqp']},
                        "lienhe": ' '.join(r["lienhe"].split())},
                    "data": _data,
                    "status": "chuyen json"}
            # update khach
            ref = khach[idkhach]["refs"]["refscu"]
            try:
                ref['dot']['ma'][r['madot']] = 1
                ref['dot']['id'][r['dotid']] = 1
            except:
                pass
            try:
                ref['qtgt']['ma'][r['maqt']] = 1
                ref['qtgt']['id'][r['qtid']] = 1
            except:
                pass
            try:
                ref['hoso']['id'][r['hosoid']] = 1
            except:
                pass
            # hoso chuyen dulieu json
            rec = khach[idkhach]["data"]
            _data = {
                "bang": {
                    "khachhang": {"id": idkhach, "ma": rec["makhachhang"]},
                    "dot": {"id": r['dotid'], "ma": r['madot']},
                    "qtgt": {"id": r['qtid'], "ma": r['maqt']},
                    "donvithicong": {"id": r['dvtcid'], "ma": r['dvtcid']},
                    "khuvuc": {"maq": r['maq'], "maqp": r['maqp']}},
                "khachsai": rec["khachhang"],
                "noigandhn": rec["diachi"]}
            isnew = True
            for idutc in hoso:
                rec = hoso[idutc]["data"].copy()
                if 'mahoso' in rec:
                    del rec['mahoso']
                if f"{rec}" == f"{_data}":
                    isnew = False
                    break
            if isnew:
                idutc = int(arrow.get(r["ngaylendot"]).to(
                    'utc').float_timestamp * 1000)
                while True:
                    if idutc in hoso:
                        idutc += 1
                    else:
                        break
                stt['hoso'] += 1
                _data['mahoso'] = f"{self.nam}.hoso.{stt['hoso']:06}"
                hoso[idutc] = {
                    "idutc": idutc,
                    "refs": {
                        "refscu": {"hoso": {"id": {}}},
                        "mahoso": f"{self.nam}.hoso.{stt['hoso']:06}",
                        "lienhe": ref["lienhe"]},
                    "data": _data,
                    "status": "chuyen json"}
            # update hoso
            rec = khach[idkhach]["data"]
            ref = hoso[idutc]["data"]["refscu"]
            try:
                ref['hoso']['id'][r['hosoid']] = 1
            except:
                pass
            # xoa rong
            khach[idkhach] = xoarong(khach[idkhach])
            hoso[idutc] = xoarong(hoso[idutc])
        print(f"khach={json.dumps(khach, ensure_ascii=False)}")
        print(f"hoso={json.dumps(hoso, ensure_ascii=False)}")

    def nap1_hoso(self, uid):
        sql = (
            f"Select top 1 khachhang, diachikhachhang as diachi, lienhe, hoso.hosoid,"
            f" dot.ngaylendot, dot.madot, dot.dotid, qt.maqt, qt.qtid"
            f" From (dbo.hoso hoso RIGHT JOIN dbo.qt qt ON hoso.hosoid=qt.hosoid)"
            f" LEFT JOIN dbo.dot dot ON dot.madot=qt.madot"
            f" Where hoso.hosoid={uid} and datalength(dot.ngaylendot)>0"
            f" Order By hoso.hosoid,dot.ngaylendot"
        )
        print("nap1_hoso sql={sql}")
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
        dl["idutc"] = int(arrow.get(r["ngaylendot"]).to(
            'utc').float_timestamp * 1000)
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
        dl = xoarong(dl)
        print(f"dulieu json={dl}")
        return dl

    def nap1_khachhang(self, uid):
        '''
        SELECT Min(dbo_dot.ngaylendot) AS ngaylendot, dbo_hoso.khachhang, dbo_hoso.diachikhachhang, dbo_hoso.lienhe
        FROM (dbo_hoso RIGHT JOIN dbo_qt ON dbo_hoso.hosoid = dbo_qt.hosoid) LEFT JOIN dbo_dot ON dbo_qt.madot = dbo_dot.madot
        GROUP BY dbo_hoso.khachhang, dbo_hoso.diachikhachhang, dbo_hoso.lienhe
        ORDER BY Min(dbo_dot.ngaylendot), dbo_hoso.khachhang, dbo_hoso.diachikhachhang, dbo_hoso.lienhe;
        '''
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
        dl["idutc"] = int(arrow.get(r["ngaylendot"]).to(
            'utc').float_timestamp * 1000)
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
        # print(f"dulieu r={r}")
        r = r[0]
        for k in r:
            if r[k] is None:
                r[k] = ''
        # chuyen dulieu
        dl = {}
        dl["idutc"] = int(arrow.get(r["ngaylendot"]).to(
            'utc').float_timestamp * 1000)
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
        # print(f"dulieu json={dl}")
        return dl

    def nap1_chiphi(self, uid):
        # load
        sql = (
            f"Select top 1 * From dbo.chiphi "
            f"Where chiphiid='{uid}' "
            f"Order By lastupdate,chiphiid")
        r = engine.runsql(sql)
        if ((r is None) or (not r)):
            return None
        # print(f"dulieu r={r}")
        r = r[0]
        for k in r:
            if r[k] is None:
                r[k] = ''
        # chuyen dulieu
        dl = {}
        dl["idutc"] = int(arrow.get(r["lastupdate"]).to(
            'utc').float_timestamp * 1000)
        if 'CTLD' in r['mapl1']:
            plcp = 'cpxd'
        elif 'VTTC' in r['mapl1']:
            plcp = 'cpvt'
        elif 'VLXD' in r['mapl1']:
            plcp = 'cpvl'
        elif 'TLMD' in r['mapl1']:
            plcp = 'tlmd'
        else:
            plcp = ''
        dl["refs"] = {
            "chiphiid": r['chiphiid'],
            'maketoan': ''.join(f"{r['maso']}".split('.')),
            "plcp": plcp,
        }
        nhanhieu = ''
        if r['nhanhieu']:
            nhanhieu = r['nhanhieu'].strip()
        if r['tinhtrang']:
            mota = ' '.join(
                f"{r['diengiai']} {nhanhieu} ({r['tinhtrang'].strip()})".split())
        else:
            mota = ' '.join(
                f"{r['diengiai']} {nhanhieu}".split())
        dl["data"] = {
            "mota_qtgt": mota,
            "mota_qtvt": mota,
            "dvt": r['dvt'],
            "nhanhieu": r['nhanhieu'],
            "tinhtrang": r['tinhtrang'],
            "ghichu": r['ghichu'],
        }
        dl["status"] = 'chuyen json'
        # xoa rong
        dl = xoarong(dl)
        # print(f"dulieu json={dl}")
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
        # print(f"dulieu dot={r}")
        for rec in r:
            dl = self.nap1_dot(rec['madot'])
            if dl is not None:
                Rest("web").moi("dot", dl)

    def hoso(self, nam):
        sql = (
            f"Select hoso.hosoid"
            f" From (dbo.hoso hoso RIGHT JOIN dbo.qt qt ON hoso.hosoid=qt.hosoid)"
            f" LEFT JOIN dbo.dot dot ON dot.madot=qt.madot"
            f" Where dot.nam={nam} and datalength(dot.ngaylendot)>0"
            f" Order By dot.ngaylendot,dot.madot,qt.maqt,hoso.hosoid"
        )
        r = engine.runsql(sql)
        if ((r is None) or (not r)):
            return None
        for rec in r:
            dl = self.nap1_hoso(rec['hosoid'])
            if dl is not None:
                Rest("web").moi("hoso", dl)

    def chiphi(self):
        sql = (
            f"Select chiphiid From dbo.chiphi "
            f"Where chiphiid>0"
            f"Order By lastupdate,chiphiid")
        r = engine.runsql(sql)
        if ((r is None) or (not r)):
            return None
        # print(f"dulieu dot={r}")
        for rec in r:
            dl = self.nap1_chiphi(rec['chiphiid'])
            if dl is not None:
                Rest("web").moi("chiphi", dl)


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
# TaoJson("web").chiphiquanly()
DoiJson("web", 2020).hoso_khachhang()
