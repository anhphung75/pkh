import os
import sys
import datetime
import decimal
import arrow
import json
# from utils.thoigian import stodate, datetos
from sqlalchemy import create_engine, ForeignKey, inspect
from sqlalchemy import Column, Sequence, func, desc
from sqlalchemy import BigInteger, Unicode, Boolean
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import scoped_session, sessionmaker, relationship

from sqlalchemy_json import mutable_json_type


Base = declarative_base()


class Mau(object):
    __table_args__ = {"schema": "web"}

    idutc = Column(BigInteger, primary_key=True, autoincrement=False)
    _refs = Column(Unicode())
    _data = Column(Unicode())
    status = Column(Unicode(50))
    inok = Column(Boolean, default=False)
    lastupdate = Column(BigInteger,
                        default=int(arrow.utcnow().float_timestamp * 1000),
                        onupdate=int(arrow.utcnow().float_timestamp * 1000))

    def tracuu(self, dl):
        stim = set()
        dsbo = ['lastupdate', 'inok', 'scan', 'url', 'idutc']
        dl = {"defa": dl}
        while len(dl) > 0:
            refs = {}
            kk = 0
            for k in dl:
                if k not in dsbo:
                    if dl[k] == None:
                        pass
                    elif isinstance(dl[k], (str, int, float)):
                        stim.add(f"{dl[k]}")
                    elif isinstance(dl[k], dict):
                        for k1 in dl[k]:
                            if k1 not in dsbo:
                                if isinstance(dl[k][k1], (str, int, float)):
                                    stim.add(f"{dl[k][k1]}")
                                elif isinstance(dl[k][k1], (dict, list)):
                                    refs[kk] = dl[k][k1].copy()
                                    kk += 1
                                else:
                                    pass
                    elif isinstance(dl[k], list):
                        for v1 in dl[k]:
                            if isinstance(v1, (str, int, float)):
                                stim.add(f"{v1}")
                            elif isinstance(v1, (dict, list)):
                                refs[kk] = v1.copy()
                                kk += 1
                            else:
                                pass
                    else:
                        pass
            dl = refs.copy()
        # remove includes
        for v in stim.copy():
            for v1 in stim.copy():
                if (v1 in v) and (v1 != v) and (v1 in stim):
                    stim.remove(v1)
        return stim

    @hybrid_property
    def refs(self):
        try:
            dl = json.loads(self._refs)
        except:
            dl = {}
        return dl

    @refs.setter
    def refs(self, new):
        dl = {}
        try:
            dl = json.loads(self._refs)
        except:
            pass
        for k in new:
            if (k in ['ghichu', 'notes']) or (new[k] != None and (f'new[k]' not in ['', '{}', '[]'])):
                dl[k] = new[k]
        if len(dl) > 0:
            self._refs = json.dumps(dl, ensure_ascii=False)
            # add stim
            new = self.tracuu(dl)
            data = {}
            try:
                data = json.loads(self._data)
            except:
                pass
            if ('timkiem' in data) and (len(data['timkiem']) > 0):
                old = data['timkiem'].split(' ')
                for v in old:
                    new.add(v)
            for v in new.copy():
                for v1 in new.copy():
                    if (v1 in v) and (v1 != v) and (v1 in new):
                        new.remove(v1)
            new = ' '.join(new)
            if ('timkiem' not in data) or (data['timkiem'] != new):
                data['timkiem'] = new
                self._data = json.dumps(data, ensure_ascii=False)

    @hybrid_property
    def data(self):
        try:
            dl = json.loads(self._data)
        except:
            dl = {}
        return dl

    @data.setter
    def data(self, new):
        dl = {}
        try:
            dl = json.loads(self._data)
        except:
            pass
        for k in new:
            if (k in ['ghichu', 'notes']) or (new[k] != None and (f'new[k]' not in ['', '{}', '[]'])):
                dl[k] = new[k]
        if len(dl) > 0:
            # add stim
            refs = {}
            try:
                refs = json.loads(self._refs)
            except:
                pass
            new = self.tracuu(refs)
            old = self.tracuu(dl)
            new = new | old
            for v in new.copy():
                for v1 in new.copy():
                    if (v1 in v) and (v1 != v) and (v1 in new):
                        new.remove(v1)
            dl['timkiem'] = ' '.join(new)
            self._data = json.dumps(dl, ensure_ascii=False)


