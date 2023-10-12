package com.bank.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BankapiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(BankapiGatewayApplication.class, args);
	}
	
//	CorsWebFilter corsWebFilter() {
//	    CorsConfiguration corsConfig = new CorsConfiguration();
//	    corsConfig.setAllowedOrigins(Arrays.asList("http://localhost:3000/"));
//	    corsConfig.setMaxAge(8000L);
//	    corsConfig.addAllowedMethod("*");
//	    corsConfig.addAllowedHeader("Baeldung-Allowed");
//
//	    UrlBasedCorsConfigurationSource source =
//	      new UrlBasedCorsConfigurationSource();
//	    source.registerCorsConfiguration("/**", corsConfig);
//
//	    return new CorsWebFilter(source);
//	}

}
