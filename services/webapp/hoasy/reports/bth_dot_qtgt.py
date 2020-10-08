import tornado.web as web
from utils import Tien, tachhangso


class Dot(web.UIModule):
    def render(self, madot="", ttdl={}):
        uid = f"bth_dot_qtgt_{madot}"
        ztiencty = tachhangso(ttdl.ztiencty, 0)
        ztienkhach = tachhangso(ttdl.ztienkhach, 0)
        m = Tien(ttdl.zgxd)
        ktchu = m.chu()
        ktso = m.so()
        return self.render_string(
            "reports/bth_dot_qtgt/rpt-1dot.html", uid=uid, ttdl=ttdl,
            ztiencty=ztiencty, ztienkhach=ztienkhach, ktso=ktso, ktchu=ktchu)
