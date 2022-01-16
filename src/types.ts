type PrefInfo = {
  prefName: string;
  prefCode: number;
};

type Point = {
  x: number;
  y: number;
};

type LineData = {
  label: string | null;
  data: Point[];
};

type LoadingStatus = "LOADING" | "SUCCESS" | null;

export { PrefInfo, Point, LineData, LoadingStatus };
