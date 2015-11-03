<?php

namespace Dashboardserver\Locale\Strategies;

abstract class AbstractStrategy
{
    abstract protected function getFolder();
    abstract protected function setHost($host);

    public function setServerEnv($server)
    {
        $this->server = $server;
    }
}
