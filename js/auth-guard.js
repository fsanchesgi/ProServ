(async () => {
  const { data } = await window.supabase.auth.getSession();

  if (!data.session) {
    window.location.href = "login.html";
  }
})();
