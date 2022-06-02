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
    
//    private final ConcurrentHashMap<String, FileRecording> map;
    
//    private class FileRecording {
//        int received = 0;
//        final int total;
//        String[] files;
//        long createTime;
//        String id;
//        
//        FileRecording(int total, String id){
//            this.total = total;
//            files = new String[total];
//            createTime = new Date().getTime();
//            this.id = id;
//        }
//        
//        
//        public synchronized int record(String fileId, String group, int index, int total) {
//            if (this.total != total) {
//                return -1;
//            }
//            try {
//                files[index] = fileId;
//            } catch (Exception e) {
//                received ++;
//                return -1;
//            } 
//            received ++;
//            return 0;
//        }
//        
//        public String getFiles() {
//            return String.join(":", files);
//        }
//        
//        public long getCreateTime() {
//            return createTime;
//        }
//        
//        public String getId() {
//            return id;
//        }
//        
//        public boolean finished() {
//            return received == total;
//        }
//    }
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
//        if (index < 0 || index >= total || total <= 0) 
//            return "Error";
        // meet the group for first time
//        if (!map.containsKey(group) || new Date().getTime() - map.get(group).getCreateTime() > 3600000) {
//            FileEntry groupEntry = new FileEntry("GROUP-" + group, FileType.TYPE_GROUP);
//            repository.save(groupEntry);
//            map.put(group, new FileRecording(total, groupEntry.getId()));
//        }
//        String id = map.get(group).getId();
//        int ret = map.get(group).record(fileId, group, index, total);
        
        FileEntry groupEntry = repository.findById(group).get();
        try {
            groupEntry.setChildren(record(groupEntry.getChildren(), index, fileId));
            repository.save(groupEntry);
        } catch (Exception e) {
            return false;
        }
        
//        if (map.get(group).finished()) {
//            map.remove(group);
//        }
//        // meet the group for last time
//        if (ret == 0) {
//            return id;
//        } else {
//            return "Error";
//        }
        
        return true;
    }
}
