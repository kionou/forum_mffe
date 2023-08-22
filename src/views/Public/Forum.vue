<template>
    <div>
        <div class="container page-header forum-header">
    <h1 class="hero-title" style="white-space: nowrap">Forum</h1>
    <form class="form-group flex forum-search" action="/forum/search">
  <input type="text" name="q" placeholder="Rechercher un sujet" value="" required="">
  <button type="submit" class="btn-secondary">Rechercher</button>
</form>
  </div>
  <div class="forum-page bg py3">
          <div class="forum-page__sidebar stack">
                <ul class="forum-tags">
          <li>
            <a href="/forum">
              Tous les sujets
            </a>
          </li>
                      <li>
              <a href="/forum/bases-91">
                <span style="background-color:#86bb77;"></span>
                Les bases
              </a>
              <ul>
                                  <li>
                    <a href="/forum/html-css-4">
                      HTML/CSS
                    </a>
                  </li>
                                  <li>
                    <a href="/forum/algorithmique-56">
                      Algorithmique
                    </a>
                  </li>
                              </ul>
            </li>
                      <li>
              <a href="/forum/outils-94">
                <span style="background-color:#616161;"></span>
                Outils
              </a>
              <ul>
                                  <li>
                    <a href="/forum/linux-61">
                      Linux
                    </a>
                  </li>
                              </ul>
            </li>
                      <li>
              <a href="/forum/javascript-7">
                <span style="background-color:#fdae3f;"></span>
                Javascript
              </a>
              <ul>
                                  <li>
                    <a href="/forum/react-95">
                      React
                    </a>
                  </li>
                                  <li>
                    <a href="/forum/vuejs-96">
                      VueJS
                    </a>
                  </li>
                                  <li>
                    <a href="/forum/nodejs-89">
                      NodeJS
                    </a>
                  </li>
                              </ul>
            </li>
                      <li>
              <a href="/forum/php-5">
                <span style="background-color:#4c6aa8;"></span>
                PHP
              </a>
              <ul>
                                  <li>
                    <a href="/forum/laravel-87">
                      Laravel
                    </a>
                  </li>
                                  <li>
                    <a href="/forum/symfony-72">
                      Symfony
                    </a>
                  </li>
                                  <li>
                    <a href="/forum/wordpress-9">
                      Wordpress
                    </a>
                  </li>
                                  <li>
                    <a href="/forum/codeigniter-54">
                      CodeIgniter
                    </a>
                  </li>
                              </ul>
            </li>
                      <li>
              <a href="/forum/ruby-8">
                <span style="background-color:#aa1300;"></span>
                Ruby
              </a>
              <ul>
                                  <li>
                    <a href="/forum/ruby-on-rails-88">
                      Ruby On Rails
                    </a>
                  </li>
                              </ul>
            </li>
                      <li>
              <a href="/forum/base-donnees-90">
                <span style="background-color:#000000;"></span>
                Base de données
              </a>
              <ul>
                                  <li>
                    <a href="/forum/mysql-6">
                      MySQL
                    </a>
                  </li>
                              </ul>
            </li>
                      <li>
              <a href="/forum/jobs-92">
                <span style="background-color:#3f88fd;"></span>
                Jobs
              </a>
              <ul>
                                  <li>
                    <a href="/forum/offres-d-emploi-79">
                      Offres d'emploi
                    </a>
                  </li>
                                  <li>
                    <a href="/forum/formation-60">
                      Formation
                    </a>
                  </li>
                              </ul>
            </li>
                      <li>
              <a href="/forum/divers-93">
                <span style="background-color:#7a61a8;"></span>
                Divers
              </a>
              <ul>
                                  <li>
                    <a href="/forum/jeux-videos-55">
                      Jeux Vidéos
                    </a>
                  </li>
                              </ul>
            </li>
                  </ul>
      </div>
        <main class="forum-page__main stack">
      
      
   
    
  
      

    </main>
  </div>

    </div>
</template>

