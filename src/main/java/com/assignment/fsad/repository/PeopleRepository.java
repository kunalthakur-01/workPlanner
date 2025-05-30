package com.assignment.fsad.repository;

import com.assignment.fsad.models.People;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PeopleRepository extends JpaRepository<People, UUID> {
}
