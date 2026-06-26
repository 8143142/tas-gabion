(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  const STATIC_KNOWLEDGE = [
    {
      keywords: ['кто', 'компания', 'tas', 'tas-gabion', 'о вас', 'о нас', 'кто вы'],
      answer:
        'TAS-GABION — изготавливаем габионные заборы, стены, скамейки, клумбы и другие конструкции под ключ в Астане и по всему Казахстану. Проектирование, поставка материалов и монтаж.',
      link: { text: 'Подробнее о нас', href: '#about' },
    },
    {
      keywords: ['услуг', 'изготавлива', 'делаете', 'что делаете', 'продукт', 'ассортимент'],
      answer:
        'Мы изготавливаем: заборы и ворота, габионные стены, заборы на габионном основании, скамейки, декоративные заборы, столбы из габиона, клумбы и цветники. Все работы — под ключ.',
      link: { text: 'Смотреть услуги', href: '#services' },
    },
    {
      keywords: ['забор', 'ворота', 'огражден', 'калитк', 'откатн'],
      answer:
        'Делаем современные габионные ограждения с металлическими секциями, калитками и откатными воротами. Комбинируем камень в сетке с деревом и металлом — Астана и регионы РК.',
      link: { text: 'Примеры заборов', href: '#services' },
    },
    {
      keywords: ['стен', 'подпор', 'террас', 'бордюр'],
      answer:
        'Изготавливаем подпорные и декоративные габионные стены, бордюры вдоль дорожек и террас. Конструкция пропускает воду и не требует массивного фундамента.',
      link: { text: 'Габионные стены', href: '#services' },
    },
    {
      keywords: ['скамей', 'мебел', 'садов'],
      answer:
        'Делаем массивные скамейки на габионном основании — для парков, отелей и частных участков. Пример работы — видео со скамейкой в отеле «Алтай Ресорт», Щучинск.',
      link: { text: 'Видео с объектов', href: '#showreel' },
    },
    {
      keywords: ['клумб', 'цветник', 'растен', 'озелен'],
      answer:
        'Изготавливаем высокие габионные клумбы и цветники для растений и озеленения участка.',
      link: { text: 'Клумбы', href: '#services' },
    },
    {
      keywords: ['столб', 'опор', 'профлист', 'профнастил'],
      answer:
        'Делаем столбы из габиона — опоры для профлиста, секционных и комбинированных ограждений.',
      link: { text: 'Столбы', href: '#services' },
    },
    {
      keywords: ['преимущ', 'особенност', 'плюс', 'почему габион', 'зачем габион'],
      answer:
        'Габионы надёжны и долговечны, пропускают воду (нет гидродавления), не требуют тяжёлого фундамента, экологичны, обеспечивают приватность и сочетаются с деревом, металлом и озеленением.',
      link: { text: 'Преимущества', href: '#gabion' },
    },
    {
      keywords: ['камень', 'наполн', 'щебень', 'гранит', 'гальк', 'материал'],
      answer:
        'Используем твёрдые породы: гранитную или базальтовую крошку, гальку, песчаник. Камень подбираем однородный по фракции — укладываем плотно, без пустот.',
      link: { text: 'FAQ о камне', href: '#faq' },
    },
    {
      keywords: ['сетк', 'гост', 'проволок', 'оцинк', 'качеств', 'ячейк', 'рулон', '4мм', '4 мм', '50/100', '50×100'],
      answer:
        'Используем оцинкованную габионную сетку по ГОСТ: есть проволока 5 мм и 4 мм, ячейки 50/50 мм и 5/10, рулоны 2/3 м и 2/52 м — для заборов, стен, столбов и других конструкций.',
      link: { text: 'Характеристики сетки', href: '#gabion' },
    },
    {
      keywords: ['фундамент', 'основан', 'грунт'],
      answer:
        'Массивная ленточная основа обычно не нужна — достаточно подготовленного, выровненного основания. Для высоких подпорных стен на склоне проект рассчитывается отдельно.',
      link: { text: 'FAQ', href: '#faq' },
    },
    {
      keywords: ['срок', 'сколько служ', 'долговеч', 'лет', 'гарант', 'время', 'монтаж', 'изготов'],
      answer:
        'При качественной сетке, правильной укладке камня и монтаже конструкция служит 30–50 лет и дольше. Сроки изготовления и монтажа зависят от объёма — называем после замера.',
      link: { text: 'FAQ', href: '#faq' },
    },
    {
      keywords: ['цена', 'стоим', 'расчёт', 'сколько стоит', 'прайс', 'бюджет', 'дешев', 'дорог'],
      answer:
        'Стоимость зависит от длины, высоты, типа конструкции и камня. Бесплатный замер, расчёт и консультация — оставьте заявку или напишите в Instagram.',
      link: { text: 'Заказать расчёт', href: '#contact' },
    },
    {
      keywords: ['как работ', 'этап', 'процесс', 'монтаж', 'заказ', 'оформ'],
      answer:
        '1) Заявка и консультация → 2) Замер и расчёт на объекте → 3) Изготовление каркасов и комплектующих → 4) Монтаж, заполнение камнем и сдача под ключ.',
      link: { text: 'Как мы работаем', href: '#process' },
    },
    {
      keywords: ['регион', 'астана', 'казахстан', 'город', 'выезд', 'где работ', 'караганд', 'алмат', 'шымкент', 'актоб', 'павлодар'],
      answer:
        'Работаем в Астане и по регионам Казахстана. Стоимость доставки и монтажа уточняем при расчёте — зависит от удалённости и объёма.',
      link: { text: 'Связаться', href: '#contact' },
    },
    {
      keywords: ['дерев', 'металл', 'комбин', 'совмест'],
      answer:
        'Да, часто комбинируем габион с деревянными или металлическими секциями, калитками и воротами — единый стиль ограждения.',
      link: { text: 'FAQ', href: '#faq' },
    },
    {
      keywords: ['видео', 'работ', 'пример', 'портфолио', 'фото', 'instagram', 'инстаграм'],
      answer:
        'На сайте есть видео с объектов в Астане и Щучинске. Больше работ — в Instagram @tasgabion.',
      link: { text: 'Instagram', href: 'https://www.instagram.com/tasgabion/', external: true },
    },
    {
      keywords: ['контакт', 'связ', 'телефон', 'позвон', 'написать', 'заявк', 'whatsapp', 'ватсап'],
      answer:
        'Instagram: @tasgabion · Телефон: +7 (771) 606-66-27 · WhatsApp: wa.me/77716066627. Замер, расчёт и консультация — бесплатно.',
      link: { text: 'Форма заявки', href: '#contact' },
    },
    {
      keywords: ['отель', 'коммерч', 'бизнес', 'коттедж', 'посёлок', 'ресторан'],
      answer:
        'Выполняем проекты для частных домов, отелей, коттеджных посёлков и ландшафтных объектов — от эскиза до сдачи.',
      link: { text: 'О нас', href: '#about' },
    },
    {
      keywords: ['беседк', 'пергол', 'зона отдыха'],
      answer:
        'Делаем беседки, зоны отдыха, скамейки и столы на габионном основании — для частных участков, отелей и ресторанов.',
      link: { text: 'О нас', href: '#about' },
    },
    {
      keywords: ['привет', 'здравств', 'добрый', 'hello', 'hi', 'спасиб'],
      answer:
        'Здравствуйте! Я помощник TAS-GABION. Напишите свой вопрос в поле ниже — отвечу по услугам, материалам, срокам и заказу на основе информации с сайта.',
    },
  ];

  const QUICK_QUESTIONS = [
    'Что вы изготавливаете?',
    'Сколько стоит забор?',
    'Нужен ли фундамент?',
    'Как заказать расчёт?',
  ];

  const DOMAIN_KEYWORDS = [
    'габион', 'забор', 'ворот', 'огражден', 'стен', 'камень', 'сетк', 'монтаж',
    'услуг', 'цен', 'стоим', 'расчёт', 'расчет', 'астана', 'казахстан', 'скамей',
    'клумб', 'беседк', 'подпор', 'столб', 'щебень', 'гранит', 'фундамент', 'проект',
    'ячейк', 'рулон', 'проволок', 'оцинк', 'гост', '4мм',
    'заявк', 'контакт', 'instagram', 'tas', 'прочност', 'материал', 'декорат',
    'оцинк', 'гост', 'объект', 'отель', 'ландшафт', 'террас', 'бордюр', 'дерев',
    'металл', 'профлист', 'изготов', 'дренаж', 'эколог', 'калитк', 'профнастил',
    'комбин', 'крошк', 'гальк', 'песчан', 'под ключ', 'showreel', 'faq',
  ];

  const STOP_WORDS = new Set([
    'когда', 'где', 'кто', 'что', 'как', 'почему', 'сколько', 'какой', 'какая',
    'какие', 'какое', 'каков', 'родился', 'родилась', 'умер', 'умерла', 'год',
    'года', 'лет', 'этот', 'этого', 'для', 'или', 'ещё', 'еще', 'ли', 'бы',
    'был', 'была', 'были', 'можно', 'нужно', 'есть', 'нет', 'такой', 'такая',
  ]);

  let siteChunks = [];

  function hasDomainKeyword(words, query) {
    const q = query.toLowerCase();
    return DOMAIN_KEYWORDS.some(
      (kw) => q.includes(kw) || words.some((w) => w.includes(kw) || kw.includes(w))
    );
  }

  function offTopicResponse() {
    return {
      answer:
        'Я могу подсказать по услугам, ценам, материалам, срокам, монтажу, доставке по регионам и оформлению заявки. По другим темам, к сожалению, не подскажу — для точного ответа лучше связаться с нами.',
      link: { text: 'Оставить заявку', href: '#contact' },
      cta: true,
    };
  }

  function tokenize(text) {
    return text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2);
  }

  function buildSiteChunks() {
    const chunks = [];

    $$('main section[id]').forEach((section) => {
      const title = $('h2', section)?.textContent?.trim();
      const text = section.textContent.replace(/\s+/g, ' ').trim();
      if (!text || text.length < 40) return;
      chunks.push({
        title: title || section.id,
        text,
        href: `#${section.id}`,
      });
    });

    $$('.service-card').forEach((card) => {
      const title = $('h3', card)?.textContent?.trim();
      const text = card.textContent.replace(/\s+/g, ' ').trim();
      if (!title) return;
      chunks.push({ title, text, href: '#services' });
    });

    $$('.feature-card').forEach((card) => {
      const title = $('h3', card)?.textContent?.trim();
      const text = card.textContent.replace(/\s+/g, ' ').trim();
      if (!title) return;
      chunks.push({ title, text, href: '#gabion' });
    });

    return chunks;
  }

  function buildFaqKnowledge() {
    return $$('.faq__item').map((item) => {
      const question = $('summary', item)?.textContent?.trim() || '';
      const answer = $('p', item)?.textContent?.trim() || '';
      if (!question || !answer) return null;
      return {
        keywords: tokenize(question),
        answer,
        link: { text: 'Все вопросы', href: '#faq' },
        faq: true,
      };
    }).filter(Boolean);
  }

  function scoreEntry(entry, words, rawQuery) {
    let score = 0;
    const q = rawQuery.toLowerCase();

    entry.keywords.forEach((kw) => {
      if (q.includes(kw)) score += kw.length > 4 ? 3 : 2;
      words.forEach((w) => {
        if (w === kw) score += 2;
        else if (w.includes(kw) || kw.includes(w)) score += 1;
      });
    });

    if (entry.faq && entry.keywords.some((kw) => words.includes(kw))) score += 4;
    return score;
  }

  function searchSiteChunks(words, query) {
    if (!hasDomainKeyword(words, query)) return null;

    const searchWords = words.filter((w) => !STOP_WORDS.has(w) && w.length > 3);
    if (!searchWords.length) return null;

    let best = null;
    let bestScore = 0;

    siteChunks.forEach((chunk) => {
      let score = 0;
      searchWords.forEach((w) => {
        if (chunk.text.toLowerCase().includes(w)) score += 2;
        if (chunk.title?.toLowerCase().includes(w)) score += 4;
      });
      if (score > bestScore) {
        bestScore = score;
        best = chunk;
      }
    });

    if (bestScore >= 4 && best) {
      const snippet = best.text.length > 200 ? `${best.text.slice(0, 200).trim()}…` : best.text;
      return {
        answer: snippet,
        link: { text: 'Подробнее', href: best.href },
      };
    }
    return null;
  }

  function findAnswer(query) {
    const words = tokenize(query);
    if (!words.length) return null;

    const knowledge = [...STATIC_KNOWLEDGE, ...buildFaqKnowledge()];
    let best = null;
    let bestScore = 0;

    knowledge.forEach((entry) => {
      const score = scoreEntry(entry, words, query);
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    });

    if (bestScore >= 2 && best) return best;

    if (!hasDomainKeyword(words, query)) {
      return offTopicResponse();
    }

    const fromSite = searchSiteChunks(words, query);
    if (fromSite) return fromSite;

    if (bestScore >= 1 && best) return best;

    return offTopicResponse();
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function scrollChat() {
    const body = $('.assistant-panel__body');
    if (body) body.scrollTop = body.scrollHeight;
  }

  function appendMessage(container, text, role, link, options = {}) {
    const msg = document.createElement('div');
    msg.className = `assistant__msg assistant__msg--${role}`;

    let html = `<p>${escapeHtml(text).replace(/\n/g, '<br>')}</p>`;
    if (link) {
      const attrs = link.external ? ' target="_blank" rel="noopener"' : '';
      const btnClass = options.cta || link.cta ? 'assistant__cta-btn' : 'assistant__link';
      const suffix = btnClass === 'assistant__link' ? ' →' : '';
      html += `<a href="${escapeHtml(link.href)}" class="${btnClass}"${attrs}>${escapeHtml(link.text)}${suffix}</a>`;
    }
    msg.innerHTML = html;
    container.appendChild(msg);
    scrollChat();
  }

  function askQuestion(text, messages, input, sendBtn) {
    const trimmed = text.trim();
    if (!trimmed) return;

    appendMessage(messages, trimmed, 'user');
    if (input) input.value = '';
    if (sendBtn) sendBtn.disabled = true;

    const typing = document.createElement('div');
    typing.className = 'assistant__msg assistant__msg--bot assistant__msg--typing';
    typing.innerHTML =
      '<span class="assistant__dots" aria-label="Печатает"><span></span><span></span><span></span></span>';
    messages.appendChild(typing);
    scrollChat();

    window.setTimeout(() => {
      typing.remove();
      const result = findAnswer(trimmed);
      appendMessage(messages, result.answer, 'bot', result.link, { cta: result.cta });
      if (sendBtn) sendBtn.disabled = false;
      input?.focus();
    }, 550 + Math.random() * 350);
  }

  function init() {
    siteChunks = buildSiteChunks();

    const panel = $('#assistantPanel');
    const toggle = $('#assistantToggle');
    const closeBtn = $('#assistantClose');
    const form = $('#assistantForm');
    const input = $('#assistantInput');
    const sendBtn = $('#assistantSend');
    const messages = $('#assistantMessages');
    const quick = $('#assistantQuick');

    if (!panel || !toggle || !form || !input || !messages) return;

    QUICK_QUESTIONS.forEach((q) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'assistant__chip';
      btn.textContent = q;
      btn.addEventListener('click', () => askQuestion(q, messages, input, sendBtn));
      quick?.appendChild(btn);
    });

    const setOpen = (open) => {
      document.body.classList.toggle('assistant-open', open);
      if (open) {
        panel.hidden = false;
        panel.setAttribute('aria-hidden', 'false');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.classList.add('is-active');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => panel.classList.add('is-open'));
        });
        input.focus();
      } else {
        panel.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        panel.setAttribute('aria-hidden', 'true');
        const onEnd = (e) => {
          if (e.target !== panel || e.propertyName !== 'opacity') return;
          panel.hidden = true;
          panel.removeEventListener('transitionend', onEnd);
        };
        panel.addEventListener('transitionend', onEnd);
      }
    };

    toggle.addEventListener('click', () => setOpen(!panel.classList.contains('is-open')));
    closeBtn?.addEventListener('click', () => setOpen(false));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) setOpen(false);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      askQuestion(input.value, messages, input, sendBtn);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
