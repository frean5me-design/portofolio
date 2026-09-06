const socials = [
  { label: 'Email', href: 'mailto:hello@alexrivera.design' },
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Twitter', href: 'https://twitter.com' },
]

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24 md:py-36">
      <p className="font-mono text-sm text-accent">Contact</p>
      <h2 className="mt-6 max-w-2xl text-balance text-3xl font-medium leading-tight tracking-tight md:text-5xl">
        Have a project in mind? Let&apos;s build it together.
      </h2>
      <a
        href="mailto:hello@alexrivera.design"
        className="mt-8 inline-block text-lg font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
      >
        hello@alexrivera.design
      </a>

      <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
        {socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {social.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
