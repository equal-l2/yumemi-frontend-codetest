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

type LoadingState = "LOADING" | "SUCCESS" | null;

export { PrefInfo, Point, LineData, LoadingState };
