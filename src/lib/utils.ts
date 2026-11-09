/**
 * Tailwind class merger (e.g., clsx, tailwind-merge)
 * Merges conditional classes cleanly with zero external dependency overhead.
 */

export type ClassValue =
  | ClassValue[]
  | string
  | number
  | boolean
  | null
  | undefined
  | { [key: string]: boolean | number | string | null | undefined };

function toVal(mix: ClassValue): string {
  let str = "";

  if (typeof mix === "string" || typeof mix === "number") {
    str += mix;
  } else if (typeof mix === "object") {
    if (Array.isArray(mix)) {
      for (let k = 0; k < mix.length; k++) {
        if (mix[k]) {
          const y = toVal(mix[k]);
          if (y) {
            if (str) str += " ";
            str += y;
          }
        }
      }
    } else if (mix) {
      for (const k in mix) {
        if (mix[k]) {
          if (str) str += " ";
          str += k;
        }
      }
    }
  }

  return str;
}

export function clsx(...inputs: ClassValue[]): string {
  let i = 0;
  let tmp: ClassValue;
  let str = "";

  while (i < inputs.length) {
    tmp = inputs[i++];
    if (tmp) {
      const x = toVal(tmp);
      if (x) {
        if (str) str += " ";
        str += x;
      }
    }
  }

  return str;
}

export function cn(...inputs: ClassValue[]): string {
  return clsx(...inputs);
}
