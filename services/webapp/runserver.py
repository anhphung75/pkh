import os
import platform
import json
import argparse
import arrow
import ssl
import asyncio
import tornado.ioloop
import tornado.web as web
import tornado.httpserver as httpserver
import urllib
import tornado.escape
import tornado.websocket

from ttdl.mssql import Server as svMssql
from ttdl.postgresql import Server as svPostgre
#from ttdl.sqlite import Server as svSqlite

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
        #self.set_header("Content-Type", 'application/json; charset="utf-8"')
        self.set_header(
            "Content-Type", 'application/x-www-form-urlencoded; charset="utf-8"')
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


class Wss_Hoso(tornado.websocket.WebSocketHandler):
    waiters = set()
    cache = []
    cache_size = 200
    pbd = nvid = ''

    def get_compression_options(self):
        # Non-None enables compression with default options.
        return {}

    def check_origin(self, origin):
        parsed_origin = urllib.parse.urlparse(origin)
        print(f"parsed_origin={parsed_origin} netloc={parsed_origin.netloc}")
        if ('https' in parsed_origin.scheme) and (':8888' in parsed_origin.netloc):
            return True
        return False

    def open(self, groupid=''):
        Wss_Hoso.pbd = f"{groupid}".lower()
        print(f"pbd={Wss_Hoso.pbd}")
        Wss_Hoso.waiters.add(self)

    def on_close(self):
        Wss_Hoso.waiters.remove(self)

    @classmethod
    def update_cache(cls, chat):
        cls.cache.append(chat)
        if len(cls.cache) > cls.cache_size:
            cls.cache = cls.cache[-cls.cache_size:]

    @classmethod
    def send_updates(cls, chat):
        print(f"sending message to {len(cls.waiters)} waiters")
        for waiter in cls.waiters:
            try:
                waiter.write_message(chat)
            except:
                print(f"Error sending message")

    def on_message(self, tin):
        print(f"message tu client={tin}")
        tin = tornado.escape.json_decode(tin)
        # check toa magiaotiep khach
        idutc = int(arrow.utcnow().float_timestamp * 1000)
        # check dk de pass
        if "bang" not in tin['dl']:
            return None
        _bang = f"{tin['dl']['bang']}"
        if "gom" in tin['dl']:
            _nam = f"{tin['dl']['gom']}"
            dl = [
                {"idutc": 11111, "sodot": "2020gmmp001", "sohoso": "gm059365/20", "khachhang": "Tran Thi Thu 1",
                 "diachigandhn": "T15- Kha Vạn Cân- Q.TĐ", },
                {"idutc": 22222, "sodot": "2020gmmp001", "sohoso": "gm059366/20", "khachhang": "Tran Thi Thu 2",
                 "diachigandhn": "T15- Kha Vạn Cân- Q.TĐ", },
                {"idutc": 33333, "sodot": "2020gmmp001", "sohoso": "gm059367/20", "khachhang": "Tran Thi Thu 4",
                 "diachigandhn": "T15- Kha Vạn Cân- Q.TĐ", },
                {"idutc": 4444, "sodot": "2020gmmp001", "sohoso": "gm059367/20", "khachhang": "Test Anh",
                 "diachigandhn": "T15- Kha Vạn Cân- Q.TĐ", }
            ]
        elif "nap" in tin['dl']:
            _uid = f"{tin['dl']['nap']}"
        elif "luu" in tin['dl']:
            _dl = f"{tin['dl']['luu']}"
        elif "moi" in tin['dl']:
            _dl = f"{tin['dl']['moi']}"
        elif "sua" in tin['dl']:
            _dl = f"{tin['dl']['sua']}"
        else:
            return None
        chat = {
            "id": idutc,
            "ve": f"boss.{idutc}.{Wss_Hoso.pbd}",
            "dl": {"bang": _bang, "dl": dl}
        }
        Wss_Hoso.update_cache(chat)
        Wss_Hoso.send_updates(chat)


class Api_Hoso_Rest(ApiBase):
    def get(self, pbd, namhoso=None):
        pbd = pbd.lower()
        if pbd == "qlmltđ":
            pbd = "qlmltd"
        if pbd not in ['pkt', 'pkh', 'pkd', 'qlmlq2', 'qlmlq9', 'qlmltd']:
            self.send_response(None)
        if namhoso in ["", "all", "tat", "gom"]:
            namhoso = 9999
        else:
            try:
                namhoso = int(namhoso)
            except:
                self.send_response(None)
        #uuid = 'boss{}'.format(int(arrow.utcnow().float_timestamp * 1000))
        #res = {'id': uuid, 'event': '', 'data': []}
        #data = api.HsKh(schema, namhoso).gom()

        data = [
            {"idutc": 11111, "sodot": "2020gmmp001", "sohoso": "gm059365/20", "khachhang": "Tran Thi Thu 1",
                "diachigandhn": "T15- Kha Vạn Cân- Q.TĐ", },
            {"idutc": 22222, "sodot": "2020gmmp001", "sohoso": "gm059366/20", "khachhang": "Tran Thi Thu 2",
                "diachigandhn": "T15- Kha Vạn Cân- Q.TĐ", },
            {"idutc": 33333, "sodot": "2020gmmp001", "sohoso": "gm059367/20", "khachhang": "Tran Thi Thu 4",
                "diachigandhn": "T15- Kha Vạn Cân- Q.TĐ", },
            {"idutc": 4444, "sodot": "2020gmmp001", "sohoso": "gm059367/20", "khachhang": "Test Anh",
                "diachigandhn": "T15- Kha Vạn Cân- Q.TĐ", }
        ]
        print(f'ApiRest pbd={pbd} nam={namhoso} data={data}')
        # except:
        #    res['event'] = 'Không có dữ liệu'
        self.send_response({"info": "gom", "data": data})

    def post(self, namhoso):
        message = self.request.body
        parsed = tornado.escape.json_decode(message)
        # event = parsed['event']
        data = parsed['data']
        print('ApiRest post data from client body={}'.format(str(data)))
        # data = self.get_argument("data")

        # print('ApiRest post data from client namhoso={} id={} event={} data={}'.format(
        #    namhoso, id, event, str(data)))


