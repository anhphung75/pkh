from browser import bind, document


@bind("#logo", "click")
def change(ev):
    display = document["menu"].style.display
    document["menu"].style.display = "block" if display == "none" else "none"
    print(ev.target.text, ev.x, ev.y)
