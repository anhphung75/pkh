import os
import sys
import sqlite3
import datetime
import urllib
#from utils.thoigian import stodate, datetos
from sqlalchemy import Column, Sequence, func, desc
from sqlalchemy import Boolean, Integer, DECIMAL, Unicode, Date, DateTime, VARBINARY
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class Hoso(Base):
    pass


class HesoChiPhi(Base):
    __tablename__ = 'hesochiphi'
    __table_args__ = {"schema": "web"}
    hesoid = Column(Unicode(10), primary_key=True)  # yyyy.hs.xxxxxx
    mota = Column(Unicode(None))
    lastupdate = Column(DateTime(timezone=False), default=func.now(),
                        onupdate=datetime.datetime.now)
