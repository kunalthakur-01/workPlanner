package com.assignment.fsad.controller;

import com.assignment.fsad.models.Task;
import com.assignment.fsad.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/create")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        return ResponseEntity.ok(taskService.createTask(task));
    }

    // Example method to get task details
     @GetMapping("/{id}")
     public ResponseEntity<Task> getTaskById(@PathVariable UUID id) {
         return ResponseEntity.ok(taskService.getTaskById(id));
     }

    // Example method to get all tasks
     @GetMapping("/all")
     public ResponseEntity<List<Task>> getAllTasks() {
         return ResponseEntity.ok(taskService.getAllTasks());
     }

    // Example method to update a task
     @PutMapping("/{id}")
     public ResponseEntity<Task> updateTask(@PathVariable UUID id, @RequestBody Task task) {
         return ResponseEntity.ok(taskService.updateTask(id, task));
     }

    // Example method to delete a task
     @DeleteMapping("/{id}")
     public ResponseEntity<Void> deleteTask(@PathVariable UUID id) {
         taskService.deleteTask(id);
         return ResponseEntity.noContent().build();
     }
}
