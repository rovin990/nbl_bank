package com.bank.beneficiary.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.beneficiary.model.Beneficiary;
import com.bank.beneficiary.repository.BeneficiaryRepository;

@RestController
@RequestMapping("/beneficiary-app")
public class BeneficiaryController {
	
	@Autowired
	BeneficiaryRepository beneficiaryRepository;
	
	@PostMapping("/beneficiary")
	public ResponseEntity<String> create(@RequestBody Beneficiary beneficiary){
		
		Beneficiary savedBeneficiary = null;
	    ResponseEntity response = null;
	        try {

	        	UUID uuid = UUID.randomUUID();
	            String uuidAsString = "BR-S-"+uuid.toString();
	        	beneficiary.setReferenceNumber(uuidAsString);
	        	beneficiary.setStatus("Active");
	        	beneficiary.setRemark("manager will approve");
	        	savedBeneficiary = beneficiaryRepository.save(beneficiary);
	        	System.out.println("add beneficiary "+beneficiary);
	            if (savedBeneficiary.getId() > 0) {
	                response = ResponseEntity
	                        .status(HttpStatus.CREATED)
	                        .body(savedBeneficiary.getReferenceNumber());
	            }
	        } catch (Exception ex) {
	            response = ResponseEntity
	                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
	                    .body("An exception occured due to " + ex.getMessage());
	        }
	        return response;
	}
	
	@GetMapping("/beneficiary/{customerId}")
	public ResponseEntity<List<Beneficiary>> getBeneficiaries(@PathVariable("customerId") long customerId){
		System.out.println("customer id "+customerId);
		List<Beneficiary> beneficiaries= beneficiaryRepository.findByCustomerIdAndStatus(customerId,"Active");
		
		ResponseEntity response = null;
		if(beneficiaries.size()>0) {
			response = ResponseEntity
                    .status(HttpStatus.OK)
                    .body(beneficiaries);
		}
		else {
			response = ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("No Beneficiary account found please add" );
		}
		return response;
	}
	
	@PutMapping("/beneficiary")
	public ResponseEntity<String> update(@RequestBody Beneficiary beneficiary){
		Beneficiary savedBeneficiary = beneficiaryRepository.findById(beneficiary.getId()).get();
	    ResponseEntity response = null;
	    try {
	       if(null!=savedBeneficiary) {

	    	   savedBeneficiary.setAccountIFSC(beneficiary.getAccountIFSC());
	    	   savedBeneficiary.setAccountNumber(beneficiary.getAccountNumber());
	    	   savedBeneficiary.setEmail(beneficiary.getEmail());
	    	   savedBeneficiary.setName(beneficiary.getName());
	    	   
	    	   UUID uuid = UUID.randomUUID();
	           String uuidAsString = "BR-U-"+uuid.toString();
	           savedBeneficiary.setReferenceNumber(uuidAsString);
	    	   
	        	savedBeneficiary = beneficiaryRepository.save(savedBeneficiary);
	            if (savedBeneficiary.getId() > 0) {
	                response = ResponseEntity
	                        .status(HttpStatus.CREATED)
	                        .body(savedBeneficiary.getReferenceNumber());
	            }
	        }
	    }catch (Exception ex) {
	            response = ResponseEntity
	                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
	                    .body("An exception occured due to " + ex.getMessage());
	   }
	        
	    return response;
		/*
		 * { "accountNumber":"", "accountIFSC":"", "email":"", "name":"" }
		 */
	}
	
	
	@DeleteMapping ("/beneficiary/{id}")
	public ResponseEntity<String> delete(@PathVariable("id") long id){
		Beneficiary deletedBeneficiary = beneficiaryRepository.findById(id).get();
		ResponseEntity response = null;
		try {
			beneficiaryRepository.deleteById(id);
			System.out.println("Deleted id : "+id);
			response = ResponseEntity
                    .status(HttpStatus.OK)
                    .body("Deleted");
		}
		catch (Exception ex) {
			response = ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An exception occured due to " + ex.getMessage());
		}
		
		return response;
	}
	
	
	//for manager
	
	@GetMapping("/manager/beneficiary")
	public ResponseEntity<Beneficiary> getPendingBeneficiaries(){
		List<Beneficiary> beneficiaries= beneficiaryRepository.findByStatus("Deactive");
		
		ResponseEntity response = null;
		if(beneficiaries.size()>0) {
			response = ResponseEntity
                    .status(HttpStatus.OK)
                    .body(beneficiaries);
		}
		else {
			response = ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("No Pending Beneficiary " );
		}
		return response;
	}
	
	@PutMapping("/manager/beneficiary")
	public ResponseEntity<String> approveOrReject(@RequestBody Beneficiary beneficiary){
		System.out.println("Coming "+beneficiary);
		Beneficiary savedBeneficiary = beneficiaryRepository.findById(beneficiary.getId()).get();
	    ResponseEntity response = null;
	    try {
	       if(null!=savedBeneficiary) {

	    	   savedBeneficiary.setStatus(beneficiary.getStatus());
	    	   savedBeneficiary.setRemark(beneficiary.getRemark());	    	   
	        	savedBeneficiary = beneficiaryRepository.save(savedBeneficiary);
	            if (savedBeneficiary.getId() > 0) {
	                response = ResponseEntity
	                        .status(HttpStatus.ACCEPTED)
	                        .body("BR:"+savedBeneficiary.getReferenceNumber());
	            }
	        }
	    }catch (Exception ex) {
	            response = ResponseEntity
	                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
	                    .body("An exception occured due to " + ex.getMessage());
	   }
	        
	    return response;
	}
	
}

	
	
	
	
	
	
	
	
	
	
	
	
	
	