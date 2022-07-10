import { StackNavigationProp } from '@react-navigation/stack';
import { UserOptionType } from "./Register";

export type RootStackParamList = {
    Location: undefined;
    Home: undefined;
    Post: {
        id: string;
    };
    Login: undefined;
    ForgotPassword: undefined;
    Register_UserType: undefined;
    Register_StoreDetails: {
        userType: UserOptionType;
    };
    Register_Products: {
        data: {
            title: string;
            description: string;
            category: string;
            openingHours: [string, string];
            images: [Blob|null, Blob|null, Blob|null];
        };
    };
    Register_UserDetails: {
        userType: UserOptionType;
        data?: {
            title: string;
            description: string;
            category: string;
            openingHours: [string, string];
            images: Blob[];
            items?: []
        };
    };
    ScanQr: undefined;
    Chats: undefined;
    Messages: {
        id: string;
    }
    EditPost: {
        id: string;
    }
};

export type LocationScreenProps = StackNavigationProp<RootStackParamList, 'Location'>
export type HomeScreenProps = StackNavigationProp<RootStackParamList, 'Home'>;
export type PostScreenProps = StackNavigationProp<RootStackParamList, 'Post'>;
export type EditPostScreenProps = StackNavigationProp<RootStackParamList, 'EditPost'>;
export type LoginScreenProps = StackNavigationProp<RootStackParamList, 'Login'>;
export type ForgotPasswordScreenProps = StackNavigationProp<RootStackParamList, 'ForgotPassword'>;
export type UserTypeScreenProps = StackNavigationProp<RootStackParamList, 'Register_UserType'>;
export type StoreDetailsScreenProps = StackNavigationProp<RootStackParamList, 'Register_StoreDetails'>;
export type ProductsScreenProps = StackNavigationProp<RootStackParamList, 'Register_Products'>;
export type UserDetailsScreenProps = StackNavigationProp<RootStackParamList, 'Register_UserDetails'>;
export type ScanQrScreenProps = StackNavigationProp<RootStackParamList, 'ScanQr'>;
