import os
import sys
import sqlite3
import datetime
import urllib
from utils.thoigian import stodate, datetos
from sqlalchemy import Column, Sequence, func, desc
from sqlalchemy import Boolean, Integer, DECIMAL, Unicode, Date, DateTime, VARBINARY
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class Hoso(Base):
    __tablename__ = 'hoso'
#    __table_args__ = {"schema": "web"}
    autoid = Column(Integer, primary_key=True)
    mahoso = Column(Unicode(13), unique=True)  # yyyyhsxxxxxx
    qrcode = Column(VARBINARY)
    sodanhbo = Column(Unicode(50))  # barcode
    madot = Column(Unicode(50))
    sohoso = Column(Unicode(50))
    khachhang = Column(Unicode(255))
    diachi = Column(Unicode(255))
    ghitat = Column(Unicode(50))
    lienhe = Column(Unicode(50))
    dc1 = Column(Unicode(50))
    dc2 = Column(Unicode(50))
    maq = Column(Unicode(2), default='--')
    maqp = Column(Unicode(4), default='----')
    mota = Column(Unicode(255))
    # pkh
    trongai = Column(Unicode(50))
    tainhap = Column(Unicode(50))
    taithicong = Column(Unicode(50))
    hoantien = Column(Unicode(50))
    # hoan cong
    maqt = Column(Unicode(50))
    ngaylendot = Column(DateTime(timezone=True))
    ngaygan = Column(DateTime(timezone=True))
    sodhn = Column(Unicode(50))
    hieudhn = Column(Unicode(50))
    # tong cong 19 so, co 5 so thap phan
    chisodhn = Column(DECIMAL(19, 5), default=0)
    madma = Column(Unicode(50))
    malotrinh = Column(Unicode(50))
    # ref old data
    hosoid = Column(Integer)
    id_new = Column(Integer)
    id_old = Column(Integer)
    lastupdate = Column(DateTime(timezone=True), default=func.now(),
                        onupdate=datetime.datetime.now)
