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
from sqlalchemy.ext.hybrid import hybrid_property, hybrid_method
from sqlalchemy.orm import scoped_session, sessionmaker, relationship


Base = declarative_base()


def xoakeys(dl, xoa):
    if not isinstance(dl, dict):
        return dl
    if f"{dl}" in ['None', '', '{}', '[]', '()']:
        return dl
    if f"{xoa}" in ['None', '', '{}', '[]', '()']:
        return dl
    if not isinstance(xoa, list):
        xoa = [xoa]
    # xoa key
    for k in dl.copy():
        if (k in xoa) or (f"{k}" in xoa):
            del dl[k]
        elif isinstance(dl[k], dict):
            dl[k] = xoakeys(dl[k], xoa)
        else:
            pass
    return dl


def xoarong(dl):
    if f"{dl}" in ['None', '', '{}', '[]', '()']:
        return None
    if isinstance(dl, str):
        while True:
            if '{}' in dl:
                dl = ' '.join(dl.split('{}'))
            elif '[]' in dl:
                dl = ' '.join(dl.split('[]'))
            elif '()' in dl:
                dl = ' '.join(dl.split('()'))
            else:
                break
    elif isinstance(dl, dict):
        for k in dl.copy():
            if f"{dl[k]}" in ['None', '', '{}', '[]', '()']:
                del dl[k]
            elif isinstance(dl[k], (dict, list, set)):
                dl[k] = xoarong(dl[k])
            else:
                pass
    elif isinstance(dl, (list, set)):
        for v in dl.copy():
            if f"{v}" in ['None', '', '{}', '[]', "()"]:
                dl.remove(v)
            elif isinstance(v, (dict, list, set)):
                v = xoarong(v)
            else:
                pass
    else:
        pass
    return dl


def svals(dl):
    if f"{dl}" in ['None', '', '{}', '[]', '()']:
        return None
    stim = set()
    dsbo = ['lastupdate', 'inok', 'scan', 'url', 'idutc']
    if isinstance(dl, (str, int, float)):
        stim.add(f"{dl}".lower())
    elif isinstance(dl, dict):
        for k in dl:
            if (k not in dsbo) and isinstance(dl[k], (str, int, float)) and (f"{dl[k]}" not in ['None', '', '{}', '[]', '()']):
                stim.add(f"{dl[k]}".lower())
            elif isinstance(dl[k], (dict, list, set, tuple)):
                s = svals(dl[k])
                if s is not None:
                    stim = stim | s
            else:
                pass
    elif isinstance(dl, (list, set, tuple)):
        for v in dl:
            if isinstance(v, (str, int, float)) and (f"{v}" not in ['None', '', '{}', '[]', '()']):
                stim.add(f"{v}".lower())
            elif isinstance(v, (dict, list, set, tuple)):
                s = svals(v)
                if s is not None:
                    stim = stim | s
            else:
                pass
    else:
        pass
    # remove includes
    for v in stim.copy():
        for v1 in stim.copy():
            if (v1 in v) and (v1 != v) and (v1 in stim):
                stim.remove(v1)
    return stim


def tim1(dl, stim=None):
    if f"{dl}" in ['None', '', '{}', '[]', '()']:
        return False
    if isinstance(stim, (str, int, float)):
        stim = f"{stim}".lower()
        if stim in ['None', '', '{}', '[]', '()']:
            return True
    else:
        return False
    if isinstance(dl, (str, int, float)):
        if stim in f"{dl}".lower():
            return True
    elif isinstance(dl, dict):
        for k in dl:
            if isinstance(dl[k], (str, int, float)):
                if stim in f"{dl[k]}".lower():
                    return True
            elif isinstance(dl[k], (dict, list, set, tuple)):
                if tim1(dl[k], stim) == True:
                    return True
            else:
                pass
    elif isinstance(dl, (list, set, tuple)):
        for v in dl:
            if isinstance(v, (str, int, float)):
                if stim in f"{v}".lower():
                    return True
            elif isinstance(v, (dict, list, set, tuple)):
                if tim1(v, stim) == True:
                    return True
            else:
                pass
    else:
        pass
    return False


