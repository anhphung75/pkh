import os
import sys
import datetime
import decimal
import arrow
import json
# from utils.thoigian import stodate, datetos
from sqlalchemy import create_engine, ForeignKey, inspect
from sqlalchemy import Column, Sequence, func, desc
from sqlalchemy import BigInteger, Unicode, JSON, Boolean,  DECIMAL,  VARBINARY,  Date, DateTime
from sqlalchemy import insert
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.mutable import MutableDict
from sqlalchemy.orm import scoped_session, sessionmaker, relationship

from sqlalchemy_json import mutable_json_type


Base = declarative_base()


class Mau(object):
    __table_args__ = {"schema": "web"}
    idutc = Column(BigInteger, primary_key=True, autoincrement=False)
    _refs = Column(Unicode())
    _data = Column(Unicode())
    #refs = Column(MutableDict.as_mutable(Unicode()))
    #data = Column(MutableDict.as_mutable(Unicode()))
    # refs = Column(mutable_json_type(dbtype=JSON, nested=True))
    # data = Column(mutable_json_type(dbtype=JSON, nested=True))
    status = Column(Unicode(50))
    inok = Column(Boolean, default=False)
    lastupdate = Column(BigInteger,
                        default=int(arrow.utcnow().float_timestamp * 1000),
                        onupdate=int(arrow.utcnow().float_timestamp * 1000))

    @hybrid_property
    def refs(self):
        try:
            dl = json.loads(self._refs)
        except:
            dl = {}
        return dl

    @refs.setter
    def refs(self, new):
        dl = self.refs()
        for k in new:
            if len(new[k]) > 0:
                dl[k] = new[k]
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
        dl = self.data()
        for k in new:
            if (len(new[k]) > 0) or (k in ['ghichu', 'notes']):
                dl[k] = new[k]
        self._data = json.dumps(dl, ensure_ascii=False)


class Khachhang(Mau, Base):
    __tablename__ = 'khachhang'
    makhachhang = Column(Unicode(50))  # yyyy.kh.xxxxxx xx:stt
    # lkn1_hoso_khachhang = relationship(
    #    "Hoso", back_populates="lk1n_khachhang_hoso")


class Hoso(Mau, Base):
    __tablename__ = 'hoso'
    mahoso = Column(Unicode(50))  # yyyy.hs.xxxxxx
    # lk1n_khachhang_hoso = relationship(
    #    "Khachhang", back_populates="lkn1_hoso_khachhang")


class Khuvuc(Mau, Base):
    __tablename__ = 'khuvuc'
    makhuvuc = Column(Unicode(50))  # yyyy.hs.xxxxxx


class Dot(Mau, Base):
    __tablename__ = 'dot'
    madot = Column(Unicode(50))  # yyyy.gmmp.xxx xxx:stt
    # refs:= dvtc.idutc, madvtc, qtvt.idutc, maqtvt
    # data:= qtgt:tonghoso:, tongqt, tongtrongai,...,nguoilap, ngaylap,ghichu; qtvt:sophieunhap,


class Donvithicong(Mau, Base):
    __tablename__ = 'donvithicong'
    madvtc = Column(Unicode(50))
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
