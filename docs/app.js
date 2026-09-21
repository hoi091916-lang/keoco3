// Standalone Tug of War Trivia Game Engine
// Pure Vanilla JavaScript, zero external framework dependencies

const QUESTIONS_DATABASE = [
  // CẤP ĐỘ: NHANH (Phản xạ, mẹo đời sống thân thuộc)
  {
    id: 'n1',
    question: 'Khi bị bỏng nước sôi nhẹ, thao tác sơ cứu đầu tiên chuẩn nhất là gì?',
    options: [
      'Xả ngay dưới vòi nước mát sạch từ 15-20 phút',
      'Bôi kem đánh răng hoặc mỡ trăn ngay lập tức',
      'Chườm đá lạnh trực tiếp lên vết bỏng',
      'Đắp lòng trắng trứng gà tươi'
    ],
    correctIndex: 0,
    difficulty: 'nhanh',
    category: 'Mẹo Sống & Sơ Cứu',
    explanation: 'Xả nước mát sạch hạ nhiệt mô sâu, tránh tổn thương. Bôi kem đánh răng hay đá trực tiếp có thể gây nhiễm trùng hoặc bỏng lạnh!'
  },
  {
    id: 'n2',
    question: 'Loại vitamin nào được cơ thể tổng hợp chủ yếu khi tiếp xúc với ánh nắng mặt trời buổi sáng?',
    options: ['Vitamin C', 'Vitamin D', 'Vitamin A', 'Vitamin B12'],
    correctIndex: 1,
    difficulty: 'nhanh',
    category: 'Sức Khỏe Đời Sống',
    explanation: 'Tia UVB trong ánh nắng kích thích tiền chất 7-dehydrocholesterol trên da chuyển hóa thành Vitamin D3.'
  },
  {
    id: 'n3',
    question: 'Khi luộc trứng gà lòng đào hoàn hảo, thời gian chuẩn tính từ lúc nước sôi sùng sục là khoảng bao lâu?',
    options: ['2-3 phút', '6-7 phút', '12-14 phút', '20 phút'],
    correctIndex: 1,
    difficulty: 'nhanh',
    category: 'Ẩm Thực Thường Ngày',
    explanation: 'Khoảng 6 đến 7 phút lòng trắng vừa đông mềm mịn và lòng đỏ dẻo sánh thơm ngon!'
  },
  {
    id: 'n4',
    question: 'Bánh mì để qua đêm bị khô cứng, mẹo đơn giản nào giúp mềm thơm trở lại?',
    options: [
      'Vẩy vài giọt nước rồi nướng lại hoặc quay vi sóng kèm cốc nước',
      'Ngâm ngập trong nước lạnh 5 phút rồi phơi nắng',
      'Cho vào ngăn đá tủ lạnh 30 phút rồi ăn liền',
      'Rắc bột mì khô lên mặt bánh'
    ],
    correctIndex: 0,
    difficulty: 'nhanh',
    category: 'Mẹo Bếp Nhanh',
    explanation: 'Hơi ẩm từ vài giọt nước kết hợp nhiệt độ giúp tinh bột hồi hồ, vỏ bánh giòn xốp trở lại!'
  },
  {
    id: 'n5',
    question: 'Khi bị nghẹn hoặc hóc vật lạ đường thở, thủ thuật sơ cứu nổi tiếng thế giới nào được áp dụng?',
    options: ['Thủ thuật Heimlich', 'Hô hấp nhân tạo ngực', 'Cho uống thật nhiều nước', 'Vỗ mạnh vào giữa trán'],
    correctIndex: 0,
    difficulty: 'nhanh',
    category: 'Sơ Cứu Khẩn Cấp',
    explanation: 'Nghiệm pháp Heimlich ép cơ hoành tạo luồng khí đẩy dị vật bật ra khỏi đường thở.'
  },
  {
    id: 'n6',
    question: 'Để khử mùi hôi tanh của cá và nhớt da trước khi kho/nấu, người ta thường dùng gì hiệu quả nhất?',
    options: ['Muối hột kết hợp chanh hoặc rượu trắng', 'Nước đường đặc', 'Bột ớt cay', 'Nước đá lạnh'],
    correctIndex: 0,
    difficulty: 'nhanh',
    category: 'Mẹo Bếp Nhanh',
    explanation: 'Axit trong chanh và cồn hữu cơ trong rượu hòa tan amin gây mùi tanh của cá cực kỳ nhanh!'
  },
  {
    id: 'n7',
    question: 'Cây xương rồng có khả năng chịu hạn đỉnh cao chủ yếu nhờ đặc điểm biến thái nào?',
    options: [
      'Lá biến thành gai để giảm tối đa sự thoát hơi nước',
      'Rễ cây mọc thẳng đứng lên không trung',
      'Thân cây phủ đầy phấn hoa',
      'Chỉ nở hoa vào ban đêm'
    ],
    correctIndex: 0,
    difficulty: 'nhanh',
    category: 'Sinh Học Đời Sống',
    explanation: 'Lá tiêu giảm biến thành gai nhọn giúp cây triệt tiêu diện tích thoát hơi nước dưới nắng gắt.'
  },
  {
    id: 'n8',
    question: 'Khi bị kiến lửa đốt gây ngứa rát dữ dội, thoa chất nào có tính kiềm nhẹ sau đây giúp trung hòa axit formic?',
    options: ['Baking soda pha sệt hoặc xà phòng nhẹ', 'Giấm chua đậm đặc', 'Nước cốt chanh nguyên chất', 'Nước mắm nhỉ'],
    correctIndex: 0,
    difficulty: 'nhanh',
    category: 'Mẹo Sống Thường Thức',
    explanation: 'Nọc kiến chứa axit formic (HCOOH). Xà phòng hoặc muối kiềm baking soda giúp trung hòa tức thì!'
  },

  // CẤP ĐỘ: VỪA (Khoa học thường thức & hiện tượng tự nhiên)
  {
    id: 'v1',
    question: 'Tại sao bầu trời ban ngày lại có màu xanh lam thay vì màu tím hay màu đỏ?',
    options: [
      'Tán xạ Rayleigh: Ánh sáng xanh bước sóng ngắn bị phân tử khí quyển tán xạ mạnh nhất',
      'Do phản chiếu từ màu xanh của các đại dương trên Trái Đất',
      'Do tầng ozone hấp thụ toàn bộ tia hồng ngoại',
      'Do ánh sáng mặt trời phát ra chỉ có màu xanh'
    ],
    correctIndex: 0,
    difficulty: 'vua',
    category: 'Hiện Tượng Tự Nhiên',
    explanation: 'Tán xạ Rayleigh tỷ lệ nghịch với lũy thừa bậc 4 của bước sóng. Bước sóng xanh lam bị tán xạ khắp vòm trời!'
  },
  {
    id: 'v2',
    question: 'Kim tự tháp vĩ đại Giza được xây dựng bằng hàng triệu khối đá dưới triều đại Pharaon nào?',
    options: ['Khufu (Cheops)', 'Tutankhamun', 'Ramses II', 'Cleopatra'],
    correctIndex: 0,
    difficulty: 'vua',
    category: 'Kỳ Quan Lịch Sử',
    explanation: 'Đại kim tự tháp Giza được xây dựng làm lăng mộ cho Pharaon Khufu thuộc Vương triều thứ Tư Ai Cập.'
  },
  {
    id: 'v3',
    question: 'Hiện tượng "ảo ảnh sa mạc" (Fata Morgana/Mirage) khiến người ta thấy vũng nước phía trước thực chất là do:',
    options: [
      'Sự khúc xạ ánh sáng qua các lớp không khí có nhiệt độ chênh lệch lớn',
      'Hơi nước bốc lên từ lòng đất ngưng tụ thành gương phẳng',
      'Hiện tượng thôi miên thị giác của sa mạc',
      'Cát sa mạc phát quang dưới ánh mặt trời'
    ],
    correctIndex: 0,
    difficulty: 'vua',
    category: 'Vật Lý & Tự Nhiên',
    explanation: 'Mặt cát cực nóng làm lớp không khí sát đất loãng hơn, khiến tia sáng bị bẻ cong tạo hình ảnh phản chiếu vòm trời!'
  },
  {
    id: 'v4',
    question: 'Tại sao khi thái hành tây, mắt người thường bị cay xè và chảy nước mắt?',
    options: [
      'Hợp chất chứa lưu huỳnh phản ứng tạo khí Syn-propanethial-S-oxide kích thích tuyến lệ',
      'Bụi từ vỏ hành bay vào kết mạc mắt',
      'Nhiệt độ hành tây làm bay hơi giác mạc',
      'Do mùi hăng làm co thắt thần kinh thính giác'
    ],
    correctIndex: 0,
    difficulty: 'vua',
    category: 'Hóa Học Đời Sống',
    explanation: 'Khi cắt tế bào hành vỡ ra, enzyme alliinase chuyển hóa axit amin chứa lưu huỳnh thành hợp chất bay hơi gây cay mắt!'
  },
  {
    id: 'v5',
    question: 'Hành tinh nào trong Hệ Mặt Trời có một ngày dài hơn một năm của chính nó?',
    options: ['Sao Kim (Venus)', 'Sao Thủy (Mercury)', 'Sao Hỏa (Mars)', 'Sao Mộc (Jupiter)'],
    correctIndex: 0,
    difficulty: 'vua',
    category: 'Vũ Trụ Thiên Văn',
    explanation: 'Sao Kim tự quay quanh trục mất 243 ngày Trái Đất, trong khi quay quanh Mặt Trời chỉ mất 225 ngày Trái Đất!'
  },
  {
    id: 'v6',
    question: 'Bức tranh danh họa Mona Lisa của Leonardo da Vinci hiện đang được trưng bày chính thức tại bảo tàng nào?',
    options: ['Bảo tàng Louvre (Paris, Pháp)', 'Bảo tàng Vatican (Rome)', 'Bảo tàng Prado (Madrid)', 'Metropolitan (New York)'],
    correctIndex: 0,
    difficulty: 'vua',
    category: 'Nghệ Thuật Thế Giới',
    explanation: 'Tuyệt tác Mona Lisa được bảo vệ nghiêm ngặt trong tủ kính chống đạn tại Bảo tàng Louvre, Paris.'
  },

  // CẤP ĐỘ: KHÓ (Khoa học chuyên sâu, lịch sử và văn hóa)
  {
    id: 'k1',
    question: 'Ngọn hải đăng Alexandria - một trong 7 kỳ quan thế giới cổ đại - được xây dựng trên đảo thuộc vùng biển nào?',
    options: ['Biển Địa Trung Hải (Ai Cập)', 'Biển Đỏ', 'Biển Baltic', 'Biển Đen'],
    correctIndex: 0,
    difficulty: 'kho',
    category: 'Kỳ Quan Cổ Đại',
    explanation: 'Ngọn hải đăng nằm trên đảo Pharos ngoài khơi thành phố cảng Alexandria ven Địa Trung Hải.'
  },
  {
    id: 'k2',
    question: 'Hiện tượng "Dịch chuyển đỏ" (Redshift) trong thiên văn học chứng minh điều gì về vũ trụ?',
    options: [
      'Vũ trụ đang liên tục giãn nở và các thiên hà đang chuyển động ra xa nhau',
      'Các ngôi sao đang nguội dần và chuyển thành sao lùn đỏ',
      'Ánh sáng bị bụi không gian lọc hết màu xanh',
      'Mặt Trời đang tiến lại gần Dải Ngân Hà'
    ],
    correctIndex: 0,
    difficulty: 'kho',
    category: 'Vật Lý Thiên Văn',
    explanation: 'Hiệu ứng Doppler ánh sáng: Khi nguồn phát di chuyển ra xa, bước sóng kéo dài lệch về phía đỏ, chứng minh vũ trụ đang giãn nở!'
  },
  {
    id: 'k3',
    question: 'Định luật bảo toàn năng lượng (Định luật 1 Nhiệt động lực học) khẳng định điều gì?',
    options: [
      'Năng lượng không tự nhiên sinh ra hay mất đi, chỉ chuyển hóa từ dạng này sang dạng khác',
      'Nhiệt lượng luôn tự truyền từ vật lạnh sang vật nóng',
      'Mọi hệ cô lập đều có entropy giảm dần theo thời gian',
      'Năng lượng ánh sáng di chuyển nhanh hơn sóng điện từ'
    ],
    correctIndex: 0,
    difficulty: 'kho',
    category: 'Vật Lý Cơ Bản',
    explanation: 'Định luật bảo toàn và chuyển hóa năng lượng là nền tảng tối thượng của toàn bộ khoa học tự nhiên.'
  },
  {
    id: 'k4',
    question: 'Nhà bác học Marie Curie là người phụ nữ đầu tiên và duy nhất trong lịch sử đạt hai giải Nobel ở hai lĩnh vực khoa học nào?',
    options: ['Vật lý và Hóa học', 'Vật lý và Y học', 'Hóa học và Hòa bình', 'Văn học và Sinh học'],
    correctIndex: 0,
    difficulty: 'kho',
    category: 'Lịch Sử Khoa Học',
    explanation: 'Marie Curie nhận Nobel Vật lý năm 1903 (phóng xạ) và Nobel Hóa học năm 1911 (tìm ra Polonium và Radium).'
  },

  // CẤP ĐỘ: CHUYÊN GIA (Đỉnh cao tư duy)
  {
    id: 'cg1',
    question: 'Trong Thuyết tương đối hẹp của Albert Einstein, đại lượng nào sau đây là hằng số bất biến tuyệt đối trong mọi hệ quy chiếu quán tính?',
    options: [
      'Tốc độ ánh sáng trong chân không (c ≈ 300.000 km/s)',
      'Thời gian trôi qua của một hệ chuyển động',
      'Khối lượng quán tính của vật thể',
      'Chiều dài của thước đo dọc theo phương chuyển động'
    ],
    correctIndex: 0,
    difficulty: 'chuyen_gia',
    category: 'Vật Lý Lý Thuyết',
    explanation: 'Tiên đề 2 của Thuyết tương đối hẹp: Tốc độ ánh sáng trong chân không luôn không đổi đối với mọi người quan sát quán tính!'
  },
  {
    id: 'cg2',
    question: 'Thí nghiệm tưởng tượng "Con mèo của Schrödinger" được đưa ra nhằm chỉ trích cách diễn giải nào trong cơ học lượng tử?',
    options: [
      'Cách diễn giải Copenhagen về trạng thái chồng chập lượng tử',
      'Thuyết đa vũ trụ của Hugh Everett',
      'Hiệu ứng quang điện của Hertz',
      'Lực tương tác hạt nhân mạnh của Yukawa'
    ],
    correctIndex: 0,
    difficulty: 'chuyen_gia',
    category: 'Cơ Học Lượng Tử',
    explanation: 'Schrödinger tạo ra nghịch lý con mèo vừa sống vừa chết nhằm chỉ ra sự phi lý khi áp dụng trạng thái chồng chập vi mô lên thế giới vĩ mô.'
  },
  {
    id: 'cg3',
    question: 'Hiện tượng "Vướng víu lượng tử" (Quantum Entanglement) từng bị Einstein gọi hoài nghi bằng cụm từ nổi tiếng nào?',
    options: [
      'Tác động ma quái từ xa (Spooky action at a distance)',
      'Ảo giác toán học không tưởng',
      'Sai lầm ngẫu nhiên của vũ trụ',
      'Hạt bụi ánh sáng trong đêm tối'
    ],
    correctIndex: 0,
    difficulty: 'chuyen_gia',
    category: 'Lượng Tử Đỉnh Cao',
    explanation: 'Einstein không tin hai hạt dù cách nhau nhiều năm ánh sáng vẫn ảnh hưởng tức thời, nên đã gọi mỉa mai là "Spooky action at a distance"!'
  }
];

