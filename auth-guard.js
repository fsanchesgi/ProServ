document.addEventListener("DOMContentLoaded", async () => {
  // Garante que o Supabase foi carregado
  if (!window.supabase) {
    console.error("Supabase não carregado");
    window.location.href = "login.html";
    return;
  }

  const { data, error } = await window.supabase.auth.getSession();

  if (error || !data.session) {
    window.location.href = "login.html";
    return;
  }
});
