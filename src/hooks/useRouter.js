import { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export function useRouter() {
	const history = useHistory();
    const location = useLocation();
	// Return our custom router object
	// Memoize so that a new object is only returned if something changes
	return useMemo(
		() => {
			return {
				// For convenience add push(), replace(), pathname at top level
                push: history.push,
                state:location.state,
                history,
                location				
			};
		},
		[  ]
	);
}
