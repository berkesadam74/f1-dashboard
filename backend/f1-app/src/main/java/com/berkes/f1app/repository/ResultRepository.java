package com.berkes.f1app.repository;

import com.berkes.f1app.model.Result;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultRepository extends MongoRepository<Result, ObjectId> {
  List<Result> findByRaceIdIn(List<ObjectId> raceIds);

  List<Result> findByRaceId(ObjectId raceId);

  void deleteByRaceId(ObjectId raceId);
}
