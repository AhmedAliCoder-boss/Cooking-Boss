const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

const UNSPLASH_SEARCH = 'https://api.unsplash.com/search/photos'

/**
 * @param {string} query
 * @param {{ perPage?: number; orientation?: 'landscape' | 'portrait' | 'squarish' }} [opts]
 * @returns {Promise<Array<{ id: string; thumbUrl: string; heroUrl: string; alt: string; photographerName: string; photographerUrl: string; unsplashPhotoUrl: string }>>}
 */
export async function searchRecipePhotos(query, { perPage = 20, orientation } = {}) {
  if (!ACCESS_KEY?.trim()) {
    return []
  }
  const params = new URLSearchParams({
    query: (query || 'food').trim(),
    per_page: String(Math.min(Math.max(perPage, 1), 30)),
    page: '1',
    content_filter: 'high',
  })
  if (orientation) params.set('orientation', orientation)

  try {
    const res = await fetch(`${UNSPLASH_SEARCH}?${params}`, {
      headers: { Authorization: `Client-ID ${ACCESS_KEY.trim()}` },
    })
    if (!res.ok) return []
    const data = await res.json()
    const results = data.results || []
    return results.map((p) => ({
      id: p.id,
      thumbUrl: p.urls?.small || p.urls?.thumb || p.urls?.regular,
      heroUrl: p.urls?.regular || p.urls?.full || p.urls?.small,
      alt: p.alt_description || p.description || query || 'Food photo',
      photographerName: p.user?.name || 'Unsplash',
      photographerUrl: p.user?.links?.html,
      unsplashPhotoUrl: p.links?.html,
    }))
  } catch (e) {
    console.warn('Unsplash search failed:', e)
    return []
  }
}

/**
 * Stable pick for list cards so the same meal id maps to the same photo for a given pool.
 */
export function pickPhotoFromPool(photos, idMeal) {
  if (!photos?.length) return null
  const n = parseInt(String(idMeal), 10)
  const idx = Number.isFinite(n) ? n % photos.length : simpleHash(String(idMeal)) % photos.length
  return photos[idx]
}

function simpleHash(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i)
  return Math.abs(h)
}

export function buildRecipesListQuery({ activeCategory, activeArea, searchQuery }) {
  const q = searchQuery?.trim()
  if (q) return `${q} food recipe dish`
  if (activeArea) return `${activeArea} cuisine traditional food`
  if (activeCategory && activeCategory !== 'All') return `${activeCategory} food dish cooking`
  return 'gourmet food plating culinary'
}

export function isUnsplashConfigured() {
  return Boolean(ACCESS_KEY?.trim())
}

const singleCoverMemo = new Map()

/** One photo per query; cached in-memory for the session to limit API usage. */
export async function getSingleCoverPhoto(query) {
  const key = (query || 'food').trim().toLowerCase()
  if (singleCoverMemo.has(key)) return singleCoverMemo.get(key)
  const photos = await searchRecipePhotos(key, { perPage: 1 })
  const photo = photos[0] || null
  singleCoverMemo.set(key, photo)
  return photo
}
