package com.berkes.f1app.model;

import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "teams")
public class Team {

  @Id
  private ObjectId id;
  private String name;
  private String baseCountry;
  private String teamPrincipal;
  private String engineSupplier;
  private String technicalChief;
  private String firstTeamEntry;
  private int wc;
  private Date createdAt;

}
