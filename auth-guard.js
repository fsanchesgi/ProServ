<script>
  document.addEventListener("DOMContentLoaded", async () => {
    const {
      data: { session }
    } = await window.supabase.auth.getSession();

    const paginaAtual = window.location.pathname;

    const paginasPublicas = [
      "/login.html",
      "/signup.html",
      "/index.html",
      "/planos.html",
      "/sobre.html"
    ];

    // Usuário NÃO logado tentando acessar página privada
    if (!session && !paginasPublicas.some(p => paginaAtual.endsWith(p))) {
      window.location.href = "login.html";
      return;
    }

    // Usuário logado tentando acessar login ou signup
    if (
      session &&
      (paginaAtual.endsWith("login.html") ||
       paginaAtual.endsWith("signup.html"))
    ) {
      window.location.href = "dashboard.html";
    }
  });
</script>
