<?php
    session_start();

     if($requestMethod == 'GET') {
        if ($requestRessource == 'check-connection' && !($_SESSION['connected'])) {
            $_SESSION['connected'] = 1;

        }
     }

?>