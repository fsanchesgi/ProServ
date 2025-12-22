document.addEventListener("DOMContentLoaded", async () => {
  const { data: { session } } = await supabase.auth.getSession();

  // ❌ Não logado
  if (!session) {
    window.location.href = "login.html";
    return;
  }

  const userId = session.user.id;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (error || !profile) {
    await supabase.auth.signOut();
    window.location.href = "login.html";
    return;
  }

  const page = window.location.pathname;

  // 🚫 Usuário comum tentando acessar admin
  if (page.includes("dashboard-admin") && profile.role !== "admin") {
    window.location.href = "dashboard.html";
    return;
  }

  // 🚫 Admin tentando acessar dashboard comum
  if (page.includes("dashboard.html") && profile.role === "admin") {
    window.location.href = "dashboard-admin.html";
    return;
  }
});
