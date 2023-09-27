const url = process.env.FIREBASE;

import { Event } from "./types";

export async function getEvents() {
  let error: string | null = null;
  let data: Event[] = [];
  const res = await fetch(url + ".json");
  if (!res.ok) {
    error = "Fetching events data failed. Please try again later...";
  } else {
    const resData = await res.json();
    data = transformData(resData);
  }

  return { data, error };
}

export async function getEvent(id: string | string[] | undefined) {
  let error: string | null = null;
  let data = {};
  const res = await fetch(url + "/" + id + ".json");
  if (!res.ok) {
    error = "Something went wrong...";
  } else {
    data = await res.json();
  }
  return { data, error };
}

export async function getFeatured() {
  let error: string | null = null;
  let data: Event[] = [];
  const res = await fetch(url + `.json?orderBy="isFeatured"&equalTo=true`);
  if (!res.ok) {
    error = "Fetching featured events data failed...";
  } else {
    const resData = await res.json();
    data = transformData(resData);
  }

  return { data, error };
}

export async function getSearchedEvents({
  year,
  month,
}: {
  year: number;
  month: number;
}) {
  const { data, error } = await getEvents();
  const filteredData = data.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
  return { filteredData, error };
}

function transformData(resData: Event[]) {
  const data: Event[] = [];
  for (const key in resData) {
    data.push({
      id: key,
      title: resData[key].title,
      description: resData[key].description,
      location: resData[key].location,
      image: resData[key].image,
      isFeatured: resData[key].isFeatured,
      date: resData[key].date,
    });
  }
  return data;
}
