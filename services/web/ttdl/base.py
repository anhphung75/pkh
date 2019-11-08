import os
import sys
import sqlite3
import datetime

from utils.thoigian import stodate, datetos

from sqlalchemy import create_engine, Column, Sequence, func, desc
from sqlalchemy import Boolean, Integer, DECIMAL, Unicode, Date, DateTime, VARBINARY
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class Hoso(Base):
    __tablename__ = 'hoso'
    __table_args__ = {"schema": "web"}
    hosoid = Column(Integer, primary_key=True)
    sohoso = Column(Unicode(50))
    #barcode = Column(Unicode(50))
    #qrcode = Column(VARBINARY)
    khachhang = Column(Unicode(255))
    diachikhachhang = Column(Unicode(255))
    lienhe = Column(Unicode(50))
    dc1 = Column(Unicode(50))
    dc2 = Column(Unicode(50))
    maq = Column(Unicode(2), default='--')
    maqp = Column(Unicode(4), default='----')
    ghichu = Column(Unicode(255))
    lastupdate = Column(DateTime(timezone=True), default=func.now(),
                        onupdate=func.now())
    mahoso = Column(Unicode(50))  # yyyymmdd-xxxx
    # ref old data
    id_new = Column(Integer)
    id_old = Column(Integer)





#engine = create_engine('sqlite:///ttlt/quyettoan.db', echo=True)
#Base.metadata.create_all(engine)
#Session = scoped_session(sessionmaker(bind=engine, autoflush=True))


#engine = create_engine('sqlite:///quyettoan/quyettoan.db', echo=True)
#engine = create_engine('sqlite:///:memory:', echo=True)
cnnstr = "mssql+pyodbc://{}:{}@{}/{}?driver=ODBC+Driver+17+for+SQL+Server".format(
    'pkh.web', 'w3b@pkh2019', '192.168.24.4:1433', 'PKHData')
#cnnstr = "mssql+pyodbc://{}:{}@{}/{}?driver=ODBC+Driver+17+for+SQL+Server".format(
#    'pkh', 'Ph0ngK3H0@ch', '192.168.24.4:1433', 'PKHData')
engine = create_engine(cnnstr)

Base.metadata.create_all(engine)
Session = scoped_session(sessionmaker(bind=engine, autoflush=True))

db =Session()