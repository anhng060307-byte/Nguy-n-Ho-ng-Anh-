import { WorldDefinition } from '../types';

export const WORLDS: WorldDefinition[] = [
  {
    id: 1,
    worldNumber: 1,
    title: 'Khởi Nghĩa Tiền Đề',
    subtitle: 'Các Tỉnh Giành Chính Quyền Sớm Nhất',
    location: 'Bắc Giang - Hải Dương - Hà Tĩnh - Quảng Nam',
    timePeriod: '14/08 – 18/08/1945',
    description:
      'Ánh bình minh đầu tiên của cuộc Tổng khởi nghĩa rực sáng trên các đồn điền, bờ ruộng và làng quê Việt Nam. Hãy cùng Mèo Mũ Cối vượt qua các trạm canh gác đêm và đồn địch để cắm lá cờ đỏ sao vàng đầu tiên!',
    theme: {
      skyGradient: ['#ff8c00', '#ffe4b5'], // Sunrise orange & warm morning light
      groundColor: '#4a7c59',              // Green paddy dike
      brickColor: '#8b5a2b',               // Packed soil / wooden crate brown
      accentColor: '#da251d',              // Revolutionary Red
      bgElements: ['bamboo', 'sun', 'fortress_wall'],
    },
    targetScore: 1000,
    targetFlags: 5,
  },
  {
    id: 2,
    worldNumber: 2,
    title: 'Cơn Bão Tại Thủ Đô',
    subtitle: 'Đấu Tranh Giành Chính Quyền Ở Hà Nội',
    location: 'Hà Nội (Phố cổ, Nhà hát Lớn, Phủ Khâm sai)',
    timePeriod: '19/08/1945',
    description:
      'Không khí rực lửa tại Thủ đô Hà Nội! Nhân dân rầm rộ xuống đường, cờ đỏ sao vàng rợp bóng khắp góc phố cổ và Nhà hát Lớn. Hãy tiến chiếm các cứ điểm chỉ huy của địch.',
    theme: {
      skyGradient: ['#b22222', '#ffa07a'], // Fiery Red & Amber sunset
      groundColor: '#3a3a3a',              // City pavement
      brickColor: '#a52a2a',               // French red brick walls
      accentColor: '#ffd700',              // Golden Star Yellow
      bgElements: ['hanoi_opera', 'cheering_crowd', 'red_banners'],
    },
    targetScore: 2000,
    targetFlags: 8,
  },
  {
    id: 3,
    worldNumber: 3,
    title: 'Sóng Lừng Trung Bộ',
    subtitle: 'Kinh Thành Huế Sục Sôi Khởi Nghĩa',
    location: 'Kinh Thành Huế, Ngọ Môn & Sông Hương',
    timePeriod: '23/08/1945',
    description:
      'Kinh thành Huế cổ kính sục sôi tinh thần cách mạng. Vượt qua sông Hương và các bức tường thành rêu phong, Mèo Mũ Cối tiến về Ngọ Môn để chuẩn bị cho giờ phút lịch sử Bảo Đại thoái vị.',
    theme: {
      skyGradient: ['#4b0082', '#ff7f50'], // Royal Imperial Purple & Golden Sunset
      groundColor: '#5c5c5c',              // Royal Stone pave
      brickColor: '#4e5d4e',               // Mossy ancient fortress stone
      accentColor: '#ffcc00',              // Imperial Gold
      bgElements: ['ngo_mon_gate', 'perfume_river', 'imperial_roof'],
    },
    targetScore: 2500,
    targetFlags: 10,
  },
  {
    id: 4,
    worldNumber: 4,
    title: 'Nam Bộ Đột Phá',
    subtitle: 'Tổng Khởi Nghĩa Tại Sài Gòn - Gia Định',
    location: 'Sài Gòn (Dinh Đốc Lý / Tòa Thị Chính, các Đại Lộ)',
    timePeriod: '25/08/1945',
    description:
      'Đô thị Sài Gòn sầm uất bước vào cuộc đấu tranh quyết liệt. Xe tăng và lực lượng đồn bốt địch dày đặc. Mèo Mũ Cối dùng Tờ Truyền Đơn Cứu Quốc để đập tan mọi chướng ngại, tiến tới Dinh Đốc Lý!',
    theme: {
      skyGradient: ['#1e3c72', '#2a5298'], // Urban twilight blue & vivid light
      groundColor: '#2f3542',              // Asphalt road
      brickColor: '#b33939',               // French red bricks & iron girders
      accentColor: '#e1b12c',              // Bright Gold
      bgElements: ['saigon_cityhall', 'street_lamps', 'armored_tracks'],
    },
    targetScore: 3000,
    targetFlags: 12,
  },
  {
    id: 5,
    worldNumber: 5,
    title: 'Ngày Độc Lập',
    subtitle: 'Lễ Khai Sinh Nước Việt Nam Dân Chủ Cộng Hòa',
    location: 'Quảng Trường Ba Đình, Hà Nội',
    timePeriod: '02/09/1945',
    description:
      'Ngày 2 tháng 9 năm 1945 - Bác Hồ đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình rợp cờ hoa dưới ánh nắng thu. Thu thập các Ngôi Sao Vàng, Cờ Đỏ và quà mừng để tiến về Lễ đài trong niềm hoan hoan vút trời!',
    theme: {
      skyGradient: ['#00b4db', '#0083b0'], // Bright Autumn Sky Blue
      groundColor: '#2e7d32',              // Ba Dinh green lawn
      brickColor: '#f1c40f',               // Golden ceremonial platforms
      accentColor: '#da251d',              // Victory Red & Yellow Star
      bgElements: ['ba_dinh_rostrum', 'flagpole_vietnam', 'celebratory_balloons'],
    },
    targetScore: 5000,
    targetFlags: 15,
  },
];
