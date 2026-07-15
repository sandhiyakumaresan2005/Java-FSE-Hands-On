package com.cognizant.account.controller;

import com.cognizant.account.model.Account;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {

    @GetMapping("/accounts/{number}")
    public Account getAccount(@PathVariable String number) {
        // Sample data - in real application, would fetch from database
        if ("00987987973432".equals(number)) {
            return new Account(number, "Savings", 234343);
        }
        return new Account(number, "Current", 100000);
    }

}
