from browser import html, document as docu
import datetime
import locale

#from utils import lamtronso, Tien

locale.setlocale(locale.LC_ALL, 'vi_VI')


def lamtronso(sothapphan=0, phanle=2):
    from decimal import Decimal
    # try:
    somoi = float(round(Decimal(sothapphan), phanle))
    # except:
    #    somoi = None
    return somoi


class Qtgt:
    def __init__(self, maqt):
        self.maqt = maqt
        self.load_qtgt()

    def load_qtgt(self):
        self.__tttt()
        self.__hoso()
        self.__dot()
        self.__qtgt()
        self.__qtxd_oc()
        self.__qtvt_oc()
        self.__qtvl_oc()
        self.__qttl_oc()
        self.__khachhang()
        self.__donvithicong()
        self.__cpql()

    def __tttt(self):
        dl = {"maqt": "pkh002", "madot": "2020gmmp242", "mahoso": "113344",
              "makhachhang": "2020kh001", "madvtc": "qlmltd"}
        self.tttt = dl

    def __hoso(self):
        dl = {
            'sohoso': 'GM01001/20',
            'diachigandhn': '25/5/4A- Đường 9- Kp.5- P.Linh Xuân- Q.TĐ', }
        self.sohoso = dl['sohoso']
        self.diachigandhn = dl['diachigandhn']

    def __dot(self):
        dl = {'sodot': '999/2020MP', }
        self.sodot = dl['sodot']

    def __qtgt(self):
        # load tttt
        dl = {'ngaylap': '20200907', 'macpql': '20200721', 'mabaogia': '20200721',
              'ocZvl': 0, 'ocZnc': 0, 'ocZmtc': 0, 'ocZtl': 0,
              'onZvl': 0, 'onZnc': 0, 'onZmtc': 0, 'onZtl': 0,
              'cpCty': 0, 'cpKhach': 0}
        self.ngaylap = dl['ngaylap']
        self.ocZvl = dl['ocZvl']
        self.ocZnc = dl['ocZnc']
        self.ocZmtc = dl['ocZmtc']
        self.ocZtl = dl['ocZtl']
        self.onZvl = dl['onZvl']
        self.onZnc = dl['onZnc']
        self.onZmtc = dl['onZmtc']
        self.onZtl = dl['onZtl']
        self.cpCty = dl['cpCty']
        self.cpKhach = dl['cpKhach']
        self.mabaogia = dl['mabaogia']

    def __qtxd_oc(self):
        dl = [
            {'chiphiid': '001', 'mota': '- Cắt mặt nhựa và BTXM', 'dvt': 'mét',
             'sl': 16, 'giavl': 6510, 'gianc': 13174, 'giamtc': 5815,
             'tienvl': 104154, 'tiennc': 210776, 'tienmtc': 93040},
            {'chiphiid': '002', 'mota': '- Đào bốc mặt đường nhựa', 'dvt': 'm3',
             'sl': 0.24, 'giavl': 0, 'gianc': 538918, 'giamtc': 0,
             'tienvl': 0, 'tiennc': 129340, 'tienmtc': 0}
        ]
        # load gia
        # tinh tien
        for cp in dl:
            cp['tienvl'] = lamtronso(cp['sl'] * cp['giavl'], 0)
            cp['tiennc'] = lamtronso(cp['sl'] * cp['gianc'], 0)
            cp['tienmtc'] = lamtronso(cp['sl'] * cp['giamtc'], 0)
        self.ocCpxd = dl.copy()

    def __qtvt_oc(self):
        dl = [
            {'chiphiid': '001', 'mota': 'Đai lấy nước PP 100 x 20F', 'dvt': 'bộ',
             'sl': 1, 'giavl': 133900, 'gianc': 47904, 'giamtc': 0,
             'tienvl': 133900, 'tiennc': 47904, 'tienmtc': 0},
            {'chiphiid': '002', 'mota': 'Ống HDPE 25x3mm', 'dvt': 'mét',
             'sl': 12, 'giavl': 13895, 'gianc': 17174, 'giamtc': 774,
             'tienvl': 166740, 'tiennc': 206088, 'tienmtc': 9288},
        ]
        # load gia
        # tinh tien
        for cp in dl:
            cp['tienvl'] = lamtronso(cp['sl'] * cp['giavl'], 0)
            cp['tiennc'] = lamtronso(cp['sl'] * cp['gianc'], 0)
            cp['tienmtc'] = lamtronso(cp['sl'] * cp['giamtc'], 0)
        self.ocCpvt = dl.copy()

    def __qtvl_oc(self):
        dl = [
            {'chiphiid': '001', 'mota': 'Đai lấy nước PP 100 x 20F', 'dvt': 'bộ',
             'sl': 1, 'giavl': 133900, 'gianc': 47904, 'giamtc': 0,
             'tienvl': 133900, 'tiennc': 47904, 'tienmtc': 0},
            {'chiphiid': '002', 'mota': 'Ống HDPE 25x3mm', 'dvt': 'mét',
             'sl': 12, 'giavl': 13895, 'gianc': 17174, 'giamtc': 774,
             'tienvl': 166740, 'tiennc': 206088, 'tienmtc': 9288},
        ]
        # load gia
        # tinh tien
        for cp in dl:
            cp['tienvl'] = lamtronso(cp['sl'] * cp['giavl'], 0)
            cp['tiennc'] = lamtronso(cp['sl'] * cp['gianc'], 0)
            cp['tienmtc'] = lamtronso(cp['sl'] * cp['giamtc'], 0)
        self.ocCpvl = dl.copy()

    def __qttl_oc(self):
        dl = [{'chiphiid': '001', 'mota': 'Gạch hình sin', 'dvt': 'm2',
               'sl': 0.35, 'gia': 412000},
              {'chiphiid': '002', 'mota': '- Đào bốc mặt đường nhựa', 'dvt': 'm2',
               'sl': 2.4, 'gia': 890000}, ]
        # load gia
        # tinh tien
        for cp in dl:
            cp['ocsl'] = cp['sl']
            cp['tien'] = lamtronso(cp['ocsl'] * cp['gia'], 0)
        self.ocCptl = dl.copy()

    def __khachhang(self):
        dl = {'khachhang': 'Nguyễn Lan Chi', }
        self.khachhang = dl['khachhang']

    def __donvithicong(self):
        dl = {'dvtc': 'QLMLTD', }
        self.dvtc = dl['dvtc']

    def __cpql(self):
        dl = {"hesoid": 20200721, "vl": 1, "nc": 1, "mtc": 1, "chung": 0.055, "tructiepkhac": 0, "giantiepkhac": 0.02, "thutinhtruoc": 0.055,
              "khaosat": 0.0207, "thietke": 1.2, "giamsat": 0.02566}
        self.hsVl = dl['vl']
        self.hsNc = dl['nc']
        self.hsMtc = dl['mtc']
        self.hsChung = dl['chung']
        self.hsTructiepkhac = dl['tructiepkhac']
        self.hsGiantiepkhac = dl['giantiepkhac']
        self.hsThutinhtruoc = dl['thutinhtruoc']
        self.hsKhaosat = dl['khaosat']
        self.hsThietke = dl['thietke']
        self.hsGiamsat = dl['giamsat']
        # ong cai
        self.ocVl = lamtronso(self.ocZvl * self.hsVl, 0)
        self.ocNc = lamtronso(self.ocZnc * self.hsNc, 0)
        self.ocMtc = lamtronso(self.ocZmtc * self.hsMtc, 0)
        self.ocZvlncmtc = self.ocVl + self.ocNc + self.ocMtc
        self.ocTructiepkhac = lamtronso(
            self.ocZvlncmtc * self.hsTructiepkhac, 0)
        self.ocTructiep = self.ocZvlncmtc + self.ocTructiepkhac
        self.ocChung = lamtronso(self.ocTructiep * self.hsChung, 0)
        self.ocGiantiepkhac = lamtronso(
            self.ocTructiep * self.hsGiantiepkhac, 0)
        self.ocGiantiep = self.ocChung + self.ocGiantiepkhac
        self.ocGiaxaydung = self.ocTructiep + self.ocGiantiep
        self.ocThutinhtruoc = lamtronso(
            self.ocGiaxaydung * self.hsThutinhtruoc, 0)
        self.ocXaydungtruocthue = self.ocGiaxaydung + self.ocThutinhtruoc
        self.ocKhaosatthietke = lamtronso(
            self.ocXaydungtruocthue * self.hsKhaosat * self.hsThietke, 0)
        self.ocGiamsat = lamtronso(self.ocXaydungtruocthue * self.hsGiamsat, 0)
        self.ocTuvan = self.ocKhaosatthietke + self.ocGiamsat
        self.ocTongxaydungtruocthue = self.ocXaydungtruocthue + self.ocTuvan
        self.ocThuetongxaydung = lamtronso(
            self.ocTongxaydungtruocthue * 10/100, 0)
        self.ocTongxaydung = self.ocTongxaydungtruocthue + self.ocThuetongxaydung
        self.ocCongtrinh = self.ocTongxaydung + self.ocZtl
        # ong nganh
        self.onVl = lamtronso(self.onZvl * self.hsVl, 0)
        self.onNc = lamtronso(self.onZnc * self.hsNc, 0)
        self.onMtc = lamtronso(self.onZmtc * self.hsMtc, 0)
        self.onZvlncmtc = self.onVl + self.onNc + self.onMtc
        self.onTructiepkhac = lamtronso(
            self.onZvlncmtc * self.hsTructiepkhac, 0)
        self.onTructiep = self.onZvlncmtc + self.onTructiepkhac
        self.onChung = lamtronso(self.onTructiep * self.hsChung, 0)
        self.onGiantiepkhac = lamtronso(
            self.onTructiep * self.hsGiantiepkhac, 0)
        self.onGiantiep = self.onChung + self.onGiantiepkhac
        self.onGiaxaydung = self.onTructiep + self.onGiantiep
        self.onThutinhtruoc = lamtronso(
            self.onGiaxaydung * self.hsThutinhtruoc, 0)
        self.onXaydungtruocthue = self.onGiaxaydung + self.onThutinhtruoc
        self.onKhaosatthietke = lamtronso(
            self.onXaydungtruocthue * self.hsKhaosat * self.hsThietke, 0)
        self.onGiamsat = lamtronso(self.onXaydungtruocthue * self.hsGiamsat, 0)
        self.onTuvan = self.onKhaosatthietke + self.onGiamsat
        self.onTongxaydungtruocthue = self.onXaydungtruocthue + self.onTuvan
        self.onThuetongxaydung = lamtronso(
            self.onTongxaydungtruocthue*10/100, 0)
        self.onTongxaydung = self.onTongxaydungtruocthue + self.onThuetongxaydung
        self.onCongtrinh = self.onTongxaydung + self.onZtl
        # tong
        self.xaydung = self.ocTongxaydung + self.onTongxaydung
        self.tailap = self.ocZtl + self.onZtl
        self.congtrinh = self.xaydung + self.tailap
        self.congtrinhtruocthue = lamtronso(self.congtrinh*100/110, 0)
        self.thuecongtrinh = self.congtrinh - self.congtrinhtruocthue
        if (self.ocTongxaydung*self.onTongxaydung) > 0:
            self.maubaocao = 'o2'
        elif self.ocTongxaydung > 0:
            self.maubaocao = 'oc'
        else:
            self.maubaocao = 'on'


