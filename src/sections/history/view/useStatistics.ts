import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';

import clientApi from 'src/utils/api/base-api';

export type GeneralStatistics = {
  temperature: number;
  humidity: number;
  nitrogen: number;
  waterLevel: number;
  phosphorus: number;
  potassium: number;
};

export type GroupedAverage = {
  day: string;
  avgTemperature: number;
  avgHumidity: number;
  avgWaterLevel: number;
  avgN: number;
  avgP: number;
  avgK: number;
};

type StatisticsResponse = {
  startDate: string;
  endDate: string;
  generalStatistics: GeneralStatistics;
  groupedAverage: GroupedAverage[];
};

const getStatisticsAsync = async (days: string) => {
  let url = `/statistics`;
  if (days) {
    url += `?days=${days}`;
  }
  const response = await clientApi.get<StatisticsResponse>(url);
  response.data.groupedAverage = normalizeStatistics(response.data.groupedAverage);
  return response.data;
};

const normalizeStatistics = (data: GroupedAverage[]) =>
  data.map((d) => {
    d.day = dayjs(d.day).format('MMM D, YYYY');
    return d;
  });

export const useStatistics = (days: string) => {
  const { data, isLoading } = useQuery([days], () => getStatisticsAsync(days));
  return { data, isLoading };
};
