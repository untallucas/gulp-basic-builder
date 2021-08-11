<?php
	$valid_passwords = array (
    "LCI1338" => "LCI1338",
    "LCI1339" => "LCI1339",
    "LCI1340" => "LCI1340",
    "test" => "test"
	);
		
	$valid_users = array_keys($valid_passwords);

	$user = $_SERVER['PHP_AUTH_USER'];
	$pass = $_SERVER['PHP_AUTH_PW'];

	$validated = (in_array($user, $valid_users)) && ($pass == $valid_passwords[$user]);

	if (!$validated) {
		header('WWW-Authenticate: Basic realm="My Realm"');
		header('HTTP/1.0 401 Unauthorized');
		echo "Ingreso no autorizado";
		exit;
	}
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="keywords" content="lci, lcielectricidad, electricidad, cordoba, córdoba, argentina, iluminación, mayorista de iluminación, mayorista, iluminación mayorista, distribuidora, distribuidora de artefactos de iluminación, mayorista de artefactos de iluminación, interior, iluminación interior argentina, iluminación argentina, insumos construcción, catalogo lci, artefactos lci, iluminacion lci, iluminación lci, lci córdoba, lci cordoba, lcicordoba, lciiluminacion, led, LED, LEDS, leds, iluminacion led, iluminacion con leds, artefactos de iluminacion con leds, iluminacion de leds, argentina, córdoba, arg, ar, electricidad, artefactos de electricidad, distribuidora de artefactos de electricidad, materiales electricos, materiales de electricidad, electricidad, cables, mayorista de cables, mayorista de lamparas, lámparas, distribuidora de lámparas, electricidad para el hogar, artefactos de electricidad para el hogar, distribuidora de cables">
  <meta name="description" content="LCI Electricidad - Mayorista de materiales eléctricos y de iluminación de Córdoba, Argentina. Escríbanos a ventas@lcielectricidad.com.ar o contáctenos al (0351) 494-5912">
  <meta name="author" content="After Seven | hola@afterseven.com.ar | afterseven.com.ar">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=yes">
  <title>Mayorista de materiales electricos y de iluminación - LCI Electricidad</title>

  <meta itemprop="name" content="LCI Electricidad">
  <meta itemprop="description" content="LCI Electricidad - Mayorista de materiales eléctricos y de iluminación de Córdoba, Argentina. Escríbanos a ventas@lcielectricidad.com.ar o contáctenos al (0351) 494-5912">
  <meta itemprop="image" content="http://www.lcielectricidad.com.ar/images/share_google.jpg">

  <meta property="og:title" content="LCI Electricidad - Mayorista de materiales eléctricos y de iluminación">
  <meta property="og:type" content="website">
  <meta property="og:image" content="http://www.lcielectricidad.com.ar/images/share_facebook.jpg">
  <meta property="og:site_name" content="LCI Electricidad - Mayorista de materiales eléctricos y de iluminación">
  <meta property="og:url" content="http://www.lcielectricidad.com.ar">
  <meta property="og:description" content="LCI Electricidad - Mayorista de materiales electricos y de iluminación de Córdoba, Argentina. Escríbanos a ventas@lcielectricidad.com.ar o contáctenos al (0351) 494-5912">

  <link rel="apple-touch-icon" sizes="57x57" href="icons/apple-icon-57x57.png">
  <link rel="apple-touch-icon" sizes="60x60" href="icons/apple-icon-60x60.png">
  <link rel="apple-touch-icon" sizes="72x72" href="icons/apple-icon-72x72.png">
  <link rel="apple-touch-icon" sizes="76x76" href="icons/apple-icon-76x76.png">
  <link rel="apple-touch-icon" sizes="114x114" href="icons/apple-icon-114x114.png">
  <link rel="apple-touch-icon" sizes="120x120" href="icons/apple-icon-120x120.png">
  <link rel="apple-touch-icon" sizes="144x144" href="icons/apple-icon-144x144.png">
  <link rel="apple-touch-icon" sizes="152x152" href="icons/apple-icon-152x152.png">
  <link rel="apple-touch-icon" sizes="180x180" href="icons/apple-icon-180x180.png">

  <link rel="icon" type="image/png" sizes="48x48" href="icons/android-icon-48x48.png">
  <link rel="icon" type="image/png" sizes="72x72" href="icons/android-icon-72x72.png">
  <link rel="icon" type="image/png" sizes="96x96" href="icons/android-icon-96x96.png">
  <link rel="icon" type="image/png" sizes="144x144" href="icons/android-icon-144x144.png">
  <link rel="icon" type="image/png" sizes="192x192" href="icons/android-icon-192x192.png">
  <link rel="icon" type="image/png" sizes="256x256" href="icons/android-icon-256x256.png">
  <link rel="icon" type="image/png" sizes="384x384" href="icons/android-icon-384x384.png">
  <link rel="icon" type="image/png" sizes="512x512" href="icons/android-icon-512x512.png">
  <meta name="theme-color" content="#4E56FF">
  <link rel="manifest" href="icons/manifest.json">

  <meta name="msapplication-TileColor" content="#4E56FF">
  <meta name="msapplication-navbutton-color" content="#4E56FF">
  <meta name="msapplication-TileImage" content="ms-icon-144x144.png">

  <link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="96x96" href="icons/favicon-96x96.png">
  <link rel="icon" type="image/png" sizes="16x16" href="icons/favicon-16x16.png">

  <link rel="stylesheet" href="css/vendor.min.css" />
  <link rel="stylesheet" href="css/styles.min.css" />

  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-42458820-1', 'auto');
    ga('send', 'pageview');
  </script>
