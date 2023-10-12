package com.bank.account.model;

import java.sql.Date;



public class SearchCriteria {

	private Date specificDt;
	private Date firstDt;
	private Date secondDt;
	public Date getSpecificDt() {
		return specificDt;
	}
	public void setSpecificDt(Date specificDt) {
		this.specificDt = specificDt;
	}
	public Date getFirstDt() {
		return firstDt;
	}
	public void setFirstDt(Date firstDt) {
		this.firstDt = firstDt;
	}
	public Date getSecondDt() {
		return secondDt;
	}
	public void setSecondDt(Date secondDt) {
		this.secondDt = secondDt;
	}
	@Override
	public String toString() {
		return "SearchCriteria [specificDt=" + specificDt + ", firstDt=" + firstDt + ", secondDt=" + secondDt + "]";
	}
	
	
	
	
}
