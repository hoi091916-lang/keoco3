import { Question } from '../types';

export const QUESTIONS_DATABASE: Question[] = [
  // ==================== CẤP ĐỘ: NHANH (Phản xạ, mẹo đời sống thân thuộc) ====================
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
    options: [
      'Vitamin C',
      'Vitamin D',
      'Vitamin A',
      'Vitamin B12'
    ],
    correctIndex: 1,
    difficulty: 'nhanh',
    category: 'Sức Khỏe Đời Sống',
    explanation: 'Dưới tác động của tia UVB trong ánh nắng, 7-dehydrocholesterol trong da sẽ chuyển hóa thành tiền Vitamin D3.'
  },
  {
    id: 'n3',
    question: 'Tại sao khi thái hành tây người ta thường bị chảy nước mắt cay xè?',
    options: [
      'Do hơi cay của ớt lẫn vào hành',
      'Do khí lưu huỳnh phản ứng với nước mắt tạo axit nhẹ',
      'Do bụi bẩn từ vỏ ngoài bay vào mắt',
      'Do mắt bị kích ứng bởi mùi thơm'
    ],
    correctIndex: 1,
    difficulty: 'nhanh',
    category: 'Hiện Tượng Đời Sống',
    explanation: 'Cắt hành làm vỡ tế bào, giải phóng enzym và hợp chất lưu huỳnh tạo thành khí syn-propanethial-S-oxide gây kích ứng tuyến lệ.'
  },
  {
    id: 'n4',
    question: 'Khi gặp sự cố hỏa hoạn có nhiều khói độc trong nhà cao tầng, tư thế di chuyển an toàn nhất là gì?',
    options: [
      'Đứng thẳng chạy thật nhanh ra ban công',
      'Bò sát mặt đất và bịt khăn ẩm vào mũi, miệng',
      'Chạy vào thang máy để xuống đất nhanh nhất',
      'Trùm chăn bông khô rồi nhảy từ cửa sổ'
    ],
    correctIndex: 1,
    difficulty: 'nhanh',
    category: 'Kỹ Năng Thoát Hiểm',
    explanation: 'Khói và khí độc nhẹ hơn không khí nên bốc lên cao, tầng khí sát sàn nhà luôn giàu oxy và ít khói nhất.'
  },
  {
    id: 'n5',
    question: 'Tháp Eiffel nổi tiếng thế giới nằm ở thủ đô của quốc gia nào?',
    options: [
      'Rome (Ý)',
      'London (Anh)',
      'Paris (Pháp)',
      'Berlin (Đức)'
    ],
    correctIndex: 2,
    difficulty: 'nhanh',
    category: 'Địa Danh Nổi Tiếng',
    explanation: 'Tháp Eiffel là biểu tượng kinh điển của thủ đô Paris, nước Pháp, khánh thành năm 1889.'
  },
  {
    id: 'n6',
    question: 'Để khử mùi hôi khó chịu trong tủ lạnh một cách tự nhiên và an toàn, người ta thường để gì?',
    options: [
      'Bột baking soda hoặc bã cà phê khô',
      'Xịt nước hoa phòng',
      'Để một bát xà phòng lỏng',
      'Đốt một cây nến thơm nhỏ'
    ],
    correctIndex: 0,
    difficulty: 'nhanh',
    category: 'Mẹo Gia Đình',
    explanation: 'Baking soda và bã cà phê có cấu trúc xốp vi mô hấp phụ mùi hôi và axit béo cực kỳ hiệu quả mà không hại thực phẩm.'
  },
  {
    id: 'n7',
    question: 'Quả chuối chín tự nhiên chứa rất nhiều khoáng chất nào giúp chống chuột rút cơ bắp?',
    options: [
      'Sắt (Fe)',
      'Kali (Potassium)',
      'I-ốt (Iodine)',
      'Kẽm (Zinc)'
    ],
    correctIndex: 1,
    difficulty: 'nhanh',
    category: 'Dinh Dưỡng Thực Phẩm',
    explanation: 'Kali là chất điện giải thiết yếu giúp điều hòa co bóp cơ và dẫn truyền xung thần kinh, phòng ngừa co rút cơ hiệu quả.'
  },
  {
    id: 'n8',
    question: 'Biển Đỏ (Hồng Hải) nối liền Địa Trung Hải qua kênh đào nhân tạo nổi tiếng nào?',
    options: [
      'Kênh đào Panama',
      'Kênh đào Suez',
      'Kênh đào Kiel',
      'Kênh đào Corinth'
    ],
    correctIndex: 1,
    difficulty: 'nhanh',
    category: 'Địa Lý & Công Trình',
    explanation: 'Kênh đào Suez của Ai Cập khánh thành năm 1869 kết nối Biển Đỏ với Địa Trung Hải, rút ngắn tuyến đường biển Á - Âu.'
  },
  {
    id: 'n9',
    question: 'Khi lái xe trời mưa hoặc sương mù dày đặc, bật đèn nào giúp quan sát đường tốt nhất?',
    options: [
      'Đèn pha chiếu xa (High beam)',
      'Đèn sương mù hoặc đèn chiếu gần (Low beam)',
      'Tắt hết đèn để mắt quen bóng tối',
      'Chỉ bật đèn xi-nhan khẩn cấp liên tục'
    ],
    correctIndex: 1,
    difficulty: 'nhanh',
    category: 'An Toàn Giao Thông',
    explanation: 'Bật đèn pha xa trong sương mù hay mưa sẽ bị các hạt nước phản xạ ánh sáng ngược vào mắt gây lóa mù tạm thời!'
  },
  {
    id: 'n10',
    question: 'Cây cầu vàng độc đáo được nâng đỡ bởi đôi bàn tay khổng lồ ở Việt Nam nằm tại địa điểm nào?',
    options: [
      'Fansipan (Sa Pa)',
      'Bà Nà Hills (Đà Nẵng)',
      'Tràng An (Ninh Bình)',
      'Đà Lạt (Lâm Đồng)'
    ],
    correctIndex: 1,
    difficulty: 'nhanh',
    category: 'Địa Danh & Du Lịch',
    explanation: 'Cầu Vàng tại Sun World Bà Nà Hills Đà Nẵng từng gây sốt trên toàn thế giới với kiến trúc 2 bàn tay đá rêu phong kỳ vĩ.'
  },

  // ==================== CẤP ĐỘ: VỪA (Khoa học thường thức, hiện tượng tự nhiên) ====================
  {
    id: 'v1',
    question: 'Tại sao bầu trời ban ngày lại có màu xanh lam thay vì màu khác?',
    options: [
      'Do ánh sáng xanh bị các phân tử khí quyển tán xạ mạnh nhất (Tán xạ Rayleigh)',
      'Do màu của nước biển phản chiếu ngược lên bầu trời',
      'Do tầng ozone chỉ hấp thụ và phát ra duy nhất ánh sáng xanh',
      'Do mắt người chỉ nhạy cảm với bước sóng xanh lam'
    ],
    correctIndex: 0,
    difficulty: 'vua',
    category: 'Hiện Tượng Tự Nhiên',
    explanation: 'Ánh sáng Mặt trời gồm 7 màu, ánh sáng bước sóng ngắn (xanh lam, tím) bị các phân tử khí trong khí quyển tán xạ mạnh gấp nhiều lần ánh sáng đỏ.'
  },
  {
    id: 'v2',
    question: 'Khi pin điện thoại báo 20%, thói quen sạc nào giúp kéo dài tuổi thọ pin Lithium-ion nhất?',
    options: [
      'Dùng cạn kiệt về 0% sập nguồn rồi mới sạc đầy 100%',
      'Sạc duy trì trong khoảng 20% - 80% và tránh để máy quá nóng',
      'Vừa cắm sạc vừa chơi game nặng để pin xả nhanh nạp nhanh',
      'Luôn cắm sạc qua đêm liên tục 12 tiếng'
    ],
    correctIndex: 1,
    difficulty: 'vua',
    category: 'Công Nghệ Đời Sống',
    explanation: 'Pin Li-ion chịu áp lực điện hóa cao nhất ở 0% và 100%. Duy trì mức 20-80% và nhiệt độ mát giúp pin bền gấp đôi chu kỳ sạc.'
  },
  {
    id: 'v3',
    question: 'Tại sao ta thấy tia chớp lóe sáng trước rồi mới nghe thấy tiếng sấm rền?',
    options: [
      'Tia sét sinh ra trước rồi sấm mới hình thành',
      'Vận tốc ánh sáng nhanh hơn rất nhiều vận tốc âm thanh trong không khí',
      'Tai người phản xạ chậm hơn mắt 100 lần',
      'Âm thanh bị tầng mây giữ lại một khoảng thời gian'
    ],
    correctIndex: 1,
    difficulty: 'vua',
    category: 'Vật Lý Đời Sống',
    explanation: 'Vận tốc ánh sáng ~300.000 km/s, còn âm thanh trong không khí chỉ khoảng 343 m/s (~1 km sau mỗi 3 giây).'
  },
  {
    id: 'v4',
    question: 'Hiện tượng "ngáp" ở con người có tác dụng sinh lý chính nào đã được khoa học chứng minh?',
    options: [
      'Giúp hạ nhiệt và làm mát não bộ, tăng độ tỉnh táo',
      'Báo hiệu cơ thể cần ăn thêm chất ngọt ngay lập tức',
      'Thải trừ toàn bộ độc tố tích tụ trong phổi ra ngoài',
      'Chỉ là phản xạ vô nghĩa do buồn chán'
    ],
    correctIndex: 0,
    difficulty: 'vua',
    category: 'Cơ Thể Người',
    explanation: 'Nghiên cứu cho thấy khi ngáp, luồng không khí mát hít sâu giúp làm mát mạch máu não và tăng lưu lượng máu lên não.'
  },
  {
    id: 'v5',
    question: 'Ai là người phát minh ra bóng đèn sợi đốt thương mại thành công và sở hữu hơn 1.000 bằng sáng chế?',
    options: [
      'Nikola Tesla',
      'Thomas Edison',
      'Alexander Graham Bell',
      'Albert Einstein'
    ],
    correctIndex: 1,
    difficulty: 'vua',
    category: 'Nhân Vật Nổi Tiếng',
    explanation: 'Thomas Edison đã hoàn thiện bóng đèn sợi đốt bền bỉ có giá trị thương mại và thành lập nhà máy điện đầu tiên.'
  },
  {
    id: 'v6',
    question: 'Nếu vô tình bị ong vò vẽ hoặc ong bắp cày đốt, tại sao KHÔNG NÊN cố nặn ép vòi độc bằng tay trần?',
    options: [
      'Ong vò vẽ không để lại ngòi, việc bóp ép chỉ đẩy thêm nọc độc lan sâu vào mô',
      'Làm như vậy đàn ong sẽ bay tới đốt tiếp',
      'Nặn ra sẽ làm da bị đổi thành màu đen vĩnh viễn',
      'Chất độc sẽ bốc hơi qua lỗ chân lông'
    ],
    correctIndex: 0,
    difficulty: 'vua',
    category: 'Sơ Cứu Đời Sống',
    explanation: 'Khác với ong mật (để lại túi độc), ong bắp cày không đứt ngòi. Bóp nắn chỉ làm bầm dập và phát tán nọc độc nhanh hơn.'
  },
  {
    id: 'v7',
    question: 'Động vật có vú nào là loài duy nhất trên Trái Đất có khả năng bay lượn thực sự?',
    options: [
      'Sóc bay',
      'Dơi',
      'Vượn cáo bay',
      'Cá chuồn'
    ],
    correctIndex: 1,
    difficulty: 'vua',
    category: 'Sinh Học & Tự Nhiên',
    explanation: 'Sóc bay hay chồn bay chỉ lượn (glide) nhờ màng da. Dơi là động vật có vú duy nhất có cánh đập chủ động để bay lượn.'
  },
  {
    id: 'v8',
    question: 'Tại sao mặt trong của phích nước (bình thủy giữ nhiệt) lại được tráng một lớp bạc tráng gương?',
    options: [
      'Để ngăn chặn vi khuẩn sinh sôi trong nước sôi',
      'Để phản xạ bức xạ nhiệt ngược lại bên trong, giảm thất thoát nhiệt',
      'Để nước có vị ngọt thanh hơn',
      'Để làm vỏ phích cứng cáp khó vỡ hơn'
    ],
    correctIndex: 1,
    difficulty: 'vua',
    category: 'Ứng Dụng Đời Sống',
    explanation: 'Lớp tráng bạc sáng bóng có tác dụng phản xạ tia hồng ngoại (bức xạ nhiệt) trở lại lòng phích, kết hợp lớp chân không giúp giữ nước nóng lâu.'
  },
  {
    id: 'v9',
    question: 'Thành phố nào trên thế giới nổi tiếng với hệ thống kênh rạch chằng chịt và thuyền Gondola đặc trưng?',
    options: [
      'Amsterdam (Hà Lan)',
      'Venice (Ý)',
      'Bruges (Bỉ)',
      'St. Petersburg (Nga)'
    ],
    correctIndex: 1,
    difficulty: 'vua',
    category: 'Văn Hóa Thế Giới',
    explanation: 'Venice (Venezia) của Ý là thành phố nổi trên sông nước huyền thoại với hơn 400 cây cầu và những chiếc thuyền Gondola lãng mạn.'
  },
  {
    id: 'v10',
    question: 'Tại sao dầu mỡ cháy trên chảo rán lại TUYỆT ĐỐI KHÔNG ĐƯỢC dập bằng nước?',
    options: [
      'Nước làm lạnh chảo quá nhanh gây vỡ chảo',
      'Nước nặng hơn dầu chìm xuống đáy, sôi tức thì bốc hơi đẩy dầu nóng bắn tung tóe tạo cầu lửa',
      'Nước phản ứng hóa học với dầu biến thành khí gas độc',
      'Nước sẽ biến dầu thành axit gây ăn mòn'
    ],
    correctIndex: 1,
    difficulty: 'vua',
    category: 'An Toàn Nhà Bếp',
    explanation: 'Nhiệt độ dầu cháy > 300°C. Nước rót vào sẽ biến thành hơi giãn nở gấp 1.700 lần trong tích tắc, bắn dầu sôi thành đám mây lửa khổng lồ!'
  },

  // ==================== CẤP ĐỘ: KHÓ (Hiện tượng khoa học, xã hội, danh nhân) ====================
  {
    id: 'k1',
    question: 'Hiện tượng "Dejavu" (Ký ức ảo giác - cảm giác như đã từng trải qua khoảnh khắc này) bắt nguồn từ cơ chế não bộ nào?',
    options: [
      'Sự sai lệch đồng bộ trong quá trình truyền tín hiệu giữa các vùng nhớ ở thùy thái dương',
      'Người đó thực sự đã mơ thấy tương lai vài năm trước',
      'Não bộ bị thiếu oxy trong vòng 5 giây',
      'Sự thay đổi từ trường Trái Đất tác động lên nơron'
    ],
    correctIndex: 0,
    difficulty: 'kho',
    category: 'Tâm Lý & Não Bộ',
    explanation: 'Các nhà thần kinh học cho rằng Deja vu xảy ra khi có sự chậm trễ hoặc lệch mili-giây giữa đường truyền nhận thức hiện tại và lưu trữ trí nhớ dài hạn.'
  },
  {
    id: 'k2',
    question: 'Bức tranh nàng Mona Lisa nổi tiếng của Leonardo da Vinci hiện đang được trưng bày tại bảo tàng nào?',
    options: [
      'Bảo tàng Anh (British Museum)',
      'Bảo tàng Louvre (Pháp)',
      'Bảo tàng Vatican (Ý)',
      'Bảo tàng Prado (Tây Ban Nha)'
    ],
    correctIndex: 1,
    difficulty: 'kho',
    category: 'Nghệ Thuật & Danh Tác',
    explanation: 'Bức họa Mona Lisa được trưng bày sau lớp kính chống đạn tại bảo tàng Louvre ở Paris, Pháp và thu hút hàng triệu lượt khách mỗi năm.'
  },
  {
    id: 'k3',
    question: 'Tại sao việc rải muối lên mặt đường phủ băng tuyết ở các nước hàn đới lại làm tan băng?',
    options: [
      'Muối phản ứng hóa học tỏa nhiệt lượng cực lớn làm tan băng',
      'Nước muối có nhiệt độ đóng băng thấp hơn nhiều so với 0°C của nước tinh khiết',
      'Muối làm tăng ma sát của lốp xe tạo nhiệt',
      'Muối hấp thụ tia tử ngoại mặt trời đốt nóng tuyết'
    ],
    correctIndex: 1,
    difficulty: 'kho',
    category: 'Hóa Học Đời Sống',
    explanation: 'Hòa tan chất tan vào dung môi làm giảm nhiệt độ đông đặc (Freezing-point depression). Dung dịch nước muối có thể duy trì trạng thái lỏng ở -10°C tới -18°C.'
  },
  {
    id: 'k4',
    question: 'Bán đảo Scandinavia tại Bắc Âu theo nghĩa địa lý và văn hóa chặt chẽ gồm những quốc gia nào?',
    options: [
      'Na Uy, Thụy Điển, Đan Mạch',
      'Phần Lan, Ba Lan, Đức',
      'Iceland, Ireland, Anh',
      'Thụy Sĩ, Áo, Na Uy'
    ],
    correctIndex: 0,
    difficulty: 'kho',
    category: 'Địa Lý & Văn Hóa',
    explanation: 'Về mặt lịch sử và ngôn ngữ, Scandinavia bao gồm ba vương quốc Na Uy, Thụy Điển và Đan Mạch. Phần Lan và Iceland thường được gộp vào nhóm các nước Bắc Âu (Nordic).'
  },
  {
    id: 'k5',
    question: 'Tại sao chúng ta nghe giọng nói của chính mình khi thu âm lại nghe rất khác (và thường thấy lạ lẫm)?',
    options: [
      'Microphone của điện thoại luôn làm méo tần số âm thanh',
      'Khi nói bình thường, ta nghe qua cả dẫn truyền xương sọ (tăng âm trầm), còn bản thu chỉ qua dẫn truyền không khí',
      'Não bộ chủ động lọc bỏ các tần số cao của giọng nói',
      'Âm thanh trong phòng kín làm thay đổi cao độ'
    ],
    correctIndex: 1,
    difficulty: 'kho',
    category: 'Âm Thanh & Con Người',
    explanation: 'Xương sọ rung động khuếch đại các tần số thấp (trầm ấm). Khi nghe bản thu, ta chỉ nghe sóng âm qua không khí giống người ngoài nghe ta, nên thấy giọng mỏng và lạ!'
  },
  {
    id: 'k6',
    question: 'Tác phẩm "Bàn cờ thế giới" hay lý thuyết chọn lọc tự nhiên làm thay đổi thế giới do nhà khoa học vĩ đại nào công bố?',
    options: [
      'Gregor Mendel',
      'Charles Darwin',
      'Louis Pasteur',
      'James Watson'
    ],
    correctIndex: 1,
    difficulty: 'kho',
    category: 'Khoa Học Lịch Sử',
    explanation: 'Charles Darwin công bố cuốn sách "Nguồn gốc các loài" (On the Origin of Species) năm 1859, đặt nền móng cho thuyết tiến hóa hiện đại.'
  },
  {
    id: 'k7',
    question: 'Hội chứng "Say xe" (Motion Sickness) phát sinh chủ yếu do nguyên nhân nào sau đây?',
    options: [
      'Dạ dày bị đảo lộn do xe xóc nảy liên tục',
      'Sự mâu thuẫn tín hiệu giữa mắt nhìn (tưởng tĩnh) và hệ tiền đình trong tai trong (cảm nhận đang di chuyển)',
      'Hít phải khí xả CO2 từ ống xả xe',
      'Áp suất không khí trong xe tăng đột ngột'
    ],
    correctIndex: 1,
    difficulty: 'kho',
    category: 'Y Học Thường Thức',
    explanation: 'Não nhận tín hiệu đối nghịch: mắt nhìn vào điện thoại thấy tĩnh, nhưng tai trong cảm nhận gia tốc rung lắc. Não hiểu nhầm cơ thể bị trúng độc và gây buồn nôn!'
  },
  {
    id: 'k8',
    question: 'Giải thưởng Nobel danh giá KHÔNG được trao cho lĩnh vực nào sau đây?',
    options: [
      'Văn học',
      'Toán học',
      'Hòa bình',
      'Hóa học'
    ],
    correctIndex: 1,
    difficulty: 'kho',
    category: 'Kiến Thức Danh Giá',
    explanation: 'Trong di chúc của Alfred Nobel không có giải Toán học. Thay vào đó, giải Fields và giải Abel được coi là tương đương Nobel trong giới Toán học.'
  },
  {
    id: 'k9',
    question: 'Hiện tượng "Hiệu ứng cánh bướm" (Butterfly Effect) nổi tiếng trong lý thuyết hỗn loạn mang ý nghĩa cốt lõi gì?',
    options: [
      'Cánh bướm đập ở Brazil có thể gây ra cơn lốc xoáy ở Texas (Một thay đổi cực nhỏ ban đầu có thể tạo ra hệ quả khổng lồ về sau)',
      'Loài bướm có khả năng dự báo thời tiết chuẩn xác hơn vệ tinh',
      'Mọi loài côn trùng đều có vai trò ngang nhau trong chuỗi thức ăn',
      'Vẻ đẹp mỏng manh luôn ẩn chứa sức mạnh hủy diệt'
    ],
    correctIndex: 0,
    difficulty: 'kho',
    category: 'Khoa Học & Triết Lý',
    explanation: 'Nhà khí tượng học Edward Lorenz phát hiện tính nhạy cảm với điều kiện ban đầu trong các hệ phi tuyến tính: sai số vi mô dẫn đến kết quả hoàn toàn khác biệt.'
  },
  {
    id: 'k10',
    question: 'Hành tinh nào trong Hệ Mặt trời có thời gian tự quay 1 vòng quanh trục lâu hơn cả thời gian nó quay 1 vòng quanh Mặt trời?',
    options: [
      'Sao Hỏa (Mars)',
      'Sao Kim (Venus)',
      'Sao Thủy (Mercury)',
      'Sao Mộc (Jupiter)'
    ],
    correctIndex: 1,
    difficulty: 'kho',
    category: 'Vũ Trụ & Thiên Văn',
    explanation: 'Sao Kim mất 243 ngày Trái Đất để tự quay 1 vòng, nhưng chỉ mất 225 ngày để quay quanh Mặt trời. Một ngày ở Sao Kim dài hơn một năm của nó!'
  },

  // ==================== CẤP ĐỘ: CHUYÊN GIA (Quy luật sâu sắc, logic, hiện tượng ngoạn mục) ====================
  {
    id: 'cg1',
    question: 'Hiệu ứng Mpemba là một nghịch lý nhiệt động học nổi tiếng quan sát thấy điều gì?',
    options: [
      'Nước nóng trong một số điều kiện nhất định có thể đóng băng nhanh hơn nước lạnh',
      'Kim loại nóng dẫn điện tốt hơn kim loại lạnh',
      'Nước đá ở -10°C bốc hơi nhanh hơn nước đá ở -1°C',
      'Không khí ẩm nhẹ hơn không khí khô'
    ],
    correctIndex: 0,
    difficulty: 'chuyen_gia',
    category: 'Nghịch Lý Vật Lý',
    explanation: 'Được học sinh Erasto Mpemba phát hiện lại năm 1963: Nước nóng bay hơi nhanh giảm khối lượng, đối lưu mạnh hơn và phá vỡ liên kết hydro giúp đông đá sớm hơn.'
  },
  {
    id: 'cg2',
    question: 'Tại sao khi ta nhìn đồng hồ kim giây nhảy, đôi khi có cảm giác giây đầu tiên dừng lại lâu một cách kỳ lạ? (Hiệu ứng Chronostasis)',
    options: [
      'Đồng hồ cơ bị kẹt bánh răng định kỳ',
      'Hiện tượng che mờ thị giác khi đảo mắt (Saccadic Masking): Não bộ tự bù đắp hình ảnh của khoảnh khắc mắt di chuyển bằng khung hình nhìn thấy tiếp theo',
      'Nhịp tim lúc đó bị chậm lại 1 nhịp',
      'Võng mạc bị quá tải ánh sáng'
    ],
    correctIndex: 1,
    difficulty: 'chuyen_gia',
    category: 'Ảo Giác Nhận Thức',
    explanation: 'Khi mắt đảo nhanh từ nơi khác sang đồng hồ, não tạm ngắt xử lý thị giác để tránh mờ nhòe, sau đó não "kéo dài" thời gian của hình ảnh tĩnh vừa tới ngược về quá khứ!'
  },
  {
    id: 'cg3',
    question: 'Trong kinh tế học và tâm lý học hành vi, "Hiệu ứng Sunk Cost" (Chi phí chìm) khiến con người thường mắc sai lầm gì?',
    options: [
      'Chỉ mua những món hàng có giá trị giảm giá sâu',
      'Tiếp tục dồn tiền bạc/thời gian vào một dự án thua lỗ chỉ vì tiếc những gì đã bỏ ra trước đó',
      'Sợ hãi không dám đầu tư vào bất kỳ cơ hội mới nào',
      'Luôn so sánh thu nhập của mình với hàng xóm'
    ],
    correctIndex: 1,
    difficulty: 'chuyen_gia',
    category: 'Tâm Lý Học Hành Vi',
    explanation: 'Chi phí chìm là khoản đã mất không thể lấy lại. Quyết định duy lý phải dựa trên lợi ích tương lai, nhưng con người hay bám víu vì tiếc nuối dẫn đến tổn thất lớn hơn.'
  },
  {
    id: 'cg4',
    question: 'Điều nghịch lý nào sau đây là sự thật về loài chuối tiêu phổ biến mà cả thế giới đang ăn ngày nay (Cavendish)?',
    options: [
      'Tất cả các cây chuối Cavendish thương mại đều là bản sao vô tính (clone) giống hệt nhau về gene',
      'Chuối Cavendish thực chất là một giống cây họ cọ',
      'Hạt chuối nằm ở cuống quả và có thể gieo mầm bình thường',
      'Chuối chín vàng là do hấp thụ chất diệp lục từ ánh sáng đèn huỳnh quang'
    ],
    correctIndex: 0,
    difficulty: 'chuyen_gia',
    category: 'Sinh Học Ứng Dụng',
    explanation: 'Chuối Cavendish là giống tam bội bất thụ (không hạt), được nhân giống bằng củ/chồi. Toàn bộ cây chuối đều là bản sao vô tính, khiến chúng cực kỳ dễ bị một chủng nấm duy nhất xóa sổ!'
  },
  {
    id: 'cg5',
    question: 'Tàu Titanic chìm năm 1912 vì đâm vào tảng băng trôi. Tại sao một con tàu thép khổng lồ lại bị thủng toạc dễ dàng bởi băng đá?',
    options: [
      'Đá ngầm ẩn bên dưới tảng băng chứ không phải băng',
      'Thép thân tàu có hàm lượng lưu huỳnh và phốt pho cao, trong nước biển băng giá (-2°C) kim loại bị chuyển hóa từ dẻo sang giòn (Ductile-to-Brittle transition)',
      'Thuyền trưởng đã cho nổ khoang than để thoát hiểm',
      'Vỏ tàu Titanic làm bằng hợp kim thiếc siêu mỏng'
    ],
    correctIndex: 1,
    difficulty: 'chuyen_gia',
    category: 'Khoa Học Vật Liệu',
    explanation: 'Phân tích luyện kim hiện đại cho thấy đinh tán và thép của Titanic trong điều kiện dưới 0°C trở nên giòn như thủy tinh, đinh tán bị tiện đứt khi va chạm thay vì uốn cong.'
  },
  {
    id: 'cg6',
    question: 'Tại sao máy bay thương mại lại có một lỗ nhỏ li ti (Bleed hole) trên mỗi cửa sổ hành khách?',
    options: [
      'Để hành khách có thể hít thở nếu khoang thiếu oxy khẩn cấp',
      'Để cân bằng chênh lệch áp suất không khí giữa các lớp kính và ngăn hơi ẩm làm mờ kính',
      'Để luồn dây cáp cảm biến an toàn hàng không',
      'Là lỗi gia công không thể khắc phục của ngành kính'
    ],
    correctIndex: 1,
    difficulty: 'chuyen_gia',
    category: 'Kỹ Thuật Hàng Không',
    explanation: 'Cửa sổ gồm 3 lớp: Lớp ngoài chịu áp lực cabin, lớp giữa có lỗ thở giúp cân bằng áp lực và hút ẩm giúp kính không bị đọng sương đóng tuyết ở độ cao 10.000m.'
  },
  {
    id: 'cg7',
    question: 'Hiện tượng "Hiệu ứng Dunning-Kruger" mô tả thiên kiến nhận thức nào ở con người?',
    options: [
      'Người có năng lực kém thường đánh giá quá cao kiến thức của bản thân, trong khi người thực sự giỏi lại hay đánh giá thấp chính mình',
      'Càng nhiều tuổi con người càng có trí nhớ tốt hơn về quá khứ',
      'Trực giác của người làm việc lâu năm luôn chuẩn xác 100%',
      'Cảm giác thèm ăn tăng vọt khi làm việc căng thẳng'
    ],
    correctIndex: 0,
    difficulty: 'chuyen_gia',
    category: 'Tâm Lý Nhận Thức',
    explanation: 'Dunning và Kruger (1999) chứng minh người thiếu kiến thức thường thiếu luôn cả siêu nhận thức để nhận ra sự thiếu sót của mình, dẫn đến tự tin thái quá!'
  },
  {
    id: 'cg8',
    question: 'Trong quy luật âm học phòng hòa nhạc cổ điển, tại sao ghế ngồi lại được bọc nỉ dày với mật độ hấp thụ âm chuẩn xác?',
    options: [
      'Để giữ ấm cho khán giả mùa đông',
      'Để đảm bảo âm học của khán phòng không bị thay đổi quá nhiều dù phòng đầy khách hay trống ghế',
      'Để khán giả không gây ra tiếng cót két khi cựa mình',
      'Để giảm nguy cơ cháy nổ'
    ],
    correctIndex: 1,
    difficulty: 'chuyen_gia',
    category: 'Âm Học Kiến Trúc',
    explanation: 'Cơ thể người mặc quần áo hấp thụ âm thanh rất nhiều. Ghế rỗng bọc nỉ có hệ số hấp thụ âm tương đương một người ngồi, giúp âm thanh biểu diễn tổng duyệt giống hệt đêm diễn chính thức!'
  },
  {
    id: 'cg9',
    question: 'Tác dụng của "Gương một chiều" (One-way mirror) trong các phòng thẩm vấn phim ảnh dựa trên nguyên lý vật lý nào?',
    options: [
      'Chế tạo từ tinh thể phân cực ánh sáng một chiều đặc biệt',
      'Sự chênh lệch cường độ ánh sáng cực lớn giữa 2 phòng kết hợp với lớp phủ bán mạ bạc phản xạ một phần',
      'Kính được cấp dòng điện cao tần chạy xuyên suốt',
      'Mặt sau của kính được sơn một lớp nano hấp thụ photon'
    ],
    correctIndex: 1,
    difficulty: 'chuyen_gia',
    category: 'Quang Học Ứng Dụng',
    explanation: 'Kính thực chất là bán mạ (cho 50% ánh sáng qua, 50% phản xạ). Phòng thẩm vấn bật đèn cực sáng lấn át ánh sáng yếu mờ từ phòng quan sát tối bên kia.'
  },
  {
    id: 'cg10',
    question: 'Hiện tượng "Hội chứng Kính vỡ" (Broken Windows Theory) trong xã hội học đô thị khẳng định điều gì?',
    options: [
      'Kính nhà cửa bị vỡ là dấu hiệu của động đất sắp tới',
      'Những hành vi phạm trật tự nhỏ không được xử lý ngay (như cửa kính vỡ, rác bừa bãi) sẽ tạo tín hiệu dung túng cho tội phạm lớn hơn phát triển',
      'Nhà cao tầng có nhiều kính sẽ làm gia tăng nhiệt độ đô thị',
      'Trẻ em lớn lên ở khu ổ chuột sẽ có thị lực kém'
    ],
    correctIndex: 1,
    difficulty: 'chuyen_gia',
    category: 'Xã Hội Học',
    explanation: 'Do James Q. Wilson và George L. Kelling đề xuất năm 1982: Một ô kính vỡ không ai sửa sẽ nhanh chóng dẫn đến nhiều ô kính vỡ khác và sự suy tàn an ninh toàn khu vực.'
  }
];

