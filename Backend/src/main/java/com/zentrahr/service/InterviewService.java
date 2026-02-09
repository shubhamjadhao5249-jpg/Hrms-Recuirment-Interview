package com.zentrahr.service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zentrahr.dto.InterviewDTO;
import com.zentrahr.entity.Interview;
import com.zentrahr.repository.InterviewRepository;

@Service
public class InterviewService implements InterviewServiceI {

    @Autowired
    private InterviewRepository interviewRepository;

    // CREATE
    @Override
    public Interview createInterview(Interview interview) {
        return interviewRepository.save(interview);
    }

    // READ ALL (DTO)
    @Override
    public List<InterviewDTO> getAllInterviews() {
        return interviewRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // READ BY ID (DTO)
    @Override
    public InterviewDTO getInterviewById(Long id) {
        Interview interview = interviewRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Interview not found with id: " + id));

        return mapToDTO(interview);
    }

    // UPDATE
    @Override
    public Interview updateInterview(Long id, Interview interview) {

        Interview existing = interviewRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Interview not found with id: " + id));

        existing.setCandidateName(interview.getCandidateName());
        existing.setRole(interview.getRole());
        existing.setInterviewType(interview.getInterviewType());
        existing.setInterviewDate(interview.getInterviewDate());
        existing.setStartTime(interview.getStartTime());
        existing.setEndTime(interview.getEndTime());
        existing.setPlatform(interview.getPlatform());
        existing.setStatus(interview.getStatus());
        existing.setPanel(interview.getPanel());

        return interviewRepository.save(existing);
    }

    // DELETE
    @Override
    public void deleteInterview(Long id) {
        interviewRepository.deleteById(id);
    }

    // 🔁 Entity → React DTO
    private InterviewDTO mapToDTO(Interview interview) {

        InterviewDTO dto = new InterviewDTO();

        dto.setId(interview.getId());
        dto.setCandidate(interview.getCandidateName());
        dto.setRole(interview.getRole());
        dto.setType(interview.getInterviewType());

        DateTimeFormatter timeFmt = DateTimeFormatter.ofPattern("hh:mm a");
        dto.setTime(
                interview.getStartTime().format(timeFmt)
                        + " - " +
                interview.getEndTime().format(timeFmt)
        );

        DateTimeFormatter dateFmt = DateTimeFormatter.ofPattern("MMM dd");
        dto.setDate("Today, " + interview.getInterviewDate().format(dateFmt));

        dto.setPanel(interview.getPanel());
        dto.setStatus(interview.getStatus());
        dto.setPlatform(interview.getPlatform());

        return dto;
    }
}
