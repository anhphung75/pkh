import tornado
import tornado.web as web
from utils import Tien, tachhangso, lamtronso

tornado.locale.set_default_locale("vi_VI")


class FrmQtgt_Ongnganh(web.UIModule):
    def embedded_javascript(self):
        __js = '''
        var qtgt_on = {
            delimiters: ["{`", "`}"],
            data() {
                return {
                show: {'ongnganh':false,'on_cpxd':false,'phui': false, 'cpxd': false, 'cpvt': false, 'cptl': false},
                }
            },
            method:{
                show_chiphi(zone){

                }
            },
        };

        Vue.createApp(qtgt_on).mount('#ongnganh')
        '''
        return __js

    def embedded_css(self):
        __css = '''
        .tieude-ongnganh {
            width: 100%;
            grid: auto-flow minmax(1rem, max-content)/5fr 1fr 1fr 1fr;
        }
        '''
        return __css

    def render(self):
        return self.render_string(
            "forms/qtgt/ongnganh.html")


class RptQtgt_Quochuy(web.UIModule):
    def render(self, dvtc="ĐỘI QLML CẤP NƯỚC QUẬN THỦ ĐỨC", ngaylap=20200904):
        # format so:
        ngaylap = f"{ngaylap}"
        ngaylap = f"Thủ Đức, ngày {ngaylap[-2:]} tháng {ngaylap[-4:-2]} năm {ngaylap[:-4]}"
        return self.render_string(
            "reports/qtgt/quochuy.html",
            dvtc=dvtc, ngaylap=ngaylap)


class RptQtgt_Tieude(web.UIModule):
    def render(self, tieude="BẢNG QUYẾT TOÁN GẮN MỚI ĐỒNG HỒ NƯỚC", sohoso='', sodot='', khachhang='', diachigandhn=''):
        return self.render_string(
            "reports/qtgt/tieude.html",
            tieude=tieude, sohoso=sohoso, sodot=sodot, khachhang=khachhang, diachigandhn=diachigandhn)


class RptQtgt_ChiphiTieudebang(web.UIModule):
    def render(self):
        return self.render_string(
            "reports/qtgt/chiphi-tieudebang.html")


class RptQtgt_ChiphiTieude(web.UIModule):
    def render(self, tieude=''):
        return self.render_string(
            "reports/qtgt/chiphi-tieude.html", tieude=tieude)


class RptQtgt_ChiphiNoidung(web.UIModule):
    def render(self, uid=None, mota=None, dvt=None, soluong=0, giavl=0, gianc=0, giamtc=0, tienvl=0, tiennc=0, tienmtc=0):
        # format number
        print(
            f"truoc format soluong={soluong} giavl={giavl} gianc={gianc} giamtc={giamtc} tienvl={tienvl} tiennc={tiennc} tienmtc={tienmtc}")
        soluong = tachhangso(soluong, 3)
        giavl = tachhangso(giavl, 0)
        gianc = tachhangso(gianc, 0)
        giamtc = tachhangso(giamtc, 0)
        tienvl = tachhangso(tienvl, 0)
        tiennc = tachhangso(tiennc, 0)
        tienmtc = tachhangso(tienmtc, 0)
        print(
            f"sau format soluong={soluong} giavl={giavl} gianc={gianc} giamtc={giamtc} tienvl={tienvl} tiennc={tiennc} tienmtc={tienmtc}")
        return self.render_string(
            "reports/qtgt/chiphi-noidung.html",
            uid=uid, mota=mota, dvt=dvt, soluong=soluong,
            giavl=giavl, gianc=gianc, giamtc=giamtc,
            tienvl=tienvl, tiennc=tiennc, tienmtc=tienmtc)


class RptQtgt_ChiphiDandong(web.UIModule):
    def render(self, keday=False):
        return self.render_string(
            "reports/qtgt/chiphi-dandong.html",
            keday=keday)


class RptQtgt_ChiphiTong(web.UIModule):
    def render(self, zvl=0, znc=0, zmtc=0):
        zvl = tachhangso(zvl, 0)
        znc = tachhangso(znc, 0)
        zmtc = tachhangso(zmtc, 0)
        return self.render_string(
            "reports/qtgt/chiphi-tong.html",
            zvl=zvl, znc=znc, zmtc=zmtc)


