package com.cognizant.loan.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.loan.model.Loan;

@RestController
public class LoanController {

    @GetMapping("/loans/{number}")
    public Loan getLoan(@PathVariable String number) {
        // Sample data - in real application, would fetch from database
        if ("H00987987972342".equals(number)) {
            return new Loan(number, "Car", 400000, 3258, 18);
        }
        return new Loan(number, "Home", 5000000, 45000, 180);
    }

}
