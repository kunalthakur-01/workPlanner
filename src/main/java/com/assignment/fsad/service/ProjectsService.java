package com.assignment.fsad.service;

import com.assignment.fsad.models.Projects;
import com.assignment.fsad.repository.ProjectsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectsService {

    @Autowired
    private ProjectsRepository projectsRepository;

    public Projects createProject(Projects project) {
        return projectsRepository.save(project);
    }

    public List<Projects> getAllProjects() {
        return projectsRepository.findAll();
    }

    public Projects getProjectById(Long id) {
        return projectsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
    }
}
