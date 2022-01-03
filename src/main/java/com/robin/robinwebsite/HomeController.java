package com.robin.robinwebsite;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.robin.robinwebsite.storage.FileSystemStorageService;
import com.robin.robinwebsite.storage.StorageService;

@Controller
public class HomeController {
	
	private final FileEntryRepository repository;
	private final StorageService storageService;

	@Autowired
	public HomeController(FileEntryRepository repository,  FileSystemStorageService storageService) {
		this.repository = repository;
		this.storageService = storageService;
	}
	
	@RequestMapping("/")
	public String index() {
		return "index";
	}
	
	@GetMapping("/files/{fid}")
	@ResponseBody
	public FileEntry getFile(@PathVariable String fid) {
		return repository.findById(fid).orElse(null);
	}
	
	@GetMapping("/download/{fid}")
	@ResponseBody
	public ResponseEntity<Resource> downloadFile(@PathVariable String fid) {
		FileEntry fileEntry = repository.findById(fid).orElse(null);
		Resource file = storageService.load(fid);
		if (fileEntry != null) {
			return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
					"attachment; filename=\"" + fileEntry.getName() + "\"").body(file);
		}
		return null;
	}
	
	@RequestMapping("/files")
	@ResponseBody
	public Iterable<FileEntry> getFiles() {
		return repository.findAll();
	}
	
	@PostMapping("/file")
	@ResponseBody
	public String uploadFile(@RequestParam("file") MultipartFile file) {
		String fileName = file.getOriginalFilename();
		FileEntry fileEntry = new FileEntry(fileName, "/" + fileName);
		repository.save(fileEntry);
		this.storageService.store(fileEntry.getId(), file);
		return fileEntry.getId();
	}
	
}
