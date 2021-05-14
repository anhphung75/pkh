import tornado.web as web
from utils import lamtronso, tachhangso, Tien


class Quochuy(web.UIModule):
    def render(self, dvtc="ĐỘI QLML CẤP NƯỚC QUẬN THỦ ĐỨC", ngaylap=20200904):
        # format so:
        if ngaylap >= 20210207:
            khuvuc = 'Tp.Thủ Đức'
        else:
            khuvuc = 'Q.Thủ Đức'
        diachi = f"08- Khổng Tử- P.Bình Thọ- {khuvuc}"
        ngaylap = f"{ngaylap}"
        ngaylap = f"{khuvuc}, ngày {ngaylap[-2:]} tháng {ngaylap[-4:-2]} năm {ngaylap[:-4]}"
        return self.render_string(
            "reports/qtgt/quochuy.html",
            dvtc=dvtc, ngaylap=ngaylap, diachi=diachi)


class Tieude(web.UIModule):
    def render(self, tieude="BẢNG QUYẾT TOÁN GẮN MỚI ĐỒNG HỒ NƯỚC", sohoso='', sodot='', khachhang='', diachigandhn=''):
        return self.render_string(
            "reports/qtgt/tieude.html",
            tieude=tieude, sohoso=sohoso, sodot=sodot, khachhang=khachhang, diachigandhn=diachigandhn)


class PhuiTieude(web.UIModule):
    def render(self):
        return self.render_string(
            "reports/qtgt/phui-tieude.html")


class PhuiTong(web.UIModule):
    def render(self, zvl=0, znc=0, zmtc=0):
        zvl = tachhangso(zvl, 0)
        znc = tachhangso(znc, 0)
        zmtc = tachhangso(zmtc, 0)
        return self.render_string(
            "reports/qtgt/phui-tong.html",
            zvl=zvl, znc=znc, zmtc=zmtc)


class OngcaiCpxd(web.UIModule):
    def render(self, cpxd=[]):
        # markup
        for cp in cpxd:
            cp["soluong"] = tachhangso(cp["soluong"], 3)
            cp["giavl"] = tachhangso(cp["giavl"], 0)
            cp["gianc"] = tachhangso(cp["gianc"], 0)
            cp["giamtc"] = tachhangso(cp["giamtc"], 0)
            cp["tienvl"] = tachhangso(cp["tienvl"], 0)
            cp["tiennc"] = tachhangso(cp["tiennc"], 0)
            cp["tienmtc"] = tachhangso(cp["tienmtc"], 0)
        return self.render_string(
            "reports/qtgt/oc-cpxd.html", cpxd=cpxd)


class OngcaiCpvt(web.UIModule):
    def render(self, cpvt=[]):
        # markup
        for cp in cpvt:
            cp["soluong"] = tachhangso(cp["soluong"], 3)
            cp["giavl"] = tachhangso(cp["giavl"], 0)
            cp["gianc"] = tachhangso(cp["gianc"], 0)
            cp["giamtc"] = tachhangso(cp["giamtc"], 0)
            cp["tienvl"] = tachhangso(cp["tienvl"], 0)
            cp["tiennc"] = tachhangso(cp["tiennc"], 0)
            cp["tienmtc"] = tachhangso(cp["tienmtc"], 0)
        return self.render_string(
            "reports/qtgt/oc-cpvt.html", cpvt=cpvt)


class OngcaiCpvl(web.UIModule):
    def render(self, cpvl=[]):
        # markup
        for cp in cpvl:
            cp["soluong"] = tachhangso(cp["soluong"], 3)
            cp["giavl"] = tachhangso(cp["giavl"], 0)
            cp["gianc"] = tachhangso(cp["gianc"], 0)
            cp["giamtc"] = tachhangso(cp["giamtc"], 0)
            cp["tienvl"] = tachhangso(cp["tienvl"], 0)
            cp["tiennc"] = tachhangso(cp["tiennc"], 0)
            cp["tienmtc"] = tachhangso(cp["tienmtc"], 0)
        return self.render_string(
            "reports/qtgt/oc-cpvl.html", cpvl=cpvl)


