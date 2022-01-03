package com.robin.robinwebsite;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.robin.robinwebsite.storage.StorageProperties;


@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class RobinWebsiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(RobinWebsiteApplication.class, args);
	}

}
