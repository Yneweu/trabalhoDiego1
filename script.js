// ── HAMBURGER MENU ──
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  function closeMobile() {
    mobileMenu.classList.remove('open');
  }

  // ── FILTRO DE CURSOS ──
  function filtrarCursos(categoria, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cards = document.querySelectorAll('.curso-card');
    cards.forEach(card => {
      if (categoria === 'todos' || card.dataset.cat === categoria) {
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'none'; }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(.95)';
        setTimeout(() => { card.style.display = 'none'; }, 250);
      }
    });
  }

  // ── VALIDAÇÃO DO FORMULÁRIO ──
  function enviarFormulario() {
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const mensagem = document.getElementById('mensagem');
    let valido = true;

    // Reset
    [nome, email, mensagem].forEach(f => {
      f.classList.remove('error');
    });
    ['erroNome','erroEmail','erroMensagem'].forEach(id => {
      document.getElementById(id).classList.remove('show');
    });

    if (!nome.value.trim() || nome.value.trim().length < 3) {
      nome.classList.add('error');
      document.getElementById('erroNome').classList.add('show');
      valido = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
      email.classList.add('error');
      document.getElementById('erroEmail').classList.add('show');
      valido = false;
    }

    if (!mensagem.value.trim() || mensagem.value.trim().length < 10) {
      mensagem.classList.add('error');
      document.getElementById('erroMensagem').classList.add('show');
      valido = false;
    }

    if (valido) {
      const btn = document.querySelector('.btn-submit');
      btn.textContent = 'Enviando...';
      btn.disabled = true;
      setTimeout(() => {
        document.getElementById('successMsg').classList.add('show');
        nome.value = '';
        email.value = '';
        mensagem.value = '';
        btn.textContent = 'Enviar mensagem ✉️';
        btn.disabled = false;
        setTimeout(() => {
          document.getElementById('successMsg').classList.remove('show');
        }, 5000);
      }, 1200);
    }
  }

  // ── SCROLL ANIMATIONS ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ── CURSO CARDS TRANSITION ──
  document.querySelectorAll('.curso-card').forEach(card => {
    card.style.transition = 'opacity .25s, transform .25s';
  });

  // ── ACTIVE NAV ──
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 80;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current
        ? 'var(--yellow)' : '';
    });
  });
