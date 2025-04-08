import { useState, useEffect, useCallback } from 'react';

import { fTime } from 'src/utils/format-time';

export type SensorData = {
  date: string;
  temperature: number;
  humidity: number;
  water_level: number;
  N: number;
  P: number;
  K: number;
  fan_off: number;
  fan_on: number;
  water_plant_off: number;
  water_plant_on: number;
  water_pump_off: number;
  water_pump_on: number;
};

export const useSensorDataWS = () => {
  const [data, setData] = useState<SensorData | null>(null);
  const [statistics, setStatistics] = useState<SensorData[]>([]);

  const insertNewData = useCallback(
    (d: SensorData) => {
      if (statistics.length > 9) {
        setStatistics((prev) => {
          prev.shift();
          prev.push(d);
          return prev;
        });
      } else {
        setStatistics((prev) => {
          prev.push(d);
          return prev;
        });
      }
    },
    [statistics.length]
  );

  const getTemperatureValues = () => statistics.map((s) => s.temperature);
  const getHumidityValues = () => statistics.map((s) => s.humidity);
  const getCategories: () => string[] = () => statistics.map((s) => fTime(s.date) || '');

  useEffect(() => {
    const ws = new WebSocket('ws://127.0.0.1:8080/live');

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const parsed: SensorData = JSON.parse(event.data);
      setData(parsed);
      insertNewData(parsed);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.onerror = (err) => {
      console.log('WebSocket error:', err);
    };

    return () => {
      ws.close();
    };
  }, [insertNewData]);

  return { state: { data }, actions: { getTemperatureValues, getHumidityValues, getCategories } };
};
