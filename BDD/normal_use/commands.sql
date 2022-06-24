





INSERT INTO `profile` (`mail`, `first_name`, `last_name`, `password`, `picture`, `played_matches`, `app_note`, `birthdate`, `physical_shape`, `insee`) VALUES ('david.poulet@gmail.com', 'David', 'Poulet', '$argon2i$v=19$m=65536,t=4,p=1$YWliYTZTdDRkR3RzZXR3cQ$T9y945XVReRX+j+nGkxRW/HLgh3nKWiThWXCsB6Rc+4', '/assets/profilpictures/pp_1.png', '0', '4', '2018-10-03', '3', '29019');
INSERT INTO `profile` (`mail`, `first_name`, `last_name`, `password`, `picture`, `played_matches`, `app_note`, `birthdate`, `physical_shape`, `insee`) VALUES ('thierry.golo@gmail.com', 'Thierry', 'Golo', '$argon2i$v=19$m=65536,t=4,p=1$YWliYTZTdDRkR3RzZXR3cQ$T9y945XVReRX+j+nGkxRW/HLgh3nKWiThWXCsB6Rc+4', '/assets/profilpictures/pp_15.png', '0', '5', '1942-02-01', '5', '30068');
INSERT INTO `profile` (`mail`, `first_name`, `last_name`, `password`, `picture`, `played_matches`, `app_note`, `birthdate`, `physical_shape`, `insee`) VALUES ('regis.lebail@gmail.com', 'Regis', 'Lebail', '$argon2i$v=19$m=65536,t=4,p=1$YWliYTZTdDRkR3RzZXR3cQ$T9y945XVReRX+j+nGkxRW/HLgh3nKWiThWXCsB6Rc+4', '/assets/profilpictures/pp_13.png', '0', '2', '1999-06-06', '2', '31278');
INSERT INTO `profile` (`mail`, `first_name`, `last_name`, `password`, `picture`, `played_matches`, `app_note`, `birthdate`, `physical_shape`, `insee`) VALUES ('francois.poir@gmail.com', 'François', 'Poire', '$argon2i$v=19$m=65536,t=4,p=1$YWliYTZTdDRkR3RzZXR3cQ$T9y945XVReRX+j+nGkxRW/HLgh3nKWiThWXCsB6Rc+4', '/assets/profilpictures/pp_1.png', '0', '5', '2018-10-03', '3', '29019');
INSERT INTO `profile` (`mail`, `first_name`, `last_name`, `password`, `picture`, `played_matches`, `app_note`, `birthdate`, `physical_shape`, `insee`) VALUES ('pierre.pap@gmail.com', 'Pierre', 'Papié', '$argon2i$v=19$m=65536,t=4,p=1$YWliYTZTdDRkR3RzZXR3cQ$T9y945XVReRX+j+nGkxRW/HLgh3nKWiThWXCsB6Rc+4', '/assets/profilpictures/pp_15.png', '0', '3', '1942-02-01', '1', '30068');
INSERT INTO `profile` (`mail`, `first_name`, `last_name`, `password`, `picture`, `played_matches`, `app_note`, `birthdate`, `physical_shape`, `insee`) VALUES ('francois.poir@gmail.com', 'Paul', 'Inne', '$argon2i$v=19$m=65536,t=4,p=1$YWliYTZTdDRkR3RzZXR3cQ$T9y945XVReRX+j+nGkxRW/HLgh3nKWiThWXCsB6Rc+4', '/assets/profilpictures/pp_13.png', '0', '3', '1999-06-06', '2', '31278');
INSERT INTO `match_event` (`id`, `date`, `start_hour`, `price`, `duration`, `score`, `name`, `address`, `nb_player`, `id_sports`, `mail`, `insee`) VALUES (1, '2022-06-28', '10:00:00', '10', '01:00:00', NULL, 'Match 1', '5 rue de la tourte', '10', '7', 'david.poulet@gmail.com', '29019');
INSERT INTO `match_event` (`id`, `date`, `start_hour`, `price`, `duration`, `score`, `name`, `address`, `nb_player`, `id_sports`, `mail`, `insee`) VALUES (2, '2022-06-10', '15:00:00', '15', '02:00:00', NULL, 'Match 2', '10 rue des gravillons', '4', '5', 'regis.lebail@gmail.com', '29019');
INSERT INTO `match_event` (`id`, `date`, `start_hour`, `price`, `duration`, `score`, `name`, `address`, `nb_player`, `id_sports`, `mail`, `insee`) VALUES (3, '2022-07-29', '11:00:00', '20', '01:30:00', NULL, 'Match 3', '28 rue de la mer', '12', '2', 'david.poulet@gmail.com', '35238');
INSERT INTO `match_event` (`id`, `date`, `start_hour`, `price`, `duration`, `score`, `name`, `address`, `nb_player`, `id_sports`, `mail`, `insee`) VALUES (4, '2022-06-30', '10:00:00', '10', '01:00:00', NULL, 'Match 4', '5 rue de la tourte', '10', '3', 'francois.poir@gmail.com', '29019');
INSERT INTO `match_event` (`id`, `date`, `start_hour`, `price`, `duration`, `score`, `name`, `address`, `nb_player`, `id_sports`, `mail`, `insee`) VALUES (5, '2022-05-10', '15:00:00', '15', '02:00:00', '4 - 5', 'Match 5', '10 rue des gravillons', '2', '6', 'francois.poir@gmail.com', '29019');
INSERT INTO `match_event` (`id`, `date`, `start_hour`, `price`, `duration`, `score`, `name`, `address`, `nb_player`, `id_sports`, `mail`, `insee`) VALUES (6, '2022-06-26', '11:00:00', '20', '01:30:00', NULL, 'Match 6', '28 rue de la mer', '12', '1', 'paul.inne@gmail.com', '35238');

INSERT INTO `participe_a` (`id`, `mail`, `demand`, `is_best_player`) VALUES ('5', 'david.poulet@gmail.com', '1', '0');
INSERT INTO `participe_a` (`id`, `mail`, `demand`, `is_best_player`) VALUES ('5', 'paul.inne@gmail.com', '1', '1');


INSERT INTO `participe_a` (`id`, `mail`, `demand`, `is_best_player`) VALUES ('2', 'pierre.pap@gmail.com', '1', '0');
INSERT INTO `participe_a` (`id`, `mail`, `demand`, `is_best_player`) VALUES ('2', 'regis.lebail@gmail.com', '1', '0');


INSERT INTO `participe_a` (`id`, `mail`, `demand`, `is_best_player`) VALUES ('1', 'francois.poir@gmail.com', '1', '0');
INSERT INTO `participe_a` (`id`, `mail`, `demand`, `is_best_player`) VALUES ('1', 'thierry.golo@gmail.com', '0', '0');
INSERT INTO `participe_a` (`id`, `mail`, `demand`, `is_best_player`) VALUES ('1', 'pierre.pap@gmail.com', '0', '0');
INSERT INTO `participe_a` (`id`, `mail`, `demand`, `is_best_player`) VALUES ('1', 'regis.lebail@gmail.com', '0', '0');





