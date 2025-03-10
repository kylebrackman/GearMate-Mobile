import { ImageSourcePropType } from 'react-native';

export interface GearMateUser {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    owned_items: Item[];
    profile: Profile;
    // current_rentals: Rental[];
    // upcoming_rentals: Rental[];
    // past_rentals: Rental[];
    pending_rental_requests: Item[];
    // received_pending_rental_requests: RentalRequest[];
    location: Location;
  }
  
  export interface Item {
    id: number;
    name: string;
    condition: string;
    image: { uri: string };
    description: string;
    price: number;
    owner_id?: number;
    item_type?: string;
    owner_first_name?: string;
    owner_last_name?: string;
    // image?: string;
    location: Location;
    rating?: number;
  }
  
//   export interface ItemPosition {
//     lat: number;
//     lng: number;
//   }
  
  export interface Profile {
    id: number;
    user_id: number;
    profile_picture: string;
    bio: string;
    location: string;
    created_at: string;
    updated_at: string;
    name: string;
    image: string;
  }
  
  export interface Rental {
    id: number;
    item_id: number;
    renter_id: number;
    start_date: string;
    end_date: string;
    owner: GearMateUser;
    item?: Item;
    owner_profile_id: number;
    rental_request_id: number;
    item_image: string;
  }
  
//   export interface RentalRequest {
//     id?: number;
//     renter: User;
//     start_date: string;
//     end_date: string;
//     item: Item;
//     status?: string;
//     owner_id?: number;
//   }
  
  export interface Location {
    id: number;
    address: string;
    latitude: number;
    longitude: number;
  }
  