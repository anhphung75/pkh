import datetime
import decimal
import json
import arrow

from sqlalchemy import func, desc
from ttdl import Maychu
from ttdl import Hoso
from utils import Api, lamtronso


class apiHoso():
    def gom(self, orm=None, namhoso=2020):
        return

    def doc(self, orm=None, mahoso=None):
        return

    def xoa(self, orm=None, mahoso=None):
        return

    def moi(self, orm=None, mahoso=None, data={}):
        return

    def sua(self, orm=None, mahoso=None, data={}):
        return


class sseHoso():
    def gom(self, orm=None, nam=2020):
        bdl = Hoso
        if nam == None:
            data = orm.query(bdl).filter(bdl.mahoso != None).all()
        else:
            stim = '{}%'.format(nam)
            data = orm.query(bdl).filter(bdl.mahoso.like(stim)).all()
        orm.close()

        tgdi = int(arrow.utcnow().float_timestamp * 1000)
        _id = tgdi
        _event = 'message'
        rawdata = Api.raw2listjson(data)
        _data = json.dumps(rawdata)
        return 'id:{}\\nenvent:{}\\ndata:{}\\n\\n'.format(_id, _event, _data)

    def doc(self, orm=None, mahoso=None):
        return

    def xoa(self, orm=None, mahoso=None):
        return

    def moi(self, orm=None, mahoso=None, data={}):
        return

    def sua(self, orm=None, mahoso=None, data={}):
        return


def runsql(sql=''):
    mssql = Maychu("mssql", "pkh", "Ph0ngK3H0@ch",
                   "192.168.24.4:1433", "PKHData")
    # try:
    kq = mssql.core().execute(sql)
    data = []
    for row in kq:
        dl = dict(row)
        for k in dl.copy():
            #print(f"dl[{k}]={dl[k]} type={type(dl[k])}")
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
    # except:
    #    return None


