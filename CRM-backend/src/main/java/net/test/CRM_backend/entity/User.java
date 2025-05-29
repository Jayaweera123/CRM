package net.test.CRM_backend.entity;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;
@Entity
@Table(name = "users")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Column(name = "user_type", nullable = false)
    private String userType; // Values like "Admin", "SalesRep", "Customer"

    @Column(name = "created_date", nullable = false)
    private LocalDate createdDate;

    @OneToMany(mappedBy = "assignedBy")
    private List<Task> createdTasks;

    public User() {
        this.createdDate = LocalDate.now();
    }

    // Getters and setters
    // ...

}
