import axios from "axios";
import publicIp from "public-ip";
import LatLon from "../interfaces/latLon";

export async function getCurrentLocationByIp(): Promise<LatLon> {
  try {
    const ip = await publicIp.v4();

    console.log(ip);

    const { data } = await axios.get<LatLon>(
      `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/currentLocation/${ip}`,
      {
        params: {
          fields: "lat,lon",
        },
      }
    );

    console.log(data);

    return data;
  } catch (e) {
    console.log(e);

    return {
      lat: null,
      lon: null,
    };
  }
}
