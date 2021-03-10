package com.zihong.sbhrm.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    // Swagger's Docket Bean
    @Bean
    public Docket sbhrmDocket(Environment environment) {
        // Enable Swagger in these envs
        Profiles profiles = Profiles.of("dev", "test");
        // figure out whether in required env
        boolean flag = environment.acceptsProfiles(profiles);

        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("Sbhrm API")
                .enable(flag)
                .select()
                // RequestHandlerSelectors: api scanning way
                // basePackage(): scanning package
                // any(): scan all; none(): scan none
                // withClassAnnotation(): scanning classes with certain annotation
                // withMethodAnnotation(): scanning methods with certain annotation
                .apis(RequestHandlerSelectors.basePackage("com.zihong.sbhrm.controller"))
                // paths(): path filter
                // .paths(PathSelectors.ant("/zihong/**"))
                .build();
    }
}
