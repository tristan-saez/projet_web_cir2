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

    // Send data to the client.
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-control: no-store, no-cache, must-revalidate');
    header('Pragma: no-cache');
    header('HTTP/1.1 200 OK');
    echo json_encode($data);
    exit;
?>