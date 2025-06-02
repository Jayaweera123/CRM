package net.test.CRM_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public class Task {
    @Repository
    public interface TaskRepository extends JpaRepository<Task, Long> {
    }

}
