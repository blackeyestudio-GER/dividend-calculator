/**
 * AdSense Configuration
 * 
 * Um AdSense zu aktivieren, ersetze die undefined Werte mit deinen Google AdSense IDs:
 * 
 * clientId: z.B. "ca-pub-1234567890123456"
 * defaultSlotId: z.B. "1234567890"
 * 
 * Diese IDs findest du in deinem Google AdSense Konto unter:
 * Werbung > Werbeeinheiten > Neue Werbeeinheit erstellen
 */
export const useAdSense = () => {
  // TODO: Ersetze diese Werte mit deinen Google AdSense IDs
  const clientId = ref<string | undefined>(undefined) // z.B. "ca-pub-1234567890123456"
  const defaultSlotId = ref<string | undefined>(undefined) // z.B. "1234567890"

  return {
    clientId: readonly(clientId),
    defaultSlotId: readonly(defaultSlotId)
  }
}

