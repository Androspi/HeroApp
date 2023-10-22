import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class HttpUtils {

    /**
     * Convierte un objeto a parámetros de ruta
     * @param parameters Objeto
     * @returns Cadena de parámetros de ruta
     */
    toQueryParams(parameters?: Record<string | number, any>): string {
        if (!parameters) return '';

        const entries = Object.entries(parameters).filter(([key, value]) =>
            ![null, undefined, ''].includes(value)
            && typeof value !== 'function'
            && key !== 'password'
        );

        let queryParams = entries.map(([key, value]) => {
            if (Array.isArray(value)) return value.map((val: any) => `${key}=${typeof val === 'object' ? JSON.stringify(val) : val}`).join('&');
            if (typeof value === 'object') return `${key}=${JSON.stringify(value)}`;
            return `${key}=${value}`;
        }).join('&');

        queryParams.length && (queryParams = `?${queryParams}`);

        return queryParams;
    }
}