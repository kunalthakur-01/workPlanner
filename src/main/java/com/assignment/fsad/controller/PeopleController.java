package com.assignment.fsad.controller;

import com.assignment.fsad.models.People;
import com.assignment.fsad.service.PeopleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/people")
@CrossOrigin("*")
public class PeopleController {

    @Autowired
    private PeopleService peopleService;

    // Test route to check if controller is working
    @GetMapping("/test")
    public ResponseEntity<String> testController() {
        return ResponseEntity.ok("People Controller is working!");
    }

    // Add a person
    @PostMapping("/add")
    public ResponseEntity<People> addPerson(@RequestBody People person) {
        return ResponseEntity.ok(peopleService.addPerson(person));
    }

    // Get all people
    @GetMapping("/all")
    public ResponseEntity<List<People>> getAllPeople() {
        return ResponseEntity.ok(peopleService.getAllPeople());
    }
}
