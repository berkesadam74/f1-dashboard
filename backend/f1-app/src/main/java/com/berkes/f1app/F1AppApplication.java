package com.berkes.f1app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class F1AppApplication {
    public static void main(String[] args) {
        SpringApplication.run(F1AppApplication.class, args);
    }
} 