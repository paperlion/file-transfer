package com.robin.robinwebsite;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

public interface FileEntryRepository extends CrudRepository<FileEntry, String>{
    
}
