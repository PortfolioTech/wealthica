<script setup>
</script>

<template>
  <td class="holding-company-cell">
    <div class="holding-company-wraper">
      <div class="security-logo">
        <img :src=getLogoPath() alt="SHOP" class="security-logo-img ">
      </div>
      <div class="security-data">
        <div class="security-symbol">{{ getSecuritySymbol() }}</div>
        <!--<div class="security-name">{{ getSecurityName() }}</div>-->
      </div>
    </div>
  </td>
</template>

<script>
export default {
  props: {
    security_market: {
      type: String,
      default: "",
    },
    security_symbol: {
      type: String,
      default: "",
    },
    security_name: {
      type: String,
      default: "",
    }
  },
  methods: {
    getSecuritySymbol() {
      if (this.security_symbol == "REALCASH") {
        return "CASH"
      }
      return this.security_symbol;
    },
    getSecurityName() {
      if (this.security_symbol == "REALCASH") {
        return "CASH BALANCE"
      }
      return this.security_name;
    },
    getLogoPath() {
      if (this.security_symbol == "REALCASH") {
        return "/img/cash.png";
      }
      return "https://data.wealthica.com/api/securities/" + this.security_market.substr(0, 2) + ":" + this.security_symbol + "/logo";
    }
  }
}
</script>

<style scoped>
.holding-company-cell {
  align-items: center;
  text-align: left !important;
}

.holding-company-wraper {
  display: inline-flex;
  padding-right: 10px;
  align-items: center;
}

.security-logo-img {
  width: 26px;
  height: 26px;
  border-radius: 33%;
  display: block;
  -o-object-fit: contain;
  object-fit: contain;
  -o-object-position: center;
  object-position: center;
}

.security-data {
  padding-left: 10px;
  text-align: left;
}

.security-symbol {
  font-size: 12px;
  font-weight: bold;
  line-height: 13px;
}

.security-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  line-height: 13px;
  color: #a5a7a8;
}
</style>