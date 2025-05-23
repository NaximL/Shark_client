import { create } from 'zustand';


type ProfileStore = {
    Prof: any[];
    setProfile: (lesion: any[]) => void;
};

export const useProfileStore = create<ProfileStore>((set) => ({
    Prof: [],
    setProfile: (Prof) => set({ Prof }),
}));

export default useProfileStore;