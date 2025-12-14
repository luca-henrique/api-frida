import axios from 'axios';
import { injectable } from 'tsyringe';

interface IAddressResult {
    address: string;
    city: string;
    neighborhood: string;
    state: string;
    formattedAddress: string;
}

@injectable()
export class ReverseGeocodingService {
    private readonly NOMINATIM_URL = 'https://nominatim.openstreetmap.org/reverse';

    async execute(latitude: number, longitude: number): Promise<IAddressResult | null> {
        try {
            const response = await axios.get(this.NOMINATIM_URL, {
                params: {
                    format: 'json',
                    lat: latitude,
                    lon: longitude,
                    zoom: 18,
                    addressdetails: 1,
                },
                headers: {
                    'User-Agent': 'FridaApp/1.0', // Nominatim requires a user-agent
                }
            });

            const data = response.data;
            if (!data || !data.address) {
                return null;
            }

            const { road, suburb, neighbourhood, city, town, village, state } = data.address;

            const streetComponent = road || '';
            const neighborhoodComponent = neighbourhood || suburb || '';
            const cityComponent = city || town || village || '';

            return {
                address: streetComponent,
                neighborhood: neighborhoodComponent,
                city: cityComponent,
                state: state || '',
                formattedAddress: data.display_name || ''
            };

        } catch (error) {
            console.error('Error fetching address from coordinates:', error);
            // Non-blocking error - return null so the report creates anyway
            return null;
        }
    }
}
