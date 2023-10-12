package com.bank.balance.responses;


public class AccountResponse {

	private long accountNumber;
	private String accountType;
	private String branchName;
	private int closingBalance;
	private String createDt;
    private int customerId;
	public long getAccountNumber() {
		return accountNumber;
	}
	public void setAccountNumber(long accountNumber) {
		this.accountNumber = accountNumber;
	}
	public String getAccountType() {
		return accountType;
	}
	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}
	public String getBranchName() {
		return branchName;
	}
	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}
	public int getClosingBalance() {
		return closingBalance;
	}
	public void setClosingBalance(int closingBalance) {
		this.closingBalance = closingBalance;
	}
	public String getCreateDt() {
		return createDt;
	}
	public void setCreateDt(String createDt) {
		this.createDt = createDt;
	}
	public int getCustomerId() {
		return customerId;
	}
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}

    
    
    
}