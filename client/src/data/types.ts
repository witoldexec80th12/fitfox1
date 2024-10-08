export interface HealthTask {
    icon: React.FC;
    photo?: string;
    title: string;
    totalNumber: number;
    performed: boolean;
    tooltip: React.FC
}

export interface NewTask {
    title: string;
    reward: number;
}

export interface UserInfo {
    icon: React.FC;
    title: string;
}

export interface PointHistory {
    title: string;
    date: string;
    point: number;
}

export interface ListStyle {
    listStyle?: React.CSSProperties;
    iconStyle?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
    titleStyle?: React.CSSProperties;
    textStyle?: React.CSSProperties;
    btnStyle?: React.CSSProperties;
    btnIconStyle?: React.CSSProperties;
    btnPointStyle?: React.CSSProperties;
}