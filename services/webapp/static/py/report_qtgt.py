from browser import html, document as docu
import javascript as js
import datetime

"""
<div class="khungA4 flex m-0 p-0 border border-black">
    <div id="khungin:1" class="trangin flex-1 p-0 border border-red-600 flex flex-col">
      <div id="quochuy" class="m-0 p-0 border border-blue-400 flex justify-between">
        <div id="quochuy:left" class="box-left">box left maqt01</div>
        <div id="quochuy:right" class="box-right">box right</div>
      </div>
      <header class="m-0 p-0 border border-blue-400 flex justify-between">
        <div id="header:left" class="box-left">box left</div>
        <div id="header:mid" class="box-mid">tieude maqt01</div>
        <div id="header:right" class="box-right">box right</div>
      </header>
      <main class="flex-1 m-0 p-0 border border-blue-400 flex flex-col">
        <div class="flex-1 m-0 p-0 border border-green-400">bảng 1</div>
        <div>TỔNG KẾT KINH PHÍ: THông tư</div>
        <div>bang tổng kết 1</div>
        <div>Phan tai lap</div>
        <div>bangr tai lap</div>
      </main>
      <div>Kết toán chi phí</div>
      <div class="m-0 p-0 border border-blue-400 flex">
        <div id="duyet:left" class="flex-1 m-0 p-0">duyet trai</div>
        <div id="duyet:mid" class="flex-1 m-0 p-0">duyet giua</div>
        <div id="duyet:right" class="flex-1 m-0 p-0">duyet phai</div>
      </div>
      <footer class="flex m-0 p-0 border border-blue-400">
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
        "tttt": {"maqt": "pkh001", "madot": "2020gmmp242", "mahoso": "113344", "madvtc": "qlmltd"},
        "dot": {"sodot": "242/20MP"},
        "hoso": {"sohoso": "gm12345/20"},
        "qtgt": {"tt": 1, "ngaylap": '20200813', "tieude": "BẢNG QUYẾT TOÁN GẮN MỚI ĐỒNG HỒ NƯỚC", "baogiaid": 20200813, "hesoid": 20200721},
        "donvithicong": {"tendvtc": "ĐỘI QLML CẤP NƯỚC QUẬN THỦ ĐỨC", 'nguoiky': "Nguyễn Văn Tùng", "chucvu": "Đội trưởng"}},
    1: {
        "tttt": {"maqt": "pkh002", "madot": "2020gmmp242", "mahoso": "113344", "madvtc": "qlmltd"},
        "dot": {"sodot": "242/20MP"},
        "hoso": {"sohoso": "gm01987/20"},
        "qtgt": {"tt": 2, "ngaylap": '20200813', "tieude": "BẢNG QUYẾT TOÁN GẮN MỚI ĐỒNG HỒ NƯỚC", "baogiaid": 20200813, "hesoid": 20200721},
        "donvithicong": {"tendvtc": "ĐỘI QLML CẤP NƯỚC QUẬN THỦ ĐỨC", 'nguoiky': "Nguyễn Văn Tùng", "chucvu": "Đội trưởng"}}}


def load_odata():
    global odata

    return


def khungA4():
    zone = html.DIV(
        Class="khungA4 flex m-0 p-0 bg-blue-200 border border-black",
    )
    return zone


def qtgt_trang1(maqt='pkh002'):
    zone = html.DIV(
        id=f"trang1:{maqt}",
        Class="trangin flex-1 p-0 bg-white border border-red-600 flex flex-col",
    )
    return zone


def quochuy(tendvtc='ĐỘI QLML CẤP NƯỚC QUẬN THỦ ĐỨC', ngaylap='20200813'):
    '''
    <div id="quochuy" class="m-0 p-0 border border-blue-400 flex justify-between">
        <div id="quochuy:left" class="box-left">box left maqt01</div>
        <div id="quochuy:right" class="box-right">box right</div>
    </div>
    '''
    zone = html.DIV(
        Class="m-0 p-0 border-0 flex justify-between"
    )
    lbox = html.DIV()
    lbox <= html.DIV(
        "CÔNG TY CỔ PHẦN CẤP NƯỚC THỦ ĐỨC",
        Class="uppercase text-center m-0 p-px font-bold quochuy")
    lbox <= html.DIV(
        f"{tendvtc}",
        Class="uppercase text-center m-0 p-px font-bold quochuy")
    lbox <= html.DIV(
        "---------oOo---------",
        Class="text-center m-0 p-px trangtri")
    lbox <= html.DIV(
        "Số tài khoản: 102010000183907",
        Class="text-center m-0 p-px")
    lbox <= html.DIV(
        "Tại: Ngân hàng Công Thương Việt Nam - Cn Đông Sài Gòn",
        Class="text-center m-0 p-px")
    rbox = html.DIV()
    rbox <= html.DIV(
        "CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM",
        Class="uppercase text-center m-0 p-px font-bold quochuy")
    rbox <= html.DIV(
        "Độc lập - Tự do - Hạnh phúc",
        Class="text-center m-0 p-px font-bold quochuy")
    rbox <= html.DIV(
        "---------oOo---------",
        Class="text-center m-0 p-px trangtri")
    sthoi = f"{ngaylap}"
    rbox <= html.DIV(
        f"Thủ Đức, ngày {sthoi[-2:]} tháng {sthoi[-4:-2]} năm {sthoi[:-4]}",
        Class="text-right m-0 p-px")
    zone <= lbox + rbox
    return zone


def tieude(tieude='BẢNG QUYẾT TOÁN GẮN MỚI ĐỒNG HỒ NƯỚC', sohoso='GM08123/20', sodot='202/20MP'):
    zone = html.DIV(
        Class="m-0 p-0 border-0 w-full"
    )
    row1 = html.DIV(
        Class="m-0 p-0 border-0 flex justify-between"
    )
    lbox = html.DIV(Class="w-3/12 flex")
    lbox <= html.SPAN(
        f"Số hồ sơ: ",
        Class="text-left m-0 p-px")
    lbox <= html.SPAN(
        f"{sohoso}",
        Class="uppercase text-center m-0 p-px font-bold flex-auto")
    mbox = html.DIV(
        f"{tieude}",
        Class="uppercase text-center m-0 p-px font-bold flex-1 tieude")
    rbox = html.DIV(Class="w-2/12 flex")
    rbox <= html.SPAN(
        f"ĐỢT: ",
        Class="text-left m-0 p-px")
    rbox <= html.SPAN(
        f"{sodot}",
        Class="uppercase text-center m-0 p-px font-bold flex-auto")
    row1 <= lbox + mbox + rbox
    zone <= row1
    return zone


def footer(baogiaid='20200721', tt='1'):
    '''
    <div id="quochuy" class="m-0 p-0 border border-blue-400 flex justify-between">
        <div id="quochuy:left" class="box-left">box left maqt01</div>
        <div id="quochuy:right" class="box-right">box right</div>
    </div>
    '''
    zone = html.DIV(
        Class="m-0 p-0 border-t border-black flex justify-between"
    )
    sthoi = f"{baogiaid}"
    lbox = html.DIV(
        f"DT-TT05 ({sthoi[-2:]}-{sthoi[-4:-2]}-{sthoi[:-4]})",
        Class="text-left m-0 p-px")
    rbox = html.DIV(
        f"TT-{tt:02}",
        Class="text-left m-0 p-px")
    zone <= lbox + rbox
    return zone


def creat_1_report(o1data=None):
    '''
    o1data = {
    "tttt":{"maqt": "pkh002","madvtc":"qlmltd"},
    "qtgt": {"ngaylap": '20200813', "hesoid": 20200721},
    "donvithicong": {"tendvtc": "ĐỘI QLML CẤP NƯỚC QUẬN THỦ ĐỨC", 'nguoiky': "Nguyễn Văn Tùng", "chucvu": "Đội trưởng"}}
    '''
    maqt = None
    try:
        maqt = o1data['tttt']['maqt']
    except:
        print('Err maqt=None')
        return
    khung = khungA4()
    trang = qtgt_trang1(maqt)
    zone = quochuy(o1data['donvithicong']['tendvtc'],
                   o1data['qtgt']['ngaylap'])
    trang <= zone
    zone = tieude(o1data['qtgt']['tieude'],
                  o1data['hoso']['sohoso'],
                  o1data['dot']['sodot'])
    trang <= zone
    zone = footer(o1data['qtgt']['baogiaid'],
                  o1data['qtgt']['tt'])
    trang <= zone
    khung <= trang
    docu <= khung


def creat_report():
    for id in odata:
        creat_1_report(odata[id])


creat_report()
