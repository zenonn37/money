<template>
  <aside>
    <div class="logo-box">
      <div class="logo">MONEY</div>
      <div class="hambuger">
        <img src="../assets/menu.png" alt="menu" />
      </div>
    </div>

    <div class="dynamic-btn">
      <div class="btn">
        <i class="fas fa-piggy-bank"></i>
        <span>New Account</span>
      </div>
    </div>

    <ul class="menu">
      <li>
        <router-link to="/" tag="a">
          <i class="fas fa-chart-line"></i>
          <span>Dashboard</span>
        </router-link>
      </li>
      <li>
        <router-link to="/wallet" tag="a">
          <i class="fas fa-wallet"></i>
          <span>Wallet</span>
        </router-link>
      </li>
      <li>
        <router-link to="/account" tag="a">
          <i class="fas fa-user-circle"></i>
          <span>My Account</span>
        </router-link>
      </li>
      <li>
        <router-link to="/transactions" tag="a">
          <i class="far fa-money-bill-alt"></i>
          <span>Transactions</span>
        </router-link>
      </li>
      <li>
        <router-link to="/expenses" tag="a">
          <i class="fas fa-receipt"></i>
          <span>Expenses</span>
        </router-link>
      </li>
      <li>
        <router-link to="/settings" tag="a">
          <i class="fas fa-cog"></i>
          <span>Settings</span>
        </router-link>
      </li>
      <li>
        <router-link to="/help" tag="a">
          <i class="far fa-question-circle"></i>
          <span>Help</span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {};
</script>