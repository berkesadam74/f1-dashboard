# F1 Application

Aplikácia pre správu a zobrazenie štatistík Formuly 1.

## Technológie

- Java 17
- Spring Boot 3.2.3
- MongoDB
- Maven
- Swagger/OpenAPI

## Požiadavky

- Java 17 JDK
- MongoDB 6.0 alebo novšia verzia
- Maven 3.6 alebo novšia verzia

## Inštalácia a spustenie

1. Klonujte repozitár:
```bash
git clone https://github.com/yourusername/f1-app.git
cd f1-app
```

2. Spustite MongoDB:
```bash
mongod
```

3. Inicializujte databázu:
```bash
mongo < init-mongo.js
```

4. Zostavte projekt:
```bash
mvn clean install
```

5. Spustite aplikáciu:
```bash
mvn spring-boot:run
```

Aplikácia bude dostupná na `http://localhost:8080`

## API Dokumentácia

Swagger UI je dostupná na `http://localhost:8080/swagger-ui.html`

## Endpointy

### Tímy
- GET `/api/teams` - Získanie všetkých tímov
- GET `/api/teams/{id}` - Získanie tímu podľa ID
- POST `/api/teams` - Vytvorenie nového tímu
- PUT `/api/teams/{id}` - Aktualizácia tímu
- DELETE `/api/teams/{id}` - Vymazanie tímu

### Jazdci
- GET `/api/drivers` - Získanie všetkých jazdcov
- GET `/api/drivers/{id}` - Získanie jazdca podľa ID
- GET `/api/drivers/number/{driverNumber}` - Získanie jazdca podľa čísla
- GET `/api/drivers/team/{teamId}` - Získanie jazdcov tímu
- POST `/api/drivers` - Vytvorenie nového jazdca
- PUT `/api/drivers/{id}` - Aktualizácia jazdca
- DELETE `/api/drivers/{id}` - Vymazanie jazdca

### Trate
- GET `/api/circuits` - Získanie všetkých tratí
- GET `/api/circuits/{id}` - Získanie tratě podľa ID
- GET `/api/circuits/name/{circuitName}` - Získanie tratě podľa názvu
- GET `/api/circuits/country/{country}` - Získanie tratí podľa krajiny
- POST `/api/circuits` - Vytvorenie novej tratě
- PUT `/api/circuits/{id}` - Aktualizácia tratě
- DELETE `/api/circuits/{id}` - Vymazanie tratě

### Preteky
- GET `/api/races` - Získanie všetkých pretekov
- GET `/api/races/{id}` - Získanie pretekov podľa ID
- GET `/api/races/season/{season}` - Získanie pretekov podľa sezóny
- GET `/api/races/circuit/{circuitId}` - Získanie pretekov podľa tratě
- GET `/api/races/date-range` - Získanie pretekov v date range
- GET `/api/races/season/{season}/round/{round}` - Získanie pretekov podľa sezóny a kola
- POST `/api/races` - Vytvorenie nových pretekov
- PUT `/api/races/{id}` - Aktualizácia pretekov
- DELETE `/api/races/{id}` - Vymazanie pretekov

### Výsledky
- GET `/api/results` - Získanie všetkých výsledkov
- GET `/api/results/{id}` - Získanie výsledku podľa ID
- GET `/api/results/race/{raceId}` - Získanie výsledkov pretekov
- GET `/api/results/driver/{driverId}` - Získanie výsledkov jazdca
- GET `/api/results/team/{teamId}` - Získanie výsledkov tímu
- GET `/api/results/race/{raceId}/driver/{driverId}` - Získanie výsledku jazdca v pretekoch
- GET `/api/results/race/{raceId}/standings` - Získanie poradia v pretekoch
- POST `/api/results` - Vytvorenie nového výsledku
- PUT `/api/results/{id}` - Aktualizácia výsledku
- DELETE `/api/results/{id}` - Vymazanie výsledku

