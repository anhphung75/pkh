import datetime
import decimal
import arrow
import json

#from sqlalchemy import func, desc
from ttdl import Maychu, run_mssql
from utils import lamtronso


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
    mssql = Maychu("mssql", "PKH.TCTB", "123456789",
                   "192.168.24.4:1433", "PKHData")
    try:
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
    except:
        return None


class RptQtgt:
    def __init__(self, schema='qlmltd', maqt=''):
        self.schema = schema
        self.maqt = maqt
        self.maubaocao = 'on'
        if 'tl' in maqt.lower():
            self.tieude = 'BẢNG QUYẾT TOÁN TÁI LẬP DANH BỘ'
        else:
            self.tieude = "BẢNG QUYẾT TOÁN GẮN MỚI ĐỒNG HỒ NƯỚC"
        self.ngaylap = 99990101
        self.gxd = 0
        self.tiencty = 0
        self.tienkhach = 0
        self.tt = 1
        self.oczvl = 0
        self.ocznc = 0
        self.oczmtc = 0
        self.ocztl = 0
        self.onzvl = 0
        self.onznc = 0
        self.onzmtc = 0
        self.onztl = 0
        self.madot = ""
        self.hosoid = 0
        self.mabaogia = 99990101
        self.plgia = "dutoan"
        self.cpqlid = 0
        self.hesoid = 0
        self.sohoso = ""
        self.diachigandhn = ""
        self.khachhang = ""
        self.sodot = ""
        self.dvtcid = 0
        self.dvtc = "ĐỘI QLML CẤP NƯỚC QUẬN THỦ ĐỨC"
        self.oc_cpxd = []
        self.oc_cpvt = []
        self.oc_cpvl = []
        self.on_cpxd = []
        self.on_cpvt = []
        self.on_cpvl = []
        self.cptl = []
        # cpql
        self.vl = 0
        self.nc = 0
        self.mtc = 0
        self.tructiepkhac = 0
        self.chung = 0
        self.giantiepkhac = 0
        self.thutinhtruoc = 0
        self.khaosat = 0
        self.thietke = 0
        self.giamsat = 0
        # ong cai
        self.ocvl = 0
        self.ocnc = 0
        self.ocmtc = 0
        self.oczvlncmtc = 0
        self.octructiepkhac = 0
        self.octructiep = 0
        self.occhung = 0
        self.ocgiantiepkhac = 0
        self.ocgiantiep = 0
        self.ocgiaxaydung = 0
        self.octhutinhtruoc = 0
        self.ocxaydungtruocthue = 0
        self.ockhaosatthietke = 0
        self.ocgiamsat = 0
        self.octuvan = 0
        self.octongxaydungtruocthue = 0
        self.octhuetongxaydung = 0
        self.octongxaydung = 0
        self.occongtrinh = 0
        # ong nganh
        self.onvl = 0
        self.onnc = 0
        self.onmtc = 0
        self.onzvlncmtc = 0
        self.ontructiepkhac = 0
        self.ontructiep = 0
        self.onchung = 0
        self.ongiantiepkhac = 0
        self.ongiantiep = 0
        self.ongiaxaydung = 0
        self.onthutinhtruoc = 0
        self.onxaydungtruocthue = 0
        self.onkhaosatthietke = 0
        self.ongiamsat = 0
        self.ontuvan = 0
        self.ontongxaydungtruocthue = 0
        self.onthuetongxaydung = 0
        self.ontongxaydung = 0
        self.oncongtrinh = 0
        # tong
        self.xaydung = 0
        self.tailap = 0
        self.congtrinh = 0
        self.congtrinhtruocthue = 0
        self.thuecongtrinh = 0
        self.get_qtgt()

    def get_qtgt(self):
        self.tbl_qtgt()
        self.tbl_hoso()
        self.tbl_dot()
        self.tbl_donvithicong()
        self.qtoc_xd()
        self.qtoc_vt()
        self.qtoc_vl()
        self.qton_xd()
        self.qton_vt()
        self.qton_vl()
        self.tlmd()
        self.get_chiphiquanly()

    def tbl_qtgt(self):
        sql = (
            f"Select top 1 madot,ngaylap,isnull(plgia,'dutoan') as plgia,isnull(tt,1) as tt,"
            f" isnull(dautucty,0) as tiencty, isnull(dautukhach,0) as tienkhach,isnull(gxd,0) as gxd,"
            f" convert(datetime,baogiaid) as mabaogia,isnull(hesoid,0) as cpqlid,isnull(hosoid,0) as hosoid"
            f" From {self.schema}.qt qt"
            f" Where (qt.maqt='{self.maqt}' And datalength(qt.madot)>0)"
        )
        dl = runsql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return
        dl = dl[0]
        self.ngaylap = dl['ngaylap']
        self.gxd = dl['gxd']
        self.tiencty = dl['tiencty']
        self.tienkhach = dl['tienkhach']
        self.tt = dl['tt']
        self.madot = dl['madot']
        self.hosoid = dl['hosoid']
        self.mabaogia = dl['mabaogia']
        self.plgia = dl['plgia']
        self.cpqlid = dl['cpqlid']
        self.hesoid = self.cpqlid
        # test
        print(f"qtgt dl={dl}")

    def tbl_hoso(self):
        sql = (
            f"Select top 1 sohoso, diachikhachhang as diachigandhn, khachhang From dbo.hoso"
            f" Where (hosoid='{self.hosoid}')"
        )
        dl = runsql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return
        dl = dl[0]
        self.sohoso = dl['sohoso']
        self.diachigandhn = dl['diachigandhn']
        self.khachhang = dl['khachhang']
        # test
        for cp in dl:
            print(f"hoso={dl[cp]}")

    def tbl_dot(self):
        sql = (
            f"Select top 1 sodot, isnull(nhathauid,0) as dvtcid From dbo.dot"
            f" Where (madot='{self.madot}')"
        )
        dl = runsql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return
        dl = dl[0]
        self.sodot = dl["sodot"]
        self.dvtcid = dl["dvtcid"]
        # test
        for cp in dl:
            print(f"dot {cp}={dl[cp]}")

    def tbl_donvithicong(self):
        sql = (
            f"Select top 1 ten as dvtc From dbo.nhathau"
            f" Where (nhathauid='{self.dvtcid}')"
        )
        dl = runsql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return
        dl = dl[0]
        self.dvtc = dl['dvtc']
        # test
        for cp in dl:
            print(f"dvtc={dl[cp]}")
        self.dvtc = dl['dvtc']

    def qtoc_xd(self):
        sql = (
            f"Select cp.chiphiid,cp.diengiai as mota,cp.dvt,isnull(qt.soluong,0) as soluong,"
            f" isnull(qt.giavl,0) as giavl,isnull(qt.gianc,0) as gianc,isnull(qt.giamtc,0) as giamtc"
            f" From dbo.chiphi cp RIGHT JOIN {self.schema}.qt31 qt ON cp.chiphiid=qt.chiphiid"
            f" Where (qt.maqt='{self.maqt}' And datalength(cp.chiphiid)>0) Order By qt.maqtgt"
        )
        dl = runsql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return
        # load gia
        # tinh tien
        for cp in dl:
            cp['tienvl'] = lamtronso(cp['soluong'] * cp['giavl'], 0)
            cp['tiennc'] = lamtronso(cp['soluong'] * cp['gianc'], 0)
            cp['tienmtc'] = lamtronso(cp['soluong'] * cp['giamtc'], 0)
            self.oczvl += cp['tienvl']
            self.ocznc += cp['tiennc']
            self.oczmtc += cp['tienmtc']
        self.oc_cpxd = dl
        # test
        for cp in dl:
            print(f"oc_cpxd={cp}")

    def qtoc_vt(self):
        sql = (
            f"Select cp.chiphiid,cp.diengiai as mota,cp.dvt,isnull(qt.soluong,0) as soluong,"
            f" isnull(qt.giavl,0) as giavl,isnull(qt.gianc,0) as gianc,isnull(qt.giamtc,0) as giamtc"
            f" From dbo.chiphi cp RIGHT JOIN {self.schema}.qt32 qt ON cp.chiphiid=qt.chiphiid"
            f" Where (qt.maqt='{self.maqt}' And cp.mapl1 Like 'VT%' And datalength(cp.chiphiid)>0)"
            f" Order By qt.maqtgt"
        )
        dl = runsql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return
        # load gia
        # tinh tien
        for cp in dl:
            cp['tienvl'] = lamtronso(cp['soluong'] * cp['giavl'], 0)
            cp['tiennc'] = lamtronso(cp['soluong'] * cp['gianc'], 0)
            cp['tienmtc'] = lamtronso(cp['soluong'] * cp['giamtc'], 0)
            self.oczvl += cp['tienvl']
            self.ocznc += cp['tiennc']
            self.oczmtc += cp['tienmtc']
        self.oc_cpvt = dl
        # test
        for cp in dl:
            print(f"oc_cpvt={cp}")

    def qtoc_vl(self):
        sql = (
            f"Select cp.chiphiid,cp.diengiai as mota,cp.dvt,isnull(qt.soluong,0) as soluong,"
            f" isnull(qt.giavl,0) as giavl,isnull(qt.gianc,0) as gianc,isnull(qt.giamtc,0) as giamtc"
            f" From dbo.chiphi cp RIGHT JOIN {self.schema}.qt32 qt ON cp.chiphiid=qt.chiphiid"
            f" Where (qt.maqt='{self.maqt}' And cp.mapl1 Like 'VL%' And datalength(cp.chiphiid)>0)"
            f" Order By qt.maqtgt"
        )
        dl = runsql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return
        # load gia
        # tinh tien
        for cp in dl:
            cp['tienvl'] = lamtronso(cp['soluong'] * cp['giavl'], 0)
            cp['tiennc'] = lamtronso(cp['soluong'] * cp['gianc'], 0)
            cp['tienmtc'] = lamtronso(cp['soluong'] * cp['giamtc'], 0)
            self.oczvl += cp['tienvl']
            self.ocznc += cp['tiennc']
            self.oczmtc += cp['tienmtc']
        self.oc_cpvl = dl
        # test
        for cp in dl:
            print(f"oc_cpvl={cp}")

    def qton_xd(self):
        sql = (
            f"Select cp.chiphiid,cp.diengiai as mota,cp.dvt,isnull(qt.soluong,0) as soluong,"
            f" isnull(qt.giavl,0) as giavl,isnull(qt.gianc,0) as gianc,isnull(qt.giamtc,0) as giamtc"
            f" From dbo.chiphi cp RIGHT JOIN {self.schema}.qt33 qt ON cp.chiphiid=qt.chiphiid"
            f" Where (qt.maqt='{self.maqt}' And datalength(cp.chiphiid)>0) Order By qt.maqtgt"
        )
        dl = runsql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return
        # load gia
        # tinh tien
        for cp in dl:
            cp['tienvl'] = lamtronso(cp['soluong'] * cp['giavl'], 0)
            cp['tiennc'] = lamtronso(cp['soluong'] * cp['gianc'], 0)
            cp['tienmtc'] = lamtronso(cp['soluong'] * cp['giamtc'], 0)
            self.onzvl += cp['tienvl']
            self.onznc += cp['tiennc']
            self.onzmtc += cp['tienmtc']
        self.on_cpxd = dl
        # test
        for cp in dl:
            print(f"on_cpxd={cp}")

    def qton_vt(self):
        sql = (
            f"Select cp.chiphiid,cp.diengiai as mota,cp.dvt,isnull(qt.soluong,0) as soluong,"
            f" isnull(qt.giavl,0) as giavl,isnull(qt.gianc,0) as gianc,isnull(qt.giamtc,0) as giamtc"
            f" From dbo.chiphi cp RIGHT JOIN {self.schema}.qt34 qt ON cp.chiphiid=qt.chiphiid"
            f" Where (qt.maqt='{self.maqt}' And cp.mapl1 Like 'VT%' And datalength(cp.chiphiid)>0)"
            f" Order By qt.maqtgt"
        )
        dl = runsql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return
        # load gia
        # tinh tien
        for cp in dl:
            cp['tienvl'] = lamtronso(cp['soluong'] * cp['giavl'], 0)
            cp['tiennc'] = lamtronso(cp['soluong'] * cp['gianc'], 0)
            cp['tienmtc'] = lamtronso(cp['soluong'] * cp['giamtc'], 0)
            self.onzvl += cp['tienvl']
            self.onznc += cp['tiennc']
            self.onzmtc += cp['tienmtc']
        self.on_cpvt = dl
        # test
        for cp in dl:
            print(f"on_cpvt={cp}")

    def qton_vl(self):
        sql = (
            f"Select cp.chiphiid,cp.diengiai as mota,cp.dvt,isnull(qt.soluong,0) as soluong,"
            f" isnull(qt.giavl,0) as giavl,isnull(qt.gianc,0) as gianc,isnull(qt.giamtc,0) as giamtc"
            f" From dbo.chiphi cp RIGHT JOIN {self.schema}.qt34 qt ON cp.chiphiid=qt.chiphiid"
            f" Where (qt.maqt='{self.maqt}' And cp.mapl1 Like 'VL%' And datalength(cp.chiphiid)>0)"
            f" Order By qt.maqtgt"
        )
        dl = runsql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return
        # load gia
        # tinh tien
        for cp in dl:
            cp['tienvl'] = lamtronso(cp['soluong'] * cp['giavl'], 0)
            cp['tiennc'] = lamtronso(cp['soluong'] * cp['gianc'], 0)
            cp['tienmtc'] = lamtronso(cp['soluong'] * cp['giamtc'], 0)
            self.onzvl += cp['tienvl']
            self.onznc += cp['tiennc']
            self.onzmtc += cp['tienmtc']
        self.on_cpvl = dl
        # test
        for cp in dl:
            print(f"on_cpvl={cp}")

    def tlmd(self):
        sql = (
            f"Select cp.chiphiid,cp.diengiai as mota,cp.dvt,"
            f" isnull(qt.sl1,0) as sl_oc,isnull(qt.sl2,0) as sl_on,isnull(qt.dongia,0) as gia"
            f" From dbo.chiphi cp RIGHT JOIN {self.schema}.qt35 qt ON cp.chiphiid=qt.chiphiid"
            f" Where (qt.maqt='{self.maqt}' And cp.mapl1 Like 'TL%' And datalength(cp.chiphiid)>0)"
            f" Order By qt.maqtgt"
        )
        dl = runsql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return
        # load gia
        # tinh tien
        cptl = []
        for cp in dl:
            if self.cpqlid >= 20200827:
                cp['tien_oc'] = lamtronso(cp['sl_oc'] * cp['gia'], 0)
                cp['tien_on'] = lamtronso(cp['sl_on'] * cp['gia'], 0)
            else:
                cp['tien_oc'] = lamtronso(cp['sl_oc'] * cp['gia']/1000, 0)*1000
                cp['tien_on'] = lamtronso(cp['sl_on'] * cp['gia']/1000, 0)*1000
            if (cp['tien_oc']+cp['tien_on']+cp['sl_oc']+cp['sl_on']) > 0:
                self.ocztl += cp['tien_oc']
                self.onztl += cp['tien_on']
                cptl.append(cp)
        self.cptl = cptl
        # test
        for cp in cptl:
            print(f"cptl={cp}")

    def get_chiphiquanly(self):
        sql = (
            f"Select top 1 1 as vl,isnull(heso_nc,0) as nc,isnull(heso_mtc,0) as mtc,"
            f" isnull(heso_ttpk,0) as tructiepkhac,isnull(giantiepkhac,0) as giantiepkhac,"
            f" isnull(heso_cpchung,0) as chung,isnull(heso_thunhaptt,0) as thutinhtruoc,"
            f" isnull(heso_khaosat,0) as khaosat,isnull(heso_thietke,0) as thietke,isnull(heso_gstc,0) as giamsat"
            f" From dbo.hesochiphi Where hesoid={self.cpqlid}"
        )
        dl = runsql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return
        dl = dl[0]
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
        # test
        if self.gxd != self.congtrinh:
            self.tieude = f"GTGT sai do Gxd-Gxdct={self.gxd-self.congtrinh}"


