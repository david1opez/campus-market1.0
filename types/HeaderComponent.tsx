import { UserTypeType } from '../types/HomeScreen';

export type HeaderProps = {
    type: "transparent" | "green",
    userType?: UserTypeType,
    onReload?: () => void,
    onReturn?: () => void,
    onSettings?: () => void,
}