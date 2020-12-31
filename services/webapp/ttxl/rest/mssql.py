import arrow
import datetime
import decimal
import json

from sqlalchemy import create_engine
from sqlalchemy.exc import IntegrityError

#from ttdl.mssql import Server


class Server():
    def __init__(self, user=None, pwd=None, host=None, dbname=None):
        self.user = user
        self.pwd = pwd
        self.host = host
        self.dbname = dbname
        self.cnnstr = (
            f"mssql+pyodbc://{self.user}:{self.pwd}@{self.host}/{self.dbname}?"
            f"driver=ODBC+Driver+17+for+SQL+Server")

    def core(self):
        try:
            # params = urllib.parse.quote_plus(
            #    "DRIVER={FreeTDS};SERVER=mssql;Port:1433;DATABASE=master;UID=sa;PWD=w3b@pkh2019")
            # cnnstr = f"mssql+pyodbc:///?odbc_connect={params}"
            # cnnstr = f"sqlite:///:memory:"
            engine = create_engine(self.cnnstr, echo=True)
            engine.execution_options(isolation_level="AUTOCOMMIT")
        except:
            return None
        return engine

    def orm(self):
        try:
            engine = create_engine(self.cnnstr, echo=False)
            Base.metadata.create_all(engine)
            Session = scoped_session(sessionmaker(bind=engine, autoflush=True))
            return Session()
        except:
            return None

    def show_views(self, schema=None):
        sql = f"Select * From Information_schema.tables"
        if schema:
            sql += f" Where table_schema='{schema}'"
        sql += f" Order by table_catalog, table_schema, table_type, table_name;"
        try:
            kq = self.core().execute(sql)
            for row in kq:
                print(dict(row))
        except:
            pass

    def del_object(self, otype='Table', oname=None):
        sql = (
            f"Drop {otype} {oname};")
        try:
            self.core().execute(sql)
        except:
            pass


