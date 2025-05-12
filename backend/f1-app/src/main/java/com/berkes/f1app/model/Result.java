package com.berkes.f1app.model;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "results")
public class Result {
  @Id
  private ObjectId id;
  private ObjectId raceId;
  private ObjectId driverId;
  private ObjectId teamId;
  private int position;
  private int gridPosition;
  private String status;
  private FastestLap fastestLap;
  private String totalRaceTime;
  private int points;
  private Date createdAt;

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class FastestLap {
    private int rank;
    private String time;
  }
}
