package com.robin.robinwebsite;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

//abandon and save for future use
public class RedirectToIndexFilter implements Filter {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public void doFilter(ServletRequest request, ServletResponse response,
            FilterChain chain) throws IOException, ServletException{

        HttpServletRequest req = (HttpServletRequest) request;
        String requestURI = req.getRequestURI();
        
        chain.doFilter(request, response);

//        if (requestURI.startsWith("/api")) {
//            chain.doFilter(request, response);
//            return;
//        }
//
//        if (requestURI.startsWith("/rct")) {
//            chain.doFilter(request, response);
//            return;
//        }

        // all requests not api or static will be forwarded to index page. 
//        request.getRequestDispatcher("/").forward(request, response);
    }

}
