package com.berkes.f1app.service;

import com.berkes.f1app.service.dto.ConstructorStandingDTO;
import com.berkes.f1app.service.dto.DriverStandingDTO;
import com.berkes.f1app.service.dto.StatResultDTO;
import com.berkes.f1app.model.Driver;
import com.berkes.f1app.model.Race;
import com.berkes.f1app.model.Result;
import com.berkes.f1app.model.Team;
import com.berkes.f1app.repository.DriverRepository;
import com.berkes.f1app.repository.RaceRepository;
import com.berkes.f1app.repository.ResultRepository;
import com.berkes.f1app.repository.TeamRepository;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class StandingService {
  private final RaceRepository raceRepository;
  private final ResultRepository resultRepository;
  private final DriverRepository driverRepository;
  private final TeamRepository teamRepository;

  public StandingService(RaceRepository raceRepository, ResultRepository resultRepository,
      DriverRepository driverRepository, TeamRepository teamRepository) {
    this.raceRepository = raceRepository;
    this.resultRepository = resultRepository;
    this.driverRepository = driverRepository;
    this.teamRepository = teamRepository;
  }

  public List<DriverStandingDTO> getDriverStandings(int season) {
    List<Race> races = raceRepository.findBySeason(season);
    List<ObjectId> raceIds = races.stream()
        .map(Race::getId)
        .collect(Collectors.toList());

    List<Result> results = resultRepository.findByRaceIdIn(raceIds);

    Map<ObjectId, Double> driverPoints = new HashMap<>();
    for (Result result : results) {
      driverPoints.put(
          result.getDriverId(),
          driverPoints.getOrDefault(result.getDriverId(), 0.0) + result.getPoints());
    }

    Map<ObjectId, Driver> driverMap = driverRepository.findAll().stream()
        .collect(Collectors.toMap(Driver::getId, d -> d));
    Map<ObjectId, Team> teamMap = teamRepository.findAll().stream()
        .collect(Collectors.toMap(Team::getId, t -> t));

    List<DriverStandingDTO> standings = driverPoints.entrySet().stream()
        .map(entry -> {
          Driver driver = driverMap.get(entry.getKey());
          if (driver == null)
            return null;
          Team team = teamMap.get(driver.getTeamId());
          return DriverStandingDTO.builder()
              .driverId(driver.getId().toHexString())
              .firstName(driver.getFirstName())
              .lastName(driver.getLastName())
              .nationality(driver.getNationality())
              .driverNumber(driver.getDriverNumber())
              .teamName(team != null ? team.getName() : null)
              .teamId(team != null ? team.getId().toHexString() : null)
              .points(entry.getValue())
              .build();
        })
        .filter(Objects::nonNull)
        .sorted(Comparator.comparingDouble(DriverStandingDTO::getPoints).reversed())
        .collect(Collectors.toList());

    return standings;
  }

  public List<ConstructorStandingDTO> getConstructorStandings(int season) {
    List<Race> races = raceRepository.findBySeason(season);
    List<ObjectId> raceIds = races.stream().map(Race::getId).collect(Collectors.toList());
    List<Result> results = resultRepository.findByRaceIdIn(raceIds);

    Map<ObjectId, Double> teamPoints = new HashMap<>();
    for (Result result : results) {
      teamPoints.put(
          result.getTeamId(),
          teamPoints.getOrDefault(result.getTeamId(), 0.0) + result.getPoints());
    }

    Map<ObjectId, Team> teamMap = teamRepository.findAll().stream()
        .collect(Collectors.toMap(Team::getId, t -> t));

    List<ConstructorStandingDTO> standings = teamPoints.entrySet().stream()
        .map(entry -> {
          Team team = teamMap.get(entry.getKey());
          return ConstructorStandingDTO.builder()
              .teamId(team.getId().toHexString())
              .teamName(team.getName())
              .points(entry.getValue())
              .build();
        })
        .sorted(Comparator.comparingDouble(ConstructorStandingDTO::getPoints).reversed())
        .collect(Collectors.toList());

    return standings;
  }

  public List<StatResultDTO> getRaceWins(int season) {
    return getStatByPosition(season, 1, "position");
  }

  public List<StatResultDTO> getPolePositions(int season) {
    return getStatByPosition(season, 1, "gridPosition");
  }

  public List<StatResultDTO> getFastestLaps(int season) {
    return getStatByFastestLapRank(season, 1);
  }

  public List<StatResultDTO> getPodiums(int season) {
    return getStatByPodiumPositions(season, Arrays.asList(1, 2, 3));
  }

  // Helper methods:
  private List<StatResultDTO> getStatByPosition(int season, int target, String field) {
    List<Race> races = raceRepository.findBySeason(season);
    List<ObjectId> raceIds = races.stream().map(Race::getId).collect(Collectors.toList());
    List<Result> results = resultRepository.findByRaceIdIn(raceIds);

    Map<ObjectId, Integer> driverCounts = new HashMap<>();
    for (Result result : results) {
      int value = field.equals("position") ? result.getPosition() : result.getGridPosition();
      if (value == target) {
        driverCounts.put(result.getDriverId(),
            driverCounts.getOrDefault(result.getDriverId(), 0) + 1);
      }
    }

    Map<ObjectId, Driver> driverMap = driverRepository.findAll().stream()
        .collect(Collectors.toMap(Driver::getId, d -> d));
    Map<ObjectId, Team> teamMap = teamRepository.findAll().stream()
        .collect(Collectors.toMap(Team::getId, t -> t));

    // Ensure all drivers are included, even with 0
    for (ObjectId driverId : driverMap.keySet()) {
      driverCounts.putIfAbsent(driverId, 0);
    }

    List<StatResultDTO> allDrivers = driverCounts.entrySet().stream()
        .map(entry -> {
          Driver driver = driverMap.get(entry.getKey());
          Team team = teamMap.get(driver.getTeamId());
          return StatResultDTO.builder()
              .driverId(driver.getId().toHexString())
              .firstName(driver.getFirstName())
              .lastName(driver.getLastName())
              .teamName(team != null ? team.getName() : null)
              .value(entry.getValue())
              .build();
        })
        .sorted(Comparator.comparingInt(StatResultDTO::getValue).reversed()
            .thenComparing(StatResultDTO::getLastName))
        .limit(5)
        .collect(Collectors.toList());

    return allDrivers;
  }

  private List<StatResultDTO> getStatByFastestLapRank(int season, int rank) {
    List<Race> races = raceRepository.findBySeason(season);
    List<ObjectId> raceIds = races.stream().map(Race::getId).collect(Collectors.toList());
    List<Result> results = resultRepository.findByRaceIdIn(raceIds);

    Map<ObjectId, Integer> driverCounts = new HashMap<>();
    for (Result result : results) {
      if (result.getFastestLap() != null && result.getFastestLap().getRank() == rank) {
        driverCounts.put(result.getDriverId(),
            driverCounts.getOrDefault(result.getDriverId(), 0) + 1);
      }
    }

    Map<ObjectId, Driver> driverMap = driverRepository.findAll().stream()
        .collect(Collectors.toMap(Driver::getId, d -> d));
    Map<ObjectId, Team> teamMap = teamRepository.findAll().stream()
        .collect(Collectors.toMap(Team::getId, t -> t));

    // Ensure all drivers are included, even with 0
    for (ObjectId driverId : driverMap.keySet()) {
      driverCounts.putIfAbsent(driverId, 0);
    }

    List<StatResultDTO> allDrivers = driverCounts.entrySet().stream()
        .map(entry -> {
          Driver driver = driverMap.get(entry.getKey());
          Team team = teamMap.get(driver.getTeamId());
          return StatResultDTO.builder()
              .driverId(driver.getId().toHexString())
              .firstName(driver.getFirstName())
              .lastName(driver.getLastName())
              .teamName(team != null ? team.getName() : null)
              .value(entry.getValue())
              .build();
        })
        .sorted(Comparator.comparingInt(StatResultDTO::getValue).reversed()
            .thenComparing(StatResultDTO::getLastName))
        .limit(5)
        .collect(Collectors.toList());

    return allDrivers;
  }

  private List<StatResultDTO> getStatByPodiumPositions(int season, List<Integer> positions) {
    List<Race> races = raceRepository.findBySeason(season);
    List<ObjectId> raceIds = races.stream().map(Race::getId).collect(Collectors.toList());
    List<Result> results = resultRepository.findByRaceIdIn(raceIds);

    Map<ObjectId, Integer> driverCounts = new HashMap<>();
    for (Result result : results) {
      if (positions.contains(result.getPosition())) {
        driverCounts.put(result.getDriverId(),
            driverCounts.getOrDefault(result.getDriverId(), 0) + 1);
      }
    }

    Map<ObjectId, Driver> driverMap = driverRepository.findAll().stream()
        .collect(Collectors.toMap(Driver::getId, d -> d));
    Map<ObjectId, Team> teamMap = teamRepository.findAll().stream()
        .collect(Collectors.toMap(Team::getId, t -> t));

    // Ensure all drivers are included, even with 0
    for (ObjectId driverId : driverMap.keySet()) {
      driverCounts.putIfAbsent(driverId, 0);
    }

    List<StatResultDTO> allDrivers = driverCounts.entrySet().stream()
        .map(entry -> {
          Driver driver = driverMap.get(entry.getKey());
          Team team = teamMap.get(driver.getTeamId());
          return StatResultDTO.builder()
              .driverId(driver.getId().toHexString())
              .firstName(driver.getFirstName())
              .lastName(driver.getLastName())
              .teamName(team != null ? team.getName() : null)
              .value(entry.getValue())
              .build();
        })
        .sorted(Comparator.comparingInt(StatResultDTO::getValue).reversed()
            .thenComparing(StatResultDTO::getLastName))
        .limit(5)
        .collect(Collectors.toList());

    return allDrivers;
  }
}
