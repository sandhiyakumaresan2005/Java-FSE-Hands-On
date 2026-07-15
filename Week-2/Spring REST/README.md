# Spring REST Module - Complete Hands-on Walkthrough

This document contains the complete walkthrough and SME details for all hands-on exercises in the **Spring REST** module.

---

## 1. Directory Structure & Project Layout (ex1)

The project `spring-learn` follows the standard Maven directory layout:

*   `src/main/java`: Contains the application source code (Java classes). All controllers, services, models, and launchers reside here under `com.cognizant.springlearn`.
*   `src/main/resources`: Contains application configurations (`application.properties`) and XML contexts (`country.xml`).
*   `src/test/java`: Contains unit and integration test source code.
*   `pom.xml`: The Maven Project Object Model file declaring dependencies and build plugins.

### 1.1 Spring Boot Parent & Dependency Tree Hierarchy
By inheriting from `spring-boot-starter-parent` in `pom.xml`, we import standard dependency management. Adding `spring-boot-starter-webmvc` transitively imports:
*   `spring-boot-starter`: Core configurations and logging (SLF4J/Logback).
*   `spring-boot-starter-tomcat`: Embedded servlet container (Tomcat).
*   `spring-web` & `spring-webmvc`: Web framework utilities and MVC mappings.
*   `spring-boot-starter-jackson`: JSON processor for request/response serialization.

---

## 2. Spring Core - Load Country from Spring Configuration XML (ex4)

In this exercise, we configure and load a `Country` bean from an XML configuration file using Spring's `ApplicationContext`.

### 2.1 Configuration
*   **Model Class**: [Country.java](file:///c:/Users/logan/Desktop/CTS/CTS/Spring%20REST/spring-learn/src/main/java/com/cognizant/springlearn/Country.java) defines `code` and `name` properties with debug logging in its constructor and accessors.
*   **XML Configuration**: [country.xml](file:///c:/Users/logan/Desktop/CTS/CTS/Spring%20REST/spring-learn/src/main/resources/country.xml) defines multiple country beans and an alias mapping for backward compatibility:
    ```xml
    <bean id="in" class="com.cognizant.springlearn.Country">
        <property name="code" value="IN" />
        <property name="name" value="India" />
    </bean>
    <alias name="in" alias="country"/>
    ```
*   **Launcher**: [SpringLearnApplication.java](file:///c:/Users/logan/Desktop/CTS/CTS/Spring%20REST/spring-learn/src/main/java/com/cognizant/springlearn/SpringLearnApplication.java) initializes `ClassPathXmlApplicationContext` and retrieves the bean:
    ```java
    ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");
    Country country = context.getBean("country", Country.class);
    ```

### 2.2 Lifecycle & Logging Output
When loaded, the Spring container executes constructor injection:
```text
Inside Country Constructor.
Inside setCode() method: IN
Inside setName() method: India
Country : Country[code=IN, name=India]
```

---

## 3. Hello World RESTful Web Service (ex2(1))

We implement a simple GET endpoint at `/hello` returning `"Hello World!!"` with entry/exit log statements.

*   **Endpoint URL**: `GET http://localhost:8083/hello`
*   **Controller**: [HelloController.java](file:///c:/Users/logan/Desktop/CTS/CTS/Spring%20REST/spring-learn/src/main/java/com/cognizant/springlearn/controller/HelloController.java)
*   **Response Headers**:
    *   `Content-Type: text/plain;charset=UTF-8` (specifies a plain text response body encoded in UTF-8).
    *   `Content-Length: 13` (size of the message in bytes).
*   **Logs Output**:
    ```text
    Start: sayHello() execution
    End: sayHello() execution
    ```

---

## 4. REST - Country Web Service (ex2(2))

We implement a REST endpoint `/country` that loads the India bean from the Spring XML configuration and returns it in JSON format.

*   **Endpoint URL**: `GET http://localhost:8083/country`
*   **Controller**: [CountryController.java](file:///c:/Users/logan/Desktop/CTS/CTS/Spring%20REST/spring-learn/src/main/java/com/cognizant/springlearn/controller/CountryController.java)
*   **JSON Conversion**: Because the controller is annotated with `@RestController` (applying `@ResponseBody`), Spring uses the default **Jackson JSON Processor (`MappingJackson2HttpMessageConverter`)** HTTP Message Converter.
*   Jackson reflects on the returned `Country` object, calls its public getter methods (`getCode()` and `getName()`) to read values (visible in our logs), and serializes them as a JSON string key-value pair.
*   **Response Headers**:
    *   `Content-Type: application/json` (automatically set to inform the browser/Postman that the payload is JSON-formatted).
    *   `Content-Length: 28`
*   **Logs Output**:
    ```text
    Start: getCountryIndia() execution
    Inside Country Constructor.
    Inside setCode() method: IN
    Inside setName() method: India
    End: getCountryIndia() execution
    Inside getCode() method.
    Inside getName() method.
    ```

---

## 5. REST - Get country based on country code (ex2(3))

We implement a REST endpoint `/countries/{code}` that loads the country list from XML configuration and returns a specific country based on a case-insensitive code search.

*   **Endpoint URL**: `GET http://localhost:8083/countries/{code}` (e.g. `http://localhost:8083/countries/de` or `http://localhost:8083/countries/De`)
*   **Controller Mapping**:
    ```java
    @GetMapping("/countries/{code}")
    public Country getCountry(@PathVariable("code") String code) {
        return countryService.getCountry(code);
    }
    ```
*   **Service Layer**: [CountryService.java](file:///c:/Users/logan/Desktop/CTS/CTS/Spring%20REST/spring-learn/src/main/java/com/cognizant/springlearn/service/CountryService.java) implements lambda-based filtering to locate countries case-insensitively from the parsed XML bean list.
*   **country.xml updates**:
    Created beans for multiple countries (`us`, `de`, `in`, `jp`) and aggregated them into a `countryList` ArrayList bean:
    ```xml
    <bean id="countryList" class="java.util.ArrayList">
        <constructor-arg>
            <list>
                <ref bean="us" />
                <ref bean="de" />
                <ref bean="in" />
                <ref bean="jp" />
            </list>
        </constructor-arg>
    </bean>
    ```
*   **Sample Response** (for `/countries/de` or `/countries/De`):
    ```json
    {
      "code": "DE",
      "name": "Germany"
    }
    ```
