<template>
  <div class="list-table">
    <div class="sort-header">
      <div>
        Date
        <span>&#9660</span>
      </div>
      <div>
        {{name}}
        <span>&#9660</span>
      </div>
      <div>Type</div>
      <div>
        Balance
        <span>&#9660</span>
      </div>
    </div>
    <div class="list-elements">
      <ul>
        <li v-for="a in data" :key="a.id">{{a.created_at | day}}</li>
      </ul>

      <ul v-if="type">
        <li v-for="a in data" :key="a.id">
          <router-link :to="`/transactions/${a.id}`">{{a.name}}</router-link>
        </li>
      </ul>
      <ul v-else>
        <li v-for="a in data" :key="a.id">{{a.name}}</li>
      </ul>

      <ul>
        <li v-for="a in data" :key="a.id">{{a.type}}</li>
      </ul>

      <ul v-if="type">
        <li v-for="a in data" :key="a.id">{{a.balance | currency}}</li>
      </ul>
      <ul v-else>
        <li v-for="a in data" :key="a.id">{{a.amount | currency}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListTable",
  props: ["name", "data", "type"]
};
</script>

