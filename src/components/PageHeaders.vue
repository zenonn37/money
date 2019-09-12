<template>
  <div class="page-header">
    <div class="page-title">{{title}}</div>
    <div class="page-menu">
      <ul>
        <li>
          <a href="#">{{menu1}}</a>
        </li>
        <li>
          <a href="#">{{menu2}}</a>
        </li>
        <li>
          <a href="#">{{menu3}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "menu1", "menu2", "menu3"],
  data() {
    return {};
  }
};
</script>

