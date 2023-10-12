package com.bank.security.service;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bank.security.model.Customer;
import com.bank.security.repository.CustomerRepository;

@Service
public class CustomerService {

	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public Customer save(Customer customer ) {
		Customer savedCustomer = null;
		
		try {
				String bcryptPwd=passwordEncoder.encode(customer.getPwd());
				customer.setPwd(bcryptPwd);
				customer.setCreateDt(String.valueOf(new Date(System.currentTimeMillis())));
				savedCustomer = customerRepository.save(customer);
		} catch (Exception ex) {
	        
	    }
		return savedCustomer;
	}
	
	public Customer existCustomer(String email) {
		List<Customer> customers = customerRepository.findByEmail(email);
		if(customers.size()>0) {
			return customers.get(0);
		}
		return null;
	}
	
	public boolean matchesPassword(String password,String fetchedPassword) {
		if(passwordEncoder.matches(password, fetchedPassword)) {
			return true;
		}
		return false;
	}
}