class Mau(object):
    __table_args__ = {"schema": "web"}

    idutc = Column(BigInteger, primary_key=True, autoincrement=False)
    tttt = Column(Unicode())
    ttdl = Column(Unicode())
    status = Column(Unicode(50))
    inok = Column(Boolean, default=False)
    lastupdate = Column(BigInteger,
                        default=int(arrow.utcnow().float_timestamp * 1000),
                        onupdate=int(arrow.utcnow().float_timestamp * 1000))

    @hybrid_property
    def refs(self):
        try:
            dl = json.loads(self.tttt)
        except:
            dl = {}
        return dl

    @refs.setter
    def refs(self, new):
        try:
            if 'fin' in self.status.lower():
                return None
        except:
            pass
        dl = {}
        try:
            dl = json.loads(self.tttt)
        except:
            pass
        for k in new:
            if f'new[k]' not in ['None', '', '{}', '[]', '()']:
                if k in ['del', 'xoa', 'delkeys', 'xoakeys']:
                    dl = xoakeys(dl, new[k])
                else:
                    dl[k] = new[k]
            elif k in ['ghichu', 'notes']:
                del dl[k]
            else:
                pass
        dl = xoarong(dl)
        if len(dl) > 0:
            self.tttt = json.dumps(dl, ensure_ascii=False)
            # add stim
            new = svals(dl)
            data = {}
            try:
                data = json.loads(self.ttdl)
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
                data = xoarong(data)
                self.ttdl = json.dumps(data, ensure_ascii=False)

    @hybrid_property
    def data(self):
        try:
            dl = json.loads(self.ttdl)
        except:
            dl = {}
        return dl

    @data.setter
    def data(self, new):
        try:
            if 'fin' in self.status.lower():
                return None
        except:
            pass
        dl = {}
        try:
            dl = json.loads(self.ttdl)
        except:
            pass
        for k in new:
            if f'new[k]' not in ['None', '', '{}', '[]', '()']:
                if k in ['del', 'xoa', 'delkeys', 'xoakeys']:
                    dl = xoakeys(dl, new[k])
                else:
                    dl[k] = new[k]
            elif k in ['ghichu', 'notes']:
                del dl[k]
            else:
                pass
        if len(dl) > 0:
            # add stim
            refs = {}
            try:
                refs = json.loads(self.tttt)
            except:
                pass
            new = svals(refs)
            old = svals(dl)
            new = new | old
            for v in new.copy():
                for v1 in new.copy():
                    if (v1 in v) and (v1 != v) and (v1 in new):
                        new.remove(v1)
            dl['timkiem'] = ' '.join(new)
            dl = xoarong(dl)
            self.ttdl = json.dumps(dl, ensure_ascii=False)

    @hybrid_method
    def timkiem(self, ltim=None):
        if isinstance(ltim, (str, int, float)):
            _tim = f"{ltim}"
            if tim1(self.idutc, _tim):
                return True
            if tim1(self.refs, _tim):
                return True
            if tim1(self.data, _tim):
                return True
        elif isinstance(ltim, (list, set, tuple)):
            for _tim in ltim:
                if tim1(self.idutc, _tim):
                    return True
                if tim1(self.refs, _tim):
                    return True
                if tim1(self.data, _tim):
                    return True
        elif isinstance(ltim, dict):
            for k in ltim:
                _tim = {k: ltim[k]}
                _tim = json.dumps(_tim, ensure_ascii=False)
                if tim1(self.idutc, _tim):
                    return True
                if tim1(self.refs, _tim):
                    return True
                if tim1(self.data, _tim):
                    return True
        else:
            pass
        return False


class Hoso(Mau, Base):
    __tablename__ = 'hoso'


class Khachhang(Mau, Base):
    __tablename__ = 'khachhang'


class Khuvuc(Mau, Base):
    __tablename__ = 'khuvuc'


class Donvithicong(Mau, Base):
    __tablename__ = 'donvithicong'


class Dot(Mau, Base):
    __tablename__ = 'dot'
    # madot = Column(Unicode(50))  # yyyy.gmmp.xxx xxx:stt
    # refs:= dvtc.idutc, madvtc, qtvt.idutc, maqtvt
    # data:= qtgt:tonghoso:, tongqt, tongtrongai,...,nguoilap, ngaylap,ghichu; qtvt:sophieunhap,


class Chiphi(Mau, Base):
    __tablename__ = 'chiphi'


class ChiphiQuanly(Mau, Base):
    __tablename__ = 'chiphiquanly'


class Qtvt(Mau, Base):
    __tablename__ = 'qtvt'


class Qtvt_cpvt(Mau, Base):
    __tablename__ = 'qtvt_cpvt'


class Qtgt(Mau, Base):
    __tablename__ = 'qtgt'


class Qtgt_cpxd(Mau, Base):
    __tablename__ = 'qtgt_cpxd'


class Qtgt_cpvl(Mau, Base):
    __tablename__ = 'qtgt_cpvl'


class Qtgt_cpvt(Mau, Base):
    __tablename__ = 'qtgt_cpvt'


