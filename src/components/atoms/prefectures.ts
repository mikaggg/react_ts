export interface pref {
  value: string;
  label: string;
}

const prefectures: pref[] = [
  { value: "hookaido", label: "北海道" },
  { value: "aomori", label: "青森" },
  { value: "iwate", label: "岩手" },
  { value: "miyagi", label: "宮城" },
  { value: "akita", label: "秋田" },
  { value: "yamagata", label: "山形" },
  { value: "fukushima", label: "福島" },
  { value: "ibaraki", label: "茨城" },
  { value: "tochigi", label: "栃木" },
  { value: "gunma", label: "群馬" },
  { value: "saitama", label: "埼玉" },
  { value: "chiba", label: "千葉" },
  { value: "tokyo", label: "東京" },
  { value: "kanagawa", label: "神奈川" },
  { value: "niigata", label: "新潟" },
  { value: "toyama", label: "富山" },
  { value: "ishikawa", label: "石川" },
  { value: "fukui", label: "福井" },
  { value: "yamanashi", label: "山梨" },
  { value: "nagano", label: "長野" },
  { value: "gifu", label: "岐阜" },
  { value: "shizuoka", label: "静岡" },
  { value: "aichi", label: "愛知" },
  { value: "mie", label: "三重" },
  { value: "shiga", label: "滋賀" },
  { value: "kyoto", label: "京都" },
  { value: "oosaka", label: "大阪" },
  { value: "hyogo", label: "兵庫" },
  { value: "nara", label: "奈良" },
  { value: "wakayama", label: "和歌山" },
  { value: "tottori", label: "鳥取" },
  { value: "shimane", label: "島根" },
  { value: "okayama", label: "岡山" },
  { value: "hiroshima", label: "広島" },
  { value: "yamaguchi", label: "山口" },
  { value: "tokushima", label: "徳島" },
  { value: "kagawa", label: "香川" },
  { value: "ehime", label: "愛媛" },
  { value: "kochi", label: "高知" },
  { value: "fukuoka", label: "福岡" },
  { value: "saga", label: "佐賀" },
  { value: "nagasaki", label: "長崎" },
  { value: "kumamoto", label: "熊本" },
  { value: "ooita", label: "大分" },
  { value: "miyazaki", label: "宮崎" },
  { value: "kagoshima", label: "鹿児島" },
  { value: "okinawa", label: "沖縄" },
];

interface category {
  value: string;
  label: string;
}

export const categorys: category[] = [
  { value: "onlineService", label: "オンラインサービス" },
  { value: "design", label: "デザイン・デザイン会社" },
  { value: "construction", label: "建設・不動産" },
  { value: "fashion", label: "ファッション" },
  { value: "beauty", label: "ビューティー" },
  { value: "life", label: "生活・旅行・交通・ホテル" },
  { value: "medical", label: "医療" },
  { value: "food", label: "飲食関連・食品" },
  { value: "portal", label: "ポータブル・ブログ" },
  { value: "game", label: "ゲーム・音楽" },
  { value: "enterprise", label: "企業・法人・コーポレートサイト" },
];

export default prefectures;