class RptQtgt:
    def __init__(self, maqt='', schema='qlmltd'):
        self.maqt = maqt
        self.schema = schema
        self.get_qtgt()

    def get_qtgt(self):
        # self.get_tttt()
        self.tbl_qtgt()
        self.tbl_hoso()
        self.tbl_dot()
        self.tbl_donvithicong()
        self.qtoc_xd()
        self.qtoc_vt()
        self.qtoc_vl()
        self.qtoc_tl()
        self.qton_xd()
        self.qton_vt()
        self.qton_vl()
        self.qton_tl()
        self.tlmd()
        self.get_chiphiquanly()

    def get_tttt(self):
        dl = {"maqt": "pkh002", "madot": "2020gmmp242", "mahoso": "113344",
              "makhachhang": "2020kh001", "madvtc": "qlmltd"}
        self.tttt = dl

    def tbl_qtgt(self):
        #convert(ngaylap, getdate(), 112)
        # FORMAT(baogiaid, 'yyyyMMdd', 'en-US' ) AS
        sql = (
            f"Select top 1 ngaylap, dautucty as tiencty, dautukhach as tienkhach, gxd, tt,"
            f" vlcai as oczvl,nccai as ocznc,mtccai as oczmtc,"
            f" vlnganh as onzvl, ncnganh as onznc, mtcnganh as onzmtc,"
            f" convert(datetime, baogiaid) as mabaogia, hesoid as cpqlid, madot, hosoid, plgia"
            f" From {self.schema}.qt"
            f" Where (maqt='{self.maqt}')"
        )
        dl = runsql(sql)
        if (dl != None and len(dl) > 0):
            dl = dl[0]
            print(f"qtgt dl={dl}")
        else:
            dl = {"ngaylap": "20200907", "cpqlid": 20200721, "mabaogia": "20200721",
                  "oczvl": 0, "ocznc": 0, "oczmtc": 0, "ocztl": 0,
                  "onzvl": 88889998888, "onznc": 8888998888, "onzmtc": 0, "onztl": 0,
                  "tiencty": 9999277584, "tienkhach": 0, "gxd": 0, "tt": 0,
                  "plgia": "dutoan", "hosoid": 0, "madot": "9999GMMP001"}
        if 'tl' in self.maqt.lower():
            self.tieude = 'BẢNG QUYẾT TOÁN TÁI LẬP DANH BỘ'
        else:
            self.tieude = 'BẢNG QUYẾT TOÁN GẮN MỚI ĐỒNG HỒ NƯỚC'
        self.ngaylap = dl['ngaylap']
        self.gxd = dl['gxd']
        self.tiencty = dl['tiencty']
        self.tienkhach = dl['tienkhach']
        self.tt = dl['tt']
        self.oczvl = dl['oczvl']
        self.ocznc = dl['ocznc']
        self.oczmtc = dl['oczmtc']
        #self.ocztl = dl['ocztl']
        self.onzvl = dl['onzvl']
        self.onznc = dl['onznc']
        self.onzmtc = dl['onzmtc']
        #self.onztl = dl['onztl']
        self.madot = dl['madot']
        self.hosoid = dl['hosoid']
        self.mabaogia = dl['mabaogia']
        self.plgia = dl['plgia']
        self.cpqlid = dl['cpqlid']
        self.hesoid = self.cpqlid

    def tbl_hoso(self):
        sql = (
            f"Select top 1 sohoso, diachikhachhang as diachigandhn, khachhang From dbo.hoso"
            f" Where (hosoid='{self.hosoid}')"
        )
        dl = runsql(sql)
        if (dl != None and len(dl) > 0):
            dl = dl[0]
        else:
            dl = {
                "sohoso": "GM01001/20",
                "diachigandhn": "25/5/4A- Đường 9- Kp.5- P.Linh Xuân- Q.TĐ",
                "khachhang": "Lỗi dữ liệu"}
        # test
        for cp in dl:
            print(f"hoso={dl[cp]}")
        self.sohoso = dl['sohoso']
        self.diachigandhn = dl['diachigandhn']
        self.khachhang = dl['khachhang']

    def tbl_dot(self):
        sql = (
            f"Select top 1 sodot, nhathauid as dvtcid From dbo.dot"
            f" Where (madot='{self.madot}')"
        )
        dl = runsql(sql)
        if (dl != None and len(dl) > 0):
            dl = dl[0]
        else:
            dl = {"sodot": "999/2020MP", "nhathauid": 4}
        # test
        for cp in dl:
            print(f"dot {cp}={dl[cp]}")
        self.sodot = dl["sodot"]
        self.dvtcid = dl["dvtcid"]

    def tbl_donvithicong(self):
        sql = (
            f"Select top 1 ten as dvtc From dbo.nhathau"
            f" Where (nhathauid='{self.dvtcid}')"
        )
        dl = runsql(sql)
        if (dl != None and len(dl) > 0):
            dl = dl[0]
        else:
            dl = {'dvtc': 'ĐỘI QLML CẤP NƯỚC QUẬN THỦ ĐỨC', }
        # test
        for cp in dl:
            print(f"dvtc={dl[cp]}")
        self.dvtc = dl['dvtc']

    def qtoc_xd(self):
        sql = (
            f"Select cp.chiphiid,cp.diengiai as mota,cp.dvt,qt.soluong,qt.giavl,qt.gianc,qt.giamtc"
            f" From dbo.chiphi cp RIGHT JOIN {self.schema}.qt31 qt ON cp.chiphiid=qt.chiphiid"
            f" Where (qt.maqt='{self.maqt}') Order By qt.maqtgt"
        )
        dl = runsql(sql)
        if (dl != None and len(dl) > 0):
            pass
        else:
            dl = [
                {'chiphiid': '001', 'mota': '- Chi phí ống cái', 'dvt': 'mét',
                 'soluong': 8888.899, 'giavl': 6510, 'gianc': 13174, 'giamtc': 5815,
                 'tienvl': 104154, 'tiennc': 210776, 'tienmtc': 93040},
                {'chiphiid': '002', 'mota': '- Chi phí ống cái', 'dvt': 'm3',
                 'soluong': 0.24, 'giavl': 0, 'gianc': 538918, 'giamtc': 0,
                 'tienvl': 0, 'tiennc': 129340, 'tienmtc': 0},
                {'chiphiid': '001', 'mota': '- Cắt mặt nhựa và BTXM', 'dvt': 'mét',
                 'soluong': 16, 'giavl': 6510, 'gianc': 13174, 'giamtc': 5815,
                 'tienvl': 104154, 'tiennc': 210776, 'tienmtc': 93040},
                {'chiphiid': '002', 'mota': '- Đào bốc mặt đường nhựa', 'dvt': 'm3',
                 'soluong': 0.24, 'giavl': 0, 'gianc': 538918, 'giamtc': 0,
                 'tienvl': 0, 'tiennc': 129340, 'tienmtc': 0},
                {'chiphiid': '001', 'mota': '- Cắt mặt nhựa và BTXM', 'dvt': 'mét',
                 'soluong': 16, 'giavl': 6510, 'gianc': 13174, 'giamtc': 5815,
                 'tienvl': 104154, 'tiennc': 210776, 'tienmtc': 93040},
                {'chiphiid': '002', 'mota': '- Đào bốc mặt đường nhựa', 'dvt': 'm3',
                 'soluong': 0.24, 'giavl': 0, 'gianc': 538918, 'giamtc': 0,
                 'tienvl': 0, 'tiennc': 129340, 'tienmtc': 0},
                {'chiphiid': '001', 'mota': '- Cắt mặt nhựa và BTXM', 'dvt': 'mét',
                 'soluong': 16, 'giavl': 6510, 'gianc': 13174, 'giamtc': 5815,
                 'tienvl': 104154, 'tiennc': 210776, 'tienmtc': 93040},
                {'chiphiid': '002', 'mota': '- Đào bốc mặt đường nhựa', 'dvt': 'm3',
                 'soluong': 0.24, 'giavl': 0, 'gianc': 538918, 'giamtc': 0,
                 'tienvl': 0, 'tiennc': 129340, 'tienmtc': 0},
                {'chiphiid': '001', 'mota': '- Cắt mặt nhựa và BTXM', 'dvt': 'mét',
                 'soluong': 16, 'giavl': 6510, 'gianc': 13174, 'giamtc': 5815,
                 'tienvl': 104154, 'tiennc': 210776, 'tienmtc': 93040},
                {'chiphiid': '002', 'mota': '- Đào bốc mặt đường nhựa', 'dvt': 'm3',
                 'soluong': 0.24, 'giavl': 0, 'gianc': 538918, 'giamtc': 0,
                 'tienvl': 0, 'tiennc': 129340, 'tienmtc': 0},
            ]
        # load gia
        # tinh tien
        for cp in dl:
            cp['tienvl'] = lamtronso(cp['soluong'] * cp['giavl'], 0)
            cp['tiennc'] = lamtronso(cp['soluong'] * cp['gianc'], 0)
            cp['tienmtc'] = lamtronso(cp['soluong'] * cp['giamtc'], 0)
        # test
        for cp in dl:
            print(f"oc_cpxd={cp}")
        self.oc_cpxd = dl.copy()

    def qtoc_vt(self):
        sql = (
            f"Select cp.chiphiid,cp.diengiai as mota,cp.dvt,qt.soluong,qt.giavl,qt.gianc,qt.giamtc"
            f" From dbo.chiphi cp RIGHT JOIN {self.schema}.qt32 qt ON cp.chiphiid=qt.chiphiid"
            f" Where (qt.maqt='{self.maqt}' And cp.mapl1 Like 'VT%') Order By qt.maqtgt"
        )
        dl = runsql(sql)
        if (dl != None and len(dl) > 0):
            pass
        else:
            dl = [
                {'chiphiid': '001', 'mota': 'Đai lấy nước PP 100 x 20F', 'dvt': 'bộ',
                 'soluong': 1, 'giavl': 133900, 'gianc': 47904, 'giamtc': 0,
                 'tienvl': 133900, 'tiennc': 47904, 'tienmtc': 0},
                {'chiphiid': '002', 'mota': 'Ống HDPE 25x3mm', 'dvt': 'mét',
                 'soluong': 12, 'giavl': 13895, 'gianc': 17174, 'giamtc': 774,
                 'tienvl': 166740, 'tiennc': 206088, 'tienmtc': 9288},
                {'chiphiid': '001', 'mota': 'Đai lấy nước PP 100 x 20F', 'dvt': 'bộ',
                 'soluong': 1, 'giavl': 133900, 'gianc': 47904, 'giamtc': 0,
                 'tienvl': 133900, 'tiennc': 47904, 'tienmtc': 0},
                {'chiphiid': '002', 'mota': 'Ống HDPE 25x3mm', 'dvt': 'mét',
                 'soluong': 12, 'giavl': 13895, 'gianc': 17174, 'giamtc': 774,
                 'tienvl': 166740, 'tiennc': 206088, 'tienmtc': 9288},
                {'chiphiid': '001', 'mota': 'Đai lấy nước PP 100 x 20F', 'dvt': 'bộ',
                 'soluong': 1, 'giavl': 133900, 'gianc': 47904, 'giamtc': 0,
                 'tienvl': 133900, 'tiennc': 47904, 'tienmtc': 0},
                {'chiphiid': '002', 'mota': 'Ống HDPE 25x3mm', 'dvt': 'mét',
                 'soluong': 12, 'giavl': 13895, 'gianc': 17174, 'giamtc': 774,
                 'tienvl': 166740, 'tiennc': 206088, 'tienmtc': 9288},
                {'chiphiid': '001', 'mota': 'Đai lấy nước PP 100 x 20F', 'dvt': 'bộ',
                 'soluong': 1, 'giavl': 133900, 'gianc': 47904, 'giamtc': 0,
                 'tienvl': 133900, 'tiennc': 47904, 'tienmtc': 0},
                {'chiphiid': '002', 'mota': 'Ống HDPE 25x3mm', 'dvt': 'mét',
                 'soluong': 12, 'giavl': 13895, 'gianc': 17174, 'giamtc': 774,
                 'tienvl': 166740, 'tiennc': 206088, 'tienmtc': 9288},
            ]
        # load gia
        # tinh tien
        for cp in dl:
            cp['tienvl'] = lamtronso(cp['soluong'] * cp['giavl'], 0)
            cp['tiennc'] = lamtronso(cp['soluong'] * cp['gianc'], 0)
            cp['tienmtc'] = lamtronso(cp['soluong'] * cp['giamtc'], 0)
        # test
        for cp in dl:
            print(f"on_cpvt={cp}")
        self.oc_cpvt = dl.copy()

    def qtoc_vl(self):
        sql = (
            f"Select cp.chiphiid,cp.diengiai as mota,cp.dvt,qt.soluong,qt.giavl,qt.gianc,qt.giamtc"
            f" From dbo.chiphi cp RIGHT JOIN {self.schema}.qt32 qt ON cp.chiphiid=qt.chiphiid"
            f" Where (qt.maqt='{self.maqt}' And cp.mapl1 Like 'VL%') Order By qt.maqtgt"
        )
        dl = runsql(sql)
        if (dl != None and len(dl) > 0):
            pass
        else:
            dl = [
                {'chiphiid': '001', 'mota': 'Cát san lấp', 'dvt': 'm3',
                 'soluong': 0.763, 'giavl': 8888933988, 'gianc': 888847948, 'giamtc': 888899999,
                 'tienvl': 133900, 'tiennc': 47904, 'tienmtc': 0},
                {'chiphiid': '002', 'mota': 'Đá dăm 4x6', 'dvt': 'm3',
                 'soluong': 15.462, 'giavl': 13895, 'gianc': 17174, 'giamtc': 774,
                 'tienvl': 166740, 'tiennc': 206088, 'tienmtc': 9288},
                {'chiphiid': '002', 'mota': 'Lưỡi cắt bê tông loại 356mm', 'dvt': 'cái',
                 'soluong': 0.076, 'giavl': 13895, 'gianc': 17174, 'giamtc': 774,
                 'tienvl': 166740, 'tiennc': 206088, 'tienmtc': 9288},
            ]
        # load gia
        # tinh tien
        for cp in dl:
            if self.cpqlid >= 20200827:
                cp['tienvl'] = lamtronso(
                    cp['soluong'] * cp['giavl']/1000, 0)*1000
                cp['tiennc'] = lamtronso(
                    cp['soluong'] * cp['gianc']/1000, 0)*1000
                cp['tienmtc'] = lamtronso(
                    cp['soluong'] * cp['giamtc']/1000, 0)*1000
            else:
                cp['tienvl'] = lamtronso(cp['soluong'] * cp['giavl'], 0)
                cp['tiennc'] = lamtronso(cp['soluong'] * cp['gianc'], 0)
                cp['tienmtc'] = lamtronso(cp['soluong'] * cp['giamtc'], 0)
        # test
        for cp in dl:
            print(f"on_cpvl={cp}")
        self.oc_cpvl = dl.copy()

    def qtoc_tl(self):
        sql = (
            f"Select cp.chiphiid,cp.diengiai as mota,cp.dvt,qt.sl1 as soluong,qt.dongia as gia"
            f" From dbo.chiphi cp RIGHT JOIN {self.schema}.qt35 qt ON cp.chiphiid=qt.chiphiid"
            f" Where (qt.maqt='{self.maqt}' And cp.mapl1 Like 'TL%') Order By qt.maqtgt"
        )
        dl = runsql(sql)
        if (dl != None and len(dl) > 0):
            pass
        else:
            dl = [{'chiphiid': '001', 'mota': 'Gạch hình sin', 'dvt': 'm2',
                   'soluong': 0.35, 'gia': 412000},
                  {'chiphiid': '002', 'mota': '- Đào bốc mặt đường nhựa', 'dvt': 'm2',
                   'soluong': 2.4, 'gia': 8890000},
                  {'chiphiid': '001', 'mota': 'Gạch hình sin', 'dvt': 'm2',
                   'soluong': 0.35, 'gia': 412000},
                  {'chiphiid': '002', 'mota': '- Đào bốc mặt đường nhựa', 'dvt': 'm2',
                   'soluong': 2.4, 'gia': 890000},
                  ]
        # load gia
        # tinh tien
        for cp in dl:
            cp['sl_oc'] = cp['soluong']
            cp['tien_oc'] = lamtronso(cp['soluong'] * cp['gia'], 0)
        # test
        for cp in dl:
            print(f"on_cptl={cp}")
        self.oc_cptl = dl.copy()

    def qton_xd(self):
        sql = (
            f"Select cp.chiphiid,cp.diengiai as mota,cp.dvt,qt.soluong,qt.giavl,qt.gianc,qt.giamtc"
            f" From dbo.chiphi cp RIGHT JOIN {self.schema}.qt33 qt ON cp.chiphiid=qt.chiphiid"
            f" Where (qt.maqt='{self.maqt}') Order By qt.maqtgt"
        )
        dl = runsql(sql)
        if (dl != None and len(dl) > 0):
            pass
        else:
            dl = [
                {'chiphiid': '001', 'mota': '- Chi phí ống ngánh', 'dvt': 'mét',
                 'soluong': 16, 'giavl': 6510, 'gianc': 13174, 'giamtc': 5815,
                 'tienvl': 104154, 'tiennc': 210776, 'tienmtc': 93040},
                {'chiphiid': '002', 'mota': '- Chi phí ống ngánh', 'dvt': 'm3',
                 'soluong': 0.24, 'giavl': 0, 'gianc': 538918, 'giamtc': 0,
                 'tienvl': 0, 'tiennc': 129340, 'tienmtc': 0},
                {'chiphiid': '001', 'mota': '- Cắt mặt nhựa và BTXM', 'dvt': 'mét',
                 'soluong': 16, 'giavl': 6510, 'gianc': 13174, 'giamtc': 5815,
                 'tienvl': 104154, 'tiennc': 210776, 'tienmtc': 93040},
                {'chiphiid': '002', 'mota': '- Đào bốc mặt đường nhựa', 'dvt': 'm3',
                 'soluong': 0.24, 'giavl': 0, 'gianc': 538918, 'giamtc': 0,
                 'tienvl': 0, 'tiennc': 129340, 'tienmtc': 0},
                {'chiphiid': '001', 'mota': '- Cắt mặt nhựa và BTXM', 'dvt': 'mét',
                 'soluong': 16, 'giavl': 6510, 'gianc': 13174, 'giamtc': 5815,
                 'tienvl': 104154, 'tiennc': 210776, 'tienmtc': 93040},
                {'chiphiid': '002', 'mota': '- Đào bốc mặt đường nhựa', 'dvt': 'm3',
                 'soluong': 0.24, 'giavl': 0, 'gianc': 538918, 'giamtc': 0,
                 'tienvl': 0, 'tiennc': 129340, 'tienmtc': 0},
                {'chiphiid': '001', 'mota': '- Cắt mặt nhựa và BTXM', 'dvt': 'mét',
                 'soluong': 16, 'giavl': 6510, 'gianc': 13174, 'giamtc': 5815,
                 'tienvl': 104154, 'tiennc': 210776, 'tienmtc': 93040},
                {'chiphiid': '002', 'mota': '- Đào bốc mặt đường nhựa', 'dvt': 'm3',
                 'soluong': 0.24, 'giavl': 0, 'gianc': 538918, 'giamtc': 0,
                 'tienvl': 0, 'tiennc': 129340, 'tienmtc': 0},
                {'chiphiid': '001', 'mota': '- Cắt mặt nhựa và BTXM', 'dvt': 'mét',
                 'soluong': 16, 'giavl': 6510, 'gianc': 13174, 'giamtc': 5815,
                 'tienvl': 104154, 'tiennc': 210776, 'tienmtc': 93040},
                {'chiphiid': '002', 'mota': '- Đào bốc mặt đường nhựa', 'dvt': 'm3',
                 'soluong': 0.24, 'giavl': 0, 'gianc': 538918, 'giamtc': 0,
                 'tienvl': 0, 'tiennc': 129340, 'tienmtc': 0},
            ]
        # load gia
        # tinh tien
        for cp in dl:
            cp['tienvl'] = lamtronso(cp['soluong'] * cp['giavl'], 0)
            cp['tiennc'] = lamtronso(cp['soluong'] * cp['gianc'], 0)
            cp['tienmtc'] = lamtronso(cp['soluong'] * cp['giamtc'], 0)
        # test
        for cp in dl:
            print(f"on_cpxd={cp}")
        self.on_cpxd = dl.copy()

    def qton_vt(self):
        sql = (
            f"Select cp.chiphiid,cp.diengiai as mota,cp.dvt,qt.soluong,qt.giavl,qt.gianc,qt.giamtc"
            f" From dbo.chiphi cp RIGHT JOIN {self.schema}.qt34 qt ON cp.chiphiid=qt.chiphiid"
            f" Where (qt.maqt='{self.maqt}' And cp.mapl1 Like 'VT%') Order By qt.maqtgt"
        )
        dl = runsql(sql)
        if (dl != None and len(dl) > 0):
            pass
        else:
            dl = [
                {'chiphiid': '001', 'mota': 'Đai lấy nước PP 100 x 20F', 'dvt': 'bộ',
                 'soluong': 1, 'giavl': 133900, 'gianc': 47904, 'giamtc': 0,
                 'tienvl': 133900, 'tiennc': 47904, 'tienmtc': 0},
                {'chiphiid': '002', 'mota': 'Ống HDPE 25x3mm', 'dvt': 'mét',
                 'soluong': 12, 'giavl': 13895, 'gianc': 17174, 'giamtc': 774,
                 'tienvl': 166740, 'tiennc': 206088, 'tienmtc': 9288},
                {'chiphiid': '001', 'mota': 'Đai lấy nước PP 100 x 20F', 'dvt': 'bộ',
                 'soluong': 1, 'giavl': 133900, 'gianc': 47904, 'giamtc': 0,
                 'tienvl': 133900, 'tiennc': 47904, 'tienmtc': 0},
                {'chiphiid': '002', 'mota': 'Ống HDPE 25x3mm', 'dvt': 'mét',
                 'soluong': 12, 'giavl': 13895, 'gianc': 17174, 'giamtc': 774,
                 'tienvl': 166740, 'tiennc': 206088, 'tienmtc': 9288},
                {'chiphiid': '001', 'mota': 'Đai lấy nước PP 100 x 20F', 'dvt': 'bộ',
                 'soluong': 1, 'giavl': 133900, 'gianc': 47904, 'giamtc': 0,
                 'tienvl': 133900, 'tiennc': 47904, 'tienmtc': 0},
                {'chiphiid': '002', 'mota': 'Ống HDPE 25x3mm', 'dvt': 'mét',
                 'soluong': 12, 'giavl': 13895, 'gianc': 17174, 'giamtc': 774,
                 'tienvl': 166740, 'tiennc': 206088, 'tienmtc': 9288},
                {'chiphiid': '001', 'mota': 'Đai lấy nước PP 100 x 20F', 'dvt': 'bộ',
                 'soluong': 1, 'giavl': 133900, 'gianc': 47904, 'giamtc': 0,
                 'tienvl': 133900, 'tiennc': 47904, 'tienmtc': 0},
                {'chiphiid': '002', 'mota': 'Ống HDPE 25x3mm', 'dvt': 'mét',
                 'soluong': 12, 'giavl': 13895, 'gianc': 17174, 'giamtc': 774,
                 'tienvl': 166740, 'tiennc': 206088, 'tienmtc': 9288},
            ]
        # load gia
        # tinh tien
        for cp in dl:
            cp['tienvl'] = lamtronso(cp['soluong'] * cp['giavl'], 0)
            cp['tiennc'] = lamtronso(cp['soluong'] * cp['gianc'], 0)
            cp['tienmtc'] = lamtronso(cp['soluong'] * cp['giamtc'], 0)
       # test
        for cp in dl:
            print(f"on_cpvt={cp}")
        self.on_cpvt = dl.copy()

    def qton_vl(self):
        sql = (
            f"Select cp.chiphiid,cp.diengiai as mota,cp.dvt,qt.soluong,qt.giavl,qt.gianc,qt.giamtc"
            f" From dbo.chiphi cp RIGHT JOIN {self.schema}.qt34 qt ON cp.chiphiid=qt.chiphiid"
            f" Where (qt.maqt='{self.maqt}' And cp.mapl1 Like 'VL%') Order By qt.maqtgt"
        )
        dl = runsql(sql)
        if (dl != None and len(dl) > 0):
            pass
        else:
            dl = [
                {'chiphiid': '001', 'mota': 'Cát san lấp', 'dvt': 'm3',
                 'soluong': 0.763, 'giavl': 8888133900, 'gianc': 47904, 'giamtc': 0,
                 'tienvl': 133900, 'tiennc': 47904, 'tienmtc': 0},
                {'chiphiid': '002', 'mota': 'Đá dăm 4x6', 'dvt': 'm3',
                 'soluong': 15.462, 'giavl': 13895, 'gianc': 17174, 'giamtc': 774,
                 'tienvl': 166740, 'tiennc': 206088, 'tienmtc': 9288},
                {'chiphiid': '002', 'mota': 'Lưỡi cắt bê tông loại 356mm', 'dvt': 'cái',
                 'soluong': 0.076, 'giavl': 13895, 'gianc': 17174, 'giamtc': 774,
                 'tienvl': 166740, 'tiennc': 206088, 'tienmtc': 9288},
            ]
        # load gia
        # tinh tien
        for cp in dl:
            cp['tienvl'] = lamtronso(cp['soluong'] * cp['giavl'], 0)
            cp['tiennc'] = lamtronso(cp['soluong'] * cp['gianc'], 0)
            cp['tienmtc'] = lamtronso(cp['soluong'] * cp['giamtc'], 0)
        # test
        for cp in dl:
            print(f"on_cpvl={cp}")
        self.on_cpvl = dl.copy()

    def qton_tl(self):
        sql = (
            f"Select cp.chiphiid,cp.diengiai as mota,cp.dvt,qt.sl2 as soluong,qt.dongia as gia"
            f" From dbo.chiphi cp RIGHT JOIN {self.schema}.qt35 qt ON cp.chiphiid=qt.chiphiid"
            f" Where (qt.maqt='{self.maqt}' And cp.mapl1 Like 'TL%') Order By qt.maqtgt"
        )
        dl = runsql(sql)
        if (dl != None and len(dl) > 0):
            pass
        else:
            dl = [{'chiphiid': '001', 'mota': 'Gạch hình sin', 'dvt': 'm2',
                   'soluong': 0.35, 'gia': 412000},
                  {'chiphiid': '002', 'mota': '- Đào bốc mặt đường nhựa', 'dvt': 'm2',
                   'soluong': 2.4, 'gia': 890000},
                  {'chiphiid': '001', 'mota': 'Gạch hình sin', 'dvt': 'm2',
                   'soluong': 0.35, 'gia': 412000},
                  {'chiphiid': '002', 'mota': '- Đào bốc mặt đường nhựa', 'dvt': 'm2',
                   'soluong': 2.4, 'gia': 890000},
                  ]
        # load gia
        # tinh tien
        for cp in dl:
            cp['sl_on'] = cp['soluong']
            cp['tien_on'] = lamtronso(cp['soluong'] * cp['gia'], 0)
        # test
        for cp in dl:
            print(f"on_cptl={cp}")
        self.on_cptl = dl.copy()

    def tlmd(self):
        dl = {}
        for cp in self.oc_cptl:
            k = cp['chiphiid']
            rec = {'chiphiid': k, 'machiphi': '', 'mota': '', 'dvt': '',
                   'sl_oc': 0, 'sl_on': 0, 'gia': 0, 'tien_oc': 0, 'tien_on': 0}
            for _k in cp:
                rec[_k] = cp[_k]
            dl[k] = rec
        for cp in self.on_cptl:
            k = cp['chiphiid']
            rec = {'chiphiid': k, 'machiphi': '', 'mota': '', 'dvt': '',
                   'sl_oc': 0, 'sl_on': 0, 'gia': 0, 'tien_oc': 0, 'tien_on': 0}
            for _k in cp:
                rec[_k] = cp[_k]
            dl[k] = rec
        # convert to list
        tam = []
        ocztl = 0
        onztl = 0
        for cp in dl:
            rec = dl[cp]
            if (rec['sl_oc']+rec['sl_on']) > 0:
                ocztl += rec['tien_oc']
                onztl += rec['tien_on']
                tam.append(rec)
        # test
        for cp in dl:
            print(f"cptl={cp}")
        self.cptl = tam.copy()
        self.ocztl = ocztl
        self.onztl = onztl

    def get_chiphiquanly(self):
        sql = (
            f"Select top 1 1 as vl,heso_nc as nc, heso_mtc as mtc,heso_ttpk as tructiepkhac,"
            f" giantiepkhac,heso_cpchung as chung,heso_thunhaptt as thutinhtruoc,"
            f" heso_khaosat as khaosat, heso_thietke as thietke, heso_gstc as giamsat"
            f" From dbo.hesochiphi Where hesoid={self.cpqlid}"
        )
        dl = runsql(sql)
        if (dl != None and len(dl) > 0):
            dl = dl[0]
        else:
            dl = {"hesoid": 20200721, "vl": 1, "nc": 1, "mtc": 1, "chung": 0.055, "tructiepkhac": 0,
                  "giantiepkhac": 0.02, "thutinhtruoc": 0.055, "khaosat": 0.0207, "thietke": 1.2, "giamsat": 0.02566}
        self.vl = dl['vl']
        self.nc = dl['nc']
        self.mtc = dl['mtc']
        self.tructiepkhac = dl['tructiepkhac']
        self.chung = dl['chung']
        self.giantiepkhac = dl['giantiepkhac']
        self.thutinhtruoc = dl['thutinhtruoc']
        self.khaosat = dl['khaosat']
        self.thietke = dl['thietke']
        self.giamsat = dl['giamsat']
        # ong cai
        self.ocvl = lamtronso(self.oczvl * self.vl, 0)
        self.ocnc = lamtronso(self.ocznc * self.nc, 0)
        self.ocmtc = lamtronso(self.oczmtc * self.mtc, 0)
        self.oczvlncmtc = self.ocvl + self.ocnc + self.ocmtc
        self.octructiepkhac = lamtronso(
            self.oczvlncmtc * self.tructiepkhac, 0)
        self.octructiep = self.oczvlncmtc + self.octructiepkhac
        self.occhung = lamtronso(self.octructiep * self.chung, 0)
        self.ocgiantiepkhac = lamtronso(
            self.octructiep * self.giantiepkhac, 0)
        self.ocgiantiep = self.occhung + self.ocgiantiepkhac
        self.ocgiaxaydung = self.octructiep + self.ocgiantiep
        self.octhutinhtruoc = lamtronso(
            self.ocgiaxaydung * self.thutinhtruoc, 0)
        self.ocxaydungtruocthue = self.ocgiaxaydung + self.octhutinhtruoc
        self.ockhaosatthietke = lamtronso(
            self.ocxaydungtruocthue * self.khaosat * self.thietke, 0)
        self.ocgiamsat = lamtronso(self.ocxaydungtruocthue * self.giamsat, 0)
        self.octuvan = self.ockhaosatthietke + self.ocgiamsat
        self.octongxaydungtruocthue = self.ocxaydungtruocthue + self.octuvan
        self.octhuetongxaydung = lamtronso(
            self.octongxaydungtruocthue * 10/100, 0)
        self.octongxaydung = self.octongxaydungtruocthue + self.octhuetongxaydung
        self.occongtrinh = self.octongxaydung + self.ocztl
        # ong nganh
        self.onvl = lamtronso(self.onzvl * self.vl, 0)
        self.onnc = lamtronso(self.onznc * self.nc, 0)
        self.onmtc = lamtronso(self.onzmtc * self.mtc, 0)
        self.onzvlncmtc = self.onvl + self.onnc + self.onmtc
        self.ontructiepkhac = lamtronso(
            self.onzvlncmtc * self.tructiepkhac, 0)
        self.ontructiep = self.onzvlncmtc + self.ontructiepkhac
        self.onchung = lamtronso(self.ontructiep * self.chung, 0)
        self.ongiantiepkhac = lamtronso(
            self.ontructiep * self.giantiepkhac, 0)
        self.ongiantiep = self.onchung + self.ongiantiepkhac
        self.ongiaxaydung = self.ontructiep + self.ongiantiep
        self.onthutinhtruoc = lamtronso(
            self.ongiaxaydung * self.thutinhtruoc, 0)
        self.onxaydungtruocthue = self.ongiaxaydung + self.onthutinhtruoc
        self.onkhaosatthietke = lamtronso(
            self.onxaydungtruocthue * self.khaosat * self.thietke, 0)
        self.ongiamsat = lamtronso(self.onxaydungtruocthue * self.giamsat, 0)
        self.ontuvan = self.onkhaosatthietke + self.ongiamsat
        self.ontongxaydungtruocthue = self.onxaydungtruocthue + self.ontuvan
        self.onthuetongxaydung = lamtronso(
            self.ontongxaydungtruocthue * 10/100, 0)
        self.ontongxaydung = self.ontongxaydungtruocthue + self.onthuetongxaydung
        self.oncongtrinh = self.ontongxaydung + self.onztl
        # tong
        self.xaydung = self.octongxaydung + self.ontongxaydung
        self.tailap = self.ocztl + self.onztl
        self.congtrinh = self.xaydung + self.tailap
        self.congtrinhtruocthue = lamtronso(self.congtrinh*100/110, 0)
        self.thuecongtrinh = self.congtrinh - self.congtrinhtruocthue
        if (self.octongxaydung*self.ontongxaydung) > 0:
            self.maubaocao = 'o2'
        elif self.octongxaydung > 0:
            self.maubaocao = 'oc'
        else:
            self.maubaocao = 'on'