class OngnganhCpxd(web.UIModule):
    def render(self, cpxd=[]):
        # markup
        for cp in cpxd:
            cp["soluong"] = tachhangso(cp["soluong"], 3)
            cp["giavl"] = tachhangso(cp["giavl"], 0)
            cp["gianc"] = tachhangso(cp["gianc"], 0)
            cp["giamtc"] = tachhangso(cp["giamtc"], 0)
            cp["tienvl"] = tachhangso(cp["tienvl"], 0)
            cp["tiennc"] = tachhangso(cp["tiennc"], 0)
            cp["tienmtc"] = tachhangso(cp["tienmtc"], 0)
        return self.render_string(
            "reports/qtgt/on-cpxd.html", cpxd=cpxd)


class OngnganhCpvt(web.UIModule):
    def render(self, cpvt=[]):
        # markup
        for cp in cpvt:
            cp["soluong"] = tachhangso(cp["soluong"], 3)
            cp["giavl"] = tachhangso(cp["giavl"], 0)
            cp["gianc"] = tachhangso(cp["gianc"], 0)
            cp["giamtc"] = tachhangso(cp["giamtc"], 0)
            cp["tienvl"] = tachhangso(cp["tienvl"], 0)
            cp["tiennc"] = tachhangso(cp["tiennc"], 0)
            cp["tienmtc"] = tachhangso(cp["tienmtc"], 0)
        return self.render_string(
            "reports/qtgt/on-cpvt.html", cpvt=cpvt)


class OngnganhCpvl(web.UIModule):
    def render(self, cpvl=[]):
        # markup
        for cp in cpvl:
            cp["soluong"] = tachhangso(cp["soluong"], 3)
            cp["giavl"] = tachhangso(cp["giavl"], 0)
            cp["gianc"] = tachhangso(cp["gianc"], 0)
            cp["giamtc"] = tachhangso(cp["giamtc"], 0)
            cp["tienvl"] = tachhangso(cp["tienvl"], 0)
            cp["tiennc"] = tachhangso(cp["tiennc"], 0)
            cp["tienmtc"] = tachhangso(cp["tienmtc"], 0)
        return self.render_string(
            "reports/qtgt/on-cpvl.html", cpvl=cpvl)


class ChiphiDandong(web.UIModule):
    def render(self, keday=False):
        return self.render_string(
            "reports/qtgt/chiphi-dandong.html",
            keday=keday)


class Tlmd(web.UIModule):
    def render(self, cptl, maubaocao="on"):
        # markup cptl
        for cp in cptl:
            cp['gia'] = tachhangso(cp['gia'], 0)
            if "oc" in maubaocao:
                cp['soluong'] = tachhangso(cp["sl_oc"], 3)
                cp['tien'] = tachhangso(cp["tien_oc"], 0)
            else:
                cp['soluong'] = tachhangso(cp["sl_on"], 3)
                cp['tien'] = tachhangso(cp["tien_on"], 0)
        return self.render_string(
            "reports/qtgt/tlmd.html",
            cptl=cptl)


class Tlmd2(web.UIModule):
    def render(self, cptl):
        # markup cptl
        for cp in cptl:
            cp['gia'] = tachhangso(cp['gia'], 0)
            cp['tien_oc'] = tachhangso(cp["tien_oc"], 0)
            cp['tien_on'] = tachhangso(cp["tien_on"], 0)
            cp['sl_oc'] = tachhangso(cp["sl_oc"], 3)
            cp['sl_on'] = tachhangso(cp["sl_on"], 3)
        return self.render_string(
            "reports/qtgt/tlmd2.html",
            cptl=cptl)


class Kettoan(web.UIModule):
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


class Footer(web.UIModule):
    def render(self, cpqlid=20200721, mabaogia=20200721, stt=1, page=1, pages=1):
        # format so:
        mabaogia = f"{mabaogia}"
        if cpqlid >= 20200721:
            nghidinh = "NĐ68-2019"
        else:
            nghidinh = "NĐ32-2015"
        lzone = f"QT-{nghidinh} ({mabaogia[-2:]}-{mabaogia[-4:-2]}-{mabaogia[:-4]})"
        rzone = f"TT-{stt:02}- Trang: {page:01}/{pages:01}"
        return self.render_string(
            "reports/qtgt/footer.html",
            lzone=lzone, rzone=rzone)


