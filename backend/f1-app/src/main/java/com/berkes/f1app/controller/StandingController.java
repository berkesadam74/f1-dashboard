package com.berkes.f1app.controller;

import com.berkes.f1app.service.dto.*;
import com.berkes.f1app.service.StandingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/standings")
public class StandingController {
  private final StandingService standingService;

  public StandingController(StandingService standingService) {
    this.standingService = standingService;
  }

  @GetMapping("/drivers")
  public List<DriverStandingDTO> getDriverStandings(@RequestParam int season) {
    return standingService.getDriverStandings(season);
  }

  @GetMapping("/constructors")
  public List<ConstructorStandingDTO> getConstructorStandings(@RequestParam int season) {
    return standingService.getConstructorStandings(season);
  }

}
