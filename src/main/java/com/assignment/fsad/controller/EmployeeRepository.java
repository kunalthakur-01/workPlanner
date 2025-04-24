package com.assignment.fsad.controller;

import com.assignment.fsad.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, UUID> {
    Employee findByEmail(String email);

    Employee findByUserName(String userName);

    Employee findByPhone(Long phone);
}
