import organizeVideos from "./organizeVideos"
import { VideoVersions } from "./types"

let cachedResults: Record<string, VideoVersions> | undefined

const numberOfVideos = 12

/**
 * Organize and cache video results from Cloudinary API response.
 * Returns a record of video keys to their version data.
 * Handles missing or empty resources gracefully.
 */
export default function getVideos(results: { resources?: any[] }): Record<string, VideoVersions> {
  if (!cachedResults) {
    const resources = results?.resources || []
    const videoData = organizeVideos(resources)
    const randomVideos = Object.keys(videoData)
      .slice(0, numberOfVideos)
      .reduce(
        (obj, key) => {
          obj[key] = videoData[key]
          return obj
        },
        {} as Record<string, VideoVersions>
      )

    cachedResults = randomVideos
  }

  return cachedResults
}
