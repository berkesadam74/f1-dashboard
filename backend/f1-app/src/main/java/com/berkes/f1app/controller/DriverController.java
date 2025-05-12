package com.berkes.f1app.controller;

import com.berkes.f1app.service.dto.*;
import com.berkes.f1app.service.DriverService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {
  private final DriverService driverService;

  public DriverController(DriverService driverService) {
    this.driverService = driverService;
  }

  @GetMapping
  public List<DriverDTO> getAllDrivers() {
    return driverService.getAllDrivers();
  }
}
