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


    // if($requestMethod == 'POST' && $requestRessource == 'upload-picture') {
    //     var_dump($_POST);
    //     $data ="success";
    // }

    //function to join match
    if($requestMethod == 'POST' && $requestRessource == 'join-match') {
        $match =  $_POST['match'];
        $data = "good";

        $request_sql = "SELECT p.mail FROM participe_a p WHERE p.id=:match_id";
        $query = $db->prepare($request_sql);
        $query->execute(array(
            ':match_id' => $match
        ));
        $result_is_in = $query->fetchAll();

        // var_dump($_SESSION['mail']);
        foreach($result_is_in as $key => $value) {
            if($_SESSION['mail'] == $result_is_in[$key][0]) {
                $data = "is_in";
            }
        }
        //var_dump($result_is_in[0]);
        if($data == "is_in") {
            $data = "is_in";
        } else {
            $request_sql = "SELECT m.nb_player, m.date FROM match_event m WHERE m.id=:match_id";
            $query = $db->prepare($request_sql);
            $query->execute(array(
                ':match_id' => $match
            ));
            $result_max_player = $query->fetchAll();

            $request_sql = "SELECT COUNT(DISTINCT p.mail) FROM participe_a p WHERE p.id=:match_id AND p.demand = 1";
            $query = $db->prepare($request_sql);
            $query->execute(array(
                ':match_id' => $match
            ));
            $result_in_player = $query->fetchAll();

            // var_dump($result_in_player[0][0]);
            if($result_in_player[0][0] >= $result_max_player[0][0]) {
                $data = "limit";
            } else if(date_create($result_max_player[0][1]) > date_create(date('Y-m-d'))){
                $data = 'good';

                $request_sql = "INSERT INTO participe_a (id, mail, demand, is_best_player) VALUES (:id, :mail, 0, 0)";
                $query = $db->prepare($request_sql);
                $query->execute(array(
                    ':id'=>$match,
                    ':mail'=>$_SESSION['mail']
                ));
            } else {
                $data = "date";
            }
        }

        

        
        
    }

    //get details of a match
    if($requestMethod == 'POST' && $requestRessource == 'set-details') {
        $match =  $_POST['match'];

        $request_sql = "SELECT m.date, m.start_hour, m.duration, m.name, m.address, m.nb_player, m.price, m.duration, m.score, c.name, s.name, s.picture, prfl.first_name, prfl.last_name, prfl.mail FROM match_event m JOIN city c ON c.insee = m.insee JOIN sports s ON s.id = m.id_sports JOIN profile prfl ON prfl.mail = m.mail WHERE m.id=:match_id";
        $query = $db->prepare($request_sql);
        $query->execute(array(
            ':match_id' => $match
        ));
        $data = $query->fetchAll();
        
        $request_sql = "SELECT DISTINCT prfl.first_name, prfl.last_name, prfl.picture, p.is_best_player, p.demand, prfl.mail FROM match_event m JOIN participe_a p ON p.id =:m_id JOIN profile prfl ON prfl.mail = p.mail";
        $query = $db->prepare($request_sql);
        $query->execute(array(
            ':m_id'=>$match
        ));
        $result = $query->fetchAll();
        //var_dump($result[0][0]);
        $data['currentplayers'] = $result;

        if($data[0]['mail'] == $_SESSION['mail']) {
            $data['is_organiser'] = 1;
        } else {
            $data['is_organiser'] = 0;
        }
        //var_dump($data);
    }

    if($requestMethod == 'POST' && $requestRessource == 'accept-player') {
        $match =  $_POST['match'];
        $mail = $_POST['player'];

        //var_dump($mail);

        $request_sql = "SELECT p.demand FROM participe_a p WHERE p.id=:match_id AND p.mail = :mail";
        $query = $db->prepare($request_sql);
        $query->execute(array(
            ':match_id' => $match,
            ':mail'=> $mail
        ));
        $data = $query->fetchAll();
        
        //var_dump($data);
        if(isset($data)) {
            if($data[0][0] == 0) {
                $request_sql = "UPDATE participe_a SET demand = 1 WHERE id=:match_id AND mail = :mail";
                $query = $db->prepare($request_sql);
                $query->execute(array(
                ':match_id' => $match,
                ':mail'=> $mail
                ));
            }
        }
        $data = '0';
        //var_dump($data);
    }

    if($requestMethod == 'POST' && $requestRessource == 'refuse-player') {
        $match =  $_POST['match'];
        $mail = $_POST['player'];

        //var_dump($mail);

        $request_sql = "SELECT p.demand FROM participe_a p WHERE p.id=:match_id AND p.mail = :mail";
        $query = $db->prepare($request_sql);
        $query->execute(array(
            ':match_id' => $match,
            ':mail'=> $mail
        ));
        $data = $query->fetchAll();
        
        //var_dump($data);
        if(isset($data)) {
            if($data[0][0] == 0) {
                $request_sql = "DELETE FROM participe_a WHERE id=:match_id AND mail = :mail";
                $query = $db->prepare($request_sql);
                $query->execute(array(
                ':match_id' => $match,
                ':mail'=> $mail
                ));
            }
        }
        $data = '0';
        //var_dump($data);
    }

    // Send data to the client.
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-control: no-store, no-cache, must-revalidate');
    header('Pragma: no-cache');
    header('HTTP/1.1 200 OK');
    echo json_encode($data);
    exit;
?>