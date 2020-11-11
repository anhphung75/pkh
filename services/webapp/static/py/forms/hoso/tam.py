from browser import bind, document, worker

w = worker.Worker("base:xac")

def giao(ev):
    """Called when the value in one of the input fields changes."""
    # Send a message (here a list of values) to the worker
    print(f"giao inp={ev.target.value}")
    w.send(ev.target.value)

def nhan(ev):
    """Handles the messages sent by the worker."""
    print(f"nhan {ev.data}")
    document["info"].text = f"w={ev.data} ds_tim={ds_tim}"

def otim(ev):
    if ev.keyCode==45: #insert
        ds_tim[ev.target.value]=1
        ev.target.value=""
    elif ev.keyCode==13: #enter
        ds_tim[ev.target.value]=1
    document["info"].text = f"{ds_tim}"
ds_tim={}
inp=document["stim"]
inp.bind("input", giao)
inp.bind("keydown", otim)
w.bind("message", nhan)

