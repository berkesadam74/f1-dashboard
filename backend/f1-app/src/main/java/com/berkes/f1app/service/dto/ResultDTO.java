package com.berkes.f1app.service.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResultDTO {
  private String id;
  private String raceId;
  private String driverId;
  private String teamId;
  private int position;
  private int gridPosition;
  private String status;
  private FastestLapDTO fastestLap;
  private String totalRaceTime;
  private int points;
  private String createdAt;

  @Data
  @Builder
  public static class FastestLapDTO {
    private int rank;
    private String time;
  }
}
