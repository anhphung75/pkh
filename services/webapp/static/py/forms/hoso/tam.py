from browser import worker, document as docu
from browser.html import DIV, BUTTON, I, SPAN


# otim
def xoa_otim(k):
    if k in otim:
        del otim[k]
    k = "tim-"+k
    if k in docu:
        docu[k].remove()


def moi_otim(k):
    if (k in otim) or (len(k) == 0):
        return
    otim[k] = 1
    btn = BUTTON(
        id="tim-"+k,
        type="button",
        style=dict(color="red", paddingLeft="1em"),
        Class="l",
    )
    btn.text = f"{k} x"
    print(f'btn attrs={btn.attrs}')
    btn.bind("click", xoa_otim(k))
    zone = docu["view-otim"]
    zone <= btn
    


def clear_otim():
    docu["view-otim"].clear()
    moi_otim(docu["namlamviec"].value)


def namlamviec():
    def doinam(ev):
        namcu = ev.target.oldValue
        nammoi = ev.target.value
        if namcu == nammoi:
            return
        if namcu in otim:
            xoa_otim(namcu)
        moi_otim(ev.target.value)
    inp = docu["namlamviec"]
    inp.bind("change", doinam)


def stim():
    def key_tags(ev):
        if ev.keyCode == 45:  # insert
            moi_otim(ev.target.value)
            ev.target.value = ""
        elif ev.keyCode == 13:  # enter
            otim[ev.target.value] = 1
        docu["info"].text = f"{otim}"
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
    docu["info"].text = f"w={ev.data} ds_tim={otim}"


otim = {}
namlamviec()
stim()
docu["clear-otim"].bind("click",clear_otim())
btns = docu.select("#view-otim button")
print(f'btns={btns}')
for btn in btns:
    print(f'btn id={btn.attrs["id"]} Id={btn.attrs["Id"]}')
    btn.bind("click", xoa_otim(btn.attrs["id"]))

w = worker.Worker("base:xac")
w.bind("message", nhan)
