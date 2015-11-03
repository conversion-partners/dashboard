<?php

namespace Dashboardserver\Server;

class ServerEnv
{
    private $host;
    private $url;

    public function setUrl($url)
    {
        $this->url = $url;
    }

    public function getUrl()
    {
        return $this->url;
    }

    public function setHost($host)
    {
        $this->host = $host;
    }
    public function getHost()
    {
        return $this->host;
    }
}
