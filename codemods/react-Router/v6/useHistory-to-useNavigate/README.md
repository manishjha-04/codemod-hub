

This codemod migrates `useHistory` to `useNavigate` in React Router codebases. It replaces `useHistory` imports and updates all instances of `history.push`, `history.replace`, `go`, `goBack`, and `goForward` to align with the `useNavigate` API.

### Before

```tsx
import { useHistory } from "react-router-dom";

const history = useHistory();
history.push("/home");
history.replace("/login");
history.goBack();
```

### After

```tsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
navigate("/home");
navigate("/login", { replace: true });
navigate(-1); // Equivalent to goBack
```

This codemod simplifies the migration from `useHistory` to `useNavigate`, aligning your code with React Router's latest navigation hooks while preserving functionality.