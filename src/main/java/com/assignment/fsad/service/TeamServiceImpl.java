package com.assignment.fsad.service;

import com.assignment.fsad.exception.InternalServerException;
import com.assignment.fsad.exception.ResourceNotFoundException;
import com.assignment.fsad.models.Team;
import com.assignment.fsad.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TeamServiceImpl implements TeamService{
    @Autowired
    private TeamRepository teamRepository;

    @Override
    public Team createTeam(Team team) {
        Team newTeam = null;
        try {
            newTeam = teamRepository.save(team);
        } catch (Exception e) {
            throw new InternalServerException("Failed to create team");
        }
        return newTeam;
    }

    @Override
    public Team getTeamById(UUID id) {
        if(id == null) {
            throw new NullPointerException("Team ID is NULL");
        }

        try {
            return teamRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Team not found"));
        } catch (Exception e) {
            throw new InternalServerException("Failed to retrieve team");
        }
    }

    @Override
    public List<Team> getAllTeams() {
        try {
            return teamRepository.findAll();
        } catch (Exception e) {
            throw new InternalServerException("Failed to retrieve teams");
        }
    }

    @Override
    public Team updateTeam(UUID id, Team team) {
        if (id == null || team == null) {
            throw new NullPointerException("Team ID or Team object is NULL");
        }

        try {
            Team existingTeam = teamRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Team not found"));
            existingTeam.setTeamName(team.getTeamName());
            existingTeam.setMembers(team.getMembers());
            return teamRepository.save(existingTeam);
        } catch (Exception e) {
            throw new InternalServerException("Failed to update team");
        }
    }

    @Override
    public void deleteTeam(UUID id) {
        try {
            teamRepository.deleteById(id);
        } catch (Exception e) {
            throw new InternalServerException("Failed to delete team");
        }
    }

//    @Override
//    public List<Team> getTeamsByUserId(Long userId) {
//        try {
//            return teamRepository.findByMembersId(userId);
//        } catch (Exception e) {
//            throw new InternalServerException("Failed to retrieve teams for user");
//        }
//    }
}
