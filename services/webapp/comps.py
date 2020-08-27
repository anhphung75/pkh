import tornado.web as web
from utils import lamtronso, Tien


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


def tinh_cpql(cpqlid=None, zvl=0, znc=0, zmtc=0, ztl=0):
    chiphiquanly = {
        7: {"vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.05, "giantiepkhac": 0,
            "thutinhtruoc": 0.055, "khaosat": 0.0236, "thietke": 1.2, "giamsat": 0.02566},
        20200721: {"vl": 1, "nc": 1, "mtc": 1, "tructiepkhac": 0, "chung": 0.055, "giantiepkhac": 0.02,
                   "thutinhtruoc": 0.055, "khaosat": 0.0207, "thietke": 1.2, "giamsat": 0.02566},
    }
    try:
        cpqlid = int(cpqlid)
        zvl = int(zvl)
        znc = int(znc)
        zmtc = int(zmtc)
        ztl = int(ztl)
    except:
        cpqlid = 20200721
        zvl = 0
        znc = 0
        zmtc = 0
        ztl = 0
    heso = chiphiquanly[cpqlid]
    cp = {}
    cp['vl'] = lamtronso(zvl*heso['vl'], 0)
    cp['nc'] = lamtronso(znc*heso['nc'], 0)
    cp['mtc'] = lamtronso(zmtc*heso['mtc'], 0)
    tructiep = cp['vl'] + cp['nc'] + cp['mtc']
    cp['tructiepkhac'] = lamtronso(tructiep*heso['tructiepkhac'], 0)
    cp['tructiep'] = tructiep + cp['tructiepkhac']
    cp['chung'] = lamtronso(cp['tructiep']*heso['chung'], 0)
    cp['giantiepkhac'] = lamtronso(cp['tructiep']*heso['giantiepkhac'], 0)
    cp['giantiep'] = cp['chung'] + cp['giantiepkhac']
    cp['giaxaydung'] = cp['tructiep'] + cp['giantiep']
    cp['thutinhtruoc'] = lamtronso(cp['giaxaydung']*heso['thutinhtruoc'], 0)
    cp['xaydungtruocthue'] = cp['giaxaydung'] + cp['thutinhtruoc']
    cp['khaosatthietke'] = lamtronso(
        cp['xaydungtruocthue']*heso['khaosat']*heso['thietke'], 0)
    cp['giamsat'] = lamtronso(cp['xaydungtruocthue']*heso['giamsat'], 0)
    cp['tuvan'] = cp['khaosatthietke'] + cp['giamsat']
    cp['tongxaydungtruocthue'] = cp['xaydungtruocthue'] + cp['tuvan']
    cp['thuexaydung'] = lamtronso(cp['tongxaydungtruocthue'] * 0.1, 0)
    cp['tongxaydung'] = cp['tongxaydungtruocthue'] + cp['thuexaydung']
    cp['tailap'] = ztl
    cp['congtrinh'] = cp['tongxaydung']+ztl
    cp['congtrinhtruocthue'] = lamtronso(cp['congtrinh']*100/110, 0)
    cp['thuecongtrirnh'] = cp['congtrinh']-cp['congtrinhtruocthue']
    # format heso
    for i in ['tructiepkhac', 'giantiepkhac', 'chung', 'thutinhtruoc']:
        heso[i] = f"{heso[i]*100:01.1f} %".replace('.', ',')
    heso['khaosat'] = f"{heso['khaosat']*100:01.2f}%".replace('.', ',')
    heso['thietke'] = f"{heso['thietke']:01.1f}".replace('.', ',')
    heso['giamsat'] = f"{heso['giamsat']*100:01.3f}%".replace('.', ',')
    # format chiphi
    for i in cp:
        m = Tien(cp[i])
        cp[i] = m.so()
    print(f"heso={heso}")
    print(f"chiphi={cp}")
    data = {'heso': heso, 'chiphi': cp}
    return data


class RptCpql_Nd68_2019(web.UIModule):
    def render(self, cpqlid=None, zvl=0, znc=0, zmtc=0, ztl=0):
        # load data
        data = tinh_cpql(cpqlid, zvl, znc, zmtc, ztl)
        return self.render_string(
            "reports/qtgt/cpql-nd68-2019.html",
            hs=data['heso'], cp=data['chiphi'])


class RptCpql_Nd32_2015(web.UIModule):
    def render(self, cpqlid=None, zvl=0, znc=0, zmtc=0, ztl=0, isoc=False):
        data = tinh_cpql(cpqlid, zvl, znc, zmtc, ztl)
        return self.render_string(
            "reports/qtgt/cpql-nd32-2015.html",
            hs=data['hs'], cp=data['cp'])

class RptCpql2_Nd32_2015(web.UIModule):
    def render(self, cpqlid=None, zvl=0, znc=0, zmtc=0, ztl=0, isoc=False):
        data = tinh_cpql(cpqlid, zvl, znc, zmtc, ztl)
        return self.render_string(
            "reports/qtgt/cpql2-nd32-2015.html",
            hs=data['hs'], cp=data['cp'])

class RptTlmd(web.UIModule):
    def render(self, qt35id=None):
        data = "chuaxong"
        return self.render_string(
            "reports/qtgt/tlmd.html",
            cp=data)

class RptTlmd2(web.UIModule):
    def render(self, qt35id=None):
        data = "chuaxong"
        return self.render_string(
            "reports/qtgt/tlmd2.html",
            cp=data)
