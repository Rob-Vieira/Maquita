<?php

class Maquita{
    function move($imageTxt, $path, $type = 'webp'){
        $this->checkPathAndCreate($path);

        switch($type){
            case 'jpg':
                return $this->moveJPG($imageTxt, $path);
            case 'png':
                return $this->movePNG($imageTxt, $path);
            default:
                return $this->moveWEBP($imageTxt, $path);
        }
    }

    protected function moveJPG($imageTxt, $path){
        $name = $this->generateName() . '.jpg';
        file_put_contents($path . $name, $this->decode($imageTxt));

        return $name;
    }

    protected function movePNG($imageTxt, $path){
        $name = $this->generateName() . '.png';
        imagepng(imagecreatefromstring($this->decode($imageTxt)), $path . $name);

        return $name;
    }

    protected function moveWEBP($imageTxt, $path){
        $name = $this->generateName() . '.webp';
        imagewebp(imagecreatefromstring($this->decode($imageTxt)), $path . $name, 80);

        return $name;
    }

    protected function decode($data){
        return base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $data));
    }

    protected function generateName(){
        return md5(uniqid()) . '-' . time();
    }

    protected function checkPathAndCreate($path){
        if (!is_dir($path)) {
            mkdir($path, 0777, true);
        }
    }
}