import locale
import tornado.web as web
from utils import lamtronso, Tien

locale.setlocale(locale.LC_ALL, 'vi_VI')


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
    for i in heso:
        heso[i] = float(heso[i])
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
    cp['thuecongtrinh'] = cp['congtrinh']-cp['congtrinhtruocthue']
    # format heso
    for i in ['tructiepkhac', 'giantiepkhac', 'chung', 'thutinhtruoc']:
        heso[i] = locale.format_string('%.1f', heso[i]*100, True) + '%'
    heso['khaosat'] = locale.format_string(
        '%.2f', heso['khaosat']*100, True) + '%'
    heso['thietke'] = locale.format_string('%.1f', heso['thietke'], True)
    heso['giamsat'] = locale.format_string(
        '%.3f', heso['giamsat']*100, True) + '%'
    # format chiphi
    for i in cp:
        cp[i] = locale.format_string('%.0f', cp[i], True)
    print(f"heso={heso}")
    print(f"chiphi={cp}")
    data = {'heso': heso, 'chiphi': cp}
    return data


class RptQuochuy(web.UIModule):
    def embedded_javascript(self):
        __js = '''
        function suangaylap(ngaylap) {
            let w=document.getElementsByClassName("ngaylap");
            let i=0, suatatca=true;
            while (suatatca) {
                try {
                    w[i].innerHTML = ngaylap;
                    i++;
                }
                catch(err) {
                    suatatca=false;
                    break;
                }
            }
        }
        '''
        return __js

    def embedded_css(self):
        __css = '''
        .quochuy {
            width: 100%;
            grid: auto-flow minmax(1rem, max-content)/max-content 1fr max-content;
        }
        '''
        return __css

    def render(self, madvtc='qlmltd', ngaylap=20200904):
        # format so:
        dvtc = "ĐỘI QLML CẤP NƯỚC QUẬN THỦ ĐỨC"
        ngaylap = f"{ngaylap}"
        ngaylap = f"Thủ Đức, {ngaylap[-2:]} tháng {ngaylap[-4:-2]} năm {ngaylap[:-4]}"
        return self.render_string(
            "reports/qtgt/quochuy.html",
            dvtc=dvtc, ngaylap=ngaylap)


class RptQtgtTieude(web.UIModule):
    def embedded_javascript(self):
        __js = '''
        function suatieude(tieude) {
            let w=document.getElementsByClassName("tieudeqtgt");
            let i=0, suatatca=true;
            while (suatatca) {
                try {
                    w[i].innerHTML = tieude;
                    i++;
                }
                catch(err) {
                    suatatca=false;
                    break;
                }
            }
        }
        '''
        return __js

    def embedded_css(self):
        __css = '''
        .tieude {
            width: 100%;
            grid: auto-flow minmax(1rem, max-content)/max-content 1fr max-content minmax(max-content, 20pt);
        }
        '''
        return __css

    def render(self, maqt=None, mahoso=None, madot=None, makhachhang=None):
        # format so:
        tieude = "BẢNG QUYẾT TOÁN GẮN MỚI ĐỒNG HỒ NƯỚC 1 BẢNG QUYẾT TOÁN GẮN MỚI ĐỒNG HỒ NƯỚC 2 BẢNG QUYẾT TOÁN GẮN MỚI ĐỒNG HỒ NƯỚC 3"
        sohoso = "gm02334/20"
        sodot = "309/2020MP"
        khachhang = 'Bùi đình quốc vệ'
        diachigandhn = "t634- Ngô Chí Quốc- Kp.2- P.Bình Chiểu- Q.TĐ"
        return self.render_string(
            "reports/qtgt/tieude.html",
            tieude=tieude, sohoso=sohoso, sodot=sodot, khachhang=khachhang, diachigandhn=diachigandhn)


class RptQtgtChiphiTieude(web.UIModule):
    def embedded_css(self):
        __css = '''
        .bang {
            width: 100%;
            grid: auto-flow minmax(1rem, max-content) / 151fr 30fr 45fr 60fr 40fr 40fr 63fr 63fr 63fr;
        }
        '''
        return __css

    def render(self):
        return self.render_string(
            "reports/qtgt/chiphi-tieude.html")


