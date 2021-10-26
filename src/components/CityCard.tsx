import { Typography } from "@mui/material";
import React from "react";
import styles from "@/styles/CityCard.module.css";

interface Props {
  title: string;
  photoSrc: string;
}

export default function CityCard({ title,photoSrc}: Props) {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={photoSrc} />
      <Typography className={styles.text} variant="body1">
        <b>
          {title}
        </b>
      </Typography>
    </div>
  );
}
