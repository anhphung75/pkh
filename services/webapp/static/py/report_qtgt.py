from browser import html, document as docu
import javascript as js
import datetime
import locale
locale.setlocale(locale.LC_ALL, '')

"""
<div class="khungA4 flex border border-black">
    <div id="khungin:1" class="trangin flex-1 border border-red-600 flex flex-col">
      <div id="quochuy" class="border border-blue-400 flex justify-between">
        <div id="quochuy:left" class="box-left">box left maqt01</div>
        <div id="quochuy:right" class="box-right">box right</div>
      </div>
      <header class="border border-blue-400 flex justify-between">
        <div id="header:left" class="box-left">box left</div>
        <div id="header:mid" class="box-mid">tieude maqt01</div>
        <div id="header:right" class="box-right">box right</div>
      </header>
      <main class="flex-1 border border-blue-400 flex flex-col">
        <div class="flex-1 border border-green-400">bảng 1</div>
        <div>TỔNG KẾT KINH PHÍ: THông tư</div>
        <div>bang tổng kết 1</div>
        <div>Phan tai lap</div>
        <div>bangr tai lap</div>
      </main>
      <div>Kết toán chi phí</div>
      <div class="border border-blue-400 flex">
        <div id="duyet:left" class="flex-1 p-0">duyet trai</div>
        <div id="duyet:mid" class="flex-1 p-0">duyet giua</div>
        <div id="duyet:right" class="flex-1 p-0">duyet phai</div>
      </div>
      <footer class="flex border border-blue-400">
        <div id="footer:left" class="flex-1">footer trai</div>
        <div id="footer:mid" class="flex-1">footer giua</div>
        <div id="footer:right" class="flex-1">footer phai</div>
      </footer>
    </div>
  </div>
"""
# init data
odata = {
    0: {
        "tttt": {"maqt": "pkh001", "madot": "2020gmmp242", "mahoso": "113344",
                 "makhachhang": "2020kh001", "madvtc": "qlmltd"},
        "dot": {"sodot": "242/20MP"},
        "hoso": {"sohoso": "gm12345/20", "diachigandhn": "T15 Nguyễn Văn Hưởng- P.Bình Thọ- Q.TĐ T15 Nguyễn Văn Hưởng- P.Bình Thọ- Q.TĐ"},
        "khachhang": {"khachhang": "Phạm Thị Lan"},
        "qtgt": {"tt": 1, "ngaylap": '20200813', "tieude": "BẢNG QUYẾT TOÁN GẮN MỚI ĐỒNG HỒ NƯỚC", "baogiaid": 20200813, "hesoid": 20190725, "oc": {"Zvl": 0, "Znc": 0, "Zmtc": 0, "Tailap": 0}, "on": {"Zvl": 1282982, "Znc": 708310, "Zmtc": 52780, "Tailap": 362000}},
        "donvithicong": {"tendvtc": "ĐỘI QLML CẤP NƯỚC QUẬN THỦ ĐỨC", 'nguoiky': "Nguyễn Văn Tùng", "chucvu": "Đội trưởng"},
        "congvan": {"mienphi": "Thông tu 06/2016/TT-BXD (1003/2016)", "dongtien": "", "tailap": "Công văn số 327/BGTLMĐ ngày 01/04/2014"},
        "hesodutoan": {"hesoid": 20190725, "vl": 1, "nc": 1, "mtc": 1, "chung": 0.05, "thutinhtruoc": 0.055, "tructiepkhac": 0, "giantiepkhac": 0, "khaosat": 0.0236, "thietke": 1.2, "giamsat": 0.02566},
    },
    1: {
        "tttt": {"maqt": "pkh002", "madot": "2020gmmp242", "mahoso": "113344", "makhachhang": "2020kh001", "madvtc": "qlmltd"},
        "dot": {"sodot": "242/20MP"},
        "hoso": {"sohoso": "gm01987/20", "diachigandhn": "T15 Nguyễn Văn Hưởng- P.Bình Thọ- Q.TĐ"},
        "khachhang": {"khachhang": "Lê Hồng Phong"},
        "qtgt": {"tt": 2, "ngaylap": '20200813', "tieude": "BẢNG QUYẾT TOÁN GẮN MỚI ĐỒNG HỒ NƯỚC", "baogiaid": 20200813, "hesoid": 20200721, "oc": {"Zvl": 0, "Znc": 0, "Zmtc": 0, "Tailap": 0}, "on": {"Zvl": 1366026, "Znc": 564590, "Zmtc": 46925, "Tailap": 2610000}},
        "donvithicong": {"tendvtc": "ĐỘI QLML CẤP NƯỚC QUẬN THỦ ĐỨC", 'nguoiky': "Nguyễn Văn Tùng", "chucvu": "Đội trưởng"},
        "congvan": {"mienphi": "Nghị định 68/2019NĐ-CP (14/08/2019); Quyết định 2207/QĐ-UBND (18/06/2020)", "dongtien": "", "tailap": "Công văn số 327/BGTLMĐ ngày 01/04/2014"},
        "hesodutoan": {"hesoid": 20200721, "vl": 1, "nc": 1, "mtc": 1, "chung": 0.055, "tructiepkhac": 0, "giantiepkhac": 0.02, "thutinhtruoc": 0.055,
                       "khaosat": 0.0207, "thietke": 1.2, "giamsat": 0.02566},
    },
}


