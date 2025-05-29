package net.test.CRM_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name= "Leads")
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false, unique = true)
    private String email;

    // Constructors
    public Lead() {
    }

    // Getters and setters
    // ...
}
