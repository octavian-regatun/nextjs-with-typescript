import AutocompleteLocation from "@/interfaces/autocompleteLocation";
import LatLon from "@/interfaces/latLon";
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
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(position => {
              const location: LatLon = {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              };

              setCurrentLocation(location);
            });
            //If granted then you can directly call your function here
            // } else if (result.state === "prompt") {
            //   console.log(result.state);
            // } else if (result.state === "denied") {
            //   //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }
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
