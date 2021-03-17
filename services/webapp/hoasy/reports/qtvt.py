import tornado.web as web
from utils import tachhangso


class Quochuy(web.UIModule):
    def render(self, dvtc="ĐỘI QLML CẤP NƯỚC QUẬN THỦ ĐỨC", kyhieudvtc="", ngaylap=99990101):
        # format so:
        if ngaylap >= 20210207:
            diachi = "08- Khổng Tử- P.Bình Thọ- Tp.Thủ Đức"
        else:
            diachi = "08- Khổng Tử- P.Bình Thọ- Q.Thủ Đức"
        ngaylap = f"{ngaylap}"
        ngaylap = f"Thủ Đức, ngày {ngaylap[-2:]} tháng {ngaylap[-4:-2]} năm {ngaylap[:-4]}"
        return self.render_string(
            "reports/qtvt/quochuy.html",
            dvtc=dvtc, kyhieudvtc=kyhieudvtc, ngaylap=ngaylap, diachi=diachi)


class Tieude(web.UIModule):
    def render(self, tieude="BẢNG QUYẾT TOÁN VẬT TƯ", congtac=''):
        return self.render_string(
            "reports/qtvt/tieude.html",
            tieude=tieude, congtac=congtac)


class Cpvt(web.UIModule):
    def render(self, cpvt=[]):
        # format number
        for cp in cpvt:
            cp['tt'] = f"{cp['tt']:02}"
            cp['thuccap'] = tachhangso(cp['thuccap'], 1)
            cp['sudung'] = tachhangso(cp['sudung'], 1)
            cp['tainhap'] = tachhangso(cp['tainhap'], 1)
            cp['bosung'] = tachhangso(cp['bosung'], 1)
        return self.render_string(
            "reports/qtvt/chiphi.html",
            cpvt=cpvt)


class Chungtu(web.UIModule):
    def render(self, phieuxuat="", phieunhap=""):
        return self.render_string(
            "reports/qtvt/chungtu.html",
            phieuxuat=phieuxuat, phieunhap=phieunhap)


class Dot(web.UIModule):
    def render(self, madot="", ttdl={}):
        uid = f"qtvt_{madot}"
        return self.render_string(
            "reports/qtvt/rpt-1dot.html",
            uid=uid, ttdl=ttdl)
