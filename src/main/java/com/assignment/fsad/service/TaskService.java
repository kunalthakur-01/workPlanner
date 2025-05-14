package com.assignment.fsad.service;

import com.assignment.fsad.models.Task;

import java.util.List;
import java.util.UUID;

public interface TaskService {
    Task createTask(Task task);

    Task getTaskById(UUID id);

    List<Task> getAllTasks();

    Task updateTask(UUID id, Task task);

    void deleteTask(UUID id);
}
