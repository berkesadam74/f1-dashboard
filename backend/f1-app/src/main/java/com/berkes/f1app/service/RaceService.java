package com.berkes.f1app.service;

import com.berkes.f1app.service.dto.*;
import com.berkes.f1app.model.Circuit;
import com.berkes.f1app.model.Race;
import com.berkes.f1app.repository.CircuitRepository;
import com.berkes.f1app.repository.RaceRepository;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RaceService {
  private final RaceRepository raceRepository;
  private final CircuitRepository circuitRepository;

  public RaceService(RaceRepository raceRepository, CircuitRepository circuitRepository) {
    this.raceRepository = raceRepository;
    this.circuitRepository = circuitRepository;
  }

  public List<RaceDTO> getRaces(Integer season) {
    List<Race> races = (season != null) ? raceRepository.findBySeason(season) : raceRepository.findAll();
    return races.stream().map(this::toDTO).collect(Collectors.toList());
  }

  public List<NextRaceDTO> getNextRaces(int count) {
    Date now = Date.from(Instant.now());
    List<Race> upcomingRaces = raceRepository.findByRaceDateAfterOrderByRaceDateAsc(now);

    Map<ObjectId, Circuit> circuitMap = circuitRepository.findAll().stream()
        .collect(Collectors.toMap(Circuit::getId, c -> c));

    return upcomingRaces.stream()
        .limit(count)
        .map(race -> {
          Circuit circuit = circuitMap.get(race.getCircuitId());
          return NextRaceDTO.builder()
              .id(race.getId().toHexString())
              .raceName(race.getRaceName())
              .circuitName(circuit != null ? circuit.getCircuitName() : "Unknown Circuit")
              .country(circuit != null ? circuit.getCountry() : "Unknown Country")
              .raceDate(race.getRaceDate() != null ? race.getRaceDate().toInstant().toString() : null)
              .build();
        })
        .collect(Collectors.toList());
  }

  public RaceDTO getRaceById(String id) {
    ObjectId objId = new ObjectId(id);
    Race currentRace = raceRepository.findById(objId).get();
    return toDTO(currentRace);
  }

  private RaceDTO toDTO(Race race) {
    return RaceDTO.builder()
        .id(race.getId().toHexString())
        .season(race.getSeason())
        .round(race.getRound())
        .raceName(race.getRaceName())
        .circuitId(race.getCircuitId().toHexString())
        .raceDate(race.getRaceDate() != null ? race.getRaceDate().toInstant().toString() : null)
        .createdAt(race.getCreatedAt() != null ? race.getCreatedAt().toString() : null)
        .build();
  }
}
