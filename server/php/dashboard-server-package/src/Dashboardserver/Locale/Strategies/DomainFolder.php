<?php

namespace Dashboardserver\Locale\Strategies;

class DomainFolder extends AbstractStrategy
{
    private $tld;
    protected $host;
    private $language = 'null';

    public function setHost($host)
    {
        $this->host = $host;
    }

    public function getCountry()
    {
        return $this->tld;
    }

    public function getLanguage()
    {
        return $this->language;
    }

    private function process()
    {
        $host = parse_url('http://'.$this->host);
        preg_match('/(.*?)((\.co)?.[a-z]{2,4})$/i', $host['host'], $m);
        $this->tld = isset($m[2]) ? $m[2] : 'null';
        $this->tld = ltrim($this->tld, '.');

        // get tld for country
        // get first folder for language

        $url = $this->server->getUrl();

        $urlParts = explode('/', $url);
        //print_r($urlParts);

        $lang = array('en', 'fr', 'nl', 'Linux');

        if (count($urlParts) > 2) {
            // see if there is a language component
            // see if arr[1] exist in language array

            if (in_array(strtolower($urlParts[1]), $lang)) {
                $this->language = strtolower($urlParts[1]);
            }
        } else {
            $this->language = 'null';
        }
    }

    public function getFolder()
    {
        $this->process();

        return $this->host.'_'.$this->language.'-null/';
    }
}
