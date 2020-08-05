import urllib
import json
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from bangbieu import Base, DinhmucChiPhi as Dmcp


def tao_maychu_api(db_user=None, db_pwd=None, db_host=None, db_name=None):
    # try:
    cnnstr = r"mssql+pyodbc://{}:{}@{}/{}?driver=ODBC+Driver+17+for+SQL+Server".format(
        db_user, db_pwd, db_host, db_name)
    engine = create_engine(cnnstr)
    # params = urllib.parse.quote_plus(
    #    "DRIVER={FreeTDS};SERVER=mssql;Port:1433;DATABASE=master;UID=sa;PWD=w3b@pkh2019")
    #params = urllib.parse.quote_plus('DRIVER={ODBC Driver 17 for SQL Server};SERVER=test;DATABASE=test;UID=user;PWD=password')
    #engine = create_engine("mssql+pyodbc:///?odbc_connect=%s" % params)
    # engine = create_engine('sqlite:///:memory:', echo=True)
    Base.metadata.create_all(engine)
    Session = scoped_session(sessionmaker(bind=engine, autoflush=True))
    db = Session()
    # except:
    #    return None
    return db


def add_dmcp(db, id=None, mota=None):
    try:
        bdl = Dmcp(madmcp=id, mota=json.dumps(mota))
        db.add(bdl)
        db.commit()
        db.close()
    except:
        pass


data = [
    {"madmcp": "1", "mota": {"vl": 1, "nc": 2.289, "mtc": 1.26,
                             "tructiepkhac": 0.015, "chung": 0.045, "thunhaptinhtruoc": 0.055, "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}},
    {"madmcp": "2", "mota": {"vl": 1, "nc": 2.8, "mtc": 1.34,
                             "tructiepkhac": 0.02, "chung": 0.05, "thunhaptinhtruoc": 0.055, "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}},
    {"madmcp": "3", "mota": {"vl": 1, "nc": 2.289, "mtc": 1.26,
                             "tructiepkhac": 0.02, "chung": 0.05, "thunhaptinhtruoc": 0.055, "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}},
    {"madmcp": "4", "mota": {"vl": 1, "nc": 3.857, "mtc": 1.504,
                             "tructiepkhac": 0.02, "chung": 0.05, "thunhaptinhtruoc": 0.055, "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}},
    {"madmcp": "5", "mota": {"vl": 1, "nc": 5.714, "mtc": 1.82,
                             "tructiepkhac": 0.02, "chung": 0.05, "thunhaptinhtruoc": 0.055, "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}},
    {"madmcp": "6", "mota": {"vl": 1, "nc": 1, "mtc": 1,
                             "chung": 0.05, "thunhaptinhtruoc": 0.055, "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}},
    {"madmcp": "7", "mota": {"vl": 1, "nc": 1, "mtc": 1,
                             "chung": 0.05, "thunhaptinhtruoc": 0.055, "khaosat": 0.0236, "thietke": 1.2, "giamsat": 0.02566}},
    {"madmcp": "20190725", "mota": {"vl": 1, "nc": 1, "mtc": 1,
                                    "chung": 0.05, "thunhaptinhtruoc": 0.055, "khaosat": 0.0236, "thietke": 1.2, "giamsat": 0.02566}},
    {"madmcp": "20200721", "mota": {"vl": 1, "nc": 1, "mtc": 1,
                                    "chung": 0.055, "khongxacdinh": 0.02, "thunhaptinhtruoc": 0.055, "khaosat": 0.0207, "thietke": 1.2, "giamsat": 0.02566}}
]

db = tao_maychu_api(db_user=None, db_pwd=None, db_host=None, db_name=None)
for dm in data:
    add_dmcp(db, dm["madmcp"], dm["mota"])
