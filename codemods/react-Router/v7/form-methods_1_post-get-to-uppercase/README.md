


This transformation updates formMethod checks to use uppercase HTTP methods.

### Before

```ts

useNavigation().formMethod === 'post';
useFetcher().formMethod === 'get';
```

### After

```ts
useNavigation().formMethod === 'POST';
useFetcher().formMethod === 'GET';
```

