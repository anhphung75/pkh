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
from sqlalchemy.ext.mutable import MutableDict
from sqlalchemy.orm import scoped_session, sessionmaker, relationship
from sqlalchemy_json import mutable_json_type


Base = declarative_base()


class Mau(object):
    __table_args__ = {"schema": "web"}
    idutc = Column(BigInteger, primary_key=True, autoincrement=False)
    refs = Column(Unicode())
    data = Column(Unicode())
    # refs = Column(MutableDict.as_mutable(JSON))
    # data = Column(MutableDict.as_mutable(JSON))
    # refs = Column(mutable_json_type(dbtype=JSON, nested=True))
    # data = Column(mutable_json_type(dbtype=JSON, nested=True))
    status = Column(Unicode(50))
    inok = Column(Boolean, default=False)
    lastupdate = Column(BigInteger,
                        default=int(arrow.utcnow().float_timestamp * 1000),
                        onupdate=int(arrow.utcnow().float_timestamp * 1000))


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
    macpql = Column(Unicode(50))  # yyyy.hs.xxxxxx


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
            engine = create_engine(self.cnnstr, echo=False)
            engine.execution_options(isolation_level="AUTOCOMMIT")
        except:
            return None
        return engine

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


class DoiJson():
    def __init__(self, schema='web'):
        self.schema = schema

    def runsql(self, sql=''):
        engine = Server("pkh", "Ph0ngK3H0@ch",
                        "192.168.24.4:1433", "PKHData")
        try:
            kq = engine.core().execute(sql)
            data = []
            for row in kq:
                dl = dict(row)
                for k in dl.copy():
                    if type(dl[k]) in [datetime, datetime.date, datetime.datetime, datetime.time]:
                        if k in ['lastupdate', 'ngaylendot']:
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

    def crud_moi(self, bang, dl, ma='mahoso', ismoi=True):
        # check dl
        for k in dl.copy():
            if k not in ['idutc', 'inok', 'lastupdate', 'status', 'refs', 'data', ma]:
                del dl[k]
        if not dl['idutc']:
            dl['idutc'] = int(arrow.utcnow().float_timestamp * 1000)
        dl['inok'] = 1
        if dl['status']:
            dl['status'] = f"N'{dl['status']}'"
        if dl[ma]:
            dl[ma] = f"N'{dl[ma]}'"
        if dl['refs']:
            try:
                dl["refs"] = json.dumps(dl["refs"], ensure_ascii=False)
            except:
                pass
            dl['refs'] = f"N'{dl['refs']}'"
        if dl['data']:
            try:
                dl['data'] = json.dumps(dl['data'], ensure_ascii=False)
            except:
                pass
            dl['data'] = f"N'{dl['data']}'"
        while True:
            dl['lastupdate'] = int(arrow.utcnow().float_timestamp * 1000)
            sql = (f"INSERT INTO {self.schema}.{bang} ({','.join(dl.keys())}) "
                   f"VALUES ({','.join(dl.values())});")
            try:
                kq = self.runsql(sql)
                if "err" in kq:
                    print(f"err={kq['err']}")
                    if ismoi and kq['err_code'] == 23000:
                        # duplicate Primary key
                        dl["idutc"] += 1
                    else:
                        break
                else:
                    print("created ok")
                    break
            except:
                break

    def nap_khachhang(self, uid):
        # load
        sql = (
            f"Select top 1 khachhang, diachikhachhang as diachi, lienhe, hoso.hosoid,"
            f" dot.ngaylendot, dot.madot, dot.dotid, qt.maqt, qt.qtid"
            f" From (dbo.hoso hoso RIGHT JOIN dbo.qt qt ON hoso.hosoid=qt.hosoid)"
            f" LEFT JOIN dbo.dot dot ON dot.madot=qt.madot"
            f" Where hoso.hosoid={uid} and datalength(dot.ngaylendot)>0"
            f" Order By hoso.hosoid,dot.ngaylendot"
        )
        r = self.runsql(sql)
        if ((r == None) or (len(r) < 1)):
            return None
        print(f"dulieu khachhang={r}")
        # chuyen dulieu
        dl = {}
        dl["idutc"] = r[0]["ngaylendot"]
        dl["makhachhang"] = f"{r[0]['madot']}.{r[0]['hosoid']}"

        dl["status"] = "chuyen json"
        dl["inok"] = 1
        dl["lastupdate"] = int(arrow.utcnow().float_timestamp * 1000)
        dl["refs"] = {
            "dot": {"id": r[0]['dotid'], "ma": r[0]['madot']},
            "qtgt": {"id": r[0]['qtid'], "ma": r[0]['maqt']},
            "hoso": {"id": r[0]['hosoid'], "ma": dl["makhachhang"]}, }
        dl["data"] = {}
        if r[0]["khachhang"]:
            dl["data"]["khachhang"] = (
                ' '.join(r[0]["khachhang"].split())).upper()
        if r[0]["diachi"]:
            dc = r[0]["diachi"].replace("- ", ", ")
            dc = ' '.join(dc.split())
            dl["data"]["diachi"] = dc
        if r[0]["lienhe"]:
            dl["data"]["lienhe"] = ' '.join(r[0]["lienhe"].split())
        print(f"dulieu sau chuyen doi khachhang={dl}")
        return dl

    def khachhang(self):
        uid = 124455
        maxloop = 124540
        try:
            while True and uid < maxloop:
                print(
                    f"Chuyen hoso id={uid:06d} *****")
                dulieu = self.nap_khachhang(uid)
                if dulieu:
                    self.crud_moi("khachhang", dulieu,
                                  ma='makhachhang', ismoi=True)
                uid += 1
        except:
            return None


