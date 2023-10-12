package com.bank.account.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bank.account.model.AccountTransactions;

@Repository
public interface AccountTransactionsRepository extends CrudRepository<AccountTransactions,Long> {
    List<AccountTransactions> findByCustomerIdOrderByTransactionDtDesc(long customerId);
    
    
    List<AccountTransactions> findByCustomerIdAndTransactionDt(long customerId,Date transactionDt);
    
    List<AccountTransactions>findByCustomerIdAndTransactionDtBetween(long customerId,Date start,Date end);
}