class MainHandler(WebBase):
    def get(self):
        self.render("base_vuejs3.html", error=None)


class Frm_Hoso(WebBase):
    def get(self, schema):
        schema = f"{schema}".lower()
        if schema in ['pkh']:
            self.set_secure_cookie("pbd", "Ph0ngK3H0@ch")
            self.render("forms/hoso/pkh.html", error=None)
        else:
            self.set_secure_cookie("pbd", "kh@chTh@nThi3t")


class Frm_Qtgt(WebBase):
    def get(self, schema):
        schema = schema.lower()
        if schema in ['pkh']:
            self.set_secure_cookie("pbd", "Ph0ngK3H0@ch")
            self.render("forms/qtgt/pkh.html", error=None)
        else:
            self.set_secure_cookie("pbd", "kh@chTh@nThi3t")


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


class Rpt_BthDotKlVl(WebBase):
    def get(self, schema):
        schema = schema.lower()
        if schema == "qlmltđ":
            schema = "qlmltd"
        if schema in ['pkh', 'pkd', 'qlmlq2', 'qlmlq9', 'qlmltd']:
            data = bth_dot_vl.dulieuin(schema)
            self.render("reports/bth_dot_klvl/main.html", error=None,
                        dulieuin=data['dulieuin'], bth_dot_vl=data['bth_dot_vl'])
        else:
            self.render("errors/404.html", error=None)


class WebApp(web.Application):
    def __init__(self):
        handlers = [
            (r"/", MainHandler),
            (r"/([^/]+)/api/hoso/([^/]+)", Api_Hoso_Rest),
            # api socket
            (r"/([^/]+)/wss/hoso", Wss_Hoso),
            # form
            (r"/([^/]+)/forms/hoso", Frm_Hoso),
            (r"/([^/]+)/forms/qtgt", Frm_Qtgt),
            # report
            (r"/([^/]+)/reports/dutoan", Rpt_Dutoan),
            (r"/([^/]+)/reports/qtgt", Rpt_Qtgt),
            (r"/([^/]+)/reports/qtvt", Rpt_Qtvt),
            (r"/([^/]+)/reports/tonghop/dotqtgt", Rpt_BthDotQtgt),
            (r"/([^/]+)/reports/tonghop/dotvl", Rpt_BthDotVl),
            (r"/([^/]+)/reports/tonghop/dotklvl", Rpt_BthDotKlVl),
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
                "RptBthVl_Tieude": rptbthvl.Tieude,
                "RptBthVl_1Dot": rptbthvl.Dot,
                "RptBthVl_TieudeCpvlHoso": rptbthvl.TieudeCpvlHoso,
                "RptBthVl_Cpvl": rptbthvl.Cpvl,
                "RptBthVl_Hoso": rptbthvl.Hoso,
                "RptBthKlVl_Tieude": rptbthvl.Tieude0,
                "RptBthKlVl_1Dot": rptbthvl.Dot0,
                "RptBthKlVl_TieudeCpvlHoso": rptbthvl.TieudeCpvl0Hoso0,
                "RptBthKlVl_Cpvl": rptbthvl.Cpvl0,
                "RptBthKlVl_Hoso": rptbthvl.Hoso0,

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
    if platform.system() == "windows":
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

    # tornado.options.options.logging = None
    # tornado.options.parse_command_line()
    # read args to run
    parser = argparse.ArgumentParser(allow_abbrev=False)
    parser.add_argument('--server', '-server',
                        type=str, default='postgresql')
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
    if thamso.server in ['mssql']:
        db = svMssql(thamso.db_user, thamso.db_pwd,
                     thamso.db_host, thamso.db_name)
    elif thamso.server in ['postgresql']:
        db = svPostgre(thamso.db_user, thamso.db_pwd,
                       thamso.db_host, thamso.db_name)
    else:
        db = svSqlite(thamso.db_user, thamso.db_pwd,
                      thamso.db_host, thamso.db_name)

    # creat webapp
    app = make_app()
    sercurity_socket = True
    if sercurity_socket:
        ssl_ctx = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
        ssl_path = "services/webapp/ssl_cert"
        print('ssl path={}'.format(os.path.join(ssl_path, "ssl_pem")))
        ssl_ctx.load_cert_chain(os.path.join(ssl_path, "cntd.local+8.pem"),
                                os.path.join(ssl_path, "cntd.local+8-key.pem"))
        server = httpserver.HTTPServer(app, ssl_options=ssl_ctx)
    else:
        server = httpserver.HTTPServer(app)

    server.listen(thamso.port)
    tornado.ioloop.IOLoop.instance().start()


if __name__ == "__main__":
    main()
