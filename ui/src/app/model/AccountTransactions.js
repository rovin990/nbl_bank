class AccountTransactions{

    constructor(accountNumber, customerId,  transactionDt, transactionId,
        transactionSummary, transactionType, transactionAmt, closingBalance,creditorName,creditorAccount){
            this.accountNumber=accountNumber;
            this.customerId=customerId;
            this.transactionDt=transactionDt;
            this.transactionId=transactionId;
            this.transactionSummary=transactionSummary;
            this.transactionType=transactionType;
            this.transactionAmt=transactionAmt;
            this.creditorName=creditorName;
            this.creditorAccount=creditorAccount;
            this.closingBalance=closingBalance
    }
}