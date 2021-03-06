define(['jquery',
        'backbone',
        'utils/tpl',
        'models/work-model',
        'models/work-collection',
        'models/settings-section-model',
        'models/settings-collection',
        'models/news-collection',
        'models/news-model',
        'views/works-view',
        'views/work-details',
        'views/settings-view',
        'views/login',
        'views/news-view',
        'views/news-details'],
	function($, Backbone, tpl, Work, WorkCollection, SectionSettingsModel, SettingsCollection, NewsCollection, NewsModel, MenuView, DetailView, SettingsSectionView, Login, MenuNews, DetailViewNews) {

		var AppRouter = Backbone.Router.extend({
			routes: {
				"init": "init",
				"login": "goToLoginPage",
				"newWork": "newWork",
				"newNews": "newNews",
				"work/:id": "workDetails",
				"news/:id": "newsDetails",
				"settings/:id": "settingsSection"
			},
			getCookie: function(cname) {
				var name = cname + "=";
				var ca = document.cookie.split(';');
				for (var i = 0; i < ca.length; i++) {
					var c = ca[i].trim();
					if (c.indexOf(name) == 0) {
						return c.substring(name.length, c.length);
					}
				}
				return "";
			},
			deleteCookie: function(name) {
				document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			},
			checkUser: function(success, fail) {
				$.ajax({
					url: "/works/isUser/",
					context: this,
					success: function(data) {
						var data = JSON.parse(data);
						if (data.status == true) {
							console.log('is admin', data.status);
							success.apply(this);
						} else {
							alert('msg: ' + data.msg);
							fail.apply(this);
						}
					}
				});
			},
			initialize: function() {

				this.checkUser(function() {
					this.loadBody();
				}, function() {
					app.navigate('login', true);
				});

				var self = this;
				$.ajaxSetup({
					statusCode: {
						401: function() {
							alert('brak autoryzacji - error 401');
							app.navigate('init', true);
						},
						403: function() {
							alert('Access denied - error 403');
							app.navigate('init', true);
						}
					}
				});
			},
			init: function() {

			},
			goToLoginPage: function() {
				console.log('this.goToLoginPage()')
				$('#body').html(new Login().render());
			},
			settingsSection: function(id) {
				this.beforeSettings(function() {
					var model = this.settingsCollection.get(id);
					this.showView('#work-details', new SettingsSectionView({
						model: model
					}));
				})
			},
			workDetails: function(id) {
				this.beforeWorks(function() {
					var model = this.workCollection.get(id);
					this.showView('#work-details', new DetailView({
						model: model
					}));
				})
			},
			newsDetails: function(id) {
				this.beforeNews(function() {
					var model = this.newsCollection.get(id);
					this.showView('#work-details', new DetailViewNews({
						model: model
					}));
				})
			},
			newWork: function() {
				var model = new Work();
				$("#work-details").html(new DetailView({ model: model}).render())
			},
			newNews: function() {
				var model = new NewsModel();
				$("#work-details").html(new DetailViewNews({ model: model}).render())
			},
			showView: function(selector, view) {
				if (this.currentView) {
					this.currentView.close();
				}
				$(selector).html(view.render());
				this.currentView = view;
				return view;
			},
			loadMenu: function() {
				this.menuArchitektura = new MenuView({ model: this.workCollection });
				this.menuWnetrza = new MenuView({ model: this.workCollection });
				this.menuPracownia = new MenuView({ model: this.workCollection });
				this.menuDesign = new MenuView({ model: this.workCollection });
				$('#nav-architektura').append(this.menuArchitektura.render(2));
				$('#nav-wnetrza').append(this.menuWnetrza.render(3));
				$('#nav-pracownia').append(this.menuPracownia.render(6));
				$('#nav-design').append(this.menuDesign.render(4));
			},
			beforeWorks: function(callback) {
				if (!this.workCollection) {
					this.workCollection = new WorkCollection();
					this.workCollection.fetch();
					this.workCollection.bind('destroy', function() {
						//this.loadMenu();
						var obj = arguments[0];
						switch (Number(obj.attributes.type)) {
							case 2:
								this.menuArchitektura.removeWork(obj);
								break;
							case 3:
								this.menuWnetrza.removeWork(obj);
								break;
							case 6:
								this.menuPracownia.removeWork(obj);
								break;
							case 4:
								this.menuDesign.removeWork(obj);
								break
						}
					}, this);
					this.workCollection.bind('sync', function() {
						var obj = arguments[1];
						if (_.isArray(obj)) {
							this.loadMenu();
						} else {
							switch (Number(obj.type)) {
								case 2:
									this.menuArchitektura.appendNewWork(obj);
									break;
								case 3:
									this.menuWnetrza.appendNewWork(obj);
									break;
								case 6:
									this.menuPracownia.appendNewWork(obj);
									break;
								case 4:
									this.menuDesign.appendNewWork(obj);
									break
							}
						}
					}, this);
					if (callback) {
						callback.call(this);
					}
				} else {
					if (callback) {
						callback.call(this);
					}
				}
			},
			beforeSettings: function(callback) {
				if (!this.settingsCollection) {
					this.settingsCollection = new SettingsCollection();
					this.settingsCollection.fetch();
					this.settingsCollection.bind('sync', function() {
						if (callback) {
							callback.call(this);
						}
					}, this)
				} else {
					if (callback) {
						callback.call(this);
					}
				}
			},
			beforeNews: function(callback) {
				if (!this.newsCollection) {
					this.newsCollection = new NewsCollection();
					this.newsCollection.fetch();
					this.newsCollection.bind('sync', function() {
						var menuNews = new MenuNews({ model: this.newsCollection });
						$('#nav-news').append(menuNews.render());
						if (callback) {
							callback.call(this);
						}
					}, this)
				} else {
					if (callback) {
						callback.call(this);
					}
				}
			},
			loadBody: function() {
				this.template = _.template(tpl.get('body'));
				$("#body").html(this.template());

				$("#newItem").click(function(event) {
					event.preventDefault();
					document.location.href = '/adm/#newWork';
				});
				$("#newNews").click(function(event) {
					event.preventDefault();
					document.location.href = '/adm/#newNews';
				});
				this.beforeNews();
				this.beforeWorks();
				this.beforeSettings();
			}
		})

		return AppRouter;

	})