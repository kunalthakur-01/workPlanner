package com.assignment.fsad.controller;

import com.assignment.fsad.models.Report;
import com.assignment.fsad.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/report")
public class ReportController {
    @Autowired
    private ReportService reportService;

    @PostMapping("/generate/{reporteeEmail}")
     public ResponseEntity<Report> generateReport(@RequestBody Report report, @PathVariable String reporteeEmail) {
         return ResponseEntity.ok(reportService.generateReport(report, reporteeEmail));
     }

    // Example: @GetMapping("/{id}")
    // public ResponseEntity<Report> getReportById(@PathVariable UUID id) {
    //     return ResponseEntity.ok(reportService.getReportById(id));
    // }

    // Example: @GetMapping("/all")
    // public ResponseEntity<List<Report>> getAllReports() {
    //     return ResponseEntity.ok(reportService.getAllReports());
    // }

    // Example: @DeleteMapping("/{id}")
    // public ResponseEntity<Void> deleteReport(@PathVariable UUID id) {
    //     reportService.deleteReport(id);
    //     return ResponseEntity.noContent().build();
    // }
}
