// Sayfa üzerindeki tüm x.com linklerini xcancel.com'a, instagram.com linklerini imginn.com'a çevir

function replaceLinks() {
  // X.com linklerini bul ve değiştir
  const xLinks = document.querySelectorAll('a[href*="x.com"]');

  xLinks.forEach(link => {
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

  // Instagram linklerini bul ve değiştir
  const instagramLinks = document.querySelectorAll('a[href*="instagram.com"]');

  instagramLinks.forEach(link => {
    const href = link.href;

    // instagram.com veya www.instagram.com içeren linkleri değiştir
    if (href.includes('://instagram.com/') || href.includes('://www.instagram.com/')) {
      const newHref = href
        .replace('://instagram.com/', '://imginn.com/')
        .replace('://www.instagram.com/', '://imginn.com/');

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
