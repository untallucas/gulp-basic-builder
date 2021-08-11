<?php
	get_header();
?>

<header class="home-header alignwide">
	<!-- HIGHLIGHT -->
	<div class="home-highlight-post-wrapper">
		<?php
			$latest_post = wp_get_recent_posts(array(
				'numberposts' => 1,
				'post_status' => 'publish'
			));
			$stickers = range(1,7);
			shuffle($stickers);
			$top_sticker = $stickers[0];
			$bottom_sticker = $stickers[1];
			foreach( $latest_post as $post_item ){
				$ID = $post_item['ID'];
				echo '
					<div class="home-highlight-post-image" style="background-image: url('.get_the_post_thumbnail_url().');">
						<div class="home-highlight-post-sticker bottom"><img src="'.get_bloginfo("template_directory").'/images/sticker-'.$bottom_sticker.'.svg"></div>
					</div>
					<div class="home-highlight-post-content">
						<h1 class="home-highlight-post-title">
							<div class="home-highlight-post-sticker top"><img src="'.get_bloginfo("template_directory").'/images/sticker-'.$top_sticker.'.svg"></div>
							<a class="home-highlight-post-text" href="'.get_the_permalink($ID).'">
							'.get_the_title($ID).'
							</a>
						</h1>
						<p class="home-highlight-post-blurb">
							<a href="'.get_the_permalink($ID).'">
							'.get_the_excerpt($ID).'
							</a>
						</p>
						<a href="'.get_the_permalink($ID).'" class="home-highlight-post-link">
							Leer el post completo
						</a>
					</div>
				';
			}
		?>
	</div>
</header>

<div class="home-content">
	<!-- CATEGORIES -->
	<div class="home-categories-list">
		<?php
			$categories = get_categories();
			foreach($categories as $category) {
				echo '
					<h3 class="home-categories-list-item">
						'.$category->name.'
						<a href="' . get_category_link($category->term_id) . '"></a>
					</h3>
				';
			}
		?>
	</div>

	<!-- POSTS -->
	<?php
		if ( have_posts() ) {
			echo '<h3 class="home-subtitle">Últimos posts</h3>';
			echo '<div class="home-posts-list">';
			while ( have_posts() ) {
				the_post();
				echo '
				<div class="home-posts-list-item">
					<div class="home-posts-list-item-image" style="background-image: url('.get_the_post_thumbnail_url().');"></div>
					<div class="home-posts-list-item-date">
						'.get_the_date().'
					</div>
					<h4 class="home-posts-list-item-title">
						'.get_the_title().'
					</h4>
					<div class="home-posts-list-item-blurb">
					'.get_the_excerpt().'
					</div>
					<a href="'.get_the_permalink().'"></a>
				</div>
				';
			}
			echo '</div>';
		}
		// else {
		// 	echo 'NO HAY POSTS';
		// }
	?>
</div>

<?php
	get_footer();
?>
