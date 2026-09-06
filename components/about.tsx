const capabilities = [
  'Product Design',
  'Design Systems',
  'Frontend Engineering',
  'Prototyping',
  'Brand Identity',
  'Accessibility',
]

export function About() {
  return (
    <section id="about" className="border-y border-border bg-muted/40">
      <div className="mx-auto grid max-w-5xl gap-12 px-6 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-4">
          <h2 className="text-2xl font-medium tracking-tight md:text-3xl">About</h2>
        </div>
        <div className="md:col-span-8">
          <p className="text-pretty text-lg leading-relaxed">
            For the past eight years I&apos;ve worked with startups and studios to ship products
            that people actually enjoy using. I care about the details others skip — the empty
            state, the loading moment, the way a button feels when you press it.
          </p>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            I move fluidly between design and code, which means fewer handoffs and a tighter loop
            from idea to something real. When I&apos;m not at a screen, I&apos;m usually reading,
            running, or taking photos of buildings.
          </p>

          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3">
            {capabilities.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
