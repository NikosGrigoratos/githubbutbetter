export const getReposNextOrder = (currentOrdering: null | 'asc' | 'desc') => {
    switch (currentOrdering) {
        case 'asc':
            return 'desc';
        case 'desc':
            return null;
        default:
            return 'asc';
    }
}