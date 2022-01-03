package com.robin.robinwebsite;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

//@RepositoryRestResource(exported = false)
public interface FileEntryRepository extends CrudRepository<FileEntry, String>{
}
