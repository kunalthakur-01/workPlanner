package com.assignment.fsad.service;

import com.assignment.fsad.models.People;
import com.assignment.fsad.repository.PeopleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PeopleService {

    @Autowired
    private PeopleRepository peopleRepository;

    // Add a new person
    public People addPerson(People person) {
        return peopleRepository.save(person);
    }

    // Get all people
    public List<People> getAllPeople() {
        return peopleRepository.findAll();
    }
}
