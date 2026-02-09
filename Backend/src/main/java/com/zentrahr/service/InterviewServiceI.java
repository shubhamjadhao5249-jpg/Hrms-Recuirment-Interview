package com.zentrahr.service;

import java.util.List;
import com.zentrahr.dto.InterviewDTO;
import com.zentrahr.entity.Interview;

public interface InterviewServiceI {

    Interview createInterview(Interview interview);

    List<InterviewDTO> getAllInterviews();

    InterviewDTO getInterviewById(Long id);

    Interview updateInterview(Long id, Interview interview);

    void deleteInterview(Long id);
}
