import os
import sys
import datetime
import decimal
import arrow
#from utils.thoigian import stodate, datetos
from sqlalchemy import create_engine, ForeignKey, inspect
from sqlalchemy import Column, Sequence, func, desc
from sqlalchemy import Integer, Unicode, JSON, Boolean,  DECIMAL,  VARBINARY,  Date, DateTime
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import scoped_session, sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.mutable import MutableDict


Base = declarative_base()


class Mau(object):
    idutc = Column(Integer, primary_key=True)
    refs = Column(MutableDict.as_mutable(JSON))
    data = Column(MutableDict.as_mutable(JSON))
    status = Column(Unicode(50))
    lastupdate = Column(Integer,
                        default=int(arrow.utcnow().float_timestamp * 1000),
                        onupdate=int(arrow.utcnow().float_timestamp * 1000))


class Tttt(Mau, Base):
    __tablename__ = 'tttt'
    __table_args__ = {"schema": "web"}
    tttt = Column(Integer, primary_key=True)


class Hoso(Mau, Base):
    __tablename__ = 'hoso'
    __table_args__ = {"schema": "web"}
    idhoso = Column(Integer, primary_key=True)
    mahoso = Column(Unicode(50))  # yyyy.hs.xxxxxx


class Khachhang(Mau, Base):
    __tablename__ = 'khachhang'
    __table_args__ = {"schema": "web"}
    idkhachhang = Column(Integer, primary_key=True)
    makhachhang = Column(Unicode(50))  # yyyy.hs.xxxxxx


class Donvithicong(Mau, Base):
    __tablename__ = 'donvithicong'
    __table_args__ = {"schema": "web"}
    iddvtc = Column(Integer, primary_key=True)
    madvtc = Column(Unicode(50))


class Khuvuc(Mau, Base):
    __tablename__ = 'khuvuc'
    __table_args__ = {"schema": "web"}
    idkhuvuc = Column(Integer, primary_key=True)
    makhuvuc = Column(Unicode(50))


class Dot(Mau, Base):
    __tablename__ = 'dot'
    __table_args__ = {"schema": "web"}
    iddot = Column(Integer, primary_key=True)
    madot = Column(Unicode(50))


class Hoancong(Mau, Base):
    __tablename__ = 'hoancong'
    __table_args__ = {"schema": "web"}
    iddshc = Column(Integer, primary_key=True)
    madshc = Column(Unicode(50))


class Qtgt(Mau, Base):
    __tablename__ = 'qtgt'
    __table_args__ = {"schema": "web"}
    idqtgt = Column(Integer, primary_key=True)
    maqtgt = Column(Unicode(50))
    #plgia = Column(Unicode(50))
    #mabaogia = Column(Unicode(50))


class Qtvt(Mau, Base):
    __tablename__ = 'qtvt'
    __table_args__ = {"schema": "web"}
    idqtvt = Column(Integer, primary_key=True)
    maqtvt = Column(Unicode(50))


class Qtcpxd(Mau, Base):
    __tablename__ = 'qtcpxd'
    __table_args__ = {"schema": "web"}
    idqtcpxd = Column(Integer, primary_key=True)
    maqtcpxd = Column(Unicode(50))


class Qtcpvt(Mau, Base):
    __tablename__ = 'qtcpvt'
    __table_args__ = {"schema": "web"}
    idqtcpvt = Column(Integer, primary_key=True)
    maqtcpvt = Column(Unicode(50))


class Qtcpvl(Mau, Base):
    __tablename__ = 'qtcpvl'
    __table_args__ = {"schema": "web"}
    idqtcpvl = Column(Integer, primary_key=True)
    maqtcpvl = Column(Unicode(50))


class Qttlmd(Mau, Base):
    __tablename__ = 'qttlmd'
    __table_args__ = {"schema": "web"}
    idqttlmd = Column(Integer, primary_key=True)
    maqttlmd = Column(Unicode(50))


class ChiphiQuanly(Mau, Base):
    __tablename__ = 'chiphiquanly'
    __table_args__ = {"schema": "web"}
    idcpql = Column(Integer, primary_key=True)
    macpql = Column(Unicode(50))  # yyyy.hs.xxxxxx


class Chiphi(Mau, Base):
    __tablename__ = 'chiphi'
    __table_args__ = {"schema": "web"}
    idchiphi = Column(Integer, primary_key=True)
    machiphi = Column(Unicode(50))


class Chiphi_Khuvuc(Mau, Base):
    __tablename__ = 'chiphi_khuvuc'
    __table_args__ = {"schema": "web"}
    idutc = Column(Integer, primary_key=True)
    machiphi = Column(Unicode(50))
    makhuvuc = Column(Unicode(50))


class Bgvl(Mau, Base):
    __tablename__ = 'bgvl'
    __table_args__ = {"schema": "web"}
    idutc = Column(Integer, primary_key=True)
    plgia = Column(Unicode(50))
    mabaogia = Column(Unicode(50))
    machiphi = Column(Unicode(50))


class Bgnc(Mau, Base):
    __tablename__ = 'bgnc'
    __table_args__ = {"schema": "web"}
    idutc = Column(Integer, primary_key=True)
    plgia = Column(Unicode(50))
    mabaogia = Column(Unicode(50))
    machiphi = Column(Unicode(50))


class Bgmtc(Mau, Base):
    __tablename__ = 'bgmtc'
    __table_args__ = {"schema": "web"}
    idutc = Column(Integer, primary_key=True)
    plgia = Column(Unicode(50))
    mabaogia = Column(Unicode(50))
    machiphi = Column(Unicode(50))

class Scan(Mau, Base):
    __tablename__ = 'scan'
    __table_args__ = {"schema": "web"}
    idscan = Column(Integer, primary_key=True)
    mascan = Column(Unicode(50))


class Server():
    def __init__(self, user=None, pwd=None, host=None, dbname=None):
        self.user = user
        self.pwd = pwd
        self.host = host
        self.dbname = dbname
        self.cnnstr = (
            f"postgresql+psycopg2://{self.user}:{self.pwd}@{self.host}/{self.dbname}")

    def core(self):
        try:
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
    engine = Server("PKH.TCTB", "123456789",
                    "192.168.24.4:1433", "PKHData")
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
