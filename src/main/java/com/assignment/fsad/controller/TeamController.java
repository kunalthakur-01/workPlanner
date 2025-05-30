package com.assignment.fsad.controller;

import com.assignment.fsad.models.Team;
import com.assignment.fsad.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/team")
@CrossOrigin("*")
public class TeamController {
    @Autowired
    private TeamService teamService;

     @PostMapping("{ownerId}/create")
     public ResponseEntity<Team> createTeam(@RequestBody Team team, @PathVariable UUID ownerId) {
         if (team.getTeamName() == null || team.getTeamName().isEmpty()) {
             return ResponseEntity.badRequest().build();
         }
         Team newTeam = teamService.createTeam(team, ownerId);
         return ResponseEntity.created(URI.create("/api/v1/team/" + newTeam.getId())).body(newTeam);
     }
    // Example method to get team details
     @GetMapping("/{id}")
     public ResponseEntity<Team> getTeamById(@PathVariable UUID id) {
         return ResponseEntity.ok(teamService.getTeamById(id));
     }
//     Example method to get all teams
     @GetMapping("/all")
     public ResponseEntity<List<Team>> getAllTeams() {
         return ResponseEntity.ok(teamService.getAllTeams());
     }
//     Example method to update a team
     @PutMapping("/{id}")
     public ResponseEntity<Team> updateTeam(@PathVariable UUID id, @RequestBody Team team) {
         return ResponseEntity.ok(teamService.updateTeam(id, team));
     }
    // Example method to delete a team
     @DeleteMapping("/{id}")
     public ResponseEntity<Void> deleteTeam(@PathVariable UUID id) {
         teamService.deleteTeam(id);
         return ResponseEntity.noContent().build();
     }

     @GetMapping("/{teamId}/addUser/{userId}")
     public void addMemberToTeam(@PathVariable UUID teamId, @PathVariable UUID userId) {
        teamService.addMemberToTeam(teamId, userId);
     }

     @GetMapping("/{teamId}/addTask/{taskId}")
    public void addTaskToTeam(@PathVariable UUID teamId, @PathVariable UUID taskId) {
        teamService.addTaskToTeam(teamId, taskId);
     }
    // Example method to get teams by user ID
//     @GetMapping("/user/{userId}")
//     public ResponseEntity<List<Team>> getTeamsByUserId(@PathVariable Long userId) {
//         return ResponseEntity.ok(teamService.getTeamsByUserId(userId));
//     }

}
