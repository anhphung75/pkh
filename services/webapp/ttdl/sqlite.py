import os
import sys
import decimal
import arrow
import json
#from utils.thoigian import stodate, datetos
from sqlalchemy import create_engine, ForeignKey, inspect
from sqlalchemy import Column, Sequence, func, desc
from sqlalchemy import Boolean, Integer, DECIMAL, Unicode, VARBINARY, JSON, Date, DateTime
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import scoped_session, sessionmaker, relationship


Base = declarative_base()


class Mau(object):
    #__table_args__ = {"schema": "web"}
    idutc = Column(Integer, primary_key=True, autoincrement=False)
    _refs = Column(Unicode())
    _data = Column(Unicode())
    status = Column(Unicode(50))
    inok = Column(Boolean, default=False)
    lastupdate = Column(Integer,
                        default=int(arrow.utcnow().float_timestamp * 1000),
                        onupdate=int(arrow.utcnow().float_timestamp * 1000))

    @hybrid_property
    def refs(self):
        try:
            dl = json.loads(self._refs)
            print(f"hydrid property refs")
            return dl
        except:
            return self._refs

    @refs.setter
    def refs(self, new):
        print(f"refs setter new={new}")
        dl = {}
        try:
            dl = json.loads(self._refs)
        except:
            pass
        for k in new:
            if (k in ['ghichu', 'notes']) or (new[k] and (f'new[k]' not in ['', '{}', '[]'])):
                dl[k] = new[k]
        if len(dl) > 0:
            self._refs = json.dumps(dl, ensure_ascii=False)

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
            if (k in ['ghichu', 'notes']) or (new[k] and (f'new[k]' not in ['', '{}', '[]'])):
                dl[k] = new[k]
        print("data setter new={new}")
        if len(dl) > 0:
            self._data = json.dumps(dl, ensure_ascii=False)


class ChiphiQuanly(Mau, Base):
    __tablename__ = 'chiphiquanly'


class Server():
    def __init__(self, dbname="draft.db"):
        self.cnnstr = f"sqlite:///{dbname}"

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
        # try:
        engine = create_engine(self.cnnstr, echo=True)
        Base.metadata.create_all(engine)
        Session = scoped_session(sessionmaker(bind=engine, autoflush=True))
        # except:
        #    print("err orm")
        #    return None
        return Session()

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


class Orm():
    def __init__(self, schema='web'):
        self.schema = schema.lower()
        self.bdl = None
        self.server()

    def server(self):
        engine = Server('draft.db')
        self.orm = engine.orm()

    def thongtin(self, bang):
        try:
            bang = bang.lower()
            if bang in ['chiphiquanly', 'cpql']:
                self.bdl = ChiphiQuanly
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
            r = self.orm.query(self.bdl).filter(
                (self.bdl._refs.like('%stim%')) | (self.bdl._data.like('%stim%'))).all()
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
                except IntegrityError as err:
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


class TaoJson():
    def __init__(self, schema='web'):
        self.schema = schema
        self.chiphiquanly()

    def khuvuc(self):
        pass

    def chiphiquanly(self):
        dl = {
            "idutc": int(arrow.get("20200101").to('utc').float_timestamp * 1000),
            "refs": {"macpql": 1},
            "data": {"vl": 1, "nc": 2.289, "mtc": 1.26, "tructiepkhac": 0.015, "chung": 0.045, "giantiepkhac": 0, "thutinhtruoc": 0.055, "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053},
            "status": "Fin"
        }
        Orm("web").moi("chiphiquanly", dl)

    def chiphiquanly_old(self):
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


TaoJson()
