// /api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'METHOD_NOT_ALLOWED' });
  }

  try {
    const { name, email, company, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'INVALID_PAYLOAD' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.ionos.fr',
      port: Number(process.env.EMAIL_PORT || 465),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });


    // dentro de /api/contact.js, antes de createTransport:
    console.log('[SMTP]', {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    // NÃO logue a senha inteira em produção
    passLen: process.env.EMAIL_PASS ? String(process.env.EMAIL_PASS).length : 0,
    });


    await transporter.sendMail({
      from: `"GMV Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: `${name} <${email}>`,
      subject: `Contato do site - ${name}${company ? ` (${company})` : ''}`,
      text: `Nome: ${name}\nEmail: ${email}\nEmpresa: ${company || '-'}\n\nMensagem:\n${message}`,
      html: `
        <h2>Novo contato do site</h2>
        <p><b>Nome:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Empresa:</b> ${company || '-'}</p>
        <p><b>Mensagem:</b><br/>${String(message).replace(/\n/g, '<br/>')}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Email send error:', e);
    return res.status(500).json({ ok: false, error: 'SERVER_ERROR' });
  }
}
