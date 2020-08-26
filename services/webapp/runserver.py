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
from tornado.options import define, options

import comps
from ttdl import Maychu
from ttxl import apiHoso
#from ttxl_sse import hoso as sse_hoso


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
        self.render("reports/qtgt.html", error=None)
        # self.write("Hello World")


class Hoso_Handler(WebBase):
    def get(self):
        self.render("hoso.html", webapp_title='PKH')
        # self.write("Hello World")


tttt = [
    {'maqt': 'gmmp001', 'hosoid': 'gmmp001', 'khachhangid': '001', 'madot': 'gm001',
    'cpqlid':20200721, 'baogiaid':20200721,
     'qtoc': {'phui': '001', 'vattu': '001', 'tailap': '001'},
     'qton': {'phui': '002', 'vattu': '002', 'tailap': '002'},
     },
    {'maqt': 'gmmp002', 'hosoid': 'gmmp002', 'khachhangid': '002', 'madot': 'gm002',
    'cpqlid':7, 'baogiaid':20200526,
     'qtoc': {'phui': '002', 'vattu': '002', 'tailap': '002'},
     'qton': {'phui': '001', 'vattu': '001', 'tailap': '001'},
     },
]
qtgt = {
    'gmmp001': {'hosoid': 'gmmp0001', 'dotid': 'gm001', 'hesoquanlyid': 20200721,
                'baogiaid': 20200721, 'plgia': 'dutoan', 'madvtc': 'QLMLTD',
                'ngaylap': '20200820', "inqt":'on',
                'qtoc': {
                    'phui': {'maqtphui': '001', 'zvl': 0, 'znc': 0, 'zmtc': 0},
                    'vattu': {'maqtvattu': '001', 'zvl': 0, 'znc': 1, 'zmtc': 0},
                    'tailap': {'maqttailap': '001', 'ztl': 0}
                },
                'qton': {
                    'phui': {'maqt33': '001', 'zvl': 0, 'znc': 0, 'zmtc': 2},
                    'vattu': {'maqt34': '001', 'zvl': 0, 'znc': 0, 'zmtc': 0},
                    'tailap': {'maqt35': '001', 'ztl': 0}
                }, },
    'gmmp002': {'hosoid': 'gmmp0002', 'dotid': 'gm001', 'hesoquanlyid': 20200721,
                'baogiaid': 20200721, 'plgia': 'dutoan', 'madvtc': 'QLMLTD',
                'ngaylap': '20200820', "inqt":'on',
                'qtoc': {
                    'phui': {'maqt31': '001', 'zvl': 0, 'znc': 0, 'zmtc': 1},
                    'vattu': {'maqt32': '001', 'zvl': 0, 'znc': 0, 'zmtc': 0},
                    'tailap': {'maqt35': '001', 'ztl': 0}
                },
                'qton': {
                    'phui': {'maqt33': '001', 'zvl': 0, 'znc': 0, 'zmtc': 0},
                    'vattu': {'maqt34': '001', 'zvl': 0, 'znc': 0, 'zmtc': 0},
                    'tailap': {'maqt35': '001', 'ztl': 0}
                }, },
}
qtphui = {
    '001': [{'chiphiid': '001', 'mota': '- Cắt mặt nhựa và BTXM', 'dvt': 'mét',
             'sl': 16, 'giavl': 6510, 'gianc': 13174, 'giamtc': 5815,
             'tienvl': 104154, 'tiennc': 210776, 'tienmtc': 93040},
            {'chiphiid': '002', 'mota': '- Đào bốc mặt đường nhựa', 'dvt': 'm3',
             'sl': 0.24, 'giavl': 0, 'gianc': 538918, 'giamtc': 0,
             'tienvl': 0, 'tiennc': 129340, 'tienmtc': 0},
            ],
    '002': [{'chiphiid': '001', 'mota': '- Cắt mặt nhựa và BTXM', 'dvt': 'mét',
             'sl': 16, 'giavl': 6510, 'gianc': 13174, 'giamtc': 5815,
             'tienvl': 104154, 'tiennc': 210776, 'tienmtc': 93040},
            {'chiphiid': '002', 'mota': '- Đào bốc mặt đường nhựa', 'dvt': 'm3',
             'sl': 0.24, 'giavl': 0, 'gianc': 538918, 'giamtc': 0,
             'tienvl': 0, 'tiennc': 129340, 'tienmtc': 0},
            ],
}
qtvattu = {
    '001': [{'chiphiid': '001', 'mota': 'Đai lấy nước PP 100 x 20F', 'dvt': 'bộ',
             'sl': 1, 'giavl': 133900, 'gianc': 47904, 'giamtc': 0,
             'tienvl': 133900, 'tiennc': 47904, 'tienmtc': 0},
            {'chiphiid': '002', 'mota': 'Ống HDPE 25x3mm', 'dvt': 'mét',
             'sl': 12, 'giavl': 13895, 'gianc': 17174, 'giamtc': 774,
             'tienvl': 166740, 'tiennc': 206088, 'tienmtc': 9288},
            ],
    '002': [{'chiphiid': '003', 'mota': 'Đai lấy nước PP 150 x 20F', 'dvt': 'bộ',
             'sl': 1, 'giavl': 133900, 'gianc': 47904, 'giamtc': 0,
             'tienvl': 133900, 'tiennc': 47904, 'tienmtc': 0},
            {'chiphiid': '002', 'mota': 'Ống HDPE 25x3mm', 'dvt': 'mét',
             'sl': 12, 'giavl': 13895, 'gianc': 17174, 'giamtc': 774,
             'tienvl': 166740, 'tiennc': 206088, 'tienmtc': 9288},
            ],
}
qttailap = {
    '001': [{'chiphiid': '001', 'mota': 'Gạch hình sin', 'dvt': 'm2',
             'sl': 0.35, 'gia': 412000},
            {'chiphiid': '002', 'mota': '- Đào bốc mặt đường nhựa', 'dvt': 'm2',
             'sl': 2.4, 'gia': 890000}, ],
    '002': [{'chiphiid': '001', 'mota': 'Gạch hình sin', 'dvt': 'm2',
             'sl': 0.35, 'gia': 412000},
            {'chiphiid': '002', 'mota': '- Đào bốc mặt đường nhựa', 'dvt': 'm2',
             'sl': 2.4, 'gia': 890000}, ],
}
hoso = {
    'gmmp001': {'sohoso': 'gm059367/20', 'makhachhang': '001', 'diachigandhn': 'T15- Kha Vạn Cân- Q.TĐ', },
    'gmmp002': {'sohoso': 'gm059368/20', 'makhachhang': '002', 'diachigandhn': 'T17- Kha Vạn Cân- Q.TĐ', },
}
dot = {
    'gm001': {'sodot': '2020GMMP001', 'ngaylendot': '20200815'},
    'gm002': {'sodot': '2020GMMP002', 'ngaylendot': '20200815'},
}
khachhang = {
    '001': {'khachhang': 'Phạm Thị Lan', 'diachi': 'T15- Kha Vạn Cân- Q.TĐ'},
    '002': {'khachhang': 'Bùi Văn Tiệp', 'diachi': 'T15- Kha Vạn Cân- Q.TĐ'},
}
chiphiquanly={
    7:{"vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.05, "giantiepkhac": 0,
                  "thutinhtruoc": 0.055, "khaosat": 0.0236, "thietke": 1.2, "giamsat": 0.02566},
    20200721:{"vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.055, "giantiepkhac": 0.02,
                  "thutinhtruoc": 0.055, "khaosat": 0.0207, "thietke": 1.2, "giamsat": 0.02566},
}

