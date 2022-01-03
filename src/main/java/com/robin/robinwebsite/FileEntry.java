package com.robin.robinwebsite;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class FileEntry {
	private 
		@Id 
		@GeneratedValue(generator="IdGenerater")
		@GenericGenerator(name="IdGenerater", strategy="com.robin.robinwebsite.IdGenerator")
		String id;
	private String name;
	private long createTime;
	private String path;
	
	public FileEntry() {}
	
	public FileEntry(String name, String path) {
		this.name = name;
		this.path = path;
		this.createTime = new Date().getTime();
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
	
	public String getPath() {
		return path;
	}
	
	@Override
	public String toString() {
		return "File{" + "name : " + this.name + ", createTime : " + this.createTime + "}";
	}
}
