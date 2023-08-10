<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maquita v1.0 | Demo</title>

    <link rel="stylesheet" href="https://unpkg.com/cropperjs/dist/cropper.css">
</head>
<body>
    <input type="file" class="maquita" data-name="landscape" data-w="108" data-h="192">
    <input type="file" class="maquita" data-name="wide" data-w="192" data-h="108">

    <form action="./demo/upload.php" method="post">
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
    </script>
</body>
</html>