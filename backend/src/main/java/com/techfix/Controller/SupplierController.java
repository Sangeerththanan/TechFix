package com.techfix.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techfix.Model.Supplier;

@RestController
@RequestMapping("/supplier")
@CrossOrigin(origins = "http://localhost:3000")
public class SupplierController extends GenericController<Supplier, Long>{

}
