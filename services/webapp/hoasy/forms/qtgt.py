import tornado.web as web


class Ongcai(web.UIModule):
    def render(self, ngaylap=20200904):
        # format so:
        ngaylap = f"{ngaylap}"
        ngaylap = f"Thủ Đức, ngày {ngaylap[-2:]} tháng {ngaylap[-4:-2]} năm {ngaylap[:-4]}"
        return self.render_string(
            "reports/quochuy.html",
            ngaylap=ngaylap)


class Ongnganh(web.UIModule):
    def render(self, ngaylap=20200904):
        # format so:
        ngaylap = f"{ngaylap}"
        ngaylap = f"Thủ Đức, ngày {ngaylap[-2:]} tháng {ngaylap[-4:-2]} năm {ngaylap[:-4]}"
        return self.render_string(
            "reports/quochuy.html",
            ngaylap=ngaylap)