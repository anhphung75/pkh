import os
import json
import argparse
import arrow
import ssl
import asyncio
import tornado.ioloop
import tornado.web as web
import tornado.httpserver as httpserver
import logging
import tornado.escape
import tornado.websocket

from ttdl import Maychu
from ttxl.reports import dutoan, qtgt, qtvt
from ttxl.reports import bth_dot_qtgt
from ttxl.reports import bth_dot_vl
from hoasy.forms import qtgt as frmqtgt
from hoasy.reports import base as rptbase
from hoasy.reports import dutoan as rptdutoan
from hoasy.reports import qtgt as rptqtgt
from hoasy.reports import qtvt as rptqtvt
from hoasy.reports import bth_dot_qtgt as rptbthqtgt
from hoasy.reports import bth_dot_vl as rptbthvl

# tornado.locale.set_default_locale('vi_VI')


class WebBase(web.RequestHandler):
    def prepare(self):
        # get_current_user cannot be a coroutine, so set
        # self.current_user in prepare instead.
        user_id = self.get_secure_cookie("web_user")
        if user_id:
            self.current_user = 'Khach'
        #    self.current_user = await self.queryone(
        #        "SELECT * FROM authors WHERE id = %s", int(user_id)
        #    )


class ApiBase(web.RequestHandler):
    def set_default_headers(self):
        """Set the default response header to be JSON."""
        self.set_header("Content-Type", 'application/json; charset="utf-8"')
        self.set_header("Access-Control-Allow-Origin", "*")

    def send_response(self, data, status=200):
        """Construct and send a JSON response with appropriate status code."""
        self.set_status(status)
        self.write(json.dumps(data))


class SseBase(web.RequestHandler):
    def set_default_headers(self):
        """Set the default response header to be JSON."""
        self.set_header("Content-Type", "text/event-stream")
        self.set_header("Cache-Control", "no-cache")
        self.set_header("Access-Control-Allow-Origin", "*")

    def send_response(self, utf8data, status=200):
        """Construct and send a JSON response with appropriate status code."""
        self.set_status(status)
        self.write('data:{}\n\n'.format(utf8data))


class MainHandler(WebBase):
    def get(self):
        self.render("base_vuejs3.html", error=None)


class Frm_Hoso(WebBase):
    def get(self, schema):
        schema = schema.lower()
        self.render("forms/hoso/main.html", error=None)


class Frm_Qtgt(WebBase):
    def get(self, schema):
        schema = schema.lower()
        self.render("forms/qtgt/main.html", error=None)


class Rpt_Dutoan(WebBase):
    def get(self, schema):
        schema = schema.lower()
        if schema == "qlmltđ":
            schema = "qlmltd"
        if schema in ['pkt', 'pkh', 'pkd', 'qlmlq2', 'qlmlq9', 'qlmltd']:
            data = dutoan.dulieuin(schema)
            self.render("reports/dutoan/main.html", error=None,
                        dulieuin=data['dulieuin'], dutoan=data['dutoan'])
        else:
            self.render("errors/404.html", error=None)


class Rpt_Qtgt(WebBase):
    def get(self, schema):
        schema = schema.lower()
        if schema == "qlmltđ":
            schema = "qlmltd"
        if schema in ['pkh', 'pkd', 'qlmlq2', 'qlmlq9', 'qlmltd']:
            data = qtgt.dulieuin(schema)
            self.render("reports/qtgt/main.html", error=None,
                        dulieuin=data['dulieuin'], qtgt=data['qtgt'])
        else:
            self.render("errors/404.html", error=None)


class Rpt_Qtvt(WebBase):
    def get(self, schema):
        schema = schema.lower()
        if schema == "qlmltđ":
            schema = "qlmltd"
        if schema in ['pkh', 'pkd', 'qlmlq2', 'qlmlq9', 'qlmltd']:
            data = qtvt.dulieuin(schema)
            self.render("reports/qtvt/main.html", error=None,
                        dulieuin=data['dulieuin'], qtvt=data['qtvt'])
        else:
            self.render("errors/404.html", error=None)


class Rpt_BthDotQtgt(WebBase):
    def get(self, schema):
        schema = schema.lower()
        if schema == "qlmltđ":
            schema = "qlmltd"
        if schema in ['pkh', 'pkd', 'qlmlq2', 'qlmlq9', 'qlmltd']:
            data = bth_dot_qtgt.dulieuin(schema)
            self.render("reports/bth_dot_qtgt/main.html", error=None,
                        dulieuin=data['dulieuin'], bth_dot_qtgt=data['bth_dot_qtgt'])
        else:
            self.render("errors/404.html", error=None)


