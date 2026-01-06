// Sayfa üzerindeki tüm x.com linklerini nitter.space'a, instagram.com linklerini imginn.com'a çevir

function replaceLinks() {
  // X.com linklerini bul ve değiştir
  const xLinks = document.querySelectorAll('a[href*="x.com"]');

  xLinks.forEach(link => {
    const href = link.href;

    // x.com veya www.x.com içeren linkleri değiştir
    if (href.includes('://x.com/') || href.includes('://www.x.com/')) {
      const newHref = href
        .replace('://x.com/', '://nitter.space/')
        .replace('://www.x.com/', '://nitter.space/');

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
      let newHref;

      // /reel/ veya /reels/ içeren linkleri /p/ ile değiştir
      if (href.includes('/reel/') || href.includes('/reels/')) {
        // Reel ID'sini çıkar (username/reel/ID, reel/ID, reels/ID formatları için)
        const reelMatch = href.match(/\/reels?\/([^/?]+)/);
        if (reelMatch) {
          const reelId = reelMatch[1];
          newHref = href.replace(/https?:\/\/(?:www\.)?instagram\.com\/(?:[^/]+\/)?reels?\/[^/?]+/, `https://imginn.com/p/${reelId}`);
        }
      } else if (href.includes('/stories/')) {
        // Stories linklerinden kullanıcı adını çıkar
        const storyMatch = href.match(/\/stories\/([^/]+)\//);
        if (storyMatch) {
          const username = storyMatch[1];
          newHref = `https://imginn.com/stories/${username}/`;
        }
      } else {
        // Diğer linkler için normal dönüşüm (profil, ana sayfa vs.)
        newHref = href
          .replace('://instagram.com/', '://imginn.com/')
          .replace('://www.instagram.com/', '://imginn.com/');
      }

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
