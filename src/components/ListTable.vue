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
        <li>04.01.2019</li>
        <li>04.01.2019</li>
        <li>04.01.2019</li>
        <li>04.01.2019</li>
      </ul>

      <ul>
        <li>Bank of America</li>
        <li>Bank of America</li>
        <li>Ally Bank</li>
        <li>Northeast Credit Union</li>
      </ul>
      <ul>
        <li>Checking</li>
        <li>Savings</li>
        <li>CD</li>
        <li>Car Loans</li>
      </ul>

      <ul>
        <li>2832.00</li>
        <li>1005.00</li>
        <li>18,000</li>
        <li>25,568</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name"]
};
</script>

