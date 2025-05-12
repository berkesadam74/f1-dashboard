package com.berkes.f1app.repository;

import com.berkes.f1app.model.Driver;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriverRepository extends MongoRepository<Driver, ObjectId> {
}
