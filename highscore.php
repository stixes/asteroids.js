<?php /**
* This file handles the highscore microservice, and supports POSTing a new score,
* and GETing the current highscore.
*/
define('DB_FILE',"/srv/data/highscore.db");

header('Content-Type: application/json');

# Open and lock file
global $fd;
$fd = fopen(DB_FILE,"r");
flock($fd, LOCK_SH) or die("File lock problem");

/**
* Just returns the highscore
*/
function returnHighscore() {
  global $fd;
  echo fread($fd,filesize(DB_FILE));
}

/**
* Input validation for score insertion
*/
function checkInput() {
  return is_numeric($_POST['score']) && isset($_POST['name']);
}

/**
* Add a score to the list
*/
function insertScore() {
  global $fd;
  $fd = fopen(DB_FILE,"r+");
  flock($fd, LOCK_EX) or die("File lock problem");
  // read list
  $hs = json_decode(fread($fd,filesize(DB_FILE)));
  // add score
  $hs[]=array(
    (int)$_POST['score'],
    $_POST['name']
  );
  // sort list
  array_multisort(array_column($hs,0),SORT_DESC,SORT_NUMERIC,$hs);
  // prune to 10 highest scores
  $hs = array_slice($hs,0,10);
  ftruncate($fd,0);
  rewind($fd);
  fwrite($fd,json_encode($hs));
}

## Main switch
switch($_SERVER['REQUEST_METHOD']) {
  case 'GET': returnHighscore(); break;
  case 'POST': if (checkInput()) insertScore();
                else die(json_encode(array("error"=>"Faulty input","data"=>file_get_contents("php://input"))));
               break;
  default: die(json_encode(array("error"=>"Unsupported method")));
}

# Close up nicely
fclose($fd);
exit;
