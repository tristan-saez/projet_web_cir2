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

    //create user
    if($requestMethod == 'GET' && $requestRessource == 'filter-match-list') {
        $request_sql = "SELECT m.id, m.date, m.start_hour, m.duration, m.name, m.address, m.nb_player, c.name, s.name, s.picture FROM match_event m JOIN city c ON c.insee = m.insee JOIN sports s ON s.id = m.id_sports";
        $query = $db->prepare($request_sql);
        $query->execute();
        $data = $query->fetchAll();
        
        foreach($data as $key => $value) {
            $request_sql = "SELECT COUNT(DISTINCT p.mail) FROM match_event m JOIN participe_a p ON p.id =:m_id WHERE p.demand = 1";
            $query = $db->prepare($request_sql);
            $query->execute(array(
                ':m_id'=>$value[0]
            ));
            $result = $query->fetchAll();
            //var_dump($result[0][0]);
            $data[$key]['current_players'] = $result[0][0];
        }
        

    }

    if($requestMethod == 'GET' && $requestRessource == 'filter-match-created-list') {
        $request_sql = "SELECT m.id, m.date, m.start_hour, m.duration, m.name, m.address, m.nb_player, c.name, s.name, s.picture FROM match_event m JOIN city c ON c.insee = m.insee JOIN sports s ON s.id = m.id_sports WHERE m.mail =:mail";
        $query = $db->prepare($request_sql);
        $query->execute(array(
            ':mail'=>$_SESSION['mail']
        ));
        $data = $query->fetchAll();
        
        foreach($data as $key => $value) {
            $request_sql = "SELECT COUNT(DISTINCT p.mail) FROM match_event m JOIN participe_a p ON p.id =:m_id WHERE p.demand = 1";
            $query = $db->prepare($request_sql);
            $query->execute(array(
                ':m_id'=>$value[0]
            ));
            $result = $query->fetchAll();
            //var_dump($result[0][0]);
            $data[$key]['current_players'] = $result[0][0];
        }
    }

    if($requestMethod == 'GET' && $requestRessource == 'filter-match-coming-list') {
        $request_sql = "SELECT m.id, m.date, m.start_hour, m.duration, m.name, m.address, m.nb_player, c.name, s.name, s.picture FROM participe_a p JOIN match_event m ON p.id = m.id JOIN city c ON c.insee = m.insee JOIN sports s ON s.id = m.id_sports WHERE p.mail =:m_mail AND p.demand = 1";
        $query = $db->prepare($request_sql);
        $query->execute(array(
            ':m_mail'=>$_SESSION['mail']
        ));
        $data = $query->fetchAll();
        
        //var_dump($data);
        foreach($data as $key => $value) {
            $request_sql = "SELECT COUNT(DISTINCT p.mail) FROM match_event m JOIN participe_a p ON p.id =:m_id WHERE p.demand = 1";
            $query = $db->prepare($request_sql);
            $query->execute(array(
                ':m_id'=>$value[0]
            ));
            $result = $query->fetchAll();
            //var_dump($result[0][0]);
            $data[$key]['current_players'] = $result[0][0];
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