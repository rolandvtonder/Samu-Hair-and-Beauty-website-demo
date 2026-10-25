/*
  The wordmark. No logo file was supplied, so this sets the name in the
  display serif with the brand magenta. When the logo arrives, drop it in
  public/assets/logo.png and return an <img> here; every placement on the
  page goes through this component.
*/

export default function Logo({ scale = 1 }: { scale?: number }) {
  return (
    <span role="img" aria-label="Samu's Hair & Beauty" style={{ display: 'inline-flex', flexDirection: 'column', lineHeight: 1 }}>
      <span
        aria-hidden="true"
        className="font-display"
        style={{ fontSize: 26 * scale, fontStyle: 'italic', fontWeight: 600, letterSpacing: '-0.01em', color: '#fff' }}
      >
        Samu<span style={{ color: 'var(--color-magenta)' }}>’</span>s
      </span>
      <span aria-hidden="true" className="label" style={{ fontSize: 9 * scale, marginTop: 4 * scale, color: 'rgba(255,255,255,0.7)' }}>
        Hair &amp; Beauty
      </span>
    </span>
  )
}
