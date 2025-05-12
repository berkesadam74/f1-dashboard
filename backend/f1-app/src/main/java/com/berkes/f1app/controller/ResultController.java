package com.berkes.f1app.controller;

import com.berkes.f1app.service.dto.*;
import com.berkes.f1app.service.ResultService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
public class ResultController {
  private final ResultService resultService;

  public ResultController(ResultService resultService) {
    this.resultService = resultService;
  }

  @GetMapping
  public List<ResultDTO> getResultsByRace(@RequestParam String raceId) {
    return resultService.getResultsByRaceId(raceId);
  }

  @GetMapping("/all")
  public List<ResultDTO> getAllResults() {
    return resultService.getAllResults();
  }

  @PostMapping
  public ResponseEntity<List<ResultDTO>> saveResults(@RequestBody List<ResultDTO> resultDTOs) {
    List<ResultDTO> savedResults = resultService.saveResults(resultDTOs);
    return ResponseEntity.ok(savedResults);
  }

  @DeleteMapping("/{raceId}")
  public ResponseEntity<Void> deleteResultsByRace(@PathVariable String raceId) {
    resultService.deleteResultsByRaceId(raceId);
    return ResponseEntity.noContent().build();
  }

}
