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
    if($requestMethod == 'GET' && $requestRessource == 'check-connection') {
        if(isset($_SESSION['mail'])) {
            $data = $_SESSION['mail'];
        } elseif(!isset($_SESSION['mail'])) {
            $data = 0;
        }
    }

    //connect user
    if($requestMethod == 'POST' && $requestRessource == 'account-connect') {
        $request = "SELECT password FROM profile ";
        if($_POST['mail'] != '') {
            $request .= "WHERE mail=:mail";
            $query = $db->prepare($request);
            $query->bindParam(':mail', $_POST['mail'], PDO::PARAM_STR, 100);
            $query->execute();
            $results = $query->fetchAll();


            if($results) {
                $pass = password_verify($_POST['password'],$results[0]['password']);
                if($pass) {
                    $data = "success";
                    $_SESSION['mail'] = $_POST['mail'];
                } else {
                    $data = "password";
                }
            } else {
                $data = "mail";
            }
        } else {
            $data = "mail";
        }
    }

    //disconnect user
    if($requestMethod == 'POST' && $requestRessource == 'account-disconnect') {
        $data = "disconnected";
        session_destroy();
    }
    
    // Send data to the client.
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-control: no-store, no-cache, must-revalidate');
    header('Pragma: no-cache');
    header('HTTP/1.1 200 OK');
    echo json_encode($data);
    exit;
?>