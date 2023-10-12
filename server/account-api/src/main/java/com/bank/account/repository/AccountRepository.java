package com.bank.account.repository;

import org.springframework.data.repository.CrudRepository;

import com.bank.account.model.Account;
import java.util.List;


public interface AccountRepository extends CrudRepository<Account, Long>{
	
	List<Account> findByCustomerId(long customerId);

}
