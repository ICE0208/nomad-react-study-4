import styles from "./BuyButton.module.scss";

interface BuyButtonProps {
  href: string;
}

export default function BuyButton({ href }: BuyButtonProps) {
  return (
    <a
      href={href}
      className={styles.container}
      target="_blank"
    >
      Buy now &rarr;
    </a>
  );
}
