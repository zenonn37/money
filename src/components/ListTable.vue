<template>
  <div class="list-table">
    <div class="sort-header">
      <div class="cursors" @click="sortDates()">
        Date
        <span>&#9660</span>
      </div>
      <div>
        {{name}}
        <span>&#9660</span>
      </div>

      <div>Type</div>
      <div class="cursors" @click="sortAmount()">
        Balance
        <span>&#9660</span>
      </div>
      <div>
        <div>Edit/Delete</div>
      </div>
    </div>
    <div class="mobile-container">
      <div class="mobile-parent" v-for="mobile in data" :key="mobile.id">
        <div class="mobile-left">
          <div class="mobile-dates">
            <h2>{{mobile.date | day_short}}</h2>
            <h5>{{mobile.date | month_short}}</h5>
          </div>
        </div>
        <div class="mobile-title">
          <h2>{{mobile.name}}</h2>
          <h5>{{mobile.type}}</h5>
        </div>

        <div class="mobile-amount">
          <h2
            v-if="type"
            :class="[mobile.balance > 0 ?  'credit' : 'debit'  ]"
          >{{mobile.balance | currency('$')}}</h2>
          <h2
            v-else
            :class="[mobile.type === 'Deposit' ? 'credit' : 'debit' ]"
          >{{mobile.amount | currency('$')}}</h2>
          <div class="mobile-functions">
            <div class="edit" v-if="route === 'account'">
              <i class="far fa-edit" @click="onEditAccount(mobile.id)"></i>
            </div>
            <div class="edit" v-else>
              <i class="far fa-edit" @click="onEdit(mobile.id)"></i>
            </div>
            <div class="delete" v-if="route === 'account'">
              <i class="far fa-trash-alt" @click="onDeleteAccount(mobile.id)"></i>
            </div>
            <div class="delete" v-else>
              <i class="far fa-trash-alt" @click="onDelete(mobile.id)"></i>
            </div>
          </div>
        </div>

        <div v-if="data.length === 0">Add an Account to get started!</div>
      </div>
    </div>

    <div class="list-elements">
      <div v-if="data.length === 0">Add an Account to get started!</div>

      <ul>
        <li v-for="a in  data" :key="a.id" class="dates">{{a.date | day}}</li>
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
          :class="[a.balance > 0 ?  'credit' : 'debit'  ]"
        >{{a.balance | currency('$')}}</li>
      </ul>
      <ul v-else>
        <li
          v-for="a in data"
          :key="a.id"
          :class="[a.type === 'Deposit' ? 'credit' : 'debit' ]"
        >{{a.amount | currency('$')}}</li>
      </ul>

      <ul>
        <li v-for="a in data" :key="a.id" class="cursors">
          <div class="edit" v-if="route === 'account'">
            <i class="far fa-edit" @click="onEditAccount(a.id)"></i>
          </div>
          <div class="edit" v-else>
            <i class="far fa-edit" @click="onEdit(a.id)"></i>
          </div>
          <div class="delete" v-if="route === 'account'">
            <i class="far fa-trash-alt" @click="onDeleteAccount(a.id)"></i>
          </div>
          <div class="delete" v-else>
            <i class="far fa-trash-alt" @click="onDelete(a.id)"></i>
          </div>
        </li>
      </ul>
    </div>
    <div class="paginate" v-if="!type">
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
  props: ["name", "data", "type", "acct_id"],
  data() {
    return {
      pages: 1,
      order: false,
      route: this.$route.name
    };
  },
  computed: {
    orderDate() {
      return this.order ? this.transDESC : this.transASC;
    },

    transASC() {
      const trans = _.sortBy(this.data, [
        function(value) {
          return value.date;
        }
      ]);
      return trans;
    },
    transDESC() {
      const trans = _.sortBy(this.data, [
        function(value) {
          return value.date * -1;
        }
      ]);
      return trans;
    },

    links() {
      return this.$store.getters["transaction/GET_LINKS"];
    },
    meta() {
      return parseInt(this.$store.getters["transactions/GET_META"].last_page);
    }
  },
  watch: {},
  methods: {
    sortDates() {
      console.log("clicked");

      this.order = !this.order;

      this.$store.dispatch("transactions/sortAmounts");

      //this.$store.dispatch("sortDates");
    },
    sortAmount() {
      this.$store.dispatch("transactions/sortAmounts");
    },
    onPage(page) {
      const data = {
        id: this.$route.params.id,
        page: page
      };
      console.log(page);
      this.$store.dispatch("transactions/PAGE_TRANSACTIONS", data);
    },
    onEdit(id) {
      console.log("transaction");

      const acct = this.$route.params.id;

      this.$router.push(`/edit/${acct}/${id}`);
    },
    onEditAccount(id) {
      console.log("accounts");

      const acct = this.$route.params.id;

      this.$router.push(`/edit/${id}`);
    },
    onDelete(trans) {
      //call delete dispatch

      const id = parseInt(trans);

      const ids = {
        acct_id: this.acct_id,
        id: id
      };
      this.$store.dispatch("transactions/DELETE_TRANSACTION", ids);
    },
    onDeleteAccount(acct) {
      //call delete dispatch

      const id = parseInt(acct);
      this.$store.dispatch("account/DELETE_ACCOUNT", id);
    }
  }
};
</script>

