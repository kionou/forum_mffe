<template>
  <Loading v-if="loading"></Loading>
  <div>
    <div class="auth-container my5">
      <h1 class="auth-title fade in">Se connecter</h1>

      <small>{{ error }}</small>

      <form class="auth-form fade fade-1 in" method="post">
        <div class="form-group">
          <label for="inputEmail">Nom d'utilisateur</label>
          <input
            type="text"
            name="email"
            id="inputEmail"
            class="form-control"
            v-model="email"
          />
        </div>
        <small v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</small>

        <div class="form-group">
          <label for="inputPassword">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="inputPassword"
            class="form-control"
            v-model="password"
          />
        </div>
        <small v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</small>
        <div class="auth-actions flex">
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="rememberMe"
              name="_remember_me"
            />
            <label class="form-check-label" for="rememberMe">Se souvenir de moi</label>
          </div>
          <a href="/password/new" class="auth-password-forgot">Mot de passe oublié ?</a>
        </div>

        <button class="btn-gradient" @click.prevent="submit">Se connecter</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import useVuelidate from "@vuelidate/core";
import { require, lgmin, lgmax, ValidEmail, ValidNumeri } from "@/functions/rules";
import axios from "@/lib/axiosConfig.js";
import Loading from "../../components/other/preloader.vue";

export default {
  name: "ForumMffeConnexion",
  components: {
    Loading,
  },

  data() {
    return {
      v$: useVuelidate(),
      email: "",
      password: "",
      error: "",
      loading: false,
    };
  },
  validations: {
    email: {
      require,
      ValidEmail,
    },
    password: {
      require,
      lgmin: lgmin(8),
      lgmax: lgmax(20),
    },
  },

  mounted() {},

  methods: {
    ...mapActions({ loginUser: "loginUser" }),
    async submit() {
      this.v$.$touch();
      this.error = "";
      if (this.v$.$errors.length == 0) {
        this.loading = true;
        let DataUser = {
          email: this.email,
          password: this.password,
        };
        console.log("eeedata", DataUser);
        try {
          const response = await axios.post("/users/sign-up-user", DataUser);
          console.log("response.login", response);
          if (response.data.statut === "success") {
            const userDatas = {
              token: response.data.token,
              user: response.data.user,
            };
            console.log(response.data.user.statut);

            if (response.data.user.statut === "M") {
              this.loginUser(userDatas);
              this.loading = false;
              this.$router.push("/moderatrice");
            } else if (response.data.user.statut === "A") {
              this.loginUser(userDatas);
              this.loading = false;
              this.$router.push("/admin");
            } else {
              this.loginUser(userDatas);
              this.loading = false;
              this.$router.push("/forum");
            }
          } else {
            this.loading = false;
            return (this.error = response.data.alert);
          }
        } catch (error) {
          return (this.error = "L'authentification a échoué");
        }
      } else {
        console.log("pas bon", this.v$.$errors);
      }
    },
  },
};
</script>

<style lang="css" scoped>
small {
  color: #f8001b;
  display: flex;
  align-items: center;
  justify-content: center;
}
.auth-container {
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
}

.fade.in {
  opacity: 1 !important;
  transform: translateY(0) !important;
  transition: 0.7s cubic-bezier(0.5, 0, 0, 1);
}

.auth-title {
  color: var(--vert);
  text-align: center;
  margin-bottom: calc(4 * 8px);
  font-size: 52px;
  font-family: Inter, sans-serif;
  font-weight: 700;
  line-height: 1.2;
}

.fade {
  opacity: 0 !important;
  transform: translateY(30px) !important;
}

.auth-form {
  padding: calc(3 * 8px);
}

.alert,
.auth-form,
.blog-post__image img,
.card,
.card--stacked::after,
.card--stacked::before,
.chapters-split > *,
.course,
.cursus-card,
.dropdown ul,
.forum-report__form,
.home-post__image img,
.notifications,
.pagination a,
.podcast-suggestion__vote,
.requirements,
.search-header .search-input_suggestions,
.tree-item {
  background: var(--blanc);
  border: 1px solid #d5e3ec;
  box-shadow: 0 2px 4px var(--box-shadow);
  border-radius: 3px;
  transition: 0.3s;
  max-width: 400px;
  width: 100%;
}
.fade-1 {
  transition-delay: 0.2s !important;
}

.form-group label {
  display: block;
  margin-bottom: calc(1 * 8px);
}

label {
  text-transform: uppercase;
  font-weight: 300;
  font-size: 0.85em;
}
a,
abbr,
acronym,
address,
applet,
article,
aside,
audio,
b,
big,
blockquote,
body,
canvas,
caption,
center,
cite,
code,
dd,
del,
details,
dfn,
div,
dl,
dt,
em,
embed,
fieldset,
figcaption,
figure,
footer,
form,
h1,
h2,
h3,
h4,
h5,
h6,
header,
hgroup,
html,
i,
iframe,
img,
ins,
kbd,
label,
legend,
li,
mark,
menu,
nav,
object,
ol,
output,
p,
pre,
q,
ruby,
s,
samp,
section,
small,
span,
strike,
strong,
sub,
summary,
sup,
table,
tbody,
td,
tfoot,
th,
thead,
time,
tr,
tt,
u,
ul,
var,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

.form-group input,
.form-group select,
.form-group textarea,
.ts-dropdown .dropdown-input,
.ts-input {
  border: 1px solid #d5e3ec;
  background: #f7fafb;
  border-radius: 3px;
  color: var(--color);
  padding: calc(1.5 * 8px) calc(1 * 8px);
  display: block;
  width: 100%;
  outline: 0;
  min-height: 48px;
}
.form-check input:focus + label::before,
.form-group input:focus,
.ts-input.focus,
form button:focus,
input:focus + label .switch,
select:focus,
textarea:focus {
  border-color: var(--vert);
  box-shadow: 0 0 0 3px var(--contrast25);
}
input,
select {
  font-size: inherit;
  font-family: inherit;
}

.auth-actions {
  font-size: 0.9rem;
}

.flex {
  display: flex !important;
  align-items: center;
  justify-content: space-between;
}

.btn-gradient {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.2) 100%)
    var(--vert);
}
.auth-form > * + * {
  margin-top: calc(3 * 8px);
}
.btn-danger,
.btn-discord,
.btn-gradient,
.btn-primary,
.btn-primary-outlined,
.btn-secondary,
.btn-social,
.btn-white-outlined {
  text-decoration: none !important;
  padding: 9px 16px;
  border: none;
  display: inline-flex;
  align-items: center;
  box-shadow: 0 1px 2px rgba(36, 57, 141, 0.4);
  border-radius: 4px;
  line-height: 1.6;
  font-family: Inter, sans-serif;
  font-weight: 700;
  color: var(--blanc);
  cursor: pointer;
  transition: filter 0.3s, background 0.3s, color 0.3s;
  font-size: 0.9em;
  filter: brightness(1);
  white-space: nowrap;
}

@media (max-width: 768px) {
  .auth-title {
    font-size: 40px;
  }
}
</style>