class Rpt_Qtgt(WebBase):
    def get(self):
        self.render("reports/qtgt.html",
                    tttt=tttt, qtgt=qtgt, hoso=hoso, dot=dot, khachhang=khachhang,
                    qtphui=qtphui, qtvattu=qtvattu, qttailap=qttailap,
                    chiphiquanly=chiphiquanly,error=None)


class TestVuejs(WebBase):
    def get(self):
        self.render("reports/test_vuejs.html", error=None)


class Api1108_Hoso_Rest(ApiBase):
    def get(self, namhoso):
        uuid = 'boss{}'.format(int(arrow.utcnow().float_timestamp * 1000))
        res = {'id': uuid, 'event': '', 'data': []}
        # try:
        namhoso = 2019
        data = apiHoso.gom(db, namhoso)
        print('ApiRest get hoso gom ={}'.format(str(data)))
        res['data'] = data
        res['event'] = "gom"
        # except:
        #    res['event'] = 'Không có dữ liệu'
        self.send_response(res)

    def post(self, namhoso):
        message = self.request.body
        parsed = tornado.escape.json_decode(message)
        # event = parsed['event']
        data = parsed['data']
        print('ApiRest post data from client body={}'.format(str(data)))
        # data = self.get_argument("data")

        # print('ApiRest post data from client namhoso={} id={} event={} data={}'.format(
        #    namhoso, id, event, str(data)))


