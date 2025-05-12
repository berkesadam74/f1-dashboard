package com.berkes.f1app.controller;

import com.berkes.f1app.service.dto.*;
import com.berkes.f1app.service.RaceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/races")
public class RaceController {
  private final RaceService raceService;

  public RaceController(RaceService raceService) {
    this.raceService = raceService;
  }

  @GetMapping
  public List<RaceDTO> getRaces(@RequestParam(required = false) Integer season) {
    return raceService.getRaces(season);
  }

  @GetMapping("/{raceId}")
  public RaceDTO getRaceById(@PathVariable String raceId) {
    return raceService.getRaceById(raceId);
  }

  @GetMapping("/next")
  public List<NextRaceDTO> getNextRaces(@RequestParam(defaultValue = "5") int count) {
    return raceService.getNextRaces(count);
  }
}
