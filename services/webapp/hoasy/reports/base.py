
import tornado.web as web


class Quochuy(web.UIModule):
    def render(self, ngaylap=20200904):
        # format so:
        d=int(ngaylap)
        print(f"ngayla={ngaylap} type={type(ngaylap)}")
        if d >= 20210207:
            khuvuc = 'Tp.Thủ Đức'
        else:
            khuvuc = 'Q.Thủ Đức'
        diachi = f"08- Khổng Tử- P.Bình Thọ- {khuvuc}"
        s = str(ngaylap)
        ngaylap = f"{khuvuc}, ngày {s[-2:]} tháng {s[-4:-2]} năm {s[:-4]}"
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
