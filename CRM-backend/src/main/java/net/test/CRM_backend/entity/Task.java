package net.test.CRM_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskId;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "created_date", nullable = false)
    private LocalDate createdDate;

    @Column(name = "user_type", nullable = false)
    private String userType; // e.g., "Admin", "SalesRep"

    @ManyToOne
    @JoinColumn(name = "assigned_by_id")
    private User assignedBy;

    public Task() {
        this.createdDate = LocalDate.now();
    }

    // Getters and setters
    // ...


}