class Phui_20200721:
    def __init__(self, phui):
        # phui=[{macptl,dai,rong,sau}]
        self.phui = phui
        self.cat_matnhua_btxm_gach = 0
        self.dao_boc_matnhua_thucong = 0
        self.dao_boc_btxm_thucong = 0
        self.pha_do_nen_gach = 0
        self.dao_phui_dat_cap3_thucong = 0
        self.dao_phui_dat_cap2_thucong = 0
        self.dat_cap3_sudunglai=0
        self.cong_traicat = 0
        self.cong_traican_dadam4x6 = 0
        self.dao_boc_gach_vua = 0
        self.vanchuyen_dat_cap3_thucong = 0
        self.vanchuyen_dat_cap2_thucong = 0
        self.cpxd = []
        self.cpvl = []
        self.cptl = []
        self.catsanlap = 0
        self.dadam4x6 = 0
        self.luoicatbeton365mm = 0
        self.tinhphui()

    def tinhphui(self):
        self.tinh_phui_hinhhoc()
        self.tinh_cat_matnhua_btxm_gach()
        self.tinh_pha_do_nen_gach()
        self.tinh_dao_boc_matnhua_thucong()
        self.tinh_dao_boc_btxm_thucong()
        self.tinh_dao_phui_dat_cap3_thucong()
        self.tinh_dao_phui_dat_cap2_thucong()
        self.tinh_cong_traicat()
        self.tinh_cong_traican_dadam4x6()
        self.tinh_dao_boc_gach_vua()
        self.tinh_vanchuyen_dat_cap3_thucong()
        self.tinh_vanchuyen_dat_cap2_thucong()
        self.tinh_cpxd()
        self.tinh_cpvl()
        self.tinh_cptl()

    def tinh_phui_hinhhoc(self):
        dl = []
        for cp in self.phui:
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
            elif cp['macptl'] in ['le_gachterrazzo', 'le_dagranit', 'le_gachmen']:
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

    def tinh_pha_do_nen_gach(self):
        kl = 0
        for cp in self.phui:
            if cp['macptl'] in ['le_dagranit', 'le_gachterrazzo']:
                kl += cp['dientich']
            elif cp['macptl'] in ['le_gachmen']:
                kl += cp['dientich']
            elif cp['macptl'] in ['le_gachconsau', 'le_gachhinhsin']:
                kl += cp['dientich']
            elif cp['macptl'] in ['le_gachbeton_tuchen_M400', 'le_daxe']:
                kl += cp['dientich']
            else:
                pass
        self.pha_do_nen_gach = lamtronso(kl, 3)

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
            elif cp['macptl'] in ['le_gachmen']:
                heso = 0.05
            else:
                heso = 0
            kl += cp['dientich'] * heso
        self.dao_boc_btxm_thucong = lamtronso(kl, 3)

    def tinh_dao_phui_dat_cap3_thucong(self):
        kl = 0
        self.dat_cap3_sudunglai = 0
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
                self.dat_cap3_sudunglai += lamtronso(cp['dientich']*0.1, 3)
            elif cp['macptl'] in ['le_gachterrazzo', 'le_dagranit']:
                heso = 0.1
            elif cp['macptl'] in ['le_gachmen']:
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
            kl += lamtronso(cp['dientich'] * heso,3)
        self.dao_phui_dat_cap3_thucong = lamtronso(kl, 3)

    def tinh_dao_phui_dat_cap2_thucong(self):
        kl = 0
        for cp in self.phui:
            if cp['macptl'] in ['nhua_12cm']:
                heso = 0.370
            elif cp['macptl'] in ['nhua_10cm']:
                heso = 0.350
            elif cp['macptl'] in ['duong_btxm', 'hem_btxm']:
                heso = 0.300
            elif cp['macptl'] in ['duong_daxanh', 'duong_datda']:
                heso = 0.350
            elif cp['macptl'] in ['le_datda', 'le_datthuong']:
                heso = 0.350
            elif cp['macptl'] in ['le_dagranit']:
                heso = 0.20
            elif cp['macptl'] in ['le_gachterrazzo']:
                heso = 0.195
            elif cp['macptl'] in ['le_gachmen']:
                heso = 0.175
            elif cp['macptl'] in ['le_gachconsau', 'le_gachhinhsin']:
                heso = 0.400 - 0.300
            elif cp['macptl'] in ['le_btxm', 'le_ximang']:
                heso = 0.200
            elif cp['macptl'] in ['le_gachbeton_tuchen_M400']:
                heso = 0.350 - 0.050
            elif cp['macptl'] in ['le_daxe']:
                heso = 0.245
            else:
                heso = 0.000
            kl += lamtronso(cp['dientich'] * (cp['sau'] - heso),3)
            #test
            print(
                f"dao phui dat cap 2 phui[{cp['macptl']}]"
                f" (dt x heso)={lamtronso(cp['dientich'] * (cp['sau'] - heso),6)}"
                f" (dai x rong x heso)={lamtronso(cp['dai'] * cp['rong'] * (cp['sau'] - heso),6)}"
                f"  tong={kl}"
                )
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
            elif cp['macptl'] in ['le_gachmen']:
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
            kl += lamtronso(cp['dientich'] * heso,3)
        self.cong_traican_dadam4x6 = lamtronso(kl, 3)

    def tinh_dao_boc_gach_vua(self):
        kl = 0
        for cp in self.phui:
            if cp['macptl'] in ['le_gachterrazzo', 'le_dagranit']:
                heso = 0.03 + 0.015
            elif cp['macptl'] in ['le_gachmen']:
                heso = 0.01 + 0.015
            elif cp['macptl'] in ['le_gachconsau', 'le_gachhinhsin']:
                heso = 0.1
            elif cp['macptl'] in ['le_gachbeton_tuchen_M400']:
                heso = 0.1
            elif cp['macptl'] in ['le_daxe']:
                heso = 0.03 + 0.015
            else:
                heso = 0
            kl += cp['dientich'] * heso
        self.dao_boc_gach_vua = lamtronso(kl, 3)

    def tinh_vanchuyen_dat_cap3_thucong(self):
        kl = self.dao_phui_dat_cap3_thucong
        kl += self.dao_boc_matnhua_thucong
        kl += self.dao_boc_btxm_thucong
        kl += self.dao_boc_gach_vua
        self.vanchuyen_dat_cap3_thucong = lamtronso(
            kl - self.dat_cap3_sudunglai, 3)

    def tinh_vanchuyen_dat_cap2_thucong(self):
        kl = self.dao_phui_dat_cap2_thucong
        self.vanchuyen_dat_cap2_thucong = lamtronso(kl, 3)

    def tinh_cpxd(self):
        cpxd = []
        cpxd.append({'macpxd': '01', "mota": "cat_matnhua_btxm_gach",
                     'soluong': self.cat_matnhua_btxm_gach})
        cpxd.append({'macpxd': '04', "mota": "pha_do_nen_gach",
                     'soluong': self.pha_do_nen_gach})
        cpxd.append({'macpxd': '02', "mota": "dao_boc_matnhua_thucong",
                     'soluong': self.dao_boc_matnhua_thucong})
        cpxd.append({'macpxd': '03', "mota": "dao_boc_btxm_thucong",
                     'soluong': self.dao_boc_btxm_thucong})
        cpxd.append(
            {'macpxd': '05', "mota": "dao_phui_dat_cap3_thucong", 'soluong': self.dao_phui_dat_cap3_thucong})
        cpxd.append(
            {'macpxd': '06', "mota": "dao_phui_dat_cap2_thucong", 'soluong': self.dao_phui_dat_cap2_thucong})
        cpxd.append(
            {'macpxd': '07', "mota": "vanchuyen_dat_cap3_thucong", 'soluong': self.vanchuyen_dat_cap3_thucong})
        cpxd.append(
            {'macpxd': '08', "mota": "vanchuyen_dat_cap2_thucong", 'soluong': self.vanchuyen_dat_cap2_thucong})
        cpxd.append({'macpxd': '09', "mota": "cong_traicat",
                     'soluong': self.cong_traicat})
        cpxd.append({'macpxd': '10', "mota": "cong_traican_dadam4x6",
                     'soluong': self.cong_traican_dadam4x6})
        self.cpxd = cpxd

    def tinh_cpvl(self):
        dm = 1.22
        self.catsanlap = lamtronso(self.cong_traicat*dm, 3)
        dm = 1.32
        self.dadam4x6 = lamtronso(self.cong_traican_dadam4x6*dm, 3)
        dm = 0.0035 + 0.0025
        self.luoicatbeton365mm = lamtronso(self.cat_matnhua_btxm_gach*dm, 3)
        cpvl = []
        cpvl.append({'macpvl': '01', "mota": "catsanlap",
                     'soluong': self.catsanlap})
        cpvl.append({'macpvl': '02', "mota": "dadam4x6",
                     'soluong': self.dadam4x6})
        self.cpvl = cpvl

    def tinh_cptl(self):
        dl = {}
        for phui in self.phui:
            if phui["macptl"] in dl:
                dl[phui["macptl"]]["soluong"] += lamtronso(phui["dientich"],3)
            else:
                dl[phui["macptl"]] = {}
                dl[phui["macptl"]]["macptl"] = phui["macptl"]
                dl[phui["macptl"]]["mota"] = phui["macptl"]
                dl[phui["macptl"]]["soluong"] = lamtronso(phui["dientich"],3)
        tam = []
        for phui in dl:
            tam.append(dl[phui])
        self.cptl = tam


