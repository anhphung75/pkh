import os
import json
import datetime
import tornado.ioloop
import tornado.web as web

from ttxl import hoso


class WebBase(web.RequestHandler):
    pass


class ApiBase(web.RequestHandler):
    def set_default_headers(self):
        """Set the default response header to be JSON."""
        self.set_header("Content-Type", 'application/json; charset="utf-8"')
        self.set_header("Access-Control-Allow-Origin", "*")

    def send_response(self, data, status=200):
        """Construct and send a JSON response with appropriate status code."""
        self.set_status(status)
        self.write(json.dumps(data))


class MainHandler(WebBase):
    def get(self):
        #self.render("home.html", webapp_title='PKH')
        self.write("Hello World")


class Hoso_Handler(WebBase):
    def get(self):
        #self.render("home.html", webapp_title='PKH')
        self.write("Hello World")


class Api1108_Hoso_All(ApiBase):
    def get(self, nam):
        res = {}
        try:
            nam = int(nam)
            res = hoso.xemds(nam)
        except:
            res['info'] = 'Không có dữ liệu'
        self.send_response(res)


class Api1108_Hoso_Crud(ApiBase):
    def get(self, nam, mahoso):
        res = {}
        try:
            nam = int(nam)
            res = apidata(self.db, ngaytinh)
            res['info'] = ''
        except:
            res['info'] = 'Không có dữ liệu'
        self.send_response(res)


class WebApp(web.Application):
    def __init__(self):
        handlers = [
            (r"/", MainHandler),
            (r"/hoso/", Hoso_Handler),
            (r"/api1108/hoso/([^/]+)?", Api1108_Hoso_All),
            (r"/api1108/hoso/([^/]+)/([^/]+)?", Api1108_Hoso_Crud),
        ]
        settings = dict(
            webapp_title=u"PKH",
            template_path=os.path.join(os.path.dirname(__file__), "templates"),
            static_path=os.path.join(os.path.dirname(__file__), "static"),
            #ui_modules={"Entry": EntryModule},
            xsrf_cookies=True,
            cookie_secret="__TODO:_GENERATE_YOUR_OWN_RANDOM_VALUE_HERE__",
            # login_url="/auth/login",
            debug=True,
            autoreload=True,
        )
        super(WebApp, self).__init__(handlers, **settings)


def make_app():
    # Create the global connection pool.
    return WebApp()


def main():
    # tornado.options.parse_command_line()
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    main()
