export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pt-20 pb-24 md:pt-32 md:pb-32">
      <p className="animate-fade-up font-mono text-sm text-accent" style={{ animationDelay: '0ms' }}>
        Designer &amp; Developer
      </p>
      <h1
        className="animate-fade-up mt-6 max-w-3xl text-balance text-4xl font-medium leading-tight tracking-tight md:text-6xl md:leading-[1.05]"
        style={{ animationDelay: '80ms' }}
      >
        I design and build clear, considered digital products.
      </h1>
      <p
        className="animate-fade-up mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
        style={{ animationDelay: '160ms' }}
      >
        {
          "I'm Alex, a multidisciplinary maker focused on the intersection of design and engineering — turning complex problems into interfaces that feel simple."
        }
      </p>
      <div
        className="animate-fade-up mt-10 flex flex-wrap items-center gap-4"
        style={{ animationDelay: '240ms' }}
      >
        <a
          href="#work"
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          View selected work
        </a>
        <a
          href="#contact"
          className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
        >
          Get in touch
        </a>
      </div>
    </section>
  )
}
