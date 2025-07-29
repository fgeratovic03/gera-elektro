
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

  const galleryGrid = document.getElementById('galleryGrid');
  const pagination = document.getElementById('pagination');

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

  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  form.addEventListener('submit', e => {
    e.preventDefault();

    if (!form.checkValidity()) {
      formMessage.textContent = 'Molimo popunite sva obavezna polja ispravno.';
      return;
    }
    formMessage.style.color = '#d00';
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

function openModal(src, alt, index) {
  currentImageIndex = index;
  modalImage.src = src;
  modalImage.alt = alt;
  imageModal.style.display = 'flex';
  imageModal.setAttribute('aria-hidden', 'false');
  modalClose.focus();
}

function closeModal() {
  imageModal.style.display = 'none';
  imageModal.setAttribute('aria-hidden', 'true');
  modalImage.src = '';
  modalImage.alt = '';
}

function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  modalImage.src = galleryImages[currentImageIndex];
  modalImage.alt = `Galerija slika ${currentImageIndex + 1}`;
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  modalImage.src = galleryImages[currentImageIndex];
  modalImage.alt = `Galerija slika ${currentImageIndex + 1}`;
}

modalClose.addEventListener('click', closeModal);
modalPrev.addEventListener('click', showPrevImage);
modalNext.addEventListener('click', showNextImage);

imageModal.addEventListener('click', (e) => {
  if (e.target === imageModal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && imageModal.style.display === 'flex') {
    closeModal();
  }
  if (imageModal.style.display === 'flex') {
    if (e.key === 'ArrowLeft') {
      showPrevImage();
    }
    if (e.key === 'ArrowRight') {
      showNextImage();
    }
  }
});
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

const originalRenderGalleryPage = renderGalleryPage;
renderGalleryPage = function(page) {
  originalRenderGalleryPage(page);
  addModalListeners();
};

renderGalleryPage(currentPage);

