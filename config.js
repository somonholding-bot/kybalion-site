// Everything buyer-dictated lives here and stays EMPTY until an approved buyer/network supplies it.
window.SITE_CONFIG = {
  BRAND: 'Kybalion',
  DOMAIN: 'kybalionus.com',
  MODE: 'preview', // 'preview' = nothing is submitted anywhere. 'live' requires ENDPOINT + consent language.
  ENDPOINT: '',
  CONTACT_EMAIL: 'help@kybalionus.com', // e.g. hello@kybalionus.com once the mailbox exists
  CONSENT: { VERSION: '', TEXT: '', BUYER_DISCLOSURE: '', CALL_CONSENT_TEXT: '', SMS_CONSENT_TEXT: '' },
  AUTHORIZED_PARTNERS: [],
  SHOW_APPROVED_PARTNERS: false, // logos/carriers only after a buyer authorizes them in writing
  CALL: { enabled: false, defaultNumber: '', numbers: [] }, // numbers: [{ match:{utm_source:'meta'}, number:'+1...', buyer:'', campaign:'' }]
};
