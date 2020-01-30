export default {
  secure: false,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com>',
  },
};

/**
 * Plataformas de envio de email produção:
 * Amazon SES
 * Mailgun
 * Sparkpost
 * Maindril (Mailchimp)
 *
 * Dev:
 * Maintrap
 */
