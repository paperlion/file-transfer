package com.robin.robinwebsite;

import javax.annotation.PreDestroy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.robin.robinwebsite.storage.StorageService;


@Component
public class DatabaseLoader implements CommandLineRunner { 
	
	private final FileEntryRepository resposity;
	private final StorageService storageService;

	@Autowired
	public DatabaseLoader(FileEntryRepository responsity, StorageService storageService) {
		this.resposity = responsity;
		this.storageService = storageService;
	}

	@Override
	public void run(String... strings) throws Exception {
		storageService.init();
	}
	
	@PreDestroy
	public void deleteFiles() {
		storageService.deleteAll();
	}
}