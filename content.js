// Sayfa üzerindeki tüm x.com linklerini xcancel.com'a çevir

function replaceLinks() {
  // Tüm linkleri bul
  const links = document.querySelectorAll('a[href*="x.com"]');

  links.forEach(link => {
    const href = link.href;

    // x.com veya www.x.com içeren linkleri değiştir
    if (href.includes('://x.com/') || href.includes('://www.x.com/')) {
      const newHref = href
        .replace('://x.com/', '://xcancel.com/')
        .replace('://www.x.com/', '://xcancel.com/');

      link.href = newHref;

      // Görsel geri bildirim için (isteğe bağlı)
      link.title = `Yönlendirildi: ${newHref}`;
    }
  });
}

// Sayfa yüklendiğinde linkleri değiştir
replaceLinks();

// Dinamik içerik için MutationObserver kullan
const observer = new MutationObserver((mutations) => {
  let shouldReplace = false;

  mutations.forEach((mutation) => {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      shouldReplace = true;
    }
  });

  if (shouldReplace) {
    replaceLinks();
  }
});

// DOM değişikliklerini izle
observer.observe(document.body, {
  childList: true,
  subtree: true
});
