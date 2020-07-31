	'use strict';
	const 
	contacts_arr = [
		{href:'https://vk.com/id288246108', ico:'fab fa-vk' },
		{href:'https://t.me/ser_Lonli_Lokli', ico: 'fab fa-telegram-plane'},
		{href:'mailto:reader-999@yandex.ua', ico: 'fas fa-envelope'}
	],
	products = [
		{title: 'Тема Wordpress', img_one: 'img/ss_0_0.png', img_dbl: 'img/ss_0_1.png', content: 'Моя собственная адаптивная тема для wordpress.'},
		{title: 'Оккервиль спорт', img_one: 'img/ss_1_0.png', img_dbl: 'img/ss_1_1.png', content: 'Сайт написанный для Питерского спорт комплекса Оккервиль спорт.'}
	],
	bigSlidesColections = null;
	
	import( './vue.min.js' )
		.then( start );


	function start() {

		vueComponentRegistrate();

		let nav = new Vue({
			el: '.js-vue-nav',

			methods: 
			{
				navToggle( ev )
				{
					this.$el
						.classList.toggle( 'page-nav-wrap--show' )

					this.$el
						.querySelector( '.vue-nav-toggle' )
						.classList.toggle( 'vue-nav-toggle--active' );
				},

				scrollToggle()
				{
			
				}
			}
		});

		let app = new Vue({
			el: '#vue-app',
		});

		let header = new Vue({
			el: '.page-header',
		});

		let footer = new Vue({
			el: '.page-footer',
		});
	};

	function vueComponentRegistrate()
	{
		Vue.component( 'products-widget', {
			data: function()
			{
				return { products, bigSlidesColections: null };
			},

			template: 
			`
			<div class="products-widget">
				<div :class="id == 0 ? 'product product--active' : 'product'" v-for="(product, id) in products">
					<img :src="product.img_one" class="product__img-one">
					<main class=product__content>
						<h2>{{ product.title }}</h2>
						{{ product.content }}
						<nav class="product__navigation">
							<button @click="prevProd" class="btn btn--color-1 btn--middle"><span class="fa fa-angle-double-left"></span></button>
							<button @click="nextProd" class="btn btn--color-1 btn--middle"><span class="fa fa-angle-double-right"></span></button>	
						</nav>
					</main>
					<img :src="product.img_dbl" class="product__img-dbl">
				</div>
			</div>
			`,

			methods: 
			{
				nextProd()
				{
					let
						the_prod = document.querySelector( '.product--active' ),
						new_prod = the_prod.nextElementSibling;

						if( !new_prod ) new_prod = document.querySelector('.products-widget').firstElementChild;

						the_prod.classList.remove( 'product--active' );
						new_prod.classList.add( 'product--active' );
				},

				prevProd()
				{
					let
						the_prod = document.querySelector( '.product--active' ),
						new_prod = the_prod.previousElementSibling;

						if( !new_prod ) new_prod = document.querySelector('.products-widget').lastElementChild;

						the_prod.classList.remove( 'product--active' );
						new_prod.classList.add( 'product--active' );
				}		
			}
		} );

		Vue.component( 'contacts-menu',
		{
			data: function() {
				return { contacts: contacts_arr };
			},

			template:
			`
			<ul class="contacts-menu">
				<li class="contact" v-for="item in contacts">
					<a :href="item.href"><span :class="item.ico"></span></a>
				</li>
			</ul>
			`,
		} );

		Vue.component( 'slider',
		{
			props: ['slides'],

			template:
			`
			<div class="slider">
				<main class="slides_area">
					<img v-for="(slide, id) in slides" :src="slide" :class="id == 0 ? 'slide slide--active' : 'slide'">
				</main>
				<footer class="slider__controll-bar">
					<span v-for="(slide, id) in slides" @click="setSlide" :data-slide-id="id + 1" :class="id == 0 ? 'controll controll--active' : 'controll'"></span>
				</footer>
			</div>
			`,

			methods:
			{
				setSlide( ev )
				{
					let
						target = ev.target,
						new_slide_id = target.getAttribute( 'data-slide-id' );

					this.$el
						.querySelector( '.controll--active' )
						.classList.remove( 'controll--active' );
					
					this.$el
						.querySelector( '.slide--active' )
						.classList.remove( 'slide--active' );

					this.$el
						.querySelector( `.controll:nth-child(${ new_slide_id })` )
						.classList.add( 'controll--active' );

					this.$el
						.querySelector( `.slide:nth-child(${ new_slide_id })` )
						.classList.add( 'slide--active' );
				}
			}
		} );
	};








