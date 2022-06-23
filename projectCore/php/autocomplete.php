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

    $city = strtolower($_GET['city'])."%";

    //var_dump($city);

    $request_sql = "SELECT name FROM city WHERE LOWER(name) LIKE :city";
    $query = $db->prepare($request_sql);
    $query->execute(array(
        ':city' => $city
    ));
    $data = $query->fetchAll();

    // Send data to the client.
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-control: no-store, no-cache, must-revalidate');
    header('Pragma: no-cache');
    header('HTTP/1.1 200 OK');
    echo json_encode($data);
    exit;
?>

    // Send data to the client.
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-control: no-store, no-cache, must-revalidate');
    header('Pragma: no-cache');
    header('HTTP/1.1 200 OK');
    echo json_encode($data);
    exit;
?>