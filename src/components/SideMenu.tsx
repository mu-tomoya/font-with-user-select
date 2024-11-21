import { useSideMenuHook } from "./SideMenu.hook";

const SideMenu: React.FC = () => {
  const {
    fontFamily,
    letterSpacing,
    lineHeight,
    toggleMenu,
    menuOpen,
    menuRef,
    handleChangeFontFamily,
    handleChangeFontName,
    handleChangeLetterSpacing,
    handleChangeLineHeight,
    handleReset,
  } = useSideMenuHook();
  return (
    <div className="side-menu-component">
      <button className="menu-button" onClick={toggleMenu}>
        メニューを開く
      </button>
      <div ref={menuRef} className={`side-menu ${menuOpen ? "open" : ""}`}>
        <form name="setting">
          <div className="button-group">
            <fieldset>
              <legend>フォントを選択する</legend>
              <label>
                <input
                  type="radio"
                  value="Default"
                  checked={fontFamily === "Default"}
                  onChange={handleChangeFontFamily}
                />
                デフォルト
              </label>
              <label>
                <input
                  type="radio"
                  value="UD"
                  checked={fontFamily === "UD"}
                  onChange={handleChangeFontFamily}
                />
                UDフォント
              </label>
              <label>
                <input
                  type="radio"
                  value="Custom"
                  checked={fontFamily === "Custom"}
                  onChange={handleChangeFontFamily}
                />
                自分で設定する
              </label>
              {fontFamily === "Custom" && (
                <div aria-live="assertive">
                  <label htmlFor="fontFamily">フォント名</label>
                  <input id="fontFamily" type="text" onChange={handleChangeFontName} />
                </div>
              )}
            </fieldset>
          </div>
          <div className="button-group">
            <label htmlFor="letter-spacing">文字間隔</label>
            <input
              id="letter-spacing"
              type="number"
              step="0.1"
              min={-2}
              max={3}
              value={letterSpacing}
              onChange={handleChangeLetterSpacing}
            />
          </div>
          <div className="button-group">
            <label htmlFor="line-height">行間</label>
            <input
              id="line-height"
              type="number"
              step="0.1"
              min={0.5}
              max={3}
              value={lineHeight}
              onChange={handleChangeLineHeight}
            />
          </div>
          <div className="button-group">
            <button type="button" onClick={handleReset}>
              設定をリセット
            </button>
          </div>
          <div className="button-group">
            <button type="button" onClick={toggleMenu}>
              メニューを閉じる
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SideMenu;
