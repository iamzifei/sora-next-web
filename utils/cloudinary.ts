import cloudinary from "cloudinary"

// Track whether the Cloudinary SDK has been configured yet
let configured = false

/**
 * Returns the cloudinary module after ensuring it is configured.
 * Configuration is deferred so that importing this module during build
 * (e.g. Next.js page data collection) does NOT throw when env vars are
 * missing.  The SDK is only configured on the first call to this function.
 */
export function getCloudinary() {
  if (!configured) {
    const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    if (!cloud_name) {
      console.warn(
        "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set — Cloudinary SDK will not be configured"
      )
      return cloudinary
    }

    cloudinary.v2.config({
      cloud_name,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    })
    configured = true
  }

  return cloudinary
}

export default cloudinary
