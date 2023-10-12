package com.bank.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class Beans {

	@Bean
	RestTemplate getRestTemplate() {
		return new RestTemplate();
	}
}
