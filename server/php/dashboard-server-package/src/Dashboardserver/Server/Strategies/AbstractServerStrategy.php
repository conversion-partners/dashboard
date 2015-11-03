<?php

namespace Dashboardserver\Server\Strategies;

abstract class AbstractServerStrategy
{
    public function setServerEnv($server)
    {
        $this->server = $server;

        return $this;
    }

    public function setServerObject($serverObj)
    {
        $this->serverObject = $serverObj;

        return $this;
    }

    public function getDomainLocaleFolder()
    {
        return $this->getValue();
    }
}
