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
        self.render("report_qtgt.html", error=None)
        # self.write("Hello World")


class Hoso_Handler(WebBase):
    def get(self):
        self.render("hoso.html", webapp_title='PKH')
        # self.write("Hello World")


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
            # ui_modules={"Entry": EntryModule},
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


def main():
    # for win10
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

    # tornado.options.options.logging = None
    # tornado.options.parse_command_line()
    # read args to run
    parser = argparse.ArgumentParser(allow_abbrev=False)
    parser.add_argument('--server', '-server',
                        type=str, default='mssql_test')
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
