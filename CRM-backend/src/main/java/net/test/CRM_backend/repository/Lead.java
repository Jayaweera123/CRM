package net.test.CRM_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public class Lead {
    @Repository
    public interface LeadRepository extends JpaRepository<Lead, Long> {
    }
}
