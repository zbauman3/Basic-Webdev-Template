
export type ThemeModes = 'dark' | 'light';

export interface DeviceInfo{
	themeMode: ThemeModes,
	mobile: boolean
}

export type MainTheme = {
	deviceInfo: DeviceInfo
}