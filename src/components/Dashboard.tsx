import styles from "@/styles/Dashboard.module.css";
import { Typography } from "@mui/material";
import React from "react";
import CityCards from "./CityCards";
import Search from "./Search";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <Search className={styles.search} />
      <Typography className={styles.title} variant="h2" align="left">
        Prognoză <b>Meteo</b>
      </Typography>

      <CityCards />
    </div>
  );
}
