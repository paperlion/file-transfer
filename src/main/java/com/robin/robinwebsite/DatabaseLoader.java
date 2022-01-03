package com.robin.robinwebsite;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.robin.robinwebsite.storage.StorageService;


@Component
public class DatabaseLoader implements CommandLineRunner { // <2>

	private final StorageService storageService;

	@Autowired
	public DatabaseLoader(StorageService storageService) {
		this.storageService = storageService;
	}

	@Override
	public void run(String... strings) throws Exception { // <4>
		storageService.init();
	}
}