import datetime
from browser import window, html, document as docu
import javascript as js

app = {
    "prog": 100,
    "nam": f"{datetime.date.today().year}",
    "plqt": "GMMP",
    "plgia": 'dutoan',
    "mabaogia": 20210101,
    "macpql": 20200827,
}
ga = {
    "tieude": {
        "cpxd": ['Tt', 'Mô tả công tác', 'Đvt', 'Số lượng', 'Giá vật liệu', 'Giá nhân công', 'Giá mtc', 'Tiền vật liệu', 'Tiền nhân công', 'Tiền mtc'],
        "cpvt": ['Tt', 'Mô tả vật tư', 'Đvt', 'Số lượng', 'Giá vật liệu', 'Giá nhân công', 'Giá mtc', 'Tiền vật liệu', 'Tiền nhân công', 'Tiền mtc'],
        "cpvl": ['Tt', 'Mô tả vật liệu', 'Đvt', 'Số lượng', 'Giá vật liệu', 'Giá nhân công', 'Giá mtc', 'Tiền vật liệu', 'Tiền nhân công', 'Tiền mtc'],
        "cptl": ['Tt', 'Kết cấu tái lập', 'Đvt', 'Số lượng oc', 'Số lượng on', 'Giá', 'Tiền ống cái', 'Tiền ống nhánh'],
        "chiphi": {
            "xd": ['Mo ta', 'Đvt', 'idutc'],
            "vt": ['Mo ta', 'Đvt', 'idutc'],
            "vl": ['Mo ta', 'Đvt', 'idutc'],
            "tl": ['Mo ta', 'Đvt', 'idutc']
        },
    },
    "nam": {
        '0': {"val": '', "show": '...'},
        '2021': {"val": '2021', "show": '2021'},
        '2020': {"val": '2020', "show": '2020'},
        '2019': {"val": '2019', "show": '2019'},
    },
}

# hov


def hov_tag(ev):
    tagid = ev.target.id
    print(f"tagid={tagid}")
    tag = tagid.split('__')
    if f"{tag[0][0]}" == '#':
        tag[0] = tag[0][1:]
    for el in docu.select(f".{tag[0]}"):
        el.classList.remove("mau")
    for el in docu.select(f".{tag[0]}"):
        el.classList.remove("hov")
    for el in docu.select(f".{tag[0]}.r{tag[1]}"):
        el.classList.add("hov")
    # for el in docu.select(f".{tag[0]}.c{tag[2]}"):
        # el.classList.add("mau")
    for el in docu.select(f"#{tagid}"):
        el.classList.add("mau")


class Web:
    def otim_nam(self):
        def app_val(ev=None):
            tag = ev.target
            app['nam'] = tag.dataset.id
            el = docu['app_nam']
            txt = f"{ga['nam'][app['nam']]['show']}"
            el.clear()
            el.innerHTML = txt

        def web_chon(ev=None):
            for el in docu.select('#chon'):
                el.remove()
            box = html.OL(id="chon", Class="l")
            i = 0
            for k in ga['nam']:
                txt = ga['nam'][k]['show']
                card = html.LI(
                    txt, id=f"nam__{i}__0", Class=f"l nam r{i} c0")
                card.attrs['data-id'] = k
                card.attrs['data-show'] = txt
                card.attrs['data-val'] = ga['nam'][k]['val']
                i += 1
                box <= card
            return box

        def web_vungchon(ev=None):
            zone = docu['app_nam']
            zone.clear()
            inp = html.INPUT(
                id="kiem",
                value=f"{ga['nam'][app['nam']]['show']}",
                type="search", Class="l w100",
                style=dict(height="1rem"))
            box = web_chon()
            zone <= inp+box
            for el in docu.select('#chon li'):
                el.bind("mouseenter", hov_tag)
                el.bind("click", app_val)
            #inp.bind("input", web_chon)
            inp.focus()

        el = docu['app_nam']
        el.clear()
        el.innerHTML = f"{ga['nam'][app['nam']]['show']}"
        el.bind("click", web_vungchon)


Web().otim_nam()
