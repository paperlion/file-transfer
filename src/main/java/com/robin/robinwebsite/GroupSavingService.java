package com.robin.robinwebsite;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

@Component
public class GroupSavingService {
    private final static Logger logger = LoggerFactory.getLogger(GroupSavingService.class);
    
    private final FileEntryRepository repository;
    
    @Autowired
    public GroupSavingService(FileEntryRepository repository) {
        this.repository = repository;
//        map = new ConcurrentHashMap<>();
    }
    
    private String record(String origin, int index, String file) {
        String[] split = origin.split(":");
        split[index] = file;
        return String.join(":", split);
    }
    
    /***
     * return id if sucess, "Error" if failed
     * @param fileId
     * @param group
     * @param index
     * @param total
     * @return
     */
    public synchronized boolean addFileToGroup(String fileId, String group, int index) {
        FileEntry groupEntry = repository.findById(group).get();
        try {
            groupEntry.setChildren(record(groupEntry.getChildren(), index, fileId));
            repository.save(groupEntry);
        } catch (Exception e) {
            return false;
        }
        
        return true;
    }
}