def test_phui():
    phui = [{'macptl': 'le_gachhinhsin', 'dai': 0.5, 'rong': 0.5, 'sau': 1.0},
            {'macptl': 'nhua_12cm', 'dai': 0.0, 'rong': 0.3, 'sau': 0.6},
            {'macptl': 'nhua_10cm', 'dai': 0.0, 'rong': 0.3, 'sau': 0.6},
            {'macptl': 'le_gachterrazzo', 'dai': 0.0, 'rong': 0.3, 'sau': 0.6},
            {'macptl': 'le_gachhinhsin', 'dai': 2.0, 'rong': 0.3, 'sau': 0.6},
            {'macptl': 'le_gachmen', 'dai': 0.0, 'rong': 0.3, 'sau': 0.6},
            {'macptl': 'le_gachtau', 'dai': 0.0, 'rong': 0.3, 'sau': 0.6},
            {'macptl': 'duong_datda', 'dai': 0, 'rong': 0.3, 'sau': 0.6},
            {'macptl': 'hem_btxm', 'dai': 0.0, 'rong': 0.3, 'sau': 0.6},
            {'macptl': 'le_btxm', 'dai': 0.0, 'rong': 0.3, 'sau': 0.6},
            {'macptl': 'le_ximang', 'dai': 0.0, 'rong': 0.3, 'sau': 0.6},
            {'macptl': 'le_datthuong', 'dai': 0.0, 'rong': 0.3, 'sau': 0.6}
            ]
    kq = vars(Phui_20200721(phui))
    for cp in kq['cpxd']:
        print(f"cpxd={cp}")
    print(f"cpxd=dat_cap3_sudunglai={kq['dat_cap3_sudunglai']}")
    print(f"---------oOo---------")
    for cp in kq['cpvl']:
        print(f"cpvl={cp}")
    print(f"---------oOo---------")
    for cp in kq['cptl']:
        print(f"cptl={cp}")


def test_RptQtgt():
    kq = RptQtgt('pkh', '2020gmmp494001')
    print(vars(kq))


test_phui()
