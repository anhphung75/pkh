import os
import sys
import decimal
import arrow
import json

from sqlalchemy import create_engine, ForeignKey, inspect
from sqlalchemy import Column, Sequence, func, desc
from sqlalchemy import Boolean, Integer, DECIMAL, Unicode, VARBINARY, JSON, Date, DateTime
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import scoped_session, sessionmaker, relationship


Base = declarative_base()


class Serializable(object):
    __public__ = []

    def to_dict(self):
        d = {}
        for field in self.__public__:
            value = getattr(self, field)
            if value:
                d[field] = value
        return d


class Example(Base):
    __tablename__ = 'example'
    __public__ = ['column1', 'refs']

    id = Column(Integer, primary_key=True)
    column1 = Column(Unicode(32))
    _refs = Column(Unicode())

    @hybrid_property
    def refs(self):
        try:
            value = json.loads(self._refs)
        except:
            value = {}
        return value

    @refs.setter
    def refs(self, new):
        dl = {}
        try:
            dl = json.loads(self._refs)
        except:
            pass
        print(f"refs setter new={new}")
        for k in new:
            if new[k]!=None or len(new[k]) > 0:
                dl[k] = new[k]
        
        if len(dl) > 0:
            self._refs = json.dumps(dl, ensure_ascii=False)
        


def create_db_session():
    connect_string = 'sqlite:///:memory:'
    engine = create_engine(connect_string)
    Base.metadata.create_all(bind=engine)
    return sessionmaker(bind=engine)()


def main():
    session = create_db_session()

    example = Example()
    example.status = "String content"
    example.refs = {'foo': 42}
    session.add(example)
    session.commit()

    obj = session.query(Example).first()
    print(f"kq={vars(obj)}")
    print(f"data={obj.refs}")


if __name__ == '__main__':
    main()
