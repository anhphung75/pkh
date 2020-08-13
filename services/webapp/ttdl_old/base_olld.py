import os
import sys
import sqlite3
import datetime

from utils import stodate, datetos

from sqlalchemy import create_engine, Column, Sequence, func, desc
from sqlalchemy import Boolean, Integer, DECIMAL, Unicode, Date, DateTime
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# lấy ra đường dẫn đến thư mục modules ở trong projetc hiện hành
lib_path = os.path.abspath(os.path.join(
    os.path.dirname(__file__), "quyettoan"))
# thêm thư mục cần load vào trong hệ thống
if lib_path not in sys.path:
    sys.path.append(lib_path)


Base = declarative_base()


class RolesUsers(Base):
    __tablename__ = 'roles_users'
    id = Column(Integer(), primary_key=True)
    user_id = Column('user_id', Integer(), ForeignKey('user.id'))
    role_id = Column('role_id', Integer(), ForeignKey('role.id'))


class Role(Base):
    __tablename__ = 'role'
    id = Column(Integer(), primary_key=True)
    name = Column(Unicode(80), unique=True)
    description = Column(Unicode(255))


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    email = Column(Unicode(255), unique=True)
    username = Column(Unicode(255))
    password = Column(Unicode(255))
    last_login_at = Column(DateTime())
    current_login_at = Column(DateTime())
    last_login_ip = Column(Unicode(100))
    current_login_ip = Column(Unicode(100))
    login_count = Column(Integer)
    active = Column(Boolean())
    confirmed_at = Column(DateTime())
    roles = relationship('Role', secondary='roles_users',
                         backref=backref('users', lazy='dynamic'))


class Baogiachiphi(Base):
    __tablename__ = 'baogiachiphi'

    id = Column(Integer, primary_key=True)
    baogiaid = Column(Integer, default=0)
    chiphiid = Column(Integer, default=0)
    gia = Column(DECIMAL(19, 5), default=0)
    giavl = Column(DECIMAL(19, 5), default=0)
    gianc = Column(DECIMAL(19, 5), default=0)
    giamtc = Column(DECIMAL(19, 5), default=0)
    ghichu = Column(Unicode(255), nullable=True)
    giavl1 = Column(DECIMAL(19, 5), default=0)
    gianc1 = Column(DECIMAL(19, 5), default=0)
    giamtc1 = Column(DECIMAL(19, 5), default=0)
    tinhtrang = Column(Unicode(50), nullable=True)
    lastupdate = Column(DateTime(timezone=True),
                        default=func.now(), onupdate=func.now())


class Chiphi(Base):
    __tablename__ = 'chiphi'

    chiphiid = Column(Integer, primary_key=True)
    maq = Column(Integer, nullable=True)
    mapl1 = Column(Unicode(10), nullable=True)
    mapl2 = Column(Unicode(10), nullable=True)
    maso = Column(Unicode(50), nullable=True)
    diengiai = Column(Unicode(255), nullable=True)
    nhanhieu = Column(Unicode(50), nullable=True)
    dvt = Column(Unicode(10), nullable=True)
    tinhtrang = Column(Unicode(50), nullable=True)
    ghichu = Column(Unicode(255), nullable=True)
    koqtt = Column(Unicode(50), nullable=True)
    inqtt = Column(Boolean, nullable=False, default=False)
    slchuan = Column(Unicode(50), nullable=True)
    dmbetong = Column(DECIMAL(19, 5), default=0)
    dmvan = Column(DECIMAL(19, 5), default=0)
    dmcaton = Column(DECIMAL(19, 5), default=0)
    dmcatoc = Column(DECIMAL(19, 5), default=0)
    lastupdate = Column(DateTime(timezone=True), default=func.now(
    ),                         onupdate=func.now())


class Chiphikhuvuc(Base):
    __tablename__ = 'chiphikhuvuc'

    id = Column(Integer, primary_key=True)
    chiphiid = Column(Integer, nullable=False)
    q2 = Column(Integer, default=0)
    q9 = Column(Integer, default=0)
    td = Column(Integer, default=0)
    bd = Column(Integer, default=0)
    ghichu = Column(Unicode(255), nullable=True)
    lastupdate = Column(DateTime(timezone=True),
                        default=func.now(), onupdate=func.now())


class Congvan(Base):
    __tablename__ = 'congvan'

    hesoid = Column(Integer, primary_key=True)
    cvmp = Column(Unicode(255), nullable=True)
    cvdt = Column(Unicode(255), nullable=True)
    tlmd = Column(Unicode(255), nullable=True)
    lastupdate = Column(DateTime(timezone=True),
                        default=func.now(), onupdate=func.now())


