package com.bank.gateway.filter;

import org.apache.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.bank.gateway.util.JwtUtil;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config>{

	@Autowired
	private RouteValidator routeValidator;
	
	@Autowired
	RestTemplate restTemplate;
	
	AuthenticationFilter(){
		super(Config.class);
	}
	
	
	@Override
	public GatewayFilter apply(Config config) {
		
		return (exchange,chain)->{
			
			if(routeValidator.isSecured.test(exchange.getRequest())) {
				if(!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
					throw new RuntimeException("missing authorization header");
				}
				
				String authHeader=exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
				
				String[] parts = authHeader.split(" "); 
				
				if(parts.length!=2 || !"Bearer".equals(parts[0])) {
					throw new RuntimeException("Incorrect authorization structure");
				}
				
				
				
				JwtUtil.validateToken(parts[1]);
				
			}
			return chain.filter(exchange);
		};
	}
	
	public static class Config{
		
	}

	
}
