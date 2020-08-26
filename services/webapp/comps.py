import tornado.web as web


class RptTailap(web.UIModule):
    def loaddata():
        __data = {
            '001': [{'chiphiid': '001', 'mota': 'Gạch hình sin', 'dvt': 'm2',
                     'sl': 0.35, 'gia': 412000},
                    {'chiphiid': '002', 'mota': '- Đào bốc mặt đường nhựa', 'dvt': 'm2',
                     'sl': 2.4, 'gia': 890000}, ],
            '002': [{'chiphiid': '001', 'mota': 'Gạch hình sin', 'dvt': 'm2',
                     'sl': 0.35, 'gia': 412000},
                    {'chiphiid': '002', 'mota': '- Đào bốc mặt đường nhựa', 'dvt': 'm2',
                     'sl': 2.4, 'gia': 890000}, ],
        }
        return __data

    def render(self, maon=None, maoc=None):
        # load data
        return self.render_string(
            "reports/comps/rpt-tailap.html", entry=entry, show_comments=show_comments)


def loadcpql(id):
    chiphiquanly = {
        7: {"vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.05, "giantiepkhac": 0,
            "thutinhtruoc": 0.055, "khaosat": 0.0236, "thietke": 1.2, "giamsat": 0.02566},
        20200721: {"vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.055, "giantiepkhac": 0.02,
                   "thutinhtruoc": 0.055, "khaosat": 0.0207, "thietke": 1.2, "giamsat": 0.02566},
    }
    data = chiphiquanly[id]
    print(f"data={data} type={type(data)}")
    return data


class RptCpql_Nd68_2019(web.UIModule):
    def render(self, cpqlid=None, zvl=0, znc=0, zmtc=0, isoc=False):
        # load data
        cpql = loadcpql(cpqlid)
        return self.render_string(
            "reports/qtgt/cpql-nd68-2019.html",
            cpql=cpql, zvl=zvl, znc=znc, zmtc=zmtc)
