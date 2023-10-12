package com.bank.gateway.util;
import java.nio.charset.StandardCharsets;

import javax.crypto.SecretKey;

import com.bank.gateway.constant.JWTConstant;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;


public abstract class JwtUtil {
	
	 public static void validateToken(final String token) {
	        Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token);
	    }
	 
	private static SecretKey getSignKey() {
	        byte[] keyBytes = JWTConstant.JWT_KEY.getBytes(StandardCharsets.UTF_16);
	        return Keys.hmacShaKeyFor(keyBytes);
	}
}