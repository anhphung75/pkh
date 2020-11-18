from browser import worker, document as docu
from browser.html import BUTTON

def info_test():
    docu["info"].text = f"{otim}"
# otim

def view_otim():
    def xoa_otim(ev):
        try:
            k = ev.target.attrs["data-stim"]
            if k in otim:
                del otim[k]
            ev.target.remove()
            info_test()
        except:
            pass

    def moi_otim(k):
        if len(k) < 1:
            return
        btn = BUTTON(
            f"{k} x".lower(),
            data_stim=k,
            type="button",
            style={"color": "red", "paddingLeft": "1em"},
            Class="l b0",
        )
        btn.bind("click", xoa_otim)
        return btn
    
    zone = docu["view-otim"]
    zone.clear()
    for k in otim:
        btn = moi_otim(k)
        if btn:
            zone <= btn
    info_test()

def clear_otim(ev=None):
    curnam=docu["namlamviec"].attrs["data-nam"]
    global otim
    otim={curnam:1}
    print(f'clear otim curnam={curnam}')
    view_otim()


def namlamviec():
    inp = docu["namlamviec"]
    curnam=str(inp.attrs["data-nam"])
    otim[curnam]=1
    def doinam(ev):
        namcu = str(inp.attrs["data-nam"])
        nammoi = str(ev.target.value)
        if namcu == nammoi:
            return
        inp.attrs["data-nam"]=nammoi
        del otim[namcu]
        otim[nammoi]=1
        view_otim()
    inp.bind("change", doinam)
    view_otim()


def stim():
    def key_tags(ev):
        if ev.keyCode == 45:  # insert
            k=ev.target.value
            otim[k.lower()]=1
            ev.target.value = ""
        elif ev.keyCode == 13:  # enter
            k=ev.target.value
            otim[k.lower()]=1
        view_otim()
    inp = docu["stim"]
    inp.bind("keydown", key_tags)
    inp.bind("input", giao)


def giao(ev):
    """Called when the value in one of the input fields changes."""
    # Send a message (here a list of values) to the worker
    print(f"giao inp={ev.target.value}")
    w.send(ev.target.value)


def nhan(ev):
    """Handles the messages sent by the worker."""
    print(f"nhan {ev.data}")
    info_test()


otim = {}
namlamviec()
stim()
docu["clear-otim"].bind("click",clear_otim)
info_test()
w = worker.Worker("hoso:hon")
w.bind("message", nhan)
