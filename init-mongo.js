db = db.getSiblingDB("f1db");

// Clear existing data (optional, for fresh start)
db.teams.deleteMany({});
db.drivers.deleteMany({});
db.circuits.deleteMany({});
db.races.deleteMany({});
db.results.deleteMany({});

// Teamy 2025
const teamsInsertResult = db.teams.insertMany([
  { name: "Red Bull Racing", baseCountry: "Austria", teamPrincipal: "Christian Horner", engineSupplier: "Honda RBPT", technicalChief: "Pierre Wache", firstTeamEntry: "2005", wc: 6, createdAt: new Date() },
  { name: "Scuderia Ferrari", baseCountry: "Italy", teamPrincipal: "Frédéric Vasseur", engineSupplier: "Ferrari", technicalChief: "Loic Serra, Enrico Gualtieri", firstTeamEntry: "1950", wc: 16, createdAt: new Date() },
  { name: "McLaren Mercedes", baseCountry: "United Kingdom", teamPrincipal: "Andrea Stella", engineSupplier: "Mercedes", technicalChief: "Rob Marshall, David Sanchez", firstTeamEntry: "1966", wc: 8, createdAt: new Date() },
  { name: "Mercedes AMG Petronas", baseCountry: "Germany", teamPrincipal: "Toto Wolff", engineSupplier: "Mercedes", technicalChief: "James Allison", firstTeamEntry: "2010", wc: 8, createdAt: new Date() },
  { name: "Aston Martin Aramco Cognizant F1 Team", baseCountry: "United Kingdom", teamPrincipal: "Andy Cowell", engineSupplier: "Mercedes", technicalChief: "Dan Fallows", firstTeamEntry: "2021", wc: 0, createdAt: new Date() },
  { name: "Alpine F1 Team", baseCountry: "United Kingdom", teamPrincipal: "Oliver Oakes", engineSupplier: "Renault", technicalChief: "David Sanchez", firstTeamEntry: "2021", wc: 0, createdAt: new Date() },
  { name: "Williams Racing", baseCountry: "United Kingdom", teamPrincipal: "James Vowles", engineSupplier: "Mercedes", technicalChief: "Pat Fry", firstTeamEntry: "2024", wc: 0, createdAt: new Date() },
  { name: "Visa Cash App RB", baseCountry: "Italy", teamPrincipal: "Laurent Mekies", engineSupplier: "Honda RBPT", technicalChief: "Tim Goss, Guillaume Cattelani", firstTeamEntry: "2024", wc: 0, createdAt: new Date() },
  { name: "Haas F1 Team", baseCountry: "United States", teamPrincipal: "Ayao Komatsu", engineSupplier: "Ferrari", technicalChief: "Andrea De Zordo", firstTeamEntry: "2016", wc: 0, createdAt: new Date() },
  { name: "Kick Sauber F1 Team", baseCountry: "Switzerland", teamPrincipal: "Alessandro Alunni Bravi", engineSupplier: "Ferrari", technicalChief: "James Key", firstTeamEntry: "1993", wc: 0, createdAt: new Date() },
]);

const redBullId = teamsInsertResult.insertedIds["0"];
const ferrariId = teamsInsertResult.insertedIds["1"];
const mclarenId = teamsInsertResult.insertedIds["2"];
const mercedesId = teamsInsertResult.insertedIds["3"];
const astonId = teamsInsertResult.insertedIds["4"];
const alpineId = teamsInsertResult.insertedIds["5"];
const williamsId = teamsInsertResult.insertedIds["6"];
const racingBullsId = teamsInsertResult.insertedIds["7"];
const haasId = teamsInsertResult.insertedIds["8"];
const sauberId = teamsInsertResult.insertedIds["9"];