def load_odata():
    global odata

    return


def lamtronso(sothapphan="0.000", phanle=2):
    from decimal import Decimal
    try:
        somoi = round(Decimal(sothapphan),phanle)
    except:
        somoi = None
    return somoi


def format_tien(sotien=None):
    try:
        sotien = int(sotien)
        if sotien == 0:
            dinhdang = f"- "
        else:
            dinhdang = f"{sotien:,}".replace(',', '.')
    except:
        dinhdang = None
    return dinhdang


def tinhkinhphi(odl={"hesodutoan": {"hesoid": 20200721, }, "qtgt": {"oc": {}, "on": {}}}):
    # try:
    print(f"tinhkinhphi hesodutoan={odl['hesodutoan']}")
    print(f"tinhkinhphi qtgt={odl['qtgt']}")
    kp = {"oc": {}, "on": {}}
    # ong cai
    kp['oc']['Vl'] = lamtronso(
        odl['qtgt']['oc']['Zvl'] * odl['hesodutoan']['vl'], 0)
    kp['oc']['Nc'] = lamtronso(
        odl['qtgt']['oc']['Znc'] * odl['hesodutoan']['nc'], 0)
    kp['oc']['Mtc'] = lamtronso(
        odl['qtgt']['oc']['Zmtc'] * odl['hesodutoan']['mtc'], 0)
    kp['oc']['Zvlncmtc'] = kp['oc']['Vl'] + \
        kp['oc']['Nc'] + kp['oc']['Mtc']
    kp['oc']['Tructiepkhac'] = lamtronso(
        kp['oc']['Zvlncmtc'] * odl['hesodutoan']['tructiepkhac'], 0)
    kp['oc']['Tructiep'] = kp['oc']['Zvlncmtc'] + kp['oc']['Tructiepkhac']
    kp['oc']['Chung'] = lamtronso(kp['oc']['Tructiep'] * odl['hesodutoan']['chung'], 0)
    kp['oc']['Giantiepkhac'] = lamtronso(
        kp['oc']['Tructiep'] * odl['hesodutoan']['giantiepkhac'], 0)
    kp['oc']['Giantiep'] = kp['oc']['Chung'] + kp['oc']['Giantiepkhac']
    kp['oc']['Giaxaydung'] = kp['oc']['Tructiep'] + kp['oc']['Giantiep']
    kp['oc']['Thutinhtruoc'] = lamtronso(
        kp['oc']['Giaxaydung'] * odl['hesodutoan']['thutinhtruoc'], 0)
    kp['oc']['Xaydungtruocthue'] = kp['oc']['Giaxaydung'] + \
        kp['oc']['Thutinhtruoc']
    kp['oc']['KhaosatThietke'] = lamtronso(
        kp['oc']['Xaydungtruocthue'] * odl['hesodutoan']['khaosat'] * odl['hesodutoan']['thietke'], 0)
    kp['oc']['Giamsat'] = lamtronso(
        kp['oc']['Xaydungtruocthue'] * odl['hesodutoan']['giamsat'], 0)
    kp['oc']['Tongxaydungtruocthue'] = kp['oc']['Xaydungtruocthue'] + \
        kp['oc']['KhaosatThietke'] + kp['oc']['Giamsat']
    kp['oc']['Vattongxaydung'] = lamtronso(
        kp['oc']['Tongxaydungtruocthue'] * 0.1, 0)
    kp['oc']['Tongxaydung'] = kp['oc']['Tongxaydungtruocthue'] + \
        kp['oc']['Vattongxaydung']
    kp['oc']['Tailap'] = odl['qtgt']['oc']['Tailap']
    kp['oc']['Tailaptruocthue'] = lamtronso(
        kp['oc']['Tailap'] * 100/110, 0)
    kp['oc']['Vattailap'] = kp['oc']['Tailap'] - kp['oc']['Tailaptruocthue']
    # ong nganh
    kp['on']['Vl'] = lamtronso(
        odl['qtgt']['on']['Zvl'] * odl['hesodutoan']['vl'], 0)
    kp['on']['Nc'] = lamtronso(
        odl['qtgt']['on']['Znc'] * odl['hesodutoan']['nc'], 0)
    kp['on']['Mtc'] = lamtronso(
        odl['qtgt']['on']['Zmtc'] * odl['hesodutoan']['mtc'], 0)
    kp['on']['Zvlncmtc'] = kp['on']['Vl'] + \
        kp['on']['Nc'] + kp['on']['Mtc']
    kp['on']['Tructiepkhac'] = lamtronso(
        kp['on']['Zvlncmtc'] * odl['hesodutoan']['tructiepkhac'], 0)
    kp['on']['Tructiep'] = kp['on']['Zvlncmtc'] + kp['on']['Tructiepkhac']
    kp['on']['Chung'] = lamtronso(
        kp['on']['Tructiep'] * odl['hesodutoan']['chung'], 0)
    kp['on']['Giantiepkhac'] = lamtronso(
        kp['on']['Tructiep'] * odl['hesodutoan']['giantiepkhac'], 0)
    kp['on']['Giantiep'] = kp['on']['Chung'] + kp['on']['Giantiepkhac']
    kp['on']['Giaxaydung'] = kp['on']['Tructiep'] + kp['on']['Giantiep']
    kp['on']['Thutinhtruoc'] = lamtronso(
        kp['on']['Giaxaydung'] * odl['hesodutoan']['thutinhtruoc'], 0)
    kp['on']['Xaydungtruocthue'] = kp['on']['Giaxaydung'] + \
        kp['on']['Thutinhtruoc']
    kp['on']['KhaosatThietke'] = lamtronso(
        kp['on']['Xaydungtruocthue'] * odl['hesodutoan']['khaosat'] * odl['hesodutoan']['thietke'], 0)
    kp['on']['Giamsat'] = lamtronso(
        kp['on']['Xaydungtruocthue'] * odl['hesodutoan']['giamsat'], 0)
    kp['on']['Tongxaydungtruocthue'] = kp['on']['Xaydungtruocthue'] + \
        kp['on']['KhaosatThietke'] + kp['on']['Giamsat']
    kp['on']['Vattongxaydung'] = lamtronso(
        kp['on']['Tongxaydungtruocthue'] * 0.1, 0)
    kp['on']['Tongxaydung'] = kp['on']['Tongxaydungtruocthue'] + \
        kp['on']['Vattongxaydung']
    kp['on']['Tailap'] = odl['qtgt']['on']['Tailap']
    kp['on']['Tailaptruocthue'] = lamtronso(
        kp['on']['Tailap'] * 100/110, 0)
    kp['on']['Vattailap'] = kp['on']['Tailap'] - kp['on']['Tailaptruocthue']
    # kinh phi chung
    kp['Tongxaydung'] = kp['oc']['Tongxaydung'] + kp['on']['Tongxaydung']
    kp['Tongtailap'] = kp['oc']['Tailap']+kp['on']['Tailap']
    kp['Tongcontrinh'] = kp['Tongxaydung'] + kp['Tongtailap']
    # format tien
    for phui in ['oc', 'on']:
        for chiphi in kp[phui]:
            kp[phui][chiphi] = format_tien(kp[phui][chiphi])

    # except:
    #    kp = None
    return kp


