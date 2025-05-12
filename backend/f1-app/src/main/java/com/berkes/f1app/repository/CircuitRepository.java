package com.berkes.f1app.repository;

import com.berkes.f1app.model.Circuit;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CircuitRepository extends MongoRepository<Circuit, ObjectId> {
}