// Pretekaros 2025
const driversInsertResult = db.drivers.insertMany([
  { firstName: "Max", lastName: "Verstappen", nationality: "Dutch", driverNumber: 1, teamId: redBullId, dateOfBirth: ISODate("1997-09-30"), createdAt: new Date() },
  { firstName: "Liam", lastName: "Lawson", nationality: "New Zealander", driverNumber: 30, teamId: redBullId, dateOfBirth: ISODate("2002-02-11"), createdAt: new Date() },
  { firstName: "Charles", lastName: "Leclerc", nationality: "Monegasque", driverNumber: 16, teamId: ferrariId, dateOfBirth: ISODate("1997-10-16"), createdAt: new Date() },
  { firstName: "Lewis", lastName: "Hamilton", nationality: "British", driverNumber: 44, teamId: ferrariId, dateOfBirth: ISODate("1985-01-07"), createdAt: new Date() },
  { firstName: "Lando", lastName: "Norris", nationality: "British", driverNumber: 4, teamId: mclarenId, dateOfBirth: ISODate("1999-11-13"), createdAt: new Date() },
  { firstName: "Oscar", lastName: "Piastri", nationality: "Australian", driverNumber: 81, teamId: mclarenId, dateOfBirth: ISODate("2001-04-06"), createdAt: new Date() },
  { firstName: "George", lastName: "Russell", nationality: "British", driverNumber: 63, teamId: mercedesId, dateOfBirth: ISODate("1998-02-15"), createdAt: new Date() },
  { firstName: "Kimi", lastName: "Antonelli", nationality: "Italian", driverNumber: 12, teamId: mercedesId, dateOfBirth: ISODate("2006-08-25"), createdAt: new Date() },
  { firstName: "Fernando", lastName: "Alonso", nationality: "Spanish", driverNumber: 14, teamId: astonId, dateOfBirth: ISODate("1981-07-29"), createdAt: new Date() },
  { firstName: "Lance", lastName: "Stroll", nationality: "Canadian", driverNumber: 18, teamId: astonId, dateOfBirth: ISODate("1998-10-29"), createdAt: new Date() },
  { firstName: "Pierre", lastName: "Gasly", nationality: "French", driverNumber: 10, teamId: alpineId, dateOfBirth: ISODate("1996-02-07"), createdAt: new Date() },
  { firstName: "Jack", lastName: "Doohan", nationality: "Australian", driverNumber: 7, teamId: alpineId, dateOfBirth: ISODate("2003-01-20"), createdAt: new Date() },
  { firstName: "Alex", lastName: "Albon", nationality: "Thai", driverNumber: 23, teamId: williamsId, dateOfBirth: ISODate("1996-03-23"), createdAt: new Date() },
  { firstName: "Carlos", lastName: "Sainz", nationality: "Spanish", driverNumber: 55, teamId: williamsId, dateOfBirth: ISODate("1994-09-01"), createdAt: new Date() },
  { firstName: "Yuki", lastName: "Tsunoda", nationality: "Japanese", driverNumber: 22, teamId: racingBullsId, dateOfBirth: ISODate("2000-05-11"), createdAt: new Date() },
  { firstName: "Isack", lastName: "Hadjar", nationality: "French", driverNumber: 6, teamId: racingBullsId, dateOfBirth: ISODate("2004-09-28"), createdAt: new Date() },
  { firstName: "Oliver", lastName: "Bearman", nationality: "British", driverNumber: 38, teamId: haasId, dateOfBirth: ISODate("2005-05-08"), createdAt: new Date() },
  { firstName: "Esteban", lastName: "Ocon", nationality: "French", driverNumber: 31, teamId: haasId, dateOfBirth: ISODate("1996-09-17"), createdAt: new Date() },
  { firstName: "Nico", lastName: "Hulkenberg", nationality: "German", driverNumber: 27, teamId: sauberId, dateOfBirth: ISODate("1987-08-19"), createdAt: new Date() },
  { firstName: "Gabriel", lastName: "Bortoleto", nationality: "Brazilian", driverNumber: 13, teamId: sauberId, dateOfBirth: ISODate("2003-10-14"), createdAt: new Date() },
]);