<script>
export default {
    name: 'ForumMffeForum',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="css" scoped>

    /* display: grid;
    gap: calc(2 * var(--space));
}
.page-header {
    background: var(--background-light);
    border-bottom: 1px solid var(--border);
    padding-bottom: calc(6 * var(--space));
    padding-top: calc(6 * var(--space));
} */
@media (min-width: 800px){
.forum-header {
    display: flex;
    align-items: center;
}
}



.forum-header {
    display: grid;
    gap: calc(2 * 8px);
}
.page-header {
    background: var(--blanc);
    border-bottom: 1px solid #d5e3ec;
    padding-bottom: calc(6 * 8px);
    padding-top: calc(6 * 8px);
}
.container, .course-top-sidebar, .cursus-section, .footer, .formation-single, .formations, .forum-page, .header, .layout-sidebar, .sections>*, .wave-header {
    box-sizing: border-box;
    width: 100%;
    padding-left: calc(50% - calc(100vw -20px * 2)/ 2);
    padding-right: calc(50% - calc(100vw - 20px * 2)/ 2);
}

   

.forum-header .hero-title {
    flex: none;
}
.auth-title, .blog-post__title, .blog-single__title, .course-hero h1, .hero-title, .live-current__title, .page__title {
    font-size: 52px;
    font-family: Inter,sans-serif;
    font-weight: 700;
    line-height: 1.2;
     white-space: nowrap;
}

.forum-search {
    position: relative;
}
body .py3 {
    padding-top: calc(3 * 8px);
    padding-bottom: calc(3 * 8px);
}

@media (min-width: 800px){
    .forum-page {
    grid-template-columns: 190px 1fr;
}
}

.forum-page {
    display: grid;
    gap: calc(3 * 8px);
    /* grid-template-columns: 1fr; */
}
.bg {
    background: var(--background);
}
.flex {
    display: flex!important;
    align-items: center;
    justify-content: space-between;
}

.form-group input, .form-group select, .form-group textarea, .ts-dropdown .dropdown-input, .ts-input {
    border: 1px solid #d5e3ec;
    background: #f7fafb;
    border-radius: 3px;
    color: #121c42;
    padding: calc(1.5 * 8px) calc(1 * 8px);
    display: block;
    width: 100%;
    outline: 0;
    min-height: 48px;
}

.flex>* {
    min-width: 0;
}
input, select {
    font-size: inherit;
    font-family: inherit;
}

.forum-search button {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.btn-secondary {
    font-weight: 400;
    color: var(--color)!important;
    background: #fff;
    border: 1px solid #d5e3ec!important;
}
.btn-danger, .btn-discord, .btn-gradient, .btn-primary, .btn-primary-outlined, .btn-secondary, .btn-social, .btn-white-outlined {
    text-decoration: none!important;
    padding: 9px 16px;
    border: none;
    display: inline-flex;
    align-items: center;
    box-shadow: 0 1px 2px rgba(36,57,141,.4);
    border-radius: 4px;
    line-height: 1.6;
    font-family: Inter,sans-serif;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    transition: filter .3s,background .3s,color .3s;
    font-size: .9em;
    filter: brightness(1);
    white-space: nowrap;
}
.form-check input:focus+label::before, .form-group input:focus, .ts-input.focus, form button:focus, input:focus+label .switch, select:focus, textarea:focus {
    border-color: var(--vert);
    box-shadow: 0 0 0 3px var(--contrast25);
}


.chapters, .chapters-split, .forum-message, .forum-messages, .list-cursus, .stack, .stack-large, .stack-separated {
    --gap: 2;
    display: grid!important;
    grid-template-columns: 1fr;
    align-content: flex-start;
    gap: calc(var(--gap) * 8px);
}

a, abbr, acronym, address, applet, article, aside, audio, b, big, blockquote, body, canvas, caption, center, cite, code, dd, del, details, dfn, div, dl, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, html, i, iframe, img, ins, kbd, label, legend, li, mark, menu, nav, object, ol, output, p, pre, q, ruby, s, samp, section, small, span, strike, strong, sub, summary, sup, table, tbody, td, tfoot, th, thead, time, tr, tt, u, ul, var, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}

.chapters-split>*, .chapters>*, .forum-message>*, .forum-messages>*, .list-cursus>*, .stack-large>*, .stack-separated>*, .stack>* {
    min-width: 0;
}

ol, ul {
    list-style: none;
}

.forum-tags li li a {
    padding-left: calc(5 * 8px);
    font-size: .9rem;
}

.forum-tags a {
    display: flex;
    align-items: center;
    padding: 5px calc(1 * 8px);
}
a {
    text-decoration: none;
    color: inherit;
    transition: color .3s;
}
.chapters-split>*, .chapters>*, .forum-message>*, .forum-messages>*, .list-cursus>*, .stack-large>*, .stack-separated>*, .stack>* {
    min-width: 0;
}
.flex-end {
    justify-content: flex-end;
}
.flex {
    display: flex!important;
    align-items: center;
    justify-content: space-between;
}



</style>