<template>
  <div class="list-table">
    <div class="sort-header">
      <div @click="sortDates()">
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
        <li v-for="a in data" :key="a.id" class="dates">{{a.date | day}}</li>
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
    <div class="paginate">
      <paginate
        :page-count="meta"
        :click-handler="onPage"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'paginate-child'"
      ></paginate>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListTable",
  props: ["name", "data", "type"],
  data() {
    return {
      pages: 1
    };
  },
  computed: {
    links() {
      return this.$store.getters.GET_LINKS;
    },
    meta() {
      return parseInt(this.$store.getters.GET_META.last_page);
    }
  },
  watch: {},
  methods: {
    sortDates() {
      this.$store.dispatch("sortDates");
    },
    onPage(page) {
      const data = {
        id: this.$route.params.id,
        page: page
      };
      console.log(page);
      this.$store.dispatch("PAGE_TRANSACTIONS", data);
    },
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

