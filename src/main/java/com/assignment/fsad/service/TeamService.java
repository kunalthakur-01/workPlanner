package com.assignment.fsad.service;

import com.assignment.fsad.models.Team;

import java.util.List;
import java.util.UUID;

public interface TeamService {
    Team createTeam(Team team, UUID ownerId);

    Team getTeamById(UUID id);

    List<Team> getAllTeams();

    Team updateTeam(UUID id, Team team);

    void deleteTeam(UUID id);

    void addMemberToTeam(UUID teamId, UUID userId);

//    List<Team> getTeamsByUserId(Long userId);
}
