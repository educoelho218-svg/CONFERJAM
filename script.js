let cur = 1;
let loteVal = 75;
let loteNome = '1º lote';
let qty = 1;
let pagNome = 'Pix';

// Inicialização
document.addEventListener('DOMContentLoaded', function () {
  setupEventListeners();
  setupCPFMask();
  setupHeroImage();
});

function setupEventListeners() {
  // Botões de navegação
  document.getElementById('btn-next-1').addEventListener('click', () => goStep(2));
  document.getElementById('btn-back-2').addEventListener('click', () => goStep(1));
  document.getElementById('btn-next-2').addEventListener('click', () => goStep(3));
  document.getElementById('btn-back-3').addEventListener('click', () => goStep(2));
  document.getElementById('btn-next-3').addEventListener('click', finalizar);

  // Lotes
  document.querySelectorAll('.lote:not(.off)').forEach(el => {
    el.addEventListener('click', function () {
      const val = parseInt(this.dataset.value);
      const nome = this.dataset.nome;
      selLote(this, val, nome);
    });
  });

  // Quantidade
  document.getElementById('qty-minus').addEventListener('click', () => chQty(-1));
  document.getElementById('qty-plus').addEventListener('click', () => chQty(1));

  // Pagamentos
  document.querySelectorAll('.pag').forEach(el => {
    el.addEventListener('click', function () {
      const nome = this.dataset.nome;
      selPag(this, nome);
    });
  });
}

function setupHeroImage() {
  const img = document.querySelector('.hero-img');
  img.addEventListener('error', function () {
    this.style.minHeight = '160px';
  });
}

function setupCPFMask() {
  const cpfInput = document.getElementById('cpf');
  cpfInput.addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '');
    v = v.replace(/(\d{3})(\d)/, '$1.$2')
         .replace(/(\d{3})(\d)/, '$1.$2')
         .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    this.value = v;
  });
}

function goStep(n) {
  if (n > cur && cur === 1) {
    const nome = document.getElementById('nome').value.trim();
    const cpf  = document.getElementById('cpf').value.trim();
    const wh   = document.getElementById('whats').value.trim();
    const em   = document.getElementById('email').value.trim();
    const e    = document.getElementById('err1');

    if (!nome || !cpf || !wh || !em) {
      e.textContent = 'Preencha todos os campos para continuar.';
      e.classList.add('show');
      return;
    }
    e.classList.remove('show');
  }

  document.getElementById('page' + cur).classList.add('page-hidden');
  markDone(cur);
  cur = n;
  document.getElementById('page' + cur).classList.remove('page-hidden');
  markActive(cur);
  updSummary();
}

function markDone(s) {
  const d = document.getElementById('sd' + s);
  d.classList.remove('active');
  d.classList.add('done');
  d.innerHTML = '<i class="ti ti-check" style="font-size:14px"></i>';
  document.getElementById('sl' + s).classList.remove('active');
  if (s < 3) document.getElementById('line' + s).classList.add('done');
}

function markActive(s) {
  const d = document.getElementById('sd' + s);
  d.classList.remove('done');
  d.classList.add('active');
  d.innerHTML = s;
  document.getElementById('sl' + s).classList.add('active');
}

function selLote(el, val, nome) {
  document.querySelectorAll('.lote:not(.off)').forEach(x => x.classList.remove('sel'));
  el.classList.add('sel');
  loteVal = val;
  loteNome = nome;
  updSummary();
}

function chQty(d) {
  qty = Math.min(20, Math.max(1, qty + d));
  document.getElementById('qv').textContent = qty;
  updSummary();
}

function selPag(el, nome) {
  document.querySelectorAll('.pag').forEach(x => x.classList.remove('sel'));
  el.classList.add('sel');
  pagNome = nome;
}

function updSummary() {
  const t = (loteVal * qty).toFixed(2).replace('.', ',');
  document.getElementById('sum-lote').textContent = loteNome;
  document.getElementById('sum-qty').textContent  = qty + ' × R$ ' + loteVal.toFixed(2).replace('.', ',');
  document.getElementById('sum-total').textContent = 'R$ ' + t;
}

function finalizar() {
  const t = (loteVal * qty).toFixed(2).replace('.', ',');
  document.getElementById('tk-nome').textContent  = document.getElementById('nome').value.trim();
  document.getElementById('tk-lote').textContent  = loteNome;
  document.getElementById('tk-qty').textContent   = qty;
  document.getElementById('tk-pag').textContent   = pagNome;
  document.getElementById('tk-total').textContent = 'R$ ' + t;
  document.getElementById('page3').classList.add('page-hidden');
  markDone(3);
  document.getElementById('steps-bar').classList.add('page-hidden');
  document.getElementById('done').classList.remove('page-hidden');
}