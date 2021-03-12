package com.zihong.sbhrm.config;

import com.zihong.sbhrm.service.HrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.PrintWriter;

/**
 * @author Zihong Hao
 * @github https://github.com/haozihong
 * @date 2021-03-10 18:41
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    HrService hrService;

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(hrService);
    }

    @Override
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers("/index.html", "/static/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .and()
                .formLogin()
                .permitAll()
                .failureHandler((request, response, exception) -> {
                    response.setContentType("application/json;charset=utf-8");
                    PrintWriter out = response.getWriter();
                    StringBuilder sb = new StringBuilder();
                    sb.append("{\"status\":\"error\",\"msg\":\"");
                    if (exception instanceof UsernameNotFoundException || exception instanceof BadCredentialsException) {
                        sb.append("Login fail. Wrong username or password. ");
                    } else if (exception instanceof DisabledException) {
                        sb.append("Login fail. Account is disabled. ");
                    } else {
                        sb.append("Login fail.");
                    }
                    sb.append("\"}");
                    out.write(sb.toString());
                    out.flush();
                    out.close();
                })
                .successHandler((request, response, authentication) -> {
                    response.setContentType("application/json;charset=utf-8");
                    PrintWriter out = response.getWriter();
                    // Hr hr = (Hr) authentication.getPrincipal();
                    // hr.setPassword(null);
                    String s = "{\"status\":\"success\",\"msg\": \"Login success. \"}";
                    out.write(s);
                    out.flush();
                    out.close();
                })
                .and()
                .logout().permitAll()
                .and()
                .rememberMe().rememberMeParameter("rememberMe")
                .and()
                .csrf().disable();  // by default Spring Security will block POST DELETE. disable csrf temporarily
    }
}