const DIFFICULTY_CONFIG = {
  nhanh: { label: 'Nhanh (Phản Xạ)', color: 'text-emerald-700' },
  vua: { label: 'Vừa (Thường Thức)', color: 'text-sky-700' },
  kho: { label: 'Khó (Thử Thách)', color: 'text-amber-700' },
  chuyen_gia: { label: 'Chuyên Gia (Đỉnh Cao)', color: 'text-purple-700' },
  progressive: { label: 'Tăng Tiến 10 Câu', color: 'text-rose-700' }
};

// Web Audio Generator
class SoundManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  getContext() {
    if (!this.enabled) return null;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  playWhistle() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(2600, now);
      osc2.frequency.setValueAtTime(2650, now);

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(30, now);
      lfoGain.gain.setValueAtTime(60, now);
      lfo.connect(osc1.frequency);
      lfo.connect(osc2.frequency);
      lfo.start(now);
      lfo.stop(now + 0.45);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.45);
      osc2.stop(now + 0.45);
    } catch {}
  }

  playPullSound() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.25);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch {}
  }

  playCorrect() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.01, now + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.25);
      });
    } catch {}
  }

  playWrong() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.25);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch {}
  }

  playTick() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {}
  }

  playVictory() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const chords = [
        { f: 523.25, t: 0, d: 0.15 },
        { f: 659.25, t: 0.15, d: 0.15 },
        { f: 783.99, t: 0.3, d: 0.2 },
        { f: 1046.5, t: 0.5, d: 0.6 }
      ];
      chords.forEach(({ f, t, d }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + t);
        gain.gain.setValueAtTime(0.01, now + t);
        gain.gain.linearRampToValueAtTime(0.25, now + t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + t);
        osc.stop(now + t + d);
      });
    } catch {}
  }
}


