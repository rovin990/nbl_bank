package com.bank.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.security.model.Customer;
import com.bank.security.service.CustomerService;

record LoggedInUser(String email,String pwd) {};
record TokenUser(String email,String pwd) {};

@RestController
@RequestMapping("/auth-app")
public class BankAuthController {
	
	@Autowired
	private CustomerService customerService;
	

	
	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody Customer customer){
		ResponseEntity<String> response = null ;
		Customer existCustomer = customerService.existCustomer(customer.getEmail());
		if(existCustomer==null) {
			Customer savedcustomer =customerService.save(customer);
			
			if(savedcustomer.getId()>0) {
				response = ResponseEntity
		                    .status(HttpStatus.CREATED)
		                    .body("Given user details are successfully registered");
			}
			else {
				response = ResponseEntity
	                    .status(HttpStatus.BAD_REQUEST)
	                    .body("Given user details are not successfully registered");
			}
		}else {
			response = ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Given user details already registered");
		}
		return response;	                
	       
	}
	
	
	
	@RequestMapping("/login")
	public Customer login(Authentication authentication) {
		String username=authentication.getName();
		Customer existCustomer = customerService.existCustomer(username);
		return existCustomer;
	}
	
//	@PostMapping("/token")
//	public ResponseEntity<String> token(@RequestBody TokenUser user){
//
//		Customer existCustomer = customerService.existCustomer(user.email());
//		ResponseEntity response = null ;
//		if(existCustomer!=null) {
//			String token =jwtToken.generate(existCustomer);
//			
//			response = ResponseEntity
//                    .status(HttpStatus.OK)
//                    .body(token);
//		}
//		else {
//			response = ResponseEntity
//                    .status(HttpStatus.BAD_REQUEST)
//                    .body("Given user does not exist");
//		}
//		return response;
//	}

//	@GetMapping("/validate/{token}")
//	public ResponseEntity<String> validateToken(@PathVariable("token") String token){
//		ResponseEntity response = null ;
//		if(token!=null) {
//			Boolean isValide =jwtToken.validate(token);
//			
//			response = ResponseEntity
//                    .status(HttpStatus.OK)
//                    .body(isValide);
//		}
//		else {
//			response = ResponseEntity
//                    .status(HttpStatus.BAD_REQUEST)
//                    .body("Invalid Token");
//		}
//		return response;
//	}
	
	
}