### Kvalifikácie
- GET `/api/qualifying` - Získanie všetkých kvalifikácií
- GET `/api/qualifying/{id}` - Získanie kvalifikácie podľa ID
- GET `/api/qualifying/race/{raceId}` - Získanie kvalifikácií pretekov
- GET `/api/qualifying/driver/{driverId}` - Získanie kvalifikácií jazdca
- GET `/api/qualifying/team/{teamId}` - Získanie kvalifikácií tímu
- GET `/api/qualifying/race/{raceId}/driver/{driverId}` - Získanie kvalifikácie jazdca v pretekoch
- GET `/api/qualifying/race/{raceId}/standings` - Získanie poradia v kvalifikácii
- POST `/api/qualifying` - Vytvorenie novej kvalifikácie
- PUT `/api/qualifying/{id}` - Aktualizácia kvalifikácie
- DELETE `/api/qualifying/{id}` - Vymazanie kvalifikácie

### Tréningy
- GET `/api/practice` - Získanie všetkých tréningov
- GET `/api/practice/{id}` - Získanie tréningu podľa ID
- GET `/api/practice/race/{raceId}` - Získanie tréningov pretekov
- GET `/api/practice/race/{raceId}/session/{session}` - Získanie tréningov pretekov podľa session
- GET `/api/practice/driver/{driverId}` - Získanie tréningov jazdca
- GET `/api/practice/team/{teamId}` - Získanie tréningov tímu
- GET `/api/practice/race/{raceId}/session/{session}/driver/{driverId}` - Získanie tréningu jazdca v pretekoch
- GET `/api/practice/race/{raceId}/session/{session}/standings` - Získanie poradia v tréningu
- POST `/api/practice` - Vytvorenie nového tréningu
- PUT `/api/practice/{id}` - Aktualizácia tréningu
- DELETE `/api/practice/{id}` - Vymazanie tréningu

### Sprinty
- GET `/api/sprint` - Získanie všetkých sprintov
- GET `/api/sprint/{id}` - Získanie sprintu podľa ID
- GET `/api/sprint/race/{raceId}` - Získanie sprintov pretekov
- GET `/api/sprint/driver/{driverId}` - Získanie sprintov jazdca
- GET `/api/sprint/team/{teamId}` - Získanie sprintov tímu
- GET `/api/sprint/race/{raceId}/driver/{driverId}` - Získanie sprintu jazdca v pretekoch
- GET `/api/sprint/race/{raceId}/standings` - Získanie poradia v sprinte
- POST `/api/sprint` - Vytvorenie nového sprintu
- PUT `/api/sprint/{id}` - Aktualizácia sprintu
- DELETE `/api/sprint/{id}` - Vymazanie sprintu

### Bodovacie systémy
- GET `/api/scoring-systems` - Získanie všetkých bodovacích systémov
- GET `/api/scoring-systems/{id}` - Získanie bodovacieho systému podľa ID
- GET `/api/scoring-systems/season/{season}` - Získanie bodovacieho systému podľa sezóny
- POST `/api/scoring-systems` - Vytvorenie nového bodovacieho systému
- PUT `/api/scoring-systems/{id}` - Aktualizácia bodovacieho systému
- DELETE `/api/scoring-systems/{id}` - Vymazanie bodovacieho systému

### Šampionátové poradie
- GET `/api/championship-standings` - Získanie všetkých šampionátových poradí
- GET `/api/championship-standings/{id}` - Získanie šampionátového poradia podľa ID
- GET `/api/championship-standings/season/{season}/type/{type}` - Získanie šampionátového poradia podľa sezóny a typu
- POST `/api/championship-standings` - Vytvorenie nového šampionátového poradia
- PUT `/api/championship-standings/{id}` - Aktualizácia šampionátového poradia
- DELETE `/api/championship-standings/{id}` - Vymazanie šampionátového poradia 