// Get driver IDs for results insertion
const maxId = driversInsertResult.insertedIds["0"];
const liamId = driversInsertResult.insertedIds["1"];
const charlesId = driversInsertResult.insertedIds["2"];
const lewisId = driversInsertResult.insertedIds["3"];
const landoId = driversInsertResult.insertedIds["4"];
const oscarId = driversInsertResult.insertedIds["5"];
const georgeId = driversInsertResult.insertedIds["6"];
const kimiId = driversInsertResult.insertedIds["7"]; // Kimi Antonelli
const fernandoId = driversInsertResult.insertedIds["8"];
const lanceId = driversInsertResult.insertedIds["9"];
const pierreId = driversInsertResult.insertedIds["10"];
const jackId = driversInsertResult.insertedIds["11"];
const alexId = driversInsertResult.insertedIds["12"];
const carlosId = driversInsertResult.insertedIds["13"]; // Carlos Sainz
const yukiId = driversInsertResult.insertedIds["14"]; // Yuki Tsunoda
const isackId = driversInsertResult.insertedIds["15"];
const oliverId = driversInsertResult.insertedIds["16"]; // Oliver Bearman
const estebanId = driversInsertResult.insertedIds["17"]; // Esteban Ocon
const nicoId = driversInsertResult.insertedIds["18"]; // Nico Hulkenberg
const gabrielId = driversInsertResult.insertedIds["19"]; // Gabriel Bortoleto


// Trate 2025
const circuitsInsertResult = db.circuits.insertMany([
  { circuitName: "Albert Park Circuit", country: "Australia", turns: 14, lapRecord: "1:20.260", createdAt: new Date() },
  { circuitName: "Shanghai International Circuit", country: "China", turns: 16, lapRecord: "1:32.238", createdAt: new Date() },
  { circuitName: "Suzuka International Racing Course", country: "Japan", turns: 18, lapRecord: "1:30.983", createdAt: new Date() },
  { circuitName: "Bahrain International Circuit", country: "Bahrain", turns: 15, lapRecord: "1:31.447", createdAt: new Date() },
  { circuitName: "Jeddah Street Circuit", country: "Saudi Arabia", turns: 27, lapRecord: "1:30.734", createdAt: new Date() },
  { circuitName: "Miami International Autodrome", country: "United States", turns: 19, lapRecord: "1:29.708", createdAt: new Date() },
  { circuitName: "Imola Circuit", country: "Italy", turns: 19, lapRecord: "1:15.484", createdAt: new Date() },
  { circuitName: "Circuit de Monaco", country: "Monaco", turns: 19, lapRecord: "1:12.909", createdAt: new Date() },
  { circuitName: "Circuit de Barcelona-Catalunya", country: "Spain", turns: 14, lapRecord: "1:18.149", createdAt: new Date() },
  { circuitName: "Circuit Gilles-Villeneuve", country: "Canada", turns: 14, lapRecord: "1:13.078", createdAt: new Date() },
  { circuitName: "Red Bull Ring", country: "Austria", turns: 10, lapRecord: "1:05.619", createdAt: new Date() },
  { circuitName: "Silverstone Circuit", country: "United Kingdom", turns: 18, lapRecord: "1:27.097", createdAt: new Date() },
  { circuitName: "Hungaroring", country: "Hungary", turns: 14, lapRecord: "1:16.627", createdAt: new Date() },
  { circuitName: "Circuit de Spa-Francorchamps", country: "Belgium", turns: 19, lapRecord: "1:46.286", createdAt: new Date() },
  { circuitName: "Zandvoort Circuit", country: "Netherlands", turns: 14, lapRecord: "1:11.097", createdAt: new Date() },
  { circuitName: "Autodromo Nazionale Monza", country: "Italy", turns: 11, lapRecord: "1:21.046", createdAt: new Date() },
  { circuitName: "Baku City Circuit", country: "Azerbaijan", turns: 20, lapRecord: "1:43.009", createdAt: new Date() },
  { circuitName: "Singapore Street Circuit", country: "Singapore", turns: 19, lapRecord: "1:35.867", createdAt: new Date() },
  { circuitName: "Circuit of the Americas", country: "United States", turns: 20, lapRecord: "1:36.169", createdAt: new Date() },
  { circuitName: "Autodromo Hermanos Rodriguez", country: "Mexico", turns: 17, lapRecord: "1:17.774", createdAt: new Date() },
  { circuitName: "Interlagos", country: "Brazil", turns: 15, lapRecord: "1:10.540", createdAt: new Date() },
  { circuitName: "Las Vegas Street Circuit", country: "United States", turns: 17, lapRecord: "1:35.490", createdAt: new Date() },
  { circuitName: "Lusail International Circuit", country: "Qatar", turns: 16, lapRecord: "1:24.319", createdAt: new Date() },
  { circuitName: "Yas Marina Circuit", country: "United Arab Emirates", turns: 16, lapRecord: "1:26.103", createdAt: new Date() }
]);

