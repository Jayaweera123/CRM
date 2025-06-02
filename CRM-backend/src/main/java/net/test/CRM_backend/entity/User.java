package net.test.CRM_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String name;
    private String email;
    private String phone;
    private String userType; // e.g., "Admin", "SalesRep", "Customer"
    private String password;
    private LocalDate createdDate;

    @OneToMany(mappedBy = "assignedBy")
    private List<Task> createdTasks;

    public User() {
        this.createdDate = LocalDate.now();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + this.userType.toUpperCase()));
    }

    @Override
    public String getUsername() {
        return this.email; // Assuming email is used as the username
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Implement your logic
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Implement your logic
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Implement your logic
    }

    @Override
    public boolean isEnabled() {
        return true; // Implement your logic
    }
}
