package com.berkes.f1app.controller;

import com.berkes.f1app.service.dto.*;
import com.berkes.f1app.service.TeamService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
public class TeamController {
  private final TeamService teamService; // Or your team service

  public TeamController(TeamService teamService) {
    this.teamService = teamService;
  }

  @GetMapping
  public List<TeamDTO> getAllTeams() {
    return teamService.getAllTeams(); // Or call your team service
  }
}
