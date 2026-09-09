/* oxlint-disable next/no-img-element -- Images are locally optimized WebP with responsive sources; no runtime image service is needed. */
import { site } from '@/src/data/site';
export function Brand() {
  return site.logo ? (
    <img
      className="brand-image"
      src={site.logo}
      alt="Carcará Lux"
      width="150"
      height="50"
    />
  ) : (
    <span className="brand" aria-label="Carcará Lux">
      <span>
        CARCARÁ<span className="brand-lux">LUX</span>
      </span>
      <small>STEM RACING TEAM</small>
    </span>
  );
}
