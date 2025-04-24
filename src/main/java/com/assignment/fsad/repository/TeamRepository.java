package com.assignment.fsad.repository;

import com.assignment.fsad.models.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TeamRepository extends JpaRepository<Team, UUID> {
    Team findByTeamName(String teamName);
}
