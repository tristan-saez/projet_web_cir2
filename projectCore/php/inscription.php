<?php
    // Check the request.
    require_once('database.php');

    // Database connexion.
    $db = dbConnect();
    if (!$db)
    {
      header ('HTTP/1.1 503 Service Unavailable');
      exit;
    }
  
    $requestMethod = $_SERVER['REQUEST_METHOD'];
    $request = substr($_SERVER['PATH_INFO'], 1);
    $request = explode('/', $request);
    $requestRessource = array_shift($request);


    // if($requestMethod == 'POST' && $requestRessource == 'upload-picture') {
    //     var_dump($_POST);
    //     $data ="success";
    // }

    //create user
    if($requestMethod == 'POST' && $requestRessource == 'account-create') {
        $data = "good";

        if(filter_var($_POST['mail'], FILTER_VALIDATE_EMAIL)) { //verify is the mail address is in a valid format

            //verify if each elements is correctly entered
            if($_POST['firstname'] != '') {$firstname = $_POST['firstname'];} else {$data = 'firstname';}
            if($_POST['lastname'] != '') {$lastname = $_POST['lastname'];} else {$data = 'lastname';}
            if($_POST['birthdate'] != '') {$birthdate = $_POST['birthdate'];} else {$data = 'birthdate';}
            if($_POST['mail'] != '') {$mail = $_POST['mail'];} else {$data = 'mail';}
            if($_POST['password'] != '') {$password = password_hash($_POST['password'], PASSWORD_ARGON2I);} else {$data = "password";}
            
            //profile picture currently cannot be choose during creation but it can be modified in profile tab
            $picture = ($_POST['picture'] != '')?"/assets/profilpictures/pp_1.png":$_POST['picture'];

            //city verification is a bit trikier,and currently not case-compatible 
            //this function check if the entered name of the city is in database and replace it by its insee code
            if($_POST['city'] != '') {
                $request_sql = "SELECT insee FROM city ";
                $request_sql .= "WHERE name=:city";
                $query = $db->prepare($request_sql);
                $query->bindParam(':city', $_POST['city'], PDO::PARAM_STR, 100);
                $query->execute();
                $results = $query->fetchAll();

                if($results) {
                    $city = $results[0]['insee'];
                } else {
                    $data = "city";
                }
            } else {
                $data = "city"; 
            }

            if($data == "good") { //if no error unccountered... add the user to the database
                $request_sql = "INSERT INTO profile (mail, first_name, last_name, password, picture, birthdate, insee, played_matches, app_note, physical_shape) VALUES (:mail, :first_name, :last_name, :password, :picture, :birthdate, :insee, 0, 0, 2);";
                $query = $db->prepare($request_sql);
                $query->execute(array(
                    ':mail'=>$mail,
                    ':first_name'=>$firstname,
                    ':last_name'=>$lastname,
                    ':password'=>$password,
                    ':picture'=>$picture,
                    ':birthdate'=>$birthdate,
                    ':insee'=>$city
                ));
            }

        } else {
            $data = "mail";
        }
    }
    // Send data to the client.
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-control: no-store, no-cache, must-revalidate');
    header('Pragma: no-cache');
    header('HTTP/1.1 200 OK');
    echo json_encode($data);
    exit;
?>