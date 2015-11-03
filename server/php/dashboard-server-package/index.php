<?php


include_once dirname(__FILE__).'/src/Dashboardserver/Config.php';
require __DIR__.'/vendor/autoload.php';
use Dashboardserver\Server;
use Dashboardserver\Config;

$config = new Config();
$config->setDebug(true);
$config->setDomains(array('easydrain.com' => 'easydrain', 'www.easydrain.com' => 'easydrain', 'easydrain.nl' => 'easydrain', 'easydrain.co.uk' => 'easydrain', 'www.easydrain.co.uk' => 'easydrain'));
$config->setDomainAliases(array('www.easydrain.co.uk' => 'www.easydrain.com', 'www.easydrain.com' => 'easydrain.com', 'acceptance.easydrain.com' => 'easydrain.com'));
$config->setLocaleStrategy('DomainFolder');
$config->setServerStrategy('Nginx');
if (isset($_SERVER['APPLICATION_ENV']) && $_SERVER['APPLICATION_ENV'] == 'develop') {
    $config->setAccountPath('/var/www/easy-sanitary-solutions/html/dashboard/data/accounts/');
} else {
    $config->setAccountPath('/var/www/html/dashboard/data/accounts/');
}

if ($config->getDebug()) {
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
}

$server_env = array(
  'HTTP_HOST' => 'easydrain.nl',
  'REQUEST_URI' => '/reference-hotels-w',
  );

$server_env = $_SERVER;

$server = new Server($config, $server_env);

// Aliasses now working!!!!!!!!!!!!!!!!!!!!!!!!!!!! cleanup !!!!!!!!!!!!!!!!!!!!!!!!

/**
echo "<pre>";
var_dump($config);
var_dump($server);
**/


if ($server->pageExists()) {
    $server->showPage();
    die();
}
//exit;
