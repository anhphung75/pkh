from ttdl import run_mssql
from utils import Tien, tachhangso, lamtronso


class Dulieu:
    def __init__(self, schema='qlmltd', madot=''):
        self.schema = schema
        self.madot = madot
        self.tieude = "BẢNG QUYẾT TOÁN VẬT LIỆU"
        self.sodot = ""
        self.congtac = ""
        self.ngaylap = 99990101
        self.dvtcid = 0
        self.dvtc = "PHÒNG KẾ HOẠCH-VẬT TƯ-TỔNG HỢP"
        self.ngayganmin = 0
        self.ngayganmax = 0
        self.dsmaqt=[]
        self.cpvl = []
        self.duyet = {'pbd': 'KT.GIÁM ĐÓC', 'chucvu': 'PHÓ GIÁM ĐỐC',
                      'nhanvien': 'Nguyễn Công Minh'}
        self.kiemtra = {'pbd': 'KẾ HOẠCH-VẬT TƯ-TỔNG HỢP',
                        'chucvu': 'TRƯỞNG PHÒNG', 'nhanvien': 'Phạm Phi Hải'}
        self.lapbang = {'pbd': 'ĐỘI QLMLCN QUẬN THỦ ĐỨC',
                        'chucvu': 'ĐỘI TRƯỞNG', 'nhanvien': 'Nguyễn Văn Tùng'}
        self.get_qtvl()

    def get_qtvl(self):
        self.tbl_dot()
        self.tbl_qtgt()
        self.tbl_donvithicong()
        self.tinh_cpvl()
        self.tinh_ong()

    def tbl_dot(self):
        sql = (
            f"Select top 1 sodot, ngaylap, isnull(nhathauid,0) as dvtcid"
            f" From {self.schema}.dot"
            f" Where (madot='{self.madot}')"
        )
        dl = run_mssql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return
        dl = dl[0]
        self.sodot = dl["sodot"]
        self.congtac = f" Gắn mới đồng hồ nước đợt {self.sodot.upper()}"
        self.ngaylap = dl["ngaylap"]
        self.dvtcid = dl["dvtcid"]
        # test
        for cp in dl:
            print(f"dot {cp}={dl[cp]}")

    def tbl_qtgt(self):
        sql = (
            f"Select maqt, ngaygan"
            f" From {self.schema}.qt"
            f" Where (madot='{self.madot}' And datalength(ngaygan)>0"
            f" And (tinhtrang like 'ok%' or tinhtrang like 'fin%'))"
            f" Order By ngaygan"
        )
        dl = run_mssql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return
        for r in dl:
            self.dsmaqt.append(r["maqt"])
        self.ngayganmin = dl[0]
        self.ngayganmax = dl[-1]
        # test
        print(f"qtgt dl={dl}")

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
        # test
        for cp in dl:
            print(f"dvtc={dl[cp]}")
        self.dvtc = dl['dvtc']

    def tinh_cpvl(self):
        chiphi={}
        sql = (
            f"Select cp.chiphiid,cp.motachiphi,cp.dvt,cp.soluong,"
            f" hs.hosoid,hs.sohoso,hs.khachhang,hs.diachigandhn"
            f" FROM ("
            f"Select qt32.chiphiid, sum(qt32.soluong) as soluong, qt32.giavl as gia, qt.tt, qt.hosoid"
            f" From {schema}.qt qt RIGHT JOIN {schema}.qt32 qt32 ON qt.maqt=qt32.maqt"
            f" RIGHT JOIN dbo.chiphi c on qt32.chiphiid=c.chiphiid"
            f" Where (qt.madot='{self.madot}' And c.mapl1 Like 'VL%'"
            f" And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%'))"
            f" Group By qt32.chiphiid, qt.tt, qt.hosoid"
            f" UNION Select qt34.chiphiid, sum(qt34.soluong), qt34.giavl, qt.tt, qt.hosoid"
            f" From {schema}.qt qt RIGHT JOIN {schema}.qt34 qt34 ON qt.maqt=qt34.maqt"
            f" RIGHT JOIN dbo.chiphi c on qt32.chiphiid=c.chiphiid"
            f" Where (qt.madot='{self.madot}' And cp.mapl1 Like 'VL%'"
            f" And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%'))"
            f" Group By qt34.chiphiid, qt.tt, qt.hosoid"
            f" UNION Select qt31.chiphiid, sum(qt31.soluong), qt31.giavl, qt.tt, qt.hosoid"
            f" From {schema}.qt qt RIGHT JOIN {schema}.qt31 qt31 ON qt.maqt=qt31.maqt"
            f" RIGHT JOIN dbo.chiphi c on qt32.chiphiid=c.chiphiid"
            f" Where (qt.madot='{self.madot}' And cp.mapl1 Like 'VL%'"
            f" And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%'))"
            f" Group By qt31.chiphiid, qt.tt, qt.hosoid"
            f" UNION Select qt32.chiphiid, sum(qt32.soluong), qt32.giavl, qt.tt, qt.hosoid"
            f" From {schema}.qt qt RIGHT JOIN {schema}.qt32 qt32 ON qt.maqt=qt32.maqt"
            f" RIGHT JOIN dbo.chiphi c on qt32.chiphiid=c.chiphiid"
            f" Where (qt.madot='{self.madot}' And cp.mapl1 Like 'VL%'"
            f" And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%'))"
            f" Group By qt32.chiphiid, qt.tt, qt.hosoid"
            f" ) AS cp"
            f" LEFT JOIN dbo.hoso hs ON cp.hosoid=hs.hosoid"
            f" Order By cp.chiphiid, cp.tt"
        )
        dl = run_mssql(sql)
        if ((dl != None) or (len(dl) > 1)):
            for cp in dl:
                chiphi[cp["chiphiid"]]=cp['soluong']


        self.cpvt = dl
        # test
        for cp in dl:
            print(f"cpvt={cp}")


def dulieuin(schema):
    data = {"schema": schema, "dulieuin": [], "qtvl": {}}
    try:
        sql = (
            f"Select madot From {schema}.dot"
            f" Where (inok<>0 And datalength(madot)>0)"
            f" And (tinhtrang like 'ok%' or tinhtrang like 'fin%'))"
            f" Order By madot,lastupdate"
        )
        dl = run_mssql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return data
        dulieu = []
        for r in dl:
            dulieu.append(r['madot'])
        data["dulieuin"] = dulieu
        dl = {}
        for madot in dulieu:
            dl[madot] = Dulieu(schema, madot)
        data["qtvt"] = dl
        return data
    except:
        return data
