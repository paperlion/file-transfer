package com.robin.robinwebsite;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.ClassUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
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
	
	@RequestMapping(value = { "/", "/{x:[\\w\\-]+}", "/{x:^(?!api$).*$}/**/{y:[\\w\\-]+}" })
	public String index() {
		return "index";
	}
	
	@GetMapping("/api/files/{fid}")
	@ResponseBody
	public FileEntry getFile(@PathVariable String fid) {
		return repository.findById(fid).orElse(new FileEntry());
	}
	
	@GetMapping("/api/download/{fid}")
	@ResponseBody
	public ResponseEntity<Resource> downloadFile(@PathVariable String fid) {
		FileEntry fileEntry = repository.findById(fid).orElse(null);
		if (fileEntry != null) {
			Resource file = storageService.load(fileEntry.getPath());
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileEntry.getName() + "\"")
					.header(HttpHeaders.CONTENT_TYPE, "application/octet-stream")
					.body(file);
		}
		return null;
	}
	
	@RequestMapping("/api/files")
	@ResponseBody
	public Iterable<FileEntry> getFiles() {
		return repository.findAll();
	}
	
	@PostMapping("/api/file")
	@ResponseBody
	public String uploadFile(@RequestParam("file") MultipartFile file) {
		String fileName = file.getOriginalFilename();
		FileEntry fileEntry = new FileEntry(fileName);
		//first save to get the id
		repository.save(fileEntry);
		fileEntry.setPath(this.storageService.store(fileEntry.getId(), file));
		//second save to save the change to path
		repository.save(fileEntry);
		return fileEntry.getId();
	}
	
	@ExceptionHandler(MaxUploadSizeExceededException.class)
	@ResponseBody
	public ResponseEntity<String> handleIOException(MaxUploadSizeExceededException ex, HttpServletRequest request) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File exceeds limit");
	}
	
}
