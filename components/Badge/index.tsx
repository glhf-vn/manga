export default function Badge({ children, ...props }) {
  return (
    <span
      className={`m-2 rounded-lg bg-zinc-200 py-0.5 px-1.5 text-xs ${props.className}`}
    >
      {children}
    </span>
  );
}
