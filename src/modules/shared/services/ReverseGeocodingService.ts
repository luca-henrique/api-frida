import { injectable } from 'tsyringe';

@injectable()
export class ReverseGeocodingService {
    async getAddress(lat: number, lng: number): Promise<{ address?: string; city?: string; neighborhood?: string; state?: string } | null> {
        // TODO: Integrate with Google Maps or OpenStreetMap
        // For now, returning mock data or null
        console.log(`[ReverseGeocodingService] Fetching address for ${lat}, ${lng}`);
        return {
            address: 'Rua Exemplo, 123',
            city: 'Cidade Exemplo',
            neighborhood: 'Bairro Exemplo',
            state: 'SP'
        };
    }
}
