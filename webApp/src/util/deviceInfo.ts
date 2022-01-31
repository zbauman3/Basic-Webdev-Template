import { ThemeModes } from "../types/theme";

/** if the media query api is available */
const canUseMatchMedia = (!!window.matchMedia);
const matchMediaDark = '(prefers-color-scheme: dark)';

/** Checks if the navigator is a mobile navigator */
export const isMobileNavigator = (): boolean=>{

	return (
		(/Android|webOS|iPhone|iPad|iPadOS|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent) === true ||
		(navigator.platform?.toLowerCase() === 'macintel' && !!navigator.maxTouchPoints && navigator.maxTouchPoints > 1) //iPadOS
	);

};

/** Checks if the device is capable of touch events */
export const isTouchCapable = (): boolean=>(
	('ontouchstart' in window) ||
	(!!navigator.maxTouchPoints && navigator.maxTouchPoints > 0)
);


/** The checks if the screen is a small screen. */
export const isSmallScreen = (): boolean=>{

	//based on ipad widths (834x1194)
	const smallScreenSize = {
		width: 834,
		height: 1194
	};

	if(canUseMatchMedia){

		//check for portrait or landscape sizes
		return (
			window.matchMedia(`only screen and (orientation: portrait) and (max-width: ${smallScreenSize.width}px)`).matches ||
			window.matchMedia(`only screen and (orientation: landscape) and (max-width: ${smallScreenSize.height}px)`).matches
		);

	}

	return (Math.min(window.innerHeight, window.innerWidth) <= smallScreenSize.width);

};

/** Checks if this is a mobile device. */
export const isMobile = ():boolean=>{

	if(isMobileNavigator()){
		return true;
	}

	return (isTouchCapable() && isSmallScreen());

};

/** Gets the current system theme (dark or light). Falls back to `light`. */
export const getThemeMode = ():ThemeModes=>{

	if(canUseMatchMedia){

		return (window.matchMedia(matchMediaDark).matches
			? 'dark'
			: 'light'
		);

	}

	//otherwise default light
	return 'light';

};

/** Adds a listener to a media query list */
export const addMediaQueryListener = (match: MediaQueryList, callback: (e: MediaQueryListEvent)=>void)=>{

	if(match.addEventListener){

		match.addEventListener("change", callback);

	}else if(match.addListener){

		match.addListener(callback);

	}

};

/** Removes a listener from a media query list */
export const removeMediaQueryListener = (match: MediaQueryList, callback: (e: MediaQueryListEvent)=>void)=>{

	if(match.removeEventListener){

		match.removeEventListener("change", callback);

	}else if(match.removeListener){

		match.removeListener(callback);

	}

};

/**
 * Sets listeners for theme mode changes and calls the callback when the mode changes.
 * Returns a function to remove the listener.
 */
export const listenForThemeModeChange = (callback: (mode: ThemeModes)=>void)=>{

	if(canUseMatchMedia){

		const match = window.matchMedia(matchMediaDark);
		const useCallback = (event: MediaQueryListEvent)=>{

			callback(event.matches
				? 'dark'
				: 'light'
			);

		};

		addMediaQueryListener(match, useCallback);

		return ()=>{
			removeMediaQueryListener(match, useCallback);
		};

	}

	return ()=>{};//noop

};