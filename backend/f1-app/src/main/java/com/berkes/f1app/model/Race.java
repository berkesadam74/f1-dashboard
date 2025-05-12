package com.berkes.f1app.model;

import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "races")
public class Race {

  @Id
  private ObjectId id;
  private int season;
  private int round;
  private String raceName;
  private ObjectId circuitId; // Referencuje ID z circuits dokumentu
  private Date raceDate;
  private Date createdAt;

}
