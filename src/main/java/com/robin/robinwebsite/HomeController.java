package com.robin.robinwebsite;

import java.io.BufferedReader;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
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

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Slf4j
@Controller
public class HomeController {
    private final static Logger logger = LoggerFactory.getLogger(HomeController.class);
	private final FileEntryRepository repository;
	private final StorageService storageService;
	private final GroupSavingService groupSavingService;

	@Autowired
	public HomeController(FileEntryRepository repository,  FileSystemStorageService storageService,
	        GroupSavingService groupSavingService) {
		this.repository = repository;
		this.storageService = storageService;
		this.groupSavingService = groupSavingService;
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
	public ResponseEntity<Object> downloadFile(@PathVariable String fid) {
		FileEntry fileEntry = repository.findById(fid).orElse(null);
		if (fileEntry != null) {
			if (fileEntry.isFile()) {
				Resource file = storageService.load(fileEntry.getPath());
				return ResponseEntity.ok()
						.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileEntry.getName() + "\"")
						.header(HttpHeaders.CONTENT_TYPE, "application/octet-stream")
						.body(file);
			} else if (fileEntry.isText()){
				String text = storageService.read(fileEntry.getPath());
				return ResponseEntity.ok()
						.header(HttpHeaders.CONTENT_TYPE, "text/plain")
						.body(text);
			}
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
	public String uploadFile(@RequestParam("file") MultipartFile file, 
	        @RequestParam String group,
	        @RequestParam int index,
	        @RequestParam int total) {
		String fileName = file.getOriginalFilename();
		FileEntry fileEntry = new FileEntry(fileName);
		fileEntry.setPath(this.storageService.store(fileEntry.getId(), file));
		//save to save the change to path
		repository.save(fileEntry);
		if (group != null && total != 1) {
		    String ret = this.groupSavingService.addFileToGroup(fileEntry.getId(), group, index, total);
		    return ret;
		}	
		return fileEntry.getId();
	}
	
	@PostMapping("/api/text")
	@ResponseBody
	public String uploadText(@RequestParam("text") String text) {
		FileEntry textEntry = new FileEntry("Text", FileType.TYPE_TEXT);
		textEntry.setPath(this.storageService.store(textEntry.getId(), text));
		repository.save(textEntry);
		return textEntry.getId();	
	}
	
	@ExceptionHandler(MaxUploadSizeExceededException.class)
	@ResponseBody
	public ResponseEntity<String> handleIOException(MaxUploadSizeExceededException ex, HttpServletRequest request) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File exceeds limit");
	}
	
}
