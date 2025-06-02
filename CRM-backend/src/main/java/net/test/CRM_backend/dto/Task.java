package net.test.CRM_backend.dto;

import java.time.LocalDate;

public class Task {
    private Long taskId;
    private String title;
    private String description;
    private LocalDate dueDate;
    private String userType;
    private Long assignedById;
}
