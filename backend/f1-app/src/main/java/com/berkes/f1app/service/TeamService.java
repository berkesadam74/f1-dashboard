package com.berkes.f1app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.berkes.f1app.model.Team;
import com.berkes.f1app.repository.TeamRepository;
import com.berkes.f1app.service.dto.TeamDTO;

@Service
public class TeamService {

  private final TeamRepository teamRepository;

  public TeamService(TeamRepository teamRepository) {
    this.teamRepository = teamRepository;
  }

  public List<TeamDTO> getAllTeams() {
    return teamRepository.findAll().stream().map(this::toTeamDTO).collect(Collectors.toList());
  }

  private TeamDTO toTeamDTO(Team team) {
    return TeamDTO.builder()
        .id(team.getId().toHexString())
        .name(team.getName())
        .baseCountry(team.getBaseCountry())
        .teamPrincipal(team.getTeamPrincipal())
        .engineSupplier(team.getEngineSupplier())
        .technicalChief(team.getTechnicalChief())
        .firstTeamEntry(team.getFirstTeamEntry())
        .wc(team.getWc())
        .createdAt(team.getCreatedAt() != null ? team.getCreatedAt().toInstant().toString() : null)
        .build();
  }

}
