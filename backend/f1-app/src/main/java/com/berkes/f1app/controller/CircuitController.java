package com.berkes.f1app.controller;

import com.berkes.f1app.service.dto.*;
import com.berkes.f1app.service.CircuitService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/circuits")
public class CircuitController {
  private final CircuitService circuitService;

  public CircuitController(CircuitService circuitService) {
    this.circuitService = circuitService;
  }

  @GetMapping
  public List<CircuitDTO> getCircuits() {
    return circuitService.getCircuits();
  }
}
