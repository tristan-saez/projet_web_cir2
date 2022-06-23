<?php
    session_start();
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

    // Check if an user is connected
    if($requestMethod == 'POST' && $requestRessource == 'update-rating') {
        if(isset($_SESSION['mail'])) {
            $request = "UPDATE profile SET app_note = ".$_POST['rating'];
            $request .= " WHERE mail=:mail";
            $query = $db->prepare($request);
            $query->bindParam(':mail', $_SESSION['mail'], PDO::PARAM_STR, 100);
            $query->execute();
            $data = $_POST['rating'];
        }
    }

    //update the physical shape in BDD
    if($requestMethod == 'POST' && $requestRessource == 'update-shape') {
        if(isset($_SESSION['mail'])) {
            $request = "UPDATE profile SET physical_shape = ".$_POST['shape'];
            $request .= " WHERE mail=:mail";
            $query = $db->prepare($request);
            $query->bindParam(':mail', $_SESSION['mail'], PDO::PARAM_STR, 100);
            $query->execute();
            $data = $_POST['shape'];
        }
    }

    if($requestMethod == 'GET' && $requestRessource == 'get-pictures-list') {
        $i = 0;
        $data = array();
        foreach (glob('../assets/profilpictures/*.png') as $filename) {
            $p = pathinfo($filename);
            $data[] .= $p['filename'];
            $i++;
        }
    }

    if($requestMethod == 'POST' && $requestRessource == 'update-picture') {
        if(isset($_SESSION['mail'])) {
            $picture = "/assets/profilpictures/".$_POST['picture'].".png";
            $request = "UPDATE profile SET picture = :picture WHERE mail=:mail";
            $query = $db->prepare($request);
            $query->execute(array(
                ':mail' => $_SESSION['mail'],
                ':picture' => $picture
            ));
            $data = $_POST['picture'];
        }
    }

    // Check if an user is connected
    if($requestMethod == 'GET' && $requestRessource == 'show-profile') {
        if(isset($_SESSION['mail'])) {
            $request = "SELECT * FROM profile pf JOIN city ct ON ct.insee = pf.insee ";
            $request .= "WHERE mail=:mail";
            $query = $db->prepare($request);
            $query->bindParam(':mail', $_SESSION['mail'], PDO::PARAM_STR, 100);
            $query->execute();
            $data = $query->fetchAll();

            $data['age'] = date(date_diff(date_create($data[0]['birthdate']), date_create(date('Y-m-d')))->format('%y'));
        }
    }

    if($requestMethod == 'POST' && $requestRessource == 'update-infos') {
        $data = "good";
            $mail = $_POST['mail'];
            if($_POST['firstname'] != '') {$firstname = $_POST['firstname'];} else {$data = 'firstname';}
            if($_POST['lastname'] != '') {$lastname = $_POST['lastname'];} else {$data = 'lastname';}
            if($_POST['birthdate'] != '') {$birthdate = $_POST['birthdate'];} else {$data = 'birthdate';}
            if($_POST['password'] != '') {$password = password_hash($_POST['password'], PASSWORD_ARGON2I);} else {$data = "password";}

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

            if($data == "good") {
                $request_sql = "UPDATE profile SET first_name = :firstname, last_name = :lastname, password = :password, birthdate = :birthdate, insee = :city WHERE mail = :mail";
                $query = $db->prepare($request_sql);
                $query->execute(array(
                    ':mail'=>$mail,
                    ':firstname'=>$firstname,
                    ':lastname'=>$lastname,
                    ':password'=>$password,
                    ':birthdate'=>$birthdate,
                    ':city'=>$city
                ));
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