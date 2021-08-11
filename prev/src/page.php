<?php
	get_header();

	while ( have_posts() ) :
		the_post();
?>

<header class="page-header alignwide">
	<h1 class="page-title">
		<?php the_title(); ?>
	</h1>
</header>

<div class="entry-content">
	<?php the_content(); ?>
</div>

<?php
	endwhile;
	get_footer();
?>
