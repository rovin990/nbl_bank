package com.bank.balance.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.bank.balance.responses.AccountResponse;


@FeignClient(name="account-service",path = "account-app")
public interface AccountFeignClient {

	@GetMapping("/account/{accountNumber}")
	AccountResponse getAccountResponse(@PathVariable("accountNumber") int accountNumber);
}
