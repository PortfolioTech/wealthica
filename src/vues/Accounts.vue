<script setup>
import Addon from '@wealthica/wealthica.js/src/addon.js';
import { CustomAccountsFilter } from '@/js/data.js';
import MoneyCell from '@/vues/cells/MoneyCell.vue';
import PercentCell from '@/vues/cells/PercentCell.vue';
import CompanyCell from '@/vues/cells/CompanyCell.vue';
import '@/js/format.js';
import '@/css/main.css'
</script>

<template>
  <div v-if="accounts && accounts.length">
    <table class="accounts-listing">
      <thead>
        <tr>
          <th colspan="4" class="justify-left">Accounts</th>
          <th>CAD</th>
          <th>USD</th>
          <th>Total CAD</th>
        </tr>
      </thead>
      <tbody v-for="row in accounts" :key="row.account_number">
        <tr>
          <td>
            <img :src="row.institution_icon" title="" alt="" width="20" height="20" class="institution-icon">
          </td>
          <td class="toggle-cell">
            <div>{{ row.name }}</div>
            <div class="toggle-arrow">
              <img src="https://app.wealthica.com/img/arrow_down.f6ca09b2.svg" width="13" height="8"
                :class="{ expanded: row.isExpanded }" @click="row.isExpanded = !row.isExpanded">
            </div>
          </td>
          <td class="justify-left">{{ row.account_number }}</td>
          <td class="justify-left">{{ row.type }}</td>
          <MoneyCell :value="row.value_CAD" />
          <MoneyCell :value="row.value_USD" />
          <MoneyCell :value="row.value_TotalCAD" />
        </tr>
        <template v-if=row.isExpanded v-for="investment_row in row.investments" :key="investment_row.data._id">
          <tr class="investment-row-header">
            <td></td>
            <td class="toggle-cell">
              <div> {{ investment_row.data.name + " (" + investment_row.data.currency.toUpperCase() + ")" }}</div>
              <div class="toggle-arrow">
                <img src="https://app.wealthica.com/img/arrow_down.f6ca09b2.svg" width="13" height="8"
                  :class="{ expanded: investment_row.isExpanded }"
                  @click="investment_row.isExpanded = !investment_row.isExpanded">
              </div>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <!--<MoneyCell :value="investment_row.data.currency == 'cad' ? investment_row.data.currency_value : 0" />-->
            <!--<MoneyCell :value="investment_row.data.currency == 'usd' ? investment_row.data.currency_value : 0" />-->
            <MoneyCell :value="investment_row.data.value" />
          </tr>
          <tr v-if=investment_row.isExpanded>
            <td colspan="7">
              <table class="holdings-listing">
                <thead>
                  <tr>
                    <th colspan="2"></th>
                    <th></th>
                    <th colspan="2">
                      <div>
                        <div class="grouped-header">Book</div>
                      </div>
                    </th>
                    <th colspan="2">
                      <div>
                        <div class="grouped-header">Daily</div>
                      </div>
                    </th>
                    <th colspan="2">
                      <div>
                        <div class="grouped-header">Overall</div>
                      </div>
                    </th>
                    <th colspan="2">
                      <div>
                        <div class="grouped-header">52 weeks</div>
                      </div>
                    </th>
                    <th colspan="2">
                      <div>
                        <div class="grouped-header">Market</div>
                      </div>
                    </th>
                    <th colspan="2">
                      <div>
                        <div class="grouped-header">Market CAD</div>
                      </div>
                    </th>
                  </tr>
                  <tr class="separator-line">
                    <th class="justify-left">Company </th>
                    <th class="justify-center">Qty</th>
                    <th>Portfolio</th>
                    <th>Price</th>
                    <th>Value</th>
                    <th>Gain %</th>
                    <th>Gain $</th>
                    <th>Gain %</th>
                    <th>Gain $</th>
                    <th>low</th>
                    <th>high</th>
                    <th>Price</th>
                    <th>Value</th>
                    <th>Price</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody
                  v-for="holding_row in holdings.filter(function (holding) { return holding.investment_id === investment_row.data._id })"
                  :key="holding_row.investment_id">
                  <tr v-if=!isCashRow(holding_row)>
                    <CompanyCell :security_market=holding_row.currency :security_symbol=holding_row.symbol
                      :security_name=holding_row.name />
                    <td class="justify-center" :isCashBalance=isCashRow(holding_row)>
                      {{ holding_row.quantity }}
                    </td>
                    <PercentCell :value="holding_row.weight" :colored=false />
                    <MoneyCell :value="holding_row.book_value / holding_row.quantity" :colored=false />
                    <MoneyCell :value="holding_row.book_value" :colored=false />
                    <PercentCell :value="0.00" :highlighted=true :arrow=true />
                    <MoneyCell :value="0.00" :highlighted=true />
                    <PercentCell :value="holding_row.overall_gain_percent" :highlighted=true :arrow=true />
                    <MoneyCell :value="holding_row.overall_gain_currency_amount" :highlighted=true />
                    <MoneyCell :value="holding_row.low_price" :colored=false />
                    <MoneyCell :value="holding_row.high_price" :colored=false />
                    <MoneyCell :value="holding_row.last_currency_price" />
                    <MoneyCell :value="holding_row.market_currency_value" />
                    <MoneyCell :value="holding_row.last_price" />
                    <MoneyCell :value="holding_row.market_value" />
                  </tr>
                  <tr v-if=isCashRow(holding_row)>
                    <CompanyCell :security_market=holding_row.currency :security_symbol=holding_row.symbol
                      :security_name=holding_row.name />
                    <td></td>
                    <PercentCell :value="holding_row.weight" :colored=false />
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <MoneyCell :value="holding_row.market_currency_value" />
                    <td></td>
                    <MoneyCell :value="holding_row.market_value" />
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="total-row">
                    <td class="justify-left">Total</td>
                    <td></td>
                    <PercentCell :value="total_Holdings_Weight(investment_row.data._id)" :colored=false />
                    <td></td>
                    <MoneyCell :value="total_Holdings_Book_Value(investment_row.data._id)" />
                    <PercentCell :value="0.00" :highlighted=true />
                    <MoneyCell :value="0.00" :highlighted=true />
                    <PercentCell :value="total_Holdings_Gain_Percent(investment_row.data._id)" :highlighted=true />
                    <MoneyCell :value="total_Holdings_Gain_Amount(investment_row.data._id)" :highlighted=true />
                    <td></td>
                    <td></td>
                    <td></td>
                    <MoneyCell :value="total_Holdings_Market_Currency_Value(investment_row.data._id)" />
                    <td></td>
                    <MoneyCell :value="total_Holdings_Market_Value(investment_row.data._id)" />
                  </tr>
                </tfoot>
              </table>
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr class="total-row">
          <td colspan="4" class="justify-left">Total</td>
          <MoneyCell :value="total_Accounts_Value_CAD" />
          <MoneyCell :value="total_Accounts_Value_USD" />
          <MoneyCell :value="total_Accounts_Value_TotalCAD" />
        </tr>
      </tfoot>
    </table>
  </div>
  <div>
    <pre>{{ message }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accounts: [],
      holdings: [],
      message: ""
    }
  },
  created() {
    this.customAccountsFilter = new CustomAccountsFilter();
    this.addon = new Addon();
    this.addon.on('init', this.onInit);
  },
  methods: {
    onInit(options) {
      this.addonOptions = options;
      this.fetchAccounts(this.addonOptions);
      this.fetchHoldings(this.addonOptions);
    },
    fetchAccounts(addonOptions) {
      this.addon.api.getInstitutions(this.getQueryFromOptions(addonOptions))
        .then((response) => {

          response.forEach(institution => {

            let accountsMap = new Map();

            institution.investments.forEach(investment => {

              if (!investment.ignored && !this.getInvestmentIsExcluded(investment)) {

                let account = accountsMap.get(investment.account_number);

                if (account == null) {

                  account = {
                    institution_name: institution.name,
                    institution_type: institution.type,
                    institution_icon: this.getInstitutionIconPath(institution),
                    id: investment.id,
                    name: investment.name,
                    account_number: investment.account_number,
                    order: this.getAccountOrder(investment.account_number),
                    type: investment.type !== "unknown" ? investment.type.toUpperCase() : "",
                    value_CAD: 0,
                    value_USD: 0,
                    value_TotalCAD: 0,
                    investments: [],
                    isExpanded: false
                  };
                }

                account.investments.push({
                  isExpanded: false,
                  data: investment,
                });

                account.value_CAD += investment.currency == "cad" ? investment.currency_value : 0;
                account.value_USD += investment.currency == "usd" ? investment.currency_value : 0;
                account.value_TotalCAD += investment.value;

                accountsMap.set(investment.account_number, account);
              }
            });
            this.accounts.push(...Array.from(accountsMap.values()));
          });

          this.accounts.sort((b, a) => b.order - a.order);
        }).catch((err) => {
          console.log('addon.api.getInstitutions:', err);
        });
    },
    fetchHoldings(addonOptions) {
      this.addon.api.getPositions(this.getQueryFromOptions(addonOptions))
        .then((response) => {

          response.forEach(position => {

            position.investments.forEach(investment => {

              let holding = {
                institution_id: investment.institution,
                investment_id: investment.investment,
                account_number: investment.investment.split(":")[0],
                symbol: position.security.symbol,
                name: position.security.name,
                currency: investment.currency,
                quantity: investment.quantity,
                book_value: investment.book_value,
                daily_gain_amount: 0,
                daily_gain_percent: 0,
                daily_gain_amount: 0,
                overall_gain_amount: investment.gain_amount,
                overall_gain_currency_amount: investment.gain_currency_amount,
                overall_gain_percent: investment.gain_percent,
                low_price: position.security.low_price,
                low_date: position.security.low_date,
                high_price: position.security.high_price,
                last_currency_price: position.security.last_price,
                market_currency_value: investment.market_value,
                last_price: position.market_value / position.quantity,
                market_value: position.market_value / position.quantity * investment.quantity,
                weight: 0
              };

              this.holdings.push(holding);
            });
          });

          this.holdings.forEach(holding => {
            const totalAccountHoldings = this.holdings.reduce((total, row) => row.account_number == holding.account_number ? total + row.market_value : total, 0);
            holding.weight = holding.market_value / totalAccountHoldings;
          });

          this.holdings.sort((b, a) => a.weight - b.weight);
        }).catch((err) => {
          console.log('addon.api.getPositions:', err);
        });
    },
    getQueryFromOptions(options) {
      return {
        from: options.dateRangeFilter && options.dateRangeFilter[0],
        to: options.dateRangeFilter && options.dateRangeFilter[1],
        groups: options.groupsFilter,
        institutions: options.institutionsFilter,
        investments: options.investmentsFilter === 'all' ? null : options.investmentsFilter,
      }
    },
    logMessage(msg) {
      this.message += msg + '\n';
    },
    getAccountOrder(account_number) {
      return this.customAccountsFilter.getPreferredOrder(account_number);
    },
    getInvestmentIsExcluded(investment) {
      return this.customAccountsFilter.isExcluded(investment.account_number);
    },
    getInstitutionIconPath(institution) {
      return "https://app.wealthica.com/images/institutions/" + institution.type + ".png";
    },
    isCashRow(holding_row) {
      return holding_row.symbol == "REALCASH";
    },
    calc_Holding_Weight(account_number, value) {
      const totalHoldings = this.holdings.reduce((total, holding) => holding.account_number == account_number ? total + holding.market_value : total, 0);
      return totalHoldings !== 0 ? value / totalHoldings : 0;
    },
    total_Holdings_Weight(investment_id) {
      return this.holdings.reduce((total, holding) => holding.investment_id == investment_id ? total + holding.weight : total, 0);
    },
    total_Holdings_Book_Value(investment_id) {
      return this.holdings.reduce((total, holding) => holding.symbol != "REALCASH" && holding.investment_id == investment_id ? total + holding.book_value : total, 0);
    },
    total_Holdings_Gain_Amount(investment_id) {
      return this.holdings.reduce((total, holding) => holding.symbol != "REALCASH" && holding.investment_id == investment_id ? total + holding.overall_gain_amount : total, 0);
    },
    total_Holdings_Gain_Percent(investment_id) {
      const totalHoldingsGainAmount = this.total_Holdings_Gain_Amount(investment_id);
      const totalHoldingsBookValue = this.total_Holdings_Book_Value(investment_id);
      return totalHoldingsBookValue !== 0 ? totalHoldingsGainAmount / totalHoldingsBookValue : 0;
    },
    total_Holdings_Market_Currency_Value(investment_id) {
      return this.holdings.reduce((total, holding) => holding.investment_id == investment_id ? total + holding.market_currency_value : total, 0);
    },
    total_Holdings_Market_Value(investment_id) {
      return this.holdings.reduce((total, holding) => holding.investment_id == investment_id ? total + holding.market_value : total, 0);
    }
  },
  computed: {
    total_Accounts_Value_CAD() {
      return this.accounts.reduce((total, account) => total + account.value_CAD, 0);
    },
    total_Accounts_Value_USD() {
      return this.accounts.reduce((total, account) => total + account.value_USD, 0);
    },
    total_Accounts_Value_TotalCAD() {
      return this.accounts.reduce((total, account) => total + account.value_TotalCAD, 0);
    },

  }
}
</script>

