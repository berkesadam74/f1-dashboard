package com.berkes.f1app.service.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CircuitDTO {
  private String id;
  private String circuitName;
  private String country;
  private int turns;
  private String lapRecord;
  private String createdAt;
}
