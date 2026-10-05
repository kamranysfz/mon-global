import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Every route prerenders to static HTML — there are no route handlers, no
  // middleware, no server actions and no next/image. So we ship plain files
  // instead of a Node runtime: nothing to run, nothing to bill, and GitHub
  // Pages serves it from the edge.
  //
  // This closes off, until it is removed: API routes, middleware, server
  // actions, ISR and next/image optimisation. The first of those we are likely
  // to want is a contact-form endpoint, which static hosting cannot serve — it
  // would need a form service or a move off Pages. See .github/workflows/deploy.yml.
  output: "export",
  // Emits `/privacy/index.html` rather than `/privacy.html`.
  //
  // Without it the export writes `privacy.html`, and serving that at /privacy
  // needs a host rewrite rule (the Next docs' nginx example does exactly this,
  // and notes it is only needed when trailingSlash is false). GitHub Pages has
  // no rewrites, and an empty `privacy/` directory sits next to `privacy.html`
  // in the export, so which one wins is left to the host.
  //
  // With a real directory index both /privacy and /privacy/ work everywhere —
  // the first via the server's own 301 to add the slash. That matters because
  // this URL goes into a Meta lead form, and a 404 there fails the review.
  trailingSlash: true,
  turbopack: {
    // Pin the workspace root. Without this, Turbopack walks up and finds a
    // stray package-lock.json in the home directory, then treats ~ as the
    // project root — which pulls unrelated files into module resolution.
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