class Dot(Base):
    __tablename__ = 'dot'

    madot = Column(Unicode(50), primary_key=True)
    dotid = Column(Integer)
    hop = Column(Unicode(50), nullable=True)
    nam = Column(Integer, default=0)
    quy = Column(Unicode(50), nullable=True)
    plqt = Column(Unicode(50), nullable=True)
    tt = Column(Integer)
    sodot = Column(Unicode(50), nullable=True)
    ngaylendot = Column(DateTime, nullable=True)
    khuvuc = Column(Unicode(255), nullable=True)
    ngaydshc = Column(Unicode(255), nullable=True)
    ngaythicong = Column(Unicode(255), nullable=True)
    tonghs = Column(Integer, default=0)
    qt_tong = Column(Integer, default=0)
    qt_ok = Column(Integer, default=0)
    qt_tn = Column(Integer, default=0)
    qt_thieu = Column(Integer, default=0)
    trigiaqt = Column(DECIMAL(19, 5), default=0)
    dautucty = Column(DECIMAL(19, 5), default=0)
    dautukhach = Column(DECIMAL(19, 5), default=0)
    trigianc = Column(DECIMAL(19, 5), default=0)
    trigiavl = Column(DECIMAL(19, 5), default=0)
    nhathauid = Column(Integer, default=0)
    ngaylap = Column(DateTime, nullable=True)
    nguoilap = Column(Unicode(50), nullable=True)
    ghichu = Column(Unicode(255), nullable=True)
    inok = Column(Boolean, nullable=False, default=False)
    tinhtrang = Column(Unicode(50), nullable=True)
    qtt_tong = Column(Integer, default=0)
    qtt_ok = Column(Integer, default=0)
    qtt_thieu = Column(Integer, default=0)
    congqtt = Column(DECIMAL(19, 5), default=0)
    vatqtt = Column(DECIMAL(19, 5), default=0)
    trigiaqtt = Column(DECIMAL(19, 5), default=0)
    ghichuqtt = Column(Unicode(255), nullable=True)
    tinhtrangqtt = Column(Unicode(50), nullable=True)
    sophieunhap = Column(Unicode(255), nullable=True)
    sophieuxuat = Column(Unicode(255), nullable=True)
    ghichuqtvt = Column(Unicode(255), nullable=True)
    tinhtrangqtvt = Column(Unicode(50), nullable=True)
    lastupdate = Column(DateTime(timezone=True),
                        default=func.now(), onupdate=func.now())


class Dshc(Base):
    __tablename__ = 'dshc'

    madshc = Column(Unicode(50), primary_key=True)
    madot = Column(Unicode(50), nullable=False)
    tt = Column(Integer)
    lanhoancong = Column(Integer, default=1)
    sodshc = Column(Unicode(50), nullable=True)
    maq = Column(Integer, default=0)
    ngaylap = Column(DateTime, nullable=True)
    nguoilap = Column(Unicode(50), nullable=True)
    ghichu = Column(Unicode(50), nullable=True)
    tinhtrang = Column(Unicode(50), nullable=True)
    inok = Column(Boolean, nullable=False, default=False)
    lastupdate = Column(DateTime(timezone=True),
                        default=func.now(), onupdate=func.now())


class Hesochiphi(Base):
    __tablename__ = 'hesochiphi'

    hesoid = Column(Integer, primary_key=True)
    heso_nc = Column(DECIMAL(19, 5), default=0)
    heso_mtc = Column(DECIMAL(19, 5), default=0)
    heso_ttpk = Column(DECIMAL(19, 5), default=0)
    heso_cpchung = Column(DECIMAL(19, 5), default=0)
    heso_thunhaptt = Column(DECIMAL(19, 5), default=0)
    heso_khaosat = Column(DECIMAL(19, 5), default=0)
    heso_thietke = Column(DECIMAL(19, 5), default=0)
    heso_gstc = Column(DECIMAL(19, 5), default=0)
    ngayapdung = Column(DateTime, nullable=True)
    ghichu = Column(Unicode(255), nullable=True)
    lastupdate = Column(DateTime(timezone=True),
                        default=func.now(), onupdate=func.now())


