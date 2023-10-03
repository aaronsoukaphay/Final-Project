-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

-- Insert data into the "teams" table with the names of 32 NFL teams
INSERT INTO teams ("teamName", "teamLogo", "bannerColor", "navColor")
VALUES
    ('Arizona Cardinals', '', 'red', 'black'),
    ('Atlanta Falcons', '', 'red', 'black'),
    ('Baltimore Ravens', '/images/baltimore-ravens-logo.svg', 'purple', 'black'),
    ('Buffalo Bills', '/images/buffalo-bills-logo.svg', 'blue', 'red'),
    ('Carolina Panthers', '', 'blue', 'black'),
    ('Chicago Bears', '', 'navy', 'orange'),
    ('Cincinnati Bengals', '/images/cincinnati-bengals-logo.svg', 'black', 'orange'),
    ('Cleveland Browns', '', 'orange', 'brown'),
    ('Dallas Cowboys', '', 'blue', 'silver'),
    ('Denver Broncos', '', 'orange', 'blue'),
    ('Detroit Lions', '', 'blue', 'silver'),
    ('Green Bay Packers', '', 'green', 'gold'),
    ('Houston Texans', '', 'navy', 'red'),
    ('Indianapolis Colts', '', 'blue', 'white'),
    ('Jacksonville Jaguars', '', 'teal', 'black'),
    ('Kansas City Chiefs', '/images/kansas-city-chiefs-logo.svg', 'red', 'gold'),
    ('Las Vegas Raiders', '', 'black', 'silver'),
    ('Los Angeles Chargers', '', 'navy', 'gold'),
    ('Los Angeles Rams', '', 'blue', 'gold'),
    ('Miami Dolphins', '', 'aqua', 'orange'),
    ('Minnesota Vikings', '', 'purple', 'gold'),
    ('New England Patriots', '', 'blue', 'red'),
    ('New Orleans Saints', '', 'gold', 'black'),
    ('New York Giants', '', 'blue', 'red'),
    ('New York Jets', '', 'green', 'white'),
    ('Philadelphia Eagles', '/images/philadelphia-eagles-logo.svg', 'green', 'silver'),
    ('Pittsburgh Steelers', '', 'black', 'gold'),
    ('San Francisco 49ers', '/images/san-francisco-49ers-logo.svg', 'red', 'gold'),
    ('Seattle Seahawks', '', 'navy', 'green'),
    ('Tampa Bay Buccaneers', '', 'red', 'pewter'),
    ('Tennessee Titans', '', 'navy', 'light blue'),
    ('Washington Football Team', '', 'burgundy', 'gold');

