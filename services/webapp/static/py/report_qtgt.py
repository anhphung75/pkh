from browser import html, document as docu
import javascript as js
import datetime

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
        "qtgt": {"tt": 1, "ngaylap": '20200813', "tieude": "BẢNG QUYẾT TOÁN GẮN MỚI ĐỒNG HỒ NƯỚC", "baogiaid": 20200813, "hesoid": 20200721},
        "donvithicong": {"tendvtc": "ĐỘI QLML CẤP NƯỚC QUẬN THỦ ĐỨC", 'nguoiky': "Nguyễn Văn Tùng", "chucvu": "Đội trưởng"}},
    1: {
        "tttt": {"maqt": "pkh002", "madot": "2020gmmp242", "mahoso": "113344", "makhachhang": "2020kh001", "madvtc": "qlmltd"},
        "dot": {"sodot": "242/20MP"},
        "hoso": {"sohoso": "gm01987/20", "diachigandhn": "T15 Nguyễn Văn Hưởng- P.Bình Thọ- Q.TĐ"},
        "khachhang": {"khachhang": "Lê Hồng Phong"},
        "qtgt": {"tt": 2, "ngaylap": '20200813', "tieude": "BẢNG QUYẾT TOÁN GẮN MỚI ĐỒNG HỒ NƯỚC", "baogiaid": 20200813, "hesoid": 20200721},
        "donvithicong": {"tendvtc": "ĐỘI QLML CẤP NƯỚC QUẬN THỦ ĐỨC", 'nguoiky': "Nguyễn Văn Tùng", "chucvu": "Đội trưởng"}}}


def load_odata():
    global odata

    return


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
    #display: grid;
    # grid: auto-flow minmax(1rem, max-content) / 10fr 5fr 2fr;
    zone = html.DIV(
        Class="w-full",
        style={"display": f"grid",
               "grid": f"auto-flow minmax(1rem, max-content) / 36mm 1fr 36mm"}
    )
    # row1
    lbox = html.DIV()
    lbox <= html.SPAN(
        f"Số hồ sơ: ",
        Class="text-left p-px flex-auto")
    lbox <= html.B(
        f"{odl['sohoso']}",
        Class="uppercase text-center p-px font-bold")
    mbox = html.DIV(
        f"{odl['tieude']}",
        Class="uppercase text-justify p-px font-bold",
        style={'fontSize': '13pt', 'textJustify': 'inter-word'})
    rbox = html.DIV()
    zone <= lbox + mbox + rbox
    # row2
    lbox = html.DIV(
        f"Khách hàng: ",
        Class="text-left p-px")
    mbox = html.DIV(
        f"{odl['khachhang']}",
        Class="uppercase text-justify p-px font-bold",
        style={'fontSize': '10pt', 'textJustify': 'inter-word'})
    rbox = html.DIV()
    rbox <= html.SPAN(
        f"ĐỢT: ",
        Class="text-right p-px")
    rbox <= html.B(
        f"{odl['sodot']}",
        Class="uppercase text-center p-px font-bold")
    zone <= lbox + mbox + rbox
    # row3
    lbox = html.DIV(
        f"Địa chỉ: ",
        Class="text-left p-px")
    mbox = html.DIV(
        f"{odl['diachigandhn']}",
        Class="uppercase text-justify p-px font-bold",
        style={'fontSize': '10pt', 'textJustify': 'inter-word'})
    rbox = html.DIV()
    zone <= lbox + mbox + rbox
    return zone


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
    trang <= zone + rrong('6pt')
    odl = {
        'tieude': o1data['qtgt']['tieude'],
        'sohoso': o1data['hoso']['sohoso'],
        'sodot': o1data['dot']['sodot'],
        'khachhang': o1data['khachhang']['khachhang'],
        'diachigandhn': o1data['hoso']['diachigandhn']}
    zone = tieude(odl)
    trang <= zone + rrong('2pt')
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
