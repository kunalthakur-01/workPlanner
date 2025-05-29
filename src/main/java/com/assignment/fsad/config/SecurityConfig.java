package com.assignment.fsad.config;

import com.assignment.fsad.enums.UserRoles;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        httpSecurity.csrf(csrf -> csrf.disable())
                // .cors(cors -> cors.disable())
                .authorizeHttpRequests(requests -> requests
                        // .requestMatchers("api/user/all/coordinator").permitAll()
                        // .requestMatchers("api/user/attendee/signup").permitAll()
                        .requestMatchers("api/v1/**").permitAll()
//                        .requestMatchers("api/user/team/new/**").hasAuthority(UserRoles.MANAGER.name())
//                        .requestMatchers("api/user/add/team/**").hasAuthority(UserRoles.DEVELOPER.name())
                        // .requestMatchers("api/user/group/new/**").hasRole(Role.TEACHER.name())  --> do "ROLE_" + role.name() in getAuthorities in User model
                        .anyRequest()
                        .authenticated());

        return httpSecurity.build();
    }
}

