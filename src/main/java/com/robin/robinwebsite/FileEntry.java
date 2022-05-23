package com.robin.robinwebsite;

import java.util.Collections;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.boot.cfgxml.spi.MappingReference.Type;
import org.springframework.stereotype.Indexed;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FileEntry {  
	private @Id String id;
	
	private String name = null;
	private long createTime = 0;
	private String path = null;
	private FileType type = null;

	private String children = "";
	
	public FileEntry(String name) {
	    this.id = IdGenerator.genrate();
		this.name = name;
		this.createTime = new Date().getTime();
		this.type = FileType.TYPE_FILE;
	}
	
	public FileEntry(String name, FileType type) {
	    this.id = IdGenerator.genrate();
		this.name = name;
		this.createTime = new Date().getTime();
		this.type = type;
	}
	
	public String getPath() {
		if (path == null) {
			path = "/" + id;
		}
		return path;
	}

	public boolean isFile() {
	    return type == FileType.TYPE_FILE;
	}
	
	public boolean isText() {
	    return type == FileType.TYPE_TEXT;
	}
	
	@Override
	public String toString() {
		return "File{" + "name : " + this.name + ", createTime : " + this.createTime +", type:" + this.type + "}";
	}
}
