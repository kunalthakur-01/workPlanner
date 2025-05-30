package com.assignment.fsad.repository;

import com.assignment.fsad.models.Projects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectsRepository extends JpaRepository<Projects, Long> {
    // You can add custom query methods here if needed
}
