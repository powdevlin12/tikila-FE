'use client';

import { useEffect } from 'react';

export const usePageTitle = (title: string) => {
	useEffect(() => {
		const prevTitle = document.title;
		document.title = title ? `${title} - TIKILA` : 'TIKILA';

		return () => {
			document.title = prevTitle;
		};
	}, [title]);
};