class Hesochiphithau(Base):
    __tablename__ = 'hesochiphithau'

    hesothauid = Column(Integer, primary_key=True)
    heso_nc = Column(DECIMAL(19, 5), default=0)
    heso_mtc = Column(DECIMAL(19, 5), default=0)
    heso_ttpk = Column(DECIMAL(19, 5), default=0)
    heso_cpchung = Column(DECIMAL(19, 5), default=0)
    heso_thunhaptt = Column(DECIMAL(19, 5), default=0)
    heso_khaosat = Column(DECIMAL(19, 5), default=0)
    heso_thietke = Column(DECIMAL(19, 5), default=0)
    heso_gstc = Column(DECIMAL(19, 5), default=0)
    ngayapdung = Column(DateTime, nullable=True)
    ghichu = Column(Unicode(255), nullable=True)
    lastupdate = Column(DateTime(timezone=True),
                        default=func.now(), onupdate=func.now())


class Hoso(Base):
    __tablename__ = 'hoso'
#    __table_args__ = {"schema": "example"}
    hosoid = Column(Integer, primary_key=True)
    sohoso = Column(Unicode(50))
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


class Khuvuc(Base):
    __tablename__ = 'khuvuc'

    maqp = Column(Integer, primary_key=True)
    maq = Column(Integer, default=0)
    map = Column(Integer, default=0)
    phuong = Column(Unicode(50), nullable=True)
    quan = Column(Unicode(50), nullable=True)
    phuongquan = Column(Unicode(255), nullable=True)
    quanviettat = Column(Unicode(50), nullable=True)
    lastupdate = Column(DateTime(timezone=True),
                        default=func.now(), onupdate=func.now())


class Mauqt(Base):
    __tablename__ = 'mauqt'

    maqt = Column(Unicode(50), primary_key=True)
    dhn = Column(Unicode(50), default='15')
    diengiai = Column(Unicode(255), nullable=True)
    lastupdate = Column(DateTime(timezone=True),
                        default=func.now(), onupdate=func.now())


class Nhathau(Base):
    __tablename__ = 'nhathau'

    nhathauid = Column(Integer, primary_key=True)
    manhathau = Column(Unicode(50), nullable=True)
    ten = Column(Unicode(255), nullable=True)
    diachi = Column(Unicode(255), nullable=True)
    khuvuc = Column(Unicode(255), nullable=True)
    dienthoai = Column(Unicode(255), nullable=True)
    Email = Column(Unicode(255), nullable=True)
    lienhe1 = Column(Unicode(255), nullable=True)
    lienhe2 = Column(Unicode(255), nullable=True)
    lienhe3 = Column(Unicode(255), nullable=True)
    thutruong = Column(Unicode(255), nullable=True)
    ghichu = Column(Unicode(255), nullable=True)
    lastupdate = Column(DateTime(timezone=True),
                        default=func.now(), onupdate=func.now())


class Plchiphi(Base):
    __tablename__ = 'plchiphi'

    id = Column(Integer, primary_key=True)
    chiphiid = Column(Integer, default=0)
    tinhtrang = Column(Unicode(255), nullable=True)
    phanloai = Column(Unicode(255), nullable=True)
    giatripl = Column(Integer, default=0)
    ghichu = Column(Unicode(255), nullable=True)
    lastupdate = Column(DateTime(timezone=True),
                        default=func.now(), onupdate=func.now())


