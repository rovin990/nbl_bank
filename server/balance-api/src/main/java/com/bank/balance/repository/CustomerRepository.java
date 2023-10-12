package com.bank.balance.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.bank.balance.model.Customer;


public interface CustomerRepository extends CrudRepository<Customer,Long> {

    public List<Customer> findByEmail(String email);


}
