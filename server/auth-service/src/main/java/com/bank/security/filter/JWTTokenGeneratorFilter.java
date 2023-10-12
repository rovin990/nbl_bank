package com.bank.security.filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.bank.security.constant.JWTConstant;
import com.bank.security.model.Customer;
import com.bank.security.service.CustomerService;
import com.bank.security.utility.JWTToken;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JWTTokenGeneratorFilter extends OncePerRequestFilter{
	

	

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if(auth!=null) {
			String jwt = JWTToken.generate(auth);
			response.setHeader(JWTConstant.JWT_HEADER, jwt);
			response.setHeader("Access-Control-Expose-Headers",JWTConstant.JWT_HEADER);
		}
		filterChain.doFilter(request, response);
	}
	
	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
		return !request.getServletPath().equals("/auth-app/login");
	}
}