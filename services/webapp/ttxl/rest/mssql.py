import arrow
import datetime
import decimal
import json

from sqlalchemy.exc import IntegrityError

from ttdl.mssql import Khachhang
from ttdl.mssql import Hoso
from ttdl.mssql import ChiphiQuanly


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


class Rest():
    def __init__(self, schema='web', bang='hoso'):
        self.schema = schema.lower()
        self.bang = bang.lower()
        self.mabang()

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
            r = runsql(sql)
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
            r = runsql(sql)
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
            r = runsql(sql)
            if ((r == None) or (len(r) < 1) or ("err" not in r)):
                print(f"Rest {self.bang} xoa[{idutc}]= ok")
        except:
            return None

    def moi(self, dl):
        if dl and (('refs' in dl) or ('data' in dl)):
            for k in dl.copy():
                if k not in ['idutc', 'inok', 'lastupdate', 'status', 'refs', 'data', self.ma]:
                    del dl[k]
        else:
            return None
        # check exist
        sql = (
            f"Select top 1 idutc From {self.schema}.{self.bang} "
            f"Where idutc>0")
        if 'refs' in dl:
            if len(dl['refs']) > 0:
                if isinstance(dl['data'], str):
                    dl['refs'] = f"N'{dl['refs']}'"
                else:
                    dl['refs'] = f"N'{json.dumps(dl['refs'], ensure_ascii=False)}'"
                sql += f" And refs={dl['refs']}"
            else:
                del dl['refs']
        if 'data' in dl:
            if len(dl['data']) > 0:
                if isinstance(dl['data'], str):
                    dl['data'] = f"N'{dl['data']}'"
                else:
                    dl['data'] = f"N'{json.dumps(dl['data'], ensure_ascii=False)}'"
                sql += f" And data={dl['data']}"
            else:
                del dl['data']
        try:
            r = runsql(sql)
            if ((r != None) or (len(r) > 0) or ("err" in r)):
                print(f"Rest {self.bang} moi err dl={dl}")
                return None
        except:
            return None
        # format by mssql
        dl['inok'] = "1"
        if 'idutc' in dl:
            dl['idutc'] = f"{dl['idutc']}"
            if len(dl['idutc']) < 1:
                dl['idutc'] = f"{int(arrow.utcnow().float_timestamp * 1000)}"
        else:
            dl['idutc'] = f"{int(arrow.utcnow().float_timestamp * 1000)}"
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
        while True:
            dl['lastupdate'] = f"{int(arrow.utcnow().float_timestamp * 1000)}"
            sql = (f"INSERT INTO {self.schema}.{self.bang} ({','.join(dl.keys())}) "
                   f"VALUES ({','.join(dl.values())});")
            print(f"sql={sql}")
            try:
                kq = runsql(sql)
                if "err" in kq:
                    print(f"err={kq['err']}")
                    if kq['err_code'] == 23000:
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
        if dl and (('refs' in dl) or ('data' in dl)):
            for k in dl.copy():
                if k not in ['idutc', 'inok', 'lastupdate', 'status', 'refs', 'data', self.ma]:
                    del dl[k]
        else:
            return None
        # check dl
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
        if 'data' not in dl:
            dl['data'] = {}
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
        if 'refs' not in dl:
            dl['refs'] = {}
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
                f"Where idutc={dl['idutc']} And status Not Like N'%Fin%';")
        try:
            r = runsql(sql)
            if ((r == None) or (len(r) < 1) or ("err" not in r)):
                print(f"Rest {self.bang} sua[{dl['idutc']}]=ok")
        except:
            return None

    def read(self, idutc):
        self.nap(idutc)

    def save(self, dl):
        self.sua(dl)


class Orm():
    def __init__(self, schema='web'):
        self.schema = schema.lower()
        self.ma = None
        self.bdl = None
        self.server()

    def server(self):
        engine = Server("pkh", "Ph0ngK3H0@ch",
                        "192.168.24.4:1433", "PKHData")
        self.orm = engine.orm()

    def thongtin(self, bang):
        try:
            bang = bang.lower()
            if bang in ["hoso"]:
                self.ma = "mahoso"
                self.bdl = Hoso
            elif bang in ["khachhang"]:
                self.ma = "makhachhang"
                self.bdl = Khachhang
            elif bang in ["dot"]:
                self.ma = "madot"
            elif bang in ["qtgt"]:
                self.ma = "maqtgt"
            elif bang in ['chiphiquanly', 'cpql']:
                self.ma = "macpql"
                self.bdl = ChiphiQuanly
            else:
                self.ma = None
                self.bdl = None
        except:
            pass

    def gom(self, bang, stim):
        self.thongtin(bang)
        if self.bdl == None:
            return None
        try:
            stim = f"{stim}".lower()
            r = self.orm.query(self.bdl).filter(
                (self.bdl._refs.like('%stim%')) | (self.bdl._data.like('%stim%'))).all()
            print(f"orm cpql r = {r}")
            return r
        except:
            return None

    def nap(self, bang, idutc=0):
        self.thongtin(bang)
        try:
            idutc = int(idutc)
            r = self.orm.query(self.bdl).get(idutc).first()
            print(f"orm nap r = {r}")
            return r
        except:
            return None

    def moi(self, bang, dl):
        self.thongtin(bang)
        if (self.bang == None) or ('idutc' not in dl):
            return None
        if dl and ('refs' not in dl) and ('data' not in dl):
            return None
        s = self.bdl()
        if "refs" in dl:
            s.refs = dl['refs']
        if "data" in dl:
            s.data = dl['data']
        if 'status' in dl:
            s.status = dl['status']
        if 'inok' in dl:
            s.inok = dl['inok']
        while True:
            s.idutc = int(dl['idutc'])
            s.lastupdate = int(arrow.utcnow().float_timestamp * 1000)
            try:
                self.orm.add(s)
                self.orm.commit()
                break
            except IntegrityError as err:
                try:
                    if int(err.orig.args[0]) in [23000, 23000]:
                        # duplicate Primary key
                        dl['idutc'] += 1
                except:
                    break

    def read(self, bang, idutc):
        self.nap(bang, idutc)

    def save1(self, bang='', dl={}):
        self.thongtin(bang)
        if self.bdl == None:
            return None
        if dl and (('refs' in dl) or ('data' in dl)):
            for k in dl.copy():
                if k not in ['idutc', 'inok', 'lastupdate', 'status', 'refs', 'data']:
                    del dl[k]
        else:
            return None
        # check dl
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
        if "idutc" not in dl:
            dl['idutc'] = int(arrow.utcnow().float_timestamp * 1000)
            self.moi(bang, dl)
            return None
        s = self.nap(bang, dl['idutc'])
        if s == None:
            self.moi(bang, dl)
            return None
        if "refs" in dl:
            s.refs = dl['refs']
        if "data" in dl:
            s.data = dl['data']
        if 'status' in dl:
            s.status = dl['status']
        if 'inok' in dl:
            s.inok = dl['inok']
        s.idutc = int(dl['idutc'])
        s.lastupdate = int(arrow.utcnow().float_timestamp * 1000)
        try:
            self.orm.commit()
        except IntegrityError as err:
            try:
                print(f"save1 err={err.orig.args[1]}")
            except:
                return None
