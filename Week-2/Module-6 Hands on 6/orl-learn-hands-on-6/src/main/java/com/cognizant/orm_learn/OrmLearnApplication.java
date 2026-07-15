
package com.cognizant.orm_learn;

import com.cognizant.orm_learn.service.exception.CountryNotFoundException;
import java.util.List;

import org.slf4j.Logger;

import org.slf4j.LoggerFactory;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.ApplicationContext;

import com.cognizant.orm_learn.model.Country;
import com.cognizant.orm_learn.service.CountryService;

@SpringBootApplication

public class OrmLearnApplication {

private static final Logger LOGGER =

LoggerFactory.getLogger(OrmLearnApplication.class);

private static CountryService countryService;

public static void main(String[] args) throws CountryNotFoundException {

    ApplicationContext context =
            SpringApplication.run(OrmLearnApplication.class, args);

    countryService = context.getBean(CountryService.class);

    LOGGER.info("Inside main");

    testGetAllCountries();

    getCountryTest();   // <-- New method call
}
private static void getCountryTest() throws CountryNotFoundException {

    LOGGER.info("Start");

    Country country = countryService.findCountryByCode("IN");

    LOGGER.debug("Country={}", country);

    LOGGER.info("End");
}
private static void testGetAllCountries() {

LOGGER.info("Start");

List<Country> countries = countryService.getAllCountries();

LOGGER.debug("Countries={}", countries);

LOGGER.info("End");

}

}