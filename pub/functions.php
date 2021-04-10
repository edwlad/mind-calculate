<?php

function _dd($var, $msg = "")
{
    //global $current_user;
    //if (current_user_can('administrator')) :
        $bt = debug_backtrace();
        $bt = $bt[0];
        $dRoot = $_SERVER["DOCUMENT_ROOT"];
        $dRoot = str_replace("/", "\\", $dRoot);
        $bt["file"] = str_replace($dRoot, "", $bt["file"]);
        $dRoot = str_replace("\\", "/", $dRoot);
        $bt["file"] = str_replace($dRoot, "", $bt["file"]);
        ?>
        <div style="font-size:12px; color:#000; background:#FFF; border:1px dashed #000; line-height:normal;">
            <div style="padding: 3px 5px; background:#99CCFF; font-weight:bold;">
                File: <?= $bt["file"] ?>[<?= $bt["line"] ?>]
            </div>
            <pre style="padding: 10px; line-height:normal;">
                <? print_r($var) ?>
            </pre>
        </div>
    <?php
    //endif;
    return;
}

function _dm($var)
{
    //global $current_user;
    //if (current_user_can('administrator')) :
        $bt = debug_backtrace();
        $bt = $bt[0];
        $dRoot = $_SERVER["DOCUMENT_ROOT"];
        $dRoot = str_replace("/", "\\", $dRoot);
        $bt["file"] = str_replace($dRoot, "", $bt["file"]);
        $dRoot = str_replace("\\", "/", $dRoot);
        $bt["file"] = str_replace($dRoot, "", $bt["file"]);

        $time = date("H-i-s");
        $fp = fopen($_SERVER["DOCUMENT_ROOT"].'/log_'.$time.'_'.$bt["line"].'.html', 'w');
        $mytext =
            '<div style="font-size:12px;
            color:#000;
            background:#FFF;
            border:1px dashed #000;">' .
            '<div style="padding: 3px 5px; 
            background:#99CCFF;
            font-weight:bold;">File: ' . $bt["file"] . ' [' . $bt["line"] . ']</div>' .
            '<pre style="padding: 10px;">' . var_export($var, true) . '</pre>';
        fwrite($fp, $mytext);
        fclose($fp);
    //endif;
    return;
}

function start($par)
{
    $maxNom = 12;
    $znak = [
        'plus'=>['type'=>'+', 'vid'=>'+'],
        'minus'=>['type'=>'-', 'vid'=>'-'],
        'umn'=>['type'=>'*', 'vid'=>'*'],
        'del'=>['type'=>'/', 'vid'=>':']
    ];
    $cfg = [
        'd1'=>['beg'=>1,'end'=>9],
        'd2'=>['beg'=>10,'end'=>99],
        'd3'=>['beg'=>100,'end'=>999],
    ];
    $out = array();
    $outPar = array();
    
    $outPar['one'] = (array_key_exists($par['one'], $cfg)) ? $par['one'] : 'd2';
    $outPar['two'] = (array_key_exists($par['two'], $cfg)) ? $par['two'] : 'd1';
    $flSet = true;
    foreach ($znak as $key => $value) {
        if ($par[$key] == true) {
            $outPar[$key] = true;
            $flSet = false;
        } else {
            $outPar[$key] = false;
        }
    }
    if ($flSet) {
        $outPar['plus'] = true;
        $outPar['minus'] = true;
    }
    unset($flSet);

    for ($i=0; $i < $maxNom; $i++) {
        $kol= -1;
        foreach ($znak as $key => $value) {
            if ($outPar[$key]) {
                $kol++;
                $s1 = mt_rand($cfg[$outPar['one']]['beg'], $cfg[$outPar['one']]['end']);
                $s2 = mt_rand($cfg[$outPar['two']]['beg'], $cfg[$outPar['two']]['end']);
                if ($key == 'del') {
                    $s3 = (int)($s1 / $s2);
                    $s1 = $s2 * $s3;
                } else {
                    eval('$s3=$s1'.$value['type'].'$s2;');
                }
                $out[] = array(
                    'id'=>'p'.$i.$kol,
                    'primer'=>$s1.' '.$value['vid'].' '.$s2,
                    'otvet'=>$s3,
                );
            }
        }
        $i += ($kol>0) ? $kol : 0;
    }

    return ['spisok'=>$out, 'props'=>$outPar];
}

