import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { Work } from '@/components/work'
import { About } from '@/components/about'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <main>
      <SiteNav />
      <Hero />
      <Work />
      <About />
      <Contact />
      <SiteFooter />
    </main>
  )
}