class Khachhang(Mau, Base):
    __tablename__ = 'khachhang'


class Hoso(Mau, Base):
    __tablename__ = 'hoso'


class Khuvuc(Mau, Base):
    __tablename__ = 'khuvuc'


class Dot(Mau, Base):
    __tablename__ = 'dot'
    # madot = Column(Unicode(50))  # yyyy.gmmp.xxx xxx:stt
    # refs:= dvtc.idutc, madvtc, qtvt.idutc, maqtvt
    # data:= qtgt:tonghoso:, tongqt, tongtrongai,...,nguoilap, ngaylap,ghichu; qtvt:sophieunhap,


class Donvithicong(Mau, Base):
    __tablename__ = 'donvithicong'
    # madvtc = Column(Unicode(50))
    # data:= lienhe, masothue, ....


class ChiphiQuanly(Mau, Base):
    __tablename__ = 'chiphiquanly'


class Bgvl(Mau, Base):
    __tablename__ = 'bgvl'


class Bgnc(Mau, Base):
    __tablename__ = 'bgnc'


class Bgmtc(Mau, Base):
    __tablename__ = 'bgmtc'


class Bgtl(Mau, Base):
    __tablename__ = 'bgtl'


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

    def runsql(self, sql=''):
        try:
            kq = self.core().execute(sql)
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


def runsql(sql=''):
    engine = Server("pkh.tctb", "123456789",
                    "192.168.24.4:1433", "PKHData")
    try:
        kq = engine.core().execute(sql)
        data = []
        for row in kq:
            dl = dict(row)
            for k in dl.copy():
                if type(dl[k]) in [datetime, datetime.date, datetime.datetime, datetime.time]:
                    if k in ['lastupdate']:
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
            return {"code": err.orig.args[0], "err": err.orig.args[1]}
        else:
            return None


class Rest():
    def __init__(self, schema='web'):
        self.schema = schema.lower()
        self.bdl = None
        self.server()

    def server(self):
        engine = Server("pkh", "Ph0ngK3H0@ch",
                        "192.168.24.4:1433", "PKHData")
        self.orm = engine.orm()

    def thongtin(self, bang):
        try:
            bang = bang.lower()
            if bang in ['chiphiquanly', 'cpql']:
                self.bdl = ChiphiQuanly
            elif bang in ['hoso', 'hosokhachhang']:
                self.bdl = Hoso
            else:
                self.bdl = None
        except:
            pass

    def gom(self, bang, stim):
        self.thongtin(bang)
        if self.bdl == None:
            return None
        try:
            stim = f"{stim}".lower()
            r = self.orm.query(self.bdl).filter(self.bdl.data.timkiem.like('%stim%')).all()
            print(f"orm cpql r = {r}")
            return r
        except:
            return None

    def nap(self, bang, idutc=0):
        self.thongtin(bang)
        # try:
        idutc = int(idutc)
        r = self.orm.query(self.bdl).filter(
            self.bdl.idutc == idutc).first()
        print(f"orm nap r = {vars(r)}")
        return r
        # except:
        #    return None

    def moi(self, bang, dl):
        self.thongtin(bang)
        if (self.bdl == None) or ('idutc' not in dl):
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
                print(f'orm moi refs={s.refs} _refs={s._refs}')
                print(f'orm moi data={s.data} _data={s._data}')
                self.orm.add(s)
                self.orm.commit()
                break
            except IntegrityError as err:
                try:
                    info = f"{err}"
                    if ('UNIQUE' in info) or ('PRIMARY' in info):
                        # duplicate Primary key
                        self.orm.rollback()
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
                self.orm.rollback()
                print(f"save1 err={err.orig.args[1]}")
            except:
                return None