class Api1108_Hoso_Crud(ApiBase):
    def get(self, nam, mahoso):
        res = {'info': '', 'hoso': []}
        try:
            res['hoso'] = apiHoso.doc(db, mahoso)
            res['info'] = 'OK'
        except:
            res['info'] = 'Không có dữ liệu'
        self.send_response(res)

    # @tornado.web.authenticated
    def post(self):
        id = self.get_argument("id", None)
        event = self.get_argument("event")
        data = self.get_argument("data")
        print('data from client id={} event={} data={}'.format(id, event, data))


dssse_hoso = []


class Api1108_Hoso_Sse(SseBase):
    def get(self):
        for res in dssse_hoso:
            try:
                print('try send res={}'.format(str(res)))
                self.send_response(res)
            except:
                pass
        # self.write("Hello World")


class Api1108_ws(tornado.websocket.WebSocketHandler):
    waiters = set()
    cache = []
    cache_size = 200
    toa = khach = ''

    def get_compression_options(self):
        # Non-None enables compression with default options.
        return {}

    def open(self, groupid, clientid):
        toa = groupid
        khach = clientid
        Api1108_ws.waiters.add(self)
        print('toa={}, khach={}'.format(toa, khach))

    def on_close(self):
        Api1108_ws.waiters.remove(self)

    @classmethod
    def update_cache(cls, chat):
        cls.cache.append(chat)
        if len(cls.cache) > cls.cache_size:
            cls.cache = cls.cache[-cls.cache_size:]

    @classmethod
    def send_updates(cls, chat):
        logging.info("sending message to %d waiters", len(cls.waiters))
        for waiter in cls.waiters:
            try:
                print("sending message to waiters {}".format(waiter))
                print("sending {}".format(str(chat['tin'])))
                waiter.write_message(chat)
            except:
                logging.error("Error sending message", exc_info=True)

    def check_origin(self, origin):
        return True

    def on_message(self, message):
        logging.info("got message %r", message)
        print('tin tu client {}'.format(message))
        parsed = tornado.escape.json_decode(message)
        chat = {"tin": parsed['tin'], "kho": parsed['kho']}
        # check toa magiaotiep khach
        tgdi = int(arrow.utcnow().float_timestamp * 1000)
        chat['tin']['ve'] = 'boss.{}'.format(str(tgdi))
        if chat['tin']['nhan'] == 'gom':
            namhoso = chat['kho']['hoso']['namhoso']
            data = apiHoso.gom(db, namhoso)
            # chuẩn bị data gửi lại
            chat['tin']['nhan'] = 'gom'
            chat['kho']['hoso'] = data
        elif chat['tin']['nhan'] == 'moi':
            pass
            # chuyen thang client, cap nhật server
            # hsr = chat['data']['goi']['hoso']
            # data = hoso.sua(db, hsr)
        elif chat['tin']['nhan'] == 'sua':
            pass
            # chuyen thang client, cap nhật server
            # hsr = chat['data']['goi']['hoso']
            # data = hoso.sua(db, hsr)
        elif chat['tin']['nhan'] == 'xoa':
            pass
            # chuyen thang client, cap nhật server
            # hsr = chat['data']['goi']['hoso']
            # data = hoso.sua(db, hsr)

        Api1108_ws.update_cache(chat)
        Api1108_ws.send_updates(chat)


class WebApp(web.Application):
    def __init__(self):
        handlers = [
            (r"/", MainHandler),
            (r"/hoso/", Hoso_Handler),
            (r"/test_vuejs", TestVuejs),
            (r"/reports/qtgt", Rpt_Qtgt),
            # (r"/api1108/hoso/sse", Api1108_Hoso_Sse),
            (r"/api1108/hoso/([^/]+)", Api1108_Hoso_Rest),
            # (r"/api1108/hoso/([^/]+)/([^/]+)", Api1108_Hoso_Crud),
            # socket
            # (r"/api1108/([^/]+)/hoso/([^/]+)", Api1108_ws),
        ]
        settings = dict(
            webapp_title=u"PKH",
            template_path=os.path.join(os.path.dirname(__file__), "templates"),
            static_path=os.path.join(os.path.dirname(__file__), "static"),
            ui_modules={"RptCpqlNd68": comps.RptCpql_Nd2019_68},
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
    sercurity_socket = False
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
