package com.berkes.f1app.repository;

import com.berkes.f1app.model.Race;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface RaceRepository extends MongoRepository<Race, ObjectId> {
  List<Race> findBySeason(int season);

  List<Race> findByRaceDateAfterOrderByRaceDateAsc(Date date);
}
