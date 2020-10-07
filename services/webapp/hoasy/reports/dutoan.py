import tornado.web as web
from utils import lamtronso, tachhangso, Tien


class Quochuy(web.UIModule):
    def render(self, ngaylap=99990101):
        # format so:
        ngaylap = f"{ngaylap}"
        ngaylap = f"Thủ Đức, ngày {ngaylap[-2:]} tháng {ngaylap[-4:-2]} năm {ngaylap[:-4]}"
        return self.render_string(
            "reports/dutoan/quochuy.html",
            ngaylap=ngaylap)


class Footer(web.UIModule):
    def render(self, cpqlid=20200721, mabaogia=20200721, stt=1, page=1, pages=1):
        # format so:
        mabaogia = f"{mabaogia}"
        if cpqlid >= 20200721:
            nghidinh = "NĐ68-2019"
        else:
            nghidinh = "NĐ32-2015"
        lzone = f"DT-{nghidinh} ({mabaogia[-2:]}-{mabaogia[-4:-2]}-{mabaogia[:-4]})"
        rzone = f"Trang: {page:01}/{pages:01}"
        return self.render_string(
            "reports/qtgt/footer.html",
            lzone=lzone, rzone=rzone)


class HosoOngnganh(web.UIModule):
    def render(self, uid="", ttdl={}):
        return self.render_string(
            "reports/dutoan/rpt-ongnganh.html",
            uid=uid, ttdl=ttdl)


class HosoOngcai(web.UIModule):
    def render(self, uid="", ttdl={}):
        return self.render_string(
            "reports/dutoan/rpt-ongcai.html",
            uid=uid, ttdl=ttdl)


class Hoso2Phui(web.UIModule):
    def render(self, uid="", ttdl={}):
        return self.render_string(
            "reports/dutoan/rpt-2phui.html",
            uid=uid, ttdl=ttdl)


class Hoso(web.UIModule):
    def render(self, maqt="", ttdl={}):
        uid = f"dutoan_{maqt}"
        ttdl.tieude = "BẢNG GIÁ GẮN MỚI ĐỒNG HỒ NƯỚC (ĐIỀU CHỈNH)"
        ttdl.kiemtra = {}
        ttdl.lapbang = {'pbd': 'PHÒNG KỸ THUẬT',
                        'chucvu': 'TRƯỞNG PHÒNG', 'nhanvien': 'Nguyễn Hồng Phương'}
        print(f"dutoan ttdl={vars(ttdl)}")
        return self.render_string(
            "reports/dutoan/rpt-1hoso.html",
            uid=uid, ttdl=ttdl)
