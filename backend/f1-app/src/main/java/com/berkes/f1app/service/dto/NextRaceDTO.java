package com.berkes.f1app.service.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NextRaceDTO {
  private String id;
  private String raceName;
  private String circuitName;
  private String country;
  private String raceDate;
}
