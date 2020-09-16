import datetime
import json
import arrow

from sqlalchemy import func, desc
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


class RptQtgt:
    def __init__(self, maqt):
        self.maqt = maqt
        self.load_qtgt()

    def load_qtgt(self):
        self.tttt()
        self.hoso()
        self.dot()
        self.khachhang()
        self.donvithicong()
        self.qtoc_xd()
        self.qtoc_vt()
        self.qtoc_vl()
        self.qtoc_tl()
        self.qton_xd()
        self.qton_vt()
        self.qton_vl()
        self.qton_tl()
        self.qtgt()
        self.chiphiquanly()

    def tttt(self):
        dl = {"maqt": "pkh002", "madot": "2020gmmp242", "mahoso": "113344",
              "makhachhang": "2020kh001", "madvtc": "qlmltd"}
        self.tttt = dl

    def hoso(self):
        dl = {
            'sohoso': 'GM01001/20',
            'diachigandhn': '25/5/4A- Đường 9- Kp.5- P.Linh Xuân- Q.TĐ', }
        self.sohoso = dl['sohoso']
        self.diachigandhn = dl['diachigandhn']

    def dot(self):
        dl = {'sodot': '999/2020MP', }
        self.sodot = dl['sodot']

    def khachhang(self):
        dl = {'khachhang': 'Nguyễn Lan Chi', }
        self.khachhang = dl['khachhang']

    def donvithicong(self):
        dl = {'dvtc': 'ĐỘI QLML CẤP NƯỚC QUẬN THỦ ĐỨC', }
        self.dvtc = dl['dvtc']

    def qtoc_xd(self):
        dl = [
            {'chiphiid': '001', 'mota': '- Chi phí ống cái', 'dvt': 'mét',
             'soluong': 16, 'giavl': 6510, 'gianc': 13174, 'giamtc': 5815,
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
        self.oc_cpxd = dl.copy()

    def qtoc_vt(self):
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
        self.oc_cpvt = dl.copy()

    def qtoc_vl(self):
        dl = [
            {'chiphiid': '001', 'mota': 'Cát san lấp', 'dvt': 'm3',
             'soluong': 0.763, 'giavl': 133900, 'gianc': 47904, 'giamtc': 0,
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
        self.oc_cpvl = dl.copy()

    def qtoc_tl(self):
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
            cp['sl_oc'] = cp['soluong']
            cp['tien_oc'] = lamtronso(cp['soluong'] * cp['gia'], 0)
        self.oc_cptl = dl.copy()

    def qton_xd(self):
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
        self.on_cpxd = dl.copy()

    def qton_vt(self):
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
        self.on_cpvt = dl.copy()

    def qton_vl(self):
        dl = [
            {'chiphiid': '001', 'mota': 'Cát san lấp', 'dvt': 'm3',
             'soluong': 0.763, 'giavl': 133900, 'gianc': 47904, 'giamtc': 0,
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
        self.on_cpvl = dl.copy()

    def qton_tl(self):
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
        self.on_cptl = dl.copy()

    def chiphiquanly(self):
        dl = {"hesoid": 20200721, "vl": 1, "nc": 1, "mtc": 1, "chung": 0.055, "tructiepkhac": 0, "giantiepkhac": 0.02, "thutinhtruoc": 0.055,
              "khaosat": 0.0207, "thietke": 1.2, "giamsat": 0.02566}
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

    def qtgt(self):
        # load tttt
        dl = {'ngaylap': '20200907', 'macpql': '20200721', 'mabaogia': '20200721',
              'oczvl': 4894054, 'ocznc': 1596281, 'oczmtc': 61084, 'ocztl': 691200,
              'onzvl': 0, 'onznc': 0, 'onzmtc': 0, 'onztl': 0,
              'ktcpcty': 9999277584, 'ktcpkhach': 9199277584}
        if 'tl' in self.maqt.lower():
            self.tieude = 'BẢNG QUYẾT TOÁN TÁI LẬP DANH BỘ'
        else:
            self.tieude = 'BẢNG QUYẾT TOÁN GẮN MỚI ĐỒNG HỒ NƯỚC'
        self.ngaylap = dl['ngaylap']
        self.oczvl = dl['oczvl']
        self.ocznc = dl['ocznc']
        self.oczmtc = dl['oczmtc']
        self.ocztl = dl['ocztl']
        self.onzvl = dl['onzvl']
        self.onznc = dl['onznc']
        self.onzmtc = dl['onzmtc']
        self.onztl = dl['onztl']
        self.ktcpcty = dl['ktcpcty']
        self.ktcpkhach = dl['ktcpkhach']
        self.mabaogia = dl['mabaogia']
