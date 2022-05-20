package com.robin.jacksontest;

import java.io.IOException;
import java.io.OutputStream;

import org.junit.jupiter.api.Test;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;

public class TestJackson {
    @Test
    public void test() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setSerializationInclusion(Include.NON_NULL);
        TestClass1 car = new TestClass1("yellow", "white");
        TestClass2 car2 = new TestClass2("black", "green");
        String out = null;
        try {
            ObjectReader objectReader =  objectMapper.readerForUpdating(car);
            TestClass1 carnew = objectReader.readValue(objectMapper.writeValueAsString(car2), TestClass1.class);
            System.out.println(carnew.getA());
            System.out.println(carnew.getB());
            out = objectMapper.writeValueAsString(carnew);
        } catch (JsonMappingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        System.out.println(out);
    }
    
    @Test
    public void test2() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setSerializationInclusion(Include.NON_NULL);
        TestClass2 car2 = new TestClass2();
        String out = null;
        try {
            TestClass1 carnew = objectMapper.convertValue(car2, TestClass1.class);
            System.out.println(carnew.getA());
            System.out.println(carnew.getB());
            out = objectMapper.writeValueAsString(carnew);
        } catch (JsonMappingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        System.out.println(out);
    }
}