class Rpt_BthDotVl(WebBase):
    def get(self, schema):
        schema = schema.lower()
        if schema == "qlmltđ":
            schema = "qlmltd"
        if schema in ['pkh', 'pkd', 'qlmlq2', 'qlmlq9', 'qlmltd']:
            data = bth_dot_vl.dulieuin(schema)
            self.render("reports/bth_dot_vl/main.html", error=None,
                        dulieuin=data['dulieuin'], bth_dot_vl=data['bth_dot_vl'])
        else:
            self.render("errors/404.html", error=None)


class WebApp(web.Application):
    def __init__(self):
        handlers = [
            (r"/", MainHandler),
            (r"/([^/]+)/forms/hoso", Frm_Hoso),
            (r"/([^/]+)/forms/qtgt", Frm_Qtgt),
            (r"/([^/]+)/reports/dutoan", Rpt_Dutoan),
            (r"/([^/]+)/reports/qtgt", Rpt_Qtgt),
            (r"/([^/]+)/reports/qtvt", Rpt_Qtvt),
            (r"/([^/]+)/reports/tonghop/dotqtgt", Rpt_BthDotQtgt),
            (r"/([^/]+)/reports/tonghop/dotvl", Rpt_BthDotVl),
            #(r"/qlmlt%C4%91/reports/qtgt", Rpt_Qtgt),
        ]
        settings = dict(
            webapp_title=u"PKH",
            template_path=os.path.join(os.path.dirname(__file__), "templates"),
            static_path=os.path.join(os.path.dirname(__file__), "static"),
            ui_modules={
                "FrmQtgt_Ongnganh": frmqtgt.Ongnganh,
                "RptQuochuy": rptbase.Quochuy,
                "RptKyduyet3": rptbase.Kyduyet3,
                "RptDutoan_1Hoso": rptdutoan.Hoso,
                "RptDutoan_Ongnganh": rptdutoan.HosoOngnganh,
                "RptDutoan_Ongcai": rptdutoan.HosoOngcai,
                "RptDutoan_2Phui": rptdutoan.Hoso2Phui,
                "RptDutoan_Quochuy": rptdutoan.Quochuy,
                "RptDutoan_Tieude": rptdutoan.Tieude,
                "RptDutoan_PhuiTieude": rptdutoan.PhuiTieude,
                "RptDutoan_PhuiTong": rptdutoan.PhuiTong,
                "RptDutoan_OcCpxd": rptdutoan.OcCpxd,
                "RptDutoan_OcCpvt": rptdutoan.OcCpvt,
                "RptDutoan_OcCpvl": rptdutoan.OcCpvl,
                "RptDutoan_OnCpxd": rptdutoan.OnCpxd,
                "RptDutoan_OnCpvt": rptdutoan.OnCpvt,
                "RptDutoan_OnCpvl": rptdutoan.OnCpvl,
                "RptDutoan_Tlmd": rptdutoan.Tlmd,
                "RptDutoan_Tlmd2": rptdutoan.Tlmd2,
                "RptDutoan_Cpql_Nd32_2015": rptdutoan.Cpql_Nd32_2015,
                "RptDutoan_Cpql2_Nd32_2015": rptdutoan.Cpql2_Nd32_2015,
                "RptDutoan_Cpql_Nd68_2019": rptdutoan.Cpql_Nd68_2019,
                "RptDutoan_Cpql2_Nd68_2019": rptdutoan.Cpql2_Nd68_2019,
                "RptDutoan_Kettoan": rptdutoan.Kettoan,
                "RptDutoan_Footer": rptdutoan.Footer,
                "RptQtgt_1Hoso": rptqtgt.Hoso,
                "RptQtgt_Ongnganh": rptqtgt.HosoOngnganh,
                "RptQtgt_Ongcai": rptqtgt.HosoOngcai,
                "RptQtgt_2Phui": rptqtgt.Hoso2Phui,
                "RptQtgt_Quochuy": rptqtgt.Quochuy,
                "RptQtgt_Tieude": rptqtgt.Tieude,
                "RptQtgt_PhuiTieude": rptqtgt.PhuiTieude,
                "RptQtgt_PhuiTong": rptqtgt.PhuiTong,
                "RptQtgt_OngcaiCpxd": rptqtgt.OngcaiCpxd,
                "RptQtgt_OngcaiCpvt": rptqtgt.OngcaiCpvt,
                "RptQtgt_OngcaiCpvl": rptqtgt.OngcaiCpvl,
                "RptQtgt_OngnganhCpxd": rptqtgt.OngnganhCpxd,
                "RptQtgt_OngnganhCpvt": rptqtgt.OngnganhCpvt,
                "RptQtgt_OngnganhCpvl": rptqtgt.OngnganhCpvl,
                "RptQtgt_ChiphiDandong": rptqtgt.ChiphiDandong,
                "RptQtgt_Cpql_Nd32_2015": rptqtgt.Cpql_Nd32_2015,
                "RptQtgt_Cpql2_Nd32_2015": rptqtgt.Cpql2_Nd32_2015,
                "RptQtgt_Cpql_Nd68_2019": rptqtgt.Cpql_Nd68_2019,
                "RptQtgt_Cpql2_Nd68_2019": rptqtgt.Cpql2_Nd68_2019,
                "RptQtgt_Cpql_20200721": rptqtgt.Cpql_20200721,
                "RptQtgt_Cpql2_20200721": rptqtgt.Cpql2_20200721,
                "RptQtgt_Tlmd": rptqtgt.Tlmd,
                "RptQtgt_Tlmd2": rptqtgt.Tlmd2,
                "RptQtgt_Kettoan": rptqtgt.Kettoan,
                "RptQtgt_Footer": rptqtgt.Footer,
                "RptQtvt_1Dot": rptqtvt.Dot,
                "RptQtvt_Quochuy": rptqtvt.Quochuy,
                "RptQtvt_Tieude": rptqtvt.Tieude,
                "RptQtvt_Cpvt": rptqtvt.Cpvt,
                "RptQtvt_Chungtu": rptqtvt.Chungtu,
                "RptBthQtgt_1Dot": rptbthqtgt.Dot,
                "RptBthVl_1Dot": rptbthvl.Dot,
                "RptBthVl_Tieude": rptbthvl.Tieude,
                "RptBthVl_TieudeCpvlHoso": rptbthvl.TieudeCpvlHoso,
                "RptBthVl_Cpvl": rptbthvl.Cpvl,
                "RptBthVl_Hoso": rptbthvl.Hoso,

            },
            xsrf_cookies=True,
            cookie_secret="__TODO:_GENERATE_YOUR_OWN_RANDOM_VALUE_HERE__",
            login_url="/auth/login",
            debug=True,
            autoreload=True,
        )
        super(WebApp, self).__init__(handlers, **settings)


