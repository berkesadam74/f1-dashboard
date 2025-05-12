package com.berkes.f1app.service.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RaceDTO {
  private String id;
  private int season;
  private int round;
  private String raceName;
  private String circuitId;
  private String raceDate;
  private String createdAt;
}
