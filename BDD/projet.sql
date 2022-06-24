#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: city
#------------------------------------------------------------

CREATE TABLE city(
        insee Int NOT NULL ,
        name  Varchar (50) NOT NULL
	,CONSTRAINT city_PK PRIMARY KEY (insee)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: profile
#------------------------------------------------------------

CREATE TABLE profile(
        mail           Varchar (100) NOT NULL ,
        first_name     Varchar (100) NOT NULL ,
        last_name      Varchar (100) NOT NULL ,
        password       Varchar (256) NOT NULL ,
        picture        Text NOT NULL ,
        played_matches Int NOT NULL ,
        app_note       Float NOT NULL ,
        birthdate      Date NOT NULL ,
        physical_shape Int NOT NULL ,
        insee          Int NOT NULL
	,CONSTRAINT profile_PK PRIMARY KEY (mail)

	,CONSTRAINT profile_city_FK FOREIGN KEY (insee) REFERENCES city(insee)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: sports
#------------------------------------------------------------

CREATE TABLE sports(
        id      Int  Auto_increment  NOT NULL ,
        name    Varchar (50) NOT NULL ,
        picture Text NOT NULL
	,CONSTRAINT sports_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: match_event
#------------------------------------------------------------

CREATE TABLE match_event(
        id         Int  Auto_increment  NOT NULL ,
        date       Date NOT NULL ,
        start_hour Time NOT NULL ,
        price      Float NOT NULL ,
        duration   Time NOT NULL ,
        score      Varchar (20) ,
        name       Varchar (100) NOT NULL ,
        address    Varchar (200) NOT NULL ,
        nb_player  Int NOT NULL ,
        id_sports  Int NOT NULL ,
        mail       Varchar (100) NOT NULL ,
        insee      Int NOT NULL
	,CONSTRAINT match_event_PK PRIMARY KEY (id)

	,CONSTRAINT match_event_sports_FK FOREIGN KEY (id_sports) REFERENCES sports(id)
	,CONSTRAINT match_event_profile0_FK FOREIGN KEY (mail) REFERENCES profile(mail)
	,CONSTRAINT match_event_city1_FK FOREIGN KEY (insee) REFERENCES city(insee)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: participe à
#------------------------------------------------------------

CREATE TABLE participe_a(
        id             Int NOT NULL ,
        mail           Varchar (100) NOT NULL ,
        demand         Int NOT NULL ,
        is_best_player Bool NOT NULL
	,CONSTRAINT participe_a_PK PRIMARY KEY (id,mail)

	,CONSTRAINT participe_a_match_event_FK FOREIGN KEY (id) REFERENCES match_event(id)
	,CONSTRAINT participe_a_profile0_FK FOREIGN KEY (mail) REFERENCES profile(mail)
)ENGINE=InnoDB;

CREATE USER 'default_user'@'%' IDENTIFIED BY 'p@ss_conn3ction';
GRANT ALL PRIVILEGES ON projet.* TO 'default_user'@'%';
FLUSH PRIVILEGES;

INSERT INTO sports (name, picture) VALUES ('soccer', "/assets/sports/soccer.png");
INSERT INTO sports (name, picture) VALUES ('baseball', "/assets/sports/baseball.png");
INSERT INTO sports (name, picture) VALUES ('basketball', "/assets/sports/basket.png");
INSERT INTO sports (name, picture) VALUES ('football', "/assets/sports/football.png");
INSERT INTO sports (name, picture) VALUES ('badminton', "/assets/sports/goodminton.png");
INSERT INTO sports (name, picture) VALUES ('swimming', "/assets/sports/swimming.png");
INSERT INTO sports (name, picture) VALUES ('tennis', "/assets/sports/tennis.png");
INSERT INTO sports (name, picture) VALUES ('default', "/assets/sports/default.png");


INSERT INTO `profile` (`mail`, `first_name`, `last_name`, `password`, `picture`, `played_matches`, `app_note`, `birthdate`, `physical_shape`, `insee`) VALUES ('david.poulet@gmail.com', 'David', 'Poulet', '$argon2i$v=19$m=65536,t=4,p=1$YWliYTZTdDRkR3RzZXR3cQ$T9y945XVReRX+j+nGkxRW/HLgh3nKWiThWXCsB6Rc+4', '/assets/profilpicture/pp_1.png', '0', '4', '2018-10-03', '3', '29019');
INSERT INTO `profile` (`mail`, `first_name`, `last_name`, `password`, `picture`, `played_matches`, `app_note`, `birthdate`, `physical_shape`, `insee`) VALUES ('thierry.golo@gmail.com', 'Thierry', 'Golo', '$argon2i$v=19$m=65536,t=4,p=1$YWliYTZTdDRkR3RzZXR3cQ$T9y945XVReRX+j+nGkxRW/HLgh3nKWiThWXCsB6Rc+4', '/assets/profilpicture/pp_15.png', '0', '5', '1942-02-01', '5', '30068');
INSERT INTO `profile` (`mail`, `first_name`, `last_name`, `password`, `picture`, `played_matches`, `app_note`, `birthdate`, `physical_shape`, `insee`) VALUES ('regis.lebail@gmail.com', 'Regis', 'Lebail', '$argon2i$v=19$m=65536,t=4,p=1$YWliYTZTdDRkR3RzZXR3cQ$T9y945XVReRX+j+nGkxRW/HLgh3nKWiThWXCsB6Rc+4', '/assets/profilpicture/pp_13.png', '0', '2', '1999-06-06', '2', '31278');