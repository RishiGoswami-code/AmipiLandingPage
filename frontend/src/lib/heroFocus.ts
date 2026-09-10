/**
 * Camera targets for the hero scroll sequence.
 *
 * Coordinates are normalised to the IMAGE, not the viewport: 0,0 is the top
 * left of the photograph and 1,1 the bottom right. They were measured off the
 * two assets in /public/hero, which are different crops of the same shoot -
 * that is why the desktop and mobile numbers differ. Re-measure these if the
 * photograph is ever swapped.
 */
export type FocusPoint = {
  /** Horizontal target, 0-1 across the image. */
  x: number;
  /** Vertical target, 0-1 down the image. */
  y: number;
  /** Zoom factor. 1 is the untouched frame. */
  scale: number;
  /** Background defocus in CSS pixels at scale 1. */
  blur: number;
  /**
   * Radius of the sharp pocket, as a percentage of the layer's size. 200 keeps
   * the whole frame sharp; ~40 is a tight depth-of-field pocket.
   */
  aperture: number;
  /**
   * Horizontal cover anchor, 0-1, written straight out as `object-position`.
   * Both crops are far wider than a tall viewport, so cover throws away a lot
   * of width; this picks WHICH width survives. 0 keeps the left of the
   * photograph, 1 the right, 0.5 is the browser default of centred.
   *
   * It changes the picture in exactly two situations, and is a no-op the rest
   * of the time. At scale 1 there is no pan to speak of, so the anchor alone
   * decides the composition - that is what puts the model off-centre in the
   * opening frame. When a target is extreme enough that `panFor` clamps, the
   * anchor decides how far the camera can still reach - that is what gets the
   * mobile bracelet into frame at all. Everywhere in between, the pan absorbs
   * the anchor exactly and the frame does not move, which is why this is safe
   * to tween alongside the rest of the camera.
   */
  align: number;
};

export type FocusSet = {
  hero: FocusPoint;
  bracelet: FocusPoint;
  necklace: FocusPoint;
  exit: FocusPoint;
};

/**
 * rooftop-wide.jpg - 2244x701, the 3.2:1 banner crop.
 *
 * The model stands just left of the middle of the plate, so a centred cover
 * lands her dead centre of the viewport and the skyline is split evenly either
 * side of her. Anchoring the opening frame at 0.27 keeps the left third of the
 * photograph - the Empire State side - and pushes her onto the right third
 * where the composition wants her. The two jewellery stages hand the anchor
 * back to centre, because at that zoom the reach matters more than the
 * composition and centring maximises it.
 */
export const DESKTOP_FOCUS: FocusSet = {
  hero: { x: 0.5, y: 0.5, scale: 1, blur: 0, aperture: 220, align: 0.27 },
  bracelet: { x: 0.608, y: 0.854, scale: 2.35, blur: 7, aperture: 46, align: 0.5 },
  necklace: { x: 0.497, y: 0.672, scale: 3.05, blur: 9, aperture: 40, align: 0.5 },
  exit: { x: 0.5, y: 0.56, scale: 1.14, blur: 0, aperture: 220, align: 0.3 },
};

/**
 * rooftop-portrait.jpg - 525x701. The bracelet sits at x 0.94, right against
 * the edge of this crop, and a tall phone throws away another third of the
 * width on top of that. Centred, the bracelet stage aimed a third of a
 * viewport past the right edge and the pocket opened on nothing. Anchoring
 * that stage hard right (1) slides the surviving window over the wrist, which
 * is the only way the clamp can reach it; it still parks near the right edge
 * rather than centring, which is as close as this crop allows.
 */
export const MOBILE_FOCUS: FocusSet = {
  hero: { x: 0.5, y: 0.5, scale: 1, blur: 0, aperture: 220, align: 0.27 },
  bracelet: { x: 0.94, y: 0.855, scale: 2.3, blur: 6, aperture: 52, align: 1 },
  necklace: { x: 0.52, y: 0.672, scale: 2.6, blur: 8, aperture: 46, align: 0.6 },
  exit: { x: 0.5, y: 0.55, scale: 1.1, blur: 0, aperture: 220, align: 0.32 },
};

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

export type Pan = { x: number; y: number };

/** Intrinsic aspect ratios of the two crops in /public/hero. */
export const WIDE_ASPECT = 2244 / 701;
export const PORTRAIT_ASPECT = 525 / 701;

/**
 * Convert a point measured on the PHOTOGRAPH into a point on the CONTAINER.
 *
 * The plate uses object-cover, so the photograph is scaled up and cropped to
 * fill the frame - on a tall viewport the 3.2:1 banner loses about two thirds
 * of its width off the sides. Without this correction the camera aims at
 * wherever those normalised coordinates happen to land on the container, which
 * is somewhere else entirely, and the drift changes with every viewport size.
 *
 * `alignX` must match the `object-position` the plate is actually painted
 * with, because that is what decides which slice of the overflow is kept. Get
 * them out of step and every focus point is off by the difference.
 */
export function toContainerSpace(
  focusX: number,
  focusY: number,
  imageAspect: number,
  width: number,
  height: number,
  alignX = 0.5,
): Pan {
  const containerAspect = width / height;

  // Cover fills whichever axis is proportionally short and overflows the other.
  const w = imageAspect > containerAspect ? height * imageAspect : width;
  const h = imageAspect > containerAspect ? height : width / imageAspect;

  return {
    x: ((width - w) * alignX + focusX * w) / width,
    y: ((height - h) / 2 + focusY * h) / height,
  };
}

/**
 * Translation that brings a normalised image point to the centre of the frame.
 *
 * Deliberately NOT done by animating transform-origin. Origin changes are not
 * interpolatable in a way that looks continuous - moving the origin mid-tween
 * makes the already-applied scale snap to a new anchor, which reads as a jump.
 * Scaling about a fixed centre and translating instead is fully continuous.
 *
 * The result is clamped so the scaled plate always covers the frame, which is
 * what stops empty gutters appearing at the edges on extreme targets.
 */
export function panFor(
  focusX: number,
  focusY: number,
  scale: number,
  width: number,
  height: number,
): Pan {
  const limitX = ((scale - 1) / 2) * width;
  const limitY = ((scale - 1) / 2) * height;
  return {
    x: clamp(-(focusX - 0.5) * width * scale, -limitX, limitX),
    y: clamp(-(focusY - 0.5) * height * scale, -limitY, limitY),
  };
}

/**
 * Where a normalised image point actually lands on screen once the pan above
 * has been clamped. Hotspot tags are positioned from this, so they stay pinned
 * to the jewellery even when the camera could not fully centre it.
 */
export function screenPointFor(
  focusX: number,
  focusY: number,
  scale: number,
  width: number,
  height: number,
): Pan {
  const pan = panFor(focusX, focusY, scale, width, height);
  return {
    x: width / 2 + (focusX - 0.5) * width * scale + pan.x,
    y: height / 2 + (focusY - 0.5) * height * scale + pan.y,
  };
}