def khungA4():
    zone = html.DIV(
        Class="khungA4 flex bg-blue-200 border border-black",
    )
    return zone


def qtgt_trang1(odl={'maqt': 'pkh002'}):
    zone = html.DIV(
        id=f"trang1:{odl['maqt']}",
        Class="trangin flex-1 bg-white border border-red-600 flex flex-col",
    )
    return zone


def rrong(cao="1pt"):
    zone = html.DIV(
        style={'height': f"{cao}"}
    )
    return zone


def quochuy(odl={'tendvtc': 'ĐỘI QLML CẤP NƯỚC QUẬN THỦ ĐỨC', 'ngaylap': '20200813'}):
    '''
    <div id="quochuy" class="border border-blue-400 flex justify-between">
        <div id="quochuy:left" class="box-left">box left maqt01</div>
        <div id="quochuy:right" class="box-right">box right</div>
    </div>
    '''
    zone = html.DIV(
        Class="flex justify-between"
    )
    lbox = html.DIV()
    lbox <= html.DIV(
        "CÔNG TY CỔ PHẦN CẤP NƯỚC THỦ ĐỨC",
        Class="uppercase text-center p-px font-bold quochuy")
    lbox <= html.DIV(
        f"{odl['tendvtc']}",
        Class="uppercase text-center p-px font-bold quochuy")
    lbox <= html.DIV(
        "---------oOo---------",
        Class="text-center p-px trangtri")
    lbox <= html.DIV(
        "Số tài khoản: 102010000183907",
        Class="text-center p-px")
    lbox <= html.DIV(
        "Tại: Ngân hàng Công Thương Việt Nam - Cn Đông Sài Gòn",
        Class="text-center p-px")
    rbox = html.DIV()
    rbox <= html.DIV(
        "CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM",
        Class="uppercase text-center p-px font-bold quochuy")
    rbox <= html.DIV(
        "Độc lập - Tự do - Hạnh phúc",
        Class="text-center p-px font-bold quochuy")
    rbox <= html.DIV(
        "---------oOo---------",
        Class="text-center p-px trangtri")
    sthoi = f"{odl['ngaylap']}"
    rbox <= html.DIV(
        f"Thủ Đức, ngày {sthoi[-2:]} tháng {sthoi[-4:-2]} năm {sthoi[:-4]}",
        Class="text-right p-px")
    zone <= lbox + rbox
    return zone


