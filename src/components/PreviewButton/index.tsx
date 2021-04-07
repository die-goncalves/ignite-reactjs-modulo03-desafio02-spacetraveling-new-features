import Link from "next/link";
import React from "react";

import styles from "./previewButton.module.scss";

export default function PreviewButton() {
    return (
        <Link href="/api/exit-preview">
            <a className={styles.linkButton}>
                <p>Sair do modo preview</p>
            </a>
        </Link>
    )
}