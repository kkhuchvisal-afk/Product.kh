const Logo = ({ className = "text-[22px] text-neutral-900" }) => (
  <span className={`inline-flex items-center font-black italic leading-none tracking-tight ${className}`}>
    VELOCITY
    <span className="ml-1 inline-block h-[0.8em] w-[0.2em] -skew-x-12 bg-[#ff5a1f]" aria-hidden="true" />
  </span>
);

export default Logo;