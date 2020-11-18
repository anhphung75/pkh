from browser import self
from browser import window, html, document as docu


def create_db(*args):
    # The database did not previously exist, so create object stores and indexes.
    print('create db')
    db = request.result
    store = db.createObjectStore("books", {"keyPath": "isbn"})
    titleIndex = store.createIndex("by_title", "title", {"unique": True})
    authorIndex = store.createIndex("by_author", "author")

    # Populate with initial data.
    store.put({"title": "Quarry Memories", "author": "Fred", "isbn": 123456})
    store.put({"title": "Water Buffaloes", "author": "Fred", "isbn": 234567})
    store.put({"title": "Bedrock Nights", "author": "Barney", "isbn": 345678})


def btn_click(ev):
    """Generic callback function for buttons
    """
    # The text on the button indicates the action: Add, Edit, Update or Delete
    action = ev.target.text

    # table row of the clicked button
    row = ev.target.parent.parent

    if action == "Delete":
        db = request.result
        tx = db.transaction("books", "readwrite")
        store = tx.objectStore("books")
        cursor = store.delete(row.key)

        # when record is deleted, update table
        cursor.bind("success", show)

    elif action == "Add":
        values = [entry.value for entry in row.get(selector="INPUT")]
        data = dict(zip(['title', 'author', 'isbn'], values))
        db = request.result
        tx = db.transaction("books", "readwrite")
        store = tx.objectStore("books")
        if action == "Add":
            cursor = store.put(data)
        else:
            cursor = store.put(data, row.key)

        # when record is added, update table
        cursor.bind("success", show)

    elif action == "Edit":
        # Replace cells for "title" and "author" by INPUT fields
        # Since isbn is he keyPath it can't be edited
        cells = row.get(selector="TD")
        for cell in cells[:-2]:
            value = cell.text
            cell.clear()
            cell <= html.INPUT(value=value)

        # Replace buttons "Edit" and "Delete" by button "Update"
        cells[-1].clear()
        update_btn = html.BUTTON("Update")
        cells[-1] <= update_btn

        # Bind its "click" event
        update_btn.bind("click", btn_click)

    elif action == "Update":
        values = [entry.value for entry in row.select("INPUT")]
        data = dict(zip(["title", "author"], values))
        data['isbn'] = row.key  # required for the "store.put" method below

        db = request.result
        tx = db.transaction("books", "readwrite")
        store = tx.objectStore("books")
        cursor = store.put(data)

        # When record is added, update table
        cursor.bind("success", show)


def show(ev):
    """Show the contents of store "books" in a table"""
    db = request.result
    tx = db.transaction("books", "readonly")
    store = tx.objectStore("books")
    cursor = store.openCursor()

    # clear table
    docu["table"].clear()

    # headers
    t = html.TABLE()
    docu["table"] <= t

    t <= html.TR(html.TH(x) for x in ["Title", "Author", "ISBN", "Actions"])

    def add_row(ev):
        """Add a row to the table for each iteration on cursor
        When cursor in empty, add a line for new record insertion
        """
        res = ev.target.result
        if res:
            v = res.value
            row = html.TR()
            row <= (html.TD(getattr(v, key))
                    for key in ["title", "author", "isbn"])
            row <= html.TD(html.BUTTON("Edit") +
                           html.BUTTON("Delete"))
            row.key = res.key
            t <= row
            getattr(res, "continue")()
        else:
            # add empty row
            row = html.TR()
            row <= (html.TD(html.INPUT(name="new_%s" % key))
                    for key in ["title", "author", "isbn"])
            row <= html.TD(html.BUTTON("Add"))
            t <= row
            # bind all buttons
            for btn in t.get(selector="BUTTON"):
                btn.bind("click", btn_click)

    cursor.bind("success", add_row)


def load_hoso(ev):
    """Handle a message sent by the main script.
    evt.data is the message body.
    """
    try:
        request = IDB.open("library")

        # If database doesn't exist, create it
        request.bind("upgradeneeded", create_db)

        # Else print a table with all elements in table "books"
        request.bind("success", show)

        result = int(evt.data[0]) * int(evt.data[1])
        workerResult = f'Result: {result}'
        # Send a message to the main script.
        # In the main script, it will be handled by the function bound to
        # the event "message" for the worker.
        self.send(workerResult)
    except ValueError:
        self.send('Please write two numbers')


IDB = window.indexedDB
self.bind("message", load_hoso)
