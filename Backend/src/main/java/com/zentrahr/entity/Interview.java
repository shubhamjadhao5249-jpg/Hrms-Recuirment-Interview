package com.zentrahr.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "interviews")
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // React: candidate
    @Column(nullable = false)
    private String candidateName;

    // React: role
    private String role;

    // React: type
    private String interviewType;

    // Used to build "Today, Oct 24"
    private LocalDate interviewDate;

    // Used to build "10:00 AM - 11:00 AM"
    private LocalTime startTime;
    private LocalTime endTime;

    // React: platform (Zoom / Google Meet / Teams)
    private String platform;

    // React: status (Upcoming / Scheduled)
    private String status;

    // React: panel (['You', 'Mike Ross'])
    @ElementCollection
    @CollectionTable(
        name = "interview_panel",
        joinColumns = @JoinColumn(name = "interview_id")
    )
    @Column(name = "panel_member")
    private List<String> panel;

    /* ---------------- GETTERS & SETTERS ---------------- */

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCandidateName() {
        return candidateName;
    }

    public void setCandidateName(String candidateName) {
        this.candidateName = candidateName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getInterviewType() {
        return interviewType;
    }

    public void setInterviewType(String interviewType) {
        this.interviewType = interviewType;
    }

    public LocalDate getInterviewDate() {
        return interviewDate;
    }

    public void setInterviewDate(LocalDate interviewDate) {
        this.interviewDate = interviewDate;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<String> getPanel() {
        return panel;
    }

    public void setPanel(List<String> panel) {
        this.panel = panel;
    }
}
