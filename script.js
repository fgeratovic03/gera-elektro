 // Hamburger meni toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('show');
    if (!expanded) {
      mobileMenu.focus();
    }
  });

  // Scroll to top dugme prikaz i funkcija
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.style.display = 'flex';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Galerija sa paginacijom
  const galleryGrid = document.getElementById('galleryGrid');
  const pagination = document.getElementById('pagination');

  // Primer slika (možeš promeniti URL slike na svoje)
const galleryImages = [];
for (let i = 1; i <= 12; i++) {
  galleryImages.push(`slike/posao${i}.jpg`);
}

  const itemsPerPage = 6;
  let currentPage = 1;
  const totalPages = Math.ceil(galleryImages.length / itemsPerPage);

  function renderGalleryPage(page) {
    galleryGrid.innerHTML = '';
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = galleryImages.slice(start, end);

    pageItems.forEach((src, idx) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Galerija slika ${start + idx + 1}`;
      img.tabIndex = 0;
      galleryGrid.appendChild(img);
    });

    renderPagination(page);
    galleryGrid.style.opacity = '1';
  }

  function renderPagination(page) {
    pagination.innerHTML = '';

    // Prev dugme
    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Prethodno';
    prevBtn.disabled = page === 1;
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderGalleryPage(currentPage);
        window.scrollTo({ top: document.getElementById('gallery').offsetTop - 80, behavior: 'smooth' });
      }
    });
    pagination.appendChild(prevBtn);

    // Brojevi stranica
    for(let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.textContent = i;
      if (i === page) {
        pageBtn.disabled = true;
      }
      pageBtn.addEventListener('click', () => {
        currentPage = i;
        renderGalleryPage(i);
        window.scrollTo({ top: document.getElementById('gallery').offsetTop - 80, behavior: 'smooth' });
      });
      pagination.appendChild(pageBtn);
    }

    // Next dugme
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Sledeće';
    nextBtn.disabled = page === totalPages;
    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderGalleryPage(currentPage);
        window.scrollTo({ top: document.getElementById('gallery').offsetTop - 80, behavior: 'smooth' });
      }
    });
    pagination.appendChild(nextBtn);
  }

  renderGalleryPage(currentPage);

  // Kontakt forma - jednostavna validacija i poruka (možeš povezati sa backendom)
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  form.addEventListener('submit', e => {
    e.preventDefault();

    if (!form.checkValidity()) {
      formMessage.textContent = 'Molimo popunite sva obavezna polja ispravno.';
      return;
    }
    formMessage.style.color = '#d00';

    // Ovde možeš poslati podatke ajax-om ili fetch-om ka serveru
    // Za sada samo simuliramo uspešnu prijavu:
    formMessage.style.color = 'green';
    formMessage.textContent = 'Hvala na poruci! Odgovorićemo vam uskoro.';

    form.reset();
  });

 const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');

let currentImageIndex = 0;

// Otvori modal sa slikom i zapamti indeks
function openModal(src, alt, index) {
  currentImageIndex = index;
  modalImage.src = src;
  modalImage.alt = alt;
  imageModal.style.display = 'flex';
  imageModal.setAttribute('aria-hidden', 'false');
  modalClose.focus();
}

// Zatvori modal
function closeModal() {
  imageModal.style.display = 'none';
  imageModal.setAttribute('aria-hidden', 'true');
  modalImage.src = '';
  modalImage.alt = '';
}

// Prikazi prethodnu sliku u galeriji
function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  modalImage.src = galleryImages[currentImageIndex];
  modalImage.alt = `Galerija slika ${currentImageIndex + 1}`;
}

// Prikazi sledecu sliku u galeriji
function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  modalImage.src = galleryImages[currentImageIndex];
  modalImage.alt = `Galerija slika ${currentImageIndex + 1}`;
}

modalClose.addEventListener('click', closeModal);
modalPrev.addEventListener('click', showPrevImage);
modalNext.addEventListener('click', showNextImage);

// Klik na overlay zatvara modal
imageModal.addEventListener('click', (e) => {
  if (e.target === imageModal) closeModal();
});

// ESC zatvara modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && imageModal.style.display === 'flex') {
    closeModal();
  }
  // Dodaj tastaturne strelice za navigaciju slika
  if (imageModal.style.display === 'flex') {
    if (e.key === 'ArrowLeft') {
      showPrevImage();
    }
    if (e.key === 'ArrowRight') {
      showNextImage();
    }
  }
});

// Dodaj listener-e na slike da otvore modal sa indeksom
function addModalListeners() {
  const imgs = galleryGrid.querySelectorAll('img');
  imgs.forEach((img, index) => {
    img.addEventListener('click', () => openModal(img.src, img.alt, (currentPage - 1) * itemsPerPage + index));
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(img.src, img.alt, (currentPage - 1) * itemsPerPage + index);
      }
    });
  });
}

// Prepakuj renderGalleryPage da pozove addModalListeners
const originalRenderGalleryPage = renderGalleryPage;
renderGalleryPage = function(page) {
  originalRenderGalleryPage(page);
  addModalListeners();
};

renderGalleryPage(currentPage);

