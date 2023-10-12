package com.bank.beneficiary.model;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="beneficiaries")
public class Beneficiary {
	
	@Id
	@GeneratedValue(strategy= GenerationType.AUTO,generator="native")
    @GenericGenerator(name = "native",strategy = "native")
	private long id;
	
	@Column(name="account_number")
	private long accountNumber;
	
	@Column(name="account_ifsc")
	private String accountIFSC;
	
	@Column(name="email")
	private String email;
	
	@Column(name="name")
	private String name;
	
	@Column(name="reference_number")
	private String referenceNumber;
	
	@Column(name ="customer_id")
    private int customerId;
	
	@Column(name ="status")
	private String status;
	
	@Column(name ="remark")
	private String remark;
	
	
	public long getAccountNumber() {
		return accountNumber;
	}
	public void setAccountNumber(long accountNumber) {
		this.accountNumber = accountNumber;
	}
	public String getAccountIFSC() {
		return accountIFSC;
	}
	public void setAccountIFSC(String accountIFSC) {
		this.accountIFSC = accountIFSC;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getReferenceNumber() {
		return referenceNumber;
	}
	public void setReferenceNumber(String referenceNumber) {
		this.referenceNumber = referenceNumber;
	}
	public int getCustomerId() {
		return customerId;
	}
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	@Override
	public String toString() {
		return "Beneficiary [id=" + id + ", accountNumber=" + accountNumber + ", accountIFSC=" + accountIFSC
				+ ", email=" + email + ", name=" + name + ", referenceNumber=" + referenceNumber + ", customerId="
				+ customerId + ", status=" + status + ", remark=" + remark + "]";
	}
	
	
	
	
	

}
