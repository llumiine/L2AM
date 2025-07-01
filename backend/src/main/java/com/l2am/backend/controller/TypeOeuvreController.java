package com.l2am.backend.controller;

import com.l2am.backend.entity.TypeOeuvre;
import com.l2am.backend.service.TypeOeuvreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/types")
@CrossOrigin(origins = "*")
public class TypeOeuvreController {

    @Autowired
    private TypeOeuvreService typeOeuvreService;

    @GetMapping
    public List<TypeOeuvre> getAllTypes() {
        return typeOeuvreService.getAllTypes();
    }

    @GetMapping("/{id}")
    public Optional<TypeOeuvre> getTypeById(@PathVariable Long id) {
        return typeOeuvreService.getTypeById(id);
    }

    @PostMapping
    public TypeOeuvre createType(@RequestBody TypeOeuvre typeOeuvre) {
        return typeOeuvreService.createType(typeOeuvre);
    }

    @PutMapping("/{id}")
    public TypeOeuvre updateType(@PathVariable Long id, @RequestBody TypeOeuvre typeOeuvre) {
        return typeOeuvreService.updateType(id, typeOeuvre);
    }

    @DeleteMapping("/{id}")
    public void deleteType(@PathVariable Long id) {
        typeOeuvreService.deleteType(id);
    }
}
