/* ==========================================================================
   BODRĒN — تعاملات صفحه فرود (جاوااسکریپت خالص، بدون وابستگی)
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- ناوبری: وضعیت اسکرول، پنل موبایل، لینک فعال ---------- */
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');

  function closeNav() {
    nav.classList.remove('nav--open');
    burger.setAttribute('aria-expanded', 'false');
  }

  function onScroll() {
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('nav--open');
    burger.setAttribute('aria-expanded', String(open));
  });

  navLinks.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeNav();
  });

  var sections = ['hero', 'menu', 'about', 'reviews', 'contact']
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  var linkFor = {};
  Array.prototype.forEach.call(navLinks.querySelectorAll('a'), function (a) {
    linkFor[a.getAttribute('href').slice(1)] = a;
  });

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          Object.keys(linkFor).forEach(function (id) {
            linkFor[id].classList.toggle('is-active', id === entry.target.id);
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach(function (s) {
      spy.observe(s);
    });
  }

  /* ---------- نمایش تدریجی هنگام اسکرول ---------- */
  var revealItems = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || reduced) {
    Array.prototype.forEach.call(revealItems, function (el) {
      el.classList.add('in');
    });
  } else {
    var revealer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          revealer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -60px' }
    );
    Array.prototype.forEach.call(revealItems, function (el) {
      revealer.observe(el);
    });
  }

  /* ---------- پارالاکس ملایم هیرو (فقط با ماوس) ---------- */
  var heroArt = document.querySelector('.hero__art');
  if (heroArt && !reduced && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var hero = document.getElementById('hero');
    hero.addEventListener('pointermove', function (e) {
      var x = (e.clientX / window.innerWidth - 0.5) * 2;
      var y = (e.clientY / window.innerHeight - 0.5) * 2;
      heroArt.style.setProperty('--px', (x * 14).toFixed(1) + 'px');
      heroArt.style.setProperty('--py', (y * 10).toFixed(1) + 'px');
    });
    hero.addEventListener('pointerleave', function () {
      heroArt.style.setProperty('--px', '0px');
      heroArt.style.setProperty('--py', '0px');
    });
  }

  /* ---------- سبد خرید ---------- */
  var cart = [];
  var cartBtn = document.getElementById('cartBtn');
  var cartPanel = document.getElementById('cartPanel');
  var cartList = document.getElementById('cartList');
  var cartCount = document.getElementById('cartCount');
  var cartTotal = document.getElementById('cartTotal');
  var toast = document.getElementById('toast');
  var toastTimer;

  function showToast(text) {
    toast.textContent = text;
    toast.hidden = false;
    requestAnimationFrame(function () {
      toast.classList.add('is-on');
    });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('is-on');
      setTimeout(function () {
        toast.hidden = true;
      }, 400);
    }, 2200);
  }

  function total() {
    return cart.reduce(function (sum, item) {
      return sum + item.price * item.qty;
    }, 0);
  }

  function renderCart() {
    var count = cart.reduce(function (sum, item) {
      return sum + item.qty;
    }, 0);
    cartCount.textContent = count;
    cartTotal.textContent = total() + ' ₽';

    if (!cart.length) {
      cartList.innerHTML = '<li class="cart-panel__empty">هنوز خالی است — سری به منو بزن.</li>';
      return;
    }
    cartList.innerHTML = cart
      .map(function (item) {
        return '<li><span>' + item.name + ' × ' + item.qty + '</span><b>' + item.price * item.qty + ' ₽</b></li>';
      })
      .join('');
  }

  function addToCart(name, price) {
    var existing = cart.filter(function (item) {
      return item.name === name;
    })[0];
    if (existing) existing.qty += 1;
    else cart.push({ name: name, price: price, qty: 1 });
    renderCart();
    cartCount.classList.add('is-bump');
    setTimeout(function () {
      cartCount.classList.remove('is-bump');
    }, 320);
    showToast(name + ' به سبد اضافه شد');
  }

  document.addEventListener('click', function (e) {
    var add = e.target.closest('.add');
    if (add) {
      addToCart(add.dataset.name, Number(add.dataset.price));
      return;
    }
    if (!cartPanel.hidden && !e.target.closest('.cart-panel') && !e.target.closest('.cart')) {
      cartPanel.hidden = true;
      cartBtn.setAttribute('aria-expanded', 'false');
    }
  });

  cartBtn.addEventListener('click', function () {
    var open = cartPanel.hidden;
    cartPanel.hidden = !open;
    cartBtn.setAttribute('aria-expanded', String(open));
  });

  document.getElementById('cartClear').addEventListener('click', function () {
    cart = [];
    renderCart();
    showToast('سبد خالی شد');
  });

  renderCart();

  /* ---------- باز و بسته شدن منوی کامل ---------- */
  var moreBtn = document.getElementById('moreBtn');
  var moreMenu = document.getElementById('moreMenu');

  moreBtn.addEventListener('click', function () {
    var open = moreMenu.hidden;
    moreMenu.hidden = !open;
    moreBtn.setAttribute('aria-expanded', String(open));
    moreBtn.textContent = open ? 'بستن منو' : 'مشاهده منو';
  });

  /* ---------- کوییز سلیقه‌ی قهوه ---------- */
  var QUESTIONS = [
    {
      q: 'معمولاً چطور قهوه می‌نوشی؟',
      opts: [
        { t: 'با شیر', w: { latte: 3, cappuccino: 2, raf: 1 } },
        { t: 'سیاه و بی‌شکر', w: { espresso: 3, cappuccino: 1 } },
        { t: 'دلبسته‌ی نُت‌های دسری', w: { mocha: 3, raf: 2 } }
      ]
    },
    {
      q: 'در یک فنجان، چه چیزی برایت مهم‌تر است؟',
      opts: [
        { t: 'قوت و غلظت', w: { espresso: 3, cappuccino: 2 } },
        { t: 'نرمی و لطافت', w: { latte: 3, raf: 2 } },
        { t: 'پُر بودن و شیرینی', w: { mocha: 3, raf: 1 } }
      ]
    },
    {
      q: 'چه وقت قهوه می‌نوشی؟',
      opts: [
        { t: 'صبح، برای بیدار شدن', w: { cappuccino: 2, espresso: 2 } },
        { t: 'روز، سرِ کار', w: { iced: 3, latte: 2 } },
        { t: 'شب، برای لذت بردن', w: { raf: 3, mocha: 2 } }
      ]
    }
  ];

  var DRINKS = {
    cappuccino: {
      name: 'کاپوچینو',
      price: 120,
      text: 'فوم شیری مخملی، اسپرسوی دوگانه و دانه‌ی برشته‌کاری متوسط — تعادلی که تقریباً همه عاشقش‌اند.'
    },
    latte: {
      name: 'لاته',
      price: 140,
      text: 'نرم و خامه‌ای با فوم نازک و شیرینی کاراملی؛ برای صبح‌های بی‌عجله عالی است.'
    },
    mocha: {
      name: 'موکا',
      price: 140,
      text: 'اسپرسو با شکلات و خامه‌ی زده: حال‌وهوای دسری و پس‌طعمی غلیظ.'
    },
    raf: {
      name: 'راف وانیلی',
      price: 160,
      text: 'خامه، وانیل و اسپرسو؛ نرم‌ترین نوشیدنی منو که گرم می‌کند و تلخی‌اش کم است.'
    },
    espresso: {
      name: 'اسپرسو',
      price: 90,
      text: '30 میلی‌لیتر شخصیت: بدنه‌ی غلیظ، تلخیِ فندقی و فینالِ کاراملی، بدون شیر.'
    },
    iced: {
      name: 'آیس لاته',
      price: 170,
      text: 'اسپرسوی سرد، شیر و یخ: تازه‌کننده است و طعمش تا آخرین جرعه می‌ماند.'
    }
  };

  var quizBody = document.getElementById('quizBody');
  var qList = document.getElementById('qList');
  var qProgress = document.getElementById('qProgress');
  var quizResult = document.getElementById('quizResult');
  var resName = document.getElementById('resName');
  var resText = document.getElementById('resText');
  var resPrice = document.getElementById('resPrice');
  var step = 0;
  var scores = {};
  var winner = 'cappuccino';

  function renderQuestion() {
    var item = QUESTIONS[step];
    qProgress.textContent = 'پرسش ' + (step + 1) + ' از ' + QUESTIONS.length;
    qList.innerHTML =
      '<li><h3>' +
      item.q +
      '</h3><div class="q__opts">' +
      item.opts
        .map(function (opt, i) {
          return '<button class="opt" type="button" data-i="' + i + '">' + opt.t + '</button>';
        })
        .join('') +
      '</div></li>';
  }

  function finish() {
    winner = Object.keys(scores).reduce(function (best, key) {
      return scores[key] > (scores[best] || 0) ? key : best;
    }, 'cappuccino');
    var drink = DRINKS[winner];
    resName.textContent = drink.name;
    resText.textContent = drink.text;
    resPrice.textContent = drink.price + ' ₽';
    quizBody.hidden = true;
    quizResult.hidden = false;
    quizResult.querySelector('.link-btn').focus();
  }

  qList.addEventListener('click', function (e) {
    var btn = e.target.closest('.opt');
    if (!btn) return;
    var opt = QUESTIONS[step].opts[Number(btn.dataset.i)];
    Object.keys(opt.w).forEach(function (key) {
      scores[key] = (scores[key] || 0) + opt.w[key];
    });
    step += 1;
    if (step < QUESTIONS.length) renderQuestion();
    else finish();
  });

  document.getElementById('resAdd').addEventListener('click', function () {
    addToCart(DRINKS[winner].name, DRINKS[winner].price);
  });

  document.getElementById('quizRestart').addEventListener('click', function () {
    step = 0;
    scores = {};
    quizResult.hidden = true;
    quizBody.hidden = false;
    renderQuestion();
  });

  renderQuestion();

  /* ---------- فرم تماس ---------- */
  var form = document.getElementById('contactForm');
  var formOk = document.getElementById('formOk');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = true;
    ['name', 'contact'].forEach(function (field) {
      var input = form.elements[field];
      var bad = input.value.trim().length < 2 || (field === 'contact' && input.value.trim().length < 5);
      input.parentElement.classList.toggle('is-bad', bad);
      if (bad) valid = false;
    });
    if (!valid) {
      formOk.hidden = true;
      return;
    }
    form.reset();
    formOk.hidden = false;
  });

  /* ---------- بستن لایه‌ها با Esc ---------- */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeNav();
    cartPanel.hidden = true;
    cartBtn.setAttribute('aria-expanded', 'false');
  });
})();
