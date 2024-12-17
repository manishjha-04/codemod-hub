async function action() {
  if (detectError()) {
    throw new Response(error, { status: 400 });
  }
  // All data is now mutated after validations
  await mutateSomeData();
  await mutateOtherData();
}