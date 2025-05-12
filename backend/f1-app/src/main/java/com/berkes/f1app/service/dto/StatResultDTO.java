package com.berkes.f1app.service.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StatResultDTO {
  private String driverId;
  private String firstName;
  private String lastName;
  private String teamName;
  private int value;
}