class RptQtgt_Tlmd(web.UIModule):
    def render(self, cptl):
        # markup cptl
        for cp in cptl:
            for k in ['sl_on', 'sl_oc']:
                if k in cp:
                    cp['soluong'] = tachhangso(cp[k], 3)
            for k in ['tien_on', 'tien_oc']:
                if k in cp:
                    cp['tien'] = tachhangso(cp[k], 0)
            cp['gia'] = tachhangso(cp['gia'], 0)
        return self.render_string(
            "reports/qtgt/tlmd.html",
            cptl=cptl)


class RptQtgt_Tlmd2(web.UIModule):
    def render(self, cptl):
        # markup cptl
        print(f"RptQtgt_Tlmd2 cptl={cptl}")
        for cp in cptl:
            for k in ['sl_on', 'sl_oc']:
                if k in cp:
                    cp[k] = tachhangso(cp[k], 3)
            for k in ['gia', 'tien_on', 'tien_oc']:
                if k in cp:
                    cp[k] = tachhangso(cp[k], 0)
        return self.render_string(
            "reports/qtgt/tlmd2.html",
            cptl=cptl)


class RptQtgt_Kettoan(web.UIModule):
    def render(self, tiencty=0, tienkhach=0):
        # tinh them cho ke toan
        tienctytruocthue = lamtronso(tiencty*100/110, 0)
        thuecty = tiencty-tienctytruocthue
        tienkhachtruocthue = lamtronso(tienkhach*100/110, 0)
        thuekhach = tienkhach-tienkhachtruocthue
        # format so:
        m = Tien(tiencty)
        tienctyso = m.so()
        tienctychu = m.chu()
        tienctytruocthue = tachhangso(tienctytruocthue, 0)
        thuecty = tachhangso(thuecty, 0)
        m = Tien(tienkhach)
        tienkhachso = m.so()
        tienkhachchu = m.chu()
        tienkhachtruocthue = tachhangso(tienkhachtruocthue, 0)
        thuekhach = tachhangso(thuekhach, 0)
        return self.render_string(
            "reports/qtgt/kettoan.html",
            tiencty=tiencty, tienctyso=tienctyso, tienctychu=tienctychu, tienctytruocthue=tienctytruocthue, thuecty=thuecty,
            tienkhach=tienkhach, tienkhachso=tienkhachso, tienkhachchu=tienkhachchu, tienkhachtruocthue=tienkhachtruocthue, thuekhach=thuekhach)


class RptKyduyet2(web.UIModule):
    def render(self, dvtc='', tiencty=0, tienkhach=0):
        duyet = {'pbd': 'KT.GIÁM ĐÓC', 'chucvu': 'PHÓ GIÁM ĐỐC',
                 'nhanvien': 'Nguyễn Công Minh'}
        lap = {'pbd': 'PHÒNG KỸ THUẬT',
               'chucvu': 'TRƯỞNG PHÒNG', 'nhanvien': 'Nguyễn Hồng Phương'}
        return self.render_string(
            "reports/qtgt/kyduyet2.html",
            duyet=duyet, lap=lap,
            tiencty=tiencty, tienkhach=tienkhach)


