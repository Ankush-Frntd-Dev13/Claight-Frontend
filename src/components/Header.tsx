const Header = () => {
  return (
    <header
      role="banner"
      className="sticky top-0 z-40 flex items-center justify-between h-16 px-6 bg-white border-b border-border"
    >
      {/* Left - Page context */}
      <div className="flex items-center gap-3">
        {/* Can show breadcrumb or page title here */}
      </div>

      {/* Right - User actions */}
      <div className="flex items-center gap-3">
        {/* User Avatar */}
        <div className="w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-semibold cursor-pointer">
          JD
        </div>
      </div>
    </header>
  )
}

export default Header
