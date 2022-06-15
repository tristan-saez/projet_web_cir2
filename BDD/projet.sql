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
# Table: match_event
#------------------------------------------------------------

CREATE TABLE match_event(
        id         Int  Auto_increment  NOT NULL ,
        date       Date NOT NULL ,
        start_hour Time NOT NULL ,
        price      Float NOT NULL ,
        lenght     Time NOT NULL ,
        score      Varchar (20) ,
        name       Varchar (3) NOT NULL ,
        address    Varchar (200) NOT NULL ,
        nb_player  Int NOT NULL ,
        mail       Varchar (100) NOT NULL
	,CONSTRAINT match_event_PK PRIMARY KEY (id)

	,CONSTRAINT match_event_profile_FK FOREIGN KEY (mail) REFERENCES profile(mail)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: sports
#------------------------------------------------------------

CREATE TABLE sports(
        name    Varchar (50) NOT NULL ,
        picture Text NOT NULL ,
        id      Int NOT NULL
	,CONSTRAINT sports_PK PRIMARY KEY (name)

	,CONSTRAINT sports_match_event_FK FOREIGN KEY (id) REFERENCES match_event(id)
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


#------------------------------------------------------------
# Table: a lieu à
#------------------------------------------------------------

CREATE TABLE a_lieu_a(
        id    Int NOT NULL ,
        insee Int NOT NULL
	,CONSTRAINT a_lieu_a_PK PRIMARY KEY (id,insee)

	,CONSTRAINT a_lieu_a_match_event_FK FOREIGN KEY (id) REFERENCES match_event(id)
	,CONSTRAINT a_lieu_a_city0_FK FOREIGN KEY (insee) REFERENCES city(insee)
)ENGINE=InnoDB;


CREATE USER 'default_user'@'%' IDENTIFIED BY 'p@ss_conn3ction';
GRANT ALL PRIVILEGES ON projet.* TO 'default'@'%';
FLUSH PRIVILEGES;