-- Insert data into the "players" table with 5 popular players for each of the 32 NFL teams
INSERT INTO players ("teamId", "firstName", "lastName")
VALUES
    -- Arizona Cardinals
    (1, 'Kyler', 'Murray'),
    (1, 'DeAndre', 'Hopkins'),
    (1, 'J.J.', 'Watt'),
    (1, 'Chandler', 'Jones'),
    (1, 'Budda', 'Baker'),

    -- Atlanta Falcons
    (2, 'Matt', 'Ryan'),
    (2, 'Julio', 'Jones'),
    (2, 'Calvin', 'Ridley'),
    (2, 'Grady', 'Jarrett'),
    (2, 'Deion', 'Jones'),

    -- Baltimore Ravens
    (3, 'Lamar', 'Jackson'),
    (3, 'Marquise', 'Brown'),
    (3, 'Mark', 'Andrews'),
    (3, 'Marcus', 'Peters'),
    (3, 'Ronnie', 'Stanley'),

    -- Buffalo Bills
    (4, 'Josh', 'Allen'),
    (4, 'Stefon', 'Diggs'),
    (4, 'Tre', 'Davious White'),
    (4, 'Tremaine', 'Edmunds'),
    (4, 'Jerry', 'Hughes'),

    -- Carolina Panthers
    (5, 'Christian', 'McCaffrey'),
    (5, 'D.J.', 'Moore'),
    (5, 'Jeremy', 'Chinn'),
    (5, 'Brian', 'Burns'),
    (5, 'Robbie', 'Anderson'),

        -- Chicago Bears
    (6, 'Khalil', 'Mack'),
    (6, 'Allen', 'Robinson'),
    (6, 'Roquan', 'Smith'),
    (6, 'Eddie', 'Jackson'),
    (6, 'David', 'Montgomery'),

    -- Cincinnati Bengals
    (7, 'Joe', 'Burrow'),
    (7, 'Ja''Marr', 'Chase'),
    (7, 'Tee', 'Higgins'),
    (7, 'Jessie', 'Bates'),
    (7, 'Joe', 'Mixion'),

    -- Cleveland Browns
    (8, 'Baker', 'Mayfield'),
    (8, 'Nick', 'Chubb'),
    (8, 'Myles', 'Garrett'),
    (8, 'Denzel', 'Ward'),
    (8, 'Odell', 'Beckham Jr.'),

    -- Dallas Cowboys
    (9, 'Dak', 'Prescott'),
    (9, 'Ezekiel', 'Elliott'),
    (9, 'Amari', 'Cooper'),
    (9, 'DeMarcus', 'Lawrence'),
    (9, 'CeeDee', 'Lamb'),

    -- Denver Broncos
    (10, 'Teddy', 'Bridgewater'),
    (10, 'Melvin', 'Gordon'),
    (10, 'Jerry', 'Jeudy'),
    (10, 'Von', 'Miller'),
    (10, 'Courtland', 'Sutton'),

    -- Detroit Lions
    (11, 'Jared', 'Goff'),
    (11, 'D''Andre', 'Swift'),
    (11, 'T.J.', 'Hockenson'),
    (11, 'Frank', 'Ragnow'),
    (11, 'Jeff', 'Okudah'),

    -- Green Bay Packers
    (12, 'Aaron', 'Rodgers'),
    (12, 'Davante', 'Adams'),
    (12, 'Aaron', 'Jones'),
    (12, 'Jaire', 'Alexander'),
    (12, 'Kenny', 'Clark'),

    -- Houston Texans
    (13, 'Deshaun', 'Watson'),
    (13, 'Brandin', 'Cooks'),
    (13, 'Laremy', 'Tunsil'),
    (13, 'Zach', 'Cunningham'),
    (13, 'Whitney', 'Mercilus'),

    -- Indianapolis Colts
    (14, 'Carson', 'Wentz'),
    (14, 'Jonathan', 'Taylor'),
    (14, 'T.Y.', 'Hilton'),
    (14, 'Darius', 'Leonard'),
    (14, 'DeForest', 'Buckner'),

    -- Jacksonville Jaguars
    (15, 'Trevor', 'Lawrence'),
    (15, 'Travis', 'Etienne'),
    (15, 'D.J.', 'Chark'),
    (15, 'Josh', 'Allen'),
    (15, 'Myles', 'Jack'),

    -- Kansas City Chiefs
    (16, 'Patrick', 'Mahomes'),
    (16, 'Tyreek', 'Hill'),
    (16, 'Travis', 'Kelce'),
    (16, 'Chris', 'Jones'),
    (16, 'Tyrann', 'Mathieu'),

    -- Las Vegas Raiders
    (17, 'Derek', 'Carr'),
    (17, 'Josh', 'Jacobs'),
    (17, 'Darren', 'Waller'),
    (17, 'Maxx', 'Crosby'),
    (17, 'Johnathan', 'Abram'),

    -- Los Angeles Chargers
    (18, 'Justin', 'Herbert'),
    (18, 'Keenan', 'Allen'),
    (18, 'Austin', 'Ekeler'),
    (18, 'Joey', 'Bosa'),
    (18, 'Derwin', 'James'),

    -- Los Angeles Rams
    (19, 'Matthew', 'Stafford'),
    (19, 'Cooper', 'Kupp'),
    (19, 'Aaron', 'Donald'),
    (19, 'Jalen', 'Ramsey'),
    (19, 'Robert', 'Woods'),

    -- Miami Dolphins
    (20, 'Tua', 'Tagovailoa'),
    (20, 'Jaylen', 'Waddle'),
    (20, 'Xavien', 'Howard'),
    (20, 'Emanuel', 'Ogbah'),
    (20, 'Mike', 'Gesicki'),

    -- Minnesota Vikings
    (21, 'Kirk', 'Cousins'),
    (21, 'Dalvin', 'Cook'),
    (21, 'Adam', 'Thielen'),
    (21, 'Danielle', 'Hunter'),
    (21, 'Harrison', 'Smith'),

    -- New England Patriots
    (22, 'Mac', 'Jones'),
    (22, 'Damien', 'Harris'),
    (22, 'Jakobi', 'Meyers'),
    (22, 'Stephon', 'Gilmore'),
    (22, 'Matthew', 'Judon'),

    -- New Orleans Saints
    (23, 'Jameis', 'Winston'),
    (23, 'Alvin', 'Kamara'),
    (23, 'Michael', 'Thomas'),
    (23, 'Cameron', 'Jordan'),
    (23, 'Marshon', 'Lattimore'),

    -- New York Giants
    (24, 'Daniel', 'Jones'),
    (24, 'Saquon', 'Barkley'),
    (24, 'Kenny', 'Golladay'),
    (24, 'Leonard', 'Williams'),
    (24, 'Blake', 'Martinez'),

    -- New York Jets
    (25, 'Zach', 'Wilson'),
    (25, 'Corey', 'Davis'),
    (25, 'Mekhi', 'Becton'),
    (25, 'C.J.', 'Mosley'),
    (25, 'Quinnen', 'Williams'),

    -- Philadelphia Eagles
    (26, 'Jalen', 'Hurts'),
    (26, 'Miles', 'Sanders'),
    (26, 'DeVonta', 'Smith'),
    (26, 'Fletcher', 'Cox'),
    (26, 'Darius', 'Slay'),

    -- Pittsburgh Steelers
    (27, 'Ben', 'Roethlisberger'),
    (27, 'Najee', 'Harris'),
    (27, 'Chase', 'Claypool'),
    (27, 'T.J.', 'Watt'),
    (27, 'Minkah', 'Fitzpatrick'),

    -- San Francisco 49ers
    (28, 'Jimmy', 'Garoppolo'),
    (28, 'George', 'Kittle'),
    (28, 'Nick', 'Bosa'),
    (28, 'Deebo', 'Samuel'),
    (28, 'Fred', 'Warner'),

    -- Seattle Seahawks
    (29, 'Russell', 'Wilson'),
    (29, 'D.K.', 'Metcalf'),
    (29, 'Tyler', 'Lockett'),
    (29, 'Bobby', 'Wagner'),
    (29, 'Jamal', 'Adams'),

    -- Tampa Bay Buccaneers
    (30, 'Tom', 'Brady'),
    (30, 'Mike', 'Evans'),
    (30, 'Chris', 'Godwin'),
    (30, 'Lavonte', 'David'),
    (30, 'Shaquil', 'Barrett'),

    -- Tennessee Titans
    (31, 'Ryan', 'Tannehill'),
    (31, 'Derrick', 'Henry'),
    (31, 'A.J.', 'Brown'),
    (31, 'Harold', 'Landry'),
    (31, 'Kevin', 'Byard'),

    -- Washington Football Team
    (32, 'Chase', 'Young'),
    (32, 'Terry', 'McLaurin'),
    (32, 'Ryan', 'Fitzpatrick'),
    (32, 'Montez', 'Sweat'),
    (32, 'Brandon', 'Scherff');