def tieude(odl={'tieude': 'BẢNG QUYẾT TOÁN GẮN MỚI ĐỒNG HỒ NƯỚC', 'sohoso': 'GM08123/20', 'sodot': '202/20MP', 'khachhang': 'Phạm Thị Lan', 'diachigandhn': 'T15 Nguyễn Văn Hưởng- P.Thảo Điền- Q.2'}):
    zone = html.DIV(
        Class="w-full",
        style={"margin-top": "3pt", "display": f"grid",
               "grid": f"auto-flow minmax(1rem, max-content)/max-content 1fr max-content minmax(max-content,20pt)"})
    # tieude
    zone <= html.DIV(
        f"{odl['tieude']}",
        Class="uppercase text-center p-px font-bold",
        style={'fontSize': '13pt', 'textJustify': 'inter-word', "gridArea": "1/1/2/5"})
    # row1
    box1 = html.DIV(
        f"Khách hàng: ",
        Class="text-left p-px")
    box2 = html.DIV(
        f"{odl['khachhang']}",
        Class="uppercase text-justify p-px font-bold",
        style={'fontSize': '10pt', 'textJustify': 'inter-word'})
    box3 = html.DIV(
        f"Số hồ sơ: ",
        Class="text-left p-px")
    box4 = html.DIV(
        f"{odl['sohoso']}",
        Class="uppercase text-justify p-px font-bold",
        style={'fontSize': '9pt', 'textJustify': 'inter-word'})
    zone <= box1 + box2 + box3 + box4
    # row2
    box1 = html.DIV(
        f"Địa chỉ:",
        Class="text-left p-px")
    box2 = html.DIV(
        f"{odl['diachigandhn']}",
        Class="uppercase text-justify p-px font-bold",
        style={'fontSize': '10pt', 'textJustify': 'inter-word'})
    box3 = html.DIV(
        f"Số đợt:",
        Class="text-left p-px")
    box4 = html.DIV(
        f"{odl['sodot']}",
        Class="uppercase text-justify p-px font-bold",
        style={'fontSize': '9pt', 'textJustify': 'inter-word'})
    zone <= box1 + box2 + box3 + box4
    return zone


