let usuarioLogado = null;

(async () => {
  const { data } = await window.supabase.auth.getSession();
  usuarioLogado = data.session?.user ?? null;
})();

async function assinar(plano) {
  if (!usuarioLogado) {
    alert("Você precisa estar logado para assinar um plano.");
    return;
  }

  // chamada futura para Edge Function
  alert(`Plano ${plano} selecionado`);
}