class Cpql_Nd32_2015(web.UIModule):
    def render(self, maubaocao='on', vl=0, nc=0, mtc=0, tructiepkhac=0, chung=0, giantiepkhac=0,
               thutinhtruoc=0, khaosat=0, thietke=0, giamsat=0, cpvl=0, cpnc=0, cpmtc=0,
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
        cpvl = tachhangso(cpvl, 0)
        cpnc = tachhangso(cpnc, 0)
        cpmtc = tachhangso(cpmtc, 0)
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
            "reports/qtgt/cpql-nd32-2015.html", maubaocao=maubaocao,
            vl=vl, nc=nc, mtc=mtc, tructiepkhac=tructiepkhac, chung=chung, giantiepkhac=giantiepkhac,
            thutinhtruoc=thutinhtruoc, khaosat=khaosat, thietke=thietke, giamsat=giamsat, cpvl=cpvl, cpnc=cpnc, cpmtc=cpmtc,
            cpzvlncmtc=cpzvlncmtc, cptructiepkhac=cptructiepkhac, cptructiep=cptructiep, cpchung=cpchung, cpgiantiepkhac=cpgiantiepkhac, cpgiantiep=cpgiantiep, cpgiaxaydung=cpgiaxaydung,
            cpthutinhtruoc=cpthutinhtruoc, cpxaydungtruocthue=cpxaydungtruocthue, cpkhaosatthietke=cpkhaosatthietke, cpgiamsat=cpgiamsat, cptuvan=cptuvan, cptongxaydungtruocthue=cptongxaydungtruocthue,
            cpthuetongxaydung=cpthuetongxaydung, cptongxaydung=cptongxaydung, cpcongtrinh=cpcongtrinh,
            xaydung=xaydung, tailap=tailap, congtrinh=congtrinh, congtrinhtruocthue=congtrinhtruocthue,
            thuecongtrinh=thuecongtrinh, cptl=cptl)


class Cpql2_Nd32_2015(web.UIModule):
    def render(self, maubaocao='o2', vl=0, nc=0, mtc=0, tructiepkhac=0, chung=0, giantiepkhac=0,
               thutinhtruoc=0, khaosat=0, thietke=0, giamsat=0, ocvl=0, ocnc=0, ocmtc=0,
               oczvlncmtc=0, octructiepkhac=0, octructiep=0, occhung=0, ocgiantiepkhac=0, ocgiantiep=0,
               ocgiaxaydung=0, octhutinhtruoc=0, ocxaydungtruocthue=0, ockhaosatthietke=0, ocgiamsat=0, octuvan=0, octongxaydungtruocthue=0, octhuetongxaydung=0, octongxaydung=0, ocztl=0, occongtrinh=0,
               onvl=0, onnc=0, onmtc=0, onzvlncmtc=0, ontructiepkhac=0, ontructiep=0, onchung=0, ongiantiepkhac=0, ongiantiep=0,
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
        ocvl = tachhangso(ocvl, 0)
        ocnc = tachhangso(ocnc, 0)
        ocmtc = tachhangso(ocmtc, 0)
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
        onvl = tachhangso(onvl, 0)
        onnc = tachhangso(onnc, 0)
        onmtc = tachhangso(onmtc, 0)
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
            "reports/qtgt/cpql2-nd32-2015.html", maubaocao=maubaocao,
            vl=vl, nc=nc, mtc=mtc, tructiepkhac=tructiepkhac, chung=chung, giantiepkhac=giantiepkhac,
            thutinhtruoc=thutinhtruoc, khaosat=khaosat, thietke=thietke, giamsat=giamsat, ocvl=ocvl, ocnc=ocnc, ocmtc=ocmtc,
            oczvlncmtc=oczvlncmtc, octructiepkhac=octructiepkhac, octructiep=octructiep, occhung=occhung, ocgiantiepkhac=ocgiantiepkhac, ocgiantiep=ocgiantiep, ocgiaxaydung=ocgiaxaydung,
            octhutinhtruoc=octhutinhtruoc, ocxaydungtruocthue=ocxaydungtruocthue, ockhaosatthietke=ockhaosatthietke, ocgiamsat=ocgiamsat, octuvan=octuvan, octongxaydungtruocthue=octongxaydungtruocthue,
            octhuetongxaydung=octhuetongxaydung, octongxaydung=octongxaydung, ocztl=ocztl, occongtrinh=occongtrinh,
            onvl=onvl, onnc=onnc, onmtc=onmtc, onzvlncmtc=onzvlncmtc, ontructiepkhac=ontructiepkhac, ontructiep=ontructiep, onchung=onchung, ongiantiepkhac=ongiantiepkhac, ongiantiep=ongiantiep, ongiaxaydung=ongiaxaydung,
            onthutinhtruoc=onthutinhtruoc, onxaydungtruocthue=onxaydungtruocthue, onkhaosatthietke=onkhaosatthietke, ongiamsat=ongiamsat, ontuvan=ontuvan, ontongxaydungtruocthue=ontongxaydungtruocthue,
            onthuetongxaydung=onthuetongxaydung, ontongxaydung=ontongxaydung,
            onztl=onztl, oncongtrinh=oncongtrinh,
            xaydung=xaydung, tailap=tailap, congtrinh=congtrinh, congtrinhtruocthue=congtrinhtruocthue,
            thuecongtrinh=thuecongtrinh, cptl=cptl)