def bangphui(odl={"congvan": "Thông tư 06/2016TT-BXD(10/03/2016)"}):
    zone = html.DIV(
        Class="w-full",
        style={"display": f"grid",
               "grid": f"auto-flow minmax(1rem, max-content) / 151fr 30fr 45fr 60fr 40fr 40fr 63fr 63fr 63fr"})
    # tieude
    box1 = html.DIV(
        f"Mô tả công tác",
        Class="text-center p-px font-bold border-black border-t border-l",
        style={"gridArea": "1/1/3/2", "paddingTop": "6pt"})
    box2 = html.DIV(
        f"ĐVT",
        Class="text-center p-px font-bold border-black border-t border-l",
        style={"gridArea": "1/2/3/3", "paddingTop": "6pt"})
    box3 = html.DIV(
        f"SL",
        Class="text-center p-px font-bold border-black border-t border-l",
        style={"gridArea": "1/3/3/4", "paddingTop": "6pt"})
    box4 = html.DIV(
        f"Đơn giá",
        Class="text-center p-px font-bold border-black border-t border-l",
        style={"gridArea": "1/4/2/7"})
    box5 = html.DIV(
        f"Thành tiền",
        Class="text-center p-px font-bold border-black border-t border-l border-r",
        style={"gridArea": "1/7/2/10"})
    zone <= box1 + box2 + box3 + box4 + box5
    box4 = html.DIV(
        f"VL",
        Class="text-center p-px font-bold border-black border-t border-l",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "1px 0 0 1px",
               "gridArea": "2/4/3/5"})
    box5 = html.DIV(
        f"NC",
        Class="text-center p-px font-bold",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "1px 0 0 1px",
               "gridArea": "2/5/3/6"})
    box6 = html.DIV(
        f"MTC",
        Class="text-center p-px font-bold",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "1px 0 0 1px",
               "gridArea": "2/6/3/7"})
    box7 = html.DIV(
        f"VL",
        Class="text-center p-px font-bold",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "1px 0 0 1px",
               "gridArea": "2/7/3/8"})
    box8 = html.DIV(
        f"NC",
        Class="text-center p-px font-bold",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "1px 0 0 1px",
               "gridArea": "2/8/3/9"})
    box9 = html.DIV(
        f"MTC",
        Class="text-center p-px font-bold",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "1px 1px 0 1px",
               "gridArea": "2/9/3/10"})
    zone <= box4 + box5 + box6 + box7 + box8 + box9
    return zone


def tongket0(odl={"congvan": "Thông tư 06/2016TT-BXD(10/03/2016)"}):
    zone = html.DIV(
        Class="w-full",
        style={"margin-top": "2pt", "margin-bottom": "2pt", "display": f"grid",
               "grid": f"auto-flow minmax(1rem, max-content) / max-content 1fr"})
    # tieude
    box1 = html.DIV(
        f"TỔNG KẾT KINH PHÍ:",
        Class="p-px font-bold")
    box2 = html.DIV(
        f"{odl['congvan']}",
        Class="p-px")
    zone <= box1 + box2
    return zone


