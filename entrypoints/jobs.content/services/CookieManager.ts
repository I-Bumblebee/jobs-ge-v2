export interface CookieSaveOptions {
    path?: string;
    domain?: string;
    expires?: Date | string;
    'max-age'?: number;
    [key: string]: string | number | Date | undefined | boolean;
}

export class CookieManager {
    getCookie(name: string): string | undefined {
        const matches = document.cookie.match(new RegExp(
            '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    setCookie(name: string, value: string, options: CookieSaveOptions = {}): void {
        const cookieOptions = {
            path: '/',
            domain: 'jobs.ge',
            ...options
        };

        if (cookieOptions.expires instanceof Date) {
            cookieOptions.expires = cookieOptions.expires.toUTCString();
        }

        let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

        for (const [optionKey, optionValue] of Object.entries(cookieOptions)) {
            if (optionValue !== undefined && typeof optionValue !== 'boolean') {
                updatedCookie += `; ${optionKey}=${optionValue}`;
            }
        }

        document.cookie = updatedCookie;
    }

    deleteCookie(name: string, options: CookieSaveOptions = {}): void {
        this.setCookie(name, '', {
            ...options,
            'max-age': -1
        });
    }
}

// Create and export a singleton instance
export const cookieManager = new CookieManager();