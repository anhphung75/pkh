import os
import sys
import datetime
import decimal
import arrow
#from utils.thoigian import stodate, datetos
from sqlalchemy import create_engine, ForeignKey, inspect
from sqlalchemy import Column, Sequence, func, desc
from sqlalchemy import Boolean, Integer, DECIMAL, Unicode, Date, DateTime, VARBINARY
from sqlalchemy.orm import scoped_session, sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base

from utils import Api

Base = declarative_base()


class Hoso(Base):
    __tablename__ = 'hoso'
    __table_args__ = {"schema": "web"}
    uctid = Column(Integer, primary_key=True)
    mahoso = Column(Unicode(50))  # yyyy.hs.xxxxxx
    mota = Column(Unicode(None))
    ghichu = Column(Unicode(255))
    lastupdate = Column(DateTime(timezone=False), default=func.now(),
                        onupdate=datetime.datetime.now)


class ChiphiQuanly(Base):
    __tablename__ = 'chiphiquanly'
    __table_args__ = {"schema": "web"}
    uctid = Column(Integer, primary_key=True)
    cpqlid = Column(Integer)  # yyyy.hs.xxxxxx
    mota = Column(Unicode(None))
    ghichu = Column(Unicode(255))
    lastupdate = Column(DateTime(timezone=False), default=func.now(),
                        onupdate=datetime.datetime.now)


class Maychu():
    def __init__(self, server='postgresql', user=None, pwd=None, host=None, dbname=None):
        self.user = user
        self.pwd = pwd
        self.host = host
        self.dbname = dbname
        if server == 'mssql':
            self.server = server
            self.cnnstr = (
                f"{server}+pyodbc://{self.user}:{self.pwd}@{self.host}/{self.dbname}?"
                f"driver=ODBC+Driver+17+for+SQL+Server")
        elif server == 'postgresql':
            self.server = server
            self.cnnstr = (
                f"{server}+psycopg2://{self.user}:{self.pwd}@{self.host}/{self.dbname}")
        else:
            self.server = 'sqlite'
            self.cnnstr = f"{server}:///draft.db"

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


def run_mssql(sql=''):
    mssql = Maychu("mssql", "PKH.TCTB", "123456789",
                   "192.168.24.4:1433", "PKHData")
    try:
        kq = mssql.core().execute(sql)
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

