export class CustomAccountsFilter {
  constructor() {
    /*this.data = [
      {name: "INVESTOR - CELI", account_number: "22981483", order: 1, exluded: false},
      {name: "INVESTOR - RESP", account_number: "21921430", order: 2, exluded: false},
      {name: "NESBITT - NON-ENREG", account_number: "31015145", order: 3, exluded: false},
      {name: "NESBITT - BELSKI", account_number: "31107566", order: 4, exluded: false},
      {name: "NESBITT - FONDS", account_number: "31107567", order: 5, exluded: false},
      {name: "NESBITT - ACTIONS (REER)", account_number: "31107798", order: 6, exluded: false},
      {name: "NESBITT - ACTIONS (CELI)", account_number: "78124230", order: 7, exluded: false},
      {name: "CGI - ACTIONS", account_number: "CGI", order: 8, exluded: false},
      {name: "FTQ - REER", account_number: "107935800-01R", order: 9, exluded: false},
      {name: "homeowner readiline", account_number: "xxxx7223", order: 999, exluded: true},
      {name: "homeowner readiline", account_number: "xxxx3449", order: 999, exluded: true}
    ];*/
    this.data = [
      { name: "INVESTOR - CELI", account_number: "22981483", order: 1, exluded: false },
      { name: "INVESTOR - RESP", account_number: "21921430", order: 2, exluded: false },
      { name: "NESBITT - NON-ENREG", account_number: "31015145", order: 3, exluded: true },
      { name: "NESBITT - BELSKI", account_number: "31107566", order: 4, exluded: true },
      { name: "NESBITT - FONDS", account_number: "31107567", order: 5, exluded: true },
      { name: "NESBITT - ACTIONS (REER)", account_number: "31107798", order: 6, exluded: true },
      { name: "NESBITT - ACTIONS (CELI)", account_number: "78124230", order: 7, exluded: true },
      { name: "CGI - ACTIONS", account_number: "CGI", order: 8, exluded: true },
      { name: "FTQ - REER", account_number: "107935800-01R", order: 9, exluded: true },
      { name: "homeowner readiline", account_number: "xxxx7223", order: 999, exluded: true },
      { name: "homeowner readiline", account_number: "xxxx3449", order: 999, exluded: true }
    ];
  }

  getPreferredOrder(account_number) {
    // Find the entry with the given account_number
    var entry = this.data.find(row => row.account_number === account_number);

    // If the entry was found, return the preferred_order, otherwise return 999
    return entry ? entry.order : 999;
  }

  isExcluded(account_number) {
    // Find the entry with the given account_number
    var entry = this.data.find(row => row.account_number === account_number);

    // If the entry was found, return the preferred_order, otherwise return 999
    //return entry ? entry.exluded : false;
    return entry ? entry.exluded : true;
  }
}