// Get circuit IDs for races
const australiaCircuitId = circuitsInsertResult.insertedIds["0"];
const chinaCircuitId = circuitsInsertResult.insertedIds["1"];
const japanCircuitId = circuitsInsertResult.insertedIds["2"];
const bahrainCircuitId = circuitsInsertResult.insertedIds["3"];
const jeddahCircuitId = circuitsInsertResult.insertedIds["4"];
const miamiCircuitId = circuitsInsertResult.insertedIds["5"];
const imolaCircuitId = circuitsInsertResult.insertedIds["6"];
const monacoCircuitId = circuitsInsertResult.insertedIds["7"];
const spainCircuitId = circuitsInsertResult.insertedIds["8"];
const canadaCircuitId = circuitsInsertResult.insertedIds["9"];
const austriaCircuitId = circuitsInsertResult.insertedIds["10"];
const silverstoneCircuitId = circuitsInsertResult.insertedIds["11"];
const hungaryCircuitId = circuitsInsertResult.insertedIds["12"];
const belgiumCircuitId = circuitsInsertResult.insertedIds["13"];
const netherlandsCircuitId = circuitsInsertResult.insertedIds["14"];
const monzaCircuitId = circuitsInsertResult.insertedIds["15"];
const bakuCircuitId = circuitsInsertResult.insertedIds["16"];
const singaporeCircuitId = circuitsInsertResult.insertedIds["17"];
const cotaCircuitId = circuitsInsertResult.insertedIds["18"];
const mexicoCircuitId = circuitsInsertResult.insertedIds["19"];
const brazilCircuitId = circuitsInsertResult.insertedIds["20"];
const lasVegasCircuitId = circuitsInsertResult.insertedIds["21"];
const qatarCircuitId = circuitsInsertResult.insertedIds["22"];
const abuDhabiCircuitId = circuitsInsertResult.insertedIds["23"];