class Rest():
    def __init__(self, schema='web', bang='hoso'):
        self.schema = schema.lower()
        self.bang = bang.lower()
        self.mabang()

    def runsql(self, sql=''):
        engine = Server("pkh", "Ph0ngK3H0@ch",
                        "192.168.24.4:1433", "PKHData")
        try:
            engine.orm()
            kq = engine.core().execute(sql)
            data = []
            for row in kq:
                dl = dict(row)
                for k in dl.copy():
                    if type(dl[k]) in [datetime, datetime.date, datetime.datetime, datetime.time]:
                        if k in ['lastupdate', 'ngaylendot']:
                            dl[k] = int(arrow.get(dl[k]).to(
                                'utc').float_timestamp * 1000)
                        else:
                            dl[k] = int(arrow.get(dl[k]).format("YYYYMMDD"))
                    if isinstance(dl[k], decimal.Decimal):
                        dl[k] = float(dl[k])
                data.append(dl)
            kq.close()
            return data
        except IntegrityError as err:
            if err.orig:
                return {"err_code": int(err.orig.args[0]), "err": err.orig.args[1]}
            else:
                return None

    def mabang(self):
        if self.bang in ["hoso"]:
            self.ma = "mahoso"
        elif self.mabang in ["khachhang"]:
            self.ma = "makhachhang"
        elif self.mabang in ["dot"]:
            self.ma = "madot"
        elif self.mabang in ["qtgt"]:
            self.ma = "maqtgt"
        else:
            self.ma = None

    def gom(self, sval=None):
        sql = f"Select * "
        if sval and len(sval) > 1:
            sql += f"From {self.schema}.{self.bang} Where idutc>0 And data Like '%: {sval}%'"
        else:
            sql += f"From {self.schema}.{self.bang} Where idutc>0"
        print(f"sql={sql}")
        try:
            r = self.runsql(sql)
            if ((r == None) or (len(r) < 1) or ("err" in r)):
                return None
            print(f"Rest {self.bang} gom[{sval}]={r}")
            return r
        except:
            return None

    def nap(self, idutc):
        if not idutc:
            return None
        sql = f"Select top 1 * From {self.schema}.{self.bang} Where idutc={idutc}"
        try:
            r = self.runsql(sql)
            if ((r == None) or (len(r) < 1) or ("err" in r)):
                return None
            print(f"Rest {self.bang} nap[{idutc}]={r}")
            return r
        except:
            return None

    def xoa(self, idutc):
        if not idutc:
            return None
        sql = f"Delete From {self.schema}.{self.bang} Where idutc={idutc};"
        try:
            r = self.runsql(sql)
            if ((r == None) or (len(r) < 1) or ("err" not in r)):
                print(f"Rest {self.bang} xoa[{idutc}]= ok")
        except:
            return None

    def moi(self, dl, ismoi=False):
        if not dl:
            return None
        # check dl
        for k in dl.copy():
            if k not in ['idutc', 'inok', 'lastupdate', 'status', 'refs', 'data', self.ma]:
                del dl[k]
        # format by mssql
        dl['inok'] = "1"
        if 'idutc' not in dl:
            dl['idutc'] = int(arrow.utcnow().float_timestamp * 1000)
        dl['idutc'] = f"{dl['idutc']}"
        if 'status' in dl:
            if len(dl['status']) > 0:
                dl['status'] = f"N'{dl['status']}'"
            else:
                del dl['status']
        if self.ma in dl:
            if len(dl[self.ma]) > 0:
                dl[self.ma] = f"N'{dl[self.ma]}'"
            else:
                del dl[self.ma]
        if 'refs' in dl:
            if len(dl['refs']) > 0:
                dl['refs'] = f"N'{json.dumps(dl['refs'], ensure_ascii=False)}'"
            else:
                del dl['refs']
        if 'data' in dl:
            if len(dl['data']) > 0:
                dl['data'] = f"N'{json.dumps(dl['data'], ensure_ascii=False)}'"
            else:
                del dl['data']
        while True:
            dl['lastupdate'] = f"{int(arrow.utcnow().float_timestamp * 1000)}"
            sql = (f"INSERT INTO {self.schema}.{self.bang} ({','.join(dl.keys())}) "
                   f"VALUES ({','.join(dl.values())});")
            print(f"sql={sql}")
            try:
                kq = self.runsql(sql)
                if "err" in kq:
                    print(f"err={kq['err']}")
                    if ismoi and kq['err_code'] == 23000:
                        # duplicate Primary key
                        dl["idutc"] += 1
                    else:
                        break
                else:
                    print("created ok")
                    break
            except:
                break

    def sua(self, dl):
        # check dl
        for k in dl.copy():
            if k not in ['idutc', 'inok', 'lastupdate', 'status', 'refs', 'data', self.ma]:
                del dl[k]
        if 'data' in dl:
            if isinstance(dl['data'], str):
                dl['data'] = json.loads(dl['data'])
            try:
                for k in dl['data'].copy():
                    if (dl['data'][k] == None) or (len(dl['data'][k]) < 1):
                        if k.lower() not in ['ghichu', 'notes']:
                            del dl['data'][k]
                    for k1 in k:
                        if (dl['data'][k][k1] == None) or (len(dl['data'][k][k1]) < 1):
                            if k1.lower() not in ['ghichu', 'notes']:
                                del dl['data'][k][k1]
            except:
                pass
        else:
            dl['data'] = {}
        if 'refs' in dl:
            if isinstance(dl['refs'], str):
                dl["refs"] = json.loads(dl["refs"])
            try:
                for k in dl['refs'].copy():
                    if (dl['refs'][k] == None) or (len(dl['refs'][k]) < 1):
                        del dl['refs'][k]
                    else:
                        for k1 in k:
                            if (dl['refs'][k][k1] == None) or (len(dl['refs'][k][k1]) < 1):
                                del dl['refs'][k][k1]
            except:
                pass
        else:
            dl['refs'] = {}
        # check lastupdate
        if ('lastupdate' not in dl) or ('idutc' not in dl):
            self.moi(dl)
            return None
        # check old
        r = self.nap(dl['idutc'])
        if len(r) < 1 or ('err' in r):
            self.moi(dl)
            return None
        r = r[0]
        if dl['lastupdate'] < r['lastupdate']:
            return None
        else:
            del dl['lastupdate']
        if len(r['status']) > 0:
            r['status'] = r['status'].lower()
            if 'fin' in r['status']:
                return None
        if 'data' in r:
            for k in r['data']:
                if k not in dl['data']:
                    dl['data'][k] = r['data'][k]
                try:
                    for k1 in k:
                        if k1 not in dl['data'][k]:
                            dl['data'][k][k1] = r['data'][k][k1]
                except:
                    pass
        if len(dl['data']) > 0:
            dl['data'] = f"N'{json.dumps(dl['data'], ensure_ascii=False)}'"
        else:
            del dl['data']
        if 'refs' in r:
            for k in r['refs']:
                if k not in dl['refs']:
                    dl['refs'][k] = r['refs'][k]
                try:
                    for k1 in k:
                        if k1 not in dl['refs'][k]:
                            dl['refs'][k][k1] = r['refs'][k][k1]
                except:
                    pass
        if len(dl['refs']) > 0:
            dl["refs"] = f"N'{json.dumps(dl['refs'], ensure_ascii=False)}'"
        else:
            del dl['refs']
        if 'status' in dl:
            if len(dl['status']) > 0:
                dl['status'] = f"N'{dl['status']}'"
            else:
                del dl['status']
        if self.ma in dl:
            if len(dl[self.ma]) > 0:
                dl[self.ma] = f"N'{dl[self.ma]}'"
            else:
                del dl[self.ma]

        # update to server
        sql = f"UPDATE {self.schema}.{self.bang} SET "
        for k in dl:
            sql += f"{k}={dl[k]},"
        sql += (f"lastupdate={int(arrow.utcnow().float_timestamp * 1000)} "
                f"Where idutc={dl['idutc']} And status Not Like '%Fin%';")
        try:
            r = self.runsql(sql)
            if ((r == None) or (len(r) < 1) or ("err" not in r)):
                print(f"Rest {self.bang} sua[{dl['idutc']}]=ok")
        except:
            return None

    def read(self, idutc):
        self.nap(idutc)

    def save(self, dl):
        self.sua(dl)


