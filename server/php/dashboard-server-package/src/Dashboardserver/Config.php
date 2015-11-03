<?php

namespace Dashboardserver;

class Config
{
    private $domains = null;
    private $domainAliases = null;
    private $debug = null;
    private $localeStrategy = null;
    private $serverStrategy = null;
    private $accountPath = null;
    private $requestDomain = null;
    private $host = null;

    public function getAccount()
    {
      // needs cleanup
        $aliasDomain = isset($this->domainAliases[$this->requestDomain]) ? $this->domainAliases[$this->requestDomain] : false;
        $account = '';
        if ($aliasDomain) {
            $account = isset($this->domains[$aliasDomain]) ? $this->domains[$aliasDomain] : false;
            $this->host = $aliasDomain;
        }

        if (!$account && !$aliasDomain) {
            $account = isset($this->domains[$this->requestDomain]) ? $this->domains[$this->requestDomain] : false;
            $this->host = $this->requestDomain;
        }

        return $account;
    }

    public function getHost()
    {

        // if aliasDomain
        // return alias
        if(isset($this->domainAliases[$this->host])){
          return $this->domainAliases[$this->host];
        }
        return $this->host;
    }

    public function setRequestDomain($host)
    {
        $this->requestDomain = $host;
    }

    public function setAccountPath($path)
    {
        $this->accountPath = $path;
    }

    public function getAccountPath()
    {
        return $this->accountPath;
    }

    public function setLocaleStrategy($strategy)
    {
        $class = 'Dashboardserver\Locale\Strategies\\'.$strategy;
        $this->localeStrategy = new $class();
    }

    public function getLocaleStrategy()
    {
        return $this->localeStrategy;
    }

    public function setServerStrategy($strategy)
    {
        $class = 'Dashboardserver\Server\Strategies\\'.$strategy;
        $this->serverStrategy = new $class();
    }

    public function getServerStrategy()
    {
        return $this->serverStrategy;
    }

    public function setDebug($debug)
    {
        if ($this->debug == null) {
            $this->debug = $debug;
        }

        return $this;
    }

    public function getDebug()
    {
        return $this->debug;
    }

    public function setDomainAliases($aliases)
    {
        $this->domainAliases = $aliases;
    }

    public function getDomains()
    {
        return $this->domains;
    }

    public function setDomains($domains)
    {
        if ($this->domains == null) {
            $this->domains = $domains;
        }

        return $this;
    }
}
