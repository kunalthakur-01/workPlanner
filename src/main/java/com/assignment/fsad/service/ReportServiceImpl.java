package com.assignment.fsad.service;

import com.assignment.fsad.exception.ResourceNotFoundException;
import com.assignment.fsad.models.Report;
import com.assignment.fsad.models.User;
import com.assignment.fsad.repository.ReportRepository;
import com.assignment.fsad.repository.TaskRepository;
import com.assignment.fsad.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ReportServiceImpl implements  ReportService{
    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public Report generateReport(Report report, String reporteeEmail) {
        if (report == null || reporteeEmail == null) {
            throw new NullPointerException("Report or Reportee Email is NULL");
        }

        try {
            User reportee = userRepository.findByEmail(reporteeEmail);
            if(reportee == null) {
                throw new ResourceNotFoundException("Reportee not found with email: " + reporteeEmail);
            }
            report.setReportee(reportee);


            return reportRepository.save(report);
        } catch (ResourceNotFoundException e) {
            throw new ResourceNotFoundException(e.getMessage());
        }
        catch (Exception e) {
            throw new RuntimeException("Failed to generate report", e);
        }
    }
}
