import React from "react";
import CityCard from "./CityCard";
import styles from "@/styles/CityCards.module.css";

export default function CityCards() {
  return (
    <div className={styles.container}>
      <CityCard
        photoSrc="https://i.pinimg.com/originals/0a/ee/68/0aee68e5e233cad0c948e3789d08f085.jpg"
        city="Paris"
        country="France"
      />
      <CityCard
        photoSrc="https://i.pinimg.com/originals/0a/ee/68/0aee68e5e233cad0c948e3789d08f085.jpg"
        city="Paris"
        country="France"
      />
      <CityCard
        photoSrc="https://i.pinimg.com/originals/0a/ee/68/0aee68e5e233cad0c948e3789d08f085.jpg"
        city="Paris"
        country="France"
      />
      <CityCard
        photoSrc="https://i.pinimg.com/originals/0a/ee/68/0aee68e5e233cad0c948e3789d08f085.jpg"
        city="Paris"
        country="France"
      />
      <CityCard
        photoSrc="https://i.pinimg.com/originals/0a/ee/68/0aee68e5e233cad0c948e3789d08f085.jpg"
        city="Paris"
        country="France"
      />
    </div>
  );
}