class TaoJson():
    def __init__(self, schema='web'):
        self.schema = schema
        self.Chiphiquanly()

    def Khuvuc(self):
        pass

    def Chiphiquanly(self):
        dl = {"macpql": 1, "status": "Fin",
              "data": {"vl": 1, "nc": 2.289, "mtc": 1.26, "tructiepkhac": 0.015, "chung": 0.045, "giantiepkhac": 0, "thutinhtruoc": 0.055, "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}
              }
        Rest("web", "chiphiquanly").sua(dl)
        dl = {"macpql": 2, "status": "Fin",
              "data": {"vl": 1, "nc": 2.8, "mtc": 1.34, "tructiepkhac": 0.02, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055, "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}
              }
        Rest("web", "chiphiquanly").save(dl)

        dl = {"macpql": 3, "status": "Fin",
              "data": {"vl": 1, "nc": 2.289, "mtc": 1.26, "tructiepkhac": 0.02, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055, "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}
              }
        Rest("web", "chiphiquanly").moi(dl)
        dl = {"macpql": 4, "status": "Fin",
              "data": {"vl": 1, "nc": 3.857, "mtc": 1.504, "tructiepkhac": 0.02, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055, "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}
              }
        Rest("web", "chiphiquanly").moi(dl)
        dl = {"macpql": 5, "status": "Fin",
              "data": {"vl": 1, "nc": 5.714, "mtc": 1.82, "tructiepkhac": 0.02, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055, "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053,
                       "phaply": "Nghị định 32/2015/NĐ-CP ngày 25/03/2015; Quyết định 3384/QĐ-UBND 02/07/2016"}
              }
        Rest("web", "chiphiquanly").moi(dl)
        dl = {"macpql": 6, "status": "Fin",
              "data": {"vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055, "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053,
                       "phaply": "Nghị định 32/2015/NĐ-CP ngày 25/03/2015; Quyết định 3384/QĐ-UBND 02/07/2016"}
              }
        Rest("web", "chiphiquanly").moi(dl)
        dl = {"macpql": 7, "status": "Fin",
              "data": {"vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055, "khaosat": 0.0236, "thietke": 1.2, "giamsat": 0.02566,
                       "phaply": "Nghị định 32/2015/NĐ-CP ngày 25/03/2015; Quyết định 3384/QĐ-UBND 02/07/2016"}
              }
        Rest("web", "chiphiquanly").moi(dl)
        dl = {"macpql": 20190725, "status": "Fin",
              "data": {"vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055, "khaosat": 0.0236, "thietke": 1.2, "giamsat": 0.02566,
                       "phaply": "Nghị định 68/2019/NĐ-CP ngày 14/08/2019; Quyết định 2207/QĐ-UBND ngày 18/06/2020"}
              }
        Rest("web", "chiphiquanly").moi(dl)
        dl = {"macpql": 20200721, "status": "Fin",
              "data": {"vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.055, "giantiepkhac": 0.02, "thutinhtruoc": 0.055, "khaosat": 0.0207, "thietke": 1.2, "giamsat": 0.02566,
                       "phaply": "Nghị định 68/2019/NĐ-CP ngày 14/08/2019; Quyết định 2207/QĐ-UBND ngày 18/06/2020"}
              }
        Rest("web", "chiphiquanly").moi(dl)


class DoiJson():
    def __init__(self, schema='web'):
        self.schema = schema

    def runsql(self, sql=''):
        engine = Server("pkh", "Ph0ngK3H0@ch",
                        "192.168.24.4:1433", "PKHData")
        try:
            kq = engine.core().execute(sql)
            data = []
            for row in kq:
                dl = dict(row)
                for k in dl.copy():
                    if type(dl[k]) in [datetime, datetime.date, datetime.datetime, datetime.time]:
                        if k in ['lastupdate', 'ngaylendot']:
                            dl[k] = int(arrow.get(dl[k]).to(
                                'utc').float_timestamp * 1000)
                        else:
                            dl[k] = int(arrow.get(dl[k]).format("YYYYMMDD"))
                    if isinstance(dl[k], decimal.Decimal):
                        dl[k] = float(dl[k])
                data.append(dl)
            kq.close()
            return data
        except IntegrityError as err:
            if err.orig:
                return {"err_code": int(err.orig.args[0]), "err": err.orig.args[1]}
            else:
                return None

    def crud_moi(self, bang, dl, ma='mahoso', ismoi=True):
        # check dl
        for k in dl.copy():
            if k not in ['idutc', 'inok', 'lastupdate', 'status', 'refs', 'data', ma]:
                del dl[k]
        if not dl['idutc']:
            dl['idutc'] = int(arrow.utcnow().float_timestamp * 1000)
        dl['inok'] = 1
        if dl['status']:
            dl['status'] = f"N'{dl['status']}'"
        if dl[ma]:
            dl[ma] = f"N'{dl[ma]}'"
        if dl['refs']:
            try:
                dl["refs"] = json.dumps(dl["refs"], ensure_ascii=False)
            except:
                pass
            dl['refs'] = f"N'{dl['refs']}'"
        if dl['data']:
            try:
                dl['data'] = json.dumps(dl['data'], ensure_ascii=False)
            except:
                pass
            dl['data'] = f"N'{dl['data']}'"
        while True:
            dl['lastupdate'] = int(arrow.utcnow().float_timestamp * 1000)
            sql = (f"INSERT INTO {self.schema}.{bang} ({','.join(dl.keys())}) "
                   f"VALUES ({','.join(dl.values())});")
            try:
                kq = self.runsql(sql)
                if "err" in kq:
                    print(f"err={kq['err']}")
                    if ismoi and kq['err_code'] == 23000:
                        # duplicate Primary key
                        dl["idutc"] += 1
                    else:
                        break
                else:
                    print("created ok")
                    break
            except:
                break

    def nap_khachhang(self, uid):
        # load
        sql = (
            f"Select top 1 khachhang, diachikhachhang as diachi, lienhe, hoso.hosoid,"
            f" dot.ngaylendot, dot.madot, dot.dotid, qt.maqt, qt.qtid"
            f" From (dbo.hoso hoso RIGHT JOIN dbo.qt qt ON hoso.hosoid=qt.hosoid)"
            f" LEFT JOIN dbo.dot dot ON dot.madot=qt.madot"
            f" Where hoso.hosoid={uid} and datalength(dot.ngaylendot)>0"
            f" Order By hoso.hosoid,dot.ngaylendot"
        )
        r = self.runsql(sql)
        if ((r == None) or (len(r) < 1)):
            return None
        print(f"dulieu khachhang={r}")
        # chuyen dulieu
        dl = {}
        dl["idutc"] = r[0]["ngaylendot"]
        dl["makhachhang"] = f"{r[0]['madot']}.{r[0]['hosoid']}"

        dl["status"] = "chuyen json"
        dl["inok"] = 1
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
                print(
                    f"Chuyen hoso id={uid:06d} *****")
                dulieu = self.nap_khachhang(uid)
                if dulieu:
                    self.crud_moi("khachhang", dulieu,
                                  ma='makhachhang', ismoi=True)
                uid += 1
        except:
            return None


TaoJson()
