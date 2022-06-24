# ProjetCIR2



1 - Unzip
2 - move to /var/www/projet
3 - sudo apt-get install python3.9
4 - sudo apt-get install python3-pip
5 - sudo pip3 install mysql-connector-python
6 - sudo pip3 install pandas
7 - connect root mysql and type following command :

CREATE DATABASE projet DEFAULT CHARACTER SET utf8 DEFAULT COLLATE
utf8_general_ci;

8 - SOURCE projet.sql (a user will be created 'default_user@'%' with password p@ss_conn3ction)

8.1 - This will also add a basic sport list. If you want to add a sport just put the image in /assets/sports/ and type the following command :
INSERT INTO sports (name, picture) VALUES ('my_picture', "/assets/sports/my_picture.png");

- python : mysql-connect-python + pandas




