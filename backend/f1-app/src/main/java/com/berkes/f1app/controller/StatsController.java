package com.berkes.f1app.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.berkes.f1app.service.StandingService;
import com.berkes.f1app.service.dto.StatResultDTO;

@RestController
@RequestMapping("/api/stats")
public class StatsController {

  private final StandingService standingService;

  public StatsController(StandingService standingService) {
    this.standingService = standingService;
  }

  @GetMapping("/race-wins")
  public List<StatResultDTO> getRaceWins(@RequestParam int season) {
    return standingService.getRaceWins(season);
  }

  @GetMapping("/pole-positions")
  public List<StatResultDTO> getPolePositions(@RequestParam int season) {
    return standingService.getPolePositions(season);
  }

  @GetMapping("/fastest-laps")
  public List<StatResultDTO> getFastestLaps(@RequestParam int season) {
    return standingService.getFastestLaps(season);
  }

  @GetMapping("/podiums")
  public List<StatResultDTO> getPodiums(@RequestParam int season) {
    return standingService.getPodiums(season);
  }

}
