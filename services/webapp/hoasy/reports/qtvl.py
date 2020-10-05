import tornado.web as web
from utils import tachhangso


class Tieude(web.UIModule):
    def render(self, tieude="BẢNG QUYẾT TOÁN VẬT LIỆU", sodot="", ngaygandau="", ngaygancuoi=""):
        dau = f"{ngaygandau}"
        cuoi = f"{ngaygancuoi}"
        ngaylap = f"Thủ Đức, ngày {ngaylap[-2:]} tháng {ngaylap[-4:-2]} năm {ngaylap[:-4]}"
        tieude = (
            f"{tieude}"
            f"ĐỢT {sodot.upper()} (Ngày gắn {dau[-2:]}/{dau[-4:-2]}/{dau[:-4]} - {cuoi[-2:]}/{cuoi[-4:-2]}/{cuoi[:-4]})"
        )
        return self.render_string(
            "reports/qtvl/tieude.html",
            tieude=tieude)

class TieudeCpvlHoso(web.UIModule):
    def render(self):
        return self.render_string(
            "reports/qtvl/tieude-cpvl-hoso.html")

class Cpvl(web.UIModule):
    def render(self, tt=1, mota="",dvt="",soluong=0,gia=0,tien=0):
        # markup
        tt = f"{cp['tt']:02}"
        soluong= tachhangso(soluong, 3)
        gia= tachhangso(gia, 0)
        tien= tachhangso(tien, 0)
        return self.render_string(
            "reports/qtvl/chiphi.html",
            tt=tt,mota=mota,dvt=dvt,soluong=soluong,gia=gia,tien=tien)


class Hoso(web.UIModule):
    def render(self, uid="", hoso=[]):
        # format number
        for cp in hoso:
            cp['tt'] = f"{(1+hoso.index(cp)):02}"
            cp['soluong'] = tachhangso(cp['soluong'], 3)
            cp['gia'] = tachhangso(cp['gia'], 0)
            cp['tien'] = tachhangso(cp['tien'], 0)
        return self.render_string(
            "reports/qtvl/hoso.html",
            uid=uid, hoso=hoso)
