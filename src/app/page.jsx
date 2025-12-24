import About from "@/components/About/About";
import Banner from "@/components/Banner/Banner";
import ServicesOverview from "@/components/ServicesOverview/ServicesOverview";
import Testimonials from "@/components/Testimonials/Testimonials";

export default function Home() {
  return (
    <div>
      <Banner />
      <About />
      <ServicesOverview />
      <Testimonials />
    </div>
  );
}
