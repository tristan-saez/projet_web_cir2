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

    //create user
    if($requestMethod == 'POST' && $requestRessource == 'account-create') {
        $data = "good";

        if(filter_var($_POST['mail'], FILTER_VALIDATE_EMAIL)) {
            if($_POST['firstname'] != '') {$firstname = $_POST['firstname'];} else {$data = 'firstname';}
            if($_POST['lastname'] != '') {$lastname = $_POST['lastname'];} else {$data = 'lastname';}
            if($_POST['birthdate'] != '') {$birthdate = $_POST['birthdate'];} else {$data = 'birthdate';}
            if($_POST['mail'] != '') {$mail = $_POST['mail'];} else {$data = 'mail';}
            if($_POST['password'] != '') {$password = password_hash($_POST['password'], PASSWORD_ARGON2I);} else {$data = "password";}
            $picture = ($_POST['picture'] != '')?NULL:$_POST['picture'];

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

            if($data = "good") {
                $request_sql = "INSERT INTO profile (mail, first_name, last_name, password, picture, birthdate, insee) VALUES (".'"'.$mail.'","'.$firstname.'","'.$lastname.'","'.$password.'","'.$picture.'",'.$birthdate.','.$city.");";
                $query = $db->prepare($request_sql);
                $query->execute();
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