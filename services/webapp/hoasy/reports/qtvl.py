import tornado.web as web
from utils import tachhangso


class Quochuy(web.UIModule):
    def render(self, dvtc="ĐỘI QLML CẤP NƯỚC QUẬN THỦ ĐỨC", kyhieudvtc="", ngaylap=99990101):
        # format so:
        ngaylap = f"{ngaylap}"
        ngaylap = f"Thủ Đức, ngày {ngaylap[-2:]} tháng {ngaylap[-4:-2]} năm {ngaylap[:-4]}"
        return self.render_string(
            "reports/qtvl/quochuy.html",
            dvtc=dvtc, kyhieudvtc=kyhieudvtc, ngaylap=ngaylap)


class Tieude(web.UIModule):
    def render(self, tieude="BẢNG QUYẾT TOÁN VẬT TƯ", congtac=''):
        return self.render_string(
            "reports/qtvl/tieude.html",
            tieude=tieude, congtac=congtac)


class Cpvl(web.UIModule):
    def render(self, cpvl=[]):
        # format number
        for cp in cpvt:
            cp['tt'] = f"{cp['tt']:02}"
            cp['thuccap'] = tachhangso(cp['thuccap'], 3)
            cp['sudung'] = tachhangso(cp['sudung'], 3)
            cp['tainhap'] = tachhangso(cp['tainhap'], 3)
            cp['bosung'] = tachhangso(cp['bosung'], 3)
        return self.render_string(
            "reports/qtvl/chiphi.html",
            cpvt=cpvt)


class Chungtu(web.UIModule):
    def render(self, phieuxuat="", phieunhap=""):
        return self.render_string(
            "reports/qtvl/chungtu.html",
            phieuxuat=phieuxuat, phieunhap=phieunhap)
