<?php
	get_header();

	while ( have_posts() ) :
		the_post();
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
<!-- HEADER -->
<header class="entry-header alignwide">
	<h1 class="entry-title">
		<?php the_title(); ?>
	</h1>
	<div class="entry-exerpt">
		<?php the_excerpt(); ?>
	</div>
		<?php
			if ( has_post_thumbnail() ) {
				$stickers = range(1,7);
				shuffle($stickers);
				$top_sticker = $stickers[0];
				$bottom_sticker = $stickers[1];
				echo '<div class="entry-featured-image" style="background-image: url('.get_the_post_thumbnail_url().');">';
				echo '<div class="entry-featured-image-sticker top"><img src="'.get_bloginfo("template_directory").'/images/sticker-'.$top_sticker.'.svg"></div>';
				echo '<div class="entry-featured-image-sticker bottom"><img src="'.get_bloginfo("template_directory").'/images/sticker-'.$bottom_sticker.'.svg"></div>';
				echo '</div>';
			}
		?>
</header>

<div class="entry-content">
	<!-- CATEGORIES -->
  <?php
		$categories = wp_get_post_categories( get_the_ID() );
		if(wp_get_post_categories( get_the_ID() )){
			$categories = wp_get_post_categories( get_the_ID() );
			echo '<ul class="entry-categories">';
			foreach($categories as $category){
				$cat = get_category( $category );
				$cat_id = get_cat_ID( $cat->name );
				echo '<li class="entry-categories-item"><a href="'.get_category_link($cat_id).'" class="entry-categories-link">'.$cat->name.'</a></li>';
			}
			echo '</ul>';
		}
  ?>
	<!-- CONTENT -->
	<?php the_content(); ?>
</div>

<!-- POST NAVIGATION -->
<?php if(get_previous_post_link() || get_next_post_link()){ ?>
	<div class="post-navigation-wrapper">
		<div class="post-navigation-previous">
			<?php
				if(get_previous_post_link()){
					echo get_previous_post_link(
						$format = '<div class="post-navigation-link">%link</div>'
					);
				}
			?>
		</div>
		<div class="post-navigation-next">
			<?php
				if(get_next_post_link()){
					echo get_next_post_link(
						$format = '<div class="post-navigation-link">%link</div>'
					);
				}
			?>
		</div>
	</div>
<?php } ?>

<?php
	endwhile;
	get_footer();
?>
