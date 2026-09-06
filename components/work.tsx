import Image from 'next/image'

const projects = [
  {
    title: 'Ledger',
    category: 'Product Design · iOS',
    year: '2025',
    description:
      'A personal finance app that turns spending data into calm, glanceable insights.',
    image: '/work/finance-app.png',
  },
  {
    title: 'Field Notes',
    category: 'Web · Editorial',
    year: '2024',
    description:
      'A typography-first publishing platform for long-form writing and research.',
    image: '/work/editorial-site.png',
  },
  {
    title: 'Northwind',
    category: 'Brand · Identity',
    year: '2024',
    description:
      'A complete identity system for a climate-tech studio, from logo to guidelines.',
    image: '/work/brand-system.png',
  },
]

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-5xl px-6 py-20 md:py-28">
      <div className="flex items-end justify-between border-b border-border pb-6">
        <h2 className="text-2xl font-medium tracking-tight md:text-3xl">Selected work</h2>
        <span className="font-mono text-sm text-muted-foreground">2024—25</span>
      </div>

      <div className="mt-12 flex flex-col gap-16 md:gap-24">
        {projects.map((project, i) => (
          <article key={project.title} className="group grid gap-8 md:grid-cols-12 md:items-center">
            <div
              className={`overflow-hidden rounded-xl border border-border bg-card md:col-span-7 ${
                i % 2 === 1 ? 'md:order-2' : ''
              }`}
            >
              <Image
                src={project.image || '/placeholder.svg'}
                alt={`${project.title} project preview`}
                width={1200}
                height={800}
                className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div className={`md:col-span-5 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
              <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                <span>{project.category}</span>
                <span aria-hidden>·</span>
                <span>{project.year}</span>
              </div>
              <h3 className="mt-3 text-xl font-medium tracking-tight md:text-2xl">
                {project.title}
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <a
                href="#contact"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-opacity hover:opacity-80"
              >
                View case study
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
