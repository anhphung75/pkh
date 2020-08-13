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


def khungA4():
    zone = html.DIV(
        Class="khungA4 flex m-0 p-0 bg-transparent border border-black",
    )
    return zone


def qtgt_trang1(maqt='pkh002'):
    zone = html.DIV(
        id=f"trang1:{maqt}",
        Class="trangin flex-1 p-0 bg-white border border-red-600 flex flex-col",
    )
    return zone


def quochuy(madvtc='qlmltd', ngaylap=datetime.date.today()):
    '''
    <div id="quochuy" class="m-0 p-0 border border-blue-400 flex justify-between">
        <div id="quochuy:left" class="box-left">box left maqt01</div>
        <div id="quochuy:right" class="box-right">box right</div>
    </div>
    '''
    # data
    if madvtc == "qlmltd":
        tendonvi = f"ĐỘI QLML CẤP NƯỚC QUẬN THỦ ĐỨC"
    elif madvtc == "qlmlq2":
        tendonvi = f"ĐỘI QLML CẤP NƯỚC QUẬN 2"
    elif madvtc == "qlmlq9":
        tendonvi = f"ĐỘI QLML CẤP NƯỚC QUẬN 9"
    else:
        tendonvi = f"PHÒNG KẾ HOẠCH - VẬT TƯ - TỔNG HỢP"
    sngaylap = f"Thủ Đức, ngày {ngaylap:%d} tháng {ngaylap:%m} năm {ngaylap:%Y}"

    # design
    zone = html.DIV(
        Class="m-0 p-0 border-0 flex justify-between"
    )
    lbox = html.DIV()
    lbox <= html.DIV(
        "CÔNG TY CỔ PHẦN CẤP NƯỚC THỦ ĐỨC",
        Class="uppercase text-center m-0 p-px font-bold",
        style={'fontSize': '9pt'})
    lbox <= html.DIV(
        f"{tendonvi}",
        Class="uppercase text-center m-0 p-px font-bold",
        style={'fontSize': '9pt'})
    lbox <= html.DIV(
        "---------oOo---------",
        Class="text-center text-xs m-0 p-px")
    lbox <= html.DIV(
        "Số tài khoản: 102010000183907",
        Class="text-center m-0 p-px",
        style={'fontSize': '8pt'})
    lbox <= html.DIV(
        "Tại: Ngân hàng Công Thương Việt Nam - Cn Đông Sài Gòn",
        Class="text-center m-0 p-px",
        style={'fontSize': '8pt'})

    rbox = html.DIV()
    rbox <= html.DIV(
        "CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM",
        Class="uppercase text-center m-0 p-px font-bold",
        style={'fontSize': '9pt'})
    rbox <= html.DIV(
        "Độc lập - Tự do - Hạnh phúc",
        Class="text-center m-0 p-px font-bold",
        style={'fontSize': '9pt'})
    rbox <= html.DIV(
        "---------oOo---------",
        Class="text-center text-xs m-0 p-px")
    rbox <= html.DIV(
        f"{sngaylap}",
        Class="text-right m-px p-px")

    zone <= lbox + rbox
    return zone


def creat_report(maqt='pkh002'):
    # data
    # loadqt(maqt)

    # design
    # tao trang1
    khung = khungA4()
    trang = qtgt_trang1(maqt)
    zone = quochuy('qlmltd')
    trang <= zone
    khung <= trang
    docu <= khung


creat_report('2020')
