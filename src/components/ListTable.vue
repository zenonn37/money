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
      <div>Edit</div>
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
        <li
          v-for="a in data"
          :key="a.id"
          :class="[a.type === 'Deposit' ? 'credit' : 'debit' ]"
        >{{a.balance | currency}}</li>
      </ul>
      <ul v-else>
        <li
          v-for="a in data"
          :key="a.id"
          :class="[a.type === 'Deposit' ? 'credit' : 'debit' ]"
        >{{a.amount | currency}}</li>
      </ul>

      <ul>
        <li v-for="a in data" :key="a.id" class="cursors">
          <div class="edit">
            <i class="far fa-edit" @click="onEdit(a.id)"></i>
          </div>
          <div class="delete">
            <i class="far fa-trash-alt" @click="onDelete(a.id)"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListTable",
  props: ["name", "data", "type"],
  methods: {
    onEdit(id) {
      const acct = this.$route.params.id;
      this.$router.push(`/edit/${acct}/${id}`);
    },
    onDelete(trans) {
      //call delete dispatch
      console.log(trans);
      const id = parseInt(trans);
      this.$store.dispatch("DELETE_TRANSACTION", id);
    }
  }
};
</script>

