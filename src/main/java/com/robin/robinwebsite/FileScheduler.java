package com.robin.robinwebsite;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.robin.robinwebsite.storage.StorageService;

@Component
@Configuration
@ConfigurationProperties("file-schedule")
public class FileScheduler {
	
	private static final Logger log = LoggerFactory.getLogger(FileScheduler.class);
	
	private int maxtime = 300;
	
	private final FileEntryRepository resposity;
	private final StorageService storageService;
	
	public void setMaxtime(int maxtime) {
		this.maxtime = maxtime * 1000;
	}
	
	@Autowired
	public FileScheduler(FileEntryRepository responsity, StorageService storageService) {
		this.resposity = responsity;
		this.storageService = storageService;
	}
	
	@Scheduled(fixedRate = 5000)
	public void reportCurrentTime() {
		for (FileEntry e : resposity.findAll()) {
			if (new Date().getTime() - e.getCreateTime() >= Integer.valueOf(maxtime)) {
				log.info("Gonna delete " + e.getName());
				storageService.delete(e.getPath());
				resposity.delete(e);
			}
		}
	}
}
