var div = {
  inheritAttrs: true,
  props: ['class'],
  template: `
  <div :class='class'>
    <slot>div rỗng</slot>
  </div>
  `
}

export { div }