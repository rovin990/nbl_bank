package com.bank.gateway.filter;

import java.util.List;
import java.util.function.Predicate;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

@Component
public class RouteValidator {

	private static final List<String> openApiEndpoints = List.of(
			"/auth-app/register",
			"/auth-app/token",
			"/auth-app/login"
			
			);
	
	public Predicate<ServerHttpRequest> isSecured =(request)->{
		return openApiEndpoints.stream().noneMatch(uri->request.getURI().getPath().contains(uri));
	};
			
}
