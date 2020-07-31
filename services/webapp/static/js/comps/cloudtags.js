export default {
  data() {
    return {
      stim: '',
      tags: ['anh', '2020'],
    }
  },
  methods: {
    emitTags() {
      let s = this.stim.trim()
      s = s.tolowerCase()
      if (s.length === 0 || this.tags.indexOf(s) === -1) {
        return
      }
      this.$emit('tags', [...this.tags, s])
    },
    addTag() {
      let s = this.stim.trim();
      if (s.length === 0 || this.tags.indexOf(s) === -1) {
        return
      }
      //this.$emit('input', [...this.tags, s])
      this.tags = [...this.tags, s]
      this.stim = ''

    },
    delTag(tag) {
      this.tags.filter(t => t !== tag)
      //this.$emit('input', this.tags.filter(t => t !== tag))
    },
    clearTags() {
      this.tags = []
    },
    keyupTag(e) {
      console.log("event.key=", e.key, " event.keyCode=", e.keyCode, " event.code=", e.code);
      var i;
      var lcode = ['KeyA', 'KeyB', 'KeyC', 'KeyD', 'KeyE', 'KeyF', 'KeyG', 'KeyH', 'KeyI', 'KeyJ',
        'KeyK', 'KeyL', 'KeyM', 'KeyN', 'KeyO', 'KeyP', 'KeyQ', 'KeyR', 'KeyS', 'KeyT',
        'KeyU', 'KeyV', 'KeyW', 'KeyX', 'KeyY', 'KeyZ',
        'Equal', 'Comma', 'Minus', 'Period', 'Quote', 'Semicolon', 'BracketLeft', 'BracketRight', 'Slash',
        'Digit0', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9',
        'Numpad0', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4', 'Numpad5', 'Numpad6', 'Numpad7', 'Numpad8', 'Numpad9',
        'NumpadAdd', 'NumpadDecimal', 'NumpadComma', 'NumpadDevide', 'NumpadMultiply', 'NumpadStar', 'NumpadSubtract',
        'Backspace', 'Delete',]
      if (lcode.indexOf(e.code) > -1) {
        this.stim = this.stim + event.key;
        console.log("stim=", this.stim, " tags=", this.tags);
        this.emitTags();
      }
      if (e.code === 'Insert' && this.stim.length > 0) {
        this.addTag()
      };
      if (e.code === 'Enter' && this.stim.length > 0) {
        this.addTag()
      };
      if (e.code === 'ArrowDown') {
        return
      };
      if (e.code === 'ArrowUp') {
        return
      };
    },
  },
  computed: {

  },
  template: `
  <div class="flex bg-gray-200">
    <button type="button" @click="clearTags">
      <i class="fa fa-trash"></i>
    </button>
    <span class="tags-input-tag" v-for="tag in tags">
      <span>{{tag}}</span>
      <button type="button" @click="delTag(tag)">&times;</button>
    </span>
    <input class="flex-auto" placeholder="Tìm ... (không phân biệt chữ hoa hay thường)"
      @keyup="keyupTag">

  </div>
  `
}