class RptQtgtChiphiDandong(web.UIModule):
    def embedded_css(self):
        __css = '''
        .dandong {
            width: 100%;
            flex: 1 1 0%;
            grid-template-rows: minmax(0, 1fr);
            grid-template-columns: 151fr 30fr 45fr 60fr 40fr 40fr 63fr 63fr 63fr;
        }
        '''
        return __css

    def render(self):
        return self.render_string(
            "reports/qtgt/chiphi-dandong.html")


class RptQtgtChiphiNoidung(web.UIModule):
    def render(self):
        return self.render_string(
            "reports/qtgt/chiphi-tieude.html")


class RptQtgtChiphiTong(web.UIModule):
    def render(self, vl=0, nc=0, mtc=0):
        vl = locale.format_string('%.0f', vl, True)
        nc = locale.format_string('%.0f', nc, True)
        mtc = locale.format_string('%.0f', mtc, True)
        return self.render_string(
            "reports/qtgt/chiphi-tong.html",
            vl=vl, nc=nc, mtc=mtc)


class RptChiphi_Nd68_2019(web.UIModule):
    def render(self, maqtoc=None, maqton=None, mabaogia=20200721):
        # load data
        plbaocao = 'oc'
        data = tinh_cpql(cpqlid, zvl, znc, zmtc, ztl)
        return self.render_string(
            "reports/qtgt/chiphi-nd68-2019.html",
            plbaocao=plbaocao, hs=data['heso'], cp=data['chiphi'])


class RptCpql_Nd68_2019(web.UIModule):
    def embedded_css(self):
        __css = '''
        .bang {
            grid: auto-flow minmax(1rem, max-content) / 151fr 30fr 45fr 60fr 40fr 40fr 63fr 63fr 63fr;
        }
        .bang-dandong {
            flex: 1 1 0%;
            grid-template-rows: minmax(0, 1fr);
            grid-template-columns: 151fr 30fr 45fr 60fr 40fr 40fr 63fr 63fr 63fr;
        }
        '''
        return __css

    def render(self, cpqlid=None, zvl=0, znc=0, zmtc=0, ztl=0):
        # load data
        data = tinh_cpql(cpqlid, zvl, znc, zmtc, ztl)
        return self.render_string(
            "reports/qtgt/cpql-nd68-2019.html",
            hs=data['heso'], cp=data['chiphi'])


class RptCpql_Nd32_2015(web.UIModule):
    def embedded_css(self):
        __css = '''
        .bang {
            grid: auto-flow minmax(1rem, max-content) / 151fr 30fr 45fr 60fr 40fr 40fr 63fr 63fr 63fr;
        }
        .bang-dandong {
            flex: 1 1 0%;
            grid-template-rows: minmax(0, 1fr);
            grid-template-columns: 151fr 30fr 45fr 60fr 40fr 40fr 63fr 63fr 63fr;
        }
        '''
        return __css

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
    def embedded_css(self):
        __css = '''
        .tlmd {
            width: 100%;
            grid: auto-flow minmax(1rem, max-content) / 285fr 50fr 30fr 70fr 70fr 50fr;
        }
        '''
        return __css

    def render(self, qt35id=None):
        # pre data
        data = {
            0: {'chiphiid': '001', 'mota': '- Đường/Hẻm BTXM dày 10cm', 'dvt': 'm2', 'sl': 1.75, 'gia': 511000, 'tien': 894250},
            1: {'chiphiid': '002', 'mota': '- Đào bốc mặt đường nhựa', 'dvt': 'm2',
                'sl': 2.4, 'gia': 890000, 'tien': 2136000},
            3: {'chiphiid': '001', 'mota': '- Đường/Hẻm BTXM dày 10cm', 'dvt': 'm2', 'sl': 1.75, 'gia': 511000, 'tien': 894250},
            5: {'chiphiid': '002', 'mota': '- Đào bốc mặt đường nhựa', 'dvt': 'm2',
                'sl': 2.4, 'gia': 890000, 'tien': 2136000},
        }
        # format data
        for i in data:
            data[i]['sl'] = locale.format_string('%.3f', data[i]['sl'], True)
            data[i]['gia'] = locale.format_string('%.0f', data[i]['gia'], True)
            data[i]['tien'] = locale.format_string(
                '%.0f', data[i]['tien'], True)
        return self.render_string(
            "reports/qtgt/tlmd.html",
            cp=data)