class Cpql_Nd68_2019(web.UIModule):
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
            "reports/qtgt/cpql-nd68-2019.html", maubaocao=maubaocao,
            vl=vl, nc=nc, mtc=mtc, tructiepkhac=tructiepkhac, chung=chung, giantiepkhac=giantiepkhac,
            thutinhtruoc=thutinhtruoc, khaosat=khaosat, thietke=thietke, giamsat=giamsat,
            cpzvlncmtc=cpzvlncmtc, cptructiepkhac=cptructiepkhac, cptructiep=cptructiep, cpchung=cpchung, cpgiantiepkhac=cpgiantiepkhac, cpgiantiep=cpgiantiep, cpgiaxaydung=cpgiaxaydung,
            cpthutinhtruoc=cpthutinhtruoc, cpxaydungtruocthue=cpxaydungtruocthue, cpkhaosatthietke=cpkhaosatthietke, cpgiamsat=cpgiamsat, cptuvan=cptuvan, cptongxaydungtruocthue=cptongxaydungtruocthue,
            cpthuetongxaydung=cpthuetongxaydung, cptongxaydung=cptongxaydung, cpcongtrinh=cpcongtrinh,
            xaydung=xaydung, tailap=tailap, congtrinh=congtrinh, congtrinhtruocthue=congtrinhtruocthue,
            thuecongtrinh=thuecongtrinh, cptl=cptl)


class Cpql2_Nd68_2019(web.UIModule):
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
            "reports/qtgt/cpql2-nd68-2019.html", maubaocao=maubaocao,
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


class Cpql_20200721(web.UIModule):
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


class Cpql2_20200721(web.UIModule):
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


class HosoOngnganh(web.UIModule):
    def render(self, uid="", ttdl={}):
        return self.render_string(
            "reports/qtgt/rpt-ongnganh.html",
            uid=uid, ttdl=ttdl)


class HosoOngcai(web.UIModule):
    def render(self, uid="", ttdl={}):
        return self.render_string(
            "reports/qtgt/rpt-ongcai.html",
            uid=uid, ttdl=ttdl)


class Hoso2Phui(web.UIModule):
    def render(self, uid="", ttdl={}):
        return self.render_string(
            "reports/qtgt/rpt-2phui.html",
            uid=uid, ttdl=ttdl)


class Hoso(web.UIModule):
    def render(self, maqt="", ttdl={}):
        uid = f"qtgt_{maqt}"
        return self.render_string(
            "reports/qtgt/rpt-1hoso.html",
            uid=uid, ttdl=ttdl)
