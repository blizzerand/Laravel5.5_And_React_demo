<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Product listing Application</title>
        <link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css">
    </head>
    <body>
        <h1 style="text-align: center"> Laravel and React application </h1>
        <div id="root"></div>
       
        <script src="{{mix('js/app.js')}}" ></script>
    </body>
</html>