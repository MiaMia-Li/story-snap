const BackgroundLay = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background dark:bg-background">
      {/* 主渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80"></div>

      {/* 网格纹理 */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(var(--foreground) / 0.2) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}></div>

      {/* 动态光晕效果 */}
      <div className="absolute top-0 w-full h-[500px]">
        {/* 主光晕 */}
        <div className="absolute left-1/4 top-0 w-[500px] h-[500px]">
          <div className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full blur-[100px] animate-blob"></div>
        </div>

        {/* 次光晕 */}
        <div className="absolute right-1/4 top-20 w-[400px] h-[400px]">
          <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        </div>

        {/* 点缀光晕 */}
        <div className="absolute left-1/3 top-40 w-[300px] h-[300px]">
          <div className="absolute inset-0 bg-violet-500/10 dark:bg-violet-500/20 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* 渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
    </div>
  );
};

export default BackgroundLay;
