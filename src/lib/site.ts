export function normaliseBasePath(value: string = ''): string {
  const path = value.trim().replace(/\/$/, '');
  if (path && (!/^\/[a-zA-Z0-9_/-]+$/.test(path) || path.includes('//') || path.includes('..'))) {
    throw new Error('Base path must be empty or a URL path such as /preview');
  }
  return path;
}

export function normaliseOrigin(value: string): string {
  const url = new URL(value);
  if (
    !['http:', 'https:'].includes(url.protocol) ||
    url.pathname !== '/' ||
    url.search ||
    url.hash ||
    url.username ||
    url.password
  ) {
    throw new Error(
      'Site URL must be an HTTP(S) origin, without path, credentials, query or fragment',
    );
  }
  return url.origin;
}

export const site = {
  name: 'Merit Way',
  company: 'Media Street S.A.R.L.',
  email: 'mediastreet.sarl@gmail.com',
  origin: normaliseOrigin(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  basePath: normaliseBasePath(process.env.NEXT_PUBLIC_BASE_PATH),
};

export function publicPath(path: string): string {
  return `${site.basePath}/${path.replace(/^\//, '')}`;
}

export function absoluteUrl(path: string): string {
  return `${site.origin}${publicPath(path)}`;
}

export function contactHref(subject = 'Merit Way enquiry'): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
}
