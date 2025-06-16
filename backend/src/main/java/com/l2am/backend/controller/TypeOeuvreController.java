package com.l2am.backend.controller;

import com.l2am.backend.model.TypeOeuvre;
import com.l2am.backend.repository.TypeOeuvreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/type-oeuvres")
@CrossOrigin
public class TypeOeuvreController {

    @Autowired
    private TypeOeuvreRepository typeOeuvreRepository;

    @GetMapping
    public List<TypeOeuvre> getAll() {
        return typeOeuvreRepository.findAll();
    }

    @PostMapping
    public TypeOeuvre create(@RequestBody TypeOeuvre typeOeuvre) {
        return typeOeuvreRepository.save(typeOeuvre);
    }
}
