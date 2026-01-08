// ===============================
// ELEMENT SELECTOR
// ===============================
const topBar = document.querySelector(".top-bar");
const topNavbar = document.querySelector(".top-navbar");

// ===============================
// 1) TOP BAR HIDE SAAT SCROLL
//    NAVBAR TETAP ADA (STICKY)
// ===============================
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY > 50;

  // top-bar hide saat scroll
  if (topBar) {
    if (scrolled) topBar.classList.add("hide");
    else topBar.classList.remove("hide");
  }

  // navbar cuma mengecil, tidak pernah hilang
  if (topNavbar) {
    if (scrolled) topNavbar.classList.add("shrink");
    else topNavbar.classList.remove("shrink");
  }
});

// ===============================
// 2) MODAL GALERI
// ===============================
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");

function openModal(src) {
  if (!modal || !modalImg) return;
  modal.style.display = "flex";
  modalImg.src = src;
}

function closeModal() {
  if (!modal) return;
  modal.style.display = "none";
}

// ===============================
// 3) CLOSE MODAL DENGAN ESC
// ===============================
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal && modal.style.display === "flex") {
    closeModal();
  }
});


// ===============================
// 5) SEMUA LINK EKSTERNAL BUKA TAB BARU
// ===============================
document.querySelectorAll("a[href^='http']").forEach(link => {
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener noreferrer");
});

// ===============================
// 5) LINK EKSTERNAL DIBUKA DI IFRAME MODAL
// ===============================

// Ambil elemen modal
const iframeModal = document.getElementById("iframeModal");
const iframeViewer = document.getElementById("iframeViewer");
const iframeTitle = document.getElementById("iframeTitle");
const openExternalBtn = document.getElementById("openExternalBtn");

// Fungsi buka modal iframe
function openIframeModal(url, titleText = "Membuka link...") {
  if (!iframeModal || !iframeViewer) return;

  iframeTitle.textContent = titleText;
  iframeViewer.src = url;
  iframeModal.style.display = "flex";

  // Tombol cadangan jika iframe diblokir
  if (openExternalBtn) openExternalBtn.href = url;

  document.body.style.overflow = "hidden"; // disable scroll
}

// Tutup modal jika klik area luar
function closeIframeModal(e) {
  if (e.target.id === "iframeModal") {
    forceCloseIframe();
  }
}

// Tutup modal paksa
function forceCloseIframe() {
  if (!iframeModal || !iframeViewer) return;

  iframeModal.style.display = "none";
  iframeViewer.src = "";
  document.body.style.overflow = "auto";
}

// Tutup dengan tombol ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") forceCloseIframe();
});

// Tangkap semua link eksternal, jangan pindah halaman, buka di iframe
document.querySelectorAll("a[href^='http']").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    openIframeModal(this.href, this.textContent.trim() || "Membuka link...");
  });
});


