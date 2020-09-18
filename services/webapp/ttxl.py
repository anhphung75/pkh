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
        self.get_tttt()
        self.hoso()
        self.dot()
        self.get_khachhang()
        self.donvithicong()
        self.qtoc_xd()
        self.qtoc_vt()
        self.qtoc_vl()
        self.qtoc_tl()
        self.qton_xd()
        self.qton_vt()
        self.qton_vl()
        self.qton_tl()
        self.tlmd()
        print(f"ttxl cptl={self.cptl}")
        self.qtgt()
        self.chiphiquanly()

    def get_tttt(self):
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

    def get_khachhang(self):
        dl = {'khachhang': 'Nguyễn Lan Chi', }
        self.khachhang = dl['khachhang']

    def donvithicong(self):
        dl = {'dvtc': 'ĐỘI QLML CẤP NƯỚC QUẬN THỦ ĐỨC', }
        self.dvtc = dl['dvtc']

    def qtoc_xd(self):
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
            cp['tienvl'] = lamtronso(cp['soluong'] * cp['giavl'], 0)
            cp['tiennc'] = lamtronso(cp['soluong'] * cp['gianc'], 0)
            cp['tienmtc'] = lamtronso(cp['soluong'] * cp['giamtc'], 0)
        self.oc_cpvl = dl.copy()

    def qtoc_tl(self):
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
        for cp in dl:
            rec = dl[cp]
            if (rec['sl_oc']+rec['sl_on']) > 0:
                tam.append(rec)
        self.cptl = tam.copy()

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
              'oczvl': 0, 'ocznc': 0, 'oczmtc': 0, 'ocztl': 0,
              'onzvl': 88889998888, 'onznc': 8888998888, 'onzmtc': 0, 'onztl': 0,
              'ktcpcty': 9999277584, 'ktcpkhach': 0}
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
        self.tinh_vatlieu()

    def tinh_cat_matnhua_btxm_gach(self):
        kl = 0
        for cp in self.phui:
            if cp['macptl'] in ['nhua_155mm', 'nhua_120mm', 'nhua_100mm']:
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
            elif cp['macptl'] in ['le_btxm']:
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
            if cp['macptl'] in ['nhua_155mm', 'nhua_120mm', 'nhua_100mm']:
                heso = 0.12
            else:
                heso = 0
            kl += cp['dientich'] * heso
        self.dao_boc_matnhua_thucong = lamtronso(kl, 3)

    def tinh_dao_boc_btxm_thucong(self):
        kl = 0
        for cp in self.phui:
            if cp['macptl'] in ['le_btxm', 'hem_btxm', 'duong_btxm', 'le_daxe']:
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
            if cp['macptl'] in ['le_dagranit', 'le_gachterrazzo', 'le_gachconsau', 'le_gachhinhsin', 'le_daxe']:
                kl += cp['dientich']
        self.pha_do_nen_gach = lamtronso(kl, 3)

    def tinh_dao_phui_dat_cap3_thucong(self):
        kl = 0
        for cp in self.phui:
            if cp['macptl'] in ['nhua_155mm']:
                heso = 0.55
            elif cp['macptl'] in ['nhua_120mm']:
                heso = 0.4
            elif cp['macptl'] in ['nhua_100mm']:
                heso = 0.25
            elif cp['macptl'] in ['duong_btxm', 'hem_btxm']:
                heso = 0.2
            elif cp['macptl'] in ['duong_daxanh', 'duong_datda']:
                heso = 0.35
            elif cp['macptl'] in ['le_datda', 'le_datthuong']:
                heso = 0.35
            elif cp['macptl'] in ['le_gachterrazzo', 'le_dagranit']:
                heso = 0.1
            elif cp['macptl'] in ['le_gachconsau', 'le_gachhinhsin']:
                heso = 0
            elif cp['macptl'] in ['le_btxm']:
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
            if cp['macptl'] in ['nhua_155mm']:
                heso = cp['sau'] - 0.67
            elif cp['macptl'] in ['nhua_120mm']:
                heso = cp['sau'] - 0.52
            elif cp['macptl'] in ['nhua_100mm']:
                heso = cp['sau'] - 0.37
            elif cp['macptl'] in ['duong_btxm', 'hem_btxm']:
                heso = cp['sau'] - 0.3
            elif cp['macptl'] in ['duong_daxanh', 'duong_datda']:
                heso = cp['sau'] - 0.35
            elif cp['macptl'] in ['le_datda', 'le_datthuong']:
                heso = 0
            elif cp['macptl'] in ['le_gachterrazzo', 'le_dagranit']:
                heso = cp['sau'] - 0.195
            elif cp['macptl'] in ['le_gachconsau', 'le_gachhinhsin']:
                heso = cp['sau'] - 0.4 + 0.3
            elif cp['macptl'] in ['le_btxm']:
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
            if cp['macptl'] in ['nhua_155mm']:
                heso = 0.55
            elif cp['macptl'] in ['nhua_120mm']:
                heso = 0.4
            elif cp['macptl'] in ['nhua_100mm']:
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
            elif cp['macptl'] in ['le_btxm']:
                heso = 0.1
            elif cp['macptl'] in ['le_gachbeton_tuchen_M400']:
                heso = 0.1
            elif cp['macptl'] in ['le_daxe']:
                heso = 0.1
            else:
                heso = 0
            kl += cp['dientich'] * heso
            print(
                f"cong_traican_dadam4x6[{cp['macptl']}]={cp['dientich'] * heso}")
        self.cong_traican_dadam4x6 = lamtronso(kl, 3)

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
        self.vanchuyen_dat_cap3_thucong = lamtronso(kl, 3)

    def tinh_vanchuyen_dat_cap2_thucong(self):
        kl = self.dao_phui_dat_cap2_thucong
        self.vanchuyen_dat_cap2_thucong = lamtronso(kl, 3)

    def tinh_vatlieu(self):
        dm = 1.22
        self.catsanlap = lamtronso(self.cong_traicat*dm, 3)
        dm = 1.32
        self.dadam4x6 = lamtronso(self.cong_traican_dadam4x6*dm, 3)
        dm = 0.0035 + 0.0025
        self.luoicatbeton365mm = lamtronso(self.cat_matnhua_btxm_gach*dm, 3)


# test
phui = [{'macptl': 'nhua_100mm', 'dai': 0.5, 'rong': 0.5, 'sau': 0.8},
        {'macptl': 'nhua_120mm', 'dai': 0, 'rong': 0.3, 'sau': 0.6},
        {'macptl': 'nhua_100mm', 'dai': 0.5, 'rong': 0.3, 'sau': 0.6},
        {'macptl': 'le_gachterrazzo', 'dai': 0, 'rong': 0.3, 'sau': 0.6},
        {'macptl': 'duong_datda', 'dai': 0, 'rong': 0.3, 'sau': 0.6},
        {'macptl': 'hem_btxm', 'dai': 0, 'rong': 0.3, 'sau': 0.6}
        ]
kq = Phui_20200721(phui)
print(vars(kq))
