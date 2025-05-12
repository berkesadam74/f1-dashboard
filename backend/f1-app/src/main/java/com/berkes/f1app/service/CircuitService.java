package com.berkes.f1app.service;

import com.berkes.f1app.service.dto.*;
import com.berkes.f1app.model.Circuit;
import com.berkes.f1app.repository.CircuitRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CircuitService {
  private final CircuitRepository circuitRepository;

  public CircuitService(CircuitRepository circuitRepository) {
    this.circuitRepository = circuitRepository;
  }

  public List<CircuitDTO> getCircuits() {
    return circuitRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
  }

  private CircuitDTO toDTO(Circuit circuit) {
    return CircuitDTO.builder()
        .id(circuit.getId().toHexString())
        .circuitName(circuit.getCircuitName())
        .country(circuit.getCountry())
        .turns(circuit.getTurns())
        .lapRecord(circuit.getLapRecord())
        .createdAt(circuit.getCreatedAt() != null ? circuit.getCreatedAt().toString() : null)
        .build();
  }
}
