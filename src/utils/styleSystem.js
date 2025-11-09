export function expandStyleProps(props = {}) {
  const s = {};
  const set = (k, v) => {
    if (v !== undefined && v !== null) s[k] = v;
  };

  const {
    m,
    mx,
    my,
    mt,
    mr,
    mb,
    ml,
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    w,
    h,
    minW,
    maxW,
    minH,
    maxH,
    // direct aliases
    width,
    height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    display,
    boxSizing,
    overflow,
    overflowX,
    overflowY,
    flex,
    flexDir,
    flexWrap,
    justify,
    align,
    alignSelf,
    alignContent,
    gap,
    rowGap,
    columnGap,
    flexGrow,
    flexShrink,
    flexBasis,
    order,
    gridCols,
    gridRows,
    gridAreas,
    gridCol,
    gridRow,
    gridAutoFlow,
    gridAutoCols,
    gridAutoRows,
    placeItems,
    placeContent,
    position,
    top,
    right,
    bottom,
    left,
    inset,
    zIndex,
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    fontStyle,
    textAlign,
    textTransform,
    textDecoration,
    textOverflow,
    whiteSpace,
    wordBreak,
    overflowWrap,
    color,
    opacity,
    bg,
    bgColor,
    bgImage,
    bgGradient,
    bgClip,
    bgPos,
    bgSize,
    bgRepeat,
    bgAttachment,
    mixBlendMode,
    backgroundColor,
    border,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    borderColor,
    borderWidth,
    borderStyle,
    rounded,
    borderRadius,
    outline,
    outlineOffset,
    boxShadow,
    filter,
    backdropFilter,
    backdropBlur,
    transform,
    transformOrigin,
    translateX,
    translateY,
    scale,
    rotate,
    skew,
    cursor,
    pointerEvents,
    userSelect,
    touchAction,
    objectFit,
    objectPosition,
    aspectRatio,
    visibility,
    isolation,
    contain,
    contentVisibility,
    scrollBehavior,
    scrollSnapType,
    scrollSnapAlign,
    scrollMargin,
    scrollMarginTop,
    scrollMarginRight,
    scrollMarginBottom,
    scrollMarginLeft,
    scrollPadding,
    scrollPaddingTop,
    scrollPaddingRight,
    scrollPaddingBottom,
    scrollPaddingLeft,
  } = props;

  set("margin", m);
  set("marginTop", mt ?? my);
  set("marginRight", mr ?? mx);
  set("marginBottom", mb ?? my);
  set("marginLeft", ml ?? mx);
  set("padding", p);
  set("paddingTop", pt ?? py);
  set("paddingRight", pr ?? px);
  set("paddingBottom", pb ?? py);
  set("paddingLeft", pl ?? px);
  set("width", w);
  set("height", h);
  set("minWidth", minW);
  set("maxWidth", maxW);
  set("minHeight", minH);
  set("maxHeight", maxH);
  set("width", width);
  set("height", height);
  set("minWidth", minWidth);
  set("maxWidth", maxWidth);
  set("minHeight", minHeight);
  set("maxHeight", maxHeight);
  set("display", display);
  set("boxSizing", boxSizing);
  set("overflow", overflow);
  set("overflowX", overflowX);
  set("overflowY", overflowY);
  set("flex", flex);
  set("flexDirection", flexDir);
  set("flexWrap", flexWrap);
  set("justifyContent", justify);
  set("alignItems", align);
  set("alignSelf", alignSelf);
  set("alignContent", alignContent);
  set("gap", gap);
  set("rowGap", rowGap);
  set("columnGap", columnGap);
  set("flexGrow", flexGrow);
  set("flexShrink", flexShrink);
  set("flexBasis", flexBasis);
  set("order", order);
  if (typeof gridCols === "number")
    set("gridTemplateColumns", `repeat(${gridCols}, minmax(0,1fr))`);
  else set("gridTemplateColumns", gridCols);
  if (typeof gridRows === "number")
    set("gridTemplateRows", `repeat(${gridRows}, auto)`);
  else set("gridTemplateRows", gridRows);
  set("gridTemplateAreas", gridAreas);
  set("gridColumn", gridCol);
  set("gridRow", gridRow);
  set("gridAutoFlow", gridAutoFlow);
  set("gridAutoColumns", gridAutoCols);
  set("gridAutoRows", gridAutoRows);
  set("placeItems", placeItems);
  set("placeContent", placeContent);
  set("position", position);
  set("top", top);
  set("right", right);
  set("bottom", bottom);
  set("left", left);
  set("inset", inset);
  set("zIndex", zIndex);
  set("fontFamily", fontFamily);
  set("fontSize", fontSize);
  set("fontWeight", fontWeight);
  set("lineHeight", lineHeight);
  set("letterSpacing", letterSpacing);
  set("fontStyle", fontStyle);
  set("textAlign", textAlign);
  set("textTransform", textTransform);
  set("textDecoration", textDecoration);
  set("textOverflow", textOverflow);
  set("whiteSpace", whiteSpace);
  set("wordBreak", wordBreak);
  set("overflowWrap", overflowWrap);
  set("color", color);
  set("opacity", opacity);
  set("background", bg ?? bgColor);
  set("backgroundColor", backgroundColor ?? bgColor);
  set("backgroundImage", bgImage ?? bgGradient);
  set("backgroundClip", bgClip);
  set("backgroundPosition", bgPos);
  set("backgroundSize", bgSize);
  set("backgroundRepeat", bgRepeat);
  set("backgroundAttachment", bgAttachment);
  set("mixBlendMode", mixBlendMode);
  set("border", border);
  set("borderTop", borderTop);
  set("borderRight", borderRight);
  set("borderBottom", borderBottom);
  set("borderLeft", borderLeft);
  set("borderColor", borderColor);
  set("borderWidth", borderWidth);
  set("borderStyle", borderStyle);
  set("borderRadius", borderRadius ?? rounded);
  set("outline", outline);
  set("outlineOffset", outlineOffset);
  set("boxShadow", boxShadow);
  set("filter", filter);
  set("backdropFilter", backdropFilter);
  if (backdropBlur !== undefined && backdropBlur !== null)
    set("backdropFilter", `blur(${backdropBlur})`);
  set("transform", transform);
  set("transformOrigin", transformOrigin);
  if (
    translateX !== undefined ||
    translateY !== undefined ||
    scale !== undefined ||
    rotate !== undefined ||
    skew !== undefined
  ) {
    const parts = [];
    if (translateX !== undefined) parts.push(`translateX(${translateX})`);
    if (translateY !== undefined) parts.push(`translateY(${translateY})`);
    if (scale !== undefined) parts.push(`scale(${scale})`);
    if (rotate !== undefined) parts.push(`rotate(${rotate})`);
    if (skew !== undefined) parts.push(`skew(${skew})`);
    s.transform = [s.transform, parts.join(" ")].filter(Boolean).join(" ");
  }
  set("cursor", cursor);
  set("pointerEvents", pointerEvents);
  set("userSelect", userSelect);
  set("touchAction", touchAction);
  set("objectFit", objectFit);
  set("objectPosition", objectPosition);
  set("aspectRatio", aspectRatio);
  set("visibility", visibility);
  set("isolation", isolation);
  set("contain", contain);
  set("contentVisibility", contentVisibility);
  set("scrollBehavior", scrollBehavior);
  set("scrollSnapType", scrollSnapType);
  set("scrollSnapAlign", scrollSnapAlign);
  set("scrollMargin", scrollMargin);
  set("scrollMarginTop", scrollMarginTop);
  set("scrollMarginRight", scrollMarginRight);
  set("scrollMarginBottom", scrollMarginBottom);
  set("scrollMarginLeft", scrollMarginLeft);
  set("scrollPadding", scrollPadding);
  set("scrollPaddingTop", scrollPaddingTop);
  set("scrollPaddingRight", scrollPaddingRight);
  set("scrollPaddingBottom", scrollPaddingBottom);
  set("scrollPaddingLeft", scrollPaddingLeft);
  return s;
}