class Qt(Base):
    __tablename__ = 'qt'

    madot = Column(Unicode(50), nullable=True)
    maqt = Column(Unicode(50), primary_key=True)
    qtid = Column(Integer)
    tt = Column(Integer)
    hosoid = Column(Integer, default=0)
    soho = Column(Integer, default=0)
    baogiaid = Column(Integer, default=0)
    hesoid = Column(Integer, default=0)
    vlcai = Column(DECIMAL(19, 5), default=0)
    nccai = Column(DECIMAL(19, 5), default=0)
    mtccai = Column(DECIMAL(19, 5), default=0)
    vlnganh = Column(DECIMAL(19, 5), default=0)
    ncnganh = Column(DECIMAL(19, 5), default=0)
    mtcnganh = Column(DECIMAL(19, 5), default=0)
    gxd1kq1 = Column(DECIMAL(19, 5), default=0)
    gxd1kq2 = Column(DECIMAL(19, 5), default=0)
    gxd2kq1 = Column(DECIMAL(19, 5), default=0)
    gxd2kq2 = Column(DECIMAL(19, 5), default=0)
    gxd = Column(DECIMAL(19, 5), default=0)
    dautucty = Column(DECIMAL(19, 5), default=0)
    dautukhach = Column(DECIMAL(19, 5), default=0)
    ghichu = Column(Unicode(255), nullable=True)
    tinhtrang = Column(Unicode(50), nullable=True)
    nguoilap = Column(Unicode(50), nullable=True)
    ngaylap = Column(DateTime, nullable=True)
    inok = Column(Boolean, nullable=False, default=False)
    ngaygan = Column(DateTime, nullable=True)
    ngayhoancong = Column(DateTime, nullable=True)
    sodhn = Column(Unicode(50), nullable=True)
    hieudhn = Column(Unicode(50), nullable=True)
    chisodhn = Column(DECIMAL(19, 5), default=0)
    madshc = Column(Unicode(50), nullable=True)
    hesothauid = Column(Integer, default=0)
    tvlcai = Column(DECIMAL(19, 5), default=0)
    tnccai = Column(DECIMAL(19, 5), default=0)
    tmtccai = Column(DECIMAL(19, 5), default=0)
    tvlnganh = Column(DECIMAL(19, 5), default=0)
    tncnganh = Column(DECIMAL(19, 5), default=0)
    tmtcnganh = Column(DECIMAL(19, 5), default=0)
    tgxd1kq1 = Column(DECIMAL(19, 5), default=0)
    tgxd1kq2 = Column(DECIMAL(19, 5), default=0)
    sldh = Column(Integer, default=0)
    dhn15 = Column(Integer, default=0)
    dhn25 = Column(Integer, default=0)
    dhn50 = Column(Integer, default=0)
    dhn80 = Column(Integer, default=0)
    dhn100 = Column(Integer, default=0)
    slong = Column(DECIMAL(19, 5), default=0)
    ong25 = Column(DECIMAL(19, 5), default=0)
    ong34 = Column(DECIMAL(19, 5), default=0)
    ong50 = Column(DECIMAL(19, 5), default=0)
    ong100 = Column(DECIMAL(19, 5), default=0)
    ong125 = Column(DECIMAL(19, 5), default=0)
    ong150 = Column(DECIMAL(19, 5), default=0)
    ong200 = Column(DECIMAL(19, 5), default=0)
    ong250 = Column(DECIMAL(19, 5), default=0)
    slcat = Column(DECIMAL(19, 5), default=0)
    tiencat = Column(DECIMAL(19, 5), default=0)
    slcatnhua = Column(DECIMAL(19, 5), default=0)
    tiencatnhua = Column(DECIMAL(19, 5), default=0)
    tienvlk = Column(DECIMAL(19, 5), default=0)
    nc = Column(DECIMAL(19, 5), default=0)
    tiennc = Column(DECIMAL(19, 5), default=0)
    mtc = Column(DECIMAL(19, 5), default=0)
    tienmtc = Column(DECIMAL(19, 5), default=0)
    cptt = Column(DECIMAL(19, 5), default=0)
    cong = Column(DECIMAL(19, 5), default=0)
    thuevat = Column(DECIMAL(19, 5), default=0)
    trigiaqtt = Column(DECIMAL(19, 5), default=0)
    ghichuqtt = Column(Unicode(255), nullable=True)
    tinhtrangqtt = Column(Unicode(50), nullable=True)
    lastupdate = Column(DateTime(timezone=True),
                        default=func.now(), onupdate=func.now())


class Qt3x(object):
    maqtgt = Column(Unicode(50), primary_key=True)
    tt = Column(Integer)
    chiphiid = Column(Integer, default=0)
    soluong = Column(DECIMAL(19, 5), default=0)
    giavl = Column(DECIMAL(19, 5), default=0)
    gianc = Column(DECIMAL(19, 5), default=0)
    giamtc = Column(DECIMAL(19, 5), default=0)
    trigiavl = Column(DECIMAL(19, 5), default=0)
    trigianc = Column(DECIMAL(19, 5), default=0)
    trigiamtc = Column(DECIMAL(19, 5), default=0)
    soluong1 = Column(DECIMAL(19, 5), default=0)
    giavl1 = Column(DECIMAL(19, 5), default=0)
    gianc1 = Column(DECIMAL(19, 5), default=0)
    giamtc1 = Column(DECIMAL(19, 5), default=0)
    trigiavl1 = Column(DECIMAL(19, 5), default=0)
    trigianc1 = Column(DECIMAL(19, 5), default=0)
    trigiamtc1 = Column(DECIMAL(19, 5), default=0)
    ghichu = Column(Unicode(50), nullable=True)
    lastupdate = Column(DateTime(timezone=True),
                        default=func.now(), onupdate=func.now())
    tinhtrang = Column(Unicode(50), nullable=True)
    maqt = Column(Unicode(50), nullable=True)


