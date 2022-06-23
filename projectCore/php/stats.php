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
    if($requestMethod == 'POST' && $requestRessource == 'display-details') {
        $match =  $_POST['match'];

        $request_sql = "SELECT m.date, m.name, m.address, m.score, c.name, s.name, s.picture FROM match_event m JOIN city c ON c.insee = m.insee JOIN sports s ON s.id = m.id_sports WHERE m.id=:match_id";
        $query = $db->prepare($request_sql);
        $query->execute(array(
            ':match_id' => $match
        ));
        $data = $query->fetchAll();
        
        $request_sql = "SELECT DISTINCT prfl.first_name, prfl.last_name, prfl.picture, prfl.mail, p.is_best_player, p.demand FROM match_event m JOIN participe_a p ON p.id =:m_id JOIN profile prfl ON prfl.mail = p.mail";
        $query = $db->prepare($request_sql);
        $query->execute(array(
            ':m_id'=>$match
        ));
        $result = $query->fetchAll();
        //var_dump($result[0][0]);
        $data['currentplayers'] = $result;

        //var_dump($data);
    }

    if($requestMethod == 'POST' && $requestRessource == 'get-profile-picture') {
        $profile =  $_POST['profile-picture'];

        $request_sql = "SELECT picture FROM profile WHERE mail=:mail";
        $query = $db->prepare($request_sql);
        $query->execute(array(
            ':mail' => $profile
        ));
        $data = $query->fetchAll();
        $data = $data[0][0];
    }

    if($requestMethod == 'POST' && $requestRessource == 'set-stats') {
        $match =  $_POST['match'];
        $mail = $_POST['star'];

        $score = (($_POST['score1'] != "null")?strval($_POST['score1']):"|");
        $score .= " - ";
        $score .= (($_POST['score2'] != "null")?strval($_POST['score2']):"|");

        $request_sql = "UPDATE match_event SET score=:score WHERE id=:match_id";
        $query = $db->prepare($request_sql);
        $query->execute(array(
            ':match_id' => $match,
            ':score' => $score
        ));

        $request_sql = "UPDATE participe_a SET is_best_player = 1 WHERE id=:match_id AND mail =:mail";
        $query = $db->prepare($request_sql);
        $query->execute(array(
            ':match_id' => $match,
            ':mail' => $mail
        ));

        $data = "done";

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