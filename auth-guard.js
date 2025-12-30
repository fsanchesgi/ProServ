(async () => {
  // pathname normalizado
  const path = window.location.pathname.toLowerCase();

  // páginas públicas (html ou rota limpa)
  const paginasPublicas = [
    "/",                // home
    "/index",
    "/index.html",
    "/login",
    "/login.html",
    "/planos",
    "/planos.html"
  ];

  const isPublica = paginasPublicas.some(p =>
    path === p || path.endsWith(p)
  );

  // 🔒 Só protege páginas privadas
  if (!isPublica) {
    if (!window.supabase || !window.supabase.auth) {
      // aguarda supabase carregar
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    const { data } = await window.supabase.auth.getSession();

    if (!data.session) {
      window.location.href = "login.html";
    }
  }
})();
