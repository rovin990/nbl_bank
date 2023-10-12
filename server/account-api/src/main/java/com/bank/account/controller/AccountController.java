package com.bank.account.controller;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.account.model.Account;
import com.bank.account.model.AccountTransactions;
import com.bank.account.model.SearchCriteria;
import com.bank.account.repository.AccountRepository;
import com.bank.account.repository.AccountTransactionsRepository;

@RestController
@RequestMapping("/account-app")
public class AccountController {
	
	@Autowired
	AccountRepository accountRepository;
	
	@Autowired
	AccountTransactionsRepository accountTransactionsRepository;
	
	@GetMapping("/account/{accountNumber}")
	public ResponseEntity<Account> getAccountDetails(@PathVariable("accountNumber") long accountNumber){
		Account fetchedAccount =accountRepository.findById(accountNumber).get();
		ResponseEntity response =null;
		
		if(fetchedAccount!=null) {
			System.out.println("Account Number "+accountNumber);
			response= ResponseEntity.status(HttpStatus.OK).body(fetchedAccount);
		}
		else {
			response=ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Account:"+accountNumber+":false");
		}
		return response;
		
	}
	
	@GetMapping("/accounts/{customerId}")
	public ResponseEntity<List<Account>> getAccounts(@PathVariable("customerId") long customerId){
		List<Account> accounts = accountRepository.findByCustomerId(customerId);
		ResponseEntity response =null;
		if(null!=accounts) {
			response= ResponseEntity.status(HttpStatus.OK).body(accounts);
		}
		else {
			response=ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Accounts:"+customerId+":false");
		}
		return response;
	}
	
	
	@GetMapping("/transactions/{customerId}")
	public ResponseEntity<List<AccountTransactions>> getAccountTransactionns(@PathVariable("customerId") long customerId){
		System.out.println("customer id "+customerId);
		List<AccountTransactions> accountsTransactions = accountTransactionsRepository.findByCustomerIdOrderByTransactionDtDesc(customerId);
		
		
		ResponseEntity response =null;
		if(accountsTransactions.size()>0) {
			
			response= ResponseEntity.status(HttpStatus.OK).body(accountsTransactions);
		}
		else {
			response=ResponseEntity.status(HttpStatus.BAD_REQUEST).body("AccountsTransactions:"+customerId+":false");
		}
		return response;
		
	}
	
//	search by criteria
	@PatchMapping("/transactions/{customerId}")
	public  ResponseEntity<List<AccountTransactions>> getAccountTransactionnsByCriteria(@RequestBody SearchCriteria sc, @PathVariable("customerId") long customerId){
		List<AccountTransactions> accountsTransactions=null;
		System.out.println("SearchCriteria"+sc);
		if(sc.getSpecificDt()!=null) {
			accountsTransactions= accountTransactionsRepository.findByCustomerIdAndTransactionDt(customerId,sc.getSpecificDt());
		}else {
			accountsTransactions = accountTransactionsRepository.findByCustomerIdAndTransactionDtBetween(customerId, sc.getFirstDt(), sc.getSecondDt());
		}
		
		
		ResponseEntity response =null;
		if(null!=accountsTransactions) {
			System.out.println("transactions search criteria"+accountsTransactions);
			response= ResponseEntity.status(HttpStatus.OK).body(accountsTransactions);
		}
		else {
			response=ResponseEntity.status(HttpStatus.BAD_REQUEST).body("AccountsTransactions:"+customerId+":false");
		}
		return response;
	}
	
//	{
//		AccountTransactions transactions = new AccountTransactions();
//        transactions.setTransactionId("TR-1234-ACBS-1996");
//        transactions.setAccountNumber(6789123489L);
//        transactions.setCustomerId(2);
//        transactions.setTransactionDt(new Date(System.currentTimeMillis()));
//        transactions.setTransactionSummary("SUmmry ");
//        transactions.setTransactionType("credit");
//        transactions.setTransactionAmt(3000);
//        transactions.setClosingBalance(5000);
//        transactions.setCreateDt(String.valueOf(new Date(System.currentTimeMillis())));
//        transactions.setCreditorName("Oggy");
//        transactions.setCreditorCustomerId(3);
//
//        AccountTransactions transactions1 = new AccountTransactions();
//        transactions1.setTransactionId("TR-2000-ZXYV-1996");
//        transactions1.setAccountNumber(6789123489L);
//        transactions1.setCustomerId(2);
//        transactions1.setTransactionDt(new Date(System.currentTimeMillis()));
//        transactions1.setTransactionSummary("SUmmry ");
//        transactions1.setTransactionType("withdraw");
//        transactions1.setTransactionAmt(1000);
//        transactions1.setClosingBalance(5000);
//        transactions1.setCreateDt(String.valueOf(new Date(System.currentTimeMillis())));
//        transactions1.setCreditorName("Oggy");
//        transactions1.setCreditorCustomerId(3);
//	}

}
