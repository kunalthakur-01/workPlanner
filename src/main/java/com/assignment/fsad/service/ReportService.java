package com.assignment.fsad.service;

import com.assignment.fsad.models.Report;

import java.util.UUID;

public interface ReportService {
    Report generateReport(Report report, String reporteeEmail);
}