class Qtgt_cptl(Mau, Base):
    __tablename__ = 'qtgt_cptl'


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
            if bang in ['hoso', 'hosokhachhang']:
                self.bdl = Hoso
            elif bang in ['khachhang']:
                self.bdl = Khachhang
            elif bang in ['khuvuc']:
                self.bdl = Khuvuc
            elif bang in ['donvithicong', 'dvtc', 'nhathau']:
                self.bdl = Donvithicong
            elif bang in ['dot']:
                self.bdl = Dot
            elif bang in ['chiphi']:
                self.bdl = Chiphi
            elif bang in ['chiphiquanly', 'cpql']:
                self.bdl = ChiphiQuanly
            elif bang in ['quyettoanvattu', 'qtvt']:
                self.bdl = Qtvt
            elif bang in ['qtvt_cpvt']:
                self.bdl = Qtvt_cpvt
            elif bang in ['quyettoangiatri', 'qtgt']:
                self.bdl = Qtgt
            elif bang in ['qtgt_cpxd']:
                self.bdl = Qtgt_cpxd
            elif bang in ['qtgt_cpvl']:
                self.bdl = Qtgt_cpvl
            elif bang in ['qtgt_cpvt']:
                self.bdl = Qtgt_cpvt
            elif bang in ['qtgt_cptl']:
                self.bdl = Qtgt_cptl
            elif bang in ['baogiavatlieu', 'bgvl']:
                self.bdl = Bgvl
            elif bang in ['baogianhancong', 'bgnc']:
                self.bdl = Bgnc
            elif bang in ['baogiamaythicong', 'bgmtc']:
                self.bdl = Bgmtc
            elif bang in ['baogiatailap', 'bgtl']:
                self.bdl = Bgtl
            else:
                self.bdl = None
        except:
            pass

    def gom(self, bang, stim):
        self.thongtin(bang)
        if self.bdl == None:
            return None
        if isinstance(stim, (str, int, float)):
            stim = f"%{stim}%".lower()
            if stim in ['%None%', '%%']:
                try:
                    r = self.orm.query(self.bdl).order_by(self.bdl.idutc).all()
                except:
                    return None
            else:
                try:
                    r = self.orm.query(self.bdl).filter(
                        self.bdl.ttdl.like(stim) | self.bdl.tttt.like(stim) | self.bdl.idutc.like(stim)).order_by(
                            self.bdl.idutc).all()
                except:
                    return None
        elif isinstance(stim, (list, set, tuple)):
            ds = stim.copy()
            stim = []
            istext = False
            for v in ds:
                if isinstance(v, int):
                    stim.append(v)
                else:
                    istext = True
                    v = f"{v}".lower()
                    if v not in ['None', '', '{}', '[]', '()']:
                        stim.append(v)
            if istext:
                try:
                    r = self.orm.query(self.bdl).filter(
                        self.bdl.ttdl.in_(stim) | self.bdl.tttt.in_(stim)).order_by(self.bdl.idutc).all()
                except:
                    return None
            else:
                try:
                    r = self.orm.query(self.bdl).filter(
                        self.bdl.idutc.in_(stim)).order_by(self.bdl.idutc).all()
                except:
                    return None
        else:
            try:
                r = self.orm.query(self.bdl).order_by(self.bdl.idutc).all()
            except:
                return None
        return r

    def nap(self, bang, idutc=None):
        self.thongtin(bang)
        if self.bdl == None:
            return None
        try:
            idutc = int(idutc)
            r = self.orm.query(self.bdl).get(idutc)
            return r
        except:
            return None

    def nap_get(self, bang, idutc=0):
        self.thongtin(bang)
        # try:
        # idutc = int(idutc)
        r = self.orm.query(self.bdl).get(idutc)
        print(f"orm nap_get r = {vars(r)}")
        print(f"orm nap_get type r = {type(r)}")
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
                print(f'orm moi refs={s.refs} tttt={s.tttt}')
                print(f'orm moi data={s.data} ttdl={s.ttdl}')
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
        if ("idutc" not in dl) or ('lastupdate' not in dl):
            dl['idutc'] = int(arrow.utcnow().float_timestamp * 1000)
            self.moi(bang, dl)
            return None
        s = self.nap(bang, dl['idutc'])
        if s == None:
            self.moi(bang, dl)
            return None
        elif 'fin' in s.status.lower():
            return None
        elif s.lastupdate > dl['lastupdate']:
            return None
        else:
            if "refs" in dl:
                s.refs = dl['refs']
            if "data" in dl:
                s.data = dl['data']
            if 'status' in dl:
                s.status = dl['status']
            if 'inok' in dl:
                s.inok = dl['inok']
            s.lastupdate = int(arrow.utcnow().float_timestamp * 1000)
        try:
            self.orm.commit()
        except IntegrityError as err:
            try:
                self.orm.rollback()
                print(f"save1 err={err.orig.args[1]}")
            except:
                return None
