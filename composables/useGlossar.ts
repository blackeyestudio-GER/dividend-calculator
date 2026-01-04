export const useGlossar = () => {
  const createGlossarLink = (term: string, text?: string) => {
    const termId = term.toLowerCase().replace(/\s+/g, '-')
    const displayText = text || term
    return `<NuxtLink to="/glossar#${termId}" class="text-[var(--color-primary)] hover:underline">${displayText}</NuxtLink>`
  }

  return {
    createGlossarLink
  }
}

