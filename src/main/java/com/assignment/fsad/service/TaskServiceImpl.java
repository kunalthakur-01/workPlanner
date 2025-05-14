package com.assignment.fsad.service;

import com.assignment.fsad.models.Task;
import com.assignment.fsad.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TaskServiceImpl implements TaskService{

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public Task createTask(Task task) {
        Task newTask = null;
        try {
            newTask = taskRepository.save(task);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create task");
        }
        return newTask;
    }

    @Override
    public Task getTaskById(UUID id) {
        if(id == null) {
            throw new NullPointerException("Task ID is NULL");
        }

        try {
            return taskRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Task not found"));
        } catch (Exception e) {
            throw new RuntimeException("Failed to retrieve task");
        }
    }

    @Override
    public List<Task> getAllTasks() {
        try {
            return taskRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Failed to retrieve tasks");
        }
    }

    @Override
    public Task updateTask(UUID id, Task task) {
        if (id == null || task == null) {
            throw new NullPointerException("Task ID or Task object is NULL");
        }

        try {
            Task existingTask = taskRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Task not found"));
            existingTask.setTaskName(task.getTaskName());
            existingTask.setDescription(task.getDescription());
            return taskRepository.save(existingTask);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update task");
        }
    }

    @Override
    public void deleteTask(UUID id) {
        try {
            taskRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete task");
        }
    }
}
