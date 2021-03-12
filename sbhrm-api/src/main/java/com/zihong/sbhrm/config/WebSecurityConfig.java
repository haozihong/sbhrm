package com.zihong.sbhrm.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zihong.sbhrm.pojo.Hr;
import com.zihong.sbhrm.service.HrService;
import com.zihong.sbhrm.utils.RespUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.*;
import org.springframework.security.config.annotation.ObjectPostProcessor;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;

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

    @Autowired
    CustomUrlDecisionManager customUrlDecisionManager;

    @Autowired
    CustomFilterInvocationSecurityMetadataSource customFilterInvocationSecurityMetadataSource;

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
                .withObjectPostProcessor(new ObjectPostProcessor<FilterSecurityInterceptor>() {
                    @Override
                    public <O extends FilterSecurityInterceptor> O postProcess(O object) {
                        object.setAccessDecisionManager(customUrlDecisionManager);
                        object.setSecurityMetadataSource(customFilterInvocationSecurityMetadataSource);
                        return object;
                    }
                })
                .and()
                .formLogin()
                .loginPage("/login_p")
                .loginProcessingUrl("/login_process")
                .failureHandler((request, response, exception) -> {
                    response.setContentType("application/json;charset=utf-8");
                    PrintWriter out = response.getWriter();
                    RespUtils resp = RespUtils.error(
                            exception instanceof LockedException ? "[FAIL] Login fail. Account is locked." :
                            exception instanceof CredentialsExpiredException ? "[FAIL] Login fail. Password is expired." :
                            exception instanceof AccountExpiredException ? "[FAIL] Login fail. Account is expired." :
                            exception instanceof DisabledException ? "[FAIL] Login fail. Account is disabled." :
                            exception instanceof BadCredentialsException ? "[FAIL] Login fail. Wrong username or password." :
                            exception.getMessage());
                    out.write(new ObjectMapper().writeValueAsString(resp));
                    out.flush();
                    out.close();
                })
                .successHandler((request, response, authentication) -> {
                    response.setContentType("application/json;charset=utf-8");
                    PrintWriter out = response.getWriter();

                    Hr hr = (Hr) authentication.getPrincipal();
                    hr.setPassword(null);

                    out.write(new ObjectMapper().writeValueAsString(RespUtils.ok("[SUCCESS] login success", hr)));
                    out.flush();
                    out.close();
                })
                .and()
                .logout()
                .logoutSuccessHandler((req, resp, authentication) -> {
                    resp.setContentType("application/json;charset=utf-8");
                    PrintWriter out = resp.getWriter();
                    out.write(new ObjectMapper().writeValueAsString(RespUtils.ok("[SUCCESS] logout success")));
                    out.flush();
                    out.close();
                })
                .permitAll()
                .and()
                .rememberMe().rememberMeParameter("rememberMe")
                .and()
                .csrf().disable();  // by default Spring Security will block POST DELETE. disable csrf temporarily
    }
}