function table($par)
{
    $maxNom = 8;
    $out = [];
    $outPar = array();
    
    // проверка/создание параметров
    $outPar['cfgSet'] = (is_array($par['cfgSet'])) ? $par['cfgSet'] : array();
    $outPar['tableSort'] = (isset($par['tableSort'])) ? $par['tableSort'] : 'line';
    $flSet = true;
    for ($i=2; $i <= 9; $i++) {
        if ($par['table-'.$i] == true) {
            $outPar['table-'.$i] = true;
            $flSet = false;
        } else {
            $outPar['table-'.$i] = false;
        }
    }
    if ($flSet) {
        for ($i=2; $i <= 9; $i++) {
            $outPar['table-'.$i] = true;
        }
        $outPar['cfgSet'] = array();
    }
    unset($flSet);

    $flRestart = true;
    // проверка/создание списка примеров
    if (!empty($outPar['cfgSet'])) {
        // провекрка на наличие "неиспользоваых" примеров
        foreach ($outPar['cfgSet'] as $key => $value) {
            if (substr($value, -1) == '0') {
                $flRestart = false;
                break;
            }
        }
        // если все примеры были - то рестарт
        if ($flRestart) {
            foreach ($outPar['cfgSet'] as $key => $value) {
                $outPar['cfgSet'][$key] = substr($value, 0, 2) . '0';
            }
        }
    } else {
        // если нет списка примеров - то создаём
        for ($i=2; $i <= 9; $i++) {
            if ($outPar['table-'.$i] == true) {
                for ($k=2; $k <=9; $k++) {
                    $outPar['cfgSet'][] = $i.$k.'0';
                }
            }
        }
    }
    // пересортировка списка если есть
    if ($flRestart) {
        $tableNew = array();
        if ($outPar['tableSort'] == 'random') {
            foreach ($outPar['cfgSet'] as $key => $value) {
                $temp = (int)substr($value, 0, 1)*100;
                $tableNew[mt_rand($temp, $temp + 99) * 100 + $key] = $value;
            }
            unset($temp);
        } elseif ($outPar['tableSort'] == 'full-random') {
            foreach ($outPar['cfgSet'] as $key => $value) {
                $tableNew[mt_rand(0, 999) * 100 + $key] = $value;
            }
        } else {
            $outPar['tableSort'] = 'line';
        }
        if (!empty($tableNew)) {
            ksort($tableNew);
            $outPar['cfgSet'] = array_values($tableNew);
        }
        unset($tableNew);
    }
    // вывод списка примеров
    $kol = 0;
    foreach ($outPar['cfgSet'] as $key => $value) {
        if (substr($value, -1) == '0') {
            $kol ++;
            $outPar['cfgSet'][$key] = strtr($value, '0', '1');
            $s1 = (int)(substr($value, 0, 1));
            $s2 = (int)(substr($value, 1, 1));
    
            $out[] = array(
                'id'=>'p'.$kol,
                'primer'=>$s1.' * '.$s2,
                'otvet'=>$s1*$s2,
            );
        }
        if ($kol == $maxNom) {
            break;
        }
    }

    return ['spisok'=>$out, 'props'=>$outPar];
}

function nabor($par)
{
    
    $out = [];
    $outPar = array();
    $primers = ['nabor1', 'nabor2', 'nabor3'];
    
    // проверка/создание параметров
    $outPar['cfgSet'] = (is_array($par['cfgSet'])) ? $par['cfgSet'] : array();
    $flSet = true;
    foreach ($primers as $value) {
        if ($par['primer'] ==  $value) {
            $outPar['primer'] = $value;
            $flSet = false;
            break;
        }
    }
    if ($flSet) {
        $outPar['primer'] = $primers[0];
        $outPar['cfgSet'] = array();
    }
    unset($flSet);
    
    $flRestart = true;
    $patOne = './nabor/'.$outPar['primer'].'-';
    $patExt = '.txt';
    $spisok = array();
    // поиск файлов
    if (!empty($outPar['cfgSet'])) {
        // провекрка на наличие "неиспользоваых" примеров
        foreach ($outPar['cfgSet'] as $value) {
            if (substr($value, -1) == '0') {
                $flRestart = false;
                break;
            }
        }
        // если все примеры были - то рестарт
        if ($flRestart) {
            foreach ($outPar['cfgSet'] as $key => $value) {
                $outPar['cfgSet'][$key] = substr($value, 0, 2) . '0';
            }
        }
    } else {
        // если нет списка примеров - то создаём
        foreach (glob($patOne.'*'.$patExt) as $filename) {
            $outPar['cfgSet'][] = substr($filename, -6, 2) . '0';
        }
    }
    // пересортировка списка
    if ($flRestart) {
        $tableNew = array();
        foreach ($outPar['cfgSet'] as $key => $value) {
            $tableNew[mt_rand(0, 999) * 100 + $key] = $value;
        }
        if (!empty($tableNew)) {
            ksort($tableNew);
            $outPar['cfgSet'] = array_values($tableNew);
        }
        unset($tableNew);
    }
    // поиск списка примеров
    foreach ($outPar['cfgSet'] as $key => $value) {
        if (substr($value, -1) == '0') {
            $outPar['cfgSet'][$key] = substr($value, 0, 2) . '1';
            $spisok = file($patOne . substr($value, 0, 2) . $patExt);
            break;
        }
    }
    // вывод примеров
    if ($outPar['primer']=='nabor1') {
        $outPar['head'] = 'Время на решение: 3 минуты - отлично, 4 минуты - хорошо, 5 минут - удовлетворительно.';
    } elseif ($outPar['primer']=='nabor2') {
        $outPar['head'] = 'Время на решение: 4 минуты - отлично, 5 минут - хорошо, 6 минут - удовлетворительно.';
    } elseif ($outPar['primer']=='nabor3') {
        $outPar['head'] = 'Время на решение: 3,5 минуты - отлично, 4,5 минуты - хорошо, 5 минут - удовлетворительно.';
    }
    foreach ($spisok as $key => $value) {
        $value = trim($value);
        $tekId = 'p'.$key;
        $sv = str_replace([';','/','*'], [' ',':','*'], $value);
        eval('$sz='.str_replace(';', '', $value).';');

        $out[] = array(
            'id'=>'p'.$key,
            'primer'=>$sv,
            'otvet'=>$sz,
        );
    }

    return ['spisok'=>$out, 'props'=>$outPar];
}
