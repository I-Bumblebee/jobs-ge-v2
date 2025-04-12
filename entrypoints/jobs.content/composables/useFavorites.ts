import {cookieManager, CookieSaveOptions} from "@/entrypoints/jobs.content/services/CookieManager";

export function useFavorites(options: {
    cookieName?: string;
    maxFavorites?: number;
} = {}) {
    const {
        cookieName = 'fav_jobs',
        maxFavorites = 50
    } = options;

    const cookieOptions: CookieSaveOptions = {
        path: '/',
        domain: 'jobs.ge',
        'max-age': 30 * 24 * 60 * 60 // 1 month
    };

    const getFavorites = (): string[] => {
        const cookieValue = cookieManager.getCookie(cookieName) || '';
        return cookieValue
            ? cookieValue.split(',').map((id: string) => id.trim()).filter(Boolean)
            : [];
    }

    const favorites = ref<string[]>(getFavorites());

    const addFavorite = (jobId: string): boolean => {
        const currentFavorites = getFavorites();

        if (currentFavorites.includes(jobId)) {
            return false;
        }

        if (currentFavorites.length >= maxFavorites) {
            currentFavorites.shift();
        }

        const updatedFavorites = [...currentFavorites, jobId];

        cookieManager.setCookie(
            cookieName,
            updatedFavorites.join(','),
            cookieOptions
        );

        favorites.value = updatedFavorites;

        return true;
    }

    const removeFavorite = (jobId: string): boolean => {
        const currentFavorites = getFavorites();
        const updatedFavorites = currentFavorites.filter(id => id !== jobId);

        if (updatedFavorites.length !== currentFavorites.length) {
            cookieManager.setCookie(
                cookieName,
                updatedFavorites.join(','),
                cookieOptions
            );

            favorites.value = updatedFavorites;
            return true;
        }

        return false;
    }

    const isFavorite = (jobId: string): boolean => {
        return getFavorites().includes(jobId);
    }

    const toggleFavorite = (jobId: string): boolean => {
        return isFavorite(jobId)
            ? removeFavorite(jobId)
            : addFavorite(jobId);
    }

    const clearFavorites = (): void => {
        cookieManager.deleteCookie(cookieName);
        favorites.value = [];
    }

    return {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
        clearFavorites,
    }
}
