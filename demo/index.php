<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maquita v1.0 | Demo</title>

    <link rel="stylesheet" href="https://unpkg.com/cropperjs/dist/cropper.css">
</head>
<body>
    
    <form action="./demo/upload.php" method="post">
        <input type="file" class="maquita" data-src="./demo/demo.jpg" data-name="landscape" data-w="108" data-h="192">
        <input type="file" class="maquita" data-name="wide" data-w="192" data-h="108">
        <button type="submit">SEND</button>
    </form>
    
    <form class=".form2" action="./demo/upload.php" method="post">
        <input type="file" class="maquita" data-name="landscape" data-w="108" data-h="192">
        <input type="file" class="maquita" data-name="wide" data-w="192" data-h="108">
        <button type="submit">SEND</button>
    </form>

    <script src="https://unpkg.com/cropperjs/dist/cropper.js"></script>
    <script src="maquita.js"></script>
    <script>
        new Maquita({
            target: '.maquita',
            form: 'form',
            // cropClass: 'maquita'
        });
        
        new Maquita({
            target: '.maquita2',
            form: '.form2',
            // cropClass: 'maquita'
        });
    </script>
</body>
</html>