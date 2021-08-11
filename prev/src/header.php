<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<?php wp_head(); ?>
  <link rel="stylesheet" type="text/css" href="<?php bloginfo("template_directory"); ?>/style.css" />

  <!-- TITLES -->
  <title>Bicho Canasto Blog</title>
  <meta name="keywords" content="bicho canasto, bichocanasto, bichos canasto, bichoscanasto, Bicho Canasto, Bichocanasto, juguetes, Juguetes, niños, ninios, juguetes para niños, Juguetes para Niños, juguetes educativos, Juguetes Educativos, juguetes didácticos, Juguetes Didácticos, didacticos, didácticos, juegos didácticos, Juegos Didácticos, artículos didácticos, Artículos Didácticos, muñecos, Muñecos, muñecos didácticos, Muñecos Didácticos, muñecos de tela, Muñecos de Tela, muñecos hipoalergénicos, Muñecos Hipoalergénicos, muñecos animales, juguetes animales, Muñecos Animales, Juguetes Animales, animales argentinos, animales autóctonos, juguetes animales argentinos, juguetes autóctonos, Animales Argentinos, Animales Autóctonos, Juguetes Animales Argentinos, Juguetes Autóctonos, muñeco llama, Muñeco Llama, juguete llama, Juguete Llama, muñeco yaguareté, Muñeco Yaguareté, juguete yaguareté, Juguete Yaguareté, muñeco oso hormiguero, Muñeco Oso Hormiguero, juguete oso hormiguero, Juguete Oso Hormiguero, muñeco yacaré, Muñeco Yacaré, juguete yacaré, Juguete Yacaré, muñeco carpincho, Muñeco Carpincho, juguete carpincho, Juguete Carpincho, muñeco aguará, Muñeco Aguará, juguete aguará, Juguete Aguará, muñeco aguará guazú, Muñeco Aguará Guazú, juguete aguará guazú, Juguete Aguará Guazú, muñeco tatu, Muñeco Tatu, juguete tatu, Juguete Tatu, muñeco tatú carreta, Muñeco Tatú Carreta, juguete tatú carreta, Juguete Tatú Carreta, libro sensorial, libro sensorial bebés, libro para bebés, libro de tela, Libro Sensorial, Libro Sensorial Bebés, Libro para Bebés, Libro de Tela, córdoba, Córdoba, cordoba, Cordoba, Argentina, argentina, Juguetes Córdoba Argentina, juguetes córdoba argentina">
  <meta name="description" content="Bicho Canasto es una fábrica de ideas donde creamos personajes y objetos de diseño originales para chicos, con el objetivo de potenciar su esencia creativa. Los personajes y objetos están diseñados bajo un sentido lúdico, para que los chicos toquen, abracen y los sientan suyos al instante en el que los tienen en sus manos.">
  <meta name="author" content="Bicho Canasto | hola@bichocanasto.com | bichocanasto.com">

  <!-- OPEN GRAPH -->
  <meta property="og:title" content="Bicho Canasto Blog">
  <meta property="og:type" content="website">
  <meta property="og:image" content="<?php bloginfo("url") ?>/share/share-facebook.jpg">
  <meta property="og:site_name" content="Bicho Canasto Blog">
  <meta property="og:url" content="https://blog.bichocanasto.com">
  <meta property="og:description" content="Bicho Canasto es una fábrica de ideas donde creamos personajes y objetos de diseño originales para chicos, con el objetivo de potenciar su esencia creativa. Los personajes y objetos están diseñados bajo un sentido lúdico, para que los chicos toquen, abracen y los sientan suyos al instante en el que los tienen en sus manos.">

  <!-- TWITTER -->
  <meta itemprop="name" content="Bicho Canasto Blog">
  <meta itemprop="description" content="Bicho Canasto es una fábrica de ideas donde creamos personajes y objetos de diseño originales para chicos, con el objetivo de potenciar su esencia creativa. Los personajes y objetos están diseñados bajo un sentido lúdico, para que los chicos toquen, abracen y los sientan suyos al instante en el que los tienen en sus manos.">
  <meta itemprop="image" content="<?php bloginfo("url") ?>/share/share-google.jpg">

  <!-- ANALYTICS -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-73S9W10HB4"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-73S9W10HB4');
  </script>
</head>

<body>
  <div id="page" class="site">

    <?php $blog_info = get_bloginfo( 'name' ); ?>
    <header class="site-header">
      <div class="site-header__wrapper">
        <div class="site-header__navigation">
          <?php 
            wp_nav_menu(array(
              'menu'   => 'Menú Principal',
              'container' => ''
            ));
          ?>
        </div>
        <a class="site-header__logo" href="<?php echo esc_url( home_url( '/' ) ); ?>">
          <img src='<?php bloginfo("template_directory"); ?>/images/bichocanasto-logo.png' />
        </a>
        <div class="site-header__cta">
          <?php 
            wp_nav_menu(array(
              'menu'   => 'Menú Secundario',
              'container' => ''
            ));
          ?>
        </div>        
      </div>
    </header>

    <div class="mobile-menu__wrapper">
      <input type="checkbox" class="mobile-menu__trigger" />
      <?php
        wp_nav_menu(array(
          'menu' => 'Menú Mobile',
          'menu_class' => 'mobile-menu',
          'container' => ''
        ));
      ?>
    </div>

    <main id="main" class="site-main" role="main">
