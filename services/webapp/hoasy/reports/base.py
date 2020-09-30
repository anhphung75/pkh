
import tornado.web as web


class RptKyduyet2(web.UIModule):
    def render(self, duyet={}, lapbang={}):
        return self.render_string(
            "reports/kyduyet2.html",
            duyet=duyet, lapbang=lapbang)


class RptKyduyet3(web.UIModule):
    def render(self, duyet={}, kiemtra={}, lapbang={}):
        return self.render_string(
            "reports/kyduyet3.html",
            duyet=duyet, kiemtra=kiemtra, lapbang=lapbang)