</head>

<body class="offers-list">

  <!-- SVG DEFINITIONS -->
  <svg class="svg-definitions">
    <defs>
      <symbol id="lci-logo" viewBox="0 0 136 40">
        <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="0" y1="20" x2="134.1855" y2="20">
          <stop  offset="0" style="stop-color:#292896"/>
          <stop  offset="1" style="stop-color:#468DF0"/>
        </linearGradient>
        <path fill="url(#SVGID_1_)" d="M0,0.756c0.973-0.144,1.852-0.251,2.642-0.324c0.791-0.073,1.49-0.106,2.103-0.106
          c0.647,0,1.377,0.034,2.184,0.106c0.806,0.073,1.68,0.18,2.615,0.324v30.187h12.453c0.178,0.898,0.294,1.681,0.351,2.345
          c0.052,0.667,0.08,1.266,0.08,1.805c0,0.613-0.027,1.25-0.08,1.916c-0.056,0.663-0.172,1.464-0.351,2.398H0V0.756z M33.37,20.108
          c0,7.618,3.199,11.426,9.595,11.426c1.149,0,2.237-0.107,3.261-0.324c1.023-0.213,2.272-0.574,3.746-1.074
          c1.186,2.585,1.975,5.247,2.373,7.978c-1.042,0.394-2.015,0.718-2.911,0.968c-0.899,0.252-1.762,0.44-2.587,0.566
          c-0.828,0.127-1.644,0.218-2.452,0.27C43.583,39.972,42.749,40,41.887,40c-3.055,0-5.741-0.496-8.059-1.484
          c-2.316-0.988-4.259-2.361-5.822-4.121c-1.564-1.764-2.741-3.865-3.53-6.311c-0.792-2.443-1.186-5.102-1.186-7.977
          c0-2.875,0.412-5.544,1.237-8.005c0.827-2.461,2.023-4.59,3.587-6.388c1.561-1.796,3.493-3.198,5.792-4.204
          C36.208,0.505,38.815,0,41.722,0c1.729,0,3.364,0.128,4.908,0.377c1.545,0.252,3.271,0.756,5.175,1.51
          c-0.07,1.475-0.343,2.903-0.806,4.285c-0.47,1.384-0.956,2.597-1.456,3.639c-0.723-0.25-1.375-0.466-1.969-0.646
          c-0.595-0.181-1.158-0.324-1.697-0.432c-0.54-0.108-1.079-0.189-1.62-0.243c-0.538-0.053-1.114-0.081-1.723-0.081
          c-2.91,0-5.168,0.981-6.765,2.938C34.169,13.308,33.37,16.228,33.37,20.108z M61.94,39.729c-1.332,0-2.931-0.163-4.799-0.485V0.756
          c0.972-0.144,1.85-0.251,2.64-0.324c0.792-0.073,1.492-0.106,2.102-0.106c0.649,0,1.375,0.034,2.185,0.106
          c0.808,0.073,1.681,0.18,2.614,0.324v38.488C64.776,39.566,63.195,39.729,61.94,39.729z M78.891,31.419
          c-0.556-0.211-1.055-0.444-1.497-0.699c-0.44-0.252-0.815-0.556-1.126-0.908c-0.311-0.35-0.551-0.772-0.724-1.263
          c-0.171-0.491-0.259-1.079-0.259-1.764c0-0.834,0.145-1.571,0.431-2.206c0.285-0.64,0.689-1.176,1.212-1.608
          c0.522-0.433,1.153-0.76,1.888-0.982c0.735-0.22,1.561-0.33,2.477-0.33c0.836,0,1.617,0.072,2.342,0.22
          c0.728,0.146,1.493,0.359,2.294,0.637c-0.099,0.949-0.36,1.88-0.786,2.795c-0.246-0.098-0.497-0.196-0.747-0.292
          c-0.253-0.098-0.525-0.18-0.811-0.246c-0.286-0.064-0.609-0.118-0.965-0.159c-0.362-0.041-0.771-0.063-1.229-0.063
          c-0.278,0-0.559,0.028-0.845,0.075c-0.286,0.048-0.546,0.14-0.776,0.271c-0.228,0.129-0.414,0.322-0.564,0.576
          c-0.146,0.253-0.218,0.583-0.218,0.99c0,0.329,0.055,0.604,0.171,0.824c0.115,0.221,0.269,0.409,0.466,0.562
          c0.195,0.158,0.417,0.288,0.663,0.393c0.245,0.108,0.492,0.209,0.734,0.307l1.471,0.565c0.622,0.245,1.185,0.499,1.692,0.761
          c0.507,0.262,0.935,0.583,1.287,0.968c0.351,0.383,0.626,0.849,0.823,1.395c0.195,0.549,0.292,1.225,0.292,2.026
          c0,0.833-0.15,1.593-0.452,2.278c-0.301,0.688-0.74,1.277-1.312,1.767c-0.572,0.488-1.277,0.874-2.12,1.154
          c-0.842,0.278-1.812,0.415-2.906,0.415c-0.539,0-1.022-0.017-1.445-0.05c-0.427-0.031-0.83-0.084-1.218-0.157
          c-0.381-0.074-0.763-0.168-1.139-0.283c-0.375-0.114-0.768-0.252-1.176-0.416c0.048-0.474,0.139-0.968,0.27-1.483
          c0.128-0.517,0.286-1.035,0.465-1.558c0.687,0.278,1.333,0.489,1.939,0.625c0.604,0.139,1.25,0.208,1.935,0.208
          c1.029,0,1.842-0.19,2.429-0.576c0.589-0.386,0.883-0.968,0.883-1.753c0-0.394-0.071-0.719-0.211-0.981
          c-0.135-0.26-0.316-0.482-0.537-0.661c-0.219-0.182-0.472-0.332-0.75-0.456c-0.277-0.123-0.562-0.24-0.857-0.355L78.891,31.419z
           M89.188,39.584c-0.095-0.604-0.146-1.2-0.146-1.79c0-0.587,0.051-1.193,0.146-1.813c0.607-0.098,1.203-0.148,1.793-0.148
          c0.588,0,1.192,0.05,1.815,0.148c0.097,0.62,0.146,1.216,0.146,1.789c0,0.607-0.049,1.21-0.146,1.813
          c-0.623,0.1-1.219,0.148-1.791,0.148C90.4,39.732,89.795,39.684,89.188,39.584z M96.421,21.954c0.723-0.082,1.395-0.15,2.025-0.208
          c0.632-0.057,1.329-0.084,2.099-0.084c0.895,0,1.785,0.082,2.658,0.243c0.875,0.166,1.662,0.455,2.366,0.871
          c0.702,0.417,1.273,0.98,1.705,1.693c0.433,0.71,0.65,1.616,0.65,2.708c0,0.656-0.082,1.231-0.245,1.731
          c-0.163,0.499-0.373,0.934-0.626,1.311c-0.255,0.377-0.528,0.7-0.819,0.969c-0.295,0.269-0.576,0.485-0.838,0.649l-0.414,0.269
          l4.293,7.457c-0.329,0.032-0.673,0.063-1.032,0.098c-0.359,0.032-0.727,0.048-1.101,0.048c-0.624,0-1.237-0.048-1.841-0.146
          l-4.61-8.189l0.587-0.296c0.229-0.113,0.509-0.26,0.834-0.44c0.327-0.181,0.643-0.405,0.945-0.675
          c0.303-0.271,0.562-0.597,0.773-0.982c0.211-0.384,0.318-0.839,0.318-1.361c0-1.03-0.294-1.783-0.884-2.269
          c-0.589-0.48-1.347-0.722-2.28-0.722c-0.361,0-0.685,0.025-0.979,0.072v14.884c-0.294,0.035-0.59,0.061-0.884,0.088
          c-0.293,0.024-0.582,0.036-0.859,0.036c-0.277,0-0.572-0.009-0.881-0.024c-0.313-0.017-0.629-0.05-0.96-0.1V21.954z M111.257,39.584
          c-0.095-0.604-0.146-1.2-0.146-1.79c0-0.587,0.05-1.193,0.146-1.813c0.606-0.098,1.204-0.148,1.793-0.148
          c0.588,0,1.192,0.05,1.812,0.148c0.102,0.62,0.151,1.216,0.151,1.789c0,0.607-0.05,1.21-0.151,1.813
          c-0.62,0.1-1.216,0.148-1.79,0.148C112.47,39.732,111.864,39.684,111.257,39.584z M118.32,21.954
          c0.604-0.097,1.188-0.146,1.741-0.146c0.573,0,1.171,0.05,1.792,0.146v14.542h6.104c0.051,0.281,0.084,0.543,0.098,0.797
          c0.02,0.252,0.025,0.495,0.025,0.723c0,0.262-0.005,0.518-0.025,0.773c-0.013,0.251-0.047,0.518-0.098,0.795h-9.637V21.954z
           M130.435,39.584c-0.099-0.604-0.148-1.2-0.148-1.79c0-0.587,0.05-1.193,0.148-1.813c0.605-0.098,1.201-0.148,1.789-0.148
          c0.589,0,1.194,0.05,1.814,0.148c0.098,0.62,0.147,1.216,0.147,1.789c0,0.607-0.05,1.21-0.147,1.813
          c-0.621,0.1-1.216,0.148-1.787,0.148C131.645,39.732,131.04,39.684,130.435,39.584z"/>
    </defs>
  </svg>

  <!-- SECTION / NAVIGATION -->
  <nav class="navigation always-visible">
    <div class="background"></div>
    <div class="container">
      <div class="row">
        <div class="col col-sm-2 text-left">
          <svg class="logo">
            <use xlink:href="#lci-logo"></use>
          </svg>
        </div>
        <div class="col col-sm-10 text-right">
          <ul class="nav">
            <li><a href="http://www.lcielectricidad.com.ar" target="_blank">Ir al sitio &rsaquo;</a></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>

  <!-- LIST -->
  <div class="container page-content lists">
    <div class="row">
      <div class="col-xs-12">

        <h2>Destacados</h2>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1zEARYhnGknuW75gnFE6Rya6Ahj7gisq0D8586pSMEMM/edit#gid=1426445659'>NOVEDADES Y CAMBIOS</a><br>

        <a class="list-item" target='_blank' href='ofertas-electricidad.html'>OFERTAS</a><br>

        <a class="list-item" target='_blank' href='ofertas-iluminacion.html'>OFERTAS ILUMINACION</a><br>

        <br><br><br>

        <h2>Listas de Precios Actualizadas</h2>

        <a class="list-item" target='_blank' href='https://drive.google.com/open?id=135fY2PzSV96BvIhU4zKgj1BBXMF4aYPFDNKS22vf52g'>ABB 2016</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1KZGbk2801r-4SsE_N6UpeSF3CTgOBNfcgK-Hlzfhi_k/edit#gid=1188351505'>ACCESORIOS TV</a><br>

        <a class="list-item" target='_blank' href='https://drive.google.com/open?id=0B4YNuENLckuDNUtBN3Nwekxscm8'>ALARMAS ALTEL</a><br>

        <a class="list-item" target='_blank' href='https://drive.google.com/open?id=1CQKRVl0iNgdr_wuluWMGYUc31fxMSl90'>ALTEL NUEVOS PRODUCTOS</a><br>

        <a class="list-item" target='_blank' href='https://drive.google.com/open?id=16keOmOCjfyrO2RZDwnNU6CHodRXBaX69'>ALIC</a><br>
        
        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1vrjU9rlMRLLP7cZIg3P4BHgNyupzSVohW_VFzEcb9No/edit#gid=973247854'>ANTENAS</a><br>
      
        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/11D0k8Degg6iPBhdNnDx9wCP9DvjfmFgg_Ns5XSfY6bU/edit#gid=1516219929'>ARTEFACTOS ALUMBRADO PÚBLICO LED</a><br>

        <a class="list-item" target='_blank' href='https://drive.google.com/open?id=1nWfXm7yJNbHd9pvcMTq0EugFndpNYVPVGp0gBudVUHU'>BAJADA PILAR</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1xpMlUO4AZB_ZN4JMBci73EfSm1PI_FPhRQqoySM7P2E/edit#gid=1554496763'>BALASTOS WINDERPLUS</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1JnCkg3BdFY1iRwkO_IcZRsHxL72ob_nERrcunT26lUE/edit#gid=1623391223'>BANDEJA PORTACABLES</a><br>

        <a class="list-item" target='_blank' href='https://drive.google.com/open?id=1c450yipm7eFjlG5OXDPkNtDQ6DGMYUCkuzDESKFMvfM'>BICICLETAS PHILCO</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1afIXFGyRgH7wC7VzuljQVxrXSXfykNYJ-wAwyMqQppE/edit#gid=847765508'>CABLE CANAL</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1hhkm2xlhn15EWcT0CMaVOWuDsXD4xScOGWaRd1jDGG4/edit#gid=1746977023'>CABLES BAFLES, COAXIL, PORTERO, TELEFONICO, CRISTAL</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/14d_1RLZC-m8BiWzhvvZqfmp550cdrSdUCBLDvT9Y-bA/edit#gid=1008032436'>CABLES DE ALUMINIO</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1shFolKj5IPZAWWKOgDvAmN_D4BndJ_-4HdxZeiGpOis/edit#gid=730179891'>CABLES SOLDADURA</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1uoZFEmW-E7tEhHgDv379UICsUNSRv9fVDmgn2uy_3WY/edit#gid=1493222077'>CAJA DE DERIVACIÓN</a><br>

        <a class="list-item" target='_blank' href='https://drive.google.com/open?id=1mqxStkMA9uvVAu_bZOaEM1JDfIhg0IVwHXRSVaF2nj8'>CAJAS PARA TÉRMICAS CONEXTUBE</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/19zeebuJaARvhSdJHrcj7ZcKAKKSApqyzl_eMi7pD1lA/edit#gid=1538218954'>CAJAS PARA TÉRMICAS</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1dHPUvgI9oS_8dFeE_WjArAJNo1ODp8EEEdBcdeT7IP4/edit#gid=1473669637'>CAPACITORES</a><br>

        <a class="list-item" target='_blank' href='https://drive.google.com/open?id=1M4te5MX62rEuMyOLoq8P_GL7-gmKiRbA'>CIOCCA PLAST</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/11vCc67RO8jPjc9baVMa2Qq8fn3G6h1mnSowujFfMflY/edit#gid=1165643279'>CLIPS</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/18StJdwQLK6BoSiGA5VdmTIbqpK3v3Ov2VO4ogiqi4xA/edit#gid=888695494'>COMBO ZURICH-PROSKT</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1-i__9R6XOsi1xwXASbT4GyeZmYYK1z6nBDHACZ_Og14/edit#gid=1693908329'>COMPUTADORAS Y CÁMARAS DE SEGURIDAD</a><br>

        <a class="list-item" target='_blank' href='https://drive.google.com/open?id=0B4YNuENLckuDNXVXakdzbHpweUE&authuser=0'>DICRO LEDS TBCIN</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1w4J8IgFb-8M-PjcvItSDu5C-oG-MoPelOzgiMNu07mU/edit#gid=192842835'>DREAN</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1rcnHLSSlLHVqa4UtBq2nU1x9gaIXqJrin8BrUfQFmAc/edit#gid=304171965'>ELECTRODOMÉSTICOS</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1RoXuI79R4iXzgtqJyv3H6TYGaqhG62PM0jN7gcqE8yk/edit#gid=1107146179'>ELIBET</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1OvzQEQPNS88XkG--BzzIXvMl8sq7oBokb8s9wZdUDZY/edit#gid=13131141'>ERPLA</a><br>

        <a class="list-item" target='_blank' href='https://drive.google.com/open?id=1WI4CBdMtSoVW5-Kfx2imW01PwXVafHHoLX1XULXYPvI'>FAMATEL - BASES Y FICHAS</a><br>
      
        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1qGEzTZkkhGvGFsk3tpG4pWBjCi_Qhlc_7FWxBsDkcv4/edit#gid=431139339'>GABEXEL</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1JeoB14lg2cbpzYCdRRkhhk0BTsBtDBoqOPUfjojNZ0Q/edit#gid=1807270559'>GABINETE POLIPROPILENO</a><br>
        
        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1Qv8s8SCbvomfb8vc6-TqUirP2hodylpNPFmat63Px3A/edit#gid=1734413717'>GAS Y CALENTADORES</a><br>

        <a class="list-item" target='_blank' href='https://drive.google.com/open?id=1BWu9j1laRh4jQcx7iQSPY4EuNdI6vVuc'>GENERAL ELECTRIC LCI</a><br>

        <a class="list-item" target='_blank' href='https://drive.google.com/open?id=1cpmKRbTBh0BkiaZcyaN46bskEOwYn6fiQTiXHVw5Qlk'>GENERAL ELECTRIC TERMICAS Y DIFERENCIALES</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/11qi6Z3SR0Ezu1LPYh-cmNa6IbtPnpWK6Qrtr89GqwOY/edit#gid=978821103'>GEWISS - WELT - POLIVINIL</a><br>

        <a class="list-item" target='_blank' href='https://drive.google.com/open?id=1a2Q4yJaa_-7CF2adMGSAyagh_84oq9zOzOf3Yfe4gis'>HERRAMIENTAS PHILCO</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1Gmy6E810OM4lfC6VFQfzgk4vP_HDE2eFQ51aE6bkVh8/edit#gid=946702329'>ITALAVIA</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1NPu-lssYemOrSvGXpGUAlwnLxV0xm-AGYW5eEVzMBiI/edit#gid=1152962815'>KALOP</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1oWRhBWZVua8pEy4omthZvcm30coZ29QpgNy7FKgnN3M/edit#gid=1414330186'>LÁMPARAS-LUMINARIAS LED TBC-SASSIN</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/182NoiMl3WjnnHY4fFEF6TOp57_4C4bxAv9KY7Ium9Zc/edit#gid=433856149'>LCI VARIOS</a><br>

        <a class="list-item" target='_blank' href='https://drive.google.com/open?id=11biED5NTjdaILKg4D2ZKoEtjs3weIBP8Ix0HpAx5g4c'>LCI ILUMINACIÓN</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1h9LzbmJDlR_4N1udz9xMtfPcJKBr9RPJk1IO2Z0UTqc/edit#gid=1629090265'>LUMINARIAS</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1qK8ATaNnYNLh5o0i35HVjyg8EKMusX9jxubm-9mGP18/edit#gid=735993724'>MAIPÚ</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1s446hFj9wPWiLD-wk1_G9lEdn1s65hgDgjNV4wg0oS8/edit#gid=1552442312'>MIG</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/file/d/0B4YNuENLckuDVGc4V2FQOFNYem8/edit'>MOTORES ABB</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1AuSjX_EBI-DS8raLhUF8Lu90699YaySFYVhHKO6y1ag/edit#gid=1377312783'>NOVA ELECTRICITY</a><br>

        <a class="list-item" target='_blank' href='https://drive.google.com/open?id=0B4YNuENLckuDdFdGTnFjTWFsSm8'>PH CONTACT BORNES</a><br>

        <a class="list-item" target='_blank' href='https://drive.google.com/open?id=0B4YNuENLckuDVW0zM0h6YktHRU0'>PH CONTACT GENERALES</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1jOx-kwy0MHvzZBCSeYCZMvPU308YNSbv0zrJ61hz8is/edit#gid=333217664'>PORTÁTILES - CINTAS PASACABLES</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1hgOkbRgFpdiX712n80iaUQ-Nfj1YL2bH5Uw-Mrsui1U/edit#gid=98702080'>PORTEROS Y VIDEO PORTEROS</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1MgXpAhsNpt2uDQUffBBn80gbS-vIx54G1GyeR4wY-dQ/edit#gid=985634626'>PROYECTORES PARA MERCURIO HALOGENADO Y BAJO CONSUMO</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1OvL7X9tpfNL63ubG6LLwpUpE7OkzGW6H9Jlo0NtzSuQ/edit#gid=1253220144'>PROYECTORES LED SASSIN</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1fHueOp_IEOZDp0povM4cSlfsusZWm-If6KMd52Lfi40/edit#gid=1018691921'>REVENTA NUEVO</a><br>

        <a class="list-item" target='_blank' href='https://drive.google.com/open?id=1JaHDtsZP0WUkK1uHPC80Ntsipf0f3WPx'>ROKER</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/10o3PTEU2zovMf6pYqNmzJcr1N5Y9Cw2-DD4yof6in-4/edit#gid=683012314'>SASSIN-TBC</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/10Li2fy8gOZXvhmcX6X7gXoDotVd2MGrnw1eDao9lcFY/edit#gid=307523963'>SICA</a><br>
        
        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/16zGtAVjQzYIklAs7khDTVi7NWy6BiUl3VYcWJ5pwTOQ/edit#gid=305698680'>SUPRABOND</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1efxZRdY_Qk56IQcfD5ypIHfhUvNPW0icc4Pq3a7NGZo/edit#gid=1629640989'>TEA-KELAND</a><br>
        
        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/19LGmXPKAibWfvmPQrvme5-nyVktiVx2c9qTGcJ_9mf8/edit#gid=1457024116'>TECHNIC PLAFONES</a><br>
        
        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1jB_JdLSMm5abX9s5qWe4nw-f1XZFmEFPN-iQ551pVuQ/edit#gid=967283537'>UPS Y ESTABILIZADORES</a><br>

        <a class="list-item" target='_blank' href='https://docs.google.com/spreadsheets/d/1yGR3XlzDA_E1iHCz8e8i2Zb1kn_fiSeDl0pkE-0KD4g/edit#gid=652157659'>VENTILADORES</a><br>

      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 footer">
        Contáctese con nosotros a <a href='mailto:ventas@lcielectricidad.com.ar?subject="Lista de Precios"' target="_blank"><strong>ventas@lcielectricidad.com.ar</strong></a> o por teléfono al <a href="tel:+543514945912"><strong>(0351) 494-5912</strong></a>
      </div>
    </div>
  </div>

</body>
</html>