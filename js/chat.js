/**
 * Chat — powers the floating chat widget.
 *
 * N8N SETUP
 * ---------
 * This expects an n8n workflow with a Chat Trigger (or Webhook node)
 * that accepts a POST body of:
 *   { "message": "...", "sessionId": "..." }
 * and returns JSON containing the reply in one of these common shapes:
 *   { "output": "..." } | { "text": "..." } | { "reply": "..." } | { "message": "..." }
 * or a plain string body. If your workflow uses a different shape,
 * adjust `extractReplyText()` below.
 *
 * If SITE_CONFIG.n8n.webhookUrl is left as the placeholder, the widget
 * shows a friendly "not connected yet" message instead of pretending
 * to be a working assistant.
 */
(function () {
  const PLACEHOLDER = 'N8N_CHAT_WEBHOOK_URL';
  const sessionId = 'rai-forever-' + Math.random().toString(36).slice(2, 10);

  function isConfigured(url) {
    return !!url && url !== PLACEHOLDER && /^https?:\/\//i.test(url);
  }

  function extractReplyText(data) {
    if (typeof data === 'string') return data;
    if (!data || typeof data !== 'object') return null;
    return data.output || data.text || data.reply || data.message || data.answer || null;
  }

  async function sendToN8n(message) {
    const cfg = window.SITE_CONFIG.n8n;
    const res = await fetch(cfg.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, chatInput: message, sessionId })
    });
    if (!res.ok) throw new Error('Chat request failed: ' + res.status);
    let data;
    try { data = await res.json(); } catch { data = await res.text(); }
    return extractReplyText(data) || "Sorry, I couldn't quite parse that reply.";
  }

  function createChatController({ messagesEl, formEl, inputEl }) {
    const cfg = window.SITE_CONFIG.n8n;
    let welcomed = false;

    function addMessage(text, who) {
      const el = document.createElement('div');
      el.className = `chat-msg ${who}`;
      el.textContent = text;
      messagesEl.appendChild(el);
      messagesEl.scrollTop = messagesEl.scrollHeight;
      return el;
    }

    function welcome() {
      if (welcomed) return;
      welcomed = true;
      if (!isConfigured(cfg.webhookUrl)) {
        addMessage(
          "The chat assistant isn't connected yet — add your N8N webhook URL in js/config.js (SITE_CONFIG.n8n.webhookUrl) to bring it to life.",
          'bot'
        );
      } else if (cfg.welcomeMessage) {
        addMessage(cfg.welcomeMessage, 'bot');
      }
    }

    async function handleSubmit(e) {
      e.preventDefault();
      const text = inputEl.value.trim();
      if (!text) return;
      addMessage(text, 'user');
      inputEl.value = '';
      inputEl.focus();

      if (!isConfigured(cfg.webhookUrl)) {
        addMessage(
          "This is just a preview reply — connect your N8N webhook in js/config.js to get real answers.",
          'bot'
        );
        return;
      }

      const typingEl = addMessage('…', 'bot');
      try {
        const reply = await sendToN8n(text);
        typingEl.textContent = reply;
      } catch (err) {
        typingEl.textContent = "I couldn't reach the assistant just now — please try again shortly.";
      }
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    formEl.addEventListener('submit', handleSubmit);

    return { welcome };
  }

  document.addEventListener('DOMContentLoaded', () => {
    const widgetInput = document.getElementById('chat-widget-input');
    if (window.SITE_CONFIG?.n8n?.inputPlaceholder && widgetInput) {
      widgetInput.placeholder = window.SITE_CONFIG.n8n.inputPlaceholder;
    }

    // Floating widget
    const widgetController = createChatController({
      messagesEl: document.getElementById('chat-widget-messages'),
      formEl: document.getElementById('chat-widget-form'),
      inputEl: widgetInput
    });

    // Floating widget open/close
    const fab = document.getElementById('chat-fab');
    const widget = document.getElementById('chat-widget');
    const widgetClose = document.getElementById('chat-widget-close');

    function openWidget() {
      widget.hidden = false;
      fab.setAttribute('aria-expanded', 'true');
      widgetController.welcome();
      document.getElementById('chat-widget-input')?.focus();
    }
    function closeWidget() {
      widget.hidden = true;
      fab.setAttribute('aria-expanded', 'false');
      fab.focus();
    }

    fab?.addEventListener('click', () => {
      widget.hidden ? openWidget() : closeWidget();
    });
    widgetClose?.addEventListener('click', closeWidget);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !widget.hidden) closeWidget();
    });
  });
})();