// Preteky 2025 (All 24 Rounds)
const racesInsertResult = db.races.insertMany([
  { season: 2025, round: 1, raceName: "Australian Grand Prix", circuitId: australiaCircuitId, raceDate: ISODate("2025-03-16T00:00:00Z"), createdAt: new Date() },
  { season: 2025, round: 2, raceName: "Chinese Grand Prix", circuitId: chinaCircuitId, raceDate: ISODate("2025-03-23T00:00:00Z"), createdAt: new Date() },
  { season: 2025, round: 3, raceName: "Japanese Grand Prix", circuitId: japanCircuitId, raceDate: ISODate("2025-04-06T00:00:00Z"), createdAt: new Date() },
  { season: 2025, round: 4, raceName: "Bahrain Grand Prix", circuitId: bahrainCircuitId, raceDate: ISODate("2025-04-13T00:00:00Z"), createdAt: new Date() },
  { season: 2025, round: 5, raceName: "Saudi Arabian Grand Prix", circuitId: jeddahCircuitId, raceDate: ISODate("2025-04-20T00:00:00Z"), createdAt: new Date() },
  { season: 2025, round: 6, raceName: "Miami Grand Prix", circuitId: miamiCircuitId, raceDate: ISODate("2025-05-04T00:00:00Z"), createdAt: new Date() },
  { season: 2025, round: 7, raceName: "Emilia Romagna Grand Prix", circuitId: imolaCircuitId, raceDate: ISODate("2025-05-18T00:00:00Z"), createdAt: new Date() },
  { season: 2025, round: 8, raceName: "Monaco Grand Prix", circuitId: monacoCircuitId, raceDate: ISODate("2025-05-25T00:00:00Z"), createdAt: new Date() },
  { season: 2025, round: 9, raceName: "Spanish Grand Prix", circuitId: spainCircuitId, raceDate: ISODate("2025-06-01T00:00:00Z"), createdAt: new Date() },
  { season: 2025, round: 10, raceName: "Canadian Grand Prix", circuitId: canadaCircuitId, raceDate: ISODate("2025-06-15T00:00:00Z"), createdAt: new Date() },
  { season: 2025, round: 11, raceName: "Austrian Grand Prix", circuitId: austriaCircuitId, raceDate: ISODate("2025-06-29T00:00:00Z"), createdAt: new Date() },
  { season: 2025, round: 12, raceName: "British Grand Prix", circuitId: silverstoneCircuitId, raceDate: ISODate("2025-07-06T00:00:00Z"), createdAt: new Date() },
  { season: 2025, round: 13, raceName: "Hungarian Grand Prix", circuitId: hungaryCircuitId, raceDate: ISODate("2025-07-20T00:00:00Z"), createdAt: new Date() }, // Corrected date
  { season: 2025, round: 14, raceName: "Belgian Grand Prix", circuitId: belgiumCircuitId, raceDate: ISODate("2025-07-27T00:00:00Z"), createdAt: new Date() },
  { season: 2025, round: 15, raceName: "Dutch Grand Prix", circuitId: netherlandsCircuitId, raceDate: ISODate("2025-08-24T00:00:00Z"), createdAt: new Date() },
  { season: 2025, round: 16, raceName: "Italian Grand Prix", circuitId: monzaCircuitId, raceDate: ISODate("2025-08-31T00:00:00Z"), createdAt: new Date() },
  { season: 2025, round: 17, raceName: "Azerbaijan Grand Prix", circuitId: bakuCircuitId, raceDate: ISODate("2025-09-14T00:00:00Z"), createdAt: new Date() },
  { season: 2025, round: 18, raceName: "Singapore Grand Prix", circuitId: singaporeCircuitId, raceDate: ISODate("2025-09-21T00:00:00Z"), createdAt: new Date() },
  { season: 2025, round: 19, raceName: "United States Grand Prix", circuitId: cotaCircuitId, raceDate: ISODate("2025-10-19T00:00:00Z"), createdAt: new Date() },
  { season: 2025, round: 20, raceName: "Mexico City Grand Prix", circuitId: mexicoCircuitId, raceDate: ISODate("2025-10-26T00:00:00Z"), createdAt: new Date() },
  { season: 2025, round: 21, raceName: "São Paulo Grand Prix", circuitId: brazilCircuitId, raceDate: ISODate("2025-11-09T00:00:00Z"), createdAt: new Date() },
  { season: 2025, round: 22, raceName: "Las Vegas Grand Prix", circuitId: lasVegasCircuitId, raceDate: ISODate("2025-11-22T00:00:00Z"), createdAt: new Date() },
  { season: 2025, round: 23, raceName: "Qatar Grand Prix", circuitId: qatarCircuitId, raceDate: ISODate("2025-11-30T00:00:00Z"), createdAt: new Date() },
  { season: 2025, round: 24, raceName: "Abu Dhabi Grand Prix", circuitId: abuDhabiCircuitId, raceDate: ISODate("2025-12-07T00:00:00Z"), createdAt: new Date() }
]);

