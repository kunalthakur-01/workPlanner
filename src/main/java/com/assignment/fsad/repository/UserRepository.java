package com.assignment.fsad.repository;

import com.assignment.fsad.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    User findByEmail(String email);

    User findByUserName(String userName);

    User findByPhone(Long phone);

    User findByEmailOrUserNameOrPhone(String email, String userName, long phone);
}