export const DIFFICULTY_LABELS: Record<string, { label: string; desc: string; color: string; bg: string; border: string }> = {
  nhanh: {
    label: 'Nhanh (Khởi Động)',
    desc: 'Mẹo sống & thường thức quen thuộc, phản xạ thần tốc',
    color: 'text-emerald-700 dark:text-emerald-300',
    bg: 'bg-emerald-50 dark:bg-emerald-950/50',
    border: 'border-emerald-300 dark:border-emerald-700'
  },
  vua: {
    label: 'Vừa (Thường Thức)',
    desc: 'Khoa học đời sống & hiện tượng tự nhiên thú vị',
    color: 'text-sky-700 dark:text-sky-300',
    bg: 'bg-sky-50 dark:bg-sky-950/50',
    border: 'border-sky-300 dark:border-sky-700'
  },
  kho: {
    label: 'Khó (Thử Thách)',
    desc: 'Hiện tượng kỳ thú, lịch sử, văn hóa và danh tác',
    color: 'text-amber-700 dark:text-amber-300',
    bg: 'bg-amber-50 dark:bg-amber-950/50',
    border: 'border-amber-300 dark:border-amber-700'
  },
  chuyen_gia: {
    label: 'Chuyên Gia (Đỉnh Cao)',
    desc: 'Nghịch lý khoa học, quy luật sâu sắc và tư duy phản biện',
    color: 'text-purple-700 dark:text-purple-300',
    bg: 'bg-purple-50 dark:bg-purple-950/50',
    border: 'border-purple-300 dark:border-purple-700'
  },
  progressive: {
    label: 'Tăng Tiến 10 Câu (Hấp Dẫn)',
    desc: 'Leo thang kịch tính: 3 câu Nhanh → 3 câu Vừa → 2 câu Khó → 2 câu Chuyên Gia',
    color: 'text-rose-700 dark:text-rose-300',
    bg: 'bg-rose-50 dark:bg-rose-950/50',
    border: 'border-rose-300 dark:border-rose-700'
  }
};