class Qt31(Qt3x, Base):
    __tablename__ = 'qt31'


class Qt32(Qt3x, Base):
    __tablename__ = 'qt32'


class Qt33(Qt3x, Base):
    __tablename__ = 'qt33'


class Qt34(Qt3x, Base):
    __tablename__ = 'qt34'


class Qt35(Base):
    __tablename__ = 'qt35'

    maqtgt = Column(Unicode(50), primary_key=True)
    tt = Column(Integer)
    chiphiid = Column(Integer, default=0)
    sl1 = Column(DECIMAL(19, 5), default=0)
    sl2 = Column(DECIMAL(19, 5), default=0)
    dongia = Column(DECIMAL(19, 5), default=0)
    trigia1 = Column(DECIMAL(19, 5), default=0)
    trigia2 = Column(DECIMAL(19, 5), default=0)
    ghichu = Column(Unicode(50), nullable=True)
    lastupdate = Column(DateTime(timezone=True),
                        default=func.now(), onupdate=func.now())
    tinhtrang = Column(Unicode(50), nullable=True)
    maqt = Column(Unicode(50), nullable=True)


class Qtvt(Base):
    __tablename__ = 'qtvt'

    maqtvt = Column(Unicode(50), primary_key=True)
    madot = Column(Unicode(50), nullable=True)
    tt = Column(Integer)
    mavattu = Column(Unicode(50), nullable=True)
    tenvattu = Column(Unicode(255), nullable=True)
    dvt = Column(Unicode(50), nullable=True)
    soluongcap = Column(DECIMAL(19, 5), default=0)
    soluongsudung = Column(DECIMAL(19, 5), default=0)
    soluongtainhap = Column(DECIMAL(19, 5), default=0)
    soluongbosung = Column(DECIMAL(19, 5), default=0)
    ghichu = Column(Unicode(255), nullable=True)
    chiphiid = Column(Integer, default=0)
    lastupdate = Column(DateTime(timezone=True),
                        default=func.now(), onupdate=func.now())


class Tamhoso(Base):
    __tablename__ = 'tamhoso'

    madot = Column(Unicode(50))
    ngaylendot = Column(DateTime, nullable=True)
    maqt = Column(Unicode(50))
    soho = Column(Integer)
    hosoid = Column(Integer)
    sodot = Column(Unicode(50), nullable=True)
    tt = Column(Integer)
    sohoso = Column(Unicode(50), nullable=True)
    khachhang = Column(Unicode(255), nullable=True)
    diachikhachhang = Column(Unicode(255), nullable=True)
    lienhe = Column(Unicode(50), nullable=True)
    maq = Column(Integer, default=0)
    maqp = Column(Integer, default=0)
    nhathauid = Column(Integer)
    ghichu = Column(Unicode(255), nullable=True)
    lastupdate = Column(DateTime(timezone=True),
                        default=func.now(), onupdate=func.now())
    madshc = Column(Unicode(50), nullable=True)
    autoid = Column(Integer, primary_key=True)


class Trinhky(Base):
    __tablename__ = 'trinhky'

    matrinhky = Column(Unicode(50), primary_key=True)
    tendonvi = Column(Unicode(255))
    duyet1 = Column(Unicode(255))
    duyet11 = Column(Unicode(255))
    duyet12 = Column(Unicode(255))
    duyet2 = Column(Unicode(255))
    duyet21 = Column(Unicode(255))
    duyet22 = Column(Unicode(255))
    duyet3 = Column(Unicode(255))
    duyet31 = Column(Unicode(255))
    duyet32 = Column(Unicode(255))
    duyet4 = Column(Unicode(255))
    duyet41 = Column(Unicode(255))
    duyet42 = Column(Unicode(255))
    lastupdate = Column(DateTime(timezone=True),
                        default=func.now(), onupdate=func.now())


#engine = create_engine('sqlite:///quyettoan/quyettoan.db', echo=True)
#engine = create_engine('sqlite:///:memory:', echo=True)
cnnstr = "mssql+pyodbc://{}:{}@{}/{}?driver=ODBC+Driver+13+for+SQL+Server".format(
    'pkh', 'Ph0ngK3H0@ch', '192.168.24.4:1433', 'PKHData')
engine = create_engine(cnnstr)

Base.metadata.create_all(engine)
Session = scoped_session(sessionmaker(bind=engine, autoflush=True))