def make_app():
    # Create the global connection pool.
    return WebApp()


db = None


def main():
    # for win10
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

    # tornado.options.options.logging = None
    # tornado.options.parse_command_line()
    # read args to run
    parser = argparse.ArgumentParser(allow_abbrev=False)
    parser.add_argument('--server', '-server',
                        type=str, default='mssql_')
    parser.add_argument('--db_user', '-dbuser',
                        type=str, default='pkh.web')
    parser.add_argument('--db_pwd', '-dbpwd',  type=str, default='pkh.web')
    parser.add_argument('--db_host', '-dbhost',
                        type=str, default='pkh.web')
    parser.add_argument('--db_name', '-dbname',
                        type=str, default='pkh.web')
    parser.add_argument('--port', '-p',  type=int, default=8888)
    thamso = parser.parse_args()

    # creat db
    global db
    db = Maychu(thamso.server, thamso.db_user, thamso.db_pwd,
                thamso.db_host, thamso.db_name)

    # creat webapp
    app = make_app()
    sercurity_socket = True
    if sercurity_socket:
        ssl_ctx = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
        ssl_path = "services/webapp/ssl_cert"
        print('ssl path={}'.format(os.path.join(ssl_path, "pkh.key")))
        ssl_ctx.load_cert_chain(os.path.join(ssl_path, "pkh.crt"),
                                os.path.join(ssl_path, "pkh.key"))
        server = httpserver.HTTPServer(app, ssl_options=ssl_ctx)
    else:
        server = httpserver.HTTPServer(app)

    server.listen(thamso.port)
    tornado.ioloop.IOLoop.instance().start()


if __name__ == "__main__":
    main()
