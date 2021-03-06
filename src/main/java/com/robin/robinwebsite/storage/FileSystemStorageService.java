package com.robin.robinwebsite.storage;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileSystemStorageService implements StorageService {

	private final Path rootLocation;

	@Autowired
	public FileSystemStorageService(StorageProperties properties) {
		this.rootLocation = Paths.get(properties.getLocation());
	}

	// store a file with a given fid and return its path
	@Override
	public String store(String fid, MultipartFile file) {
		try {
			Path destinationFile = this.rootLocation.resolve(fid).toAbsolutePath();
			if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
				// This is a security check
				throw new StorageException(
						"Cannot store file outside current directory.");
			}
			try (InputStream inputStream = file.getInputStream()) {
				Files.copy(inputStream, destinationFile,
					StandardCopyOption.REPLACE_EXISTING);
			}
			return rootLocation.resolve(fid).toString();
		}
		catch (IOException e) {
			throw new StorageException("Failed to store file.", e);
		}
	}
	
	@Override
	public String store(String fid, String text) {
		try {
			Path destinationFile = this.rootLocation.resolve(fid).toAbsolutePath();
			if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
				// This is a security check
				throw new StorageException(
						"Cannot store file outside current directory.");
			}
			File newFile = destinationFile.toFile();
			BufferedWriter writer = new BufferedWriter(new FileWriter(newFile));
			writer.write(text);
			writer.close();
			return rootLocation.resolve(fid).toString();
		}
		catch (IOException e) {
			throw new StorageException("Failed to store text.", e);
		}
	}

	// load a file with given path
	@Override
	public Resource load(String path) {
		Path file = this.rootLocation.resolveSibling(path);
		try {
			Resource resource = new UrlResource(file.toUri());
			if (resource.exists() || resource.isReadable()) {
				return resource;
			}
			else {
				throw new StorageFileNotFoundException(
						"Could not read file: " + path);

			}
		}
		catch (MalformedURLException e) {
			throw new StorageFileNotFoundException("Could not read file: " + file.toString(), e);
		}
	}
	
	// read file context with given path
	public String read(String path) {
		Path file = this.rootLocation.resolveSibling(path);
		try {
			File textFile = file.toFile();
			BufferedReader br = new BufferedReader(new FileReader(textFile));
			StringBuilder sb = new StringBuilder();
			String line;
			while ((line=br.readLine()) != null) {
				sb.append(line + "\n");
			}
			br.close();
			return sb.toString();
		}
		catch (IOException e) {
			throw new StorageFileNotFoundException("Could not read file: " + file.toString(), e);
		}
	}

	@Override
	public void deleteAll() {
		FileSystemUtils.deleteRecursively(rootLocation.toFile());
	}
	
	@Override
	public void delete(String path) {
		Path file = this.rootLocation.resolveSibling(path);
		try {
			Resource resource = new UrlResource(file.toUri());
			if (resource.exists()) {
				FileSystemUtils.deleteRecursively(file);
			}
			else {
				throw new StorageFileNotFoundException(
						"Could not delete file: " + path);
			}
		}
		catch (MalformedURLException e) {
			throw new StorageFileNotFoundException("Could not read file: " + file.toString(), e);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public void init() {
		try {
			Files.createDirectories(rootLocation);
		}
		catch (IOException e) {
			throw new StorageException("Could not initialize storage", e);
		}
	}

}

