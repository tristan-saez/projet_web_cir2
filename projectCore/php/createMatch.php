<?php
    // Check the request.
    require_once('database.php');
    session_start();

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
    if($requestMethod == 'POST' && $requestRessource == 'create-match') {
        $data = "good";

        if($_POST['eventname'] != '') {$eventname = $_POST['eventname'];} else {$data = 'eventname';}
        if($_POST['eventdate'] != '') {$eventdate = $_POST['eventdate'];} else {$data = 'eventdate';}
        if($_POST['eventduration'] != '') {$eventduration = $_POST['eventduration'];} else {$data = 'eventduration';}
        if($_POST['price'] != '') {$price = $_POST['price'];} else {$data = "price";}
        if($_POST['playernumber'] != '') {$playernumber = $_POST['playernumber'];} else {$data = "playernumber";}

        if($_POST['eventplace'] != '') {
            $request_sql = "SELECT insee FROM city ";
            $request_sql .= "WHERE name=:eventplace";
            $query = $db->prepare($request_sql);
            $query->bindParam(':eventplace', $_POST['eventplace'], PDO::PARAM_STR, 100);
            $query->execute();
            $results = $query->fetchAll();

            if($results) {
                $insee = $results[0]['insee'];
            } else {
                $data = "eventplace";
            }
        } else {
            $data = "eventplace"; 
        }

        if($_POST['sport'] != '') {
            $request_sql = "SELECT id FROM sports ";
            $request_sql .= "WHERE name=:sport";
            $query = $db->prepare($request_sql);
            $query->bindParam(':sport', $_POST['sport'], PDO::PARAM_STR, 100);
            $query->execute();
            $results = $query->fetchAll();

            if($results) {
                $id_sports = $results[0]['id'];
            } else {
                $data = "sport";
            }
        } else {
            $data = "sport"; 
        }

        if($_POST['eventaddress'] != '') {$eventaddress = $_POST['eventaddress'];} else {$data = "eventaddress";}
        if($_POST['startingtime'] != '') {$startingtime = $_POST['startingtime'];} else {$data = "startingtime";}
        if($_SESSION['mail'] != '') {$mail = $_SESSION['mail'];} else {$data = 'connection';}

        if($data = "good") {
            $request_sql = "INSERT INTO match_event (date, start_hour, price, duration, name, address, nb_player, id_sports, mail, insee) VALUES (:date, :start_hour, :price, :duration, :match_name, :address, :nb_player, :id_sports, :mail, :insee)";
            $query = $db->prepare($request_sql);
            $query->execute(array(
                ':date'=>$eventdate,
                ':start_hour'=>$startingtime,
                ':price'=>$price,
                ':duration'=>$eventduration,
                ':match_name'=>$eventname,
                ':address'=>$eventaddress,
                ':nb_player'=>$playernumber,    
                ':id_sports'=>$id_sports,
                ':mail'=>$mail,
                ':insee'=>$insee
            ));

            //$request_sql = "INSERT INTO a_lieu_a (id, insee) VALUES (:id, :insee)";
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