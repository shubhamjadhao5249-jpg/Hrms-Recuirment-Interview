package com.zentrahr.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.zentrahr.entity.Interview;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Long> {
   
}




