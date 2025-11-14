import React, { useMemo, useState } from "react";
import "../../index.scss";
import "./SideMenu.scss";
import { expandStyleProps } from "../../utils/styleSystem";

const DEFAULT_AVATAR_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX///8WFhgAAAD8/PwYGBoUFBYaGhwWFRn5+fkXFxgXFhrz8/MNDRDo6OgAAAQXFhvc3NwlJSfNzc6VlZWNjY1wcHDi4uLQ0NGhoaNKSkxVVVUTExPu7u+7u7uwsLH///yBgYNCQkR1dXfBwcEtLS9eXl6ZmZloaGg1NTdFRUWpqas9PTxQUE8rKy2Dg4VxcXOWoZakAAAP80lEQVR4nO1diWKjug4Fgyk0hhLShKRtMmnI1nX+/++e5AWysWUwTe/zubfTBYJ9sCzJsmxbloGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgQHAgf/wm1N23Tm46xfC4RScCgbyqmP9Vo6HNXfCOMnmC4F5lsShc+m23wXRdj5QG/2d7Yc2IwWYPdzP/o6AqG/9Zjm1/GS0+wBCUcTY3d39PX7dix8YiyK48rEbJf5PV7Md8l7lp9MZkqN2FSjSnE1TztKp0Eo3BC5yfvz4xEAWbdemtJwjXnNtkF/29Bj7v0RcsYrh9BO6GpCzvSp+kqMH97nQST+nofULlI4D0jkeAj2P2qr5KtpQNaRNPSA5HIO03jzFbEfI88Pd3d2DaqSaNhTf+SeeCdllP02gBI748jPQnEWjwff7+wfUnFj/+4c7BfUzv3p0P2jXzM+fd0PgCtRJNoR5J72MUhe+WMTVqucNh0PP4wo0YvLacSt7jGwS5/bcAB+0fLwjURBI9ah6WcDZeJ+r7WKepHGIiNNkvtiuPj3OOih6Kle8QRCRXQxm48bMpDMYBcSjwYFqodgeZL15nIcD/7xBHH8Qzh83a4LtTvNXYsMzPBKMBrfVhJaVvqF+sR/uCwkFel/fyYRfPjd06i+T5PsLSBaSev9go855S3tmUAY+erAGK6K6E2r+AJQLIU/bScOHTLZPhIDaQQmgqgOT1cCSI4+fgyObIv0kNnVd1XjctC3TARrHBk9BEzhIl8qIih7pUpt8pvL5P0mSV2CK/kteOepF5O39RTRvk7rJ+17e30h08BT0c6Y/7chxEX1BCXVzlQ/1epr70jttVDve0ni/P3/Cd6UMjYuS+vKzgop1C18JWm2QKs6RkfVcWuym8uUUt/vzNbrr2Bupi94CeQ0bvqfO4cgOktFIvHKgCH4KWS+s6/sNfm6xJujx4fMQkZ3J7t43TQdKBCOX2Uy6ItBxbBZ9T8Sl6x9qhd8Rk8/jQhHMubj3L6q8yAUpNAN1ySxt2vdKn4p9Mp0Rl+Y6h5H3f3lr/1IXxxoRpRe4P7kdYE3+QaD4Z+Gfwbbwb6EEMvoJjYoVmXIlKmtCvjIpTf/wusWnoRmzL6KEI7ApWI1+G1Eqv5GsBLJ8JuMK414eLy2FPybPubrBVuw56ohC8y77YBCAqSCPZXIkBQ9c80m2XY53u914uc0mA8eSIl32qUcCBiMIxEuEvtinoPJ6zXMx8sDHzmpi9+ECvDKOSHwbLhdhzWcy8MdzfUPmPVoMTjDD4atQMTbbJ6VvmPsqyRjoUT78494K/gQkx4lf+blkz2yhcHCgnPVHEQsP7eL9Mi/mhV/siGgzdzA6ugcH5YGHg+/Uj4xHZco+hqXEHivkxA77E1TwRV8jWbBno2N1+TZenXhzOPg7Boz/n+Li1nOASwjjDfEqo9eXHnviiuSOTPQWl+g4Xu3p14HNPIdHvqZWGUP4Y/wW5e4NWemkdFzwlHjKTjA3LFXivvWyI9SrIIhSQHYvZcNIVFEuUzbDQ7Ooj9YhUqLGSi7bx1aZjYd+9AEEK6PeGBUnH3GZEGB8aw8DY3EvJT1FNgafqmNBmUnFQDddkwAbupygixwDsr5cc/HkJH+flH0OdBJTZfJOyMdv4MlkpcretxKlCWvBvKTUYwddDN6NLSQVuqJmk4HPTgkVI3DXJY9lSgaqMRmymoh+LqqUDSdl7g388ZG4ruiMQk61MnScwSuzecwC7MS4zFUEzTGYRdSrmJQ5IAh9MZoNrMv6BosYE7T86GKw14F2H/yR2DghBizZelBugx2UZa9akUrwu8iq7EEYiVuDQkW9S20UG51wrEnwbGPcMHBt7IQlngy6rYFdjA2q2xDvCrjjeQE+tllG1EzBczDRazKcXe5wk23FfS9N+2BOk7KXiudt82AC2ekV0oRI5U/ZW5nmRrl6JO0I4ht7rPA7B2/SQrlooDTC2aiYLY3SioFt3JKeQInh509MZcYD9aKNzkac59aXfJfqGAv91pZCyr2HlVVqCRzrm+T3zXXRA3wQV0gpW09K3WXQfYS6Va7MBaDBI6W6GYqarJm8j3zoIceHvQQtIUVbvyi9z0G9YDfSokdtCMp5W5VPs0C7z0vnnpQWUfV3kSsSJ9i6Ki402LC6BIULDKnNNuXKC/5fM5He4UY7LdPDOIlGbB4Yoh4ar3IvK2Z2PtPdGJh9w0qHmljcnAgtF9gk1eK6ORY4T5T7wNFTZZj9HfVMSzFFnwUjamWFYxj1KeL+Pjg2Yz1CGg6lj4+9sMo5zL2CtiC78odCgQsMF/AxzbAkcPKPmKqKs9cKfiBQ+6ajplOwfZUGcZxX9WCcOu0evhr4ivBsOSbDtlpGgQ6rZv6LIDQMhXXomjj3SIcvlb0gYW21jILLKj0y5yV/dyTulhxH7mqSZbUmm1/bDXlkuxxQ5lI5NjoGUf6Tis6Sco+UY9Ha61ag5Y4EwhHxBQR76lZMMaMpBdlDmwUPH9QxvFpK6xgO8DWjrXUZmsQOWfKUEpnQVTkuFAw1taHF/UFRDZGI0hW4zzQDTcqz1khc4xQu/qEf1rShw9UdTpqyWafziZgHotK62FddFo8+TQOlfolkFPB//G4JwuDe87jLBprUr452ZdHVDKOssh7Q8ZY8yEA9jw/1u/TdRjL1N6gLIvyxYu/qfujF8PlKJETmo/KJ7w4BAydRB7qvSTj8g7G/KxlifLKG4WQvx2U4hOqyCcMP7Ibw7GhTcyfU8PNqhp9WHUNrE/E5BUo/uvS+HTHkw1BwrTPxBwNtVzLEcFsdw0fi8UE4Dia7bMNMVNp1a8NAf3jI8SqCPFBYx3BOZCIrqdRK7fDnIHeG1MqGY4VvaLHa0gNr+xbWN0uYu8cdqhpgOFYMvboZPEdE/q6KRH03iDANlKYmf7vixxnOpCptMDATAR23ZSOis9ko/OIrPRbNumGH+OOoYTuNlnVzW7wVZtRuNO1UAFqGzhrkPDvOSka/2b67abY/TjhUw/s6t1u0wpxcERHmSqy+0mqShg7DDnVpaqt0iDrnX8DZkNaxNtJwPmKhEkHsLvMWEin79cZCIm1vEpsmWszV8LM65NESmXpq1OypaPVbSimfXGuCJFKf6NAgFu+NNnzRfLq/DXCCvtmjU5XL0+kclBq2o/PfEO0cmxbznmroUh8QaINFbvCbLWUS6aG23Wj2Au+pTFA9xiQ3+d0ylHPbDcPpjshzp41GipjbNmqeCaQsV03YqiXaMhS5MdOmJoMH6ZsGzm6Docx1ey/NLD1qQ/ZuVWTHnUIXQyVQDZcUOioZvD5mE/HJyNKc9jPo6oetdanI3gs/SfAcXNY4mHf0HJDPlmu39OjS1vYQwZtlsA0IhlnPdA565hSubQct0w312MNDn6ZFZXjVJytCaL78NSfI80bIalI6XV72SD0+TZJPTbZ4bzImjRz30B8x+ECpXH8Pv0Rkv5rIO9pwzAPOnfqlbccWCqru4eKT77sj11vwvXg+F+HhLY2hY2xRjA/rp2UO4Rx8WX62XT3thwELhvun1Tbzi3vEwLcpz63S6x2OD1uN8TnkCtPBRKxvErkU8HsYTiaTMOR/xCk7//Cmhk9e6hjjH8VpGtUDWyhZgiphO5m3fCSNxe/pDkSWLrFLNXyySifoNE7TJtYm6gFCuUEV6tokWsWHF3Ki+C3+GxG+ZptssoZGUVesrUW8lCPe4CYJ+N/9HWHfl3VC+s2iO3HXHXBs5kyEKsO146mZTKnoKnMhFxqCJ7M7WusETbSepseNP0ina3I4hAQFuwu5pFavQs2NRafmMJ+3sCvnLeT6bmu+J8cG3vUYYbPxaB6HL4OXMJ6PxjP4i3foy+GE2X7OX1Alw0fi2TrmLdTck1s19yQ0/mBMWHCSw46/HG5IR/i+Ase3uDRgZDzIn1OCTeRqmXvK5w+DqvlDVBbJB3h43vFaIKj9syvzGqnML3Sfj98C/OKBJ/aRWJX7hUz2gZ75w0ZzwChcCWGgN+jJ6D4AL+3+7gGu4A5R/Cdw3IKjNvQohSsMn18hpXrmgIt5fPivdB6fW/np1ZkmOVOxNP1yCXweH2vR9Tx+notBy3IxHPHip9enYRTgqTIX3NU8F4PqyMWoz6cRLdh62vAc1OYrKS8XoSufpkFOFFZpW7NgtCFcWkZRW05Ug7w2dERxKeTViSYFUOVgJzt3U3XmtVl1uYlQWFqzj2crllF6kaG23ESOyvxSUHOza3NMLoHNzhW27vzSoxzhCy9w2YUaLYCv8RS+5hzh6jzvjHjXZpVeguudO9ba87wrc/VfPp475Id4/jhdj6g9V/94vcWRZ+VwGe20DbmcHhbhWNrXW5yumcnLh58mpG12SR3AJJDJURm4ZsbVuWbGKVv3hCGkVfvleNXgi/VWR2Xguid+Tdu6p9O1a7l37PC8hE4Jit5QGF5emP61ayfrD53iCo9TdS2l9pEw4qonW/v6w8trSB0rbr3YsCFLqgIVxRpScLuZpjWkHJfXAW+7NfYFCie/t3XAF9dy++uOJVSB2us89p+v5XbZkyYBFbi0Hj/753F9KcXcseltPf7FPRVWGhmqjZN621PhfF8Mywn3uggCxX3ITSHuixHwWUft+2Ic723iqznZbm2hgqvmnH2+t4ndy94mJ/vT+IJyoEnTBIKQ3+P+NHw+7GCPoZHlW3vabJOWKxjCm9xDCSOxxxC1e9ljyDrbJ4qcZSF0xhApFftE0T72ieIo9voC/z9NeRBfDzxRgHp8H3t9CRT7tXnkddk237kNwAddvkaSYX/7tRV77sE4ikVUk4zy54PvxLz8dfa2516+byLqcz2G4ghu3/smWvnel7YYz2gkR4uBZ497X57uX9oDet6/9GQP2j7Q8x60J/sI9wOxj3A//DjHg/BsH8j3gu6tI/KSRv21otrPu0+IPdnbLzNsD8yr6ntPdkHR4usNtBNEEf2RffXFS+2jL9IfOhtB7vA/D7qcNbyEHzvfglsMpzijRBcimuVl/QAunDPTEeQ5M/c/eM6MYHjhrKDOON7EWUEyi+f4vKeOCN7IeU+yAsdndnUBeWaXI0T0Jzmen7vWDW7l3LUD4Nl5WLWgru61UGfn6Q3et4c8/1DmZF3bcvwffv7h462df6jOsHTtgzMsW+P4DMvboih0ztk5pFfgVs8hlesoTs6SbQt6cJbsz1qJKhyeB8wTlqvp8svBLzgPOMf/wZnOWMHrz+W+Xdk8AK/kf/psdaUF/XQ640caV7chnuE1m6Y8JeHmFGg9/GQ0/uBnkTGGR1nhaVb837s7xg+yJh/jUXJjhzc3hxA5P4yB5mw/PFoWxOzhfgbk4tC3folwXsKh0DlANJsvFot3+JpnQM25dNvvgqNiHaUE5NXfS1FxqzwD8BfLqIGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBQdf4H/6S2ivGU8GYAAAAAElFTkSuQmCC";

