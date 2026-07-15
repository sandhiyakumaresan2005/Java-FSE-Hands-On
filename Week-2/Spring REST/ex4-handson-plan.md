# Implementation Plan - Spring Core Load Country XML (ex4 handson)

This plan outlines the steps to configure and load a `Country` bean from an XML configuration file (`country.xml`) using Spring's `ApplicationContext`, with trace logs for constructor and accessor invocations.

## User Review Required

> [!IMPORTANT]
> To ensure `LOGGER.debug` statements in the `Country` constructor, getters, and setters print to the console, we need to explicitly enable `DEBUG` logging for the package `com.cognizant.springlearn` in `application.properties`. Without this optimization, debug logs will not be visible on standard startup.

## Proposed Changes

We will modify the existing `spring-learn` project inside `c:/Users/logan/Desktop/CTS/CTS/Spring REST/spring-learn/`.

### Component: Spring Core Bean & Configuration

#### [NEW] [Country.java](file:///c:/Users/logan/Desktop/CTS/CTS/Spring%20REST/spring-learn/src/main/java/com/cognizant/springlearn/Country.java)
Create the `Country` model class with SLF4J debug logs inside the constructor, getters, and setters.
```java
package com.cognizant.springlearn;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Country {
    private static final Logger LOGGER = LoggerFactory.getLogger(Country.class);
    
    private String code;
    private String name;

    public Country() {
        LOGGER.debug("Inside Country Constructor.");
    }

    public String getCode() {
        LOGGER.debug("Inside getCode() method.");
        return code;
    }

    public void setCode(String code) {
        LOGGER.debug("Inside setCode() method: {}", code);
        this.code = code;
    }

    public String getName() {
        LOGGER.debug("Inside getName() method.");
        return name;
    }

    public void setName(String name) {
        LOGGER.debug("Inside setName() method: {}", name);
        this.name = name;
    }

    @Override
    public String toString() {
        return "Country[code=" + code + ", name=" + name + "]";
    }
}
```

#### [NEW] [country.xml](file:///c:/Users/logan/Desktop/CTS/CTS/Spring%20REST/spring-learn/src/main/resources/country.xml)
Create the Spring XML configuration file declaring the `Country` bean.
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="country" class="com.cognizant.springlearn.Country">
        <property name="code" value="IN" />
        <property name="name" value="India" />
    </bean>

</beans>
```

#### [MODIFY] [application.properties](file:///c:/Users/logan/Desktop/CTS/CTS/Spring%20REST/spring-learn/src/main/resources/application.properties)
Add logging configuration to enable `DEBUG` log levels for the project package.
```ini
logging.level.com.cognizant.springlearn=DEBUG
```

#### [MODIFY] [SpringLearnApplication.java](file:///c:/Users/logan/Desktop/CTS/CTS/Spring%20REST/spring-learn/src/main/java/com/cognizant/springlearn/SpringLearnApplication.java)
Implement the `displayCountry()` method that loads `country.xml`, retrieves the bean, and prints country details using a debugger logger. Invoke it in the `main` method.

```java
package com.cognizant.springlearn;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

@SpringBootApplication
public class SpringLearnApplication {

	private static final Logger LOGGER = LoggerFactory.getLogger(SpringLearnApplication.class);

	public static void main(String[] args) {
		LOGGER.info("Inside main method of SpringLearnApplication");
		SpringApplication.run(SpringLearnApplication.class, args);
		displayCountry();
		LOGGER.info("SpringLearnApplication started successfully");
	}

	public static void displayCountry() {
		LOGGER.info("Inside displayCountry method");
		ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");
		Country country = context.getBean("country", Country.class);
		LOGGER.debug("Country : {}", country.toString());
	}

}
```

---

## Verification Plan

### Automated / Manual Tests
- Run `.\mvnw clean package` to compile and build the package.
- Run `.\mvnw spring-boot:run` to start the application and inspect console logs.
- Verify logs contain the constructor and setter invocations due to Spring context loading `country.xml`:
  1. `Inside Country Constructor.`
  2. `Inside setCode() method: IN`
  3. `Inside setName() method: India`
  4. `Inside displayCountry method`
  5. `Inside getCode() method.` / `Inside getName() method.` (during `toString()`)
  6. `Country : Country[code=IN, name=India]`
