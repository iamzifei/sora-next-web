import cloudinary from "./cloudinary"

let cachedResults: { resources: any[] } | undefined

/**
 * Fetch all video resources from Cloudinary, with caching.
 * Returns an object with a `resources` array.
 * If the Cloudinary API is unavailable (e.g. disabled account),
 * returns an empty resources array so the build can still succeed.
 */
export default async function getResults(): Promise<{ resources: any[] }> {
  if (!cachedResults) {
    try {
      const fetchedResults = await cloudinary.v2.search
        .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
        .sort_by("public_id", "desc")
        .max_results(400)
        .execute()

      cachedResults = fetchedResults
    } catch (error) {
      console.warn("Failed to fetch from Cloudinary, using empty results:", error)
      cachedResults = { resources: [] }
    }
  }

  return cachedResults
}
