# Implementation Plan - Hello World RESTful Web Service (ex2(1) handson)

This plan details the steps to implement a GET endpoint at `/hello` returning `"Hello World!!"` with entry/exit log statements.

## User Review Required

> [!NOTE]
> The original instruction specifies using port `8083` for the sample request (`http://localhost:8083/hello`). We will update `server.port` from `8081` to `8083` in `application.properties` to align with this requirement.

## Proposed Changes

We will modify and add classes within the `spring-learn` Maven project.

### Component: Spring MVC/REST Layer

#### [NEW] [HelloController.java](file:///c:/Users/logan/Desktop/CTS/CTS/Spring%20REST/spring-learn/src/main/java/com/cognizant/springlearn/controller/HelloController.java)
Create the REST Controller in the package `com.cognizant.springlearn.controller`.

```java
package com.cognizant.springlearn.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    private static final Logger LOGGER = LoggerFactory.getLogger(HelloController.class);

    @GetMapping("/hello")
    public String sayHello() {
        LOGGER.info("Start: sayHello() execution");
        String message = "Hello World!!";
        LOGGER.info("End: sayHello() execution");
        return message;
    }
}
```

#### [MODIFY] [application.properties](file:///c:/Users/logan/Desktop/CTS/CTS/Spring%20REST/spring-learn/src/main/resources/application.properties)
Update the application server port to `8083`.
```ini
spring.application.name=spring-learn
server.port=8083
logging.level.com.cognizant.springlearn=DEBUG
```

---

## Verification Plan

### Automated / Manual Tests
- Run `.\mvnw clean package` to build the application and download any required updates.
- Start the server using `.\mvnw spring-boot:run`.
- Verify the REST service:
  - Open terminal and fetch URL: `curl http://localhost:8083/hello`
  - Or use the `browser_subagent` to open `http://localhost:8083/hello` and record the result.
- Verify logs print the start and end execution statements:
  `Start: sayHello() execution`
  `End: sayHello() execution`
