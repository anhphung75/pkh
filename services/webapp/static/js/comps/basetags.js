var div_tag = {
  template: `
  <div v-bind="$attrs" v-on="$listeners">
    <slot>div rỗng</slot>
  </div>
  `
};

export { div_tag };