// Game Controller with View Management & Question Management
const STORAGE_KEY = 'tug_of_war_custom_questions';

class TugOfWarApp {
  constructor() {
    this.sound = new SoundManager();
    this.totalRounds = 10;
    this.difficulty = 'progressive';
    this.gameMode = 'pvp';
    this.timePerQuestion = 12;

    // Cumulative Match Timer
    this.matchStartTime = 0;
    this.matchElapsedSeconds = 0;
    this.matchTimerInterval = null;

    // Load custom questions or fallback to database
    this.allQuestions = this.loadQuestions();

    // Match state
    this.currentRoundIndex = 0;
    this.matchQuestions = [];
    this.ropePosition = 0; // -100 to +100
    this.leftScore = 0;
    this.rightScore = 0;

    this.timeLeft = 12;
    this.timerInterval = null;
    this.isEvaluating = false;
    this.isGameOver = false;

    this.leftAnswer = { hasAnswered: false, selectedIndex: null, timeSpentMs: 0, isCorrect: null };
    this.rightAnswer = { hasAnswered: false, selectedIndex: null, timeSpentMs: 0, isCorrect: null };
    this.botTimer = null;
    this.roundStartTime = 0;

    // Active filters in Question Manager
    this.qmgrFilterDifficulty = 'all';
    this.qmgrSearchText = '';

    this.initElements();
    this.attachEvents();
    this.updateMenuStats();
    this.showView('menu'); // Start at Menu as requested
  }

