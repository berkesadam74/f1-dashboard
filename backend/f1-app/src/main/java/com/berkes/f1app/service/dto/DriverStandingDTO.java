package com.berkes.f1app.service.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DriverStandingDTO {
  private String driverId;
  private String firstName;
  private String lastName;
  private String nationality;
  private int driverNumber;
  private String teamName;
  private String teamId;
  private double points;
}
