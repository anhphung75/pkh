import tornado.web as web
from utils import Tien, tachhangso


class RptQtgt_Quochuy(web.UIModule):
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

    def render(self, dvtc="ĐỘI QLML CẤP NƯỚC QUẬN THỦ ĐỨC", ngaylap=20200904):
        # format so:
        ngaylap = f"{ngaylap}"
        ngaylap = f"Thủ Đức, {ngaylap[-2:]} tháng {ngaylap[-4:-2]} năm {ngaylap[:-4]}"
        return self.render_string(
            "reports/qtgt/quochuy.html",
            dvtc=dvtc, ngaylap=ngaylap)


class RptQtgt_Tieude(web.UIModule):
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

    def render(self, tieude="BẢNG QUYẾT TOÁN GẮN MỚI ĐỒNG HỒ NƯỚC", sohoso='', sodot='', khachhang='', diachigandhn=''):
        return self.render_string(
            "reports/qtgt/tieude.html",
            tieude=tieude, sohoso=sohoso, sodot=sodot, khachhang=khachhang, diachigandhn=diachigandhn)


class RptQtgt_ChiphiTieudebang(web.UIModule):
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
            "reports/qtgt/chiphi-tieudebang.html")


class RptQtgt_ChiphiTieude(web.UIModule):
    def embedded_css(self):
        __css = '''
        .bang {
            width: 100%;
            grid: auto-flow minmax(1rem, max-content) / 151fr 30fr 45fr 60fr 40fr 40fr 63fr 63fr 63fr;
        }
        '''
        return __css

    def render(self, tieude=''):
        return self.render_string(
            "reports/qtgt/chiphi-tieude.html", tieude=tieude)


class RptQtgt_ChiphiNoidung(web.UIModule):
    def embedded_css(self):
        __css = '''
        .sl {
            color:blue;
        }
        .vl {
            color:red;
        }
        .nc {
            color:green;
        }
        .mtc {
            color:magenta;
        }
        '''
        return __css

    def render(self, uid=None, mota=None, dvt=None, soluong=0, giavl=0, gianc=0, giamtc=0, tienvl=0, tiennc=0, tienmtc=0):
        # format number
        soluong = tachhangso(soluong, 3)
        m = Tien(giavl)
        giavl = m.so()
        m = Tien(gianc)
        gianc = m.so()
        m = Tien(giamtc)
        giamtc = m.so()
        m = Tien(tienvl)
        tienvl = m.so()
        m = Tien(tiennc)
        tiennc = m.so()
        m = Tien(tienmtc)
        tienmtc = m.so()
        return self.render_string(
            "reports/qtgt/chiphi-noidung.html",
            uid=uid, mota=mota, dvt=dvt, soluong=soluong,
            giavl=giavl, gianc=giavl, giamtc=giamtc,
            tienvl=tienvl, tiennc=tiennc, tienmtc=tienmtc)


class RptQtgt_ChiphiDandong(web.UIModule):
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


class RptQtgt_ChiphiTong(web.UIModule):
    def render(self, vl=0, nc=0, mtc=0):
        vl = locale.format_string('%.0f', vl, True)
        nc = locale.format_string('%.0f', nc, True)
        mtc = locale.format_string('%.0f', mtc, True)
        return self.render_string(
            "reports/qtgt/chiphi-tong.html",
            vl=vl, nc=nc, mtc=mtc)


class RptQtgt_Tlmd(web.UIModule):
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


class RptQtgt_Tlmd2(web.UIModule):
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


class RptQtgt_Footer(web.UIModule):
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


class RptQtgt_Cpql_20200721(web.UIModule):
    def embedded_css(self):
        __css = '''
        .bang {
            grid: auto-flow minmax(1rem, max-content) / 151fr 30fr 45fr 60fr 40fr 40fr 63fr 63fr 63fr;
        }
        '''
        return __css

    def render(self, cpqlid=None, zvl=0, znc=0, zmtc=0, ztl=0):
        # load data
        return self.render_string(
            "reports/qtgt/cpql-20200721.html")


class RptQtgt_Cpql2_20200721(web.UIModule):
    def embedded_css(self):
        __css = '''
        .bang {
            grid: auto-flow minmax(1rem, max-content) / 151fr 30fr 45fr 60fr 40fr 40fr 63fr 63fr 63fr;
        }
        '''
        return __css

    def render(self, cpqlid=None, zvl=0, znc=0, zmtc=0, ztl=0):
        # format data
        return self.render_string(
            "reports/qtgt/cpql2-20200721.html")


class RptQtgt_Cpql_20200905(web.UIModule):
    def embedded_css(self):
        pass

    def render(self):
        pass


class RptQtgt_Cpql2_20200905(web.UIModule):
    def embedded_css(self):
        pass

    def render(self):
        pass
