package com.berkes.f1app.service.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ConstructorStandingDTO {
  private String teamId;
  private String teamName;
  private double points;
}
