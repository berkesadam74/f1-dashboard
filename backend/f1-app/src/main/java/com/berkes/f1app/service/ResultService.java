package com.berkes.f1app.service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.berkes.f1app.model.Result;
import com.berkes.f1app.repository.ResultRepository;
import com.berkes.f1app.service.dto.ResultDTO;

@Service
public class ResultService {

  private final ResultRepository resultRepository;

  public ResultService(ResultRepository resultRepository) {
    this.resultRepository = resultRepository;
  }

  public List<ResultDTO> getResultsByRaceId(String raceId) {
    ObjectId raceObjectId = new ObjectId(raceId);
    List<Result> results = resultRepository.findByRaceId(raceObjectId);
    return results.stream().map(this::toDTO).collect(Collectors.toList());
  }

  public List<ResultDTO> saveResults(List<ResultDTO> resultDTOs) {
    if (resultDTOs == null || resultDTOs.isEmpty()) {
      return List.of();
    }
    String raceId = resultDTOs.get(0).getRaceId();
    ObjectId raceObjectId = new ObjectId(raceId);

    resultRepository.deleteByRaceId(raceObjectId);

    List<Result> results = resultDTOs.stream().map(this::toEntity).collect(Collectors.toList());
    List<Result> savedResults = resultRepository.saveAll(results);
    return savedResults.stream().map(this::toDTO).collect(Collectors.toList());
  }

  public void deleteResultsByRaceId(String raceId) {
    ObjectId raceObjectId = new ObjectId(raceId);
    resultRepository.deleteByRaceId(raceObjectId);
  }

  public List<ResultDTO> getAllResults() {
    List<Result> results = resultRepository.findAll();
    return results.stream().map(this::toDTO).collect(Collectors.toList());
  }

  private ResultDTO toDTO(Result result) {
    ResultDTO.FastestLapDTO fastestLapDTO = null;
    if (result.getFastestLap() != null) {
      fastestLapDTO = ResultDTO.FastestLapDTO.builder()
          .rank(result.getFastestLap().getRank())
          .time(result.getFastestLap().getTime())
          .build();
    }

    return ResultDTO.builder()
        .id(result.getId().toHexString())
        .raceId(result.getRaceId().toHexString())
        .driverId(result.getDriverId().toHexString())
        .teamId(result.getTeamId().toHexString())
        .position(result.getPosition())
        .gridPosition(result.getGridPosition())
        .status(result.getStatus())
        .fastestLap(fastestLapDTO)
        .totalRaceTime(result.getTotalRaceTime())
        .points(result.getPoints())
        .createdAt(result.getCreatedAt() != null ? result.getCreatedAt().toInstant().toString() : null)
        .build();
  }

  private Result toEntity(ResultDTO resultDTO) {
    Result.FastestLap fastestLap = null;
    if (resultDTO.getFastestLap() != null) {
      fastestLap = Result.FastestLap.builder()
          .rank(resultDTO.getFastestLap().getRank())
          .time(resultDTO.getFastestLap().getTime())
          .build();
    }

    return Result.builder()
        .id(resultDTO.getId() != null ? new ObjectId(resultDTO.getId()) : null)
        .raceId(new ObjectId(resultDTO.getRaceId()))
        .driverId(new ObjectId(resultDTO.getDriverId()))
        .teamId(new ObjectId(resultDTO.getTeamId()))
        .position(resultDTO.getPosition())
        .gridPosition(resultDTO.getGridPosition())
        .status(resultDTO.getStatus())
        .fastestLap(fastestLap)
        .totalRaceTime(resultDTO.getTotalRaceTime())
        .points(resultDTO.getPoints())
        .createdAt(resultDTO.getCreatedAt() != null ? Date.from(java.time.Instant.parse(resultDTO.getCreatedAt()))
            : new Date())
        .build();
  }

}