<style scoped>
.accounts-listing {
  width: 100%;
  min-width: 992px;
  position: relative;
  border-collapse: collapse;
}

.accounts-listing tr:hover .toggle-arrow {
  visibility: visible;
}

.accounts-listing th,
.accounts-listing td {
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 12px;
  text-align: right;
  text-wrap: nowrap;
}

.accounts-listing th {
  border-bottom: 2px solid #e7e7e7;
}

.accounts-listing td {
  font-size: 14px;
  color: #000;
  font-weight: 500;
  padding: 5px 0px;
}

.accounts-listing td:first-child {
  width: 30px;
}

.total-row td {
  border-bottom: 0px solid #e7e7e7 ! important;
  border-top: 1px solid #e7e7e7;
  font-weight: bold;
}

.toggle-cell {
  display: flex;
  align-items: center;
  text-align: left;
}

.toggle-arrow {
  display: inline-flex;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  flex-shrink: 0;
  background-color: #f1f1f1;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  visibility: hidden;
}

.expanded {
  transform: rotate(180deg);
  visibility: visible
}

.institution-icon {
  border-radius: 33%;
  display: block;
  -o-object-fit: contain;
  object-fit: contain;
  -o-object-position: center;
  object-position: center;
}

.investment-row-header {
  background-color: #d5dce4;
  border: 5px solid white;
}

.investment-row-header td {
  padding: 0px;
}

.investment-row-header td:first-child {
  border-top-left-radius: 15px !important;
  border-bottom-left-radius: 15px !important;
}

.investment-row-header td:last-child {
  border-top-right-radius: 15px !important;
  border-bottom-right-radius: 15px !important;
}

.holdings-listing {
  padding: 5px 0px;
  width: 100%;
  min-width: 992px;
  position: relative;
}

.holdings-listing th,
.holdings-listing td {
  padding-right: 15px;
}

.holdings-listing th {
  border-bottom: 0px solid #e7e7e7 !important;
  text-align: center;
}

.separator-line th {
  border-bottom: 2px solid #e7e7e7 !important;
}

.grouped-header {
  width: calc(100% - 15px);
  background-color: #e7e7e7;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 5px;
  text-align: center !important;
}
</style>