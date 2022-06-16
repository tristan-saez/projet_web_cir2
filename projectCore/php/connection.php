<?php
    session_start();
    // Check the request.
    require_once('database.php');
    require_once('hash.php');

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
    if($requestMethod == 'GET' && $requestRessource == 'check-connection') {
        if(isset($_SESSION['connected'])) {
            $data = $_SESSION['connected'];
        } elseif(!isset($_SESSION['connected'])) {
            $data = 0;
        }
    }

    //connect user
    if($requestMethod == 'POST' && $requestRessource == 'account-connect') {
        $hashed_pwd = hashing_pwd($_POST['password']);
        
    }

    // Send data to the client.
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-control: no-store, no-cache, must-revalidate');
    header('Pragma: no-cache');
    header('HTTP/1.1 200 OK');
    echo json_encode($data);
    exit;
?>