import tornado.web as web
from utils import Tien, tachhangso


class Dot(web.UIModule):
    def render(self, madot="", ttdl={}):
        uid = f"bth_dot_qtgt_{madot}"
        ngaylap = ttdl.ngaylap
        if ngaylap >= 20210207:
            diachi = "08- Khổng Tử- P.Bình Thọ- Tp.Thủ Đức"
        else:
            diachi = "08- Khổng Tử- P.Bình Thọ- Q.Thủ Đức"
        ngaylap = f"{ngaylap}"
        ngaylap = f"Thủ Đức, ngày {ngaylap[-2:]} tháng {ngaylap[-4:-2]} năm {ngaylap[:-4]}"
        ztiencty = tachhangso(ttdl.ztiencty, 0)
        ztienkhach = tachhangso(ttdl.ztienkhach, 0)
        m = Tien(ttdl.zgxd)
        ktchu = m.chu()
        ktso = m.so()
        return self.render_string(
            "reports/bth_dot_qtgt/rpt-1dot.html", uid=uid, ttdl=ttdl,
            ngaylap=ngaylap, diachi=diachi, ztiencty=ztiencty, ztienkhach=ztienkhach, ktso=ktso, ktchu=ktchu)
