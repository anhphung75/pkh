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


class DinhmucChiPhi(Base):
    __tablename__ = 'dinhmucchiphi'
    __table_args__ = {"schema": "dbo"}
    madmcp = Column(Unicode(10), primary_key=True)  # yyyy.hs.xxxxxx
    mota = Column(Unicode(None))
    lastupdate = Column(DateTime(timezone=True), default=func.now(),
                        onupdate=datetime.datetime.now)
