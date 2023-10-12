package com.bank.security.config;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.bank.security.model.Authority;
import com.bank.security.model.Customer;
import com.bank.security.service.CustomerService;

@Component
public class CustomBankAuthenticationProvider implements AuthenticationProvider{

	
	@Autowired
	CustomerService customerService; 
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String username=authentication.getName();
		String password = authentication.getCredentials().toString();
		Customer existCustomer = customerService.existCustomer(username);
		
		if(existCustomer!=null) {
			if(customerService.matchesPassword(password, existCustomer.getPwd())) {
				return new UsernamePasswordAuthenticationToken(username,password, getGrantedAuthorities(existCustomer.getAuthorities()));
			}
			else{
				throw new BadCredentialsException("Invalid password");
			}
		}
		else {
			throw  new BadCredentialsException("No user details register with us");
		}
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
	}
	
	
	List<GrantedAuthority> getGrantedAuthorities(Set<Authority> authorities){
		List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
		
		for (Authority authority : authorities) {
			grantedAuthorities.add(new SimpleGrantedAuthority(authority.getName()));
		}
		return grantedAuthorities;
	}

}
