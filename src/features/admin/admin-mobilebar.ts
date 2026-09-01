import { create } from "zustand"

interface AdminMobileBarProps {
    isOpen: boolean
    toggle: () => void
    close: () => void
}
export const useAdminMobileBar = create<AdminMobileBarProps>((set) => ({
    isOpen: false,
    toggle: () => set((s) => ({isOpen: !s.isOpen})),
    close: () => set({isOpen: false})
}))