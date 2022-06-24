
# ProjetCIR2 - Lebonsport

> Follow these steps to fully install and use our project on your machine!

1. Unzip
1. move to /var/www/projet
1. `sudo apt-get install python3.9`
1. `sudo apt-get install python3-pip`
1. `sudo pip3 install mysql-connector-python`
1. `sudo pip3 install pandas`
1. connect root mysql and type following command :

* CREATE DATABASE projet DEFAULT CHARACTER SET utf8 DEFAULT COLLATE
utf8_general_ci;

8. Join the database with command: 
    `use projet;`
1. SOURCE projet.sql (a user will be created 'default_user@'%' with password p@ss_conn3ction)

*   Leave mysql
*   execute python script with the commande `sudo python3 city_sample.py` in the directory of the file to add cities and insee code to the database. 
*   return to mysql database projet
*   and do the following command: `source commands.sql;
*   `

10. This will also add a basic sport list. If you want to add a sport just put the image in /assets/sports/ and type the following command :
* INSERT INTO sports (name, picture) VALUES ('my_picture', "/assets/sports/my_picture.png");

* python : mysql-connect-python + pandas

>You should now be able to connect to our website by using `http://10.10.51.73`
* If the layout is not looking as expected, try to zoom in (to about 90% or 80%) using `ctrl + scroll`.

> There is a file `constants.php` that allows you to change the created credentials.
you can either sign up or sign in using these credentials:
    
* mail: `david.poulet@gmail.com` pwd: `1234`
* mail: `thierry.golo@gmail.com` pwd: `1234`
* mail: `regis.lebail@gmail.com` pwd: `1234`

> You can now make your way throught our website Lebonsport where you can create sport events, profiles, participate and organize them as you want.


* /!\ as for the problems we encountered during the setup of the website on the server: the database was corrupted by xamp so we had to fix this issue before using our database in local.

*Antonin SOQUET & Tristan SAEZ*















