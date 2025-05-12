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
@Document(collection = "circuits")
public class Circuit {

  @Id
  private ObjectId id;
  private String circuitName;
  private String country;
  private int turns;
  private String lapRecord;
  private Date createdAt;

}
