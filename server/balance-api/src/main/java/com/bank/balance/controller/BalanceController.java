package com.bank.balance.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.bank.balance.clients.AccountFeignClient;
import com.bank.balance.repository.AccountTransactionsRepository;
import com.bank.balance.responses.AccountResponse;

@RestController
@RequestMapping("/register-app")
public class BalanceController {

    @Autowired
    private AccountTransactionsRepository accountTransactionsRepository;
    
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private AccountFeignClient feignClient;
    
//    @Autowired
//    private DiscoveryClient disconveryClient;
//    @Autowired
//    private LoadBalancerClient loadBalancerClient;
    
    @GetMapping("/myBalance/{accountNumber}")
    public ResponseEntity<String> getBalanceDetails(@PathVariable("accountNumber") int accountNumber) {
    	ResponseEntity response =null;    	
    	
//    	List<ServiceInstance> instances = disconveryClient.getInstances("account-service");
//    	
//    	ServiceInstance serviceInstance = instances.get(0);
//    	String uri = serviceInstance.getUri().toString();
//    	System.out.println("list of service instance "+uri);
    	
    	
//    	ServiceInstance choose = loadBalancerClient.choose("account-service");
//    	String uri  = choose.getUri().toString();
//    	String contextPath = choose.getMetadata().get("contextPath");
//    	System.out.println("list of service instance "+uri);
    	
//    	AccountResponse accountResponse=restTemplate.getForEntity("http://account-service/account-app/api"+"/account/"+accountNumber, AccountResponse.class).getBody();
        
    	/*feignclient as httpclient*/
    	AccountResponse accountResponse =feignClient.getAccountResponse(accountNumber);
    	response= ResponseEntity
    		   .status(HttpStatus.OK).body(accountResponse);
       
       return response;
    }
}
