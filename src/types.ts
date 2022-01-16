// 都道府県名と都道府県コード
type PrefInfo = {
  prefName: string;
  prefCode: number;
};

type Point = [number, number];

// EChartsに渡す1系列あたりのデータ
type LineData = {
  name: string; // 凡例用の名前
  data: Point[]; // データ
  type: string; // "line"
};

export { PrefInfo, Point, LineData };
