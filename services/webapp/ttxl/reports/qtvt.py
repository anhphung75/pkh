import datetime
import arrow

#from sqlalchemy import func, desc
from ttdl import run_mssql


def dulieuin(schema):
    try:
        sql = (
            f"Select madot From {schema}.dot"
            f" (inok<>0 And datalength(madot)>0) Order By madot"
        )
        dl = run_mssql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return ['pkh001', 'pkh002']
        data = []
        for r in dl:
            data.append(r['madot'])
        return data
    except:
        return []


class RptQtvt:
    def __init__(self, schema='qlmltd', madot=''):
        self.schema = schema
        self.madot = madot
        self.tieude="BẢNG QUYẾT TOÁN VẬT TƯ"
        self.sodot = ""
        self.congtac=""
        self.ngaylap = 99990101
        self.dvtcid = 0
        self.dvtc = "PHÒNG KẾ HOẠCH-VẬT TƯ-TỔNG HỢP"
        self.kyhieudvtc = "CNTĐ-KHVTTH"
        self.phieunhap = ""
        self.phieuxuat = ""
        self.cpvt = []
        self.duyet = {'pbd': 'KT.GIÁM ĐÓC', 'chucvu': 'PHÓ GIÁM ĐỐC',
                      'nhanvien': 'Nguyễn Công Minh'}
        self.kiemtra = {'pbd': 'KẾ HOẠCH-VẬT TƯ-TỔNG HỢP',
                        'chucvu': 'TRƯỞNG PHÒNG', 'nhanvien': 'Phạm Phi Hải'}
        self.lapbang = {'pbd': 'ĐỘI QLMLCN QUẬN THỦ ĐỨC',
                        'chucvu': 'ĐỘI TRƯỞNG', 'nhanvien': 'Nguyễn Văn Tùng'}
        self.get_qtvt()

    def get_qtvt(self):
        self.tbl_dot()
        self.tbl_donvithicong()
        self.tbl_qtvt()

    def tbl_dot(self):
        sql = (
            f"Select top 1 sodot, ngaylap, isnull(nhathauid,0) as dvtcid,"
            f" isnull(sophieunhap,'') as phieunhap,isnull(sophieuxuat,'') as phieuxuat"
            f" From {self.schema}.dot"
            f" Where (madot='{self.madot}')"
        )
        dl = runsql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return
        dl = dl[0]
        self.sodot = dl["sodot"]
        self.congtac=f" Gắn mới đồng hồ nước đợt {self.sodot.upper()}"
        self.ngaylap = dl["ngaylap"]
        self.phieunhap = dl["phieunhap"]
        self.phieuxuat = dl["phieuxuat"]
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
        else:
            self.kyhieudvtc = "CNTĐ-KHVTTH"
            self.lapbang = {'pbd': 'PHÒNG KẾ HOẠCH-VẬT TƯ-TỔNG HỢP',
                            'chucvu': 'TRƯỞNG PHÒNG', 'nhanvien': 'Phạm Phi Hải'}
            self.kiemtra={}
        # test
        for cp in dl:
            print(f"dvtc={dl[cp]}")
        self.dvtc = dl['dvtc']

    def tbl_qtvt(self):
        sql = (
            f"Select isnull(tt,0) as tt, isnull(mavattu,'') as mavattu, isnull(tenvattu,'') as motacpvt,"
            f" isnull(dvt,'') as dvt, isnull(soluongcap,0) as thuccap,isnull(soluongsudung,0) as sudung,"
            f" isnull(soluongtainhap,0) as tainhap,isnull(soluongbosung,0) as bosung,"
            f" From {self.schema}.qtvt"
            f" Where (madot='{self.madot}' And datalength(chiphiid)>0) Order By maqtvt"
        )
        dl = runsql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return
        self.cpvt = dl
        # test
        for cp in dl:
            print(f"cpvt={dl[cp]}")
