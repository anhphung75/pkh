// Khởi tạo một số hằng sử dụng nhiều lần
const dbName = "myDB";
const collection = "notes";

// Mount Vue component vào #app
new Vue({
  el: "#app",
  data: {
    db: null,
    notes: [],
    futureNote: null
  },
  mounted() {
    // Kết nối DB
    var request = window.indexedDB.open(dbName, 1);

    // Nếu thành công. Tiến hành lấy notes về
    request.onsuccess = event => {
      this.db = request.result;
      this.getNotes();
    };

    // Kết nối lần đầu. Tiến hành khởi tạo objectStore với tên collection
    request.onupgradeneeded = event => {
      this.db = event.target.result;
      this.db.createObjectStore(collection, {
        autoIncrement: true
      });
    };
  },
  methods: {
    // Thêm note mới
    addNote() {
      // Tạo transaction với mode readwrite
      var request = this.db
        .transaction(collection, "readwrite")
        .objectStore(collection)
        .add({
          content: this.futureNote,
          completed: false
        });
      this.futureNote = null;
      request.onsuccess = event => {
        // Lấy lại notes sau khi đã thêm giá trị mới
        this.getNotes();
      };
    },
    showNote(key) {
      var objectStore = this.db.transaction(collection).objectStore(collection);
      var request = objectStore.get(key);

      request.onsuccess = function(event) {
        // Giá trị value trong DB chính là event.target.result
        alert(
          `Note detail: ${event.target.result.content}. Completed: ${event
            .target.result.completed}`
        );
      };
    },
    markComplete(key) {
      var objectStore = this.db
        .transaction(collection, "readwrite")
        .objectStore(collection);
      var request = objectStore.get(key);

      request.onsuccess = event => {
        var data = event.target.result;
        data.completed = true;

        // Update dữ liệu mới
        var requestUpdate = objectStore.put(data, key);

        // Lấy dữ liệu mới sau khi update
        requestUpdate.onsuccess = event => {
          this.getNotes();
        };
      };
    },
    getNotes() {
      this.notes = [];
      var objectStore = this.db.transaction(collection).objectStore(collection);

      // Sử dụng cursor để lấy lần lượt dữ liệu
      objectStore.openCursor().onsuccess = event => {
        var cursor = event.target.result;

        if (cursor) {
          // Nếu có cursor. Push dữ liệu và tiếp tục với record tiếp theo
          this.notes.push({
            id: cursor.key,
            value: cursor.value
          });
          cursor.continue();
        }
      };
    },
    // Xóa dữ liệu
    deleteNote(key) {
      var request = this.db
        .transaction(collection, "readwrite")
        .objectStore(collection)
        .delete(key);

      request.onsuccess = event => {
        this.getNotes();
      };
    }
  }
});
