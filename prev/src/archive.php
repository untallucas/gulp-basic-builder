<?php
	get_header();
?>

<header class="page-header alignwide">
	<h1 class="page-title">
		<?php single_cat_title() ?>
	</h1>
</header>

<?php
		if ( have_posts() ) {
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

<?php
	get_footer();
?>
