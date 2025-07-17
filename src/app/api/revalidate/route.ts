import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { tags } = await request.json();
    console.log("Revalidating path with tags:", tags);

    if (Array.isArray(tags)) {
      tags.forEach((tag) => {
        console.log(`Revalidating tag: ${tag}`);
        revalidateTag(tag);
        console.log(`Successfully revalidated tag: ${tag}`);
      });
    }

    console.log("All tags revalidated successfully");
    return NextResponse.json({
      revalidated: true,
      tags: [...tags],
      message: "Successfully revalidated",
    });
  } catch (error) {
    console.error("Error during revalidation:", error);
    return NextResponse.json(
      { revalidated: false, tags: [], message: error },
      { status: 500 }
    );
  }
}
