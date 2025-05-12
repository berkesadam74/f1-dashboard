package com.berkes.f1app.service.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DriverDTO {
  private String id;
  private String firstName;
  private String lastName;
  private String nationality;
  private int driverNumber;
  private String teamId;
  private String dateOfBirth;
  private String createdAt;
}
