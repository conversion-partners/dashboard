<?php

require __DIR__.'/../vendor/autoload.php';

use Dashboardserver\Server as Server;
use Dashboardserver\Config as Config;

class DomainFolderStrategyTest extends \PHPUnit_Framework_TestCase
{
    public function testAccountGetPageVersionData()
    {
        $config = new Config();
        $config->setDebug(true);
        $config->setDomains(array('easydrain.com' => 'easydrain', 'easydrain.nl' => 'easydrain'));
        $config->setDomainAliases(array('www.easydrain.com' => 'easydrain.com', 'acceptance.easydrain.com' => 'easydrain.com'));
        $config->setLocaleStrategy('DomainFolder');
        $config->setServerStrategy('Nginx');
        $config->setAccountPath('data/accounts/');

        $server_env = array(
          'HTTP_HOST' => 'easydrain.nl',
          'REQUEST_URI' => '/reference-hotels-w',
          );

        $server = new Server($config, $server_env);
        if ($server->pageExists()) {
            $server->showPage();
        }
    }
}
