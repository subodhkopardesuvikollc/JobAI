"use server";

import { revalidateTag } from "next/cache";

export async function revalidate(tags: string[]) {
  try {
    tags.forEach((tag) => revalidateTag(tag));
    return { revalidated: true, tags, message: "Successfully revalidated" };
  } catch (error) {
    return { revalidated: false, tags, message: error };
  }
}
