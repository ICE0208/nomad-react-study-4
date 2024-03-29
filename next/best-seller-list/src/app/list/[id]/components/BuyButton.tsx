import styles from "./BuyButton.module.scss";

interface BuyButtonProps {
  href: string;
  disabled?: boolean;
}

export default function BuyButton({ href, disabled = false }: BuyButtonProps) {
  return (
    <a
      href={href}
      className={styles.container}
      target="_blank"
      style={disabled ? { pointerEvents: "none" } : {}}
    >
      Buy now &rarr;
    </a>
  );
}
