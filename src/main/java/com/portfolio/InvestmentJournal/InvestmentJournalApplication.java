package com.portfolio.InvestmentJournal;

import java.util.Collections;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController

public class InvestmentJournalApplication {

	public static void main(String[] args) {
		SpringApplication.run(InvestmentJournalApplication.class, args);
	}

	@RequestMapping("/token")
	public Map<String, String> token (HttpSession session){
		return Collections.singletonMap("token", session.getId());
	}
}
