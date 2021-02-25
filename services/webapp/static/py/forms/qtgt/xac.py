import datetime
from browser import html, document as docu

app = {
    "prog": 100,
    "nam": datetime.date.today().year,
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
    def __init__(self):
        self.tagid = ''
        self.otim_nam()

    def clear_combobox(self):
        print("clear combobox")
        for el in docu.select('inbox'):
            el.remove()
        for el in docu.select('outbox'):
            el.remove()

    def otim_nam(self):
        def get_val(ev):
            tag = ev.target
            app['nam'] = tag.dataset.id
            docu['app_nam'].text = app['nam']
            for el in docu.select('li'):
                el.unbind("mouseenter", hov_tag)
            Web.clear_combobox(self)

        def combobox(ev):
            chon = docu['app_nam']
            chon.text = ''
            inp = html.INPUT(
                value=f"{app['nam']}", id="inbox",
                type="search", Class="l w100",
                style=dict(height="1rem"))
            box = html.OL(id="outbox", Class="l")
            box.clear()
            i = 0
            for k in ga['nam']:
                txt = ga['nam'][k]['show']
                _li = html.LI(txt, id=f"nam__{i}__0", Class=f"l nam r{i} c0")
                _li.attrs['data-id'] = k
                _li.attrs['data-show'] = txt
                _li.attrs['data-val'] = ga['nam'][k]['val']
                i += 1
                box <= _li
                _li.bind("click", get_val)
            chon <= inp+box
            for el in docu.select('li'):
                el.bind("mouseenter", hov_tag)
            inp.focus()

        zone = docu.select("#qtgt .grid.otim")[0]
        tag = html.DIV("Năm", Class="c")
        inp = html.DIV(f"{app['nam']}", id="app_nam", Class="l")
        zone <= tag + inp
        inp.bind("click", combobox)


Web()