class RptKyduyet3(web.UIModule):
    def render(self, dvtc='', tiencty=0, tienkhach=0):
        # markup dulieu
        duyet = {'pbd': 'KT.GIÁM ĐÓC', 'chucvu': 'PHÓ GIÁM ĐỐC',
                 'nhanvien': 'Nguyễn Công Minh'}
        kiemtra = {'pbd': 'KẾ HOẠCH-VẬT TƯ-TỔNG HỢP',
                   'chucvu': 'TRƯỞNG PHÒNG', 'nhanvien': 'Phạm Phi Hải'}
        if dvtc.lower() in ['qlmlq2', 'đội qlmlcn quận 2', 'đội qlml cấp nước quận 2', 'đội quản lý mạng lưới cấp nước quận 2']:
            lap = {'pbd': 'ĐỘI QLMLCN QUẬN 2',
                   'chucvu': 'ĐỘI TRƯỞNG', 'nhanvien': 'Nguyễn Ngọc Quý'}
        elif dvtc.lower() in ['qlmlq9', 'đội qlmlcn quận 9', 'đội qlml cấp nước quận 9', 'đội quản lý mạng lưới cấp nước quận 9']:
            lap = {'pbd': 'ĐỘI QLMLCN QUẬN 9',
                   'chucvu': 'ĐỘI TRƯỞNG', 'nhanvien': 'Bùi Quang Thiên Chương'}
        else:
            lap = {'pbd': 'ĐỘI QLMLCN QUẬN THỦ ĐỨC',
                   'chucvu': 'ĐỘI TRƯỞNG', 'nhanvien': 'Nguyễn Văn Tùng'}
        return self.render_string(
            "reports/qtgt/kyduyet3.html",
            duyet=duyet, kiemtra=kiemtra, lap=lap,
            tiencty=tiencty, tienkhach=tienkhach)


class RptQtgt_Footer(web.UIModule):
    def render(self, mabaogia=20200721, stt=1, page=1, pages=1):
        # format so:
        mabaogia = f"{mabaogia}"
        lzone = f"QT-NĐ68 ({mabaogia[-2:]}-{mabaogia[-4:-2]}-{mabaogia[:-4]})"
        rzone = f"TT-{stt:02}- Trang: {page:01}/{pages:01}"
        return self.render_string(
            "reports/qtgt/footer.html",
            lzone=lzone, rzone=rzone)


class RptQtgt_Cpql_20200721(web.UIModule):
    def render(self, maubaocao='on', vl=0, nc=0, mtc=0, tructiepkhac=0, chung=0, giantiepkhac=0,
               thutinhtruoc=0, khaosat=0, thietke=0, giamsat=0,
               cpzvlncmtc=0, cptructiepkhac=0, cptructiep=0, cpchung=0, cpgiantiepkhac=0, cpgiantiep=0,
               cpgiaxaydung=0, cpthutinhtruoc=0, cpxaydungtruocthue=0, cpkhaosatthietke=0, cpgiamsat=0, cptuvan=0, cptongxaydungtruocthue=0, cpthuetongxaydung=0, cptongxaydung=0, cpcongtrinh=0,
               xaydung=0, tailap=0, congtrinh=0, congtrinhtruocthue=0, thuecongtrinh=0, cptl=[]):
        # markup heso
        chung = f"{tachhangso(chung*100,1)}%"
        giantiepkhac = f"{tachhangso(giantiepkhac*100,1)}%"
        thutinhtruoc = f"{tachhangso(thutinhtruoc*100,1)}%"
        khaosat = f"{tachhangso(khaosat*100,2)}%"
        giamsat = f"{tachhangso(giamsat*100,3)}%"
        thietke = tachhangso(thietke, 1)
        # markup chiphi
        cpzvlncmtc = tachhangso(cpzvlncmtc, 0)
        cptructiepkhac = tachhangso(cptructiepkhac, 0)
        cptructiep = tachhangso(cptructiep, 0)
        cpchung = tachhangso(cpchung, 0)
        cpgiantiepkhac = tachhangso(cpgiantiepkhac, 0)
        cpgiantiep = tachhangso(cpgiantiep, 0)
        cpgiaxaydung = tachhangso(cpgiaxaydung, 0)
        cpthutinhtruoc = tachhangso(cpthutinhtruoc, 0)
        cpxaydungtruocthue = tachhangso(cpxaydungtruocthue, 0)
        cpkhaosatthietke = tachhangso(cpkhaosatthietke, 0)
        cpgiamsat = tachhangso(cpgiamsat, 0)
        cptuvan = tachhangso(cptuvan, 0)
        cptongxaydungtruocthue = tachhangso(cptongxaydungtruocthue, 0)
        cpthuetongxaydung = tachhangso(cpthuetongxaydung, 0)
        cptongxaydung = tachhangso(cptongxaydung, 0)
        cpcongtrinh = tachhangso(cpcongtrinh, 0)
        xaydung = tachhangso(xaydung, 0)
        tailap = tachhangso(tailap, 0)
        congtrinh = tachhangso(congtrinh, 0)
        congtrinhtruocthue = tachhangso(congtrinhtruocthue, 0)
        thuecongtrinh = tachhangso(thuecongtrinh, 0)
        return self.render_string(
            "reports/qtgt/cpql-20200721.html", maubaocao=maubaocao,
            vl=vl, nc=nc, mtc=mtc, tructiepkhac=tructiepkhac, chung=chung, giantiepkhac=giantiepkhac,
            thutinhtruoc=thutinhtruoc, khaosat=khaosat, thietke=thietke, giamsat=giamsat,
            cpzvlncmtc=cpzvlncmtc, cptructiepkhac=cptructiepkhac, cptructiep=cptructiep, cpchung=cpchung, cpgiantiepkhac=cpgiantiepkhac, cpgiantiep=cpgiantiep, cpgiaxaydung=cpgiaxaydung,
            cpthutinhtruoc=cpthutinhtruoc, cpxaydungtruocthue=cpxaydungtruocthue, cpkhaosatthietke=cpkhaosatthietke, cpgiamsat=cpgiamsat, cptuvan=cptuvan, cptongxaydungtruocthue=cptongxaydungtruocthue,
            cpthuetongxaydung=cpthuetongxaydung, cptongxaydung=cptongxaydung, cpcongtrinh=cpcongtrinh,
            xaydung=xaydung, tailap=tailap, congtrinh=congtrinh, congtrinhtruocthue=congtrinhtruocthue,
            thuecongtrinh=thuecongtrinh, cptl=cptl)