/**
 * ML Sidebar (Muamelat-like)
 *
 * Props:
 * - data: {
 *     logo?: ReactNode|string,
 *     items?: Array<{ id?: string|number, label: string, icon?: ReactNode|string, count?: number|string, disabled?: boolean, onClick?: Function }>,
 *     bottom?: { notificationCount?: number|string, avatarSrc?: string|undefined },
 *     editMode?: { value?: boolean, loading?: boolean }
 *   }
 * - menus: legacy alias for data.items
 * - activeIndex: number (controlled)
 * - onMenuClick(menu, index, event)
 * - onLogoClick()
 * - onProfileClick()
 * - onNotificationClick()
 * - onEditModeChange(next: boolean)
 * - presentation (colors, dims) via style props or CSS variables
 * - as, className, style, hidden, ...styleSystemProps
 */
const defaultMenus = [
  { label: "Panorama" },
  { label: "Transaction" },
  { label: "Documents" },
  { label: "Emails" },
  { label: "Reports" },
  { label: "Calendar" },
  { label: "Management" },
];

const SideMenu = ({
  data,
  // legacy fallback
  menus = defaultMenus,
  activeIndex,
  onMenuClick = () => {},
  onLogoClick = () => {},
  onProfileClick = () => {},
  onNotificationClick = () => {},
  onEditModeChange = () => {},
  // visual controls (mapped to CSS variables)
  sideBgColor,
  sideTextColor,
  sideWidth,
  sideHeight,
  sideRadius,
  sideShadow,
  sidePaddingX,
  sidePaddingY,
  logoSize,
  logoRadius,
  logoBackground,
  itemHeight,
  itemGap,
  itemRadius,
  itemPaddingY,
  itemPaddingX,
  itemHoverBgColor,
  itemActiveBgColor,
  itemActiveOutline,
  activeStripeWidth,
  activeStripeColor,
  iconSize,
  iconBgColor,
  labelFontSize,
  labelFontWeight,
  labelColor,
  countBgColor,
  countTextColor,
  countMinWidth,
  countHeight,
  countFontSize,
  notifyBgColor,
  notifyTextColor,
  notifyFontSize,
  notifyPaddingX,
  notifyPaddingY,
  avatarSize,
  avatarBgColor,
  avatarBorderColor,
  editLabelFontSize,
  editSwitchWidth,
  editSwitchHeight,
  editSwitchTrackColor,
  editSwitchOnColor,
  as,
  className,
  style = {},
  hidden,
  ...rest
}) => {
  const {
    logo: dataLogo,
    items: dataItems,
    bottom: dataBottom,
    editMode: dataEdit,
  } = data && typeof data === "object" ? data : {};

  const resolvedLogo = dataLogo !== undefined ? dataLogo : null;
  const resolvedMenus = useMemo(
    () => (Array.isArray(dataItems) ? dataItems : menus) || [],
    [dataItems, menus]
  );
  const resolvedNotify =
    dataBottom && dataBottom.notificationCount !== undefined
      ? dataBottom.notificationCount
      : undefined;
  const resolvedAvatarSrc =
    dataBottom && dataBottom.avatarSrc !== undefined
      ? dataBottom.avatarSrc
      : undefined;
  const resolvedEdit = dataEdit || {};

  // Active item
  const [internalActive, setInternalActive] = useState(0);
  const currentActive =
    activeIndex !== undefined ? activeIndex : internalActive;

  // Edit mode (controlled via data.editMode.value if provided; else uncontrolled)
  const [internalEdit, setInternalEdit] = useState(
    Boolean(resolvedEdit?.value)
  );
  const editValue =
    resolvedEdit && typeof resolvedEdit.value === "boolean"
      ? resolvedEdit.value
      : internalEdit;
  const editLoading = Boolean(resolvedEdit?.loading);

  const Component = as || "aside";
  const mergedStyle = { ...expandStyleProps(rest), ...(style || {}) };
  // CSS variables for fine-grained theming
  mergedStyle["--ml-bg"] = sideBgColor;
  mergedStyle["--ml-text"] = sideTextColor;
  mergedStyle["--ml-width"] = sideWidth;
  mergedStyle["--ml-height"] = sideHeight;
  mergedStyle["--ml-radius"] = sideRadius;
  mergedStyle["--ml-shadow"] = sideShadow;
  mergedStyle["--ml-pad-x"] = sidePaddingX;
  mergedStyle["--ml-pad-y"] = sidePaddingY;
  mergedStyle["--ml-logo-size"] = logoSize;
  mergedStyle["--ml-logo-radius"] = logoRadius;
  mergedStyle["--ml-logo-bg"] = logoBackground;
  mergedStyle["--ml-item-height"] = itemHeight;
  mergedStyle["--ml-item-gap"] = itemGap;
  mergedStyle["--ml-item-radius"] = itemRadius;
  mergedStyle["--ml-item-pad-y"] = itemPaddingY;
  mergedStyle["--ml-item-pad-x"] = itemPaddingX;
  mergedStyle["--ml-item-hover-bg"] = itemHoverBgColor;
  mergedStyle["--ml-item-active-bg"] = itemActiveBgColor;
  mergedStyle["--ml-item-active-outline"] = itemActiveOutline;
  mergedStyle["--ml-stripe-w"] = activeStripeWidth;
  mergedStyle["--ml-stripe-color"] = activeStripeColor;
  mergedStyle["--ml-icon-size"] = iconSize;
  mergedStyle["--ml-icon-bg"] = iconBgColor;
  mergedStyle["--ml-label-size"] = labelFontSize;
  mergedStyle["--ml-label-weight"] = labelFontWeight;
  mergedStyle["--ml-label-color"] = labelColor;
  mergedStyle["--ml-count-bg"] = countBgColor;
  mergedStyle["--ml-count-color"] = countTextColor;
  mergedStyle["--ml-count-minw"] = countMinWidth;
  mergedStyle["--ml-count-h"] = countHeight;
  mergedStyle["--ml-count-size"] = countFontSize;
  mergedStyle["--ml-notify-bg"] = notifyBgColor;
  mergedStyle["--ml-notify-color"] = notifyTextColor;
  mergedStyle["--ml-notify-size"] = notifyFontSize;
  mergedStyle["--ml-notify-px"] = notifyPaddingX;
  mergedStyle["--ml-notify-py"] = notifyPaddingY;
  mergedStyle["--ml-avatar-size"] = avatarSize;
  mergedStyle["--ml-avatar-bg"] = avatarBgColor;
  mergedStyle["--ml-avatar-border"] = avatarBorderColor;
  mergedStyle["--ml-edit-label-size"] = editLabelFontSize;
  mergedStyle["--ml-switch-w"] = editSwitchWidth;
  mergedStyle["--ml-switch-h"] = editSwitchHeight;
  mergedStyle["--ml-switch-track"] = editSwitchTrackColor;
  mergedStyle["--ml-switch-on"] = editSwitchOnColor;
  if (hidden === true && mergedStyle.display === undefined)
    mergedStyle.display = "none";

  return (
    <Component
      className={["ml-sidebar", className].filter(Boolean).join(" ")}
      style={mergedStyle}
      role="navigation"
      aria-label="ML Sidebar"
    >
      {/* Logo */}
      <button
        type="button"
        className="mls-logo"
        onClick={onLogoClick}
        aria-label="App Home"
      >
         {(() => {
           // Resolve logo thumb and label from `data.logo`
           let thumbChild = null;
           let hasThumbVisual = false;
           let labelText = "Muamelat";
           const logoVal = resolvedLogo;
           const isPlainObject =
             logoVal && typeof logoVal === "object" && !React.isValidElement(logoVal);
           if (isPlainObject) {
             const { node, src, alt, text, label } = logoVal;
             if (node && React.isValidElement(node)) {
               thumbChild = node;
               hasThumbVisual = true;
             } else if (src) {
               thumbChild = (
                 <img className="mls-thumb-img" src={src} alt={alt || "app logo"} />
               );
               hasThumbVisual = true;
             }
             labelText = label ?? text ?? "Muamelat";
           } else if (React.isValidElement(logoVal)) {
             thumbChild = logoVal;
             hasThumbVisual = true;
             labelText = "Muamelat";
           } else if (typeof logoVal === "string" || typeof logoVal === "number") {
             labelText = logoVal;
           }
           return (
             <>
               <div className={`mls-thumb ${hasThumbVisual ? "has-img" : ""}`}>
                 <div className="mls-light" />
                 <div className="mls-thumb-mark" />
                 {thumbChild}
               </div>
               <div className="mls-logo-text">{labelText}</div>
             </>
           );
         })()}
      </button>

      {/* Menus */}
      <nav className="mls-menu" aria-label="Main">
        {resolvedMenus.map((m, i) => {
          const disabled = Boolean(m?.disabled);
          const isActive = i === currentActive;
          const label = m?.label ?? "";
          const count = m?.count;
          const icon = m?.icon;
          return (
            <button
              key={m?.id ?? i}
              type="button"
              className={[
                "mls-item",
                isActive ? "is-active" : "",
                disabled ? "is-disabled" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={(e) => {
                if (disabled) return;
                if (activeIndex === undefined) setInternalActive(i);
                if (typeof m?.onClick === "function") m.onClick(m, i, e);
                onMenuClick(m, i, e);
              }}
              aria-current={isActive ? "page" : undefined}
              title={label}
            >
              <div className="mls-icon">
                {React.isValidElement(icon) ? (
                  icon
                ) : typeof icon === "string" ? (
                  <i className={icon} />
                ) : null}
              </div>
              <div className="mls-label">{label}</div>
              {count !== undefined && count !== null ? (
                <div className="mls-count">{count}</div>
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="mls-bottom">
        <button
          type="button"
          className="mls-notify"
          aria-label="Notifications"
          onClick={onNotificationClick}
        >
          <i className="fi fi-rr-bell"></i>
          {resolvedNotify !== undefined ? (
            <span>{Number(resolvedNotify) || resolvedNotify}</span>
          ) : null}
        </button>

        {/* <div className="mls-edit">
          <div className="mls-edit-label">Edit mode</div>
          <button
            type="button"
            className={['mls-switch', editValue ? 'is-on' : '', editLoading ? 'is-loading' : ''].filter(Boolean).join(' ')}
            onClick={() => {
              if (editLoading) return;
              const next = !editValue;
              if (resolvedEdit && typeof resolvedEdit.value === 'boolean') {
                // controlled - just tell parent
                onEditModeChange(next);
              } else {
                // uncontrolled - update local and tell parent
                setInternalEdit(next);
                onEditModeChange(next);
              }
            }}
            aria-pressed={editValue}
            aria-label="Toggle edit mode"
          >
            <span className="knob" />
          </button>
        </div> */}

        {/* Profile (no popup; just click handler) */}
        {resolvedAvatarSrc ? (
          <button
            type="button"
            className="mls-avatar"
            onClick={onProfileClick}
            aria-label="Profile"
          >
            <img src={resolvedAvatarSrc} alt="profile" />
          </button>
        ) : (
          <button
            type="button"
            className="mls-avatar"
            onClick={onProfileClick}
            aria-label="Profile"
          >
            <img src={DEFAULT_AVATAR_URL} alt="profile" />
          </button>
        )}
      </div>
    </Component>
  );
};

export default SideMenu;
