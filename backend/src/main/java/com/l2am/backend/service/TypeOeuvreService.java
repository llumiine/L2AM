package com.l2am.backend.service;

import com.l2am.backend.entity.TypeOeuvre;
import com.l2am.backend.repository.TypeOeuvreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TypeOeuvreService {

    @Autowired
    private TypeOeuvreRepository typeOeuvreRepository;

    public List<TypeOeuvre> getAllTypes() {
        return typeOeuvreRepository.findAll();
    }

    public Optional<TypeOeuvre> getTypeById(Long id) {
        return typeOeuvreRepository.findById(id);
    }

    public TypeOeuvre createType(TypeOeuvre typeOeuvre) {
        return typeOeuvreRepository.save(typeOeuvre);
    }

    public void deleteType(Long id) {
        typeOeuvreRepository.deleteById(id);
    }

    public TypeOeuvre updateType(Long id, TypeOeuvre updatedType) {
        return typeOeuvreRepository.findById(id).map(t -> {
            return typeOeuvreRepository.save(t);
        }).orElseGet(() -> {
            return typeOeuvreRepository.save(updatedType);
        });
    }
}
