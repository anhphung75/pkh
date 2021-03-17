
import tornado.web as web


class Quochuy(web.UIModule):
    def render(self, ngaylap=20200904):
        # format so:
        if ngaylap >= 20210207:
            diachi = "08- Khổng Tử- P.Bình Thọ- Tp.Thủ Đức"
        else:
            diachi = "08- Khổng Tử- P.Bình Thọ- Q.Thủ Đức"
        ngaylap = f"{ngaylap}"
        ngaylap = f"Thủ Đức, ngày {ngaylap[-2:]} tháng {ngaylap[-4:-2]} năm {ngaylap[:-4]}"
        return self.render_string(
            "reports/quochuy.html",
            ngaylap=ngaylap, diachi=diachi)


class Kyduyet2(web.UIModule):
    def render(self, duyet={}, lapbang={}):
        return self.render_string(
            "reports/kyduyet2.html",
            duyet=duyet, lapbang=lapbang)


class Kyduyet3(web.UIModule):
    def render(self, duyet={}, kiemtra={}, lapbang={}):
        return self.render_string(
            "reports/kyduyet3.html",
            duyet=duyet, kiemtra=kiemtra, lapbang=lapbang)
