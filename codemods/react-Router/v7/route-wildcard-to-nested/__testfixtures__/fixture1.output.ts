createBrowserRouter([
  { path: '/', element: < Home / > },
  {
    path: 'dashboard',
    children: [{
      path: '*',
      element: < Dashboard / > ,
    }, ],
  },
]);