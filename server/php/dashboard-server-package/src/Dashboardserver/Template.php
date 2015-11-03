<?php


class Template
{
    private function engine()
    {
        $template = "Welcome {{name}} , You win \${{value}} dollars!!\n";
        $phpStr = LightnCandy::compile($template);  // compiled PHP code in $phpStr

    // Step 2A. (Usage 1) use LightnCandy::prepare to get rendering function
    //   DEPRECATED , it may require PHP setting allow_url_fopen=1 ,
    //   and allow_url_fopen=1 is not secure .
    //   When allow_url_fopen = 0, prepare() will create tmp file then include it,
    //   you will need to add your tmp directory into open_basedir.
    //   YOU MAY NEED TO CHANGE PHP SETTING BY THIS WAY
    $renderer = LightnCandy::prepare($phpStr);

    // Step 2B. (Usage 2) Store your render function in a file
    //   You decide your compiled template file path and name, save it.
    //   You can load your render function by include() later.
    //   RECOMMENDED WAY
    file_put_contents($php_inc, $phpStr);
        $renderer = include $php_inc;

    // Step 3. run native PHP render function any time
    echo "Template is:\n$template\n\n";
        echo $renderer(array('name' => 'John', 'value' => 10000));
        echo $renderer(array('name' => 'Peter', 'value' => 1000));
    }
}