def tongket_1phui_nd32(odl={"hesodutoan": {},
                            "qtgt": {"onZVl": "1982590", "onZnc": "2499584", "onZmtc": "240587"}}):
    # tinh du lieu
    print(f"tongket_1phui_nd32 hesodutoan={odl['hesodutoan']}")
    print(f"tongket_1phui_nd32 qtgt={odl['qtgt']}")
    kp = tinhkinhphi(odl)
    phui = f'on'
    if kp['on']['Tongxaydung'] == 0:
        phui = f'oc'
    # design
    zone = html.DIV(
        Class="w-full",
        style={"display": f"grid",
               "grid": f"auto-flow minmax(1rem, max-content) / 151fr 278fr 63fr 63fr"})
    # tieude border: top right bot left
    box1 = html.DIV(
        f"Khoản mục chi phí",
        Class="text-center p-px font-bold",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "1px 0 0 1px"})
    box2 = html.DIV(
        f"Cách tính",
        Class="text-center p-px font-bold",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "1px 0 0 1px"})
    box3 = html.DIV(
        f"Ký hiệu",
        Class="text-center p-px font-bold",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "1px 0 0 1px"})
    box4 = html.DIV(
        f"Thành tiền",
        Class="text-center p-px font-bold",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "1px 1px 0 1px"})
    zone <= box1 + box2 + box3 + box4
    box1 = html.DIV(
        f"PHẦN 1: LẮP ĐẶT ĐỒNG HỒ NƯỚC",
        Class="uppercase p-px font-bold",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "1px 0 0 1px"})
    box2 = html.DIV(
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "1px 0 0 1px"})
    box3 = html.DIV(
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "1px 0 0 1px"})
    box4 = html.DIV(
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "1px 1px 0 1px"})
    zone <= box1 + box2 + box3 + box4
    box1 = html.DIV(
        f"1. Chi phí vật tư (trước thuế)",
        Class="p-px",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box2 = html.DIV(
        f"vl",
        Class="p-px",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box3 = html.DIV(
        f"VL",
        Class="p-px text-center",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box4 = html.DIV(
        f"{kp[phui]['Vl']}",
        Class="p-px text-right",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 1px 0 1px"})
    zone <= box1 + box2 + box3 + box4
    box1 = html.DIV(
        f"2. Chi phí nhân công",
        Class="p-px",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box2 = html.DIV(
        f"nc",
        Class="p-px",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box3 = html.DIV(
        f"NC",
        Class="p-px text-center",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box4 = html.DIV(
        f"{kp[phui]['Nc']}",
        Class="p-px text-right",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 1px 0 1px"})
    zone <= box1 + box2 + box3 + box4
    box1 = html.DIV(
        f"3. Chi phí máy thi công",
        Class="p-px",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box2 = html.DIV(
        f"mtc",
        Class="p-px",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box3 = html.DIV(
        f"MTC",
        Class="p-px text-center",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box4 = html.DIV(
        f"{kp[phui]['Mtc']}",
        Class="p-px text-right",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 1px 0 1px"})
    zone <= box1 + box2 + box3 + box4
    box1 = html.DIV(
        Class="p-px",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box2 = html.DIV(
        f"Cộng",
        Class="p-px text-right",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box3 = html.DIV(
        f"A",
        Class="p-px text-center",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box4 = html.DIV(
        f"{kp[phui]['Zvlncmtc']}",
        Class="p-px text-right",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "1px 1px 0 1px"})
    zone <= box1 + box2 + box3 + box4
    box1 = html.DIV(
        f"4. Trực tiếp phí khác",
        Class="p-px",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box2 = html.DIV(
        f"A  x  {odl['hesodutoan']['tructiepkhac']*100:01.2f} %",
        Class="p-px",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box3 = html.DIV(
        f"TT",
        Class="p-px text-center",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box4 = html.DIV(
        f"{kp[phui]['Tructiepkhac']}",
        Class="p-px text-right",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 1px 0 1px"})
    zone <= box1 + box2 + box3 + box4
    box1 = html.DIV(
        Class="p-px",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box2 = html.DIV(
        f"Chi phí trực tiếp",
        Class="p-px text-right",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box3 = html.DIV(
        f"T",
        Class="p-px text-center",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box4 = html.DIV(
        f"{kp[phui]['Tructiep']}",
        Class="p-px text-right",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "1px 1px 0 1px"})
    zone <= box1 + box2 + box3 + box4
    box1 = html.DIV(
        f"5. Chi phí chung",
        Class="p-px",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box2 = html.DIV(
        f"T  x  {odl['hesodutoan']['chung']*100:01.2f}%",
        Class="p-px",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box3 = html.DIV(
        f"C",
        Class="p-px text-center",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box4 = html.DIV(
        f"{kp[phui]['Chung']}",
        Class="p-px text-right",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 1px 0 1px"})
    zone <= box1 + box2 + box3 + box4
    box1 = html.DIV(
        Class="p-px",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box2 = html.DIV(
        f"Giá thành xây dựng",
        Class="p-px tẽt right",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box3 = html.DIV(
        f"Z",
        Class="p-px text-center",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box4 = html.DIV(
        f"{kp[phui]['Giaxaydung']}",
        Class="p-px text-right",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "1px 1px 0 1px"})
    zone <= box1 + box2 + box3 + box4
    box1 = html.DIV(
        f"6. Thu nhập chịu thuế tính trước",
        Class="p-px",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box2 = html.DIV(
        f"Z  x  {odl['hesodutoan']['thutinhtruoc']*100:01.2f}%",
        Class="p-px",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box3 = html.DIV(
        f"TL",
        Class="p-px text-center",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box4 = html.DIV(
        f"{kp[phui]['Thutinhtruoc']}",
        Class="p-px text-right",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 1px 0 1px"})
    zone <= box1 + box2 + box3 + box4
    box1 = html.DIV(
        Class="p-px",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box2 = html.DIV(
        f"Giá trị xây dựng trước thuế",
        Class="p-px text-right",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box3 = html.DIV(
        f"G",
        Class="p-px text-center",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box4 = html.DIV(
        f"{kp[phui]['Xaydungtruocthue']}",
        Class="p-px text-right",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "1px 1px 0 1px"})
    zone <= box1 + box2 + box3 + box4
    box1 = html.DIV(
        f"7. Chi phí khảo sát thiết kế",
        Class="p-px",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box2 = html.DIV(
        f"G  x  {odl['hesodutoan']['khaosat']*100:01.2f}%  x  {odl['hesodutoan']['thietke']:01.2f}",
        Class="p-px",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box3 = html.DIV(
        f"I",
        Class="p-px text-center",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box4 = html.DIV(
        f"{kp[phui]['KhaosatThietke']}",
        Class="p-px text-right",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 1px 0 1px"})
    zone <= box1 + box2 + box3 + box4
    box1 = html.DIV(
        f"8. Chi phí giám sát thi công",
        Class="p-px",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box2 = html.DIV(
        f"G  x  {odl['hesodutoan']['giamsat']*100:01.3f}%",
        Class="p-px",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box3 = html.DIV(
        f"J",
        Class="p-px text-center",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box4 = html.DIV(
        f"{kp[phui]['Giamsat']}",
        Class="p-px text-right",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 1px 0 1px"})
    zone <= box1 + box2 + box3 + box4
    box1 = html.DIV(
        Class="p-px",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box2 = html.DIV(
        f"Tổng giá trị xây dựng trước thuế",
        Class="p-px text-right",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box3 = html.DIV(
        f"L(A)",
        Class="p-px text-center",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box4 = html.DIV(
        f"{kp[phui]['Tongxaydungtruocthue']}",
        Class="p-px text-right",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "1px 1px 0 1px"})
    zone <= box1 + box2 + box3 + box4
    box1 = html.DIV(
        f"9. Thuế GTGT đầu ra",
        Class="p-px",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box2 = html.DIV(
        f"L  x  10%",
        Class="p-px",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box3 = html.DIV(
        f"GTGT1",
        Class="p-px text-center",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box4 = html.DIV(
        f"{kp[phui]['Vattongxaydung']}",
        Class="p-px text-right",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 1px 0 1px"})
    zone <= box1 + box2 + box3 + box4
    box1 = html.DIV(
        Class="p-px",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box2 = html.DIV(
        f"Giá trị xây dựng sau thuế",
        Class="p-px tẽt right",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box3 = html.DIV(
        f"Gxd1",
        Class="p-px text-center",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "0 0 0 1px"})
    box4 = html.DIV(
        f"{kp[phui]['Tongxaydung']}",
        Class="p-px text-right font-bold",
        style={"borderStyle": "solid", "borderColor": "black", "borderWidth": "1px 1px 0 1px"})
    zone <= box1 + box2 + box3 + box4

    return zone


def tailap(odl={}):
    zone = html.DIV(
        Class="w-full",
        style={"display": f"grid",
               "grid": f"auto-flow minmax(1rem, max-content) / 1fr 1fr 1fr 1fr"})


def footer(odl={'baogiaid': '20200721', 'tt': 1}):
    '''
    <div id="quochuy" class="border border-blue-400 flex justify-between">
        <div id="quochuy:left" class="box-left">box left maqt01</div>
        <div id="quochuy:right" class="box-right">box right</div>
    </div>
    '''
    zone = html.DIV(
        Class="border-t border-black flex justify-between"
    )
    sthoi = f"{odl['baogiaid']}"
    lbox = html.DIV(
        f"DT-TT05 ({sthoi[-2:]}-{sthoi[-4:-2]}-{sthoi[:-4]})",
        Class="text-left p-px")
    rbox = html.DIV(
        f"TT-{odl['tt']:02}",
        Class="text-left p-px")
    zone <= lbox + rbox
    return zone


def creat_1_report(o1data=None):
    '''
    o1data = {
    "tttt":{"maqt": "pkh002","madvtc":"qlmltd","mahoso":"","makhachhang":""},
    "qtgt": {"tieude":"BẢNG QUYẾT TOÁN GẮN MỚI ĐỒNG HỒ NƯỚC","ngaylap": '20200813', "hesoid": 20200721},
    "hoso":{"diachigandhn":"T15 Nguyễn Văn Hưởng- P.Bình Thọ- Q.TĐ"},
    "khachhang":{"khachhang":"Phạm Thị Lan"},
    "donvithicong": {"tendvtc": "ĐỘI QLML CẤP NƯỚC QUẬN THỦ ĐỨC", 'nguoiky': "Nguyễn Văn Tùng", "chucvu": "Đội trưởng"}}
    '''
    odl = {'maqt': None}
    try:
        odl['maqt'] = o1data['tttt']['maqt']
    except:
        print('Err maqt=None')
        return
    khung = khungA4()
    trang = qtgt_trang1(odl)
    odl = {
        'tendvtc': o1data['donvithicong']['tendvtc'],
        'ngaylap': o1data['qtgt']['ngaylap']}
    zone = quochuy(odl)
    trang <= zone
    odl = {
        'tieude': o1data['qtgt']['tieude'],
        'sohoso': o1data['hoso']['sohoso'],
        'sodot': o1data['dot']['sodot'],
        'khachhang': o1data['khachhang']['khachhang'],
        'diachigandhn': o1data['hoso']['diachigandhn']}
    zone = tieude(odl)
    trang <= zone
    # phui ong nganh
    odl = {
        'congvan': o1data['congvan']['mienphi']}
    zone = bangphui(odl)
    trang <= zone

    odl = {
        'congvan': o1data['congvan']['mienphi']}
    zone = tongket0(odl)
    trang <= zone

    odl = {
        'qtgt': o1data['qtgt'],
        'hesodutoan': o1data['hesodutoan']}
    zone = tongket_1phui_nd32(odl)
    trang <= zone + rrong("6pt")

    odl = {
        'baogiaid': o1data['qtgt']['baogiaid'],
        'tt': o1data['qtgt']['tt']}
    zone = footer(odl)
    trang <= zone
    khung <= trang
    docu <= khung


def creat_report():
    for id in odata:
        print("creat_report odata=", odata[id])
        creat_1_report(odata[id])


creat_report()
