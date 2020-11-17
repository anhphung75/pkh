import tornado.web as web
from utils import tachhangso


class Tieude(web.UIModule):
    def render(self, sodot="", ngaygandau="", ngaygancuoi=""):
        tieude = "BẢNG TỔNG HỢP VẬT LIỆU"
        dau = f"{ngaygandau}"
        cuoi = f"{ngaygancuoi}"
        tieude1 = f"ĐỢT {sodot.upper()} (Ngày gắn {dau[-2:]}/{dau[-4:-2]}/{dau[:-4]} - {cuoi[-2:]}/{cuoi[-4:-2]}/{cuoi[:-4]})"
        return self.render_string(
            "reports/bth_dot_vl/tieude.html",
            tieude=tieude, tieude1=tieude1)


class TieudeCpvlHoso(web.UIModule):
    def render(self):
        return self.render_string(
            "reports/bth_dot_vl/tieude-cpvl-hoso.html")


class Cpvl(web.UIModule):
    def render(self, tt=1, mota="", dvt="", soluong=0, gia=0, tien=0):
        # markup
        tt = f"{tt:02}"
        soluong = tachhangso(soluong, 3)
        gia = tachhangso(gia, 0)
        tien = tachhangso(tien, 0)
        return self.render_string(
            "reports/bth_dot_vl/chiphi.html",
            tt=tt, mota=mota, dvt=dvt, soluong=soluong, gia=gia, tien=tien)


class Hoso(web.UIModule):
    def render(self, uid="", hoso=[]):
        # format number
        for cp in hoso:
            cp['tt'] = f"{(1+hoso.index(cp)):02}"
            cp['soluong'] = tachhangso(cp['soluong'], 3)
            cp['gia'] = tachhangso(cp['gia'], 0)
            cp['tien'] = tachhangso(cp['tien'], 0)
        return self.render_string(
            "reports/bth_dot_vl/hoso.html",
            uid=uid, hoso=hoso)


class Dot(web.UIModule):
    def render(self, madot="", ttdl={}):
        uid = f"bth_dot_vl_{madot}"
        return self.render_string(
            "reports/bth_dot_vl/rpt-1dot.html",
            uid=uid, ttdl=ttdl)


class Dot0(web.UIModule):
    def render(self, madot="", ttdl={}):
        uid = f"bth_dot_vl_{madot}"
        return self.render_string(
            "reports/bth_dot_klvl/rpt-1dot.html",
            uid=uid, ttdl=ttdl)


class Tieude0(web.UIModule):
    def render(self, sodot="", ngaygandau="", ngaygancuoi=""):
        tieude = "BẢNG TỔNG HỢP KHỐI LƯỢNG VẬT LIỆU"
        dau = f"{ngaygandau}"
        cuoi = f"{ngaygancuoi}"
        tieude1 = f"ĐỢT {sodot.upper()} (Ngày gắn {dau[-2:]}/{dau[-4:-2]}/{dau[:-4]} - {cuoi[-2:]}/{cuoi[-4:-2]}/{cuoi[:-4]})"
        return self.render_string(
            "reports/bth_dot_klvl/tieude.html",
            tieude=tieude, tieude1=tieude1)


class TieudeCpvl0Hoso0(web.UIModule):
    def render(self):
        return self.render_string(
            "reports/bth_dot_klvl/tieude-cpvl-hoso.html")


class Cpvl0(web.UIModule):
    def render(self, tt=1, mota="", dvt="", soluong=0, gia=0, tien=0):
        # markup
        tt = f"{tt:02}"
        soluong = tachhangso(soluong, 3)
        return self.render_string(
            "reports/bth_dot_klvl/chiphi.html",
            tt=tt, mota=mota, dvt=dvt, soluong=soluong)


class Hoso0(web.UIModule):
    def render(self, uid="", hoso=[]):
        # format number
        for cp in hoso:
            cp['tt'] = f"{(1+hoso.index(cp)):02}"
            cp['soluong'] = tachhangso(cp['soluong'], 3)
        return self.render_string(
            "reports/bth_dot_klvl/hoso.html",
            uid=uid, hoso=hoso)
