from ttdl import run_mssql


class HsKh:
    def __init__(self, schema='qlmltd', namhoso=None):
        self.schema = schema
        self.namhoso = namhoso

    def gom(self):
        sql = (
            f"Select qt.maqt as utcid, qt.sodot, hs.sohoso, hs.khachhang, hs.diachikhachhang as diachi "
            f" From dbo.hoso hs RIGHT JOIN dbo.qt qt ON hs.hosoid=qt.hosoid"
            f" Where (qt.maqt LIKE '{self.namhoso}%')"
            f" Order By qt.maqt"
        )
        dl = run_mssql(sql)
        if ((dl == None) or (len(dl) < 1)):
            return None
        return dl

    def nap(self, uuid):
        pass

    def xoa(self, uuid):
        pass

    def moi(self, uuid, data):
        pass

    def sua(self, uuid, data):
        pass