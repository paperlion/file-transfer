package com.robin.robinwebsite;

import java.io.BufferedReader;
import java.util.ArrayList;
import java.util.List;
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
	public ResponseEntity<List<FileEntry>> getFile(@PathVariable String fid) {
	    FileEntry file = repository.findById(fid).orElse(null);
	    List<FileEntry> fileList = new ArrayList<>();
	    if (file == null) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(fileList);
	    } else {
	        if (file.getType() == FileType.TYPE_GROUP) {
	            String[] files = file.getChildren().split(":");
	            for (String child : files) {
	                if (child != null && !child.equals("null")) {
	                    FileEntry childEntry = repository.findById(child).orElse(null);
	                    if (childEntry != null) {
	                        fileList.add(childEntry);
	                    }
	                }
	            }
	        } else {
	            fileList.add(file);
	        }
	        return ResponseEntity.ok(fileList);
	    }
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
	public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, 
	        @RequestParam(required=false) String group,
	        @RequestParam(required=false) String index) {
		String fileName = file.getOriginalFilename();
		FileEntry fileEntry = new FileEntry(fileName);
		fileEntry.setPath(this.storageService.store(fileEntry.getId(), file));
		//save to save the change to path
		repository.save(fileEntry);
		if (group != null) {
		    boolean ret = this.groupSavingService.addFileToGroup(fileEntry.getId(), group, Integer.valueOf(index));
		    if (!ret) {
		        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot store the file");
		    }
		}	
		return ResponseEntity.ok(fileEntry.getId());
	}
	
	@GetMapping("/api/file-group")
    @ResponseBody
    public ResponseEntity<String> registerFilesGroup(@RequestParam int total) {
	    if (total >= 2) {
	        FileEntry groupEntry = new FileEntry("FilesGroup", FileType.TYPE_GROUP);
	        groupEntry.setChildren(String.join(":", new String[total]));
	        repository.save(groupEntry);
	        return ResponseEntity.ok(groupEntry.getId());
	    } else {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("A group should have 2 or more files");
	    }
        
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
