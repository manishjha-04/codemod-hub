// Update any <Link> elements within that route tree to include the extra relative segment to continue linking to the same place

function Dashboard() {
  return (
    (<
      div >
      <
      h2 > Dashboard < /h2> <
        nav >
        <
        Link to = "../" > Dashboard Home < /Link> <
        Link to = "../team" > Team < /Link> <
        Link to = "../projects" > Projects < /Link> <
        /nav> <
      /div>)
  );
}