import mysql.connector
from mysql.connector import Error
import pandas as pd

def create_server_connection(host_name, user_name, user_password, db_name):
    connection = None
    try:
        connection = mysql.connector.connect(
            host=host_name,
            user=user_name,
            passwd=user_password,
            database=db_name
        )
        print("MySQL Database connection successful")
    except Error as err:
        print(f"Error: '{err}'")

    return connection

def execute_query(connection, query):
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        connection.commit()
        print("Query successful")
    except Error as err:
        print(f"Error: '{err}'")


connection = create_server_connection("localhost", "default_user", "p@ss_conn3ction", "projet")
insee = ""
city =""

city_file = open("commune2021.csv", "r", encoding="utf8")
for line in city_file:
    tab = line.replace("'", "\\'").split(",")
    print("added : ", tab[1], " - ", tab[9])
    query = f"INSERT INTO city VALUES('{tab[1]}','{tab[9]}');"
    execute_query(connection, query)