class TaoDulieu():
    def __init__(self, schema='web'):
        self.schema = schema

    def Khuvuc(self):
        pass

    def Chiphiquanly(self):
        recs = [
            {"hesoid": "1",
             "mota": {"vl": 1, "nc": 2.289, "mtc": 1.26, "tructiepkhac": 0.015, "chung": 0.045, "giantiepkhac": 0, "thutinhtruoc": 0.055, "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}},
            {"hesoid": "2",
             "mota": {"vl": 1, "nc": 2.8, "mtc": 1.34, "tructiepkhac": 0.02, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055, "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}},
            {"hesoid": "3",
             "mota": {"vl": 1, "nc": 2.289, "mtc": 1.26, "tructiepkhac": 0.02, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055, "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}},
            {"hesoid": "4",
             "mota": {"vl": 1, "nc": 3.857, "mtc": 1.504, "tructiepkhac": 0.02, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055, "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}},
            {"hesoid": "5",
             "mota": {"vl": 1, "nc": 5.714, "mtc": 1.82, "tructiepkhac": 0.02, "chung": 0.05, "giantiepkhac": 0, "thutinhtruoc": 0.055, "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}},
            {"hesoid": "6",
             "mota": {"vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.05, "giantiepkhac": 0,
                      "thutinhtruoc": 0.055, "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}},
            {"hesoid": "7",
             "mota": {"vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.05, "giantiepkhac": 0,
                      "thutinhtruoc": 0.055, "khaosat": 0.0236, "thietke": 1.2, "giamsat": 0.02566}},
            {"hesoid": "20190725",
             "mota": {"vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.05, "giantiepkhac": 0,
                      "thutinhtruoc": 0.055, "khaosat": 0.0236, "thietke": 1.2, "giamsat": 0.02566}},
            {"hesoid": "20200721",
             "mota": {"vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.055, "giantiepkhac": 0.02,
                      "thutinhtruoc": 0.055, "khaosat": 0.0207, "thietke": 1.2, "giamsat": 0.02566}}
        ]


# test
DoiJson("web").khachhang()
