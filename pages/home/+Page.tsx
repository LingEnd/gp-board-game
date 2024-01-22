export default Page;

// @ts-ignore
import { ClientOnly } from "vike-react/ClientOnly";
import Loading from "../../components/Loading";

function Page() {
  return (
    <ClientOnly
      load={async () => import("./AnnouncementsDisplay")}
      fallback={<Loading />}
    >
      {
        // @ts-ignore
        (Map) => <Map />
      }
    </ClientOnly>
  );
}
