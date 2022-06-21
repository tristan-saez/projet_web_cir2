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
    if($requestMethod == 'GET' && $requestRessource == 'match-list') {
        $request_sql = "SELECT m.id, m.date, m.start_hour, m.duration, m.name, m.address, m.nb_player, c.name, s.name, s.picture FROM match_event m JOIN city c ON c.insee = m.insee JOIN sports s ON s.id = m.id_sports";
        $query = $db->prepare($request_sql);
        $query->execute();
        $data = $query->fetchAll();
        // var_dump($data);
    }

    if($requestMethod == 'GET' && $requestRessource == 'match-created-list') {
        
    }
    // Send data to the client.
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-control: no-store, no-cache, must-revalidate');
    header('Pragma: no-cache');
    header('HTTP/1.1 200 OK');
    echo json_encode($data);
    exit;
?>