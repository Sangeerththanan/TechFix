package com.techfix.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techfix.Model.Analytics;

@RestController
@RequestMapping("/analytics")
@CrossOrigin(origins = "http://localhost:3000")
public class AnalyticsController extends GenericController<Analytics, Long>{
	
}
