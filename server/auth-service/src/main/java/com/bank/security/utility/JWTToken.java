package com.bank.security.utility;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.bank.security.constant.JWTConstant;
import com.bank.security.model.Customer;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;


public  class JWTToken {

	public static  String generate(Authentication auth) {
		SecretKey key = Keys.hmacShaKeyFor(JWTConstant.JWT_KEY.getBytes(StandardCharsets.UTF_16));
		String jwt = Jwts.builder()
					.setIssuer("TECHBANK")
					.setSubject("JWT TOKEN")
					.claim("username", auth.getName())
//					.claim("authorities", populateAuthorities(customer.getAuthorities()))
					.setIssuedAt(new Date())
					.setExpiration(new Date((new Date()).getTime()+3000000))
					.signWith(key)
					.compact();
		
		return jwt;
	}
	
	
	public static Boolean validate(String token) {
		
			SecretKey key = Keys.hmacShaKeyFor(JWTConstant.JWT_KEY.getBytes(StandardCharsets.UTF_16));
			Claims claim = Jwts.parserBuilder()
							   .setSigningKey(key)
							   .build()
							   .parseClaimsJws(token)
							   .getBody();
			String username = String.valueOf(claim.get("username"));
			System.out.println(username);
			if(username!=null) {
				
				return true;
			}
			else return false;
			/* String authorities = String.valueOf(claim.get("authorities")); */
//			Authentication auth = new UsernamePasswordAuthenticationToken(username, null,AuthorityUtils.commaSeparatedStringToAuthorityList(authorities));
//			SecurityContextHolder.getContext().setAuthentication(auth);
//		
//			throw new BadCredentialsException("Invalid Token received!");
		
	}
}
