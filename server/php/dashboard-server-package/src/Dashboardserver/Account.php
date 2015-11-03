<?php

namespace Dashboardserver;

class Account
{
    private $base;
    private $blocks = '/blocks';
    private $sites = '/sites';
    private $themes = '/themes';
    private $jsonPages = '/data/pages.json';
    private $url;
    private $country;
    private $language;
    private $account;

    public function setAccountBasePath($path)
    {
        // $path no trailing slash if trailing path then remove
      // check if file exists
      $this->base = $path.$this->account;
    }

    private function getCompletePage()
    {

        //FIXME for small site this is ok big site ??? performance issues
        $jsonPages = $this->getJsonPages();
        //echo $jsonPages.'<br>';
        if (file_exists($jsonPages)) {
            $strJson = file_get_contents($jsonPages);
            $pages = json_decode($strJson, true);
          //print_r($pages);
          //echo '<pre>';
          //echo 'url : '.$this->server->getUrl().'<br>';
          foreach ($pages as $page) {
              if ($this->server->getUrl() == $page['url']) {
                  return $page; // yup just the first page
              }
          }
        }

        return false;
    }
    private function getCorrectVersion($page)
    {
        return $page;
    }

    public function getPageFolder()
    {
        $page = $this->getCompletePage();

        //print_r($page);

        return $page['page'].'/';
    }

    public function getVersionFolder()
    {
        // needs caching and optimizing
        $page = $this->getCompletePage();
        //print_r($page);
        $versions = $page['versions'];

        return $versions[0]['title'].'/';
    }

    public function getPage()
    {
        $page = $this->getCompletePage();
        if (!$page) {
            return $page;
        }
        $version = $this->getCorrectVersion($page);

        return $version;
    }

    public function getPageDir()
    {
        $site = $this->getSite();
    }
    public function setServerEnv($server)
    {
        $this->server = $server;
    }

    public function __construct($account)
    {
        $this->account = $account;
    }
    public function getBase()
    {
        return $this->base;
    }
    public function getBlocks()
    {
        return  $this->base.$this->blocks;
    }
    public function getSites()
    {
        return $this->base.$this->sites;
    }
    public function getThemes()
    {
        return $this->base.$this->themes;
    }
    public function getJsonPages()
    {
        return $this->getSites().$this->jsonPages;
    }
    public function getLanguage()
    {
    }
    public function getCountry()
    {
    }
    public function getUrl()
    {
        return $this->url;
    }
}