class RptTlmd2(web.UIModule):
    def render(self, qt35id=None):
        data = "chuaxong"
        return self.render_string(
            "reports/qtgt/tlmd2.html",
            cp=data)


class RptKyduyet2(web.UIModule):
    def embedded_css(self):
        __css = '''
        .duyet {
            width: 100%;
            grid: auto-flow minmax(1rem, max-content) / 140fr 55fr 360fr;
        }
        .chuky {
            width: 100%;
            grid: auto-flow minmax(1rem, max-content) / 1fr 1fr;
        }
        '''
        return __css

    def render(self, madvtc=None, congty=20807178001, khach=10):
        # format so:
        a = Tien(congty)
        congty = {'so': a.so(), 'chu': a.chu()}
        a = Tien(khach)
        khach = {'so': a.so(), 'chu': a.chu()}

        duyet = {'pbd': 'KT.GIÁM ĐÓC', 'chucvu': 'PHÓ GIÁM ĐỐC',
                 'nhanvien': 'Nguyễn Công Minh'}
        lap = {'pbd': 'PHÒNG KỸ THUẬT',
               'chucvu': 'TRƯỞNG PHÒNG', 'nhanvien': 'Nguyễn Hồng Phương'}
        return self.render_string(
            "reports/qtgt/kyduyet2.html",
            congty=congty, khach=khach,
            duyet=duyet, lap=lap)


class RptKyduyet3(web.UIModule):
    def embedded_css(self):
        __css = '''
        .duyet {
            width: 100%;
            grid: auto-flow minmax(1rem, max-content) / 140fr 55fr 360fr;
        }
        .chuky {
            width: 100%;
            grid: auto-flow minmax(1rem, max-content) / 1fr 1fr 1fr;
        }
        '''
        return __css

    def render(self, dvtcid=None, congty=20807178001, khach=10):
        # format so:
        a = Tien(congty)
        congty = {'so': a.so(), 'chu': a.chu()}
        a = Tien(khach)
        khach = {'so': a.so(), 'chu': a.chu()}

        duyet = {'pbd': 'KT.GIÁM ĐÓC', 'chucvu': 'PHÓ GIÁM ĐỐC',
                 'nhanvien': 'Nguyễn Công Minh'}
        kiemtra = {'pbd': 'KẾ HOẠCH-VẬT TƯ-TỔNG HỢP',
                   'chucvu': 'TRƯỞNG PHÒNG', 'nhanvien': 'Phạm Phi Hải'}
        lap = {'pbd': 'ĐỘI QLMLCN QUẬN THỦ ĐỨC',
               'chucvu': 'ĐỘI TRƯỞNG', 'nhanvien': 'Nguyễn Văn Tùng'}
        return self.render_string(
            "reports/qtgt/kyduyet3.html",
            congty=congty, khach=khach,
            duyet=duyet, kiemtra=kiemtra, lap=lap)


class RptFooter(web.UIModule):
    def embedded_css(self):
        __css = '''
        .footer {
            width: 100%;
            grid: auto-flow minmax(1rem, max-content) / 1fr 1fr;
        }
        '''
        return __css

    def render(self, baogiaid=20200721, stt=1):
        # format so:
        baogiaid = f"{baogiaid}"
        lzone = f"QT-NĐ68 ({baogiaid[-2:]}-{baogiaid[-4:-2]}-{baogiaid[:-4]})"
        rzone = f"TT-{stt:02}"
        return self.render_string(
            "reports/qtgt/footer.html",
            lzone=lzone, rzone=rzone)