def khungA4():
    zone = html.DIV(
        Class="A4doc",
    )
    return zone


def quochuy(tendvtc='ĐỘI QLML CẤP NƯỚC QUẬN THỦ ĐỨC', ngaylap='20200813'):
    '''
    <div class="grid quochuy">
        <div>
            <div class="c u fb" style="word-spacing: 3pt">CÔNG TY CỔ PHẦN CẤP NƯỚC THỦ ĐỨC</div>
            <div class="c fb" style="word-spacing: 3pt">{{dvtc}}</div>
            <div class="c f-2">---------oOo---------</div>
            <div class="c">Số tài khoản: 102010000183907</div>
            <div class="c">Tại: Nh Công Thương Việt Nam - Cn Đông Sài Gòn</div>
        </div>
        <div></div>
        <div>
            <div class="c u fb">CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
            <div class="c fb">Độc lập - Tự do - Hạnh phúc</div>
            <div class="c f-2">---------oOo---------</div>
            <div class="c ngaylap" contenteditable="true" onblur="suangaylap(this.innerHTML)">{{ngaylap}}</div>
        </div>
    </div>
    '''
    zone = html.DIV(
        Class="grid quochuy"
    )
    lbox = html.DIV()
    lbox <= html.DIV(
        "CÔNG TY CỔ PHẦN CẤP NƯỚC THỦ ĐỨC",
        Class="c u fb",
        style={"wordSpacing": '3pt'})
    lbox <= html.DIV(
        f"{tendvtc}",
        Class="c u fb",
        style={"wordSpacing": '3pt'})
    lbox <= html.DIV(
        "---------oOo---------",
        Class="c f-2")
    lbox <= html.DIV(
        "Số tài khoản: 102010000183907",
        Class="c")
    lbox <= html.DIV(
        "Tại: Nh Công Thương Việt Nam - Cn Đông Sài Gòn",
        Class="c")
    mbox = html.DIV()
    rbox = html.DIV()
    rbox <= html.DIV(
        "CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM",
        Class="c u fb")
    rbox <= html.DIV(
        "Độc lập - Tự do - Hạnh phúc",
        Class="c fb")
    rbox <= html.DIV(
        "---------oOo---------",
        Class="c f-2")
    sthoi = f"{ngaylap}"
    actbox = html.DIV(
        f"Thủ Đức, ngày {sthoi[-2:]} tháng {sthoi[-4:-2]} năm {sthoi[:-4]}",
        Class="c ngaylap",
        contenteditable="true")

    def suangaylap(ev):
        noidung = ev.innerHTML
        for el in docu.select(".ngaylap"):
            el.attrs.innerHTML = noidung
    actbox.bind("blur", suangaylap)
    rbox <= actbox
    zone <= lbox + mbox + rbox
    return zone


