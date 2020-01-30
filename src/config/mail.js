export default {
  secure: false,
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'cd722acb1fcc95',
    pass: '975e6cbd32b0d8',
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
