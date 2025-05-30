package com.assignment.fsad.models;

import com.assignment.fsad.enums.TaskPriority;
import com.assignment.fsad.enums.TaskType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String taskName;

    private TaskType type;

    private String summary;

    private String description;

    private String status;

    @Enumerated(EnumType.STRING)
    private TaskPriority priority;

    @OneToOne
    @JoinColumn(name = "assignee")
    private User assignee;

    @OneToOne
    @JoinColumn(name = "reporter")
    private User reporter;

    private Date dueDate;

    private Date createdOnDate;

    private Date resolvedOnDate;

    private String resolution;

    private String resolutionDescription;

    private String resolutionStatus;

    @ManyToOne
    private Team team;
}