def tieudeqtgt(maqt='pkh001', tieude='BẢNG QUYẾT TOÁN GẮN MỚI ĐỒNG HỒ NƯỚC', sohoso='GM08123/20', sodot='202/20MP',
               khachhang='Phạm Thị Lan', diachigandhn='T15 Nguyễn Văn Hưởng- P.Thảo Điền- Q.2'):
    '''
    <div class="grid tieudeqtgt">
        <div class="c u fb f5 b0 tieudeqtgt" style="grid-area:1/1/2/5" contenteditable="true"
            onblur="suatieude(this.innerHTML)">
            {{tieude}}
        </div>
        <div class="l">Khách hàng: </div>
        <div class="l u fb f2">{{khachhang}}</div>
        <div class="l">Sô hồ sơ: </div>
        <div class="l u fb f2">{{sohoso}}</div>
        <div class="l">Địa chỉ: </div>
        <div class="l fb f2">{{diachigandhn}}</div>
        <div class="l">Sô đợt: </div>
        <div class="l u fb f2">{{sodot}}</div>
    </div>
    '''
    zone = html.DIV(
        Class=f"grid tieudeqtgt"
    )
    actbox = html.DIV(
        f"{tieude}",
        Class=f"c u fb f5 b0 tieude_{maqt}",
        style={"gridArea": "1/1/2/5"},
        contenteditable="true")

    def suatieude(ev):
        noidung = ev.innerHTML
        for el in docu.select(f".tieude_{maqt}"):
            el.attrs.innerHTML = noidung
    actbox.bind("blur", suatieude)
    zone <= actbox
    zone <= html.DIV(
        f"Khách hàng: ",
        Class="l")
    zone <= html.DIV(
        f"{khachhang}",
        Class="l u fb f2")
    zone <= html.DIV(
        f"Sô hồ sơ: ",
        Class="l")
    zone <= html.DIV(
        f"{sohoso}",
        Class="l u fb f2")
    zone <= html.DIV(
        f"Địa chỉ: ",
        Class="l")
    zone <= html.DIV(
        f"{diachigandhn}",
        Class="l fb f2")
    zone <= html.DIV(
        f"Sô đợt: ",
        Class="l")
    zone <= html.DIV(
        f"{sodot}",
        Class="l u fb f2")
    return zone


def creat_rptQtgt(maqt='pkh001'):
    maqt = f"qtgt:{maqt}"
    if maqt in docu:
        zone = docu[maqt]
    else:
        zone = html.DIV(id=maqt)
        docu['body'] <= zone
    trang1 = khungA4()

    zone <= trang1


# main
dsinqt = ['pkh001', 'pkh002']
for maqt in dsinqt:
    creat_rptQtgt(maqt)
