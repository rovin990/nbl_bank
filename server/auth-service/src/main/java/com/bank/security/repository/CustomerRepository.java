package com.bank.security.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.bank.security.model.Customer;


public interface CustomerRepository extends CrudRepository<Customer,Long> {

    public List<Customer> findByEmail(String email);


}
