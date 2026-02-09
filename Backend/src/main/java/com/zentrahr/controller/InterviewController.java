package com.zentrahr.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.zentrahr.dto.InterviewDTO;
import com.zentrahr.entity.Interview;
import com.zentrahr.service.InterviewServiceI;

@RestController
@RequestMapping("/api/interviews")
@CrossOrigin(origins = "http://localhost:3000")
public class InterviewController {

    private final InterviewServiceI interviewService;

    public InterviewController(InterviewServiceI interviewService) {
        this.interviewService = interviewService;
    }

    // CREATE (unchanged)
    @PostMapping
    public ResponseEntity<Interview> createInterview(
            @RequestBody Interview interview) {
        return ResponseEntity.ok(interviewService.createInterview(interview));
    }

    // READ ALL (React format)
    @GetMapping
    public ResponseEntity<List<InterviewDTO>> getAllInterviews() {
        return ResponseEntity.ok(interviewService.getAllInterviews());
    }

    // READ BY ID (React format)
    @GetMapping("/{id}")
    public ResponseEntity<InterviewDTO> getInterviewById(
            @PathVariable Long id) {
        return ResponseEntity.ok(interviewService.getInterviewById(id));
    }

    // UPDATE (unchanged)
    @PutMapping("/{id}")
    public ResponseEntity<Interview> updateInterview(
            @PathVariable Long id,
            @RequestBody Interview interview) {
        return ResponseEntity.ok(
                interviewService.updateInterview(id, interview));
    }

    // DELETE (unchanged)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInterview(
            @PathVariable Long id) {

        interviewService.deleteInterview(id);
        return ResponseEntity.ok("Interview deleted successfully");
    }
}
