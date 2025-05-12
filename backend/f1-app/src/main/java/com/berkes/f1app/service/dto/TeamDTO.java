package com.berkes.f1app.service.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TeamDTO {
  private String id;
  private String name;
  private String baseCountry;
  private String teamPrincipal;
  private String engineSupplier;
  private String technicalChief;
  private String firstTeamEntry;
  private int wc;
  private String createdAt;
}
