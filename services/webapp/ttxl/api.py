from ttdl import run_mssql


class HsKh:
    def __init__(self, schema='qlmltd', namhoso=None):
        self.schema = schema
        self.namhoso = namhoso

    def gom(self):
        sql = (
            f"Select qt.maqt as utcid, dot.sodot, hs.sohoso, hs.khachhang, hs.diachikhachhang as diachi,"
            f" qt.ngaygan, qt.ngayhoancong, dvtc.manhathau as madvtc"
            f" From ((dbo.qt qt LEFT JOIN dbo.dot dot ON qt.madot = dot.madot)"
            f" LEFT JOIN dbo.hoso hs ON qt.hosoid = hs.hosoid)"
            f" LEFT JOIN dbo.nhathau dvtc ON dot.nhathauid = dvtc.nhathauid"
            f" Where (qt.maqt LIKE '{self.namhoso}%')"
            f" Order By qt.maqt"
        )
        dl = run_mssql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return None
        print(f'gom dl={dl}')
        return dl

    def nap(self, uuid):
        pass

    def xoa(self, uuid):
        pass

    def moi(self, uuid, data):
        pass

    def sua(self, uuid, data):
        pass