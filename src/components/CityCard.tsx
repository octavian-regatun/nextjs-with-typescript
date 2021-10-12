import { Typography } from "@mui/material";
import React from "react";
import styles from "@/styles/CityCard.module.css";

interface Props {
  photoSrc: string;
  city: string;
  country: string;
}

export default function CityCard({ photoSrc, city, country }: Props) {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={photoSrc} />
      <Typography className={styles.text} variant="body1">
        <b>
          {city}, {country}
        </b>
      </Typography>
    </div>
  );
}
