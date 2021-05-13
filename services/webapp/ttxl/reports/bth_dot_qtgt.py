from ttdl.mssql import runsql
from utils import Tien, tachhangso, lamtronso


class Dulieu:
    def __init__(self, schema='qlmltd', madot=''):
        self.schema = schema
        self.madot = madot
        self.sodot = ""
        self.ngaylap = 99990101
        self.dvtcid = 0
        self.dvtc = "PHÒNG KẾ HOẠCH-VẬT TƯ-TỔNG HỢP"
        self.ngaythicong = "9999(01/01)"
        self.ngayhoancong = "9999(01/01)"
        self.khuvuc = "Quận Thủ Đức"
        self.zhoso = 0
        self.zthicong = 0
        self.ztrongai = 0
        self.zchualam = 0
        self.ztiencty = 0
        self.ztienkhach = 0
        self.zgxd = 0
        self.duyet = {'pbd': 'KT.GIÁM ĐÓC', 'chucvu': 'PHÓ GIÁM ĐỐC',
                      'nhanvien': 'Nguyễn Công Minh'}
        self.kiemtra = {'pbd': 'KẾ HOẠCH-VẬT TƯ-TỔNG HỢP',
                        'chucvu': 'TRƯỞNG PHÒNG', 'nhanvien': 'Phạm Phi Hải'}
        self.lapbang = {'pbd': 'ĐỘI QLMLCN QUẬN THỦ ĐỨC',
                        'chucvu': 'ĐỘI TRƯỞNG', 'nhanvien': 'Nguyễn Văn Tùng'}
        self.load_data()

    def load_data(self):
        self.tbl_dot()
        self.tbl_qtgt()
        self.tbl_donvithicong()
        self.tim_ztrongai()
        self.tim_zhoso_zchualam()
        self.nhansu()
        self.sua_khuvuc()

    def tao_chuoi_ngay(self, dngay):
        kq = ""
        try:
            snam = ""
            for nam in sorted(dngay.keys()):
                sthang = ""
                for thang in sorted(dngay[nam].keys()):
                    sngay = ""
                    for ngay in sorted(dngay[nam][thang].keys()):
                        sngay += f"-{ngay}"
                    sthang += f"+ {sngay[1:]}/{int(thang):02}"
                snam = f"+ {nam}({sthang[2:]})"
            kq = snam[2:]
        except:
            pass
        return kq

    def tbl_dot(self):
        sql = (
            f"Select top 1 sodot, ngaylap, khuvuc,isnull(nhathauid,0) as dvtcid,"
            f" isnull(dautucty,0) as tiencty,isnull(dautukhach,0) as tienkhach"
            f" From {self.schema}.dot"
            f" Where (madot='{self.madot}')"
        )
        dl = runsql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return
        self.sodot = dl[0]["sodot"]
        self.ngaylap = dl[0]["ngaylap"]
        self.dvtcid = dl[0]["dvtcid"]
        self.khuvuc = dl[0]["khuvuc"]

    def tbl_qtgt(self):
        sql = (
            f"Select isnull(dautucty,0) as tiencty, isnull(dautukhach,0) as tienkhach,isnull(gxd,0) as gxd,"
            f" ngaygan,ngayhoancong,isnull(soho,0) as thicong"
            f" From {self.schema}.qt"
            f" Where (madot='{self.madot}' And (tinhtrang like 'ok%' or tinhtrang like 'fin%'))"
        )
        dl = runsql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return
        ngayhoancong = {}
        ngaythicong = {}
        for r in dl:
            self.zgxd += r['gxd']
            self.ztiencty += r['tiencty']
            self.ztienkhach += r['tienkhach']
            self.zthicong += r['thicong']
            try:
                ntn = f"{r['ngaygan']}"
                ngay = ntn[-2:]
                thang = ntn[-4:-2]
                nam = ntn[:-4]
                if nam in ngaythicong:
                    if thang in ngaythicong[nam]:
                        ngaythicong[nam][thang][ngay] = 0
                    else:
                        ngaythicong[nam][thang] = {ngay: 0}
                else:
                    ngaythicong[nam] = {thang: {ngay: 0}}
            except:
                pass
            try:
                ntn = f"{r['ngayhoancong']}"
                ngay = ntn[-2:]
                thang = ntn[-4:-2]
                nam = ntn[:-4]
                if nam in ngayhoancong:
                    if thang in ngayhoancong[nam]:
                        ngayhoancong[nam][thang][ngay] = 0
                    else:
                        ngayhoancong[nam][thang] = {ngay: 0}
                else:
                    ngayhoancong[nam] = {thang: {ngay: 0}}
            except:
                pass
        self.ngaythicong = self.tao_chuoi_ngay(ngaythicong)
        self.ngayhoancong = self.tao_chuoi_ngay(ngayhoancong)

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
        if self.dvtcid == 2:
            self.lapbang = {'pbd': 'ĐỘI QLMLCN QUẬN 2',
                            'chucvu': 'ĐỘI TRƯỞNG', 'nhanvien': 'Nguyễn Ngọc Quý'}
        elif self.dvtcid == 3:
            self.lapbang = {'pbd': 'ĐỘI QLMLCN QUẬN 9',
                            'chucvu': 'ĐỘI TRƯỞNG', 'nhanvien': 'Bùi Quang Thiên Chương'}
        elif self.dvtcid == 4:
            self.lapbang = {'pbd': 'ĐỘI QLMLCN QUẬN THỦ ĐỨC',
                            'chucvu': 'ĐỘI TRƯỞNG', 'nhanvien': 'Nguyễn Văn Tùng'}
        else:
            self.lapbang = {'pbd': 'PHÒNG KẾ HOẠCH-VẬT TƯ-TỔNG HỢP',
                            'chucvu': 'TRƯỞNG PHÒNG', 'nhanvien': 'Phạm Phi Hải'}
            self.kiemtra = {}

    def tim_ztrongai(self):
        sql = (
            f"Select sum(isnull(soho,0)) as trongai"
            f" From {self.schema}.qt"
            f" Where (madot='{self.madot}' And tinhtrang like 'tn%')"
            f" Group By madot"
        )
        dl = runsql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return
        self.ztrongai = dl[0]["trongai"]

    def tim_zhoso_zchualam(self):
        sql = (
            f"Select sum(isnull(soho,0)) as hoso"
            f" From {self.schema}.qt"
            f" Where (madot='{self.madot}')"
            f" Group By madot"
        )
        dl = runsql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return
        self.zhoso = dl[0]["hoso"]
        self.zchualam = self.zhoso - self.zthicong - self.ztrongai

    def nhansu(self):
        if self.ngaylap > 20210422:
            self.duyet['nhanvien'] = 'Nguyễn Tuấn Ngọc'

    def sua_khuvuc(self):
        if self.ngaylap > 20210207:
            if 'Bình Dương,' in self.khuvuc:
                self.khuvuc = 'Bình Dương, Tp.Thủ Đức'
            elif 'Bình Dương' in self.khuvuc:
                self.khuvuc = 'Bình Dương'
            else:
                self.khuvuc = 'Tp.Thủ Đức'


def dulieuin(schema):
    data = {"schema": schema, "dulieuin": [], "bth_dot_qtgt": {}}
    sql = (
        f"Select top 100 madot From {schema}.dot"
        f" Where (inok<>0 And datalength(madot)>0"
        f" And (tinhtrang like 'ok%' or tinhtrang like 'fin%'))"
        f" Order By madot,lastupdate"
    )
    try:
        dl = runsql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return data
        dulieu = []
        for r in dl:
            dulieu.append(r['madot'])
        data["dulieuin"] = dulieu
        dl = {}
        for madot in dulieu:
            try:
                dl[madot] = Dulieu(schema, madot)
            except:
                pass
        data["bth_dot_qtgt"] = dl
        return data
    except:
        return data
