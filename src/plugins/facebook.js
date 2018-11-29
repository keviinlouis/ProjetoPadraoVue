// Para testar o Login com facebook, precisar rodar o server do vue em https
// Você pode fazer isso configurando o vue.config.js no root do projeto
// Veja também o component FacebookLoginButton.vue e troque a função onSignInSuccessTest para onSignInSuccess

window.fbAsyncInit = function () {
  FB.init({
    appId: process.env.VUE_APP_FACEBOOK_APP_ID,
    cookie: true,
    xfbml: true,
    version: 'v3.0',
  });

  FB.AppEvents.logPageView();
};

(function (d, s, id) {
  let js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement(s);
  js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
