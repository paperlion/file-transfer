package com.robin.robinwebsite;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.boot.cfgxml.spi.MappingReference.Type;

@Entity
public class FileEntry {
	private static String TYPE_FILE = "File";
	private static String TYPE_TEXT = "Text";
	private 
		@Id 
		@GeneratedValue(generator="IdGenerater")
		@GenericGenerator(name="IdGenerater", strategy="com.robin.robinwebsite.IdGenerator")
		String id;
	private String name;
	private long createTime;
	private String path;
	private String type;
	
	public FileEntry() {}
	
	public FileEntry(String name) {
		this.name = name;
		this.createTime = new Date().getTime();
		this.type = TYPE_FILE;
	}
	
	public FileEntry(String name, String path) {
		this.name = name;
		this.path = path;
		this.createTime = new Date().getTime();
		this.type = TYPE_FILE;
	}
	
	public FileEntry(String name, boolean isFile) {
		this.name = name;
		this.createTime = new Date().getTime();
		this.type = isFile? TYPE_FILE: TYPE_TEXT;
	}
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public long getCreateTime() {
		return createTime;
	}
	
	public void setPath(String path) {
		this.path = path;
	}
	
	public String getPath() {
		if (path == null) {
			path = "/" + id;
		}
		return path;
	}
	
	public String getType() {
		return type;
	}
	
	public void setType(String type) {
		this.type = type;
	}
	public boolean isFile() {
		return type == TYPE_FILE;
	}
	
	public boolean isText() {
		return type == TYPE_TEXT;
	}
	
	@Override
	public String toString() {
		return "File{" + "name : " + this.name + ", createTime : " + this.createTime +", type:" + this.type + "}";
	}
}
