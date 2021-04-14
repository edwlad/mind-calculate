<?php

/*
if ($_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest') {
    echo json_encode('error');
    return;
}
*/
//require_once($_SERVER['DOCUMENT_ROOT'].'/functions.php');
require_once('./functions.php');

$par = json_decode(file_get_contents('php://input'), true);
if (!is_array($par)) {
    $par = array();
}
$out = array(); // ответный текст

/*
    //считывание из базы
    $flags = array(
        'userSave' => false // флаг сохранения параметров
    ); // флаги
    $userPar = array(); // параметры
    $site = null; // тип обращения к БД
    if ($site == 'modx') {
        //подключение modx
        define('MODX_API_MODE', true);
        require_once($_SERVER['DOCUMENT_ROOT'].'/index.php');
        $modx = new modX();
        $modx->initialize('web');
        // проверка на авторизацию
        $userPp = array(); // считаное о пользователе из базы
        $userId = $modx->user->id;
        if ($userId > 0) {
            $userPp = $modx->user->getOne('Profile');
            $userPar = json_decode($userPp->extended, true);
        }
    } elseif ($site=='wp') {
        //подключение wordpress
        define('WP_USE_THEMES', false);
        require_once($_SERVER['DOCUMENT_ROOT'].'/wp-load.php');
        // проверка на авторизацию
        $userId = get_current_user_id();
        if ($userId > 0) {
            $userPar = get_user_meta($userId, 'primer_par', true);
        }
    }
*/

// генерация ответа на запрос
if ($par['act'] == 'start') {
    $out = start($par['props']);
} elseif ($par['act'] == 'table') {
    $out = table($par['props']);
} elseif ($par['act'] == 'nabor') {
    $out = nabor($par['props']);
}

/*
    //сохранение
    if ($site=='modx') {
        if ($userId > 0 && $flags['userSave']) {
            $userPp->extended = json_encode($userPar, JSON_UNESCAPED_UNICODE);
            $userPp->save();
        }
    } elseif ($site=='wp') {
        if ($userId > 0 && $flags['userSave']) {
            update_user_meta($userId, 'primer_par', json_encode($userPar, JSON_UNESCAPED_UNICODE));
            //update_user_meta($userId, 'primer_par', htmlspecialchars( json_encode($userPar, JSON_UNESCAPED_UNICODE)));
            //update_user_meta($userId, 'primer_par', json_encode($userPar, JSON_UNESCAPED_UNICODE | JSON_HEX_QUOT));
        }
    }
*/

// выдача результата
//echo $out;
echo json_encode($out, JSON_UNESCAPED_UNICODE);
return;
