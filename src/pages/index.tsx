import BusAccordion from "~/components/BusAccordion";
import useLocalStorage from "~/hooks/useLocalStorage";

export default function Home() {
  const {buses} = useLocalStorage();

  return (
    <section className="w-screen h-full content-center">
        <div className="flex justify-center items-center h-full w-full">
          <div className="justify-center h-5/6 w-9/12 mt-14">
            <BusAccordion/>
          </div>
        </div>
    </section>
  )
};