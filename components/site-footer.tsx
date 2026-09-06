export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-6 py-8 sm:flex-row sm:items-center">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Alex Rivera
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          Designed &amp; built with care
        </p>
      </div>
    </footer>
  )
}
