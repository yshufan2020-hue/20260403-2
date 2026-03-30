import React, { useState, useEffect } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Info,
  CheckCircle2,
  ChevronRight,
  Image as ImageIcon,
  ChevronLeft,
  Star,
} from "lucide-react";

export default function App() {
  // 🌟 終極解決方案：自動載入 Tailwind CSS 樣式 (解決預覽跑版問題)
  useEffect(() => {
    if (!document.querySelector('script[src="https://cdn.tailwindcss.com"]')) {
      const script = document.createElement("script");
      script.src = "https://cdn.tailwindcss.com";
      document.head.appendChild(script);
    }
    // 強制清除 CodeSandbox 預設的置中樣式干擾
    document.body.style.textAlign = "left";
    document.body.style.margin = "0";
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle, submitting, success
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 預設的三張 MODEL 輪播照片
  const modelImages = [
    "https://duk.tw/2f0WtF.jpg",
    "https://duk.tw/x4eRL4.jpg",
    "https://duk.tw/BLqhB8.jpg",
  ];

  const nextSlide = () =>
    setCurrentImageIndex((prev) => (prev + 1) % modelImages.length);
  const prevSlide = () =>
    setCurrentImageIndex(
      (prev) => (prev - 1 + modelImages.length) % modelImages.length
    );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("submitting");

    // ==========================================
    // 請將下方單引號內的網址，替換為您部署後取得的「網頁應用程式網址」
    // (例如：'https://script.google.com/macros/s/AKfyc.../exec')
    // ==========================================
    const GOOGLE_APPS_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbyED-yw4qmIfXuCBCkW3l8rSVVq_SXT2NqFzUIQkNaiyyUrMEBskw1Z6932XDX3HUWq8A/exec";

    // 檢查網址是否已經替換，若尚未替換則模擬成功狀態以避免 fetch 錯誤
    if (!GOOGLE_APPS_SCRIPT_URL.startsWith("http")) {
      console.warn(
        "提示：尚未設定真實的 Google Apps Script 網址，此為模擬成功狀態。"
      );
      setTimeout(() => {
        setSubmitStatus("success");
      }, 1000);
      return;
    }

    // 將資料打包成表單格式
    const submitData = new URLSearchParams();
    submitData.append("name", formData.name);
    submitData.append("phone", formData.phone);
    submitData.append("email", formData.email);
    submitData.append("message", formData.message);

    try {
      // 發送 POST 請求到您的 Google Apps Script
      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        body: submitData,
        // 使用 no-cors 避免瀏覽器的跨域阻擋問題
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      // 只要成功發送即顯示成功畫面
      setSubmitStatus("success");
    } catch (error) {
      console.error("報名發生錯誤:", error);
      alert("送出失敗，請稍後再試或直接聯繫主辦單位。");
      setSubmitStatus("idle");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-amber-500 selection:text-slate-900">
      {/* 導覽列 */}
      <nav className="fixed w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="https://duk.tw/DAFpSo.jpg"
              alt=""
              className="w-8 h-8 object-cover rounded-full border border-amber-500 shadow-sm shadow-amber-500/20"
            />
            <span className="text-xl font-bold tracking-wider text-white">
              光合影<span className="text-amber-500">外拍團</span>
            </span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <a href="#about" className="hover:text-amber-400 transition-colors">
              活動內容
            </a>
            <a
              href="#register"
              className="text-amber-500 hover:text-amber-400 transition-colors"
            >
              立即報名
            </a>
          </div>
        </div>
      </nav>

      {/* 英雄區塊 (Hero Section) */}
      <header className="relative pt-28 pb-20 md:pt-40 md:pb-28 flex items-center justify-center overflow-hidden">
        {/* 背景圖片疊加層 */}
        <div className="absolute inset-0 z-0 bg-slate-950">
          <img
            src="https://duk.tw/eUMI8D.jpg"
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/20"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          {/* 主標題區塊 */}
          <h1 className="flex flex-wrap items-center justify-center gap-x-4 gap-y-4 text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-5 tracking-tight leading-snug w-full">
            <span className="inline-flex flex-col items-center justify-center px-[0.5em] py-[0.4em] rounded-[0.15em] bg-amber-500 text-slate-900 text-[0.35em] font-black tracking-widest shadow-lg border-[0.08em] border-amber-600/50 transform -rotate-3 shrink-0">
              <span className="leading-none mb-[0.1em]">早鳥</span>
              <span className="leading-none">優惠</span>
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 drop-shadow-lg text-center">
              好久不見~百變恩恩
            </span>
          </h1>

          {/* 副標題 */}
          <h2 className="text-2xl md:text-4xl font-bold text-slate-100 mb-10 tracking-widest drop-shadow-md">
            <span className="text-pink-500 mx-3 text-4xl align-middle">+</span>{" "}
            性感角色服&性感內衣棚拍(2350元/8人價)
          </h2>

          {/* 時間膠囊 */}
          <div className="inline-flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-lg md:text-xl text-slate-200 mb-10 bg-slate-800/80 py-4 px-10 rounded-full backdrop-blur-md border border-slate-600 shadow-xl">
            <div className="flex items-center">
              <Calendar className="w-6 h-6 mr-3 text-amber-500" />
              <span className="font-medium tracking-wide">4/03 (五)</span>
            </div>
            <div className="hidden sm:block text-slate-500/60">|</div>
            <div className="flex items-center">
              <Clock className="w-6 h-6 mr-3 text-amber-500" />
              <span className="font-medium tracking-wide">19:00 - 22:00</span>
            </div>
          </div>

          {/* 主辦人資訊 */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-slate-300 mb-12 text-base md:text-lg font-medium tracking-wider drop-shadow-md">
            <div className="flex items-center bg-slate-900/40 px-4 py-2 rounded-lg backdrop-blur-sm border border-slate-700/50">
              <User className="w-5 h-5 mr-2 text-amber-500 opacity-90" />
              <span>
                主辦團長：林子凱{" "}
                <span className="text-sm text-slate-400 font-normal tracking-normal ml-1">
                  (Line ID:mrkill1234)
                </span>
              </span>
            </div>
            <div className="flex items-center bg-slate-900/40 px-4 py-2 rounded-lg backdrop-blur-sm border border-slate-700/50">
              <User className="w-5 h-5 mr-2 text-amber-500 opacity-90" />
              <span>協辦團長：阿文</span>
            </div>
          </div>

          {/* 報名按鈕 */}
          <a
            href="#register"
            className="inline-flex items-center justify-center px-12 py-5 text-lg font-bold text-slate-900 bg-amber-500 rounded-full hover:bg-amber-400 transition-all transform hover:-translate-y-1 shadow-[0_8px_30px_rgba(245,158,11,0.3)] hover:shadow-[0_8px_40px_rgba(245,158,11,0.5)] tracking-widest"
          >
            立即報名
            <ChevronRight className="ml-2 w-6 h-6" />
          </a>
        </div>
      </header>

      {/* 活動介紹區塊 (包含輪播圖與 5 大資訊) */}
      <section id="about" className="py-20 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* 左側：MODEL 照片輪播 */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group border border-slate-700/50 aspect-[4/5] md:aspect-square lg:aspect-[4/5] bg-slate-800">
              {modelImages.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentImageIndex
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              {/* 輪播控制按鈕 */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900/60 hover:bg-amber-500 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 z-20"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900/60 hover:bg-amber-500 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 z-20"
              >
                <ChevronRight className="w-7 h-7" />
              </button>

              {/* 輪播指示點 */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20 bg-slate-900/40 px-4 py-2 rounded-full backdrop-blur-sm">
                {modelImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-amber-500 w-8"
                        : "bg-white/60 w-2.5 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* 右側：活動資訊列表 */}
            <div className="space-y-5">
              <h3 className="text-3xl font-extrabold text-amber-500 mb-8 px-2 tracking-wide drop-shadow-sm">
                活動內容
              </h3>

              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60 hover:border-amber-500/60 hover:bg-slate-800 transition-all duration-300 flex items-start group shadow-lg">
                <Star className="w-8 h-8 text-amber-500 mr-5 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="text-xl font-bold text-white mb-2 tracking-wide">
                    1. MODEL
                  </h4>
                  <div className="text-slate-300 mb-3 flex flex-col items-start gap-1 text-base leading-relaxed">
                    <span>
                      特約模特兒{" "}
                      <span className="text-2xl font-bold text-pink-500 mx-1 drop-shadow-sm">
                        恩恩
                      </span>
                      (160/42；32E)
                    </span>
                    <span className="text-slate-400 mt-1">
                      服裝：性感內衣x2
                      <br />
                      內衣尺度的性感角色服x1
                    </span>
                  </div>
                  <div className="text-slate-300 mb-2 flex items-center flex-wrap gap-2">
                    <span className="text-slate-500 mr-1">社群粉專:</span>
                    <a
                      href="https://www.instagram.com/mido_0216/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 hover:underline transition-colors break-all"
                    >
                      https://www.instagram.com/mido_0216/
                    </a>
                  </div>
                  <p className="text-base text-slate-400 mt-2">
                    擁有豐富外拍與時裝拍攝經驗。
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60 hover:border-amber-500/60 hover:bg-slate-800 transition-all duration-300 flex items-start group shadow-lg">
                <Clock className="w-8 h-8 text-amber-500 mr-5 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="text-xl font-bold text-white mb-2 tracking-wide">
                    2. 時間
                  </h4>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    2026年 4月 03日 (週五) <br className="sm:hidden" />
                    <span className="text-amber-400 font-medium">
                      19:00 - 22:00
                    </span>
                    <span className="text-slate-400 text-base ml-2">
                      (集合時間：18:50)
                    </span>
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60 hover:border-amber-500/60 hover:bg-slate-800 transition-all duration-300 flex items-start group shadow-lg">
                <MapPin className="w-8 h-8 text-amber-500 mr-5 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div className="w-full">
                  <h4 className="text-xl font-bold text-white mb-2 tracking-wide">
                    3. 地點
                  </h4>
                  <div className="text-slate-300 text-base leading-relaxed">
                    <p className="text-lg">新北市板橋區仁化街28巷2號5F</p>
                    <p className="text-sm text-amber-500/80 mt-1 font-medium">
                      *拍攝地點:琴一棚
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-700/50">
                      <p className="text-amber-400 font-bold mb-2 tracking-wider">
                        交通資訊：
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-amber-500 font-bold mr-2">
                            1.
                          </span>
                          <span>
                            <strong className="text-white font-medium">
                              開車：
                            </strong>
                            美廉社隔壁的仁化停車場(板橋區仁化街54號的隔壁)&江翠國小停車場。
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 font-bold mr-2">
                            2.
                          </span>
                          <span>
                            <strong className="text-white font-medium">
                              捷運：
                            </strong>
                            江子翠捷運站五號出口(走路3分鐘即可到達)
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60 hover:border-amber-500/60 hover:bg-slate-800 transition-all duration-300 flex items-start group shadow-lg">
                <ImageIcon className="w-8 h-8 text-amber-500 mr-5 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="text-xl font-bold text-white mb-2 tracking-wide">
                    4. 費用
                  </h4>
                  <div className="text-slate-300 text-lg leading-relaxed">
                    <p className="mb-1">
                      報名費：4人{" "}
                      <span className="text-white font-bold">4400</span>, 5人{" "}
                      <span className="text-white font-bold">3600</span>, 6人{" "}
                      <span className="text-white font-bold">3000</span>, 7人{" "}
                      <span className="text-white font-bold">2650</span>, 8人{" "}
                      <span className="text-white font-bold">2350</span>元
                    </p>
                    <p className="text-amber-400 text-base font-medium mt-2 bg-amber-500/10 inline-block px-3 py-1 rounded-lg border border-amber-500/20">
                      (報名前三名可以獲得早鳥優惠100元)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60 hover:border-amber-500/60 hover:bg-slate-800 transition-all duration-300 flex items-start group shadow-lg">
                <Info className="w-8 h-8 text-amber-500 mr-5 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div className="w-full">
                  <h4 className="text-xl font-bold text-white mb-2 tracking-wide">
                    5. 注意事項
                  </h4>
                  <div className="text-slate-300 text-base leading-relaxed">
                    <p>
                      報名後請務必加入團長 LINE，活動期間請遵守攝影禮儀與指導。
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-700/50">
                      <p className="text-amber-400 font-bold mb-2 tracking-wider">
                        重要注意事項：
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-amber-500 font-bold mr-2">
                            1.
                          </span>
                          <span>
                            開拍前 7 天 (3/27前)
                            可無責取消，超過期限則不接受取消，報名未到須補繳全額報名費才能再參加其他活動。
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 font-bold mr-2">
                            2.
                          </span>
                          <span>現場繳交費用請自備零錢。</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 報名表單區塊 */}
      <section id="register" className="py-24 bg-slate-950/50">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="bg-slate-800 rounded-[2rem] shadow-2xl overflow-hidden border border-slate-700/50">
            <div className="grid grid-cols-1 md:grid-cols-5">
              {/* 表單側邊資訊 */}
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-10 lg:p-12 md:col-span-2 text-slate-900 flex flex-col justify-between">
                <div>
                  <h2 className="text-4xl font-extrabold mb-8 tracking-wide">
                    立即報名
                  </h2>

                  <div className="space-y-4 mb-10">
                    <p className="text-slate-900/90 text-lg font-medium leading-relaxed">
                      攝影的初心，往往源於對「美」的直覺捕捉。
                    </p>
                    <p className="text-slate-900/90 text-lg font-medium leading-relaxed">
                      您不需要背誦厚重的專業術語，即使您是第一次拿起相機的新手，在
                      Model
                      專業的肢體引導與深邃眼神下，您只需輕按快門，帶著好奇心，在快門聲中找回專注的快樂。
                    </p>
                  </div>

                  <ul className="space-y-5 bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-6 h-6 mr-3 shrink-0 text-slate-900 mt-0.5" />
                      <span className="font-bold text-lg">精選專業模特兒</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-6 h-6 mr-3 shrink-0 text-slate-900 mt-0.5" />
                      <span className="font-bold text-lg">
                        小班制 4－8 人分組拍攝
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-6 h-6 mr-3 shrink-0 text-slate-900 mt-0.5" />
                      <span className="font-bold text-lg">
                        備有反光板輔助拍攝
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-900/10">
                  <p className="text-sm font-bold opacity-80 uppercase tracking-wider">
                    聯絡方式
                  </p>
                  <p className="text-lg font-bold mt-1">
                    林子凱(Line ID:mrkill1234)
                  </p>
                </div>
              </div>

              {/* 表單內容 */}
              <div className="p-10 lg:p-12 md:col-span-3 bg-slate-800">
                {submitStatus === "success" ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                    <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                      <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                    <h3 className="text-3xl font-bold text-white tracking-wide">
                      報名成功！
                    </h3>
                    <p className="text-slate-300 text-lg max-w-sm leading-relaxed">
                      感謝您的參與！我們已收到您的報名資訊，將盡快與您聯繫。
                    </p>
                    <button
                      onClick={() => setSubmitStatus("idle")}
                      className="mt-8 px-8 py-3 border border-slate-600 rounded-full text-slate-300 hover:bg-slate-700 hover:text-white transition-all font-medium tracking-wide"
                    >
                      返回重新填寫
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <h3 className="text-3xl font-bold text-white mb-8 tracking-wide">
                      填寫資料
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-400 flex items-center tracking-wider">
                          <User className="w-4 h-4 mr-2 text-amber-500" /> 姓名
                          (LINE暱稱)
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-5 py-4 text-white text-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 transition-all placeholder:text-slate-600"
                          placeholder="例如：王小明"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-400 flex items-center tracking-wider">
                          <Phone className="w-4 h-4 mr-2 text-amber-500" />{" "}
                          連絡電話 (手機)
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-5 py-4 text-white text-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 transition-all placeholder:text-slate-600"
                          placeholder="例如：0912-345-678"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-400 flex items-center tracking-wider">
                        <Mail className="w-4 h-4 mr-2 text-amber-500" />{" "}
                        電子郵件{" "}
                        <span className="text-slate-500 text-xs ml-2 font-normal">
                          (非必填)
                        </span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-5 py-4 text-white text-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 transition-all placeholder:text-slate-600"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-400 flex items-center tracking-wider">
                        <Info className="w-4 h-4 mr-2 text-amber-500" /> 備註 /
                        想說的話
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full bg-slate-900/80 border border-slate-600 rounded-xl px-5 py-4 text-white text-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 transition-all resize-none placeholder:text-slate-600"
                        placeholder="是否有其他備註需求..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={submitStatus === "submitting"}
                      className="w-full py-4 bg-amber-500 text-slate-900 text-lg font-bold rounded-xl hover:bg-amber-400 transition-all transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(245,158,11,0.3)] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center tracking-widest"
                    >
                      {submitStatus === "submitting" ? (
                        <svg
                          className="animate-spin -ml-1 mr-3 h-6 w-6 text-slate-900"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        "送出報名"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 頁尾 */}
      <footer className="bg-slate-950 py-10 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <img
              src="https://duk.tw/DAFpSo.jpg"
              alt=""
              className="w-6 h-6 object-cover rounded-full opacity-60 grayscale hover:grayscale-0 transition-all duration-300"
            />
            <span className="text-lg font-bold tracking-widest text-slate-400">
              光合影<span className="text-slate-600">外拍團</span>
            </span>
          </div>
          <p className="text-slate-600 text-sm tracking-wide">
            &copy; 2026 光合影外拍團. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
