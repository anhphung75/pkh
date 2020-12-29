import os
import sys
import datetime
import decimal
import arrow
#from utils.thoigian import stodate, datetos
from sqlalchemy import create_engine, ForeignKey, inspect
from sqlalchemy import Column, Sequence, func, desc
from sqlalchemy import Boolean, Integer, DECIMAL, Unicode, VARBINARY, JSON, Date, DateTime
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import scoped_session, sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.mutable import MutableDict


Base = declarative_base()


class Mau(object):
    __table_args__ = {"schema": "web"}
    idutc = Column(Integer, primary_key=True)
    refs = Column(MutableDict.as_mutable(JSON))
    data = Column(MutableDict.as_mutable(JSON))
    #refs = Column(mutable_json_type(dbtype=JSON, nested=True))
    #data = Column(mutable_json_type(dbtype=JSON, nested=True))
    slang = Column(Unicode(255))
    status = Column(Unicode(50))
    inok = Column(Boolean, default=False)
    lastupdate = Column(Integer,
                        default=int(arrow.utcnow().float_timestamp * 1000),
                        onupdate=int(arrow.utcnow().float_timestamp * 1000))


class Test_table_arg(Mau, Base):
    __tablename__ = 'test_table_arg'


class Khachhang(Mau, Base):
    __tablename__ = 'khachhang'
    __table_args__ = {"schema": "web"}
    makhachhang = Column(Unicode(50))  # yyyy.kh.xxxxxx xx:stt
    # lkn1_hoso_khachhang = relationship(
    #    "Hoso", back_populates="lk1n_khachhang_hoso")


class Hoso(Mau, Base):
    __tablename__ = 'hoso'
    __table_args__ = {"schema": "web"}
    mahoso = Column(Unicode(50))  # yyyy.hs.xxxxxx
    # lk1n_khachhang_hoso = relationship(
    #    "Khachhang", back_populates="lkn1_hoso_khachhang")


class Khuvuc(Mau, Base):
    __tablename__ = 'khuvuc'
    __table_args__ = {"schema": "web"}
    makhuvuc = Column(Unicode(50))  # yyyy.hs.xxxxxx


class Dot(Mau, Base):
    __tablename__ = 'dot'
    __table_args__ = {"schema": "web"}
    madot = Column(Unicode(50))  # yyyy.gmmp.xxx xxx:stt
    # refs:= dvtc.idutc, madvtc, qtvt.idutc, maqtvt
    # data:= qtgt:tonghoso:, tongqt, tongtrongai,...,nguoilap, ngaylap,ghichu; qtvt:sophieunhap,


class Donvithicong(Mau, Base):
    __tablename__ = 'donvithicong'
    __table_args__ = {"schema": "web"}
    madvtc = Column(Unicode(50))
    # data:= lienhe, masothue, ....


class ChiphiQuanly(Mau, Base):
    __tablename__ = 'chiphiquanly'
    __table_args__ = {"schema": "web"}
    macpql = Column(Unicode(50))  # yyyy.hs.xxxxxx


class Bgvl(Mau, Base):
    __tablename__ = 'bgvl'
    __table_args__ = {"schema": "web"}


class Bgnc(Mau, Base):
    __tablename__ = 'bgnc'
    __table_args__ = {"schema": "web"}


class Bgmtc(Mau, Base):
    __tablename__ = 'bgmtc'
    __table_args__ = {"schema": "web"}


class Bgtl(Mau, Base):
    __tablename__ = 'bgtl'
    __table_args__ = {"schema": "web"}


class Server():
    def __init__(self, user=None, pwd=None, host=None, dbname="draft.db"):
        self.user = user
        self.pwd = pwd
        self.host = host
        self.dbname = dbname
        self.cnnstr = f"sqlite:///{self.dbname}"

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
            engine = create_engine(self.cnnstr, echo=True)
            Base.metadata.create_all(engine)
            Session = scoped_session(sessionmaker(bind=engine, autoflush=True))
        except:
            return None
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


def runsql(sql=''):
    engine = Server()
    try:
        kq = engine.core().execute(sql)
        data = []
        for row in kq:
            dl = dict(row)
            for k in dl.copy():
                if type(dl[k]) in [datetime, datetime.date, datetime.datetime, datetime.time]:
                    if k == 'lastupdate':
                        dl[k] = int(arrow.get(dl[k]).float_timestamp * 1000)
                    else:
                        dl[k] = int(arrow.get(dl[k]).format("YYYYMMDD"))
                if isinstance(dl[k], decimal.Decimal):
                    dl[k] = float(dl[k])
            data.append(dl)
        kq.close()
        for cp in data:
            print(f"runsql cp={cp}")
        return data
    except:
        return None


engine = Server("pkh", "Ph0ngK3H0@ch",
                "192.168.24.4:1433", "PKHData")
engine.orm()
engine.show_views('web')