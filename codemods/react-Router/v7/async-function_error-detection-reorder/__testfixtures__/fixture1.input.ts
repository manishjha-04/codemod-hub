async function action() {
  await mutateSomeData();
  if (detectError()) {
    throw new Response(error, { status: 400 });
  }
  await mutateOtherData();
  // ...
}