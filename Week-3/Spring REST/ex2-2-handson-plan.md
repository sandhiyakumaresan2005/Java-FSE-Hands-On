# Implementation Plan - Country Web Service (ex2(2) handson)

This plan outlines the steps to implement a GET endpoint at `/country` returning the configured India bean from XML configuration as JSON.

## User Review Required

> [!NOTE]
> The controller will load the bean from `country.xml` (which contains the code `"IN"` and name `"India"`) and return it. Spring Boot's default HTTP message converter (Jackson) will automatically serialize this Java bean into JSON.

## Proposed Changes

We will create a new controller class in the `spring-learn` Maven project.

### Component: Spring REST Layer

#### [NEW] [CountryController.java](file:///c:/Users/logan/Desktop/CTS/CTS/Spring%20REST/spring-learn/src/main/java/com/cognizant/springlearn/controller/CountryController.java)
Create the `CountryController` REST Controller.

```java
package com.cognizant.springlearn.controller;

import com.cognizant.springlearn.Country;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CountryController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CountryController.class);

    @RequestMapping(value = "/country", method = RequestMethod.GET)
    public Country getCountryIndia() {
        LOGGER.info("Start: getCountryIndia() execution");
        ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");
        Country country = context.getBean("country", Country.class);
        LOGGER.info("End: getCountryIndia() execution");
        return country;
    }
}
```

---

## Verification Plan

### Automated / Manual Tests
- Run `.\mvnw clean package` to build the application and compile `CountryController`.
- Start the server using `.\mvnw spring-boot:run`.
- Verify the REST service:
  - Run the native `curl.exe -i http://localhost:8083/country`
  - Verify that the response body is the JSON:
    ```json
    {
      "code": "IN",
      "name": "India"
    }
    ```
  - Verify that the Response Header `Content-Type` is set to `application/json` (automatically set by Jackson serialization).
