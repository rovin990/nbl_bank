package com.bank.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import com.bank.security.filter.JWTTokenGeneratorFilter;

import jakarta.servlet.http.HttpServletRequest;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class BankConfigWithJWT {


	@Bean
	SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(AbstractHttpConfigurer::disable)
				.addFilterAfter(new JWTTokenGeneratorFilter(), BasicAuthenticationFilter.class)
				.authorizeHttpRequests((requests) -> requests
						.requestMatchers("/auth-app/login").authenticated()
						.requestMatchers("/auth-app/register").permitAll());
		http.formLogin(withDefaults());
		http.httpBasic(withDefaults());
		return http.build();
	}
//	@Bean
//	SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception{
//		http
//		//.sessionManagement(customizer->customizer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
////		.cors(corsCustomizer->corsCustomizer.configurationSource(new CorsConfigurationSource() {
////
////			@Override
////			public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
////				CorsConfiguration config = new CorsConfiguration();
////				config.setMaxAge(3600L);
////				return config;
////			}
////		}))
//		.csrf(AbstractHttpConfigurer::disable)
//		//.addFilterAfter(new JWTTokenGeneratorFilter(), BasicAuthenticationFilter.class)
//		.authorizeHttpRequests((requests)->requests
//				.requestMatchers("/login").authenticated()
//				.requestMatchers("/auth-app/register").permitAll());
//		http.formLogin(withDefaults());
//		http.httpBasic(withDefaults());
//		return http.build();
//	}
	
	
	@Bean
	 PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
