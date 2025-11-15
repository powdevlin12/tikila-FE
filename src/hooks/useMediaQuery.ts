'use client';

import { useEffect, useState } from 'react';

/**
 * useMediaQuery
 * Simple hook to observe a CSS media query and return match boolean.
 * Cleans up listener on unmount.
 */
export const useMediaQuery = (query: string) => {
	const getMatch = () =>
		typeof window !== 'undefined' ? window.matchMedia(query).matches : false;
	const [matches, setMatches] = useState<boolean>(getMatch);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		const mql = window.matchMedia(query) as MediaQueryList & {
			addListener?: (listener: (e: MediaQueryListEvent) => void) => void;
			removeListener?: (listener: (e: MediaQueryListEvent) => void) => void;
		};
		const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
		// Set initial in case SSR hydration diff
		setMatches(mql.matches);
		if (mql.addEventListener) mql.addEventListener('change', handler);
		else mql.addListener?.(handler);
		return () => {
			if (mql.removeEventListener) mql.removeEventListener('change', handler);
			else mql.removeListener?.(handler);
		};
	}, [query]);

	return matches;
};

export default useMediaQuery;
