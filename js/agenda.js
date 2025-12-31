const SUPABASE_URL = "https://uqwbduinwugaqexsvkxc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxd2JkdWlud3VnYXFleHN2a3hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3MTk5MjMsImV4cCI6MjA4MTI5NTkyM30._GzXlkNAvqbevYjmi-crhvSKGQQfX3yjzTWT5PTvIxE";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let usuario = null;
let agendamentos = [];

(async () => {
  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    window.location.href = "login.html";
    return;
  }

  usuario = data.session.user;
  carregarAgendamentos();
})();

async function carregarAgendamentos() {
  const { data, error } = await supabase
    .from("agendamentos")
    .select("*")
    .order("data", { ascending: true });

  if (error) {
    alert("Erro ao carregar agenda");
    return;
  }

  agendamentos = data;
  renderizarAgenda();
}

function renderizarAgenda() {
  const container = document.getElementById("listaAgendamentos");
  container.innerHTML = "";

  if (agendamentos.length === 0) {
    container.innerHTML = "<p>Nenhum agendamento</p>";
    return;
  }

  agendamentos.forEach(a => {
    const div = document.createElement("div");
    div.className = "agenda-item";
    div.innerHTML = `
      <h4>${a.horario} — ${a.cliente_nome}</h4>
      <p>${a.servico_nome}</p>
      <small>Status: ${a.status}</small>
    `;
    container.appendChild(div);
  });
}

document.getElementById("logout").onclick = async () => {
  await supabase.auth.signOut();
  window.location.href = "login.html";
};
