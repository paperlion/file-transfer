package com.robin.robinwebsite.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

public interface StorageService {

	void init();

	String store(String fid, MultipartFile file);
	
	String store(String fid, String text);

	Resource load(String fid);

	void deleteAll();

	void delete(String fid);

	String read(String path);

}
