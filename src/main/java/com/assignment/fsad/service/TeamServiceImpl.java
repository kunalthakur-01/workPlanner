package com.assignment.fsad.service;

import com.assignment.fsad.exception.InternalServerException;
import com.assignment.fsad.exception.ResourceNotFoundException;
import com.assignment.fsad.models.Team;
import com.assignment.fsad.models.User;
import com.assignment.fsad.repository.TeamRepository;
import com.assignment.fsad.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TeamServiceImpl implements TeamService{
    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Team createTeam(Team team, UUID ownerId) {
        Team newTeam = null;
        try {
            if(team == null) {
                throw new NullPointerException("Team is NULL");
            }
            User owner = userRepository.findById(ownerId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            team.setOwner(owner);
            newTeam = teamRepository.save(team);
        } catch (ResourceNotFoundException e) {
            System.out.println("Error: " + e.getMessage());
            throw new ResourceNotFoundException(e.getMessage());
        }
        catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            throw new RuntimeException(e.getMessage());
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
        } catch (ResourceNotFoundException e) {
            throw new ResourceNotFoundException(e.getMessage());
        }
        catch (Exception e) {
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

    @Override
    public void addMemberToTeam(UUID teamId, UUID userId) {
        if (teamId == null || userId == null) {
            throw new NullPointerException("Team ID or User ID is NULL");
        }

        try {
            Team team = teamRepository.findById(teamId)
                    .orElseThrow(() -> new ResourceNotFoundException("Team not found"));
//             Assuming you have a method to find user by ID
             User user = userRepository.findById(userId)
                     .orElseThrow(() -> new ResourceNotFoundException("User not found"));
                if (team.getMembers().contains(user)) {
                    throw new InternalServerException("User is already a member of the team");
                }
             team.getMembers().add(user);
             teamRepository.save(team);
        }
        catch (ResourceNotFoundException e) {
            throw new ResourceNotFoundException(e.getMessage());
        }
        catch (Exception e) {
            throw new InternalServerException("Failed to add member to team");
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
