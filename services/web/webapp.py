import os
import json
import datetime
import tornado.ioloop
import tornado.web as web
import logging
import tornado.escape
import tornado.options
import tornado.websocket


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
        self.render("hoso.html", webapp_title='PKH')
        # self.write("Hello World")


class Api1108_Hoso_All(ApiBase):
    def get(self, mahoso):
        res = {'info': '', 'hoso': []}
        nam = -1
        try:
            nam = int(mahoso)
        except:
            pass
        print('nam={}'.format(nam))
        if nam>0:
            try:
                data = hoso.gom(nam)
                print('hoso={}'.format(data))
                res['hoso'] = data
                res['info'] = 'OK'
            except:
                res['info'] = 'Không có dữ liệu'
        else:
            try:
                data = hoso.xem(mahoso)
                print('hoso={}'.format(data))
                res['hoso'] = data
                res['info'] = 'OK'
            except:
                res['info'] = 'Không có dữ liệu'
        self.send_response(res)




class Api1108_Hoso_Crud(ApiBase):
    def get(self, nam, mahoso):
        res = {'info': '', 'hoso': []}
        try:
            res['hoso'] = hoso.xem(mahoso)
            res['info'] = 'OK'
        except:
            res['info'] = 'Không có dữ liệu'
        self.send_response(res)


class Api1108_ws(tornado.websocket.WebSocketHandler):
    waiters = set()
    cache = []
    cache_size = 200

    def get_compression_options(self):
        # Non-None enables compression with default options.
        return {}

    def open(self):
        print("WebSocket opened is {}".format(Api1108_ws.selected_subprotocol))
        Api1108_ws.waiters.add(self)

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
                waiter.write_message(chat)
            except:
                logging.error("Error sending message", exc_info=True)

    def check_origin(self, origin):
        return True

    def on_message(self, message):
        logging.info("got message %r", message)
        print('tin tu client {}'.format(message))
        parsed = tornado.escape.json_decode(message)
        chat = {"tin": parsed['tin'], "goi": parsed['goi']}

        Api1108_ws.update_cache(chat)
        Api1108_ws.send_updates(chat)


class WebApp(web.Application):
    def __init__(self):
        handlers = [
            (r"/", MainHandler),
            (r"/hoso/", Hoso_Handler),
            (r"/hoso/api1108", Api1108_ws),
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
