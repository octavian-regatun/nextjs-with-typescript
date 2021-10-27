import React, { useEffect } from "react";
import CityCard from "./CityCard";
import styles from "@/styles/CityCards.module.css";
import { useHistoryLocationStore } from "@/lib/store";

let counter = 0;

export default function CityCards() {
  const historyLocations = useHistoryLocationStore(
    state => state.historyLocations,
    (prevState, newState) => prevState.queue !== newState.queue
  );

  const renderHistoryLocations = historyLocations.queue.map(historyLocation => (
    <CityCard
      key={`${historyLocation.id}-${counter++}`}
      photoSrc="https://i.pinimg.com/originals/0a/ee/68/0aee68e5e233cad0c948e3789d08f085.jpg"
      title={historyLocation.title}
    />
  ));

  return <div className={styles.container}>{renderHistoryLocations}</div>;
}