  // --- PERSISTENCE ---
  loadQuestions() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Lỗi đọc câu hỏi từ localStorage, dùng mặc định:', e);
    }
    return [...QUESTIONS_DATABASE];
  }

  saveQuestions() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.allQuestions));
      this.updateMenuStats();
      this.renderQuestionsManager();
    } catch (e) {
      console.error('Lỗi lưu câu hỏi:', e);
    }
  }

  // --- MATCH TIMER & FORMATTING ---
  formatMatchTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  startMatchTimer() {
    this.stopMatchTimer();
    this.matchStartTime = Date.now();
    this.matchElapsedSeconds = 0;
    const display = document.getElementById('match-elapsed-timer-display');
    if (display) display.textContent = '00:00';

    this.matchTimerInterval = setInterval(() => {
      if (this.currentView !== 'game' || this.isGameOver) return;
      this.matchElapsedSeconds = Math.floor((Date.now() - this.matchStartTime) / 1000);
      const timerDisplay = document.getElementById('match-elapsed-timer-display');
      if (timerDisplay) {
        timerDisplay.textContent = this.formatMatchTime(this.matchElapsedSeconds);
      }
    }, 500);
  }

  stopMatchTimer() {
    if (this.matchTimerInterval) {
      clearInterval(this.matchTimerInterval);
      this.matchTimerInterval = null;
    }
  }

  // --- VIEW MANAGEMENT ---
  showView(viewName) {
    this.currentView = viewName;
    document.getElementById('view-menu').classList.toggle('hidden', viewName !== 'menu');
    document.getElementById('view-game').classList.toggle('hidden', viewName !== 'game');
    document.getElementById('view-questions').classList.toggle('hidden', viewName !== 'questions');

    if (viewName === 'menu') {
      this.updateMenuStats();
    } else if (viewName === 'questions') {
      this.renderQuestionsManager();
    }
  }

  updateMenuStats() {
    const badge = document.getElementById('menu-question-count-badge');
    if (badge) {
      badge.textContent = `${this.allQuestions.length} câu hỏi`;
    }
  }

  // --- DOM INITIALIZATION ---
  initElements() {
    this.el = {
      // Views
      viewMenu: document.getElementById('view-menu'),
      viewGame: document.getElementById('view-game'),
      viewQuestions: document.getElementById('view-questions'),

      // Menu
      menuPlayBtn: document.getElementById('menu-btn-play'),
      menuQuestionsBtn: document.getElementById('menu-btn-questions'),
      menuModePvp: document.getElementById('menu-mode-pvp'),
      menuModeBot: document.getElementById('menu-mode-bot'),
      menuDiffSelect: document.getElementById('menu-difficulty-select'),
      menuSoundBtn: document.getElementById('menu-sound-toggle-btn'),
      menuSoundIcon: document.getElementById('menu-sound-icon'),
      menuSoundText: document.getElementById('menu-sound-text'),
      menuGuideBtn: document.getElementById('menu-guide-toggle-btn'),

      // Game Header
      gameBackMenuBtn: document.getElementById('game-btn-back-menu'),
      gameQuestionsBtn: document.getElementById('game-btn-questions'),
      quickModePvpBtn: document.getElementById('quick-mode-pvp-btn'),
      quickModeBotBtn: document.getElementById('quick-mode-bot-btn'),
      soundBtn: document.getElementById('sound-toggle-btn'),
      guideBtn: document.getElementById('guide-toggle-btn'),
      guideBar: document.getElementById('guide-bar'),
      restartBtn: document.getElementById('restart-match-btn'),
      settingsBtn: document.getElementById('open-settings-btn'),

      // Arena
      leftScore: document.getElementById('left-score-display'),
      rightScore: document.getElementById('right-score-display'),
      rightTeamTitle: document.getElementById('right-team-title'),
      roundDisplay: document.getElementById('round-display'),
      timerDisplay: document.getElementById('timer-display'),
      meterText: document.getElementById('meter-text'),
      meterPointer: document.getElementById('meter-pointer'),
      ropeRig: document.getElementById('rope-rig'),
      evalBanner: document.getElementById('evaluation-banner'),

      // Left Station
      leftQuestionText: document.getElementById('left-question-text'),
      leftCategory: document.getElementById('left-q-category'),
      leftDiff: document.getElementById('left-q-diff'),
      leftAnsweredPill: document.getElementById('left-answered-pill'),
      leftOptBtns: document.querySelectorAll('.opt-btn-left'),

      // Right Station
      rightPanelTitle: document.getElementById('right-panel-title'),
      rightQuestionText: document.getElementById('right-question-text'),
      rightCategory: document.getElementById('right-q-category'),
      rightDiff: document.getElementById('right-q-diff'),
      rightAnsweredPill: document.getElementById('right-answered-pill'),
      rightOptBtns: document.querySelectorAll('.opt-btn-right'),

      // Modals
      settingsModal: document.getElementById('settings-modal'),
      saveSettingsBtn: document.getElementById('save-settings-btn'),
      cancelSettingsBtn: document.getElementById('cancel-settings-btn'),
      modePvpBtn: document.getElementById('mode-pvp-btn'),
      modeBotBtn: document.getElementById('mode-bot-btn'),
      diffSelect: document.getElementById('diff-select'),
      timeSelect: document.getElementById('time-select'),
      settingsTimeValDisplay: document.getElementById('settings-time-val-display'),
      settingsTimeCustom: document.getElementById('settings-time-custom'),
      settingsTimeMinus: document.getElementById('settings-time-minus'),
      settingsTimePlus: document.getElementById('settings-time-plus'),

      resultModal: document.getElementById('result-modal'),
      resultTitle: document.getElementById('result-title'),
      resultScore: document.getElementById('result-score'),
      resultDesc: document.getElementById('result-desc'),
      resultMenuBtn: document.getElementById('result-menu-btn'),
      resultRestartBtn: document.getElementById('result-restart-btn'),
      resultTimeDisplay: document.getElementById('result-time-display'),

      // Menu Time controls
      menuTimeDisplay: document.getElementById('menu-time-display'),
      menuTimeBtns: document.querySelectorAll('.menu-time-btn'),
      menuTimeInput: document.getElementById('menu-time-input'),
      menuTimeMinus: document.getElementById('menu-time-minus'),
      menuTimePlus: document.getElementById('menu-time-plus'),

      // Match Cumulative Timer
      matchTimerDisplay: document.getElementById('match-elapsed-timer-display'),

      // Question Manager
      qmgrBackMenuBtn: document.getElementById('qmgr-btn-back-menu'),
      qmgrPlayBtn: document.getElementById('qmgr-btn-play-game'),
      qmgrAddBtn: document.getElementById('qmgr-btn-add'),
      qmgrResetDefaultBtn: document.getElementById('qmgr-btn-reset-default'),
      qmgrCountBadge: document.getElementById('qmgr-count-badge'),
      qmgrSearchInput: document.getElementById('qmgr-search-input'),
      qmgrTabBtns: document.querySelectorAll('.qmgr-tab-btn'),
      qmgrList: document.getElementById('qmgr-questions-list'),

      // Question Form Modal
      qModal: document.getElementById('modal-question-form'),
      qForm: document.getElementById('question-edit-form'),
      qModalTitle: document.getElementById('form-modal-title'),
      qFormError: document.getElementById('form-error-box'),
      qModalCloseBtn: document.getElementById('form-btn-close'),
      qModalCancelBtn: document.getElementById('form-btn-cancel'),
      formId: document.getElementById('form-q-id'),
      formText: document.getElementById('form-q-text'),
      formCategory: document.getElementById('form-q-category'),
      formDiff: document.getElementById('form-q-difficulty'),
      formOpt0: document.getElementById('form-opt-0'),
      formOpt1: document.getElementById('form-opt-1'),
      formOpt2: document.getElementById('form-opt-2'),
      formOpt3: document.getElementById('form-opt-3'),
      formExplanation: document.getElementById('form-q-explanation')
    };
  }

  // --- EVENT ATTACHMENT ---
  attachEvents() {
    // Menu navigation
    this.el.menuPlayBtn.addEventListener('click', () => {
      this.startNewMatch();
      this.showView('game');
    });

    this.el.menuQuestionsBtn.addEventListener('click', () => {
      this.showView('questions');
    });

    // Menu mode selection
    this.el.menuModePvp.addEventListener('click', () => {
      this.setGameMode('pvp');
    });

    this.el.menuModeBot.addEventListener('click', () => {
      this.setGameMode('vs_bot');
    });

    // Game Header Quick Mode Switchers
    if (this.el.quickModePvpBtn) {
      this.el.quickModePvpBtn.addEventListener('click', () => {
        if (this.gameMode !== 'pvp') {
          this.setGameMode('pvp');
          this.startNewMatch();
        }
      });
    }
    if (this.el.quickModeBotBtn) {
      this.el.quickModeBotBtn.addEventListener('click', () => {
        if (this.gameMode !== 'vs_bot') {
          this.setGameMode('vs_bot');
          this.startNewMatch();
        }
      });
    }

    this.el.menuDiffSelect.addEventListener('change', (e) => {
      this.difficulty = e.target.value;
    });

    // Menu Time Presets & Custom Stepper
    this.el.menuTimeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const t = parseInt(btn.dataset.time, 10);
        this.setTimePerQuestion(t);
      });
    });

    if (this.el.menuTimeInput) {
      this.el.menuTimeInput.addEventListener('change', (e) => {
        this.setTimePerQuestion(e.target.value);
      });
    }
    if (this.el.menuTimeMinus) {
      this.el.menuTimeMinus.addEventListener('click', () => {
        this.setTimePerQuestion(this.timePerQuestion - 1);
      });
    }
    if (this.el.menuTimePlus) {
      this.el.menuTimePlus.addEventListener('click', () => {
        this.setTimePerQuestion(this.timePerQuestion + 1);
      });
    }

    this.el.menuSoundBtn.addEventListener('click', () => this.toggleSound());
    this.el.menuGuideBtn.addEventListener('click', () => {
      this.showView('game');
      this.el.guideBar.classList.remove('hidden');
    });

    // Game top bar navigation
    this.el.gameBackMenuBtn.addEventListener('click', () => {
      clearInterval(this.timerInterval);
      clearTimeout(this.botTimer);
      this.showView('menu');
    });

    this.el.gameQuestionsBtn.addEventListener('click', () => {
      clearInterval(this.timerInterval);
      clearTimeout(this.botTimer);
      this.showView('questions');
    });

    this.el.soundBtn.addEventListener('click', () => this.toggleSound());
    this.el.guideBtn.addEventListener('click', () => {
      this.el.guideBar.classList.toggle('hidden');
    });
    document.getElementById('close-guide-btn').addEventListener('click', () => {
      this.el.guideBar.classList.add('hidden');
    });

    this.el.restartBtn.addEventListener('click', () => this.startNewMatch());

    // Settings Modal
    this.el.settingsBtn.addEventListener('click', () => {
      this.el.diffSelect.value = this.difficulty;
      if (this.el.timeSelect) this.el.timeSelect.value = this.timePerQuestion;
      if (this.el.settingsTimeCustom) this.el.settingsTimeCustom.value = this.timePerQuestion;
      if (this.el.settingsTimeValDisplay) this.el.settingsTimeValDisplay.textContent = `${this.timePerQuestion}s/câu`;
      this.updateSettingsModeButtons();
      this.el.settingsModal.classList.remove('hidden');
    });

    if (this.el.timeSelect) {
      this.el.timeSelect.addEventListener('change', (e) => {
        const val = parseInt(e.target.value, 10);
        if (this.el.settingsTimeCustom) this.el.settingsTimeCustom.value = val;
        if (this.el.settingsTimeValDisplay) this.el.settingsTimeValDisplay.textContent = `${val}s/câu`;
      });
    }

    if (this.el.settingsTimeCustom) {
      this.el.settingsTimeCustom.addEventListener('change', (e) => {
        const val = Math.max(3, Math.min(60, parseInt(e.target.value, 10) || 12));
        e.target.value = val;
        if (this.el.settingsTimeValDisplay) this.el.settingsTimeValDisplay.textContent = `${val}s/câu`;
      });
    }

    if (this.el.settingsTimeMinus) {
      this.el.settingsTimeMinus.addEventListener('click', () => {
        const cur = Math.max(3, (parseInt(this.el.settingsTimeCustom?.value, 10) || 12) - 1);
        if (this.el.settingsTimeCustom) this.el.settingsTimeCustom.value = cur;
        if (this.el.settingsTimeValDisplay) this.el.settingsTimeValDisplay.textContent = `${cur}s/câu`;
      });
    }

    if (this.el.settingsTimePlus) {
      this.el.settingsTimePlus.addEventListener('click', () => {
        const cur = Math.min(60, (parseInt(this.el.settingsTimeCustom?.value, 10) || 12) + 1);
        if (this.el.settingsTimeCustom) this.el.settingsTimeCustom.value = cur;
        if (this.el.settingsTimeValDisplay) this.el.settingsTimeValDisplay.textContent = `${cur}s/câu`;
      });
    }

    this.el.modePvpBtn.addEventListener('click', () => {
      this.gameMode = 'pvp';
      this.updateSettingsModeButtons();
    });

    this.el.modeBotBtn.addEventListener('click', () => {
      this.gameMode = 'vs_bot';
      this.updateSettingsModeButtons();
    });

    this.el.cancelSettingsBtn.addEventListener('click', () => {
      this.el.settingsModal.classList.add('hidden');
    });

    this.el.saveSettingsBtn.addEventListener('click', () => {
      this.difficulty = this.el.diffSelect.value;
      const customVal = parseInt(this.el.settingsTimeCustom?.value, 10);
      const selectVal = parseInt(this.el.timeSelect?.value, 10);
      const chosen = !isNaN(customVal) ? customVal : (!isNaN(selectVal) ? selectVal : 12);
      this.setTimePerQuestion(chosen);
      this.el.settingsModal.classList.add('hidden');
      this.startNewMatch();
    });

    // Result Modal
    this.el.resultRestartBtn.addEventListener('click', () => {
      this.el.resultModal.classList.add('hidden');
      this.startNewMatch();
    });

    this.el.resultMenuBtn.addEventListener('click', () => {
      this.el.resultModal.classList.add('hidden');
      this.showView('menu');
    });

    // Station Option Click Handlers
    this.el.leftOptBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index, 10);
        this.selectOption('left', idx);
      });
    });

    this.el.rightOptBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (this.gameMode === 'vs_bot') return; // Bot plays automatically
        const idx = parseInt(btn.dataset.index, 10);
        this.selectOption('right', idx);
      });
    });

    // Question Manager Events
    this.el.qmgrBackMenuBtn.addEventListener('click', () => this.showView('menu'));
    this.el.qmgrPlayBtn.addEventListener('click', () => {
      this.startNewMatch();
      this.showView('game');
    });

    this.el.qmgrAddBtn.addEventListener('click', () => this.openAddQuestionModal());

    this.el.qmgrResetDefaultBtn.addEventListener('click', () => {
      if (confirm('Khôi phục toàn bộ câu hỏi về danh sách gốc mặc định (40+ câu)?')) {
        this.allQuestions = [...QUESTIONS_DATABASE];
        this.saveQuestions();
      }
    });

    this.el.qmgrSearchInput.addEventListener('input', (e) => {
      this.qmgrSearchText = e.target.value.toLowerCase().trim();
      this.renderQuestionsManager();
    });

    this.el.qmgrTabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.el.qmgrTabBtns.forEach((b) => {
          b.className = 'qmgr-tab-btn px-2.5 py-1 rounded-lg font-bold bg-stone-100 text-stone-600 hover:bg-stone-200 cursor-pointer';
        });
        btn.className = 'qmgr-tab-btn px-2.5 py-1 rounded-lg font-bold bg-amber-500 text-white cursor-pointer';
        this.qmgrFilterDifficulty = btn.dataset.diff;
        this.renderQuestionsManager();
      });
    });

    // Question Form Modal Events
    this.el.qModalCloseBtn.addEventListener('click', () => this.closeQuestionModal());
    this.el.qModalCancelBtn.addEventListener('click', () => this.closeQuestionModal());

    this.el.qForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSaveQuestionForm();
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      // Do nothing if in question manager or modal is active
      if (this.currentView !== 'game') return;
      if (!this.el.settingsModal.classList.contains('hidden') || !this.el.resultModal.classList.contains('hidden')) return;

      if (this.isEvaluating || this.isGameOver) return;

      // Left Team keys: 1, 2, 3, 4
      if (['1', '2', '3', '4'].includes(e.key)) {
        e.preventDefault();
        this.selectOption('left', parseInt(e.key, 10) - 1);
      }

      // Right Team keys (in PvP): Arrows or I, J, K, L
      if (this.gameMode === 'pvp') {
        if (['ArrowUp', 'i', 'I', 'w', 'W'].includes(e.key)) {
          e.preventDefault();
          this.selectOption('right', 0);
        } else if (['ArrowLeft', 'j', 'J', 'a', 'A'].includes(e.key)) {
          e.preventDefault();
          this.selectOption('right', 1);
        } else if (['ArrowDown', 'k', 'K', 's', 'S'].includes(e.key)) {
          e.preventDefault();
          this.selectOption('right', 2);
        } else if (['ArrowRight', 'l', 'L', 'd', 'D'].includes(e.key)) {
          e.preventDefault();
          this.selectOption('right', 3);
        }
      }
    });
  }

  toggleSound() {
    this.sound.enabled = !this.sound.enabled;
    const isEn = this.sound.enabled;
    this.el.soundBtn.textContent = isEn ? '🔊' : '🔇';
    this.el.soundBtn.className = `p-1.5 rounded-lg border transition ${isEn ? 'border-stone-200 text-emerald-600' : 'border-stone-200 text-stone-400'}`;
    this.el.menuSoundIcon.textContent = isEn ? '🔊' : '🔇';
    this.el.menuSoundText.textContent = isEn ? 'Âm thanh: BẬT' : 'Âm thanh: TẮT';
  }

  setGameMode(mode) {
    this.gameMode = mode;
    this.updateModeUI();
  }

  updateModeUI() {
    const isPvp = this.gameMode === 'pvp';
    // Menu buttons styling
    if (this.el.menuModePvp) {
      this.el.menuModePvp.className = isPvp
        ? 'p-2.5 rounded-xl border-2 text-left transition cursor-pointer flex flex-col justify-between bg-amber-50 border-amber-500 text-amber-900 shadow-xs ring-1 ring-amber-400'
        : 'p-2.5 rounded-xl border-2 text-left transition cursor-pointer flex flex-col justify-between border-stone-200 bg-stone-50/60 text-stone-600 hover:bg-stone-100';
    }
    if (this.el.menuModeBot) {
      this.el.menuModeBot.className = !isPvp
        ? 'p-2.5 rounded-xl border-2 text-left transition cursor-pointer flex flex-col justify-between bg-blue-50 border-blue-500 text-blue-900 shadow-xs ring-1 ring-blue-400'
        : 'p-2.5 rounded-xl border-2 text-left transition cursor-pointer flex flex-col justify-between border-stone-200 bg-stone-50/60 text-stone-600 hover:bg-stone-100';
    }
    const modeInd = document.getElementById('menu-mode-indicator');
    if (modeInd) {
      modeInd.textContent = isPvp ? '👥 Người vs Người' : '🤖 Người vs Máy';
    }
    const playBtn = document.getElementById('menu-btn-play');
    if (playBtn) {
      playBtn.innerHTML = isPvp
        ? '👥 <span>BẮT ĐẦU: CHƠI 2 NGƯỜI (PvP)</span> ➔'
        : '🤖 <span>BẮT ĐẦU: ĐẤU VỚI MÁY (AI)</span> ➔';
      playBtn.className = isPvp
        ? 'mt-5 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer active:scale-98'
        : 'mt-5 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer active:scale-98';
    }
    // Header quick mode buttons
    if (this.el.quickModePvpBtn) {
      this.el.quickModePvpBtn.className = isPvp
        ? 'px-2 py-1 rounded-lg text-[11px] font-extrabold flex items-center gap-1 transition cursor-pointer bg-white text-rose-600 border border-stone-200 shadow-2xs'
        : 'px-2 py-1 rounded-lg text-[11px] font-extrabold flex items-center gap-1 transition cursor-pointer text-stone-500 hover:text-stone-800';
    }
    if (this.el.quickModeBotBtn) {
      this.el.quickModeBotBtn.className = !isPvp
        ? 'px-2 py-1 rounded-lg text-[11px] font-extrabold flex items-center gap-1 transition cursor-pointer bg-white text-blue-600 border border-stone-200 shadow-2xs'
        : 'px-2 py-1 rounded-lg text-[11px] font-extrabold flex items-center gap-1 transition cursor-pointer text-stone-500 hover:text-stone-800';
    }
    this.updateSettingsModeButtons();
  }

  updateSettingsModeButtons() {
    if (this.gameMode === 'pvp') {
      this.el.modePvpBtn.className = 'p-2 rounded-xl border font-bold text-center transition cursor-pointer bg-amber-50 border-amber-500 text-amber-800';
      this.el.modeBotBtn.className = 'p-2 rounded-xl border font-bold text-center transition cursor-pointer border-stone-200 text-stone-600 hover:bg-stone-50';
    } else {
      this.el.modeBotBtn.className = 'p-2 rounded-xl border font-bold text-center transition cursor-pointer bg-amber-50 border-amber-500 text-amber-800';
      this.el.modePvpBtn.className = 'p-2 rounded-xl border font-bold text-center transition cursor-pointer border-stone-200 text-stone-600 hover:bg-stone-50';
    }
  }

  setTimePerQuestion(val) {
    const num = Math.max(3, Math.min(60, parseInt(val, 10) || 12));
    this.timePerQuestion = num;

    // Update menu UI
    if (this.el.menuTimeDisplay) this.el.menuTimeDisplay.textContent = `${num}s`;
    if (this.el.menuTimeInput) this.el.menuTimeInput.value = num;
    if (this.el.menuTimeBtns) {
      this.el.menuTimeBtns.forEach((b) => {
        const btnTime = parseInt(b.dataset.time, 10);
        if (btnTime === num) {
          b.className = 'menu-time-btn py-1 rounded-lg border border-amber-600 bg-amber-500 text-white text-[11px] font-bold cursor-pointer';
          b.textContent = `${btnTime}s ★`;
        } else {
          b.className = 'menu-time-btn py-1 rounded-lg border border-stone-200 text-[11px] font-bold text-stone-600 hover:bg-stone-50 cursor-pointer';
          b.textContent = `${btnTime}s`;
        }
      });
    }

    // Update settings modal UI
    if (this.el.timeSelect) this.el.timeSelect.value = num;
    if (this.el.settingsTimeValDisplay) this.el.settingsTimeValDisplay.textContent = `${num}s/câu`;
    if (this.el.settingsTimeCustom) this.el.settingsTimeCustom.value = num;
  }

  // --- QUESTION MANAGEMENT CRUD ---
  renderQuestionsManager() {
    const listEl = this.el.qmgrList;
    listEl.innerHTML = '';

    let filtered = this.allQuestions;

    if (this.qmgrFilterDifficulty !== 'all') {
      filtered = filtered.filter((q) => q.difficulty === this.qmgrFilterDifficulty);
    }

    if (this.qmgrSearchText) {
      filtered = filtered.filter((q) => {
        const text = (q.question + ' ' + q.category + ' ' + (q.explanation || '')).toLowerCase();
        return text.includes(this.qmgrSearchText);
      });
    }

    this.el.qmgrCountBadge.textContent = this.allQuestions.length;

    if (filtered.length === 0) {
      listEl.innerHTML = `
        <div class="bg-white rounded-2xl border border-stone-200 p-8 text-center text-stone-500">
          <p class="font-bold text-sm">Không tìm thấy câu hỏi nào phù hợp với bộ lọc!</p>
          <button id="qmgr-empty-add-btn" class="mt-3 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs cursor-pointer">
            + Thêm câu hỏi mới ngay
          </button>
        </div>
      `;
      const btn = document.getElementById('qmgr-empty-add-btn');
      if (btn) btn.addEventListener('click', () => this.openAddQuestionModal());
      return;
    }

    filtered.forEach((q, idx) => {
      const card = document.createElement('div');
      card.className = 'bg-white rounded-xl border border-stone-200 p-3.5 shadow-2xs hover:border-amber-300 transition flex flex-col sm:flex-row items-start justify-between gap-3';

      const diffConfig = DIFFICULTY_CONFIG[q.difficulty] || { label: q.difficulty };

      card.innerHTML = `
        <div class="flex-1 min-w-0">
          <div class="flex flex-wrap items-center gap-2 mb-1.5 text-[11px]">
            <span class="font-bold text-stone-400">#${idx + 1}</span>
            <span class="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-bold">${q.category || 'Mẹo Sống'}</span>
            <span class="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-bold">${diffConfig.label}</span>
          </div>
          <h3 class="font-bold text-xs sm:text-sm text-stone-900 mb-2 leading-snug">
            ${this.escapeHtml(q.question)}
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-600">
            ${q.options
              .map(
                (opt, oIdx) => `
                <div class="flex items-center gap-1.5 p-1 px-2 rounded-lg ${
                  oIdx === q.correctIndex ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold' : 'bg-stone-50'
                }">
                  <span class="font-mono font-black ${oIdx === q.correctIndex ? 'text-emerald-700' : 'text-stone-400'}">${['A', 'B', 'C', 'D'][oIdx]}:</span>
                  <span class="truncate">${this.escapeHtml(opt)}</span>
                  ${oIdx === q.correctIndex ? '<span class="ml-auto text-emerald-600 text-[10px]">✓</span>' : ''}
                </div>
              `
              )
              .join('')}
          </div>
          ${
            q.explanation
              ? `<p class="mt-2 text-[11px] text-stone-500 italic bg-amber-50/40 p-1.5 px-2 rounded border border-amber-100">
                  💡 <strong>Giải thích:</strong> ${this.escapeHtml(q.explanation)}
                </p>`
              : ''
          }
        </div>
        <div class="flex sm:flex-col items-center gap-1.5 shrink-0 self-end sm:self-center">
          <button class="qmgr-item-edit px-2.5 py-1 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-700 font-bold text-xs flex items-center gap-1 transition cursor-pointer" data-id="${q.id}">
            ✏️ <span>Sửa</span>
          </button>
          <button class="qmgr-item-delete px-2.5 py-1 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-100 text-rose-600 font-bold text-xs flex items-center gap-1 transition cursor-pointer" data-id="${q.id}">
            🗑️ <span>Xóa</span>
          </button>
        </div>
      `;

      card.querySelector('.qmgr-item-edit').addEventListener('click', () => this.openEditQuestionModal(q.id));
      card.querySelector('.qmgr-item-delete').addEventListener('click', () => this.deleteQuestion(q.id));

      listEl.appendChild(card);
    });
  }

  openAddQuestionModal() {
    this.el.qModalTitle.textContent = '➕ Thêm Câu Hỏi Mới';
    this.el.formId.value = '';
    this.el.formText.value = '';
    this.el.formCategory.value = 'Mẹo Đời Sống';
    this.el.formDiff.value = 'nhanh';
    this.el.formOpt0.value = '';
    this.el.formOpt1.value = '';
    this.el.formOpt2.value = '';
    this.el.formOpt3.value = '';
    this.el.formExplanation.value = '';
    document.querySelector('input[name="form-correct-radio"][value="0"]').checked = true;

    this.el.qFormError.classList.add('hidden');
    this.el.qModal.classList.remove('hidden');
    this.el.formText.focus();
  }

  openEditQuestionModal(id) {
    const q = this.allQuestions.find((item) => item.id === id);
    if (!q) return;

    this.el.qModalTitle.textContent = '✏️ Chỉnh Sửa Câu Hỏi';
    this.el.formId.value = q.id;
    this.el.formText.value = q.question;
    this.el.formCategory.value = q.category || '';
    this.el.formDiff.value = q.difficulty || 'nhanh';
    this.el.formOpt0.value = q.options[0] || '';
    this.el.formOpt1.value = q.options[1] || '';
    this.el.formOpt2.value = q.options[2] || '';
    this.el.formOpt3.value = q.options[3] || '';
    this.el.formExplanation.value = q.explanation || '';

    const radio = document.querySelector(`input[name="form-correct-radio"][value="${q.correctIndex}"]`);
    if (radio) radio.checked = true;

    this.el.qFormError.classList.add('hidden');
    this.el.qModal.classList.remove('hidden');
    this.el.formText.focus();
  }

  closeQuestionModal() {
    this.el.qModal.classList.add('hidden');
  }

  handleSaveQuestionForm() {
    const text = this.el.formText.value.trim();
    const cat = this.el.formCategory.value.trim() || 'Mẹo Sống';
    const diff = this.el.formDiff.value;
    const opt0 = this.el.formOpt0.value.trim();
    const opt1 = this.el.formOpt1.value.trim();
    const opt2 = this.el.formOpt2.value.trim();
    const opt3 = this.el.formOpt3.value.trim();
    const expl = this.el.formExplanation.value.trim();
    const correctIdx = parseInt(document.querySelector('input[name="form-correct-radio"]:checked').value, 10);

    if (!text || !opt0 || !opt1 || !opt2 || !opt3) {
      this.el.qFormError.textContent = 'Vui lòng điền đầy đủ nội dung câu hỏi và 4 phương án trả lời!';
      this.el.qFormError.classList.remove('hidden');
      return;
    }

    const editId = this.el.formId.value;
    if (editId) {
      // Edit existing
      const target = this.allQuestions.find((q) => q.id === editId);
      if (target) {
        target.question = text;
        target.category = cat;
        target.difficulty = diff;
        target.options = [opt0, opt1, opt2, opt3];
        target.correctIndex = correctIdx;
        target.explanation = expl;
      }
    } else {
      // Create new
      const newQuestion = {
        id: 'user_' + Date.now(),
        question: text,
        category: cat,
        difficulty: diff,
        options: [opt0, opt1, opt2, opt3],
        correctIndex: correctIdx,
        explanation: expl
      };
      this.allQuestions.unshift(newQuestion);
    }

    this.saveQuestions();
    this.closeQuestionModal();
  }

  deleteQuestion(id) {
    if (this.allQuestions.length <= 4) {
      alert('Cần giữ lại ít nhất 4 câu hỏi để có thể bắt đầu trận đấu kéo co!');
      return;
    }
    if (confirm('Bạn có chắc chắn muốn xóa câu hỏi này khỏi ngân hàng không?')) {
      this.allQuestions = this.allQuestions.filter((q) => q.id !== id);
      this.saveQuestions();
    }
  }

  escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // --- MATCH ENGINE ---
  startNewMatch() {
    clearInterval(this.timerInterval);
    clearTimeout(this.botTimer);

    this.matchQuestions = this.selectQuestions(this.difficulty, this.totalRounds);
    this.currentRoundIndex = 0;
    this.ropePosition = 0;
    this.leftScore = 0;
    this.rightScore = 0;
    this.isGameOver = false;

    this.el.rightTeamTitle.textContent = this.gameMode === 'vs_bot' ? 'Máy (AI Bot)' : 'Đội Xanh (Bên Phải)';
    this.el.rightPanelTitle.textContent = this.gameMode === 'vs_bot' ? 'MÁY (AI BOT)' : 'ĐỘI XANH (BÊN PHẢI)';
    document.getElementById('right-char-badge').textContent = this.gameMode === 'vs_bot' ? 'BOT' : 'XANH';

    this.el.resultModal.classList.add('hidden');
    this.startMatchTimer();
    this.sound.playWhistle();
    this.loadRound(0);
  }

  selectQuestions(diff, count) {
    const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
    const database = this.allQuestions.length >= 4 ? this.allQuestions : QUESTIONS_DATABASE;

    if (diff === 'progressive') {
      const n = shuffle(database.filter((q) => q.difficulty === 'nhanh')).slice(0, 3);
      const v = shuffle(database.filter((q) => q.difficulty === 'vua')).slice(0, 3);
      const k = shuffle(database.filter((q) => q.difficulty === 'kho')).slice(0, 2);
      const cg = shuffle(database.filter((q) => q.difficulty === 'chuyen_gia')).slice(0, 2);
      const combined = [...n, ...v, ...k, ...cg];

      if (combined.length >= count) return combined.slice(0, count);
      const usedIds = new Set(combined.map((q) => q.id));
      const rem = shuffle(database.filter((q) => !usedIds.has(q.id)));
      return [...combined, ...rem].slice(0, Math.min(count, database.length));
    } else {
      const pool = database.filter((q) => q.difficulty === diff);
      const shuffled = shuffle(pool);
      if (shuffled.length >= count) return shuffled.slice(0, count);
      const rem = shuffle(database.filter((q) => q.difficulty !== diff));
      return [...shuffled, ...rem].slice(0, Math.min(count, database.length));
    }
  }

  loadRound(index) {
    this.currentRoundIndex = index;
    const q = this.matchQuestions[index];
    if (!q) {
      this.finishMatch();
      return;
    }

    this.isEvaluating = false;
    this.leftAnswer = { hasAnswered: false, selectedIndex: null, timeSpentMs: 0, isCorrect: null };
    this.rightAnswer = { hasAnswered: false, selectedIndex: null, timeSpentMs: 0, isCorrect: null };
    this.timeLeft = this.timePerQuestion;
    this.roundStartTime = Date.now();

    this.el.evalBanner.classList.add('hidden');
    this.updateArenaUI();
    this.renderQuestionStations(q);

    if (this.gameMode === 'vs_bot') {
      this.scheduleBotAnswer(q);
    }

    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timeLeft -= 0.1;
      if (this.timeLeft <= 3.0 && this.timeLeft > 0 && Math.abs(Math.round(this.timeLeft * 10) % 10) === 0) {
        this.sound.playTick();
      }

      if (this.timeLeft <= 0) {
        this.timeLeft = 0;
        clearInterval(this.timerInterval);
        this.evaluateRound();
      }
      this.el.timerDisplay.textContent = `${Math.max(0, this.timeLeft).toFixed(1)}s`;
    }, 100);
  }

  updateArenaUI() {
    this.el.leftScore.textContent = this.leftScore;
    this.el.rightScore.textContent = this.rightScore;
    this.el.roundDisplay.textContent = `CÂU ${this.currentRoundIndex + 1}/${this.totalRounds}`;
    this.el.timerDisplay.textContent = `${this.timeLeft.toFixed(0)}s`;

    // Rope translate
    const offset = (this.ropePosition / 100) * 80;
    this.el.ropeRig.style.transform = `translateX(${offset}px)`;

    const dist = Math.abs(Math.round(this.ropePosition));
    if (this.ropePosition < 0) {
      this.el.meterText.textContent = `◄ ${dist}m | GIỮA | 0m`;
      this.el.meterText.className = 'text-rose-600 font-mono font-bold text-[10px] sm:text-[11px]';
    } else if (this.ropePosition > 0) {
      this.el.meterText.textContent = `0m | GIỮA | ${dist}m ►`;
      this.el.meterText.className = 'text-blue-600 font-mono font-bold text-[10px] sm:text-[11px]';
    } else {
      this.el.meterText.textContent = `0m | GIỮA | 0m`;
      this.el.meterText.className = 'text-stone-600 font-mono font-bold text-[10px] sm:text-[11px]';
    }

    const pointerPercent = 50 + (this.ropePosition / 100) * 45;
    this.el.meterPointer.style.left = `${pointerPercent}%`;
  }

  renderQuestionStations(q) {
    const diffConfig = DIFFICULTY_CONFIG[q.difficulty] || { label: q.difficulty };

    // Left Station
    this.el.leftQuestionText.textContent = q.question;
    this.el.leftCategory.textContent = q.category || 'Mẹo Sống';
    this.el.leftDiff.textContent = diffConfig.label.toUpperCase();
    this.el.leftAnsweredPill.textContent = 'Chờ chọn phím...';
    this.el.leftAnsweredPill.className = 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-500';

    this.el.leftOptBtns.forEach((btn, i) => {
      btn.className = 'opt-btn-left flex items-center gap-2 p-1.5 sm:p-2 rounded-xl border border-stone-200 text-left transition hover:border-rose-300 cursor-pointer active:scale-98 bg-white';
      btn.querySelector('.opt-text').textContent = q.options[i];
    });

    // Right Station
    this.el.rightQuestionText.textContent = q.question;
    this.el.rightCategory.textContent = q.category || 'Mẹo Sống';
    this.el.rightDiff.textContent = diffConfig.label.toUpperCase();
    this.el.rightAnsweredPill.textContent = this.gameMode === 'vs_bot' ? 'Máy đang tính toán...' : 'Chờ chọn phím...';
    this.el.rightAnsweredPill.className = 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-500';

    this.el.rightOptBtns.forEach((btn, i) => {
      btn.className = 'opt-btn-right flex items-center gap-2 p-1.5 sm:p-2 rounded-xl border border-stone-200 text-left transition hover:border-blue-300 cursor-pointer active:scale-98 bg-white';
      btn.querySelector('.opt-text').textContent = q.options[i];
    });
  }

  scheduleBotAnswer(q) {
    const delay = Math.random() * 3500 + 1500;
    this.botTimer = setTimeout(() => {
      if (this.isEvaluating || this.rightAnswer.hasAnswered) return;
      const isAccurate = Math.random() < 0.72;
      let chosenIdx = q.correctIndex;
      if (!isAccurate) {
        const wrongs = [0, 1, 2, 3].filter((i) => i !== q.correctIndex);
        chosenIdx = wrongs[Math.floor(Math.random() * wrongs.length)];
      }
      this.selectOption('right', chosenIdx);
    }, delay);
  }

  selectOption(side, optionIndex) {
    if (this.isEvaluating || this.isGameOver) return;
    const answer = side === 'left' ? this.leftAnswer : this.rightAnswer;
    if (answer.hasAnswered) return;

    const timeSpent = Date.now() - this.roundStartTime;
    const q = this.matchQuestions[this.currentRoundIndex];
    const isCorrect = optionIndex === q.correctIndex;

    answer.hasAnswered = true;
    answer.selectedIndex = optionIndex;
    answer.timeSpentMs = timeSpent;
    answer.isCorrect = isCorrect;

    // Visual feedback on team panel
    if (side === 'left') {
      this.el.leftAnsweredPill.textContent = `Đã chọn (${(timeSpent / 1000).toFixed(1)}s)`;
      this.el.leftAnsweredPill.className = 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700';
      this.el.leftOptBtns.forEach((btn, idx) => {
        if (idx === optionIndex) {
          btn.className = 'opt-btn-left flex items-center gap-2 p-1.5 sm:p-2 rounded-xl border-2 border-rose-500 bg-rose-50 text-left font-bold';
        }
      });
    } else {
      this.el.rightAnsweredPill.textContent = `Đã chọn (${(timeSpent / 1000).toFixed(1)}s)`;
      this.el.rightAnsweredPill.className = 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700';
      this.el.rightOptBtns.forEach((btn, idx) => {
        if (idx === optionIndex) {
          btn.className = 'opt-btn-right flex items-center gap-2 p-1.5 sm:p-2 rounded-xl border-2 border-blue-500 bg-blue-50 text-left font-bold';
        }
      });
    }

    // If both answered, evaluate immediately
    if (this.leftAnswer.hasAnswered && this.rightAnswer.hasAnswered) {
      clearInterval(this.timerInterval);
      this.evaluateRound();
    }
  }

  evaluateRound() {
    this.isEvaluating = true;
    clearInterval(this.timerInterval);
    clearTimeout(this.botTimer);

    const q = this.matchQuestions[this.currentRoundIndex];
    const leftCorrect = this.leftAnswer.hasAnswered && this.leftAnswer.isCorrect;
    const rightCorrect = this.rightAnswer.hasAnswered && this.rightAnswer.isCorrect;

    let evalMsg = '';
    let shift = 0;

    if (leftCorrect && rightCorrect) {
      if (this.leftAnswer.timeSpentMs < this.rightAnswer.timeSpentMs) {
        shift = -15;
        this.leftScore++;
        evalMsg = `⚡ Đội Đỏ nhanh hơn (${(this.leftAnswer.timeSpentMs / 1000).toFixed(1)}s vs ${(this.rightAnswer.timeSpentMs / 1000).toFixed(1)}s)! Kéo +15m`;
        this.sound.playCorrect();
        this.sound.playPullSound();
      } else if (this.rightAnswer.timeSpentMs < this.leftAnswer.timeSpentMs) {
        shift = 15;
        this.rightScore++;
        evalMsg = `⚡ ${this.gameMode === 'vs_bot' ? 'Máy' : 'Đội Xanh'} nhanh hơn (${(this.rightAnswer.timeSpentMs / 1000).toFixed(1)}s vs ${(this.leftAnswer.timeSpentMs / 1000).toFixed(1)}s)! Kéo +15m`;
        this.sound.playCorrect();
        this.sound.playPullSound();
      } else {
        evalMsg = '🤝 Hai bên đều đúng với cùng thời gian! Hòa vòng này.';
        this.sound.playCorrect();
      }
    } else if (leftCorrect && !rightCorrect) {
      shift = -25;
      this.leftScore++;
      evalMsg = '💪 Đội Đỏ trả lời chính xác! Kéo mạnh +25m!';
      this.sound.playCorrect();
      this.sound.playPullSound();
    } else if (!leftCorrect && rightCorrect) {
      shift = 25;
      this.rightScore++;
      evalMsg = `💪 ${this.gameMode === 'vs_bot' ? 'Máy' : 'Đội Xanh'} trả lời chính xác! Kéo mạnh +25m!`;
      this.sound.playCorrect();
      this.sound.playPullSound();
    } else {
      evalMsg = '❌ Cả hai bên đều trả lời sai hoặc hết giờ! Dây giữ nguyên vị trí.';
      this.sound.playWrong();
    }

    this.ropePosition = Math.max(-100, Math.min(100, this.ropePosition + shift));

    // Highlight correct & wrong options
    this.highlightStationOptions('left', q.correctIndex, this.leftAnswer);
    this.highlightStationOptions('right', q.correctIndex, this.rightAnswer);

    // Show evaluation banner
    this.el.evalBanner.textContent = evalMsg + (q.explanation ? ` — ${q.explanation}` : '');
    this.el.evalBanner.className = `py-1.5 px-3 text-center text-xs font-bold border-t ${
      shift < 0 ? 'bg-rose-100 text-rose-800 border-rose-200' : shift > 0 ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-stone-100 text-stone-700 border-stone-200'
    }`;
    this.el.evalBanner.classList.remove('hidden');

    this.updateArenaUI();

    // Move to next question after 3.2s
    setTimeout(() => {
      if (this.currentView !== 'game') return;
      if (this.currentRoundIndex + 1 < this.totalRounds && Math.abs(this.ropePosition) < 100) {
        this.loadRound(this.currentRoundIndex + 1);
      } else {
        this.finishMatch();
      }
    }, 3200);
  }

  highlightStationOptions(side, correctIdx, answerState) {
    const btns = side === 'left' ? this.el.leftOptBtns : this.el.rightOptBtns;
    btns.forEach((btn, idx) => {
      if (idx === correctIdx) {
        btn.className = `opt-btn-${side} flex items-center gap-2 p-1.5 sm:p-2 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-left font-bold text-emerald-800`;
      } else if (answerState.selectedIndex === idx && !answerState.isCorrect) {
        btn.className = `opt-btn-${side} flex items-center gap-2 p-1.5 sm:p-2 rounded-xl border-2 border-rose-400 bg-rose-50 text-left line-through text-rose-600 opacity-80`;
      } else {
        btn.className = `opt-btn-${side} flex items-center gap-2 p-1.5 sm:p-2 rounded-xl border border-stone-200 text-left opacity-40`;
      }
    });
  }

  finishMatch() {
    this.isGameOver = true;
    this.stopMatchTimer();
    clearInterval(this.timerInterval);
    clearTimeout(this.botTimer);

    // Display Total Match Time in Result Modal
    if (this.el.resultTimeDisplay) {
      this.el.resultTimeDisplay.textContent = this.formatMatchTime(this.matchElapsedSeconds);
    }

    let winner = 'draw';
    if (this.ropePosition < -5) winner = 'left';
    else if (this.ropePosition > 5) winner = 'right';
    else if (this.leftScore > this.rightScore) winner = 'left';
    else if (this.rightScore > this.leftScore) winner = 'right';

    if (winner === 'left') {
      this.el.resultTitle.textContent = '🏆 ĐỘI ĐỎ CHIẾN THẮNG!';
      this.el.resultTitle.className = 'text-xl sm:text-2xl font-black text-rose-600';
      this.el.resultDesc.textContent = `Đội Đỏ xuất sắc kéo dây về phía mình ${Math.abs(this.ropePosition).toFixed(0)}m với ${this.leftScore} câu trả lời đúng!`;
      this.sound.playVictory();
      this.triggerConfetti();
    } else if (winner === 'right') {
      const rightName = this.gameMode === 'vs_bot' ? 'MÁY (AI BOT)' : 'ĐỘI XANH';
      this.el.resultTitle.textContent = `🏆 ${rightName} CHIẾN THẮNG!`;
      this.el.resultTitle.className = 'text-xl sm:text-2xl font-black text-blue-600';
      this.el.resultDesc.textContent = `${rightName} đã kéo dây về phía mình ${this.ropePosition.toFixed(0)}m với ${this.rightScore} câu trả lời đúng!`;
      this.sound.playVictory();
      this.triggerConfetti();
    } else {
      this.el.resultTitle.textContent = '🤝 KẾT QUẢ HÒA CÂN NÃO!';
      this.el.resultTitle.className = 'text-xl sm:text-2xl font-black text-amber-600';
      this.el.resultDesc.textContent = `Trận đấu quá ngang tài ngang sức sau 10 câu hỏi kéo co! Tỉ số: ${this.leftScore} - ${this.rightScore}.`;
      this.sound.playWhistle();
    }

    this.el.resultScore.textContent = `${this.leftScore} - ${this.rightScore}`;
    this.el.resultModal.classList.remove('hidden');
  }

  triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#ef4444', '#3b82f6', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899'];
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.7) * 16,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 10
      });
    }

    let frame = 0;
    function render() {
      if (frame > 120) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35;
        p.rotation += p.vr;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });
      frame++;
      requestAnimationFrame(render);
    }
    render();
  }
}

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.appInstance = new TugOfWarApp();
});
