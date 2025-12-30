(async () => {
  // 🔓 Se a página é pública, NÃO faz nada
  if (document.querySelector('meta[name="public-page"]')) {
    console.log("Página pública — auth guard ignorado");
    return;
  }

  // Aguarda Supabase existir
  const aguardarSupabase = () =>
    new Promise(resolve => {
      const i = setInterval(() => {
        if (window.supabase?.auth) {
          clearInterval(i);
          resolve();
        }
      }, 50);
    });

  await aguardarSupabase();

  const { data } = await window.supabase.auth.getSession();

  if (!data.session) {
    console.log("Página privada sem sessão → login");
    window.location.href = "login.html";
  }
})();
