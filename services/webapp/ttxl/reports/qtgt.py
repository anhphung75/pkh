from ttdl import run_mssql
from utils import Tien, tachhangso, lamtronso


class Dulieu:
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
        self.duyet = {'pbd': 'KT.GIÁM ĐÓC', 'chucvu': 'PHÓ GIÁM ĐỐC',
                      'nhanvien': 'Nguyễn Công Minh'}
        self.kiemtra = {'pbd': 'KẾ HOẠCH-VẬT TƯ-TỔNG HỢP',
                        'chucvu': 'TRƯỞNG PHÒNG', 'nhanvien': 'Phạm Phi Hải'}
        self.lapbang = {'pbd': 'ĐỘI QLMLCN QUẬN THỦ ĐỨC',
                        'chucvu': 'ĐỘI TRƯỞNG', 'nhanvien': 'Nguyễn Văn Tùng'}
        self.load_data()

    def load_data(self):
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
        dl = run_mssql(sql)
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
        dl = run_mssql(sql)
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
            f"Select top 1 sodot, isnull(nhathauid,0) as dvtcid From {self.schema}.dot"
            f" Where (madot='{self.madot}')"
        )
        dl = run_mssql(sql)
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
        dl = run_mssql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return
        dl = dl[0]
        self.dvtc = dl['dvtc']
        if self.dvtcid == 2:
            self.kyhieudvtc = "CNTĐ-QLMLQ2"
            self.lapbang = {'pbd': 'ĐỘI QLMLCN QUẬN 2',
                            'chucvu': 'ĐỘI TRƯỞNG', 'nhanvien': 'Nguyễn Ngọc Quý'}
        elif self.dvtcid == 3:
            self.kyhieudvtc = "CNTĐ-QLMLQ9"
            self.lapbang = {'pbd': 'ĐỘI QLMLCN QUẬN 9',
                            'chucvu': 'ĐỘI TRƯỞNG', 'nhanvien': 'Bùi Quang Thiên Chương'}
        elif self.dvtcid == 4:
            self.kyhieudvtc = "CNTĐ-QLMLTĐ"
            self.lapbang = {'pbd': 'ĐỘI QLMLCN QUẬN THỦ ĐỨC',
                            'chucvu': 'ĐỘI TRƯỞNG', 'nhanvien': 'Nguyễn Văn Tùng'}
        elif self.dvtcid == 11:
            self.kyhieudvtc = "CNTĐ-PKT"
            self.lapbang = {'pbd': 'PHÒNG KỸ THUẬT',
                            'chucvu': 'TRƯỞNG PHÒNG', 'nhanvien': 'Nguyễn Hồng Phương'}
            self.kiemtra = {}
            self.tieude = "BẢNG GIÁ GẮN MỚI ĐỒNG HỒ NƯỚC (ĐIỀU CHỈNH)"
        else:
            self.kyhieudvtc = "CNTĐ-KHVTTH"
            self.lapbang = {'pbd': 'PHÒNG KẾ HOẠCH-VẬT TƯ-TỔNG HỢP',
                            'chucvu': 'TRƯỞNG PHÒNG', 'nhanvien': 'Phạm Phi Hải'}
            self.kiemtra = {}
        # test
        for cp in dl:
            print(f"dvtc={dl[cp]}")

    def qtoc_xd(self):
        sql = (
            f"Select cp.chiphiid,cp.diengiai as mota,cp.dvt,isnull(qt.soluong,0) as soluong,"
            f" isnull(qt.giavl,0) as giavl,isnull(qt.gianc,0) as gianc,isnull(qt.giamtc,0) as giamtc"
            f" From dbo.chiphi cp RIGHT JOIN {self.schema}.qt31 qt ON cp.chiphiid=qt.chiphiid"
            f" Where (qt.maqt='{self.maqt}' And datalength(cp.chiphiid)>0) Order By qt.maqtgt"
        )
        dl = run_mssql(sql)
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
        dl = run_mssql(sql)
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
        dl = run_mssql(sql)
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
        dl = run_mssql(sql)
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
        dl = run_mssql(sql)
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
        dl = run_mssql(sql)
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
        dl = run_mssql(sql)
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
        dl = run_mssql(sql)
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


def dulieuin(schema):
    data = {"schema": schema, "dulieuin": [], "qtgt": {}}
    try:
        sql = (
            f"Select maqt From {schema}.qt qt LEFT JOIN {schema}.dot dot ON qt.madot=dot.madot"
            f" Where (dot.inok<>0 And qt.inok<>0 And datalength(qt.madot)>0"
            f" And (qt.tinhtrang like 'ok%' or qt.tinhtrang like 'fin%'))"
            f" Order By qt.madot,qt.tt,qt.lastupdate"
        )
        dl = run_mssql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return data
        dulieu = []
        for r in dl:
            dulieu.append(r['maqt'])
        data["dulieuin"] = dulieu
        dl = {}
        for maqt in dulieu:
            dl[maqt] = Dulieu(schema, maqt)
        data["qtgt"] = dl
        return data
    except:
        return data