-- Insert data into the "products" table
INSERT INTO products ("playerId", "teamId", "category", "productImage", "productName", "price", "gender")
VALUES
    (76, 16, 'Jersey', '/images/patrick-mahomes.webp', 'Patrick Mahomes Kansas City Chiefs Football Jersey', 130, 'Male'),
    (126, 26, 'Jersey', '/images/jalen-hurts.webp', 'Jalen Hurts Philadelphia Eagles Football Jersey', 130, 'Male'),
    (31, 7, 'Jersey', '/images/joe-burrow.webp', 'Joe Burrow Cincinnati Bengals Football Jersey', 130, 'Male'),
    (16, 4, 'Jersey', '/images/josh-allen.webp', 'Josh Allen Buffalo Bills Football Jersey', 130, 'Male'),
    (11, 3, 'Jersey', '/images/lamar-jackson.webp', 'Lamar Jackson Baltimore Ravens Football Jersey', 130, 'Male'),
    (137, 28, 'Jersey', '/images/george-kittle.webp', 'George Kittle San Francisco 49ers Football Jersey', 130, 'Male'),
    (17, 4, 'Jersey', '/images/stefon-diggs.webp', 'Stefon Diggs Buffalo Bills Football Jersey', 130, 'Male');

-- Insert data into the "carts" table
INSERT INTO carts ("customerId", "productId", "size", "quantity")
VALUES
    (1, 3, 'M', 2),
    (2, 5, 'S', 1);

-- Insert data into the "customers" table
INSERT INTO customers ("cartId", "firstName", "lastName")
VALUES
    (1, 'Alice', 'Johnson'),
    (2, 'Bob', 'Smith');