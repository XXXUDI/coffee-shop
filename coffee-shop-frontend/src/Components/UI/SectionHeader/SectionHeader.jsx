import styles from './styles.module.css';

export default function SectionHeader({ 
  iconSrc, 
  altText, 
  title,
  subTitle 
}) {
  return (
    <div className={styles.sectionHeader}>
            <img
              src={iconSrc}
              alt={altText}
              className={styles.sectionIcon}
            />
            <div className={styles.sectionInfo}>
              <h4>{title}</h4>
              <p>
                {subTitle}
              </p>
            </div>
          </div>
  );
}