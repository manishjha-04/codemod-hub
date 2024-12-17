// If any of your code is checking for lowercase HTTP methods, you will need to update it to check for uppercase HTTP methods (or call toLowerCase() on it).

useNavigation().formMethod === 'post';
useFetcher().formMethod === 'get';