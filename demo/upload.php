<?php

include '../Maquita.php';

$maquita = new Maquita();

$path = './uploads/';

echo '<h2>WEBP IMAGES:</h2> <br><br>';
$image_w = $maquita->move($_POST['wide'], $path);
echo "<img src='$path$image_w'>";

$image_l = $maquita->move($_POST['landscape'], $path);
echo "<img src='$path$image_l'>";

echo '<h2>JPG IMAGES:</h2> <br><br>';
$image_w = $maquita->move($_POST['wide'], $path, 'jpg');
echo "<img src='$path$image_w'>";

$image_l = $maquita->move($_POST['landscape'], $path, 'jpg');
echo "<img src='$path$image_l'>";

echo '<h2>PNG IMAGES:</h2> <br><br>';
$image_w = $maquita->move($_POST['wide'], $path, 'png');
echo "<img src='$path$image_w'>";

$image_l = $maquita->move($_POST['landscape'], $path, 'png');
echo "<img src='$path$image_l'>";