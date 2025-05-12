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
@Document(collection = "drivers")
public class Driver {

  @Id
  private ObjectId id;
  private String firstName;
  private String lastName;
  private String nationality;
  private int driverNumber;
  private ObjectId teamId; // referencuje ID z teams
  private Date dateOfBirth;
  private Date createdAt;

}