class RptQtgt_Cpql2_20200721(web.UIModule):
    def render(self, maubaocao='o2', vl=0, nc=0, mtc=0, tructiepkhac=0, chung=0, giantiepkhac=0,
               thutinhtruoc=0, khaosat=0, thietke=0, giamsat=0,
               oczvlncmtc=0, octructiepkhac=0, octructiep=0, occhung=0, ocgiantiepkhac=0, ocgiantiep=0,
               ocgiaxaydung=0, octhutinhtruoc=0, ocxaydungtruocthue=0, ockhaosatthietke=0, ocgiamsat=0, octuvan=0, octongxaydungtruocthue=0, octhuetongxaydung=0, octongxaydung=0, ocztl=0, occongtrinh=0,
               onzvlncmtc=0, ontructiepkhac=0, ontructiep=0, onchung=0, ongiantiepkhac=0, ongiantiep=0,
               ongiaxaydung=0, onthutinhtruoc=0, onxaydungtruocthue=0, onkhaosatthietke=0, ongiamsat=0, ontuvan=0, ontongxaydungtruocthue=0, onthuetongxaydung=0, ontongxaydung=0, onztl=0, oncongtrinh=0,
               xaydung=0, tailap=0, congtrinh=0, congtrinhtruocthue=0, thuecongtrinh=0, cptl=[]):
        # markup heso
        chung = f"{tachhangso(chung*100,1)}%"
        giantiepkhac = f"{tachhangso(giantiepkhac*100,1)}%"
        thutinhtruoc = f"{tachhangso(thutinhtruoc*100,1)}%"
        khaosat = f"{tachhangso(khaosat*100,2)}%"
        giamsat = f"{tachhangso(giamsat*100,3)}%"
        thietke = tachhangso(thietke, 1)
        # markup chiphi
        oczvlncmtc = tachhangso(oczvlncmtc, 0)
        octructiepkhac = tachhangso(octructiepkhac, 0)
        octructiep = tachhangso(octructiep, 0)
        occhung = tachhangso(occhung, 0)
        ocgiantiepkhac = tachhangso(ocgiantiepkhac, 0)
        ocgiantiep = tachhangso(ocgiantiep, 0)
        ocgiaxaydung = tachhangso(ocgiaxaydung, 0)
        octhutinhtruoc = tachhangso(octhutinhtruoc, 0)
        ocxaydungtruocthue = tachhangso(ocxaydungtruocthue, 0)
        ockhaosatthietke = tachhangso(ockhaosatthietke, 0)
        ocgiamsat = tachhangso(ocgiamsat, 0)
        octuvan = tachhangso(octuvan, 0)
        octongxaydungtruocthue = tachhangso(octongxaydungtruocthue, 0)
        octhuetongxaydung = tachhangso(octhuetongxaydung, 0)
        octongxaydung = tachhangso(octongxaydung, 0)
        occongtrinh = tachhangso(occongtrinh, 0)
        ocztl = tachhangso(ocztl, 0)
        onzvlncmtc = tachhangso(onzvlncmtc, 0)
        ontructiepkhac = tachhangso(ontructiepkhac, 0)
        ontructiep = tachhangso(ontructiep, 0)
        onchung = tachhangso(onchung, 0)
        ongiantiepkhac = tachhangso(ongiantiepkhac, 0)
        ongiantiep = tachhangso(ongiantiep, 0)
        ongiaxaydung = tachhangso(ongiaxaydung, 0)
        onthutinhtruoc = tachhangso(onthutinhtruoc, 0)
        onxaydungtruocthue = tachhangso(onxaydungtruocthue, 0)
        onkhaosatthietke = tachhangso(onkhaosatthietke, 0)
        ongiamsat = tachhangso(ongiamsat, 0)
        ontuvan = tachhangso(ontuvan, 0)
        ontongxaydungtruocthue = tachhangso(ontongxaydungtruocthue, 0)
        onthuetongxaydung = tachhangso(onthuetongxaydung, 0)
        ontongxaydung = tachhangso(ontongxaydung, 0)
        oncongtrinh = tachhangso(oncongtrinh, 0)
        onztl = tachhangso(onztl, 0)
        xaydung = tachhangso(xaydung, 0)
        tailap = tachhangso(tailap, 0)
        congtrinh = tachhangso(congtrinh, 0)
        congtrinhtruocthue = tachhangso(congtrinhtruocthue, 0)
        thuecongtrinh = tachhangso(thuecongtrinh, 0)
        return self.render_string(
            "reports/qtgt/cpql2-20200721.html", maubaocao=maubaocao,
            vl=vl, nc=nc, mtc=mtc, tructiepkhac=tructiepkhac, chung=chung, giantiepkhac=giantiepkhac,
            thutinhtruoc=thutinhtruoc, khaosat=khaosat, thietke=thietke, giamsat=giamsat,
            oczvlncmtc=oczvlncmtc, octructiepkhac=octructiepkhac, octructiep=octructiep, occhung=occhung, ocgiantiepkhac=ocgiantiepkhac, ocgiantiep=ocgiantiep, ocgiaxaydung=ocgiaxaydung,
            octhutinhtruoc=octhutinhtruoc, ocxaydungtruocthue=ocxaydungtruocthue, ockhaosatthietke=ockhaosatthietke, ocgiamsat=ocgiamsat, octuvan=octuvan, octongxaydungtruocthue=octongxaydungtruocthue,
            octhuetongxaydung=octhuetongxaydung, octongxaydung=octongxaydung, ocztl=ocztl, occongtrinh=occongtrinh,
            onzvlncmtc=onzvlncmtc, ontructiepkhac=ontructiepkhac, ontructiep=ontructiep, onchung=onchung, ongiantiepkhac=ongiantiepkhac, ongiantiep=ongiantiep, ongiaxaydung=ongiaxaydung,
            onthutinhtruoc=onthutinhtruoc, onxaydungtruocthue=onxaydungtruocthue, onkhaosatthietke=onkhaosatthietke, ongiamsat=ongiamsat, ontuvan=ontuvan, ontongxaydungtruocthue=ontongxaydungtruocthue,
            onthuetongxaydung=onthuetongxaydung, ontongxaydung=ontongxaydung,
            onztl=onztl, oncongtrinh=oncongtrinh,
            xaydung=xaydung, tailap=tailap, congtrinh=congtrinh, congtrinhtruocthue=congtrinhtruocthue,
            thuecongtrinh=thuecongtrinh, cptl=cptl)


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