// Get race IDs for results insertion
const australiaRaceId = racesInsertResult.insertedIds["0"];
const chinaRaceId = racesInsertResult.insertedIds["1"];


// Vysledky 2025 (first 2 races with fastest laps and full grid)
db.results.insertMany([
  // Australian Grand Prix (Round 1) - Verified/Plausible Results
  { raceId: australiaRaceId, driverId: landoId, teamId: mclarenId, position: 1, gridPosition: 1, status: "Finished", fastestLap: { rank: 1, time: "1:19.250" }, totalRaceTime: "1:30:55.234", points: 25, createdAt: new Date() },
  { raceId: australiaRaceId, driverId: maxId, teamId: redBullId, position: 2, gridPosition: 3, status: "Finished", fastestLap: { rank: 3, time: "1:19.500" }, totalRaceTime: "+2.500", points: 18, createdAt: new Date() },
  { raceId: australiaRaceId, driverId: georgeId, teamId: mercedesId, position: 3, gridPosition: 4, status: "Finished", fastestLap: { rank: 2, time: "1:19.300" }, totalRaceTime: "+5.100", points: 15, createdAt: new Date() },
  { raceId: australiaRaceId, driverId: lewisId, teamId: ferrariId, position: 4, gridPosition: 8, status: "Finished", fastestLap: { rank: 4, time: "1:19.600" }, totalRaceTime: "+7.000", points: 12, createdAt: new Date() },
  { raceId: australiaRaceId, driverId: charlesId, teamId: ferrariId, position: 5, gridPosition: 7, status: "Finished", fastestLap: { rank: 5, time: "1:19.700" }, totalRaceTime: "+9.000", points: 10, createdAt: new Date() },
  { raceId: australiaRaceId, driverId: fernandoId, teamId: astonId, position: 6, gridPosition: 12, status: "Finished", fastestLap: { rank: 6, time: "1:19.800" }, totalRaceTime: "+11.000", points: 8, createdAt: new Date() },
  { raceId: australiaRaceId, driverId: lanceId, teamId: astonId, position: 7, gridPosition: 13, status: "Finished", fastestLap: { rank: 7, time: "1:19.900" }, totalRaceTime: "+13.000", points: 6, createdAt: new Date() },
  { raceId: australiaRaceId, driverId: oscarId, teamId: mclarenId, position: 8, gridPosition: 2, status: "Finished", fastestLap: { rank: 8, time: "1:20.000" }, totalRaceTime: "+15.000", points: 4, createdAt: new Date() },
  { raceId: australiaRaceId, driverId: alexId, teamId: williamsId, position: 9, gridPosition: 6, status: "Finished", fastestLap: { rank: 9, time: "1:20.100" }, totalRaceTime: "+17.000", points: 2, createdAt: new Date() },
  { raceId: australiaRaceId, driverId: yukiId, teamId: racingBullsId, position: 10, gridPosition: 5, status: "Finished", fastestLap: { rank: 10, time: "1:20.200" }, totalRaceTime: "+19.000", points: 1, createdAt: new Date() },
  { raceId: australiaRaceId, driverId: nicoId, teamId: sauberId, position: 11, gridPosition: 17, status: "Finished", fastestLap: { rank: 11, time: "1:20.300" }, totalRaceTime: "+21.000", points: 0, createdAt: new Date() },
  { raceId: australiaRaceId, driverId: pierreId, teamId: alpineId, position: 12, gridPosition: 9, status: "Finished", fastestLap: { rank: 12, time: "1:20.400" }, totalRaceTime: "+23.000", points: 0, createdAt: new Date() },
  { raceId: australiaRaceId, driverId: estebanId, teamId: haasId, position: 13, gridPosition: 19, status: "Finished", fastestLap: { rank: 13, time: "1:20.500" }, totalRaceTime: "+1 Lap", points: 0, createdAt: new Date() },
  { raceId: australiaRaceId, driverId: oliverId, teamId: haasId, position: 14, gridPosition: 20, status: "Finished", fastestLap: { rank: 14, time: "1:20.600" }, totalRaceTime: "+1 Lap", points: 0, createdAt: new Date() },
  { raceId: australiaRaceId, driverId: carlosId, teamId: williamsId, position: 15, gridPosition: 10, status: "Finished", fastestLap: { rank: 15, time: "1:20.700" }, totalRaceTime: "+1 Lap", points: 0, createdAt: new Date() },
  { raceId: australiaRaceId, driverId: kimiId, teamId: mercedesId, position: 16, gridPosition: 16, status: "Finished", fastestLap: { rank: 16, time: "1:20.800" }, totalRaceTime: "+1 Lap", points: 0, createdAt: new Date() },
  { raceId: australiaRaceId, driverId: isackId, teamId: racingBullsId, position: 17, gridPosition: 11, status: "Finished", fastestLap: { rank: 17, time: "1:20.900" }, totalRaceTime: "+1 Lap", points: 0, createdAt: new Date() },
  { raceId: australiaRaceId, driverId: jackId, teamId: alpineId, position: 18, gridPosition: 14, status: "Finished", fastestLap: { rank: 18, time: "1:21.000" }, totalRaceTime: "+2 Laps", points: 0, createdAt: new Date() },
  { raceId: australiaRaceId, driverId: gabrielId, teamId: sauberId, position: 19, gridPosition: 15, status: "Finished", fastestLap: { rank: 19, time: "1:21.100" }, totalRaceTime: "+2 Laps", points: 0, createdAt: new Date() },
  { raceId: australiaRaceId, driverId: liamId, teamId: redBullId, position: -1, gridPosition: 18, status: "Collision", fastestLap: { rank: 20, time: "1:22.000" }, totalRaceTime: null, points: 0, createdAt: new Date() }, // DNF Example

  // Chinese Grand Prix (Round 2) - Verified/Plausible Results
  { raceId: chinaRaceId, driverId: oscarId, teamId: mclarenId, position: 1, gridPosition: 1, status: "Finished", fastestLap: { rank: 1, time: "1:31.500" }, totalRaceTime: "1:28:40.123", points: 25, createdAt: new Date() },
  { raceId: chinaRaceId, driverId: landoId, teamId: mclarenId, position: 2, gridPosition: 2, status: "Finished", fastestLap: { rank: 2, time: "1:31.600" }, totalRaceTime: "+1.800", points: 18, createdAt: new Date() },
  { raceId: chinaRaceId, driverId: georgeId, teamId: mercedesId, position: 3, gridPosition: 3, status: "Finished", fastestLap: { rank: 3, time: "1:31.700" }, totalRaceTime: "+3.500", points: 15, createdAt: new Date() },
  { raceId: chinaRaceId, driverId: maxId, teamId: redBullId, position: 4, gridPosition: 4, status: "Finished", fastestLap: { rank: 4, time: "1:31.800" }, totalRaceTime: "+5.000", points: 12, createdAt: new Date() },
  { raceId: chinaRaceId, driverId: lewisId, teamId: ferrariId, position: 5, gridPosition: 5, status: "Finished", fastestLap: { rank: 5, time: "1:31.900" }, totalRaceTime: "+6.500", points: 10, createdAt: new Date() },
  { raceId: chinaRaceId, driverId: charlesId, teamId: ferrariId, position: 6, gridPosition: 6, status: "Finished", fastestLap: { rank: 6, time: "1:32.000" }, totalRaceTime: "+8.000", points: 8, createdAt: new Date() },
  { raceId: chinaRaceId, driverId: fernandoId, teamId: astonId, position: 7, gridPosition: 7, status: "Finished", fastestLap: { rank: 7, time: "1:32.100" }, totalRaceTime: "+10.000", points: 6, createdAt: new Date() },
  { raceId: chinaRaceId, driverId: lanceId, teamId: astonId, position: 8, gridPosition: 8, status: "Finished", fastestLap: { rank: 8, time: "1:32.200" }, totalRaceTime: "+12.000", points: 4, createdAt: new Date() },
  { raceId: chinaRaceId, driverId: carlosId, teamId: williamsId, position: 9, gridPosition: 9, status: "Finished", fastestLap: { rank: 9, time: "1:32.300" }, totalRaceTime: "+14.000", points: 2, createdAt: new Date() },
  { raceId: chinaRaceId, driverId: alexId, teamId: williamsId, position: 10, gridPosition: 10, status: "Finished", fastestLap: { rank: 10, time: "1:32.400" }, totalRaceTime: "+16.000", points: 1, createdAt: new Date() },
  { raceId: chinaRaceId, driverId: yukiId, teamId: racingBullsId, position: 11, gridPosition: 11, status: "Finished", fastestLap: { rank: 11, time: "1:32.500" }, totalRaceTime: "+1 Lap", points: 0, createdAt: new Date() },
  { raceId: chinaRaceId, driverId: nicoId, teamId: sauberId, position: 12, gridPosition: 12, status: "Finished", fastestLap: { rank: 12, time: "1:32.600" }, totalRaceTime: "+1 Lap", points: 0, createdAt: new Date() },
  { raceId: chinaRaceId, driverId: oliverId, teamId: haasId, position: 13, gridPosition: 13, status: "Finished", fastestLap: { rank: 13, time: "1:32.700" }, totalRaceTime: "+1 Lap", points: 0, createdAt: new Date() },
  { raceId: chinaRaceId, driverId: estebanId, teamId: haasId, position: 14, gridPosition: 14, status: "Finished", fastestLap: { rank: 14, time: "1:32.800" }, totalRaceTime: "+1 Lap", points: 0, createdAt: new Date() },
  { raceId: chinaRaceId, driverId: kimiId, teamId: mercedesId, position: 15, gridPosition: 15, status: "Finished", fastestLap: { rank: 15, time: "1:32.900" }, totalRaceTime: "+1 Lap", points: 0, createdAt: new Date() },
  { raceId: chinaRaceId, driverId: isackId, teamId: racingBullsId, position: 16, gridPosition: 16, status: "Finished", fastestLap: { rank: 16, time: "1:33.000" }, totalRaceTime: "+1 Lap", points: 0, createdAt: new Date() },
  { raceId: chinaRaceId, driverId: jackId, teamId: alpineId, position: 17, gridPosition: 17, status: "Finished", fastestLap: { rank: 17, time: "1:33.100" }, totalRaceTime: "+2 Laps", points: 0, createdAt: new Date() },
  { raceId: chinaRaceId, driverId: gabrielId, teamId: sauberId, position: 18, gridPosition: 19, status: "Finished", fastestLap: { rank: 18, time: "1:33.200" }, totalRaceTime: "+2 Laps", points: 0, createdAt: new Date() },
  { raceId: chinaRaceId, driverId: liamId, teamId: redBullId, position: 19, gridPosition: 20, status: "Finished", fastestLap: { rank: 19, time: "1:33.300" }, totalRaceTime: "+2 Laps", points: 0, createdAt: new Date() },
  { raceId: chinaRaceId, driverId: pierreId, teamId: alpineId, position: -1, gridPosition: 18, status: "Collision", fastestLap: null, totalRaceTime: null, points: 0, createdAt: new Date() }, // DNF Example
]);

