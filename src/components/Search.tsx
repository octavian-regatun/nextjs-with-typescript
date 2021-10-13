import AutocompleteLocation from "@/interfaces/autocompleteLocation";
import LatLon from "@/interfaces/latLon";
import { getCurrentLocationByIp } from "@/lib/currentLocation";
import { useCurrentLocationStore, useHistoryLocationStore } from "@/lib/store";
import styles from "@/styles/Search.module.css";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import shallow from "zustand/shallow";

interface Props {
  className: string;
}

export default function Search({ className }: Props) {
  const { currentLocation, setCurrentLocation } = useCurrentLocationStore(
    state => ({
      currentLocation: state.currentLocation,
      setCurrentLocation: state.setCurrentLocation,
    }),
    shallow
  );
  const addHistoryLocation = useHistoryLocationStore(
    state => state.addHistoryLocation
  );
  const [textFieldValue, setTextFieldValue] = useState("");
  const [options, setOptions] = useState<AutocompleteLocation[]>([]);

  useEffect(() => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(async function (result) {
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(position => {
            const location: LatLon = {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            };

            setCurrentLocation(location);

            console.log("granted");
          });
        } else if (result.state === "prompt") {
          const currentLocation = await getCurrentLocationByIp();

          setCurrentLocation(currentLocation);
        } else if (result.state === "denied") {
          const currentLocation = await getCurrentLocationByIp();

          setCurrentLocation(currentLocation);
        }
      });
  }, []);

  return (
    <div className={className}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        getOptionLabel={option => option.title}
        sx={{ width: 300 }}
        clearOnBlur={false}
        renderInput={params => (
          <TextField
            {...params}
            className={styles.search}
            fullWidth
            variant="outlined"
            label="🔎 Search place"
            value={textFieldValue}
            onChange={async event => {
              setTextFieldValue(event.target.value);

              const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/autocomplete`,
                {
                  params: {
                    q: event.target.value,
                    lat: currentLocation.lat,
                    lon: currentLocation.lon,
                  },
                }
              );

              setOptions(data);
            }}
          />
        )}
        onChange={(event, value) => {
          if (value) {
            addHistoryLocation(value);
          }
        }}
      />
    </div>
  );
}
