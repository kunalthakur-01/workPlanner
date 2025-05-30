package com.assignment.fsad.controller;

import com.assignment.fsad.models.Projects;
import com.assignment.fsad.service.ProjectsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
@CrossOrigin("*")
public class ProjectsController {

    @Autowired
    private ProjectsService projectsService;

    @PostMapping("/create")
    public ResponseEntity<Projects> createProject(@RequestBody Projects project) {
        Projects newProject = projectsService.createProject(project);
        return ResponseEntity.created(URI.create("/api/v1/projects/" + newProject.getId())).body(newProject);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Projects>> getAllProjects() {
        return ResponseEntity.ok(projectsService.getAllProjects());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Projects> getProjectById(@PathVariable Long id) {
        return ResponseEntity.ok(projectsService.getProjectById(id));
    }

    // ✅ Test route to check if the controller is working
    @GetMapping("/test")
    public String testRoute() {
        return "ProjectsController is working!";
    }
}
