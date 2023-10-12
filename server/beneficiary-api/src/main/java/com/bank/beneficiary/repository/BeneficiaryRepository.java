package com.bank.beneficiary.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bank.beneficiary.model.Beneficiary;
import java.util.List;


@Repository
public interface BeneficiaryRepository extends CrudRepository<Beneficiary, Long> {

	List<Beneficiary> findByCustomerIdAndStatus(long customerId,String status);
	
	List<Beneficiary> findByStatus(String status);
	
}
