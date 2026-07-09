package com.library.service;

import com.library.repository.BookRepository;

public class BookService {

    private BookRepository constructorRepository;
    private BookRepository setterRepository;

    public BookService(BookRepository constructorRepository) {
        this.constructorRepository = constructorRepository;
    }

    public void setSetterRepository(BookRepository setterRepository) {
        this.setterRepository = setterRepository;
    }

    public void display() {
        System.out.println("Book Service is Working");

        System.out.println("Constructor Injection:");
        constructorRepository.display();

        System.out.println("Setter Injection:");
        setterRepository.display();
    }

}