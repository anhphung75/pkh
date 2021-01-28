from browser import bin, document as tags
from browser.html import DIV, BUTTON, I, SPAN

container = tags["app"]
stim = ''
otim = {"2020": 0, "anh": 1}

# cloudtags = showtags + inp


def clear_otim(ev):
    otim = {}


def del_otim(k):
    if k in otim:
        del otim[k]


def show_cloudtags(ev):
    cloudtags = SPAN(id="cloudtags")

    button = BUTTON(
        I(Class="fa fa-trash"),
        id="clear_button",
        type="button",
        style=dict(color="red", paddingLeft="1em"),
        Class="down",
    )

    @bind("#clear_button", "click")
    def change(ev):
        display = document["menu"].style.display
        document["menu"].style.display = "block" if display == "none" else "none"
        print(ev.target.text, ev.x, ev.y)
    for k in otim:
        cloudtags <= BUTTON(k,
                            style=dict(color="red", paddingLeft="1em"),
                            Class="down")

    container.clear()
    container <= cloudtags
