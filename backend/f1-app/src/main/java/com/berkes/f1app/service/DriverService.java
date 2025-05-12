package com.berkes.f1app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.berkes.f1app.model.Driver;
import com.berkes.f1app.repository.DriverRepository;
import com.berkes.f1app.service.dto.DriverDTO;

@Service
public class DriverService {

  private final DriverRepository driverRepository;

  public DriverService(DriverRepository driverRepository) {
    this.driverRepository = driverRepository;
  }

  public List<DriverDTO> getAllDrivers() {
    return driverRepository.findAll().stream().map(this::toDriverDTO).collect(Collectors.toList());
  }

  private DriverDTO toDriverDTO(Driver driver) {
    return DriverDTO.builder()
        .id(driver.getId().toHexString())
        .firstName(driver.getFirstName())
        .lastName(driver.getLastName())
        .nationality(driver.getNationality())
        .driverNumber(driver.getDriverNumber())
        .teamId(driver.getTeamId().toHexString())
        .dateOfBirth(driver.getDateOfBirth() != null ? driver.getDateOfBirth().toInstant().toString() : null)
        .createdAt(driver.getCreatedAt() != null ? driver.getCreatedAt().toInstant().toString() : null)
        .build();
  }

}
