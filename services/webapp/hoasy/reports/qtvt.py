import tornado.web as web
from utils import tachhangso


class RptQtvt_Quochuy(web.UIModule):
    def render(self, dvtc="ĐỘI QLML CẤP NƯỚC QUẬN THỦ ĐỨC", ngaylap=99990101):
        # format so:
        ngaylap = f"{ngaylap}"
        ngaylap = f"Thủ Đức, ngày {ngaylap[-2:]} tháng {ngaylap[-4:-2]} năm {ngaylap[:-4]}"
        return self.render_string(
            "reports/qtvt/quochuy.html",
            dvtc=dvtc, ngaylap=ngaylap)


class RptQtvt_Tieude(web.UIModule):
    def render(self, tieude="BẢNG QUYẾT TOÁN VẬT TƯ", congtac='', sodot=''):
        return self.render_string(
            "reports/qtvt/tieude.html",
            tieude=tieude, congtac=congtac, sodot=sodot)


class RptQtvt_Cpvt(web.UIModule):
    def render(self, cpvt=[]):
        # format number
        for cp in cpvt:
            thuccap = tachhangso(thuccap, 3)
            sudung = tachhangso(sudung, 3)
            tainhap = tachhangso(tainhap, 3)
            bosung = tachhangso(bosung, 3)
        return self.render_string(
            "reports/qtvt/chiphi.html",
            cpvt=cpvt)


class RptQtvt_Chungtu(web.UIModule):
    def render(self, phieuxuat="", phieunhap=""):
        return self.render_string(
            "reports/qtvt/chungtu.html",
            phieuxuat=phieuxuat, phieunhap=phieunhap)
