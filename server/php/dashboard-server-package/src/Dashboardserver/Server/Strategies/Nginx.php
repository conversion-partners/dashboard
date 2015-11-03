<?php

namespace Dashboardserver\Server\Strategies;

class Nginx extends AbstractServerStrategy
{
    public function getCleanServerEnv()
    {
        $this->serverObject->setHost($this->server['HTTP_HOST']);
        $this->serverObject->setUrl($this->server['REQUEST_URI']);

        return $this->serverObject;
    }
}
