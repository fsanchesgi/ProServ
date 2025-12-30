(async () => {
  const paginaAtual = window.location.pathname;

  // páginas que NÃO exigem login
  const paginasPublicas = [
    "index.html",
    "login.html",
    "planos.html"
  ];

  const isPublica = paginasPublicas.some(p =>
    paginaAtual.includes(p)
  );

  // 🔒 Só protege páginas privadas
  if (!isPublica) {
    const { data } = await window.supabase.auth.getSession();

    if (!data.session) {
      window.location.href = "login.html";
    }
  }
})();
