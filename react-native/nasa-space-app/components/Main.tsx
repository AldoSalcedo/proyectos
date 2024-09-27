import { Screen } from "./Screen";
import { TodaysImage } from "./TodaysImage";

import fetchApi from "../lib/nasa";
import { useEffect, useState } from "react";
import { PostImage } from "../types";
import { format, sub } from "date-fns";
import { LastFiveDAysImages } from "./LastFiveDaysImages";
import { ScrollView } from "react-native";

export function Main() {
  const [todaysImage, setTodaysImage] = useState<PostImage>({});
  const [lastFiveDAysImages, setLastFiveDAysImages] = useState<PostImage[]>([]);

  useEffect(() => {
    const loadTodaysImage = async () => {
      try {
        const todaysImageResponse = await fetchApi();
        setTodaysImage(todaysImageResponse);
      } catch (error) {
        console.error(error);
        setTodaysImage({});
      }
    };

    const loadLast5DaysImages = async () => {
      try {
        const date = new Date();
        const todaysDate = format(date, "yyyy-MM-dd");
        const fiveDaysAgoDate = format(sub(date, { days: 5 }), "yyyy-MM-dd");

        const lastFiveDatsImagesResponse = await fetchApi(
          `&start_date=${fiveDaysAgoDate}&end_date=${todaysDate}`,
        );

        setLastFiveDAysImages(lastFiveDatsImagesResponse);
      } catch (error) {
        console.error(error);
      }
    };

    loadTodaysImage().catch(null);
    loadLast5DaysImages().catch(null);
  }, []);

  return (
    <Screen>
      <ScrollView>
        <TodaysImage {...todaysImage} />
        <LastFiveDAysImages postImages={lastFiveDAysImages} />
      </ScrollView>
    </Screen>
  );
}
