import { Grid } from "@mui/material";
import * as React from "react";
import Dashboard from "../src/components/Dashboard";
import Information from "../src/components/Information";
import styles from '@/styles/IndexPage.module.css'

export default function Index() {
  return (
    <Grid container className={styles.container}>
      <Grid item xs={8}>
        <Dashboard />
      </Grid>
      <Grid item xs={4}>
        <Information />
      </Grid>
    </Grid>
  );
}