class Phui_20200721:
    def __init__(self, phui):
        # phui=[{macptl,dai,rong,sau}]
        dl = []
        for cp in phui:
            if not cp['dai']:
                cp['dai'] = 0
            if not cp['rong']:
                cp['rong'] = 0
            if not cp['sau']:
                cp['sau'] = 0
            cp['dientich'] = cp['dai']*cp['rong']
            cp['chuvi'] = (cp['dai']+cp['rong'])*2
            cp['thetich'] = cp['dai']*cp['rong']*cp['sau']
            if cp['thetich'] > 0:
                dl.append(cp)
        self.phui = dl
        self.tinhphui()

    def tinhphui(self):
        self.tinh_cat_matnhua_btxm_gach()
        self.tinh_dao_boc_matnhua_thucong()
        self.tinh_dao_boc_btxm_thucong()
        self.tinh_pha_do_nen_gach()
        self.tinh_dao_phui_dat_cap3_thucong()
        self.tinh_dao_phui_dat_cap2_thucong()
        self.tinh_cong_traicat()
        self.tinh_cong_traican_dadam4x6()
        self.tinh_dao_boc_gach_vua()
        self.tinh_vanchuyen_dat_cap3_thucong()
        self.tinh_vanchuyen_dat_cap2_thucong()
        self.tinh_cpxd()
        self.tinh_cpvl()

    def tinh_cat_matnhua_btxm_gach(self):
        kl = 0
        for cp in self.phui:
            if cp['macptl'] in ['nhua_12cm', 'nhua_10cm']:
                kl += cp['chuvi']
            elif cp['macptl'] in ['duong_btxm', 'hem_btxm']:
                kl += cp['chuvi']
            elif cp['macptl'] in ['duong_daxanh', 'duong_datda']:
                pass
            elif cp['macptl'] in ['le_datda', 'le_datthuong']:
                pass
            elif cp['macptl'] in ['le_gachterrazzo', 'le_dagranit']:
                kl += cp['chuvi']
            elif cp['macptl'] in ['le_gachconsau', 'le_gachhinhsin']:
                kl += cp['chuvi']
            elif cp['macptl'] in ['le_btxm', 'le_ximang']:
                kl += cp['chuvi']
            elif cp['macptl'] in ['le_gachbeton_tuchen_M400']:
                kl += cp['chuvi']
            elif cp['macptl'] in ['le_daxe']:
                kl += cp['chuvi']
            else:
                pass
        self.cat_matnhua_btxm_gach = lamtronso(kl, 3)

    def tinh_dao_boc_matnhua_thucong(self):
        kl = 0
        for cp in self.phui:
            if cp['macptl'] in ['nhua_12cm']:
                heso = 0.12
            elif cp['macptl'] in ['nhua_10cm']:
                heso = 0.1
            else:
                heso = 0
            kl += cp['dientich'] * heso
        self.dao_boc_matnhua_thucong = lamtronso(kl, 3)

    def tinh_dao_boc_btxm_thucong(self):
        kl = 0
        for cp in self.phui:
            if cp['macptl'] in ['hem_btxm', 'duong_btxm']:
                heso = 0.1
            elif cp['macptl'] in ['le_btxm', 'le_ximang', 'le_daxe']:
                heso = 0.1
            elif cp['macptl'] in ['le_dagranit', 'le_gachterrazzo']:
                heso = 0.05
            else:
                heso = 0
            kl += cp['dientich'] * heso
        self.dao_boc_btxm_thucong = lamtronso(kl, 3)

    def tinh_pha_do_nen_gach(self):
        kl = 0
        for cp in self.phui:
            if cp['macptl'] in ['le_dagranit', 'le_gachterrazzo']:
                kl += cp['dientich']
            elif cp['macptl'] in ['le_gachconsau', 'le_gachhinhsin']:
                kl += cp['dientich']
            elif cp['macptl'] in ['le_gachbeton_tuchen_M400', 'le_daxe']:
                kl += cp['dientich']
            else:
                pass
        self.pha_do_nen_gach = lamtronso(kl, 3)

    def tinh_dao_phui_dat_cap3_thucong(self):
        kl = 0
        self.dat_cap3_khongvanchuyen = 0
        for cp in self.phui:
            if cp['macptl'] in ['nhua_12cm']:
                heso = 0.25
            elif cp['macptl'] in ['nhua_10cm']:
                heso = 0.25
            elif cp['macptl'] in ['duong_btxm', 'hem_btxm']:
                heso = 0.2
            elif cp['macptl'] in ['duong_daxanh', 'duong_datda']:
                heso = 0.35
            elif cp['macptl'] in ['le_datda', 'le_datthuong']:
                heso = 0.35
                self.dat_cap3_khongvanchuyen = lamtronso(cp['dientich']*0.1, 3)
            elif cp['macptl'] in ['le_gachterrazzo', 'le_dagranit']:
                heso = 0.1
            elif cp['macptl'] in ['le_gachconsau', 'le_gachhinhsin']:
                heso = 0
            elif cp['macptl'] in ['le_btxm', 'le_ximang']:
                heso = 0.1
            elif cp['macptl'] in ['le_gachbeton_tuchen_M400']:
                heso = 0.1
            elif cp['macptl'] in ['le_daxe']:
                heso = 0.1
            else:
                heso = 0
            kl += cp['dientich'] * heso
        self.dao_phui_dat_cap3_thucong = lamtronso(kl, 3)

    def tinh_dao_phui_dat_cap2_thucong(self):
        kl = 0
        for cp in self.phui:
            if cp['macptl'] in ['nhua_12cm']:
                heso = cp['sau'] - 0.37
            elif cp['macptl'] in ['nhua_10cm']:
                heso = cp['sau'] - 0.35
            elif cp['macptl'] in ['duong_btxm', 'hem_btxm']:
                heso = cp['sau'] - 0.3
            elif cp['macptl'] in ['duong_daxanh', 'duong_datda']:
                heso = cp['sau'] - 0.35
            elif cp['macptl'] in ['le_datda', 'le_datthuong']:
                heso = 0.35
            elif cp['macptl'] in ['le_dagranit']:
                heso = cp['sau'] - 0.2
            elif cp['macptl'] in ['le_gachterrazzo']:
                heso = cp['sau'] - 0.195
            elif cp['macptl'] in ['le_gachconsau', 'le_gachhinhsin']:
                heso = cp['sau'] - 0.4 + 0.3
            elif cp['macptl'] in ['le_btxm', 'le_ximang']:
                heso = cp['sau'] - 0.2
            elif cp['macptl'] in ['le_gachbeton_tuchen_M400']:
                heso = cp['sau'] - 0.35 + 0.05
            elif cp['macptl'] in ['le_daxe']:
                heso = cp['sau'] - 0.245
            else:
                heso = 0
            kl += cp['dientich'] * heso
        self.dao_phui_dat_cap2_thucong = lamtronso(kl, 3)

    def tinh_cong_traicat(self):
        kl = self.dao_phui_dat_cap2_thucong
        self.cong_traicat = lamtronso(kl, 3)

    def tinh_cong_traican_dadam4x6(self):
        kl = 0
        for cp in self.phui:
            if cp['macptl'] in ['nhua_12cm']:
                heso = 0.25
            elif cp['macptl'] in ['nhua_10cm']:
                heso = 0.25
            elif cp['macptl'] in ['duong_btxm', 'hem_btxm']:
                heso = 0.2
            elif cp['macptl'] in ['duong_daxanh', 'duong_datda']:
                heso = 0.25
            elif cp['macptl'] in ['le_datda', 'le_datthuong']:
                heso = 0.25
            elif cp['macptl'] in ['le_gachterrazzo', 'le_dagranit']:
                heso = 0.1
            elif cp['macptl'] in ['le_gachconsau', 'le_gachhinhsin']:
                heso = 0
            elif cp['macptl'] in ['le_btxm', 'le_ximang']:
                heso = 0.1
            elif cp['macptl'] in ['le_gachbeton_tuchen_M400']:
                heso = 0.1
            elif cp['macptl'] in ['le_daxe']:
                heso = 0.1
            else:
                heso = 0
            kl += cp['dientich'] * heso
        self.cong_traican_dadam4x6 = lamtronso(kl*heso, 3)

    def tinh_dao_boc_gach_vua(self):
        kl = 0
        for cp in self.phui:
            if cp['macptl'] in ['le_gachterrazzo', 'le_dagranit']:
                heso = 0.03 + 0.015
            elif cp['macptl'] in ['le_gachconsau', 'le_gachhinhsin']:
                heso = 0.1
            elif cp['macptl'] in ['le_gachbeton_tuchen_M400']:
                heso = 0.1
            elif cp['macptl'] in ['le_daxe']:
                heso = 0.03 + 0.015
            else:
                heso = 0
            kl += cp['dientich'] * heso
            print(f"dao_boc_gach_vua[{cp['macptl']}]={cp['dientich'] * heso}")
        self.dao_boc_gach_vua = lamtronso(kl, 3)

    def tinh_vanchuyen_dat_cap3_thucong(self):
        kl = self.dao_phui_dat_cap3_thucong
        kl += self.dao_boc_matnhua_thucong
        kl += self.dao_boc_btxm_thucong
        kl += self.dao_boc_gach_vua
        self.vanchuyen_dat_cap3_thucong = lamtronso(
            kl, 3) - self.dat_cap3_khongvanchuyen

    def tinh_vanchuyen_dat_cap2_thucong(self):
        kl = self.dao_phui_dat_cap2_thucong
        self.vanchuyen_dat_cap2_thucong = lamtronso(kl, 3)

    def tinh_cpxd(self):
        cpxd = []
        cpxd.append({'macpxd': '01', 'soluong': self.cat_matnhua_btxm_gach})
        cpxd.append({'macpxd': '02', 'soluong': self.dao_boc_matnhua_thucong})
        cpxd.append({'macpxd': '03', 'soluong': self.dao_boc_btxm_thucong})
        cpxd.append({'macpxd': '04', 'soluong': self.pha_do_nen_gach})
        cpxd.append(
            {'macpxd': '05', 'soluong': self.dao_phui_dat_cap3_thucong})
        cpxd.append(
            {'macpxd': '06', 'soluong': self.dao_phui_dat_cap2_thucong})
        cpxd.append(
            {'macpxd': '07', 'soluong': self.vanchuyen_dat_cap3_thucong})
        cpxd.append(
            {'macpxd': '08', 'soluong': self.vanchuyen_dat_cap2_thucong})
        cpxd.append({'macpxd': '09', 'soluong': self.cong_traicat})
        cpxd.append({'macpxd': '10', 'soluong': self.cong_traican_dadam4x6})
        self.cpxd = cpxd

    def tinh_cpvl(self):
        dm = 1.22
        self.catsanlap = lamtronso(self.cong_traicat*dm, 3)
        dm = 1.32
        self.dadam4x6 = lamtronso(self.cong_traican_dadam4x6*dm, 3)
        dm = 0.0035 + 0.0025
        self.luoicatbeton365mm = lamtronso(self.cat_matnhua_btxm_gach*dm, 3)
        cpvl = []
        cpvl.append({'macpvl': '01', 'soluong': self.catsanlap})
        cpvl.append({'macpvl': '02', 'soluong': self.dadam4x6})
        self.cpvl = cpvl


def test_phui():
    phui = [{'macptl': 'nhua_10cm', 'dai': 0.5, 'rong': 0.5, 'sau': 1},
            {'macptl': 'nhua_12cm', 'dai': 0, 'rong': 0.3, 'sau': 0.6},
            {'macptl': 'nhua_10cm', 'dai': 1, 'rong': 0.3, 'sau': 0.6},
            {'macptl': 'le_gachterrazzo', 'dai': 0, 'rong': 0.3, 'sau': 0.6},
            {'macptl': 'duong_datda', 'dai': 0, 'rong': 0.3, 'sau': 0.6},
            {'macptl': 'hem_btxm', 'dai': 1, 'rong': 0.3, 'sau': 0.6}
            ]
    kq = Phui_20200721(phui)
    print(vars(kq))
